import { CenteredGrid } from '../CenteredGrid/CenteredGrid';
import { Control, Controller } from 'react-hook-form';
import { FormData } from '@common/types/Labels';
import { AvatarUploader } from './AvatarFormData';

function Avatar({ control }: { control: Control<FormData> }) {
    return (
        <CenteredGrid size={12}>
            <Controller name="avatar" control={control} render={({ field }) => <AvatarUploader field={field} />} />
        </CenteredGrid>
    );
}

export default Avatar;
