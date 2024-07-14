import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "../../api/api";
import {jwtDecode} from "jwt-decode";

interface AuthState {
  successMessage: string;
  errorMessage: string;
  loader: boolean;
  userInfo: Record<string, any> | null;
  role: string;
  token: string | null;
}

const returnRole = (token: string | null): string => {
  if (token) {
    const decodeToken: any = jwtDecode(token);
    const expireTime = new Date(decodeToken.exp * 1000);
    if (new Date() > expireTime) {
      localStorage.removeItem('accessToken');
      return '';
    } else {
      return decodeToken.role;
    }
  } else {
    return '';
  }
};

const initialState: AuthState = {
  successMessage: '',
  errorMessage: '',
  loader: false,
  userInfo: null,
  role: returnRole(localStorage.getItem('accessToken')),
  token: localStorage.getItem('accessToken')
};

interface LoginInfo {
  email: string;
  password: string;
}

interface RegisterInfo {
  name: string;
  email: string;
  password: string;
}

interface ProfileInfo {
  [key: string]: any;
}

interface NavigateParams {
  navigate: (path: string) => void;
  role: string;
}

interface RejectPayload {
  message: string;
}

const isAxiosError = (error: any): error is { response: { data: string } } => {
  return error && error.response && typeof error.response.data === 'string';
};

export const admin_login = createAsyncThunk<any, LoginInfo, { rejectValue: RejectPayload }>(
  'auth/admin_login',
  async (info: LoginInfo, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post('/admin-login', info, { withCredentials: true });
      localStorage.setItem('accessToken', data.token);
      return fulfillWithValue(data);
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue({ message: error.response.data });
      }
      return rejectWithValue({ message: 'An unknown error occurred' });
    }
  }
);

export const seller_login = createAsyncThunk<any, LoginInfo, { rejectValue: RejectPayload }>(
  'auth/seller_login',
  async (info: LoginInfo, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post('/seller-login', info, { withCredentials: true });
      localStorage.setItem('accessToken', data.token);
      return fulfillWithValue(data);
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue({ message: error.response.data });
      }
      return rejectWithValue({ message: 'An unknown error occurred' });
    }
  }
);

export const get_user_info = createAsyncThunk<any, void, { rejectValue: RejectPayload }>(
  'auth/get_user_info',
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get('/get-user', { withCredentials: true });
      return fulfillWithValue(data);
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue({ message: error.response.data });
      }
      return rejectWithValue({ message: 'An unknown error occurred' });
    }
  }
);

export const profile_image_upload = createAsyncThunk<any, FormData, { rejectValue: RejectPayload }>(
  'auth/profile_image_upload',
  async (image: FormData, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post('/profile-image-upload', image, { withCredentials: true });
      return fulfillWithValue(data);
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue({ message: error.response.data });
      }
      return rejectWithValue({ message: 'An unknown error occurred' });
    }
  }
);

export const seller_register = createAsyncThunk<any, RegisterInfo, { rejectValue: RejectPayload }>(
  'auth/seller_register',
  async (info: RegisterInfo, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post('/seller-register', info, { withCredentials: true });
      localStorage.setItem('accessToken', data.token);
      return fulfillWithValue(data);
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue({ message: error.response.data });
      }
      return rejectWithValue({ message: 'An unknown error occurred' });
    }
  }
);

export const profile_info_add = createAsyncThunk<any, ProfileInfo, { rejectValue: RejectPayload }>(
  'auth/profile_info_add',
  async (info: ProfileInfo, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post('/profile-info-add', info, { withCredentials: true });
      return fulfillWithValue(data);
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue({ message: error.response.data });
      }
      return rejectWithValue({ message: 'An unknown error occurred' });
    }
  }
);

export const logout = createAsyncThunk<any, NavigateParams, { rejectValue: RejectPayload }>(
  'auth/logout',
  async ({ navigate, role }: NavigateParams, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get('/logout', { withCredentials: true });
      localStorage.removeItem('accessToken');
      if (role === 'admin') {
        navigate('/admin/login');
      } else {
        navigate('/login');
      }
      return fulfillWithValue(data);
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue({ message: error.response.data });
      }
      return rejectWithValue({ message: 'An unknown error occurred' });
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(admin_login.pending, (state) => {
        state.loader = true;
      })
      .addCase(admin_login.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload ? payload.message : 'An unknown error occurred';
      })
      .addCase(admin_login.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
        state.token = payload.token;
        state.role = returnRole(payload.token);
      })
      .addCase(seller_login.pending, (state) => {
        state.loader = true;
      })
      .addCase(seller_login.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload ? payload.message : 'An unknown error occurred';
      })
      .addCase(seller_login.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
        state.token = payload.token;
        state.role = returnRole(payload.token);
      })
      .addCase(seller_register.pending, (state) => {
        state.loader = true;
      })
      .addCase(seller_register.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload ? payload.message : 'An unknown error occurred';
      })
      .addCase(seller_register.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
        state.token = payload.token;
        state.role = returnRole(payload.token);
      })
      .addCase(get_user_info.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.userInfo = payload.userInfo;
      })
      .addCase(profile_image_upload.pending, (state) => {
        state.loader = true;
      })
      .addCase(profile_image_upload.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.userInfo = payload.userInfo;
        state.successMessage = payload.message;
      })
      .addCase(profile_info_add.pending, (state) => {
        state.loader = true;
      })
      .addCase(profile_info_add.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.userInfo = payload.userInfo;
        state.successMessage = payload.message;
      });
  }
});

export const { messageClear } = authSlice.actions;
export default authSlice.reducer;
