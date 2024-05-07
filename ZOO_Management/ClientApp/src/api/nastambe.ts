import axios from "axios";

export const getAllNastambe = async () => {
    const res = await axios.get("nastamba");
    return res.data;
};
