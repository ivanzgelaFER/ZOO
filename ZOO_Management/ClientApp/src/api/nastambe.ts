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

export const updateNastamba = async (nastamba: INastamba) => {
    const res = await axios.put(`/nastamba`, nastamba);
    return res.data;
};

export const deleteNastamba = async (id: number) => {
    const res = await axios.delete(`/nastamba/${id}`);
    return res.data;
};
