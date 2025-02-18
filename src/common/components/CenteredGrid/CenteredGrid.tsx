import Grid2 from '@mui/material/Grid2';
import { ReactNode } from 'react';

export const CenteredGrid = ({ size, children }: { size: number; children: ReactNode }) => {
    return (
        <Grid2 container size={size} sx={{ justifyContent: 'center' }}>
            {children}
        </Grid2>
    );
};
