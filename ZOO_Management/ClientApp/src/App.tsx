import "./App.css";
import axios from "axios";
import { Route, Routes, useLocation } from "react-router-dom";
import { HomePage } from "./containers/HomePage/HomePage";
import { configureAxiosClient } from "./api/axiosClient";
import { useAuth0 } from "@auth0/auth0-react";
import { useCallback, useEffect } from "react";
import { Nastambe } from "./views/Nastambe/Nastambe";

configureAxiosClient(axios);

export const App = () => {
    const location = useLocation();
    const { getAccessTokenSilently } = useAuth0();

    const getAccesToken = useCallback(async () => {
        try {
            const token = await getAccessTokenSilently();
            localStorage.setItem("token", token);
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        getAccesToken();
    }, [getAccesToken]);

    return (
        <Routes location={location}>
            <Route
                path="*"
                element={<HomePage />}
            />
            <Route
                path={"/nastambe"}
                element={<Nastambe />}
            />
        </Routes>
    );
};

