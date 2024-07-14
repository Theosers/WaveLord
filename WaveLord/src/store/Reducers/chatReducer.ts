import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "../../api/api";

interface ChatState {
  successMessage: string;
  errorMessage: string;
  customers: any[];
  messages: any[];
  activeCustomer: any[];
  activeSeller: any[];
  activeAdmin: string;
  friends: any[];
  seller_admin_message: any[];
  currentSeller: Record<string, any>;
  currentCustomer: Record<string, any>;
  sellers: any[];
}

const initialState: ChatState = {
  successMessage: '',
  errorMessage: '',
  customers: [],
  messages: [],
  activeCustomer: [],
  activeSeller: [],
  activeAdmin: "",
  friends: [],
  seller_admin_message: [],
  currentSeller: {},
  currentCustomer: {},
  sellers: [],
};

interface GetCustomersParams {
  sellerId: string;
}

interface GetCustomerMessageParams {
  customerId: string;
}

interface SendMessageParams {
  [key: string]: any;
}

interface GetAdminMessageParams {
  receverId: string;
}

export const get_customers = createAsyncThunk(
  'chat/get_customers',
  async (sellerId: string, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/chat/seller/get-customers/${sellerId}`, { withCredentials: true });
      return fulfillWithValue(data);
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_customer_message = createAsyncThunk(
  'chat/get_customer_message',
  async (customerId: string, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/chat/seller/get-customer-message/${customerId}`, { withCredentials: true });
      return fulfillWithValue(data);
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const send_message = createAsyncThunk(
  'chat/send_message',
  async (info: SendMessageParams, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(`/chat/seller/send-message-to-customer`, info, { withCredentials: true });
      return fulfillWithValue(data);
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_sellers = createAsyncThunk(
  'chat/get_sellers',
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/chat/admin/get-sellers`, { withCredentials: true });
      return fulfillWithValue(data);
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const send_message_seller_admin = createAsyncThunk(
  'chat/send_message_seller_admin',
  async (info: SendMessageParams, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(`/chat/message-send-seller-admin`, info, { withCredentials: true });
      return fulfillWithValue(data);
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_admin_message = createAsyncThunk(
  'chat/get_admin_message',
  async (receverId: string, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/chat/get-admin-messages/${receverId}`, { withCredentials: true });
      return fulfillWithValue(data);
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_seller_message = createAsyncThunk(
  'chat/get_seller_message',
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/chat/get-seller-messages`, { withCredentials: true });
      return fulfillWithValue(data);
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const chatReducer = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
    updateMessage: (state, { payload }: PayloadAction<any>) => {
      state.messages = [...state.messages, payload];
    },
    updateSellers: (state, { payload }: PayloadAction<any>) => {
      state.activeSeller = payload;
    },
    updateCustomer: (state, { payload }: PayloadAction<any>) => {
      state.activeCustomer = payload;
    },
    updateAdminMessage: (state, { payload }: PayloadAction<any>) => {
      state.seller_admin_message = [...state.seller_admin_message, payload];
    },
    updateSellerMessage: (state, { payload }: PayloadAction<any>) => {
      state.seller_admin_message = [...state.seller_admin_message, payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(get_customers.fulfilled, (state, { payload }) => {
        state.customers = payload.customers;
      })
      .addCase(get_customer_message.fulfilled, (state, { payload }) => {
        state.messages = payload.messages;
        state.currentCustomer = payload.currentCustomer;
      })
      .addCase(send_message.fulfilled, (state, { payload }) => {
        let tempFriends = state.customers;
        let index = tempFriends.findIndex(f => f.fdId === payload.message.receverId);
        while (index > 0) {
          let temp = tempFriends[index];
          tempFriends[index] = tempFriends[index - 1];
          tempFriends[index - 1] = temp;
          index--;
        }
        state.customers = tempFriends;
        state.messages = [...state.messages, payload.message];
        state.successMessage = 'Message Send Success';
      })
      .addCase(get_sellers.fulfilled, (state, { payload }) => {
        state.sellers = payload.sellers;
      })
      .addCase(send_message_seller_admin.fulfilled, (state, { payload }) => {
        state.seller_admin_message = [...state.seller_admin_message, payload.message];
        state.successMessage = 'Message Send Success';
      })
      .addCase(get_admin_message.fulfilled, (state, { payload }) => {
        state.seller_admin_message = payload.messages;
        state.currentSeller = payload.currentSeller;
      })
      .addCase(get_seller_message.fulfilled, (state, { payload }) => {
        state.seller_admin_message = payload.messages;
      })
      .addCase(get_customers.rejected, (state, { payload }) => {
        state.errorMessage = typeof payload === 'string' ? payload : (payload as any)?.error;
      })
      .addCase(get_customer_message.rejected, (state, { payload }) => {
        state.errorMessage = typeof payload === 'string' ? payload : (payload as any)?.error;
      })
      .addCase(send_message.rejected, (state, { payload }) => {
        state.errorMessage = typeof payload === 'string' ? payload : (payload as any)?.error;
      })
      .addCase(get_sellers.rejected, (state, { payload }) => {
        state.errorMessage = typeof payload === 'string' ? payload : (payload as any)?.error;
      })
      .addCase(send_message_seller_admin.rejected, (state, { payload }) => {
        state.errorMessage = typeof payload === 'string' ? payload : (payload as any)?.error;
      })
      .addCase(get_admin_message.rejected, (state, { payload }) => {
        state.errorMessage = typeof payload === 'string' ? payload : (payload as any)?.error;
      })
      .addCase(get_seller_message.rejected, (state, { payload }) => {
        state.errorMessage = typeof payload === 'string' ? payload : (payload as any)?.error;
      });
  }
});

export const { messageClear, updateMessage, updateSellers, updateCustomer, updateAdminMessage, updateSellerMessage } = chatReducer.actions;
export default chatReducer.reducer;
