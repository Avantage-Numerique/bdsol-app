type Inputs<T> = { [K: keyof T]: { value: any; isValid: boolean } };

type FormState<T> = {
    inputs: Inputs<T>;
    isValid: boolean;
    hasAnyInputBeenTouched: boolean;
};

type FormTools<T> = {
    formState: FormState<T>;
    inputHandler: any;
    inputTouched: boolean;
    clearFormData: () => any;
    updateManyFields: any;
    listInvalidInput: () => any;
    mapInvalidInputToListItems: () => any;
};

type UseForm = (initialState: Inputs) => {
    formState: FormState<Inputs>;
    formTools: FormTools<Inputs>;
    clearFormData: any;
    updateManyFields: any;
};

type UseFormUtils = (
    initialState: Inputs,
    actions: { clearForm?: boolean; displayResMessage?: boolean; callbackFunction?: () => {}; redirect?: Url }
) => {
    FormUI: any;
    submitRequest: any;
    formState: FormState<Inputs>;
    formTools: FormTools<Inputs>;
    requestResponse: any;
    clearFormData: any;
    updateManyFields: any;
};
