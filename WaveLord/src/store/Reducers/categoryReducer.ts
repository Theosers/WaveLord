import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "../../api/api";

interface CategoryState {
  successMessage: string;
  errorMessage: string;
  loader: boolean;
  categories: any[];
  totalCategory: number;
}

const initialState: CategoryState = {
  successMessage: '',
  errorMessage: '',
  loader: false,
  categories: [],
  totalCategory: 0
};

interface CategoryAddParams {
  name: string;
  image: File;
}

interface GetCategoryParams {
  parPage: number;
  page: number;
  searchValue: string;
}

export const categoryAdd = createAsyncThunk(
  'category/categoryAdd',
  async ({ name, image }: CategoryAddParams, { rejectWithValue, fulfillWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('image', image);
      const { data } = await api.post('/category-add', formData, { withCredentials: true });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_category = createAsyncThunk(
  'category/get_category',
  async ({ parPage, page, searchValue }: GetCategoryParams, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/category-get?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`, { withCredentials: true });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const categoryReducer = createSlice({
  name: 'category',
  initialState,
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(categoryAdd.pending, (state) => {
        state.loader = true;
      })
      .addCase(categoryAdd.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(categoryAdd.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
        state.categories = [...state.categories, payload.category];
      })
      .addCase(get_category.fulfilled, (state, { payload }) => {
        state.totalCategory = payload.totalCategory;
        state.categories = payload.categories;
      });
  }
});

export const { messageClear } = categoryReducer.actions;
export default categoryReducer.reducer;
