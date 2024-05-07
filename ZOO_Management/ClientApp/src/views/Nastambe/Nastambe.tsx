import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import "./Nastambe.css";
import { useCallback, useEffect, useState } from "react";
import { INastamba } from "../../models/nastambe";
import { getAllNastambe } from "../../api/nastambe";
import { Column } from "primereact/column";

const cols = [
    { field: "idNastamba", header: "Identifikator", sortable: true },
    { field: "velicina", header: "Valičina nastambe", sortable: true },
    { field: "kapacitet", header: "Kapacitet nastambe", sortable: false },
    { field: "tip", header: "Tip nastambe", sortable: false },
    { field: "naseljena", header: "Trenutno naseljena", sortable: false },
];

export const Nastambe = () => {
    const [nastambe, setNastambe] = useState<INastamba[]>([]);

    const fetchNastambe = useCallback(async () => {
        try {
            const res = await getAllNastambe();
            setNastambe(res);
        } catch (error) {
            //dispatch(showToastMessage("An error has occurred while fetching all satellites.", "error"));
        }
    }, []);

    useEffect(() => {
        fetchNastambe();
    }, [fetchNastambe]);

    return (
        <div className="nastambe-container">
            <h1>Nastambe</h1>
            <div>
                <div className="satelite-add-new">
                    <h3>Klikni na redak za više informacija!</h3>
                    <Button label="Dodaj novu nastambu" />
                </div>
                <DataTable
                    resizableColumns
                    showGridlines
                    value={nastambe}
                    emptyMessage={"Trenutno nema zapisa."}
                    responsiveLayout="stack"
                    onRowClick={rowData => {
                        console.log(rowData);
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
                </DataTable>
            </div>
        </div>
    );
};
