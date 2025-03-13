import { useRef } from 'react';
import { CenteredGrid } from '../CenteredGrid/CenteredGrid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ControllerRenderProps } from 'node_modules/react-hook-form/dist/types';
import { FormData } from '@common/types/Labels';
import { avatarStyles } from '@common/styles/avatarStyles';
import useSetPreview from './useSetPreview';

interface AvatarUploaderProps {
    field: ControllerRenderProps<FormData, 'avatar'>;
    classes: Record<'avatar', string>;
}

export function AvatarUploader({ field, classes }: AvatarUploaderProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const avatarStyle = avatarStyles();
    const { preview, handleFileChange } = useSetPreview(field);

    return (
        <div className={classes.avatar}>
            <CenteredGrid size={12}>
                {preview && <img src={preview} alt="Avatar preview" className={avatarStyle.classes.preview} />}
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
                    className={avatarStyle.classes.inputHidden}
                />
                <Button variant="outlined" component="span" onClick={() => inputRef.current?.click()}>
                    Загрузить аватар
                </Button>
            </CenteredGrid>
            <CenteredGrid size={12}>
                <Typography variant="body2" color="textSecondary" className={avatarStyle.classes.textRecomendation}>
                    Рекомендуется фото в формате 1:1
                </Typography>
            </CenteredGrid>
        </div>
    );
}
