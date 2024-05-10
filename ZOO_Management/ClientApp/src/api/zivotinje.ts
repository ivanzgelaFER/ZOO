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
