import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showToastMessage } from "../../actions/toastMessageActions";
import { useState } from "react";
import { Field, FieldMetaState, Form } from "react-final-form";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import "./Sektor.css";
import { ZooContainer } from "../../containers/ZooContainer/ZooContainer";
import { InputNumber } from "primereact/inputnumber";
import { ISektor, sektorInit } from "../../models/sektor";
import { createNewSektor } from "../../api/sektori";
import { classNames } from "primereact/utils";

export const SektorForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data: ISektor) => {
        setLoading(true);
        try {
            await createNewSektor(data);
            dispatch(showToastMessage("Uspješno dodana novi sektor", "success"));
        } catch (error) {
            dispatch(showToastMessage("Pogreška prilikom dodavanja novog sektora", "error"));
        } finally {
            setLoading(false);
            navigate("/sektor");
        }
    };

    const validate = (data: ISektor) => {
        const errors: any = {};
        const nazivRegex = /^(?=.*[a-zA-Z])(?=.*\d).+$/;

        if (!data.naziv) {
            errors.naziv = "Naziv mora biti unesen";
        } else if (!nazivRegex.test(data.naziv)) {
            errors.naziv = "Naziv mora sadržavati i slova i brojeve";
        }

        if (data.povrsina === undefined || data.povrsina <= 0) {
            errors.povrsina = "Površina mora biti pozitivan broj";
        }

        return errors;
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

    return (
        <>
            <div>
                <i
                    className={"fa fa-backward show-cursor back-action sektor-form-back-action"}
                    onClick={() => navigate("/sektor")}
                >
                    {"   "} N a t r a g
                </i>
            </div>
            <ZooContainer
                title="Dodaj novi sektor"
                centered
            >
                <div className="add-form">
                    <Form
                        onSubmit={onSubmit}
                        initialValues={sektorInit}
                        validate={validate}
                        render={({ handleSubmit }) => (
                            <form
                                onSubmit={handleSubmit}
                                className="form-container"
                                autoComplete="off"
                            >
                                <Field
                                    name="naziv"
                                    render={({ input, meta }) => (
                                        <div className="field">
                                            <span className="p-float-label">
                                                <InputText
                                                    id="naziv"
                                                    {...input}
                                                    className={classNames({
                                                        "p-invalid": isFormFieldValid(meta),
                                                    })}
                                                />
                                                <label
                                                    htmlFor="naziv"
                                                    className={classNames({
                                                        "p-error": isFormFieldValid(meta),
                                                    })}
                                                >
                                                    Naziv sektora
                                                </label>
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )}
                                />
                                <Field
                                    name="povrsina"
                                    render={({ input, meta }) => (
                                        <div className="field">
                                            <span className="p-float-label">
                                                <InputNumber
                                                    id="povrsina"
                                                    className={classNames({
                                                        "p-invalid": isFormFieldValid(meta),
                                                    })}
                                                    {...input}
                                                    onChange={(value: any) => {
                                                        input.onChange(value.value);
                                                    }}
                                                />
                                                <label
                                                    htmlFor="povrsina"
                                                    className={classNames({
                                                        "p-error": isFormFieldValid(meta),
                                                    })}
                                                >
                                                    Površina sektora
                                                </label>
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )}
                                />
                                <Button
                                    type="submit"
                                    label="Dodaj novi sektor"
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
