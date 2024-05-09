import axios from "axios";
import { INastamba } from "../models/nastambe";

export const getAllNastambe = async () => {
    const res = await axios.get("nastamba");
    return res.data;
};

export const createNewNastamba = async (newNastamba: INastamba) => {
    const res = await axios.post("/nastamba", newNastamba);
    return res.data;
};
