import { useEffect, useState, useCallback } from 'react';
import { ControllerRenderProps } from 'react-hook-form';
import { FormData } from '@common/types/Labels';

const useSetPreview = (field: ControllerRenderProps<FormData, 'avatar'>) => {
    const [preview, setPreview] = useState<string>('');

    useEffect(() => {
        if (typeof field.value === 'string') {
            setPreview(field.value);
        } else if (field.value instanceof File) {
            const reader = new FileReader();
            reader.onload = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(field.value);
        } else {
            setPreview('');
        }
    }, [field.value]);

    const handleFileChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (file) {
                field.onChange(file);
            }
        },
        [field],
    );

    return { preview, handleFileChange };
};

export default useSetPreview;
