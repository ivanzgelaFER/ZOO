export interface IVrstaZivotinje{
    idVrsta: number;
    boja?: string;
    visina?: number;
    zivotniVijek?: number;
}

export const vrstaZivotinjeInit: IVrstaZivotinje = {
    idVrsta: 0,
    boja: "",
    visina: 0,
    zivotniVijek: 0
};