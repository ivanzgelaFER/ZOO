import { Button } from "primereact/button";
import "./HomePage.css";
import { testDbConnection } from "../../api/test";
import { getResidentialBuildings } from "../../api/residentialBuilding";

export const HomePage = () => {
    const testConn = async () => {
        try {
            await testDbConnection();
        } catch (error) {
            console.log("error");
        } finally {
            console.log("finally");
        }
    };

    return (
        <div>
            <h1>HELOOOOO</h1>
            <Button
                label="Add new"
                icon="pi pi-plus"
                onClick={() => testConn()}
            />
        </div>
    );
};
