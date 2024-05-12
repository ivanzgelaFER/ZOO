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
import {deleteZivotinja, getZivotinjaById, updateZivotinja} from "../../api/zivotinje";
import {getVrsteZivotinjaOptions} from "../../api/vrsteZivotinja";

interface ILocationState {
    zivotinja: IZivotinja;
}

const cols = [
    {field: "idZivotinja", header: "Identifikator", sortable: true},
    {field: "ime", header: "Ime", sortable: true},
    {field: "starost", header: "Starost", sortable: true},
    {field: "kilaza", header: "Kilaza", sortable: true},
    {field: "idNastamba", header: "Nastamba", sortable: true},
    {field: "idVrsta", header: "Vrsta", sortable: true},
];

export const ZivotinjaDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [zivotinja, setZivotinja] = useState((location.state as ILocationState)?.zivotinja);
    const [editMode, setEditMode] = useState(false);
    const [vrsteZivotinjaOptions, setVrsteZivotinjaOptions] = useState<SelectItem[]>([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const dispatch = useDispatch();
    const [zivotinjaForEdit, setZivotinjaForEdit] = useState<IZivotinja>();

    let resetForm = () => {};

    const onSubmit = async (data: IZivotinja) => {
        try {
            const updatedZivotinjaId = await updateZivotinja(data);
            dispatch(showToastMessage(`Zivotinja s id: ${updatedZivotinjaId} uspjesno izmjenjena`, "success"));
            var zivotinjaRes = await getZivotinjaById(updatedZivotinjaId);
            setZivotinja(zivotinjaRes);
        } catch (error) {
            dispatch(showToastMessage("Greska prilikom izmjene zivotinje", "error"));
        }
    };

    const onSubmitEditZivotinja = async (data: IZivotinja) => {
        try {
            const updatedZivotinjaId = await updateZivotinja(data);
            dispatch(showToastMessage(`Zivotinja s id: ${updatedZivotinjaId} uspjesno izmjenjena`, "success"));
            var zivotinjaRes = await getZivotinjaById(zivotinja?.idZivotinja ?? 0);
            setZivotinja(zivotinjaRes);
        } catch (error) {
            dispatch(showToastMessage("Greska prilikom izmjene zivotinje", "error"));
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

    const handleDeleteZivotinja = async (rowData: IZivotinja) => {
        try {
            const deletedId = await deleteNastamba(rowData.idNastamba!);
            dispatch(showToastMessage("Uspješno brisanje zivotinje s id: " + deletedId, "success"));
        } catch (err) {
            dispatch(showToastMessage("Pogreška tijekom brisanja zivotinje.", "error"));
        } finally {
            navigate("/zivotinje");
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

    const fetchVrsteZivotinjaOptions = useCallback(async () => {
        try {
            const vrsteZivotinjaOptions = await getVrsteZivotinjaOptions();
            setVrsteZivotinjaOptions(vrsteZivotinjaOptions);
        } catch (error) {
            dispatch(showToastMessage("Pogreška prilikom dohvaćanja vrste zivotinja", "error"));
        }
    }, [dispatch]);

    useEffect(() => {
        fetchVrsteZivotinjaOptions();
    }, [fetchVrsteZivotinjaOptions]);

    const vrsteZivotinjaOptionDisplay = (id: number) => {
        if (id === -1) return "Trenutno nema dodijeljenu vrstu zivotinje";
        return vrsteZivotinjaOptions.find(vrsteZivotinja => vrsteZivotinja.value === id)?.label ?? "Nepoznata vrsta zivotinje";
    };

    return (
        <div className="zivotinja-details-container">
            <div>
                <i
                    className={"fa fa-backward show-cursor back-action"}
                    onClick={() => navigate("/zivotinje")}
                >
                    {"   "}N a t r a g
                </i>
            </div>
            <ZooContainer
                title="Detalji zivotinje"
                headerItems={
                    <>
                        <Button
                            label="Delete"
                            className="p-button-danger"
                            onClick={() => handleDeleteZivotinja(zivotinja)}
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
                                    submitFormWithId("zivotinja-details-form");
                                }}
                                icon="fa fa-save"
                            />
                        )}
                    </>
                }
            >
                <Form
                    onSubmit={onSubmit}
                    initialValues={zivotinja}
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
        </div>
    );
};
