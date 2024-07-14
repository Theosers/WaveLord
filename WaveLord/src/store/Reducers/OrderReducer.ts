import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "../../api/api";

interface OrderState {
  successMessage: string;
  errorMessage: string;
  totalOrder: number;
  order: Record<string, any>;
  myOrders: any[];
}

const initialState: OrderState = {
  successMessage: '',
  errorMessage: '',
  totalOrder: 0,
  order: {},
  myOrders: []
};

interface AdminOrdersParams {
  parPage: number;
  page: number;
  searchValue: string;
}

interface AdminOrderParams {
  orderId: string;
}

interface SellerOrdersParams {
  parPage: number;
  page: number;
  searchValue: string;
  sellerId: string;
}

interface OrderStatusUpdateParams {
  orderId: string;
  info: Record<string, any>;
}

export const get_admin_orders = createAsyncThunk(
  'orders/get_admin_orders',
  async (params: AdminOrdersParams, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/admin/orders?page=${params.page}&searchValue=${params.searchValue}&parPage=${params.parPage}`, { withCredentials: true });
      return fulfillWithValue(data);
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_admin_order = createAsyncThunk(
  'orders/get_admin_order',
  async (orderId: string, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/admin/order/${orderId}`, { withCredentials: true });
      return fulfillWithValue(data);
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const admin_order_status_update = createAsyncThunk(
  'orders/admin_order_status_update',
  async (params: OrderStatusUpdateParams, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.put(`/admin/order-status/update/${params.orderId}`, params.info, { withCredentials: true });
      return fulfillWithValue(data);
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_seller_orders = createAsyncThunk(
  'orders/get_seller_orders',
  async (params: SellerOrdersParams, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/seller/orders/${params.sellerId}?page=${params.page}&searchValue=${params.searchValue}&parPage=${params.parPage}`, { withCredentials: true });
      return fulfillWithValue(data);
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_seller_order = createAsyncThunk(
  'orders/get_seller_order',
  async (orderId: string, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/seller/order/${orderId}`, { withCredentials: true });
      return fulfillWithValue(data);
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const seller_order_status_update = createAsyncThunk(
  'orders/seller_order_status_update',
  async (params: OrderStatusUpdateParams, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.put(`/seller/order-status/update/${params.orderId}`, params.info, { withCredentials: true });
      return fulfillWithValue(data);
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const OrderReducer = createSlice({
  name: 'order',
  initialState,
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(get_admin_orders.fulfilled, (state, { payload }) => {
        state.myOrders = payload.orders;
        state.totalOrder = payload.totalOrder;
      })
      .addCase(get_admin_order.fulfilled, (state, { payload }) => {
        state.order = payload.order;
      })
      .addCase(admin_order_status_update.rejected, (state, { payload }) => {
        state.errorMessage = typeof payload === 'string' ? payload : (payload as any)?.message;
      })
      .addCase(admin_order_status_update.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message;
      })
      .addCase(get_seller_orders.fulfilled, (state, { payload }) => {
        state.myOrders = payload.orders;
        state.totalOrder = payload.totalOrder;
      })
      .addCase(get_seller_order.fulfilled, (state, { payload }) => {
        state.order = payload.order;
      })
      .addCase(seller_order_status_update.rejected, (state, { payload }) => {
        state.errorMessage = typeof payload === 'string' ? payload : (payload as any)?.message;
      })
      .addCase(seller_order_status_update.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message;
      })
      .addCase(get_admin_orders.rejected, (state, { payload }) => {
        state.errorMessage = typeof payload === 'string' ? payload : (payload as any)?.message;
      })
      .addCase(get_admin_order.rejected, (state, { payload }) => {
        state.errorMessage = typeof payload === 'string' ? payload : (payload as any)?.message;
      })
      .addCase(get_seller_orders.rejected, (state, { payload }) => {
        state.errorMessage = typeof payload === 'string' ? payload : (payload as any)?.message;
      })
      .addCase(get_seller_order.rejected, (state, { payload }) => {
        state.errorMessage = typeof payload === 'string' ? payload : (payload as any)?.message;
      });
  }
});

export const { messageClear } = OrderReducer.actions;
export default OrderReducer.reducer;
