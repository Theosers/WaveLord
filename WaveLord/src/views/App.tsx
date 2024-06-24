import { useEffect, useState } from "react";
import Router from "../router/Router";
import publicRoutes from "../router/routes/publicRoutes";
import { getRoutes } from "../router/routes/index";
import { useDispatch, useSelector } from "react-redux";
import { get_user_info } from "../store/Reducers/authReducer";
import { RootState } from "../store";

function App() {
    const dispatch = useDispatch();
    const { token } = useSelector((state: RootState) => state.auth);

    const [allRoutes, setAllRoutes] = useState([...publicRoutes]);

    useEffect(() => {
        const routes = getRoutes();
        setAllRoutes((prevRoutes) => [...prevRoutes, routes]);
    }, []);

    useEffect(() => {
        if (token) {
            console.log('get_user_info APP : ', get_user_info);
            console.log('get_user_info APP2 : ', get_user_info());
            dispatch(get_user_info() as any);  // TypeScript might need 'as any' to suppress type errors
        }
    }, [token, dispatch]);

    return <Router allRoutes={allRoutes} />;
}

export default App;
