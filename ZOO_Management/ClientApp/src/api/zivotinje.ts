import axios from "axios";

export const getZivotinjeByNastambaId = async (nastambaId: number) => {
    const res = await axios.get(`zivotinja/${nastambaId}/getByNastambaId`);
    return res.data;
};
