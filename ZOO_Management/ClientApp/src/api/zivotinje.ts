import axios from "axios";
import { IZivotinja } from "../models/zivotinja";

export const getAllZivotinje = async () => {
    const res = await axios.get(`/zivotinja`);
    return res.data;
};

export const updateZivotinja = async (zivotinja: IZivotinja) => {
    const res = await axios.put(`/zivotinja`, zivotinja);
    return res.data;
};

export const deleteZivotinja = async (idZivotinja: number) => {
    const res = await axios.delete(`/zivotinja/${idZivotinja}`);
    return res.data;
};

export const createNewZivotinja = async (newZivotinja: IZivotinja) => {
    const res = await axios.post(`/zivotinja`, newZivotinja);
    return res.data;
};

export const getZivotinjaById = async (idZivotinja: number) => {
    const res = await axios.get(`/zivotinja/${idZivotinja}`);
    return res.data;
};