import { useEffect, useMemo, useState } from 'react';

type Validator = (value: string) => boolean;

type FormValidations = {
    [key: string]: [Validator, string];
};

export const useForm = <T extends Record<string, string>>(
    initialForm: T,
    formValidations: FormValidations = {}
) => {

    const [formState, setFormState] = useState<T>(initialForm);
    const [formValidation, setFormValidation] = useState<Record<string, string | null>>({});

    useEffect(() => {
        createValidators();
    }, [formState]);

    useEffect(() => {
        setFormState(initialForm);
    }, [initialForm]);

    const isFormValid = useMemo(() => {

        for (const formValue of Object.keys(formValidation)) {
            if (formValidation[formValue] !== null) {
                return false;
            }
        }

        return true;

    }, [formValidation]);

    const onInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {

        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value
        });
    };

    const onResetForm = () => {
        setFormState(initialForm);
    };

    const createValidators = () => {

        const formCheckedValues: Record<string, string | null> = {};

        for (const formField of Object.keys(formValidations)) {

            const [fn, errorMessage] = formValidations[formField];

            formCheckedValues[`${formField}Valid`] =
                fn(formState[formField] ?? '')
                    ? null
                    : errorMessage;
        }

        setFormValidation(formCheckedValues);
    };

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,

        ...formValidation,
        isFormValid
    };
};