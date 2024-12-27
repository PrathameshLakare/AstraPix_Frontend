import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const url = process.env.REACT_APP_SERVER_BASE_URL;

export const fetchImages = createAsyncThunk(
  "fetch/images",
  async ({ albumId, tags }) => {
    const token = Cookies.get("access_token") || "";
    const response = await axios.get(`${url}/albums/${albumId}/images`, {
      params: tags ? { tags } : {},
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const postImage = createAsyncThunk(
  "post/images",
  async ({ albumId, imageData }, { rejectWithValue }) => {
    const token = Cookies.get("access_token") || "";
    const response = await axios.post(
      `${url}/albums/${albumId}/images`,
      imageData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

export const favoriteImage = createAsyncThunk(
  "post/images/favorite",
  async ({ albumId, imageId }) => {
    const token = Cookies.get("access_token") || "";
    const response = await axios.put(
      `${url}/albums/${albumId}/images/${imageId}/favorite`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

export const deleteImage = createAsyncThunk(
  "delete/image",
  async ({ albumId, imageId }) => {
    const token = Cookies.get("access_token") || "";
    const response = await axios.delete(
      `${url}/albums/${albumId}/images/${imageId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

export const addComment = createAsyncThunk(
  "post/image/comments",
  async ({ albumId, imageId, comment }) => {
    const token = Cookies.get("access_token") || "";

    const response = await axios.put(
      `${url}/albums/${albumId}/images/${imageId}/comments`,
      comment,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

const imageSlice = createSlice({
  name: "image",
  initialState: {
    images: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchImages.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchImages.fulfilled, (state, action) => {
      state.status = "success";
      state.images = action.payload.images;
    });
    builder.addCase(fetchImages.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
    builder.addCase(postImage.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(postImage.fulfilled, (state, action) => {
      state.status = "success";
      state.images.push(action.payload.imageData);
    });
    builder.addCase(postImage.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
    builder.addCase(favoriteImage.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(favoriteImage.fulfilled, (state, action) => {
      state.status = "success";
      const index = state.images.findIndex(
        (img) => img._id === action.payload.updatedImage._id
      );
      state.images[index] = action.payload.updatedImage;
    });
    builder.addCase(favoriteImage.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
    builder.addCase(deleteImage.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(deleteImage.fulfilled, (state, action) => {
      state.status = "success";
      state.images = state.images.filter(
        (img) => img._id !== action.payload.image._id
      );
    });
    builder.addCase(deleteImage.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
    builder.addCase(addComment.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(addComment.fulfilled, (state, action) => {
      state.status = "success";
      const index = state.images.findIndex(
        (img) => img._id === action.payload.updatedImage._id
      );
      state.images[index] = action.payload.updatedImage;
    });
    builder.addCase(addComment.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
  },
});

export default imageSlice.reducer;
