import { UseFieldArrayReturn, UseFormReset } from 'node_modules/react-hook-form/dist/types';
import { FormData } from '@common/types/Labels';
import { defaultState } from '@common/constants';
export const resetFormData = (reset: UseFormReset<FormData>, fieldsArray: Array<UseFieldArrayReturn<FormData>>) => {
    reset(defaultState);
    fieldsArray.map((field) => {
        field.replace([]);
    });
};
