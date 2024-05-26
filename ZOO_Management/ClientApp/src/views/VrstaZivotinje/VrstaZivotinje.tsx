import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useNavigate } from "react-router-dom";
import { showToastMessage } from "../../actions/toastMessageActions";
import {IVrstaZivotinje} from "../../models/vrstaZivotinje";
import {deleteVrstaZivotinje, getAllVrsteZivotinja} from "../../api/vrsteZivotinja";
import {InputText} from "primereact/inputtext";

const cols = [
    { field: "idVrsta", header: "Identifikator", sortable: true },
    { field: "boja", header: "Boja", sortable: true },
    { field: "visina", header: "Visina", sortable: true },
    { field: "zivotniVijek", header: "Zivotni Vijek", sortable: true }
];

export const VrstaZivotinje = () => {
    const [vrsteZivotinja, setVrsteZivotinja] = useState<IVrstaZivotinje[]>([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [filterValue, setFilterValue] = useState("");

    const filteredVrste = vrsteZivotinja.filter(vrsta =>
        vrsta.boja?.toLowerCase().includes(filterValue.toLowerCase())
    );

    const fetchVrsteZivotinja = useCallback(async () => {
        try {
            const res = await getAllVrsteZivotinja();
            setVrsteZivotinja(res);
        } catch (error) {
            dispatch(showToastMessage("Pogreska prilikom dohvata svih vrsti zivotinja.", "error"));
        }
    }, [dispatch]);

    const handleDeleteVrsteZivotinja = async (rowData: IVrstaZivotinje) => {
        try {
            const deletedId = await deleteVrstaZivotinje(rowData.idVrsta);
            dispatch(showToastMessage("Uspješno vrste zivotinja s id: " + deletedId, "success"));
        } catch (err) {
            dispatch(showToastMessage("Pogreška tijekom brisanja vrste zivotinja.", "error"));
        } finally {
            fetchVrsteZivotinja();
        }
    };
    const actionColumnDelete = (rowData: IVrstaZivotinje) => {
        return (
            <Button
                className="button-delete-vrstazivotinje"
                icon="fa fa-trash"
                onClick={() => {
                    handleDeleteVrsteZivotinja(rowData);
                }}
            />
        );
    };

    useEffect(() => {
        fetchVrsteZivotinja();
    }, [fetchVrsteZivotinja]);

    return (
        <div className="vrstazivotinje-details-container">
            <h1>Vrste Zivotinja</h1>
            <div>
                <div className="vrstazivotinje-add-new">
                    <h3>Klikni na redak za više informacija!</h3>
                    <Button
                        label="Dodaj novu vrstu zivotinja"
                        icon="fa fa-plus"
                        onClick={() => navigate("/vrstazivotinje-add")}
                    />
                </div>
                <div className="search-bar">
                    <InputText
                        value={filterValue}
                        onChange={(e) => setFilterValue(e.target.value)}
                        placeholder="Pretraži po boji"
                    />
                </div>
                <DataTable
                    resizableColumns
                    showGridlines
                    value={filteredVrste}
                    emptyMessage={"Trenutno nema zapisa."}
                    onRowClick={rowData => {
                        navigate("/vrstazivotinje-details", {
                            state: {
                                vrsta: vrsteZivotinja.find(x => x.idVrsta === rowData.data.idVrsta),
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
                        key={"Obriši"}
                        field={"idVrsta"}
                        header={"Obriši"}
                        body={actionColumnDelete}
                    />
                </DataTable>
            </div>
        </div>
    );
};
