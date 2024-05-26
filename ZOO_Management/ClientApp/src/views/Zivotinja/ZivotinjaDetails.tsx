import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Field, Form } from "react-final-form";
import { useDispatch } from "react-redux";
import { showToastMessage } from "../../actions/toastMessageActions";
import { FieldOrDisplay, submitFormWithId } from "../../helpers/FormsHelper";
import { classNames } from "primereact/utils";
import { ZooContainer } from "../../containers/ZooContainer/ZooContainer";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { SelectItem } from "primereact/selectitem";
import { IZivotinja } from "../../models/zivotinja";
import {deleteZivotinja, getZivotinjaById, updateZivotinja} from "../../api/zivotinje";
import {getVrsteZivotinjaOptions, getZivotniVijekjeByVrstaId} from "../../api/vrsteZivotinja";
import {getNastambeOptions} from "../../api/nastambe";
import {InputText} from "primereact/inputtext";

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
    const [hasErrors, setHasErrors] = useState(false);
    const [nasambeOptions, setNastambeOptions] = useState<SelectItem[]>([]);

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
            const deletedId = await deleteZivotinja(rowData.idZivotinja!);
            dispatch(showToastMessage("Uspješno brisanje zivotinje s id: " + deletedId, "success"));
        } catch (err) {
            dispatch(showToastMessage("Pogreška tijekom brisanja zivotinje.", "error"));
        } finally {
            navigate("/zivotinja");
        }
    };

    const actionColumnDeleteZivotinja = (rowData: IZivotinja) => {
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

    const fetchVrsteZivotinjaOptions = useCallback(async () => {
        try {
            const vrsteZivotinjaOptions = await getVrsteZivotinjaOptions();
            setVrsteZivotinjaOptions(vrsteZivotinjaOptions);
        } catch (error) {
            dispatch(showToastMessage("Pogreška prilikom dohvaćanja vrste zivotinja", "error"));
        }
    }, [dispatch]);

    const fetchNastambeOptions = useCallback(async () => {
        try {
            const nastambeOptions = await getNastambeOptions();
            setNastambeOptions(nastambeOptions);
        } catch (error) {
            dispatch(showToastMessage("Pogreška prilikom dohvaćanja nastambi", "error"));
        }
    }, [dispatch]);

    useEffect(() => {
        fetchVrsteZivotinjaOptions();
    }, [fetchVrsteZivotinjaOptions]);

    useEffect(() => {
        fetchNastambeOptions();
    }, [fetchNastambeOptions]);

    const vrsteZivotinjaOptionDisplay = (id: number) => {
        if (id === -1) return "Trenutno nema dodijeljenu vrstu zivotinje";
        return vrsteZivotinjaOptions.find(vrsteZivotinja => vrsteZivotinja.value === id)?.label ?? "Nepoznata vrsta zivotinje";
    };

    const nastambeOptionDisplay = (id: number) => {
        if (id === -1) return "Trenutno nema dodijeljenu nastambu";
        return nasambeOptions.find(nastambe => nastambe.value === id)?.label ?? "Nepoznata nastamba";
    }

    const validate = async (values: IZivotinja) => {
        const errors: any = {};

        if (!values.ime || values.ime.trim() === "") {
            errors.ime = "Ime mora biti uneseno.";
        } else if (values.ime.length > 20) {
            errors.ime = "Ime mora imati manje od 20 znakova.";
        }

        if (values.starost === undefined || values.starost === null || values.starost < 0) {
            errors.starost = "Starost mora biti pozitivan broj.";
        }

        if (values.kilaza === undefined || values.kilaza === null || values.kilaza < 0) {
            errors.kilaza = "Kilaza mora biti pozitivan broj.";
        } else if (values.kilaza > 500) {
            errors.kilaza = "Kilaza mora biti manja od 500 kg.";
        }

        if (!values.idVrsta || values.idVrsta < 0) {
            errors.idVrsta = "Vrsta zivotinje mora biti odabrana";
        } else if (values.idVrsta) {
            try {
                const zivotniVijek = await getZivotniVijekjeByVrstaId(values.idVrsta);
                console.log(zivotniVijek)
                if (values.starost !== undefined && values.starost > zivotniVijek) {
                    errors.starost = `Starost mora biti manja od maksimalne starosti za vrstu: ${zivotniVijek} godina.`;
                }
            } catch (error) {
                console.log(error);
                errors.starost = "Došlo je do greške pri dohvaćanju maksimalne starosti za vrstu.";
            }
        }

        if (!values.idNastamba || values.idNastamba < 0) {
            errors.idNastamba = "Nastamba mora biti odabrana";
        }
        return errors;
    }


    return (
        <div className="zivotinja-details-container">
            <div>
                <i
                    className={"fa fa-backward show-cursor back-action"}
                    onClick={() => navigate("/zivotinja")}
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
                    validate={validate}
                >
                    {({ handleSubmit, form }) => {
                        resetForm = form.reset;
                        return (
                            <form
                                onSubmit={handleSubmit}
                                autoComplete="off"
                                id="zivotinja-details-form"
                            >
                                <table className="dataview">
                                    <tbody>
                                    <tr>
                                        <th>
                                            <strong>Ime životinje</strong>
                                        </th>
                                        <td>
                                            <FieldOrDisplay
                                                editMode={editMode}
                                                name="ime"
                                                fieldRender={(input, hasErrors) => (
                                                    <InputText
                                                        className={classNames({
                                                            "p-invalid": hasErrors,
                                                        })}
                                                        {...input}
                                                    />
                                                )}
                                                displayRender={<span>{zivotinja?.ime}</span>}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <strong>Starost životinje</strong>
                                        </th>
                                        <td>
                                            <FieldOrDisplay
                                                editMode={editMode}
                                                name="starost"
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
                                                displayRender={<span>{zivotinja?.starost}</span>}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <strong>Kilaža životinje</strong>
                                        </th>
                                        <td>
                                            <FieldOrDisplay
                                                editMode={editMode}
                                                name="kilaza"
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
                                                displayRender={<span>{zivotinja?.kilaza}</span>}
                                            />
                                        </td>
                                    </tr>

                                    <tr>
                                        <th>Vrsta životinje</th>
                                        <td>
                                            <FieldOrDisplay
                                                editMode={editMode}
                                                name={"idVrsta"}
                                                fieldRender={input => (
                                                    <Dropdown
                                                        id={"idVrsta"}
                                                        {...input}
                                                        options={vrsteZivotinjaOptions}
                                                    />
                                                )}
                                                displayRender={vrsteZivotinjaOptionDisplay(zivotinja?.idVrsta ?? -1)}
                                            />
                                        </td>
                                    </tr>

                                    <tr>
                                        <th>
                                            <strong>Nastamba</strong>
                                        </th>
                                        <td>
                                            <FieldOrDisplay
                                                editMode={editMode}
                                                name="idNastamba"
                                                fieldRender={(input, hasErrors) => (
                                                    <Dropdown
                                                        id={"idNastamba"}
                                                        className={classNames({
                                                            "p-invalid": hasErrors,
                                                        })}
                                                        {...input}
                                                         options={nasambeOptions}
                                                    />
                                                )}
                                                displayRender={nastambeOptionDisplay(zivotinja?.idNastamba ?? -1)}
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
