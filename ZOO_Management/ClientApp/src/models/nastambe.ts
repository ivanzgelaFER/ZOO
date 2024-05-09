export interface INastamba {
    idNastamba?: number;
    velicina?: number;
    kapacitet?: number;
    tip?: string;
    naseljena?: boolean;
    idSektor?: number;
}

export const nastambaInit: INastamba = {
    tip: "",
    naseljena: false,
};
