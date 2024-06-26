import "./index.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { App } from "./App";
import { PrivateRoute } from "./containers/Login/PrivateRoute";
import reportWebVitals from "./reportWebVitals";
import { Auth0Provider } from "@auth0/auth0-react";
import { Layout } from "./containers/Layout/Layout";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { ToastMessage } from "./containers/ToastMessage/ToastMessage";
import { Provider } from "react-redux";
import { store } from "./store/configureStore";

if (process.env.NODE_ENV === "production") {
    disableReactDevTools();
}

const root = createRoot(document.getElementById("root")!);

const domain = process.env.REACT_APP_AUTH0_DOMAIN ?? "";
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID ?? "";

root.render(
    <Auth0Provider
        domain={domain}
        clientId={clientId}
        authorizationParams={{
            redirect_uri: window.location.origin,
        }}
    >
        <Provider store={store}>
            <BrowserRouter>
                <Layout>
                    <Routes>
                        <Route
                            path="/*"
                            element={
                                <PrivateRoute
                                    path="/private"
                                    component={App}
                                />
                            }
                        />
                    </Routes>
                </Layout>
            </BrowserRouter>
            <ToastMessage />
        </Provider>
    </Auth0Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
