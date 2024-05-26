import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showToastMessage } from "../../actions/toastMessageActions";
import {useEffect, useState} from "react";
import { Field, FieldMetaState, Form } from "react-final-form";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { ZooContainer } from "../../containers/ZooContainer/ZooContainer";
import { InputNumber } from "primereact/inputnumber";
import { classNames } from "primereact/utils";
import {IVrstaZivotinje, vrstaZivotinjeInit} from "../../models/vrstaZivotinje";
import {createNewVrstaZivotinje, getBojeVrstiZivotinja} from "../../api/vrsteZivotinja";

export const VrstaZivotinjeForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
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


    const onSubmit = async (data: IVrstaZivotinje) => {
        setLoading(true);
        try {
            await createNewVrstaZivotinje(data);
            dispatch(showToastMessage("Uspješno dodana nova vrsta zivotinje", "success"));
        } catch (error) {
            dispatch(showToastMessage("Pogreška prilikom dodavanja nove vrste zivotinje", "error"));
        } finally {
            setLoading(false);
            navigate("/vrstazivotinje");
        }
    };

    const isFormFieldValid = (meta: FieldMetaState<any>) => {
        return meta.touched && meta.error;
    };

    const getFormErrorMessage = (meta: FieldMetaState<any>) => {
        return (
            isFormFieldValid(meta) && (
                <div>
                    <small className="p-error">{meta.error}</small>
                </div>
            )
        );
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
        return errors;
    }

    return (
        <>
            <div>
                <i
                    className={"fa fa-backward show-cursor back-action vrstazivotinje-form-back-action"}
                    onClick={() => navigate("/vrstazivotinje")}
                >
                    {"   "} N a t r a g
                </i>
            </div>
            <ZooContainer
                title="Dodaj novu vrstu zivotinje"
                centered
            >
                <div className="add-form">
                    <Form
                        onSubmit={onSubmit}
                        initialValues={vrstaZivotinjeInit}
                        validate={validate}
                        render={({ handleSubmit }) => (
                            <form
                                onSubmit={handleSubmit}
                                className="form-container"
                                autoComplete="off"
                            >
                                <Field
                                    name="boja"
                                    render={({ input, meta }) => (
                                        <div className="field">
                                            <span className="p-float-label">
                                                <InputText
                                                    id="boja"
                                                    {...input}
                                                    className={classNames({
                                                        "p-invalid": isFormFieldValid(meta),
                                                    })}
                                                />
                                                <label
                                                    htmlFor="boja"
                                                    className={classNames({
                                                        "p-error": isFormFieldValid(meta),
                                                    })}
                                                >
                                                    Boja
                                                </label>
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )}
                                />
                                <Field
                                    name="visina"
                                    render={({ input, meta }) => (
                                        <div className="field">
                                            <span className="p-float-label">
                                                <InputNumber
                                                    id="visina"
                                                    className={classNames({
                                                        "p-invalid": isFormFieldValid(meta),
                                                    })}
                                                    {...input}
                                                    onChange={(value: any) => {
                                                        input.onChange(value.value);
                                                    }}
                                                />
                                                <label
                                                    htmlFor="visina"
                                                    className={classNames({
                                                        "p-error": isFormFieldValid(meta),
                                                    })}
                                                >
                                                    Visina
                                                </label>
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )}
                                />
                                <Field
                                    name="zivotniVijek"
                                    render={({ input, meta }) => (
                                        <div className="field">
                                            <span className="p-float-label">
                                                <InputNumber
                                                    id="zivotniVijek"
                                                    className={classNames({
                                                        "p-invalid": isFormFieldValid(meta),
                                                    })}
                                                    {...input}
                                                    onChange={(value: any) => {
                                                        input.onChange(value.value);
                                                    }}
                                                />
                                                <label
                                                    htmlFor="zivotniVijek"
                                                    className={classNames({
                                                        "p-error": isFormFieldValid(meta),
                                                    })}
                                                >
                                                    Zivotni vijek
                                                </label>
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )}
                                />
                                <Button
                                    type="submit"
                                    label="Dodaj novu vrstu"
                                    loading={loading}
                                    disabled={loading}
                                />
                            </form>
                        )}
                    />
                </div>
            </ZooContainer>
        </>
    );
};
