import { Box, Button, Grid } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import { Add } from '@mui/icons-material';
import { FuzzySettingsService } from './fuzzy-settings-service';
import { useSnackbar } from 'notistack';

export default function FuzzySettingsPage() {
    const [readonly, setReadonly] = useState<boolean>(false);

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {

    }, [])

    return (
        <Fragment>
            <Box style={{ width: '100%', height: '100%' }}>
                <h1>Fuzzy Settings</h1>

            </Box>
        </Fragment>
    );
}
