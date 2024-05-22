import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showToastMessage } from "../../actions/toastMessageActions";
import { useCallback, useEffect, useState } from "react";
import { Field, Form } from "react-final-form";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { ZooContainer } from "../../containers/ZooContainer/ZooContainer";
import { Dropdown } from "primereact/dropdown";
import { SelectItem } from "primereact/selectitem";
import { InputNumber } from "primereact/inputnumber";
import {IZivotinja, zivotinjaInit} from "../../models/zivotinja";
import { getVrsteZivotinjaOptions } from "../../api/vrsteZivotinja";
import {createNewZivotinja} from "../../api/zivotinje";
import {getNastambeOptions} from "../../api/nastambe";

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
                        render={({ handleSubmit }) => (
                            <form
                                onSubmit={handleSubmit}
                                className="form-container"
                                autoComplete="off"
                            >
                                <Field
                                    name="ime"
                                    render={({ input }) => (
                                        <div className="field">
                                            <span className="p-float-label">
                                                <InputText
                                                    id="ime"
                                                    {...input}
                                                />
                                                <label htmlFor="ime">Ime životinje</label>
                                            </span>
                                        </div>
                                    )}
                                />
                                <Field
                                    name="kilaza"
                                    render={({ input }) => (
                                        <div className="field">
                                            <span className="p-float-label">
                                                <InputNumber
                                                    id="kilaza"
                                                    {...input}
                                                    onChange={(value: any) => {
                                                        input.onChange(value.value);
                                                    }}
                                                />
                                                <label htmlFor="kilaza">Kilaža</label>
                                            </span>
                                        </div>
                                    )}
                                />
                                <Field
                                    name="starost"
                                    render={({ input }) => (
                                        <div className="field">
                                            <span className="p-float-label">
                                                <InputNumber
                                                    id="starost"
                                                    {...input}
                                                    onChange={(value: any) => {
                                                        input.onChange(value.value);
                                                    }}
                                                />
                                                <label htmlFor="starost">Starost</label>
                                            </span>
                                        </div>
                                    )}
                                />
                                <Field
                                    name="idVrsta"
                                    render={({ input }) => (
                                        <div className="field">
                                            <span className="p-float-label">
                                                <Dropdown
                                                    id="idVrsta"
                                                    {...input}
                                                    options={vrsteZivotinjaOptions}
                                                    optionLabel="label"
                                                    optionValue="value"
                                                />
                                                <label>Vrsta</label>
                                            </span>
                                        </div>
                                    )}
                                />
                                <Field
                                    name="idNastamba"
                                    render={({ input }) => (
                                        <div className="field">
                                            <span className="p-float-label">
                                                <Dropdown
                                                    id="idNastamba"
                                                    {...input}
                                                    options={nastambeOptions}
                                                    optionLabel="label"
                                                    optionValue="value"
                                                />
                                                <label>Nastamba</label>
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
