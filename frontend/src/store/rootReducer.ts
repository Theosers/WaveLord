import { authReducer } from "./reducers/authReducer";
import homeReducer from "./reducers/homeReducer";
import cardReducer from "./reducers/cardReducer";
import orderReducer from "./reducers/orderReducer";

const rootReducer = {
    home: homeReducer,
    auth: authReducer,
    card: cardReducer,
    order: orderReducer
}
export default rootReducer;
