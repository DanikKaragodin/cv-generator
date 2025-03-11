import { CenteredGrid } from '../CenteredGrid/CenteredGrid';
import { Control, Controller } from 'react-hook-form';
import { FormData } from '@common/types/Labels';
import { UseMUIStyles } from '@common/styles/muiStyles';
import { AvatarUploader } from './AvatarUploader';

function Avatar({ control }: { control: Control<FormData> }) {
    const { classes } = UseMUIStyles();
    return (
        <CenteredGrid size={12}>
            <Controller
                name="avatar"
                control={control}
                render={({ field }) => <AvatarUploader field={field} classes={classes} />}
            />
        </CenteredGrid>
    );
}

export default Avatar;
