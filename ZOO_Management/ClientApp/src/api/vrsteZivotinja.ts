import axios from "axios";
import {IVrstaZivotinje} from "../models/vrstaZivotinje";

export const getVrsteZivotinjaOptions = async () => {
    const res = await axios.get(`/vrstaZivotinje/options`);
    return res.data;
}

export const getAllVrsteZivotinja = async () => {
    const res = await axios.get(`/vrstaZivotinje`);
    return res.data;
}

export const updateVrstaZivotinje = async (vrstaZivotinje: IVrstaZivotinje) => {
    const res = await axios.put(`/vrstaZivotinje`, vrstaZivotinje);
    return res.data;
}

export const deleteVrstaZivotinje = async (idVrsta: number) => {
    const res = await axios.delete(`/vrstaZivotinje/${idVrsta}`);
    return res.data;
}

export const createNewVrstaZivotinje = async (newVrstaZivotinje: IVrstaZivotinje) => {
    const res = await axios.post(`/vrstaZivotinje`, newVrstaZivotinje);
    return res.data;
}

export const getVrstaZivotinjeById = async (idVrsta: number) => {
    const res = await axios.get(`/vrstaZivotinje/${idVrsta}`);
    return res.data;
}
