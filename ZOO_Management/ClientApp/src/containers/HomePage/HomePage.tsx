import "./HomePage.css";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Početna stranica</h1>
            <Button
                label="Odi na nastambe"
                icon="pi pi-plus"
                onClick={() => navigate("/nastambe")}
            />
        </div>
    );
};
