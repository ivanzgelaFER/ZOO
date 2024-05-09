import axios from "axios";
import { SelectItem } from "primereact/selectitem";

export const getSektoriOptions = async () => {
    const res = await axios.get("/sektor/options");
    return res.data as SelectItem[];
};
