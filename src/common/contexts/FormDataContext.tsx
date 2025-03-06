import { createContext, useContext, ReactNode, useState } from 'react';
import { FormData } from '@common/types/Labels';
import { FormDataContextType } from '@common/types/contexts';

export const FormDataContext = createContext<FormDataContextType>({
    formData: null,
    setFormData: () => {},
});

export const FormDataProvider = ({ children }: { children: ReactNode }) => {
    const [formData, setFormData] = useState<FormData | null>(null);

    return <FormDataContext.Provider value={{ formData, setFormData }}>{children}</FormDataContext.Provider>;
};

export const useFormData = () => useContext(FormDataContext);
