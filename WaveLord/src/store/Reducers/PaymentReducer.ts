import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "../../api/api";

interface PaymentState {
  successMessage: string;
  errorMessage: string;
  loader: boolean;
  pendingWithdrows: any[];
  successWithdrows: any[];
  totalAmount: number;
  withdrowAmount: number;
  pendingAmount: number;
  availableAmount: number;
}

const initialState: PaymentState = {
  successMessage: '',
  errorMessage: '',
  loader: false,
  pendingWithdrows: [],
  successWithdrows: [],
  totalAmount: 0,
  withdrowAmount: 0,
  pendingAmount: 0,
  availableAmount: 0,
};

interface SellerPaymentDetailsParams {
  sellerId: string;
}

interface SendWithdrowalRequestParams {
  info: Record<string, any>;
}

interface ConfirmPaymentRequestParams {
  paymentId: string;
}

export const get_seller_payment_details = createAsyncThunk(
  'payment/get_seller_payment_details',
  async ({ sellerId }: SellerPaymentDetailsParams, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/payment/seller-payment-details/${sellerId}`, { withCredentials: true });
      return fulfillWithValue(data);
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const send_withdrowal_request = createAsyncThunk(
  'payment/send_withdrowal_request',
  async (info: Record<string, any>, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(`/payment/withdrowal-request`, info, { withCredentials: true });
      return fulfillWithValue(data);
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_payment_request = createAsyncThunk(
  'payment/get_payment_request',
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/payment/request`, { withCredentials: true });
      return fulfillWithValue(data);
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const confirm_payment_request = createAsyncThunk(
  'payment/confirm_payment_request',
  async ({ paymentId }: ConfirmPaymentRequestParams, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(`/payment/request-confirm`, { paymentId }, { withCredentials: true });
      return fulfillWithValue(data);
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const PaymentReducer = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    messageClear: (state) => {
      state.successMessage = "";
      state.errorMessage = "";
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(get_seller_payment_details.fulfilled, (state, { payload }) => {
        state.pendingWithdrows = payload.pendingWithdrows;
        state.successWithdrows = payload.successWithdrows;
        state.totalAmount = payload.totalAmount;
        state.availableAmount = payload.availableAmount;
        state.withdrowAmount = payload.withdrowAmount;
        state.pendingAmount = payload.pendingAmount;
      })
      .addCase(send_withdrowal_request.pending, (state) => {
        state.loader = true;
      })
      .addCase(send_withdrowal_request.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = typeof payload === 'string' ? payload : (payload as any)?.message;
      })
      .addCase(send_withdrowal_request.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
        state.pendingWithdrows = [...state.pendingWithdrows, payload.withdrowal];
        state.availableAmount -= payload.withdrowal.amount;
        state.pendingAmount = payload.withdrowal.amount;
      })
      .addCase(get_payment_request.fulfilled, (state, { payload }) => {
        state.pendingWithdrows = payload.withdrowalRequestList;
      })
      .addCase(confirm_payment_request.pending, (state) => {
        state.loader = true;
      })
      .addCase(confirm_payment_request.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = typeof payload === 'string' ? payload : (payload as any)?.message;
      })
      .addCase(confirm_payment_request.fulfilled, (state, { payload }) => {
        const temp = state.pendingWithdrows.filter(r => r._id !== payload.payment._id);
        state.loader = false;
        state.successMessage = payload.message;
        state.pendingWithdrows = temp;
      })
      .addCase(get_seller_payment_details.rejected, (state, { payload }) => {
        state.errorMessage = typeof payload === 'string' ? payload : (payload as any)?.message;
      })
      .addCase(get_payment_request.rejected, (state, { payload }) => {
        state.errorMessage = typeof payload === 'string' ? payload : (payload as any)?.message;
      });
  }
});

export const { messageClear } = PaymentReducer.actions;
export default PaymentReducer.reducer;
