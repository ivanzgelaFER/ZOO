import "./Sektor.css";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useNavigate } from "react-router-dom";
import { ISektor } from "../../models/sektor";
import { showToastMessage } from "../../actions/toastMessageActions";
import { deleteSektor, getAllSektori } from "../../api/sektori";

const cols = [
    { field: "idSektor", header: "Identifikator", sortable: true },
    { field: "naziv", header: "Naziv sektora", sortable: true },
    { field: "povrsina", header: "Površina sektora (metri kvadratni)", sortable: true },
];

export const Sektor = () => {
    const [sektori, setSektori] = useState<ISektor[]>([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fetchSektori = useCallback(async () => {
        try {
            const res = await getAllSektori();
            setSektori(res);
        } catch (error) {
            dispatch(showToastMessage("Pogreska prilikom dohvata svih sektora.", "error"));
        }
    }, [dispatch]);

    const handleDeleteSektor = async (rowData: ISektor) => {
        try {
            const deletedId = await deleteSektor(rowData.idSektor!);
            dispatch(showToastMessage("Uspješno brisanje sektora s id: " + deletedId, "success"));
        } catch (err) {
            dispatch(showToastMessage("Pogreška tijekom brisanja sektora.", "error"));
        } finally {
            fetchSektori();
        }
    };
    const actionColumnDelete = (rowData: ISektor) => {
        return (
            <Button
                className="button-delete-sektor"
                icon="fa fa-trash"
                onClick={() => {
                    handleDeleteSektor(rowData);
                }}
            />
        );
    };

    useEffect(() => {
        fetchSektori();
    }, [fetchSektori]);

    return (
        <div className="sektor-container">
            <h1>Sektori</h1>
            <div>
                <div className="sektor-add-new">
                    <h3>Klikni na redak za više informacija!</h3>
                    <Button
                        label="Dodaj novi sektor"
                        icon="fa fa-plus"
                        onClick={() => navigate("/sektor-add")}
                    />
                </div>
                <DataTable
                    resizableColumns
                    showGridlines
                    value={sektori}
                    emptyMessage={"Trenutno nema zapisa."}
                    onRowClick={rowData => {
                        navigate("/sektor-details", {
                            state: {
                                sektor: sektori.find(x => x.idSektor === rowData.data.idSektor),
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
                        field={"idSektor"}
                        header={"Obriši"}
                        body={actionColumnDelete}
                    />
                </DataTable>
            </div>
        </div>
    );
};
