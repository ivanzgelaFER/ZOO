import { IZivotinja } from "./zivotinja";

export interface INastamba {
    idNastamba?: number;
    velicina?: number;
    kapacitet?: number;
    tip?: string;
    naseljena?: boolean;
    idSektor?: number;
    zivotinje?: IZivotinja[];
}

export const nastambaInit: INastamba = {
    tip: "",
    naseljena: false,
};
