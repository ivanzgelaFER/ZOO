import {useEffect, useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form } from "react-final-form";
import { useDispatch } from "react-redux";
import { showToastMessage } from "../../actions/toastMessageActions";
import { FieldOrDisplay, submitFormWithId } from "../../helpers/FormsHelper";
import { classNames } from "primereact/utils";
import { ZooContainer } from "../../containers/ZooContainer/ZooContainer";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import {IVrstaZivotinje} from "../../models/vrstaZivotinje";
import {
    deleteVrstaZivotinje,
    getBojeVrstiZivotinja,
    getVrstaZivotinjeById,
    updateVrstaZivotinje
} from "../../api/vrsteZivotinja";

interface ILocationState {
    vrsta: IVrstaZivotinje;
}

export const VrstaZivotinjeDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [vrstazivotinje, setvrstazivotinje] = useState((location.state as ILocationState)?.vrsta);
    const [editMode, setEditMode] = useState(false);
    const dispatch = useDispatch();
    const [hasErrors, setHasErrors] = useState(false);
    const [boje, setBoje] = useState<string[]>([]);

    useEffect(() => {
        const fetchBoje = async () => {
            try {
                const nazivi = await getBojeVrstiZivotinja();
                setBoje(nazivi);
            } catch (error) {
                console.error("Error fetching colors:", error);
            }
        };

        fetchBoje();
    }, []);


    console.log("Location state:", location.state);

    let resetForm = () => {};

    const onSubmit = async (data: IVrstaZivotinje) => {
        try {
            const updatedVrstaZivotinje = await updateVrstaZivotinje(data);
            dispatch(showToastMessage(`Vrsta zivotinje s id: ${updatedVrstaZivotinje} uspješno izmijenjen`, "success"));
            const vrstazivotinjeRes = await getVrstaZivotinjeById(updatedVrstaZivotinje);
            setvrstazivotinje(vrstazivotinjeRes);
        } catch (error) {
            dispatch(showToastMessage("Greška prilikom izmjene vrste zivotinja", "error"));
        }
    };

    const handleDeleteVrstaZivotinje = async (rowData: IVrstaZivotinje) => {
        try {
            const deletedId = await deleteVrstaZivotinje(rowData.idVrsta);
            dispatch(showToastMessage("Uspješno brisanje vrste zivotinja s id: " + deletedId, "success"));
        } catch (err) {
            dispatch(showToastMessage("Pogreška tijekom brisanja vrste zivotinja.", "error"));
        } finally {
            navigate("/vrstazivotinje");
        }
    };

    const validate = async (data: IVrstaZivotinje) => {
        const errors: any = {};

        if (!data.boja) {
            errors.boja = "Boja mora biti unesena";
        } else if (data.boja) {
            if (boje.includes(data.boja)) {
                errors.boja = "Već postoji vrsta zivotinje s tom bojom";
            }
        }

        if (data.visina === undefined || data.visina <= 0) {
            errors.visina = "Visina mora biti pozitivan broj";
        } else if(data.visina > 10) {
            errors.visina = "Visina ne može biti veća od 10 metara";
        }

        if (data.zivotniVijek === undefined || data.zivotniVijek <= 0 ) {
            errors.zivotniVijek = "Zivotni vijek mora biti pozitivan broj";
        } else if(data.zivotniVijek > 150) {
            errors.zivotniVijek = "Zivotni vijek ne može biti veći od 150 godina";
        }
        setHasErrors(Object.keys(errors).length > 0);
        return errors;
    }

    return (
        <div className="vrstazivotinje-details-container">
            <div>
                <i
                    className={"fa fa-backward show-cursor back-action"}
                    onClick={() => navigate("/vrstazivotinje")}
                >
                    {"   "}N a t r a g
                </i>
            </div>
            <ZooContainer
                title="Detalji vrste zivotine"
                headerItems={
                    <>
                        <Button
                            label="Delete"
                            className="p-button-danger"
                            onClick={() => handleDeleteVrstaZivotinje(vrstazivotinje)}
                        />
                        <Button
                            label={editMode ? "Cancel" : "Edit"}
                            disabled={hasErrors}
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
                                disabled={hasErrors}
                                onClick={() => {
                                    setEditMode(false);
                                    submitFormWithId("vrstazivotinje-details-form");
                                }}
                                icon="fa fa-save"
                            />
                        )}
                    </>
                }
            >
                <Form
                    onSubmit={onSubmit}
                    initialValues={vrstazivotinje}
                    validate={validate}
                >
                    {({ handleSubmit, form }) => {
                        resetForm = form.reset;
                        return (
                            <form
                                onSubmit={handleSubmit}
                                autoComplete="off"
                                id="vrstazivotinje-details-form"
                            >
                                <table className="dataview">
                                    <tbody>
                                    <tr>
                                        <th>
                                            <strong>Boja</strong>
                                        </th>
                                        <td>
                                            <FieldOrDisplay
                                                editMode={editMode}
                                                name="boja"
                                                fieldRender={(input, hasErrors) => (
                                                    <InputText
                                                        className={classNames({
                                                            "p-invalid": hasErrors,
                                                        })}
                                                        {...input}
                                                    />
                                                )}
                                                displayRender={<span>{vrstazivotinje?.boja}</span>}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <strong>Visina</strong>
                                        </th>
                                        <td>
                                            <FieldOrDisplay
                                                editMode={editMode}
                                                name="visina"
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
                                                displayRender={<span>{vrstazivotinje?.visina}</span>}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <strong>Životni vijek</strong>
                                        </th>
                                        <td>
                                            <FieldOrDisplay
                                                editMode={editMode}
                                                name="zivotnivijek"
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
                                                displayRender={<span>{vrstazivotinje?.zivotniVijek}</span>}
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
