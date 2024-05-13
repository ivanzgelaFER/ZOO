import "./App.css";
import axios from "axios";
import { Route, Routes, useLocation } from "react-router-dom";
import { HomePage } from "./containers/HomePage/HomePage";
import { configureAxiosClient } from "./api/axiosClient";
import { useAuth0 } from "@auth0/auth0-react";
import { useCallback, useEffect } from "react";
import { Nastambe } from "./views/Nastambe/Nastambe";
import { Sektor } from "./views/Sektor/Sektor";
import { VrstaZivotinje } from "./views/VrstaZivotinje/VrstaZivotinje";
import { NastambaDetails } from "./views/Nastambe/NastambaDetails";
import { NastambaForm } from "./views/Nastambe/NastambaForm";
import { SektorDetails } from "./views/Sektor/SektorDetails";
import { SektorForm } from "./views/Sektor/SektorForm";
import {Zivotinje} from "./views/Zivotinja/Zivotinja";

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
            <Route
                path="/nastamba-details"
                element={<NastambaDetails />}
            />
            <Route
                path="/nastamba-add"
                element={<NastambaForm />}
            />
            <Route
                path={"/sektor"}
                element={<Sektor />}
            />
            <Route
                path="/sektor-details"
                element={<SektorDetails />}
            />
            <Route
                path="/sektor-add"
                element={<SektorForm />}
            />
            <Route
                path={"/zivotinja"}
                element={<Zivotinje />}
            />
            <Route
                path={"/vrstazivotinje"}
                element={<VrstaZivotinje />}
            />
        </Routes>
    );
};
