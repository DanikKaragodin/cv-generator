import { CenteredGrid } from '../CenteredGrid/CenteredGrid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ControllerRenderProps } from 'node_modules/react-hook-form/dist/types';
import { FormData } from '@common/types/Labels';
import { avatarStyles } from '@common/styles/avatarStyles';
import useSetPreview from './useSetPreview';

export function AvatarUploader({ field }: { field: ControllerRenderProps<FormData, 'avatar'> }) {
    const { classes: avatarClasses } = avatarStyles();
    const { preview, handleFileChange, handleRemoveAvatar, inputRef } = useSetPreview(field);

    return (
        <div className={avatarClasses.avatarDiv}>
            <CenteredGrid size={12}>
                {preview && <img src={preview} alt="Avatar preview" className={avatarClasses.preview} />}
            </CenteredGrid>
            <CenteredGrid size={12}>
                <input
                    type="file"
                    accept="image/*"
                    ref={(e) => {
                        inputRef.current = e;
                        field.ref(e);
                    }}
                    onChange={handleFileChange}
                    className={avatarClasses.inputHidden}
                />
                <Button
                    variant="outlined"
                    className={avatarClasses.button}
                    component="span"
                    onClick={() => inputRef.current?.click()}
                >
                    Загрузить аватар
                </Button>
                {preview && (
                    <Button
                        variant="outlined"
                        className={avatarClasses.button}
                        color="error"
                        component="span"
                        onClick={handleRemoveAvatar}
                    >
                        Удалить аватар
                    </Button>
                )}
            </CenteredGrid>
            <CenteredGrid size={12}>
                <Typography variant="body2" color="textSecondary" className={avatarClasses.textRecomendation}>
                    Рекомендуется фото в формате 1:1
                </Typography>
            </CenteredGrid>
        </div>
    );
}
