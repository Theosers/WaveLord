import { privateRoutes } from "./privateRoutes";
import MainLayout from "../../layouts/MainLayout";

export const getRoutes = () => {
    return {
        path: '/',
        element : < MainLayout />,
        children: privateRoutes
        
    }
}