import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "../../api/api";

interface SellerState {
  successMessage: string;
  errorMessage: string;
  loader: boolean;
  sellers: any[];
  totalSeller: number;
  seller: any;
}

const initialState: SellerState = {
  successMessage: '',
  errorMessage: '',
  loader: false,
  sellers: [],
  totalSeller: 0,
  seller: ''
};

interface GetSellersParams {
  parPage: number;
  page: number;
  searchValue: string;
}

interface SellerStatusUpdateParams {
  sellerId: string;
  status: string;
}

export const get_seller_request = createAsyncThunk(
  'seller/get_seller_request',
  async ({ parPage, page, searchValue }: GetSellersParams, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/request-seller-get?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`, { withCredentials: true });
      return fulfillWithValue(data);
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_seller = createAsyncThunk(
  'seller/get_seller',
  async (sellerId: string, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/get-seller/${sellerId}`, { withCredentials: true });
      return fulfillWithValue(data);
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const seller_status_update = createAsyncThunk(
  'seller/seller_status_update',
  async (info: SellerStatusUpdateParams, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(`/seller-status-update`, info, { withCredentials: true });
      return fulfillWithValue(data);
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_active_sellers = createAsyncThunk(
  'seller/get_active_sellers',
  async ({ parPage, page, searchValue }: GetSellersParams, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/get-sellers?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`, { withCredentials: true });
      return fulfillWithValue(data);
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_deactive_sellers = createAsyncThunk(
  'seller/get_deactive_sellers',
  async ({ parPage, page, searchValue }: GetSellersParams, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/get-deactive-sellers?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`, { withCredentials: true });
      return fulfillWithValue(data);
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const create_stripe_connect_account = createAsyncThunk(
  'seller/create_stripe_connect_account',
  async () => {
    try {
      const { data: { url } } = await api.get(`/payment/create-stripe-connect-account`, { withCredentials: true });
      window.location.href = url;
    } catch (error) {
      // console.log(error.response.data)
    }
  }
);

export const active_stripe_connect_account = createAsyncThunk(
  'seller/active_stripe_connect_account',
  async (activeCode: string, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.put(`/payment/active-stripe-connect-account/${activeCode}`, {}, { withCredentials: true });
      return fulfillWithValue(data);
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const sellerReducer = createSlice({
  name: 'seller',
  initialState,
  reducers: {
    messageClear: (state) => {
      state.successMessage = "";
      state.errorMessage = "";
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(get_seller_request.fulfilled, (state, { payload }) => {
        state.sellers = payload.sellers;
        state.totalSeller = payload.totalSeller;
      })
      .addCase(get_seller.fulfilled, (state, { payload }) => {
        state.seller = payload.seller;
      })
      .addCase(seller_status_update.fulfilled, (state, { payload }) => {
        state.seller = payload.seller;
        state.successMessage = payload.message;
      })
      .addCase(get_active_sellers.fulfilled, (state, { payload }) => {
        state.sellers = payload.sellers;
        state.totalSeller = payload.totalSeller;
      })
      .addCase(get_deactive_sellers.fulfilled, (state, { payload }) => {
        state.sellers = payload.sellers;
        state.totalSeller = payload.totalSeller;
      })
      .addCase(active_stripe_connect_account.pending, (state) => {
        state.loader = true;
      })
      .addCase(active_stripe_connect_account.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = typeof payload === 'string' ? payload : (payload as any)?.message;
      })
      .addCase(active_stripe_connect_account.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
      })
      .addCase(get_seller_request.rejected, (state, { payload }) => {
        state.errorMessage = typeof payload === 'string' ? payload : (payload as any)?.message;
      })
      .addCase(get_seller.rejected, (state, { payload }) => {
        state.errorMessage = typeof payload === 'string' ? payload : (payload as any)?.message;
      })
      .addCase(seller_status_update.rejected, (state, { payload }) => {
        state.errorMessage = typeof payload === 'string' ? payload : (payload as any)?.message;
      })
      .addCase(get_active_sellers.rejected, (state, { payload }) => {
        state.errorMessage = typeof payload === 'string' ? payload : (payload as any)?.message;
      })
      .addCase(get_deactive_sellers.rejected, (state, { payload }) => {
        state.errorMessage = typeof payload === 'string' ? payload : (payload as any)?.message;
      });
  }
});

export const { messageClear } = sellerReducer.actions;
export default sellerReducer.reducer;
