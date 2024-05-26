import axios from "axios";
import { SelectItem } from "primereact/selectitem";
import { ISektor } from "../models/sektor";

export const getSektoriOptions = async () => {
    const res = await axios.get("/sektor/options");
    return res.data as SelectItem[];
};

export const getAllSektori = async () => {
    const res = await axios.get("/sektor");
    return res.data as ISektor[];
};

export const getSektorById = async (id: number) => {
    const res = await axios.get(`/sektor/${id}`);
    return res.data;
};

export const deleteSektor = async (id: number) => {
    const res = await axios.delete(`/sektor/${id}`);
    return res.data;
};

export const createNewSektor = async (sektor: ISektor) => {
    const res = await axios.post("/sektor", sektor);
    return res.data;
};

export const updateSektor = async (sektor: ISektor) => {
    const res = await axios.put("/sektor", sektor);
    return res.data;
};

export const getSektorNazivi = async () => {
    const res = await axios.get("/sektor/nazivi");
    return res.data as string[];
}