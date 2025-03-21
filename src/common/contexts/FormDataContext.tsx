import { createContext, useContext, ReactNode, useState } from 'react';
import { FormData } from '@common/types/Labels';
import { FormDataContextType } from '@common/types/contexts';
const defaultState: FormData = {
    id: '',
    CVname: '',
    name: '',
    lastName: '',
    email: '',
    telephone: '',
    aboutMe: '',
    avatar: '',
    technicalSkills: [],
    socialLabels: [],
    languageLabels: [],
    educationLabels: [],
    courseLabels: [],
    positionLabels: [],
};
export const FormDataContext = createContext<FormDataContextType>({
    formData: defaultState,
    setFormData: () => {},
});

export const FormDataProvider = ({ children }: { children: ReactNode }) => {
    const [formData, setFormData] = useState<FormData>(defaultState);

    return <FormDataContext.Provider value={{ formData, setFormData }}>{children}</FormDataContext.Provider>;
};

export const useFormData = () => useContext(FormDataContext);
