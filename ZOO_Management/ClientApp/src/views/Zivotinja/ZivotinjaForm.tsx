import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showToastMessage } from "../../actions/toastMessageActions";
import { useCallback, useEffect, useState } from "react";
import { Field, Form } from "react-final-form";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import "./Nastambe.css";
import { ZooContainer } from "../../containers/ZooContainer/ZooContainer";
import { INastamba, nastambaInit } from "../../models/nastambe";
import { createNewNastamba } from "../../api/nastambe";
import { Checkbox } from "primereact/checkbox";
import { getSektoriOptions } from "../../api/sektori";
import { Dropdown } from "primereact/dropdown";
import { SelectItem } from "primereact/selectitem";
import { InputNumber } from "primereact/inputnumber";
import {IZivotinja} from "../../models/zivotinja";
import {getVrsteZivotinjaOptions} from "../../api/vrsteZivotinja";

export const ZivotinjaForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [vrsteZivotinjaOptions, setVrsteZivotinjaOptions] = useState<SelectItem[]>([]);

    const onSubmit = async (data: IZivotinja) => {
        setLoading(true);
        try {
            await createNewNastamba(data);
            dispatch(showToastMessage("Uspješno dodana nova zivotinja", "success"));
        } catch (error) {
            dispatch(showToastMessage("Pogreška prilikom dodavanja nove zivotinje", "error"));
        } finally {
            setLoading(false);
            navigate("/zivotinje");
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

    return (
        <>
            <div>
                <i
                    className={"fa fa-backward show-cursor back-action zivotinja-form-back-action"}
                    onClick={() => navigate("/zivotinje")}
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
                        render={({ handleSubmit }) => (
                            <form
                                onSubmit={handleSubmit}
                                className="form-container"
                                autoComplete="off"
                            >
                                <Field
                                    name="velicina"
                                    render={({ input }) => (
                                        <div className="field">
                                            <span className="p-float-label">
                                                <InputNumber
                                                    id="velicina"
                                                    {...input}
                                                    onChange={(value: any) => {
                                                        input.onChange(value.value);
                                                    }}
                                                />
                                                <label htmlFor="velicina">Veličina nastambe (m^2)</label>
                                            </span>
                                        </div>
                                    )}
                                />
                                <Field
                                    name="kapacitet"
                                    render={({ input }) => (
                                        <div className="field">
                                            <span className="p-float-label">
                                                <InputNumber
                                                    id="kapacitet"
                                                    {...input}
                                                    onChange={(value: any) => {
                                                        input.onChange(value.value);
                                                    }}
                                                />
                                                <label htmlFor="kapacitet">Kapacitet (max broj životinja)</label>
                                            </span>
                                        </div>
                                    )}
                                />
                                <Field
                                    name="tip"
                                    render={({ input }) => (
                                        <div className="field">
                                            <span className="p-float-label">
                                                <InputText
                                                    id="tip"
                                                    {...input}
                                                />
                                                <label htmlFor="tip">Tip nastambe</label>
                                            </span>
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
