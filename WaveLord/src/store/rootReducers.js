import authReducer from "./Reducers/authReducer";
import bannerReducer from "./Reducers/bannerReducer";
import PaymentReducer from "./Reducers/PaymentReducer";
import categoryReducer from "./Reducers/categoryReducer";
import chatReducer from "./Reducers/chatReducer";
import dashboardReducer from "./Reducers/dashboardReducer";
import productReducer from "./Reducers/productReducer";
import sellerReducer from "./Reducers/sellerReducer";

const rootReducer = {
    auth: authReducer,
    category: categoryReducer,
    product: productReducer,
    seller: sellerReducer,
    chat: chatReducer,
    order: OrderReducer,
    payment: PaymentReducer,
    dasboard: dashboardReducer,
    banner: bannerReducer
}
export default rootReducer;
