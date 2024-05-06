import axios from "axios";

export const testDbConnection = async () => {
    const res = await axios.get("test");
    return res.data;
};
