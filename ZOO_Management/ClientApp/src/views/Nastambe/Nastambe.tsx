import "./Nastambe.css";
import { useCallback, useEffect, useState } from "react";
import { INastamba } from "../../models/nastambe";
import { deleteNastamba, getAllNastambe } from "../../api/nastambe";
import { useDispatch } from "react-redux";
import { showToastMessage } from "../../actions/toastMessageActions";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useNavigate } from "react-router-dom";
import { SelectItem } from "primereact/selectitem";
import { getSektoriOptions } from "../../api/sektori";
import { InputText } from "primereact/inputtext";

const cols = [
    { field: "idNastamba", header: "Identifikator", sortable: true },
    { field: "tip", header: "Tip nastambe", sortable: false },
    { field: "velicina", header: "Veličina nastambe", sortable: true },
    { field: "kapacitet", header: "Kapacitet nastambe", sortable: true },
];

export const Nastambe = () => {
    const [nastambe, setNastambe] = useState<INastamba[]>([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [sektoriOptions, setSektoriOptions] = useState<SelectItem[]>([]);
    const [filterValue, setFilterValue] = useState("");

    const filteredNastambe = nastambe.filter(nastamba => nastamba.tip?.toLowerCase().includes(filterValue.toLowerCase()));

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
            const deletedId = await deleteNastamba(rowData.idNastamba!);
            dispatch(showToastMessage("Uspješno brisanje nastambe s id: " + deletedId, "success"));
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
        try {
            const sektoriOptions = await getSektoriOptions();
            setSektoriOptions(sektoriOptions);
        } catch (error) {
            dispatch(showToastMessage("Pogreška prilikom dohvaćanja sektora", "error"));
        }
    }, [dispatch]);

    useEffect(() => {
        fetchSektoriOptions();
    }, [fetchSektoriOptions]);

    return (
        <div className="nastambe-container">
            <h1>Nastambe</h1>
            <div>
                <div className="nastamba-add-new">
                    <h3>Klikni na redak za više informacija!</h3>
                    <Button
                        label="Dodaj novu nastambu"
                        icon="fa fa-plus"
                        onClick={() => navigate("/nastamba-add")}
                    />
                </div>
                <div className="search-bar">
                    <InputText
                        type="text"
                        placeholder="Pretraži po tipu nastambe"
                        value={filterValue}
                        onChange={e => setFilterValue(e.target.value)}
                    />
                </div>
                <DataTable
                    resizableColumns
                    showGridlines
                    value={filteredNastambe}
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
                        key={"idSektor"}
                        field={"idSektor"}
                        header={"Sektor"}
                        body={rowdata => sektoriOptions.find(x => x.value === rowdata.idSektor)?.label || ("" as any)}
                    />
                    <Column
                        key={"naseljena"}
                        field={"naseljena"}
                        header={"Trenutno naseljena"}
                        body={rowdata => (rowdata.naseljena ? "Da" : "Ne")}
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
