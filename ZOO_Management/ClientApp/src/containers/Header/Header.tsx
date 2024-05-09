import "./Header.css";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";

export const Header = () => {
    const { logout, loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

    return (
        <header>
            {isLoading ? null : (
                <>
                    <div className="menubar">
                        {isAuthenticated ? (
                            <>
                                <nav className="header-content">
                                    <div>
                                        <Link
                                            className="menu-item"
                                            to="/nastambe"
                                            aria-label=""
                                        >
                                            <span>Nastambe</span>
                                        </Link>
                                    </div>
                                    <div>
                                        <Link
                                            className="menu-item"
                                            to="/sektor"
                                            aria-label=""
                                        >
                                            <span>Sektor (šifrarnik mastera)</span>
                                        </Link>
                                    </div>
                                    <div>
                                        <Link
                                            className="menu-item"
                                            to="/zivotinja"
                                            aria-label=""
                                        >
                                            <span>Životinja (detail)</span>
                                        </Link>
                                    </div>
                                    <div>
                                        <Link
                                            className="menu-item"
                                            to="/vrstazivotinje"
                                            aria-label=""
                                        >
                                            <span>Vrsta životinje (šifrarnik detaila)</span>
                                        </Link>
                                    </div>
                                </nav>
                                <div className="header-end-buttons">
                                    <Button
                                        label="Logout"
                                        onClick={() =>
                                            logout({
                                                logoutParams: {
                                                    returnTo: "https://localhost:5001/",
                                                },
                                            })
                                        }
                                    />
                                </div>
                            </>
                        ) : (
                            <div className="header-end-buttons">
                                <Button
                                    label="Login"
                                    onClick={() => loginWithRedirect()}
                                />
                            </div>
                        )}
                    </div>
                </>
            )}
        </header>
    );
};
