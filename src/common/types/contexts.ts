import { FormData } from '@common/types/Labels';
export type FormDataContextType = {
    formData: FormData;
    setFormData: (data: FormData) => void;
};
