import { Box, Button, FormControlLabel, FormGroup, Grid, Switch, TextField } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { } from 'chart.js';
import { FuzzyService } from '../../../../modules/fuzzy/fuzzy-service';
import GraphFuzzyDistributionComponent from './GraphFuzzyDistributionComponent';
import { FuzzyProfileDto } from '../../../../modules/fuzzy/dtos/fuzzy-profile-dto';
import { FUZZY_CONSTANTS } from '../../../../modules/fuzzy/fuzzy-constants';
import { FuzzyVariableYear } from '../../../../modules/fuzzy/models/fuzzy-variable-year';
import FuzzyVarComponent from './FuzzyVarComponent';
import { FuzzyVariableDuration } from '../../../../modules/fuzzy/models/fuzzy-variable-duration';
import { FuzzyVariableI } from '../../../../modules/fuzzy/models/fuzzy-variable-distribution';
import { FuzzyVariableRating } from '../../../../modules/fuzzy/models/fuzzy-variable-rating';
import { FuzzyVariablePopularity } from '../../../../modules/fuzzy/models/fuzzy-variable-popularity';
import { FuzzyWeights } from '../../../../modules/fuzzy/models/fuzzy-weights';
import { Add, Edit, Delete } from '@mui/icons-material';
import { FuzzyProfileData } from '../../../../modules/fuzzy/models/fuzzy-profile-data';
import { FuzzySettingsService } from '../fuzzy-settings-service';

export interface FuzzyProfileComponentProps {
    fuzzyProfileDto: FuzzyProfileDto;
    readonly: boolean;
}

export default function FuzzyProfileComponent({ fuzzyProfileDto, readonly }: FuzzyProfileComponentProps) {
    // const [fuzzyProfileDto, setFuzzyProfileDto] = useState<FuzzyProfileDto>(fuzzyProfileDto)
    const [fuzzyVariableYear, setFuzzyVariableYear] = useState<FuzzyVariableYear>(fuzzyProfileDto.fuzzyProfileData.fuzzyVariableYear);
    const [fuzzyVariableRating, setFuzzyVariableRating] = useState<FuzzyVariableRating>(fuzzyProfileDto.fuzzyProfileData.fuzzyVariableRating);
    const [fuzzyVariablePopularity, setFuzzyVariablePopularity] = useState<FuzzyVariablePopularity>(fuzzyProfileDto.fuzzyProfileData.fuzzyVariablePopularity);
    const [fuzzyVariableDuration, setFuzzyVariableDuration] = useState<FuzzyVariableDuration>(fuzzyProfileDto.fuzzyProfileData.fuzzyVariableDuration);
    const [fuzzyWeights, setFuzzyWeights] = useState<FuzzyWeights>(fuzzyProfileDto.fuzzyProfileData.fuzzyWeights);
    const [name, setName] = useState<string>(fuzzyProfileDto.name)
    const [enableDebug, setEnableDebug] = useState<boolean>(fuzzyProfileDto.enableDebug)
    const [active, setActive] = useState<boolean>(fuzzyProfileDto.active)


    const { enqueueSnackbar } = useSnackbar();

    // useEffect(() => {
    //     setFuzzyVariableYear(FuzzyService.convertFuzzyVariableTo(fuzzyProfileDto.fuzzyProfileData.fuzzyVariableYear));
    //     setFuzzyVariableRating(FuzzyService.convertFuzzyVariableTo(fuzzyProfileDto.fuzzyProfileData.fuzzyVariableRating));
    //     setFuzzyVariablePopularity(FuzzyService.convertFuzzyVariableTo(fuzzyProfileDto.fuzzyProfileData.fuzzyVariablePopularity));
    // }, [])

    function stateToFuzzyProfileDto(): FuzzyProfileDto {
        return new FuzzyProfileDto({
            fuzzyProfileId: null,
            name: name,
            fuzzyProfileData: new FuzzyProfileData({
                fuzzyVariableYear,
                fuzzyVariableRating,
                fuzzyVariablePopularity,
                fuzzyVariableDuration,
                fuzzyWeights
            }),
            enableDebug,
            active
        })
    }

    async function handleCreateProfile() {
        const newFuzzyProfileDto = stateToFuzzyProfileDto();
        console.log('newFuzzyProfileDto', newFuzzyProfileDto)
        try {
            const response = await FuzzySettingsService.createFuzzyProfile(newFuzzyProfileDto);
            enqueueSnackbar('Επιτυχημένη δημιουργία Fuzzy Profile', { variant: 'success' })
            // props.afterAdd(e);
        } catch (e: any) {
            if (e?.response?.status === 422) {
                console.error(e?.response?.data?.error);
                enqueueSnackbar('Αποτυχημένη δημιουργία Fuzzy Profile: ' + e?.response?.data?.error, { variant: 'error' })
            } else {
                console.error(e);
                enqueueSnackbar('Αποτυχημένη δημιουργία Fuzzy Profile', { variant: 'error' })
            }
            // if (e.response.statu)
        }

    }

    function handleUpdateProfile() {
        console.log('fuzzyVariableYear', fuzzyVariableYear)
    }

    function handleDeleteProfile() {

    }

    function handleEnableDebugChange(event: React.ChangeEvent<HTMLInputElement>) {
        setEnableDebug(event.target.checked);
    }
    function handleActiveChange(event: React.ChangeEvent<HTMLInputElement>) {
        setActive(event.target.checked);
    }

    return (
        <Fragment>
            <Box style={{ width: '100%', height: '100%' }}>
                <Grid container direction="row" padding={2}
                    justifyContent="space-between"
                    alignItems="center">
                    <Grid item>
                        <h2>Fuzzy Profile: {fuzzyProfileDto.name}</h2>
                        {fuzzyProfileDto.name === '' && (
                            <TextField size='small' label="Όνομα" value={name} onChange={(e) => setName(e.target.value)} />
                        )}
                    </Grid>
                    <Grid item>
                        {fuzzyProfileDto.name === '' && (
                            <Button onClick={handleCreateProfile} variant="contained" startIcon={<Add />}>
                                ΔΗΜΙΟΥΡΓΙΑ
                            </Button>
                        )}
                        {fuzzyProfileDto.name !== '' && fuzzyProfileDto.name !== FUZZY_CONSTANTS.DEFAULT && (
                            <Fragment>
                                <Button onClick={handleUpdateProfile} variant="contained" startIcon={<Edit />}>
                                    ΑΠΟΘΗΚΕΥΣΗ
                                </Button>
                                <Button sx={{ marginLeft: 1 }} onClick={handleDeleteProfile} variant="contained" startIcon={<Delete />}>
                                    ΔΙΑΓΡΑΦΗ
                                </Button>
                            </Fragment>
                        )}
                    </Grid>
                </Grid>
                <FormGroup>
                    <FormControlLabel disabled={readonly} control={<Switch onChange={handleEnableDebugChange} />} label="EnableDebug" checked={enableDebug} />
                    <FormControlLabel disabled={readonly} control={<Switch onChange={handleActiveChange} />} label="Active" checked={active} />
                </FormGroup>
                <hr></hr>

                <FuzzyVarComponent fuzzyVariable={fuzzyVariableYear} readonly={readonly} xStepSize={5}></FuzzyVarComponent>
                <hr></hr>
                <br></br>

                <FuzzyVarComponent fuzzyVariable={fuzzyVariableRating} readonly={readonly} xStepSize={1}></FuzzyVarComponent>
                <hr></hr>
                <br></br>

                <FuzzyVarComponent fuzzyVariable={fuzzyVariablePopularity} readonly={readonly} xStepSize={10}></FuzzyVarComponent>
                <hr></hr>
                <br></br>

                <FuzzyVarComponent fuzzyVariable={fuzzyVariableDuration} readonly={readonly} xStepSize={20}></FuzzyVarComponent>
                <hr></hr>
                <br></br>

                <FuzzyVarComponent fuzzyVariable={fuzzyWeights} readonly={readonly} xStepSize={1}></FuzzyVarComponent>
                <h3>Weights </h3>

            </Box>
        </Fragment>
    );
}
