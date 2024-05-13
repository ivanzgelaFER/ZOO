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

export const deleteVrstaZivotinje = async (idVrstaZivotinje: number) => {
    const res = await axios.delete(`/vrstaZivotinje/${idVrstaZivotinje}`);
    return res.data;
}

export const createNewVrstaZivotinje = async (newVrstaZivotinje: IVrstaZivotinje) => {
    const res = await axios.post(`/vrstaZivotinje`, newVrstaZivotinje);
    return res.data;
}

export const getVrstaZivotinjeById = async (idVrstaZivotinje: number) => {
    const res = await axios.get(`/vrstaZivotinje/${idVrstaZivotinje}`);
    return res.data;
}
