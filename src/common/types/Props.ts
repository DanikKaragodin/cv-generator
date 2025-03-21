import { Control, FieldArrayPath, FieldArrayWithId, FieldErrors, UseFieldArrayReturn } from 'react-hook-form';
import { FormData } from './Labels';
export interface LabelsProps {
    fields: FieldArrayWithId<FormData, FieldArrayPath<FormData>, 'id'>[];
    prepend: () => void;
    remove: (index: number) => void;
    move: (from: number, to: number) => void; // Добавляем тип для move
    control: Control<FormData, unknown>;
    errors: FieldErrors<FormData>;
}
export interface LabelProps {
    index: number;
    onRemove: () => void;
    control: Control<FormData, unknown>;
    errors: FieldErrors<FormData>;
    onMoveUp: () => void;
    onMoveDown: () => void;
    canMoveUp: boolean;
    canMoveDown: boolean;
}
export interface CVsectionProps {
    control: Control<FormData>;
    errors: FieldErrors<FormData>;
    fieldArray: UseFieldArrayReturn<FormData, FieldArrayPath<FormData>, 'id'>;
    fieldArray2?: UseFieldArrayReturn<FormData, FieldArrayPath<FormData>, 'id'>;
}
