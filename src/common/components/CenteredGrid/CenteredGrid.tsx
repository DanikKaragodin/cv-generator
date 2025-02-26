import Grid2, { GridSize } from '@mui/material/Grid2';
import { ReactNode } from 'react';

export const CenteredGrid = ({ size, children }: { size: GridSize; children: ReactNode }) => {
    return (
        <Grid2 container size={size == 6 ? { xs: 12, sm: size } : size} sx={{ justifyContent: 'center' }}>
            {children}
        </Grid2>
    );
};
