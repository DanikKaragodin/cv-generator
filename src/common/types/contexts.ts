import { FormData } from '@common/types/Labels';
export type FormDataContextType = {
    formData: FormData | null;
    setFormData: (data: FormData) => void;
};
