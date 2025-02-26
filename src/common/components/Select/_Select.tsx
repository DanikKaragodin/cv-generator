import { FormData } from '@common/types/Labels';
import MenuItem from '@mui/material/MenuItem';
import { Select } from '@mui/material';
import { ControllerRenderProps, FieldPath } from 'node_modules/react-hook-form/dist/types';
function _Select({
    labelId,
    id,
    label,
    menuItems,
    field,
}: {
    labelId: string;
    id: string;
    label: string;
    menuItems: { [key in string]: string | number };
    field: ControllerRenderProps<FormData, FieldPath<FormData>>;
}) {
    return (
        <Select {...field} labelId={labelId} id={id} label={label}>
            {Object.keys(menuItems).map((key) => (
                <MenuItem key={key} value={menuItems[key]}>
                    {key}
                </MenuItem>
            ))}
        </Select>
    );
}

export default _Select;
