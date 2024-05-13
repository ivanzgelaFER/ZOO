import "./Zivotinja.css";
import {useCallback, useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {SelectItem} from "primereact/selectitem";
import {showToastMessage} from "../../actions/toastMessageActions";
import {Button} from "primereact/button";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {IZivotinja} from "../../models/zivotinja";
import {deleteZivotinja, getAllZivotinje} from "../../api/zivotinje";
import {getVrsteZivotinjaOptions} from "../../api/vrsteZivotinja";

const cols = [
    {field: "idZivotinja", header: "Identifikator", sortable: true},
    {field: "ime", header: "Ime", sortable: true},
    {field: "starost", header: "Starost", sortable: true},
    {field: "kilaza", header: "Kilaza", sortable: true},
];

export const Zivotinje = () => {
    const [zivotinje, setZivotinje] = useState<IZivotinja[]>([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [vrsteZivotinjaOptions, setVrsteZivotinjaOptions] = useState<SelectItem[]>([]);

    const fetchZivotinje = useCallback(async () => {
        try {
            const res = await getAllZivotinje();
            setZivotinje(res);
        } catch (error) {
            dispatch(showToastMessage("Pogreska prilikom dohvata svih zivotinja.", "error"));
        }
    }, [dispatch]);

    const handleDeleteZivotinja = async (rowData: IZivotinja) => {
        try {
            const deletedId = await deleteZivotinja(rowData.idZivotinja!);
            dispatch(showToastMessage("Uspješno brisanje zivotinje s id: " + deletedId, "success"));
            fetchZivotinje();
        } catch (err) {
            dispatch(showToastMessage("Pogreška tijekom brisanja zivotinje.", "error"));
        }
    };

    const actionColumnDelete = (rowData: IZivotinja) => {
        return (
            <Button
                className="button-delete-zivotinja"
                icon="fa fa-trash"
                onClick={() => {
                    handleDeleteZivotinja(rowData);
                }}
            />
        );
    };

    useEffect(() => {
        fetchZivotinje();
    }, [fetchZivotinje]);

    const fetchVrsteZivotinjaOptions = useCallback(async () => {
        try {
            const vrsteZivotinjaOptions = await getVrsteZivotinjaOptions();
            setVrsteZivotinjaOptions(vrsteZivotinjaOptions);
        } catch (error) {
            dispatch(showToastMessage("Pogreška prilikom dohvaćanja vrsta zivotinja", "error"));
        }
    }, [dispatch]);

    useEffect(() => {
        fetchVrsteZivotinjaOptions();
    }, [fetchVrsteZivotinjaOptions]);

    return (
        <div className="zivotinje-container">
            <h1>Zivotinje</h1>
            <div>
                <div className="zivotinja-add-new">
                    <h3>Klikni na redak za više informacija!</h3>
                    <Button
                        label="Dodaj novu zivotinju"
                        icon="fa fa-plus"
                        onClick={() => navigate("/zivotinja-add")}
                    />
                </div>
                <DataTable
                    resizableColumns
                    showGridlines
                    value={zivotinje}
                    emptyMessage={"Trenutno nema zapisa."}
                    onRowClick={rowData => {
                        navigate("/zivotinja-details", {
                            state: {
                                zivotinja: zivotinje.find(x => x.idZivotinja === rowData.data.idZivotinja),
                            },
                        });
                    }}
                >
                    {cols.map(col => {
                        return (
                            <Column
                                key={col.field}
                                field={col.field}
                                header={col.header}
                                sortable={col.sortable}
                            />
                        );
                    })}
                    <Column
                        key={"idVrstaZivotinje"}
                        field={"idVrstaZivotinje"}
                        header={"VrstaZivotinje"}
                        body={rowdata => vrsteZivotinjaOptions.find(x => x.value === rowdata.idVrsta)?.label || ("" as any)}
                    />
                    <Column
                        key={"Obriši"}
                        field={"idNastamba"}
                        header={"Obriši"}
                        body={actionColumnDelete}
                    />
                </DataTable>
            </div>
        </div>
    );
};