import axios from "axios";

export const testDbConnection = async () => {
    const res = await axios.get("api/v3/test");
    return res.data;
};
