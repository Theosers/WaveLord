import { useEffect, useState } from "react";
import Router from "../router/Router.jsx";
import publicRoutes from "../router/routes/publicRoutes.jsx";
import { getRoutes } from "../router/routes/index.jsx";
import { useDispatch, useSelector } from "react-redux";
import { get_user_info } from "../store/Reducers/authReducer.js";

function App() {

    const dispatch = useDispatch();
    const { token } = useSelector(state => state.auth);

    const [allRoutes, setAllRoutes] = useState([...publicRoutes])


    useEffect(() => {
        const routes = getRoutes()
        setAllRoutes([...allRoutes, routes]);
    }, [])

    useEffect(() => {
        console.log('pas de token')
        if (token) {
            console.log('token', token)
            dispatch(get_user_info())
        }
    }, [token])

    return <Router allRoutes={allRoutes} />
}

export default App;
