import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, RouteProps } from "react-router-dom";

type PrivateRouteProps = RouteProps & {
    component: any;
};

export const PrivateRoute = ({ component: Component, ...rest }: PrivateRouteProps) => {
    const { isAuthenticated } = useAuth0();

    if (isAuthenticated) {
        return <Component />;
    } else {
        return <Navigate to="/" />;
    }
};
