import { Control, FieldArrayPath, FieldArrayWithId, FieldErrors, UseFieldArrayReturn } from 'react-hook-form';
import { FormData } from './Labels';
export interface LabelsProps {
    fields: FieldArrayWithId<FormData, FieldArrayPath<FormData>, 'id'>[];
    append: () => void;
    remove: (index: number) => void;
    control: Control<FormData, unknown>;
    errors: FieldErrors<FormData>;
}
export interface LabelProps {
    index: number;
    onRemove: () => void;
    control: Control<FormData, unknown>;
    errors: FieldErrors<FormData>;
}
export interface ProjectLabelProps {
    control: Control<FormData>;
    positionIndex: number;
    projectIndex: number;
    onRemove: () => void;
    errors: FieldErrors<FormData>;
}
export interface CVsectionProps {
    control: Control<FormData>;
    errors: FieldErrors<FormData>;
    fieldArray: UseFieldArrayReturn<FormData, FieldArrayPath<FormData>, "id">;
    fieldArray2?: UseFieldArrayReturn<FormData, FieldArrayPath<FormData>, "id">;
}
