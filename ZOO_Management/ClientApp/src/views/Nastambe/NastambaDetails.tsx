import "./Nastambe.css";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { INastamba } from "../../models/nastambe";
import { Form } from "react-final-form";
import { useDispatch } from "react-redux";
import { showToastMessage } from "../../actions/toastMessageActions";
import { FieldOrDisplay, submitFormWithId } from "../../helpers/FormsHelper";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { ZooContainer } from "../../containers/ZooContainer/ZooContainer";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { getZivotinjeByNastambaId } from "../../api/zivotinje";
import { IZivotinja } from "../../models/zivotinja";

interface ILocationState {
    nastamba: INastamba;
}

const cols = [
    { field: "ime", header: "Ime", sortable: false },
    { field: "kilaza", header: "Kilaža", sortable: true },
    { field: "starost", header: "Starost (godine)", sortable: true },
    { field: "idZivotinja", header: "Identifikator životinje", sortable: true },
    { field: "idNastamba", header: "Identifikator nastambe", sortable: true },
    { field: "idVrsta", header: "Vrsta", sortable: true },
];

export const NastambaDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [nastamba, setNastamba] = useState((location.state as ILocationState)?.nastamba);
    const [editMode, setEditMode] = useState(false);
    const [zivotinje, setZivotinje] = useState<IZivotinja[]>([]);

    const dispatch = useDispatch();

    let resetForm = () => {};

    const onSubmit = useCallback(
        async (data: INastamba) => {
            try {
                dispatch(showToastMessage("Nastamba uspješno izmjenjena", "success"));
            } catch (error) {
                dispatch(showToastMessage("Greška prilikom izmjene nastambe", "error"));
            }
        },
        [dispatch]
    );

    const fetchZivotinjeByNastambaId = useCallback(async () => {
        try {
            const res = await getZivotinjeByNastambaId(nastamba.idNastamba!);
            setZivotinje(res);
        } catch (error) {
            dispatch(showToastMessage("Pogreska prilikom dohvata svih nastambi.", "error"));
        }
    }, [dispatch, nastamba.idNastamba]);

    useEffect(() => {
        fetchZivotinjeByNastambaId();
    }, [fetchZivotinjeByNastambaId]);

    const actionColumnEdit = (rowData: INastamba) => {
        return (
            <Button
                icon="fa fa-pencil"
                onClick={() => {
                    //handleDeleteNastamba(rowData);
                }}
            />
        );
    };

    const actionColumnDelete = (rowData: INastamba) => {
        return (
            <Button
                className="button-delete-nastamba"
                icon="fa fa-trash"
                onClick={() => {
                    //handleDeleteNastamba(rowData);
                }}
            />
        );
    };

    return (
        <div className="nastamba-details-container">
            <div>
                <i
                    className={"fa fa-backward show-cursor back-action"}
                    onClick={() => navigate("/nastambe")}
                >
                    {"   "}N a t r a g
                </i>
            </div>
            <ZooContainer
                title="Detalji nastambe"
                headerItems={
                    <>
                        <Button
                            label="Delete"
                            className="p-button-danger"
                        />
                        <Button
                            label={editMode ? "Cancle" : "Edit"}
                            onClick={() => {
                                setEditMode(!editMode);
                                resetForm();
                            }}
                            className={classNames({
                                "p-button-secondary": editMode,
                            })}
                            icon={editMode ? "fa fa-times" : "fa fa-pencil"}
                        />

                        {editMode && (
                            <Button
                                label="Spremi promjene"
                                className="p-button-success"
                                onClick={() => {
                                    setEditMode(false);
                                    submitFormWithId("nastamba-details-form");
                                }}
                                icon="fa fa-save"
                            />
                        )}
                    </>
                }
            >
                <Form
                    onSubmit={onSubmit}
                    initialValues={nastamba}
                >
                    {({ handleSubmit, form }) => {
                        resetForm = form.reset;
                        return (
                            <form
                                onSubmit={handleSubmit}
                                autoComplete="off"
                                id="nastamba-details-form"
                            >
                                <table className="dataview">
                                    <tbody>
                                        <tr>
                                            <th>
                                                <strong>Veličina nastambe</strong>
                                            </th>
                                            <td>
                                                <FieldOrDisplay
                                                    editMode={editMode}
                                                    name="velicina"
                                                    fieldRender={(input, hasErrors) => (
                                                        <InputText
                                                            className={classNames({
                                                                "p-invalid": hasErrors,
                                                            })}
                                                            {...input}
                                                        />
                                                    )}
                                                    displayRender={<span>{nastamba.velicina}</span>}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <strong>Kapacitet nastambe</strong>
                                            </th>
                                            <td>
                                                <FieldOrDisplay
                                                    editMode={editMode}
                                                    name="kapacitet"
                                                    fieldRender={(input, hasErrors) => (
                                                        <InputText
                                                            className={classNames({
                                                                "p-invalid": hasErrors,
                                                            })}
                                                            {...input}
                                                        />
                                                    )}
                                                    displayRender={<span>{nastamba.kapacitet}</span>}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <strong>Tip nastambe</strong>
                                            </th>
                                            <td>
                                                <FieldOrDisplay
                                                    editMode={editMode}
                                                    name="tip"
                                                    fieldRender={(input, hasErrors) => (
                                                        <InputText
                                                            className={classNames({
                                                                "p-invalid": hasErrors,
                                                            })}
                                                            {...input}
                                                        />
                                                    )}
                                                    displayRender={<span>{nastamba.tip}</span>}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <strong>Nastamba naseljena</strong>
                                            </th>
                                            <td>
                                                <FieldOrDisplay
                                                    editMode={editMode}
                                                    name="naseljena"
                                                    fieldRender={(input, hasErrors) => (
                                                        <InputText
                                                            className={classNames({
                                                                "p-invalid": hasErrors,
                                                            })}
                                                            {...input}
                                                        />
                                                    )}
                                                    displayRender={<span>{nastamba.naseljena}</span>}
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </form>
                        );
                    }}
                </Form>
            </ZooContainer>
            <h3>Životinje unutar nastambe</h3>
            <div className="nastambe-container">
                <DataTable
                    resizableColumns
                    showGridlines
                    value={zivotinje}
                    emptyMessage={"Trenutno nema zapisa."}
                    onRowClick={rowData => {}}
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
                        key={"Uredi"}
                        field={"idZivotinja"}
                        header={"Uredi"}
                        body={actionColumnEdit}
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
