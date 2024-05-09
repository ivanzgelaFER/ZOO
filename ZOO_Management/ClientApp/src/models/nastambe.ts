export interface INastamba {
    idNastamba?: number;
    velicina?: number;
    kapacitet?: number;
    tip?: string;
    naseljena?: boolean;
}

export const nastambaInit: INastamba = {
    idNastamba: undefined,
    velicina: undefined,
    kapacitet: undefined,
    tip: "",
    naseljena: false,
};
