import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showToastMessage } from "../../actions/toastMessageActions";
import { useCallback, useEffect, useState } from "react";
import {Field, FieldMetaState, Form} from "react-final-form";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { ZooContainer } from "../../containers/ZooContainer/ZooContainer";
import { Dropdown } from "primereact/dropdown";
import { SelectItem } from "primereact/selectitem";
import { InputNumber } from "primereact/inputnumber";
import {IZivotinja, zivotinjaInit} from "../../models/zivotinja";
import {getVrsteZivotinjaOptions, getZivotniVijekjeByVrstaId} from "../../api/vrsteZivotinja";
import {createNewZivotinja} from "../../api/zivotinje";
import {getNastambeOptions} from "../../api/nastambe";
import {classNames} from "primereact/utils";

export const ZivotinjaForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [vrsteZivotinjaOptions, setVrsteZivotinjaOptions] = useState<SelectItem[]>([]);
    const [nastambeOptions, setNastambeOptions] = useState<SelectItem[]>([]);
    const onSubmit = async (data: IZivotinja) => {
        setLoading(true);
        try {
            await createNewZivotinja(data);
            dispatch(showToastMessage("Uspješno dodana nova zivotinja", "success"));
        } catch (error) {
            dispatch(showToastMessage("Pogreška prilikom dodavanja nove zivotinje", "error"));
        } finally {
            setLoading(false);
            navigate("/zivotinja");
        }
    };

    const fetchVrsteZivotinjaOptions = useCallback(async () => {
        setLoading(true);
        try {
            const vrsteZivotinjaOptions = await getVrsteZivotinjaOptions();
            setVrsteZivotinjaOptions(vrsteZivotinjaOptions);
        } catch (error) {
            dispatch(showToastMessage("Pogreška prilikom dohvaćanja vrste zivotinja", "error"));
        } finally {
            setLoading(false);
        }
    }, [dispatch]);

    useEffect(() => {
        fetchVrsteZivotinjaOptions();
    }, [fetchVrsteZivotinjaOptions]);

    const fetchNastambeOptions = useCallback(
        async () => {
            setLoading(true);
            try {
                 const nastambeOptions = await getNastambeOptions();
                 setNastambeOptions(nastambeOptions);
            } catch (error) {
                dispatch(showToastMessage("Pogreška prilikom dohvaćanja nastambi", "error"));
            } finally {
                setLoading(false);
            }
        }, [dispatch]);

    useEffect(() => {
        fetchNastambeOptions();
    }, [fetchNastambeOptions]);

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
                    className={"fa fa-backward show-cursor back-action zivotinja-form-back-action"}
                    onClick={() => navigate("/zivotinja")}
                >
                    {"   "} N a t r a g
                </i>
            </div>
            <ZooContainer
                title="Dodaj novu zivotinju"
                centered
            >
                <div className="add-form">
                    <Form
                        onSubmit={onSubmit}
                        initialValues={zivotinjaInit}
                        validate={validate}
                        render={({ handleSubmit }) => (
                            <form
                                onSubmit={handleSubmit}
                                className="form-container"
                                autoComplete="off"
                            >
                                <Field
                                    name="ime"
                                    render={({ input, meta }) => (
                                        <div className="field">
                                                <InputText
                                                    id="ime"
                                                    {...input}
                                                    className={classNames({
                                                        "p-invalid": isFormFieldValid(meta),
                                                    })}
                                                />
                                                <label
                                                    htmlFor="ime"
                                                    className={classNames({
                                                        "p-error": isFormFieldValid(meta),
                                                    })}
                                                >
                                                    Ime životinje
                                                </label>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )}
                                />
                                <Field
                                    name="kilaza"
                                    render={({ input, meta }) => (
                                        <div className="field">
                                            <span className="p-float-label">
                                                <InputNumber
                                                    id="kilaza"
                                                    className={classNames({
                                                        "p-invalid": isFormFieldValid(meta),
                                                    })}
                                                    {...input}
                                                    onChange={(value: any) => {
                                                        input.onChange(value.value);
                                                    }}
                                                />
                                                <label
                                                    htmlFor="kilaza"
                                                    className={classNames({
                                                        "p-error": isFormFieldValid(meta),
                                                    })}
                                                >
                                                    Kilaža
                                                </label>
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )}
                                />
                                <Field
                                    name="idVrsta"
                                    render={({ input, meta }) => (
                                        <div className="field">
                                            <span className="p-float-label">
                                                <Dropdown
                                                    id="idVrsta"
                                                    {...input}
                                                    options={vrsteZivotinjaOptions}
                                                    className={classNames({
                                                        "p-invalid": isFormFieldValid(meta),
                                                    })}
                                                    optionLabel="label"
                                                    optionValue="value"
                                                />
                                                <label
                                                    htmlFor="idVrsta"
                                                    className={classNames({
                                                        "p-error": isFormFieldValid(meta),
                                                    })}
                                                >
                                                    Vrsta
                                                </label>
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )}
                                />
                                <Field
                                    name="starost"
                                    render={({ input, meta }) => (
                                        <div className="field">
                                            <span className="p-float-label">
                                                <InputNumber
                                                    id="starost"
                                                    className={classNames({
                                                        "p-invalid": isFormFieldValid(meta),
                                                    })}
                                                    {...input}
                                                    onChange={(value: any) => {
                                                        input.onChange(value.value);
                                                    }}
                                                />
                                                <label
                                                    htmlFor="starost"
                                                    className={classNames({
                                                        "p-error": isFormFieldValid(meta),
                                                    })}
                                                >
                                                    Starost
                                                </label>
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )}
                                />
                                <Field
                                    name="idNastamba"
                                    render={({ input, meta }) => (
                                        <div className="field">
                                            <span className="p-float-label">
                                                <Dropdown
                                                    id="idNastamba"
                                                    {...input}
                                                    options={nastambeOptions}
                                                    className={classNames({
                                                        "p-invalid": isFormFieldValid(meta),
                                                    })}
                                                    optionLabel="label"
                                                    optionValue="value"
                                                />
                                                <label
                                                    htmlFor="idNastamba"
                                                    className={classNames({
                                                        "p-error": isFormFieldValid(meta),
                                                    })}
                                                >
                                                    Nastamba
                                                </label>
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )}
                                />
                                <Button
                                    type="submit"
                                    label="Submit"
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
