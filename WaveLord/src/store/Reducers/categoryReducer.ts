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
  categories: [],  // Ensure this is an empty array
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
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_category = createAsyncThunk(
  'category/get_category',
  async ({ parPage, page, searchValue }: GetCategoryParams, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/category-get?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`, { withCredentials: true });
      console.log(data);
      return fulfillWithValue(data);
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    messageClear: (state) => {
      state.successMessage = "";
      state.errorMessage = "";
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(categoryAdd.pending, (state) => {
        state.loader = true;
      })
      .addCase(categoryAdd.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload?.error || 'Error occurred';
      })
      .addCase(categoryAdd.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = action.payload.message;
        state.categories.push(action.payload.category);
      })
      .addCase(get_category.fulfilled, (state, action) => {
        state.totalCategory = action.payload.totalCategory;
        state.categories = action.payload.categorys || [];
      })
      .addCase(get_category.rejected, (state, action) => {
        state.errorMessage = action.payload?.error || 'Error occurred';
      });
  }
});

export const { messageClear } = categorySlice.actions;
export default categorySlice.reducer;
