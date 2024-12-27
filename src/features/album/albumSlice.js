import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const url = process.env.REACT_APP_SERVER_BASE_URL;

export const fetchAlbums = createAsyncThunk("/fetch/album", async () => {
  const token = Cookies.get("access_token") || "";
  const response = await axios.get(`${url}/albums`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
});

export const fetchAlbumDetails = createAsyncThunk(
  "album/fetchAlbumDetails",
  async (albumId) => {
    const token = Cookies.get("access_token") || "";
    const response = await axios.get(`${url}/albums/${albumId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const postAlbum = createAsyncThunk("/post/album", async (newAlbum) => {
  const token = Cookies.get("access_token") || "";
  const response = await axios.post(`${url}/albums`, newAlbum, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
});

export const updateAlbum = createAsyncThunk(
  "/update/album",
  async ({ albumId, albumData }) => {
    const token = Cookies.get("access_token") || "";
    const response = await axios.put(`${url}/albums/${albumId}`, albumData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  }
);

export const addSharedUsers = createAsyncThunk(
  "/post/album/add/sharedUsers",
  async ({ albumId, emails }, { rejectWithValue }) => {
    try {
      const token = Cookies.get("access_token") || "";
      const response = await axios.post(
        `${url}/albums/${albumId}/share`,
        { emails },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(
          error.response.data.message || "An error occurred"
        );
      }
    }
  }
);

export const fetchSharedAlbums = createAsyncThunk(
  "/fetch/shared/albums",
  async () => {
    const token = Cookies.get("access_token") || "";
    const response = await axios.get(`${url}/albums/shared`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  }
);

export const deleteAlbumById = createAsyncThunk(
  "/delete/albums",
  async (albumId) => {
    const token = Cookies.get("access_token") || "";
    const response = await axios.delete(`${url}/albums/${albumId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  }
);

const albumSlice = createSlice({
  name: "album",
  initialState: {
    albums: [],
    albumDetails: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAlbums.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchAlbums.fulfilled, (state, action) => {
      state.status = "success";
      state.albums = action.payload.albums;
    });
    builder.addCase(fetchAlbums.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
    builder.addCase(postAlbum.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(postAlbum.fulfilled, (state, action) => {
      state.status = "success";
      state.albums.push(action.payload.album);
    });
    builder.addCase(postAlbum.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
    builder.addCase(fetchAlbumDetails.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchAlbumDetails.fulfilled, (state, action) => {
      state.status = "success";
      state.albumDetails = action.payload;
    });
    builder.addCase(fetchAlbumDetails.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
    builder.addCase(addSharedUsers.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(addSharedUsers.fulfilled, (state, action) => {
      state.status = "success";
      console.log(action.payload);
      const index = state.albums.findIndex(
        (album) => album._id === action.payload.album._id
      );
      if (index !== -1) {
        state.albums[index] = action.payload.album;
      } else {
        console.error("Album not found in state.");
      }

      state.albums[index] = action.payload.album;
    });
    builder.addCase(addSharedUsers.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
    builder.addCase(fetchSharedAlbums.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchSharedAlbums.fulfilled, (state, action) => {
      state.status = "success";
      state.albums = action.payload.albums;
    });
    builder.addCase(fetchSharedAlbums.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
    builder.addCase(deleteAlbumById.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(deleteAlbumById.fulfilled, (state, action) => {
      state.status = "success";
      state.albums = state.albums.filter(
        (album) => album._id !== action.payload.album._id
      );
    });
    builder.addCase(deleteAlbumById.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    builder.addCase(updateAlbum.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(updateAlbum.fulfilled, (state, action) => {
      state.status = "success";
      const index = state.albums.findIndex(
        (album) => album._id === action.payload.album._id
      );
      state.albums[index] = action.payload.album;
    });
    builder.addCase(updateAlbum.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
  },
});

export default albumSlice.reducer;
