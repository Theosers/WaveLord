import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "../../api/api";

interface ProductState {
  successMessage: string;
  errorMessage: string;
  loader: boolean;
  products: any[];
  product: any;
  totalProduct: number;
}

const initialState: ProductState = {
  successMessage: '',
  errorMessage: '',
  loader: false,
  products: [],
  product: '',
  totalProduct: 0
};

interface AddProductParams {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  image: File;
}

interface GetProductsParams {
  parPage: number;
  page: number;
  searchValue: string;
}

interface GetProductParams {
  productId: string;
}

interface UpdateProductParams {
  productId: string;
  name?: string;
  description?: string;
  price?: number;
  category?: string;
  stock?: number;
}

interface ProductImageUpdateParams {
  oldImage: string;
  newImage: File;
  productId: string;
}

export const add_product = createAsyncThunk(
  'product/add_product',
  async (product: FormData, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post('/product-add', product, { withCredentials: true });
      return fulfillWithValue(data);
    } catch (error: any) {
      console.log('ajout du produit échoue : ', error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_products = createAsyncThunk(
  'product/get_products',
  async ({ parPage, page, searchValue }: GetProductsParams, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/products-get?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`, { withCredentials: true });
      console.log(data);
      return fulfillWithValue(data);
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_product = createAsyncThunk(
  'product/get_product',
  async (productId: string, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/product-get/${productId}`, { withCredentials: true });
      console.log(data);
      return fulfillWithValue(data);
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const update_product = createAsyncThunk(
  'product/update_product',
  async (product: UpdateProductParams, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post('/product-update', product, { withCredentials: true });
      console.log(data);
      return fulfillWithValue(data);
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const product_image_update = createAsyncThunk(
  'product/product_image_update',
  async ({ oldImage, newImage, productId }: ProductImageUpdateParams, { rejectWithValue, fulfillWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('oldImage', oldImage);
      formData.append('newImage', newImage);
      formData.append('productId', productId);
      const { data } = await api.post('/product-image-update', formData, { withCredentials: true });
      console.log(data);
      return fulfillWithValue(data);
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const productReducer = createSlice({
  name: 'product',
  initialState,
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(add_product.pending, (state) => {
        state.loader = true;
      })
      .addCase(add_product.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = (payload as any)?.error;
      })
      .addCase(add_product.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
      })
      .addCase(get_products.fulfilled, (state, { payload }) => {
        state.totalProduct = payload.totalProduct;
        state.products = payload.products;
      })
      .addCase(get_product.fulfilled, (state, { payload }) => {
        state.product = payload.product;
      })
      .addCase(update_product.pending, (state) => {
        state.loader = true;
      })
      .addCase(update_product.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = (payload as any)?.error;
      })
      .addCase(update_product.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.product = payload.product;
        state.successMessage = payload.message;
      })
      .addCase(product_image_update.fulfilled, (state, { payload }) => {
        state.product = payload.product;
        state.successMessage = payload.message;
      });
  }
});

export const { messageClear } = productReducer.actions;
export default productReducer.reducer;
