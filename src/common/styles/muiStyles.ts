import { unstable_styleFunctionSx } from '@mui/system';
import type { CSSObject } from 'tss-react';
import { makeStyles } from 'tss-react/mui';
export const styleFunctionSx = unstable_styleFunctionSx as (params: object) => CSSObject;

export const UseMUIStyles = makeStyles()({
    grid: styleFunctionSx({
        sx: {
            marginY: 3,
            paddingX: 1,
            justifyContent: 'center',
            ['& .MuiTextField-root']: {
                width: '95%',
            },
            ['& .MuiAutocomplete-root .MuiTextField-root']: { width: '100%' },
        },
    }),
    paper: styleFunctionSx({
        sx: {
            marginTop: 5,
            paddingBottom: 3,
            width: '100%',
        },
    }),
    paperAllWidth: styleFunctionSx({
        sx: {
            width: '100%',
        },
    }),
    autocomplete: styleFunctionSx({
        sx: {
            width: '95%',
            paddingX: 0,
        },
    }),
    sumbitCVcontainer: styleFunctionSx({
        sx: {
            display: 'flex',
            justifyContent: 'center',
            marginTop: 3,
            marginBottom: 5,
        },
    }),
});
