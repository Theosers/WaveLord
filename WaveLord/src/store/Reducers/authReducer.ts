import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "../../api/api";
import jwtDecode from "jwt-decode";

interface AuthState {
  successMessage: string;
  errorMessage: string;
  loader: boolean;
  userInfo: Record<string, any> | null;
  role: string;
  token: string | null;
}

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

interface ProfileImage {
  file: File;
}

interface ProfileInfo {
  [key: string]: any;
}

interface NavigateParams {
  navigate: (path: string) => void;
  role: string;
}

export const admin_login = createAsyncThunk(
  'auth/admin_login',
  async (info: LoginInfo, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post('/admin-login', info, { withCredentials: true });
      localStorage.setItem('accessToken', data.token);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const seller_login = createAsyncThunk(
  'auth/seller_login',
  async (info: LoginInfo, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post('/seller-login', info, { withCredentials: true });
      localStorage.setItem('accessToken', data.token);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_user_info = createAsyncThunk(
  'auth/get_user_info',
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get('/get-user', { withCredentials: true });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const profile_image_upload = createAsyncThunk(
  'auth/profile_image_upload',
  async (image: ProfileImage, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post('/profile-image-upload', image, { withCredentials: true });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const seller_register = createAsyncThunk(
  'auth/seller_register',
  async (info: RegisterInfo, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post('/seller-register', info, { withCredentials: true });
      localStorage.setItem('accessToken', data.token);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const profile_info_add = createAsyncThunk(
  'auth/profile_info_add',
  async (info: ProfileInfo, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post('/profile-info-add', info, { withCredentials: true });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

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

export const logout = createAsyncThunk(
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
      return rejectWithValue(error.response.data);
    }
  }
);

export const authReducer = createSlice({
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
        state.errorMessage = payload.error;
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
        state.errorMessage = payload.error;
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
        state.errorMessage = payload.error;
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

export const { messageClear } = authReducer.actions;
export default authReducer.reducer;
