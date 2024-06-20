import { authReducer } from "./reducers/authReducer";
import homeReducer from "./reducers/homeReducer";
import cardReducer from "./reducers/cardReducer";
import dashboardReducer from "./reducers/dashboardReducer";
import orderReducer from "./reducers/orderReducer";

const rootReducer = {
    home: homeReducer,
    auth: authReducer,
    card: cardReducer,
    order: orderReducer,
    dashboard: dashboardReducer
}
export default rootReducer;
