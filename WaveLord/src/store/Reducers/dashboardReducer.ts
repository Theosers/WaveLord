import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "../../api/api";

interface DashboardState {
  totalSale: number;
  totalOrder: number;
  totalProduct: number;
  totalPendingOrder: number;
  totalSeller: number;
  recentOrder: any[];
  recentMessage: any[];
  errorMessage?: string;
}

const initialState: DashboardState = {
  totalSale: 0,
  totalOrder: 0,
  totalProduct: 0,
  totalPendingOrder: 0,
  totalSeller: 0,
  recentOrder: [],
  recentMessage: []
};

export const get_admin_dashboard_data = createAsyncThunk(
  'dashboard/get_admin_dashboard_data',
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get('/admin/get-dashboard-data', { withCredentials: true });
      return fulfillWithValue(data);
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_seller_dashboard_data = createAsyncThunk(
  'dashboard/get_seller_dashboard_data',
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get('/seller/get-dashboard-data', { withCredentials: true });
      return fulfillWithValue(data);
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const dashboardReducer = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(get_admin_dashboard_data.fulfilled, (state, { payload }) => {
        state.totalSale = payload.totalSale;
        state.totalOrder = payload.totalOrder;
        state.totalProduct = payload.totalProduct;
        state.totalSeller = payload.totalSeller;
        state.recentOrder = payload.recentOrders;
        state.recentMessage = payload.messages;
      })
      .addCase(get_seller_dashboard_data.fulfilled, (state, { payload }) => {
        state.totalSale = payload.totalSale;
        state.totalOrder = payload.totalOrder;
        state.totalProduct = payload.totalProduct;
        state.totalPendingOrder = payload.totalPendingOrder;
        state.recentOrder = payload.recentOrders;
        state.recentMessage = payload.messages;
      })
      .addCase(get_admin_dashboard_data.rejected, (state, { payload }) => {
        state.errorMessage = typeof payload === 'string' ? payload : (payload as any)?.error;
      })
      .addCase(get_seller_dashboard_data.rejected, (state, { payload }) => {
        state.errorMessage = typeof payload === 'string' ? payload : (payload as any)?.error;
      });
  }
});

export const { messageClear } = dashboardReducer.actions;
export default dashboardReducer.reducer;
