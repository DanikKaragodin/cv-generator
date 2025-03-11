import { useRef, useState, useEffect } from 'react';
import { CenteredGrid } from '../CenteredGrid/CenteredGrid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ControllerRenderProps } from 'node_modules/react-hook-form/dist/types';
import { FormData } from '@common/types/Labels';
interface AvatarUploaderProps {
    field: ControllerRenderProps<FormData, 'avatar'>;
    classes: Record<'avatar', string>;
}

export function AvatarUploader({ field, classes }: AvatarUploaderProps) {
    const inputRef = useRef<HTMLInputElement>(null);
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

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            field.onChange(file);
        }
    };

    return (
        <div className={classes.avatar}>
            <CenteredGrid size={12}>
                {preview && (
                    <img
                        src={preview}
                        alt="Avatar preview"
                        style={{
                            width: 100,
                            height: 100,
                            borderRadius: '50%',
                            objectFit: 'cover',
                            marginBottom: 10,
                        }}
                    />
                )}
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
                    style={{ display: 'none' }}
                />
                <Button variant="outlined" component="span" onClick={() => inputRef.current?.click()}>
                    Загрузить аватар
                </Button>
            </CenteredGrid>
            <CenteredGrid size={12}>
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                    Рекомендуется фото в формате 1:1
                </Typography>
            </CenteredGrid>
        </div>
    );
}
