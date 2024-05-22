export interface IZivotinja {
    idZivotinja: number;
    idNastamba?: number;
    idVrsta?: number;
    starost?: number;
    kilaza?: number;
    ime: string;
}

export const zivotinjaInit: IZivotinja = {
    idZivotinja: 0,
    starost: 0,
    kilaza: 0,
    ime: ""
}