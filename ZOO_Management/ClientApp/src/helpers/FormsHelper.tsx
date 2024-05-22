import { ReactNode, Dispatch, SetStateAction } from "react";
import { FieldInputProps, FieldProps, FieldMetaState, Field } from "react-final-form";

export const submitFormWithId = (id: string) => {
    const formElement = document.getElementById(id);
    if (formElement) {
        formElement.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
    }
};

type IFieldOrDisplayProps = {
    editMode: boolean;
    name: string;
    fieldRender: (input: FieldInputProps<any>, hasError?: boolean) => ReactNode;
    displayRender: ReactNode;
    editUserGuid?: string;
    onChangeAdditional?: Dispatch<SetStateAction<any>>;
} & FieldProps<any, any>;

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

export const FieldOrDisplay = ({ editMode, name, fieldRender, displayRender, roles, editUserGuid, onChangeAdditional, ...props }: IFieldOrDisplayProps) => {
    return (
        <>
            {editMode ? (
                <Field
                    {...props}
                    name={name}
                    render={({ input, meta }) => (
                        <>
                            {fieldRender(
                                onChangeAdditional
                                    ? {
                                          ...input,
                                          onChange: e => {
                                              input.onChange(e);
                                              onChangeAdditional(e);
                                          },
                                      }
                                    : input,
                                isFormFieldValid(meta)
                            )}
                            {getFormErrorMessage(meta)}
                        </>
                    )}
                />
            ) : (
                displayRender
            )}
        </>
    );
};
