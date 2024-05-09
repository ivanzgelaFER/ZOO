import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showToastMessage } from "../../actions/toastMessageActions";
import { useState } from "react";
import { Field, Form } from "react-final-form";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import "./Nastambe.css";
import { ZooContainer } from "../../containers/ZooContainer/ZooContainer";
import { INastamba, nastambaInit } from "../../models/nastambe";
import { createNewNastamba } from "../../api/nastambe";

export const NastambaForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

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
                                            <InputText
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
                                            <InputText
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
                                name="naseljena"
                                render={({ input }) => (
                                    <div className="field">
                                        <span className="p-float-label">
                                            <InputText
                                                id="naseljena"
                                                {...input}
                                            />
                                            <label htmlFor="naseljena">Tip nastambe</label>
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
