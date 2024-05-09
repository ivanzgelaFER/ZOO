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
import { InputNumber, InputNumberValueChangeEvent } from "primereact/inputnumber";

export const NastambaForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [sektoriOptions, setSektoriOptions] = useState<SelectItem[]>([]);

    const onSubmit = async (data: INastamba) => {
        setLoading(true);
        try {
            await createNewNastamba(data);
            dispatch(showToastMessage("Uspješno dodana nova nastamba", "success"));
        } catch (error) {
            dispatch(showToastMessage("Pogreška prilikom dodavanja nove nastambe", "error"));
        } finally {
            setLoading(false);
            console.log("finally");
            navigate("/nastambe");
        }
    };

    const fetchSektoriOptions = useCallback(async () => {
        setLoading(true);
        try {
            const sektoriOptions = await getSektoriOptions();
            console.log(sektoriOptions);
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

    return (
        <ZooContainer
            title="Dodaj novu nastambu"
            centered
        >
            <div className="residential-building-form-container add-form">
                <Form
                    onSubmit={onSubmit}
                    initialValues={nastambaInit}
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
    );
};
