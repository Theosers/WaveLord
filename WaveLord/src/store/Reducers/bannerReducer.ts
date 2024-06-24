import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "../../api/api";

interface BannerState {
  successMessage: string;
  errorMessage: string;
  loader: boolean;
  banners: any[];
  banner: any;
}

const initialState: BannerState = {
  successMessage: '',
  errorMessage: '',
  loader: false,
  banners: [],
  banner: ''
};

interface AddBannerInfo {
  [key: string]: any;
}

interface UpdateBannerInfo {
  bannerId: string;
  info: Record<string, any>;
}

export const add_banner = createAsyncThunk(
  'banner/add_banner',
  async (info: AddBannerInfo, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(`/banner/add`, info, { withCredentials: true });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_banner = createAsyncThunk(
  'banner/get_banner',
  async (productId: string, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/banner/get/${productId}`, { withCredentials: true });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const update_banner = createAsyncThunk(
  'banner/update_banner',
  async ({ bannerId, info }: UpdateBannerInfo, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.put(`/banner/update/${bannerId}`, info, { withCredentials: true });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const bannerReducer = createSlice({
  name: 'banner',
  initialState,
  reducers: {
    messageClear: (state) => {
      state.successMessage = "";
      state.errorMessage = "";
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(add_banner.pending, (state) => {
        state.loader = true;
      })
      .addCase(add_banner.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(add_banner.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
        state.banner = payload.banner;
      })
      .addCase(get_banner.fulfilled, (state, { payload }) => {
        state.banner = payload.banner;
      })
      .addCase(update_banner.pending, (state) => {
        state.loader = true;
      })
      .addCase(update_banner.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(update_banner.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
        state.banner = payload.banner;
      });
  }
});

export const { messageClear } = bannerReducer.actions;
export default bannerReducer.reducer;
