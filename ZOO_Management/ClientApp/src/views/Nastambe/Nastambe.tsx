import "./Nastambe.css";
import { useCallback, useEffect, useState } from "react";
import { INastamba } from "../../models/nastambe";
import { getAllNastambe } from "../../api/nastambe";
import { useDispatch } from "react-redux";
import { showToastMessage } from "../../actions/toastMessageActions";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useNavigate } from "react-router-dom";
import { SelectItem } from "primereact/selectitem";
import { getSektoriOptions } from "../../api/sektori";

const cols = [
    { field: "idNastamba", header: "Identifikator", sortable: true },
    { field: "velicina", header: "Valičina nastambe", sortable: true },
    { field: "kapacitet", header: "Kapacitet nastambe", sortable: true },
    { field: "tip", header: "Tip nastambe", sortable: false },
    { field: "naseljena", header: "Trenutno naseljena", sortable: false },
    { field: "idSektor", header: "Sektor", sortable: false },
];

export const Nastambe = () => {
    const [nastambe, setNastambe] = useState<INastamba[]>([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [sektoriOptions, setSektoriOptions] = useState<SelectItem[]>([]);

    const fetchNastambe = useCallback(async () => {
        try {
            const res = await getAllNastambe();
            setNastambe(res);
        } catch (error) {
            dispatch(showToastMessage("Pogreska prilikom dohvata svih nastambi.", "error"));
        }
    }, [dispatch]);

    const handleDeleteNastamba = async (rowData: INastamba) => {
        try {
            //TODO brisanje
            dispatch(showToastMessage("Uspješno brisanje nastambe s id: " + rowData.idNastamba, "success"));
            fetchNastambe();
        } catch (err) {
            dispatch(showToastMessage("Pogreška tijekom brisanja nastambe.", "error"));
        }
    };

    const actionColumnDelete = (rowData: INastamba) => {
        return (
            <Button
                className="button-delete-nastamba"
                icon="fa fa-trash"
                //tooltip={"Obriši"} POKAZUJE SE ISPOD FOOTERA IZ NEKOG RAZLOGA
                onClick={() => {
                    handleDeleteNastamba(rowData);
                }}
            />
        );
    };

    useEffect(() => {
        fetchNastambe();
    }, [fetchNastambe]);

    const fetchSektoriOptions = useCallback(async () => {
        setLoading(true);
        try {
            const sektoriOptions = await getSektoriOptions();
            console.log(sektoriOptions);
            setSektoriOptions(sektoriOptions);
        } catch (error) {
            dispatch(showToastMessage("Pogreška prilikom dohvaćanja sektora", "error"));
        } finally {
            setLoading(false);
        }
    }, [dispatch]);

    useEffect(() => {
        fetchSektoriOptions();
    }, [fetchSektoriOptions]);

    return (
        <div className="nastambe-container">
            <h1>Nastambe</h1>
            <div>
                <div className="satelite-add-new">
                    <h3>Klikni na redak za više informacija!</h3>
                    <Button
                        label="Dodaj novu nastambu"
                        icon="fa fa-plus"
                        onClick={() => navigate("/nastamba-add")}
                    />
                </div>
                <DataTable
                    resizableColumns
                    showGridlines
                    value={nastambe}
                    emptyMessage={"Trenutno nema zapisa."}
                    onRowClick={rowData => {
                        navigate("/nastamba-details", {
                            state: {
                                nastamba: nastambe.find(x => x.idNastamba === rowData.data.idNastamba),
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
                        field={"idNastamba"}
                        header={"Obriši"}
                        body={actionColumnDelete}
                    />
                </DataTable>
            </div>
        </div>
    );
};
