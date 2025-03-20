import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import { UseFieldArrayReturn } from 'react-hook-form';
import { FormData } from '@common/types/Labels';
function AddButton({
    fieldArray,
    emptyLabel,
    ariaLabel,
}: {
    fieldArray: UseFieldArrayReturn<
        FormData,
        'socialLabels' | 'languageLabels' | 'educationLabels' | 'courseLabels' | 'positionLabels',
        'id'
    >;
    ariaLabel: string;
    emptyLabel: any;
}) {
    return (
        <Button
            variant="contained"
            color="primary"
            onClick={() => fieldArray.prepend(emptyLabel)}
            aria-label={ariaLabel}
            sx={{
                minWidth: 'auto',
                padding: '5px',
                borderRadius: '8px',
                marginTop: '4px',
                marginLeft: '16px',
            }}
        >
            <AddIcon />
        </Button>
    );
}

export default AddButton;
