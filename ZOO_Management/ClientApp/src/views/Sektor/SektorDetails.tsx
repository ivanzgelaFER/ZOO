import "./Sektor.css";
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
import {deleteSektor, getSektorById, getSektorNazivi, updateSektor} from "../../api/sektori";
import { ISektor } from "../../models/sektor";
import { InputText } from "primereact/inputtext";

interface ILocationState {
    sektor: ISektor;
}

export const SektorDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [sektor, setSektor] = useState((location.state as ILocationState)?.sektor);
    const [editMode, setEditMode] = useState(false);
    const dispatch = useDispatch();
    const [hasErrors, setHasErrors] = useState(false);
    const [naziviSektora, setNaziviSektora] = useState<string[]>([]);

    useEffect(() => {
        const fetchSektorNazivi = async () => {
            try {
                const nazivi = await getSektorNazivi();
                setNaziviSektora(nazivi);
            } catch (error) {
                console.error("Error fetching sector names:", error);
            }
        };

        fetchSektorNazivi();
    }, []);

    let resetForm = () => {};

    const onSubmit = async (data: ISektor) => {
        try {
            const updatedSektorId = await updateSektor(data);
            dispatch(showToastMessage(`Sektor s id: ${updatedSektorId} uspješno izmijenjen`, "success"));
            const sektorRes = await getSektorById(updatedSektorId);
            setSektor(sektorRes);
        } catch (error) {
            dispatch(showToastMessage("Greška prilikom izmjene sektora", "error"));
        }
    };

    const handleDeleteSektor = async (rowData: ISektor) => {
        try {
            const deletedId = await deleteSektor(rowData.idSektor!);
            dispatch(showToastMessage("Uspješno brisanje sektora s id: " + deletedId, "success"));
        } catch (err) {
            dispatch(showToastMessage("Pogreška tijekom brisanja sektora.", "error"));
        } finally {
            navigate("/sektor");
        }
    };

    const validate = async (data: ISektor) => {
        const errors: any = {};
        const nazivRegex = /^(?=.*[a-zA-Z])(?=.*\d).+$/;

        if (!data.naziv) {
            errors.naziv = "Naziv mora biti unesen";
        } else if (!nazivRegex.test(data.naziv)) {
            errors.naziv = "Naziv mora sadržavati i slova i brojeve";
        } else if (data.naziv){
            if (naziviSektora.includes(data.naziv)) {
                errors.naziv = "Naziv već postoji";
            }
        }

        if (data.povrsina === undefined || data.povrsina <= 0) {
            errors.povrsina = "Površina mora biti pozitivan broj";
        }

        return errors;
    };
    return (
        <div className="sektor-details-container">
            <div>
                <i
                    className={"fa fa-backward show-cursor back-action"}
                    onClick={() => navigate("/sektor")}
                >
                    {"   "}N a t r a g
                </i>
            </div>
            <ZooContainer
                title="Detalji sektora"
                headerItems={
                    <>
                        <Button
                            label="Delete"
                            className="p-button-danger"
                            onClick={() => handleDeleteSektor(sektor)}
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
                                    submitFormWithId("sektor-details-form");
                                }}
                                icon="fa fa-save"
                            />
                        )}
                    </>
                }
            >
                <Form
                    onSubmit={onSubmit}
                    initialValues={sektor}
                    validate={validate}
                >
                    {({ handleSubmit, form }) => {
                        resetForm = form.reset;
                        return (
                            <form
                                onSubmit={handleSubmit}
                                autoComplete="off"
                                id="sektor-details-form"
                            >
                                <table className="dataview">
                                    <tbody>
                                        <tr>
                                            <th>
                                                <strong>Naziv sektora</strong>
                                            </th>
                                            <td>
                                                <FieldOrDisplay
                                                    editMode={editMode}
                                                    name="naziv"
                                                    fieldRender={(input, hasErrors) => (
                                                        <InputText
                                                            className={classNames({
                                                                "p-invalid": hasErrors,
                                                            })}
                                                            {...input}
                                                        />
                                                    )}
                                                    displayRender={<span>{sektor.naziv}</span>}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <strong>Površina sektora</strong>
                                            </th>
                                            <td>
                                                <FieldOrDisplay
                                                    editMode={editMode}
                                                    name="povrsina"
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
                                                    displayRender={<span>{sektor.povrsina}</span>}
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
