import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const url = process.env.REACT_APP_SERVER_BASE_URL;

export const fetchUserData = createAsyncThunk(
  "/auth/user",
  async (_, { rejectWithValue }) => {
    try {
      const token = Cookies.get("access_token") || "";
      console.log(token);
      const response = await axios.get(`${url}/user/profile/google`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    status: "idle",
    error: null,
  },
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.status = "success";
      state.user = action.payload.user;
      state.error = null;
    });
    builder.addCase(fetchUserData.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
  },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
