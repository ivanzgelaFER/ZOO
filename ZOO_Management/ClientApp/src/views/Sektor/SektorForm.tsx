import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showToastMessage } from "../../actions/toastMessageActions";
import { useState } from "react";
import { Field, Form } from "react-final-form";
import { Button } from "primereact/button";
import "./Sektor.css";
import { ZooContainer } from "../../containers/ZooContainer/ZooContainer";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { ISektor, sektorInit } from "../../models/sektor";
import { createNewSektor } from "../../api/sektori";

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
                        render={({ handleSubmit }) => (
                            <form
                                onSubmit={handleSubmit}
                                className="form-container"
                                autoComplete="off"
                            >
                                <Field
                                    name="naziv"
                                    type="text"
                                    render={({ input }) => (
                                        <div className="field">
                                            <span className="p-float-label">
                                                <InputText
                                                    id="naziv"
                                                    {...input}
                                                />
                                                <label htmlFor="naziv">Naziv sektora</label>
                                            </span>
                                        </div>
                                    )}
                                />
                                <Field
                                    name="povrsina"
                                    render={({ input }) => (
                                        <div className="field">
                                            <span className="p-float-label">
                                                <InputNumber
                                                    id="povrsina"
                                                    {...input}
                                                    onChange={(value: any) => {
                                                        input.onChange(value.value);
                                                    }}
                                                />
                                                <label htmlFor="povrsina">Površina sektora</label>
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
