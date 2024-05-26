import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showToastMessage } from "../../actions/toastMessageActions";
import { useCallback, useEffect, useState } from "react";
import { Field, FieldMetaState, Form } from "react-final-form";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import "./Nastambe.css";
import { ZooContainer } from "../../containers/ZooContainer/ZooContainer";
import { INastamba, nastambaInit } from "../../models/nastambe";
import {createNewNastamba, getNastambeTipovi} from "../../api/nastambe";
import { Checkbox } from "primereact/checkbox";
import { getSektoriOptions } from "../../api/sektori";
import { Dropdown } from "primereact/dropdown";
import { SelectItem } from "primereact/selectitem";
import { InputNumber } from "primereact/inputnumber";
import { classNames } from "primereact/utils";

export const NastambaForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [sektoriOptions, setSektoriOptions] = useState<SelectItem[]>([]);
    const [tipovi, setTipovi] = useState<string[]>([]);

    useEffect(() => {
        const fetchTipovi = async () => {
            try {
                const tipovi = await getNastambeTipovi();
                setTipovi(tipovi);
            } catch (error) {
                console.error("Error fetching types:", error);
            }
        };

        fetchTipovi();
    }, []);


    const onSubmit = async (data: INastamba) => {
        setLoading(true);
        try {
            await createNewNastamba(data);
            dispatch(showToastMessage("Uspješno dodana nova nastamba", "success"));
        } catch (error) {
            dispatch(showToastMessage("Pogreška prilikom dodavanja nove nastambe", "error"));
        } finally {
            setLoading(false);
            navigate("/nastambe");
        }
    };

    const fetchSektoriOptions = useCallback(async () => {
        setLoading(true);
        try {
            const sektoriOptions = await getSektoriOptions();
            setSektoriOptions(sektoriOptions);
        } catch (error) {
            dispatch(showToastMessage("Pogreška prilikom dohvaćanja sektora", "error"));
        } finally {
            setLoading(false);
        }
    }, [dispatch]);

    useEffect(() => {
        fetchSektoriOptions();
    }, [fetchSektoriOptions]);

    const validate = async (data: INastamba) => {
        const errors: any = {};
        if (!data.velicina) errors.velicina = "Veličina mora biti unesena";
        if (data.kapacitet === undefined || data.kapacitet <= 0) errors.kapacitet = "Kapacitet mora biti pozitivan broj";
        if (data.tip) {
            if (tipovi.includes(data.tip)){
                errors.tip = "Navedeni tip postoji!";
            }
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
                    className={"fa fa-backward show-cursor back-action nastamba-form-back-action"}
                    onClick={() => navigate("/nastambe")}
                >
                    {"   "} N a t r a g
                </i>
            </div>
            <ZooContainer
                title="Dodaj novu nastambu"
                centered
            >
                <div className="add-form">
                    <Form
                        onSubmit={onSubmit}
                        initialValues={nastambaInit}
                        validate={validate}
                        render={({ handleSubmit }) => (
                            <form
                                onSubmit={handleSubmit}
                                className="form-container"
                                autoComplete="off"
                            >
                                <Field
                                    name="velicina"
                                    render={({ input, meta }) => (
                                        <div className="field">
                                            <span className="p-float-label">
                                                <InputNumber
                                                    id="velicina"
                                                    {...input}
                                                    onChange={(value: any) => {
                                                        input.onChange(value.value);
                                                    }}
                                                    className={classNames({
                                                        "p-invalid": isFormFieldValid(meta),
                                                    })}
                                                />
                                                <label
                                                    htmlFor="velicina"
                                                    className={classNames({
                                                        "p-error": isFormFieldValid(meta),
                                                    })}
                                                >
                                                    Veličina nastambe (m^2)
                                                </label>
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )}
                                />
                                <Field
                                    name="kapacitet"
                                    render={({ input, meta }) => (
                                        <div className="field">
                                            <span className="p-float-label">
                                                <InputNumber
                                                    id="kapacitet"
                                                    className={classNames({
                                                        "p-invalid": isFormFieldValid(meta),
                                                    })}
                                                    {...input}
                                                    onChange={(value: any) => {
                                                        input.onChange(value.value);
                                                    }}
                                                />
                                                <label
                                                    htmlFor="kapacitet"
                                                    className={classNames({
                                                        "p-error": isFormFieldValid(meta),
                                                    })}
                                                >
                                                    Kapacitet (max broj životinja)
                                                </label>
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )}
                                />
                                <Field
                                    name="tip"
                                    render={({ input, meta }) => (
                                        <div className="field">
                                            <span className="p-float-label">
                                                <InputText
                                                    id="tip"
                                                    {...input}
                                                    className={classNames({
                                                        "p-invalid": isFormFieldValid(meta),
                                                    })}
                                                />
                                                <label
                                                    htmlFor="tip"
                                                    className={classNames({
                                                        "p-error": isFormFieldValid(meta),
                                                    })}
                                                >
                                                    Tip
                                                </label>
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )}
                                />
                                <Field
                                    name="idSektor"
                                    render={({ input }) => (
                                        <div className="field">
                                            <span className="p-float-label">
                                                <Dropdown
                                                    id="idSektor"
                                                    {...input}
                                                    options={sektoriOptions}
                                                    optionLabel="label"
                                                    optionValue="value"
                                                />
                                                <label>Sektor</label>
                                            </span>
                                        </div>
                                    )}
                                />
                                <Field
                                    name="naseljena"
                                    type="checkbox"
                                    render={({ input }) => (
                                        <div className="field">
                                            <span className="p-float-label">
                                                <Checkbox
                                                    {...input}
                                                    checked={input.checked ?? false}
                                                    id="naseljena"
                                                />
                                                <label
                                                    className="checkbox-nastambe"
                                                    htmlFor="naseljena"
                                                >
                                                    Naseljena
                                                </label>
                                            </span>
                                        </div>
                                    )}
                                />
                                <Button
                                    type="submit"
                                    label="Dodaj novu nastambu"
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
