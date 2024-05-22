import "./Nastambe.css";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { INastamba } from "../../models/nastambe";
import { Field, Form } from "react-final-form";
import { useDispatch } from "react-redux";
import { showToastMessage } from "../../actions/toastMessageActions";
import { FieldOrDisplay, submitFormWithId } from "../../helpers/FormsHelper";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { ZooContainer } from "../../containers/ZooContainer/ZooContainer";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputSwitch } from "primereact/inputswitch";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { getSektoriOptions } from "../../api/sektori";
import { SelectItem } from "primereact/selectitem";
import { deleteNastamba, getNastambaById, updateNastamba } from "../../api/nastambe";
import { Dialog } from "primereact/dialog";
import { IZivotinja } from "../../models/zivotinja";
import { deleteZivotinja, updateZivotinja } from "../../api/zivotinje";
import { getVrsteZivotinjaOptions } from "../../api/vrsteZivotinja";
import { error } from "console";

interface ILocationState {
    nastamba: INastamba;
}

const cols = [
    { field: "idZivotinja", header: "Identifikator životinje", sortable: true },
    { field: "ime", header: "Ime", sortable: false },
    { field: "kilaza", header: "Kilaža", sortable: true },
    { field: "starost", header: "Starost (godine)", sortable: true },
];

export const NastambaDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [nastamba, setNastamba] = useState((location.state as ILocationState)?.nastamba);
    const [editMode, setEditMode] = useState(false);
    const [sektoriOptions, setSektoriOptions] = useState<SelectItem[]>([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const dispatch = useDispatch();
    const [zivotinjaForEdit, setZivotinjaForEdit] = useState<IZivotinja>();
    const [vrsteZivotinjaOptions, setVrsteZivotinjaOptions] = useState<SelectItem[]>([]);
    const [hasErrors, setHasErrors] = useState(false);

    let resetForm = () => {};

    const onSubmit = async (data: INastamba) => {
        try {
            const updatedNastambaId = await updateNastamba(data);
            dispatch(showToastMessage(`Nastamba s id: ${updatedNastambaId} uspjesno izmjenjena`, "success"));
            var nastambaRes = await getNastambaById(updatedNastambaId);
            setNastamba(nastambaRes);
        } catch (error) {
            dispatch(showToastMessage("Greska prilikom izmjene nastambe", "error"));
        }
    };

    const onSubmitEditZivotinja = async (data: IZivotinja) => {
        try {
            const updatedZivotinjaId = await updateZivotinja(data);
            dispatch(showToastMessage(`Zivotinja s id: ${updatedZivotinjaId} uspjesno izmjenjena`, "success"));
            var nastambaRes = await getNastambaById(nastamba.idNastamba ?? 0);
            setNastamba(nastambaRes);
        } catch (error) {
            dispatch(showToastMessage("Greska prilikom izmjene nastambe", "error"));
        } finally {
            setDialogOpen(false);
        }
    };
    const actionColumnEdit = (rowData: IZivotinja) => {
        return (
            <Button
                icon="fa fa-pencil"
                onClick={() => {
                    setZivotinjaForEdit(rowData);
                    setDialogOpen(true);
                }}
            />
        );
    };

    const handleDeleteNastamba = async (rowData: INastamba) => {
        try {
            const deletedId = await deleteNastamba(rowData.idNastamba!);
            dispatch(showToastMessage("Uspješno brisanje nastambe s id: " + deletedId, "success"));
        } catch (err) {
            dispatch(showToastMessage("Pogreška tijekom brisanja nastambe.", "error"));
        } finally {
            navigate("/nastambe");
        }
    };

    const handleDeleteZivotinja = async (rowData: IZivotinja) => {
        try {
            const deletedId = await deleteZivotinja(rowData.idZivotinja);
            dispatch(showToastMessage("Uspješno brisanje zivotinja s id: " + deletedId, "success"));
        } catch (err) {
            dispatch(showToastMessage("Pogreška tijekom brisanja zivotinje.", "error"));
        } finally {
            var nastambaRes = await getNastambaById(nastamba.idNastamba ?? 0);
            setNastamba(nastambaRes);
        }
    };

    const actionColumnDeleteZivotinja = (rowData: IZivotinja) => {
        return (
            <Button
                className="button-delete-nastamba"
                icon="fa fa-trash"
                onClick={() => {
                    handleDeleteZivotinja(rowData);
                }}
            />
        );
    };

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

    const fetchVrsteOptions = useCallback(async () => {
        try {
            const vrste = await getVrsteZivotinjaOptions();
            setVrsteZivotinjaOptions(vrste);
        } catch (error) {
            dispatch(showToastMessage("Pogreška prilikom dohvaćanja vrsta zivotinja", "error"));
        }
    }, [dispatch]);

    useEffect(() => {
        fetchSektoriOptions();
    }, [fetchSektoriOptions]);

    useEffect(() => {
        fetchVrsteOptions();
    }, [fetchVrsteOptions]);

    const sektorOptionDisplay = (id: number) => {
        if (id === -1) return "Trenutno nema dodijeljen sektor";
        return sektoriOptions.find(sektor => sektor.value === id)?.label ?? "Nepoznat sektor";
    };

    const validate = (data: INastamba) => {
        const errors: any = {};
        if (!data.velicina) errors.velicina = "Veličina mora biti unesena";
        if (data.kapacitet === undefined || data.kapacitet <= 0) errors.kapacitet = "Kapacitet mora biti pozitivan broj";
        setHasErrors(Object.keys(errors).length > 0);
        return errors;
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
                            onClick={() => handleDeleteNastamba(nastamba)}
                        />
                        <Button
                            label={editMode ? "Cancle" : "Edit"}
                            onClick={() => {
                                setEditMode(!editMode);
                                resetForm();
                            }}
                            disabled={hasErrors}
                            className={classNames({
                                "p-button-secondary": editMode,
                            })}
                            icon={editMode ? "fa fa-times" : "fa fa-pencil"}
                        />

                        {editMode && (
                            <Button
                                label="Spremi promjene"
                                className="p-button-success"
                                disabled={hasErrors}
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
                    validate={validate}
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
                                                        <InputNumber
                                                            className={classNames({
                                                                "p-invalid": hasErrors,
                                                            })}
                                                            {...input}
                                                            onChange={(value: any) => {
                                                                input.onChange(value.value);
                                                            }}
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
                                                        <InputNumber
                                                            className={classNames({
                                                                "p-invalid": hasErrors,
                                                            })}
                                                            {...input}
                                                            onChange={(value: any) => {
                                                                input.onChange(value.value);
                                                            }}
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
                                            <th>Sektor</th>
                                            <td>
                                                <FieldOrDisplay
                                                    editMode={editMode}
                                                    name={"idSektor"}
                                                    fieldRender={input => (
                                                        <Dropdown
                                                            id={"idSektor"}
                                                            {...input}
                                                            options={sektoriOptions}
                                                        />
                                                    )}
                                                    displayRender={sektorOptionDisplay(nastamba.idSektor ?? -1)}
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
                                                    type="checkbox"
                                                    fieldRender={input => (
                                                        <InputSwitch
                                                            {...input}
                                                            checked={input.checked ?? false}
                                                        />
                                                    )}
                                                    displayRender={
                                                        <InputSwitch
                                                            disabled
                                                            checked={nastamba.naseljena ?? false}
                                                        />
                                                    }
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
                    value={nastamba.zivotinje ?? []}
                    emptyMessage={"Trenutno nema zapisa."}
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
                        key={"idVrsta"}
                        field={"idVrsta"}
                        header={"Vrsta zivotinje"}
                        body={(rowData: IZivotinja) => {
                            return vrsteZivotinjaOptions.find(x => x.value === rowData.idVrsta)?.label || "";
                        }}
                    />
                    <Column
                        key={"Uredi"}
                        field={"idZivotinja"}
                        header={"Uredi"}
                        body={actionColumnEdit}
                    />
                    <Column
                        key={"Obriši"}
                        field={"idZivotinja"}
                        header={"Obriši"}
                        body={actionColumnDeleteZivotinja}
                    />
                </DataTable>
            </div>
            <Dialog
                visible={dialogOpen}
                id="edit-zivotinja"
                header={`Uredi podatke o životinji:  `}
                draggable={false}
                onHide={() => setDialogOpen(false)}
            >
                <Form
                    onSubmit={(data: IZivotinja) => onSubmitEditZivotinja(data)}
                    initialValues={zivotinjaForEdit}
                    render={({ handleSubmit }) => (
                        <form
                            id="edit-zivotinja"
                            onSubmit={handleSubmit}
                            className="form-container"
                            autoComplete="off"
                        >
                            <Field
                                name="ime"
                                render={({ input }) => (
                                    <div className="field">
                                        <span>Ime</span>
                                        <span className="p-float-label">
                                            <InputText
                                                id="ime"
                                                {...input}
                                            />
                                        </span>
                                    </div>
                                )}
                            />
                            <Field
                                name="kilaza"
                                render={({ input }) => (
                                    <div className="field">
                                        <span>Kilaža</span>
                                        <span className="p-float-label">
                                            <InputNumber
                                                id="kilaza"
                                                {...input}
                                                onChange={(value: any) => {
                                                    input.onChange(value.value);
                                                }}
                                            />
                                        </span>
                                    </div>
                                )}
                            />
                            <Field
                                name="starost"
                                render={({ input }) => (
                                    <div className="field">
                                        <span>Starost</span>
                                        <span className="p-float-label">
                                            <InputNumber
                                                id="starost"
                                                {...input}
                                                onChange={(value: any) => {
                                                    input.onChange(value.value);
                                                }}
                                            />
                                        </span>
                                    </div>
                                )}
                            />
                            <Field
                                name="idVrsta"
                                render={({ input }) => (
                                    <div className="field">
                                        <span>Vrsta</span>
                                        <span className="p-float-label">
                                            <Dropdown
                                                id={"idVrsta"}
                                                {...input}
                                                options={vrsteZivotinjaOptions}
                                            />
                                        </span>
                                    </div>
                                )}
                            />
                            <div className="submit-buttons-in-modal">
                                <Button
                                    label="Cancel"
                                    onClick={() => setDialogOpen(false)}
                                    icon="pi pi-times"
                                    type="button"
                                />
                                <Button
                                    label="Uredi životinju"
                                    icon="pi pi-check"
                                    type="submit"
                                />
                            </div>
                        </form>
                    )}
                />
            </Dialog>
        </div>
    );
};
