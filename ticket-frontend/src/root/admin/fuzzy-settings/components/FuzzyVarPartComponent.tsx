import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { ChartData } from 'chart.js';
import { FuzzyService } from '../../../../modules/fuzzy/fuzzy-service';
import GraphFuzzyDistributionComponent from './GraphFuzzyDistributionComponent';
import { FuzzyProfileDto } from '../../../../modules/fuzzy/dtos/fuzzy-profile-dto';
import { FUZZY_CONSTANTS, FuzzyVariableDistributionType, FuzzyVariablePartPosition } from '../../../../modules/fuzzy/fuzzy-constants';
import { FuzzyVariableDistributionPart, FuzzyVariableI } from '../../../../modules/fuzzy/models/fuzzy-variable-distribution';

export interface FuzzyVarPartComponentProps {
    fuzzyVariableDistributionPart: FuzzyVariableDistributionPart;
    readonly: boolean;
    fuzzyVariablePartPosition: FuzzyVariablePartPosition;
    fuzzyVarPartUpdated?: (fuzzyVariableDistributionPart: FuzzyVariableDistributionPart) => void
}

export default function FuzzyVarPartComponent({ fuzzyVariableDistributionPart, readonly, fuzzyVariablePartPosition, fuzzyVarPartUpdated }: FuzzyVarPartComponentProps) {
    const [type, setType] = useState<FuzzyVariableDistributionType>(fuzzyVariableDistributionPart.type);
    const [a, setA] = useState<number | null>(fuzzyVariableDistributionPart.a);
    const [b, setB] = useState<number>(fuzzyVariableDistributionPart.b);
    const [c, setC] = useState<number | null>(fuzzyVariableDistributionPart.c);
    const [d, setD] = useState<number | null>(fuzzyVariableDistributionPart.isTypeTrapezoidal() ? fuzzyVariableDistributionPart.d : null);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        // setFuzzyVariableYearChartData(FuzzyService.convertFuzzyVariableToChartData(fuzzyProfileDto.fuzzyProfileData.fuzzyVariableYear));
        // setFuzzyVariableRatingChartData(FuzzyService.convertFuzzyVariableToChartData(fuzzyProfileDto.fuzzyProfileData.fuzzyVariableRating));
        // setFuzzyVariablePopularityChartData(FuzzyService.convertFuzzyVariableToChartData(fuzzyProfileDto.fuzzyProfileData.fuzzyVariablePopularity));
    }, [])

    function fuzzyVariableDistributionPartToState(fuzzyVariableDistributionPart: FuzzyVariableDistributionPart) {

    }

    // function stateToFuzzyVariableI(): FuzzyVariableI {
    //     // return fuzzyVariable.getFuzzyVariableMap;
    //     return fuzzyVariable;

    // }

    function handleTypeChange(event: SelectChangeEvent<FuzzyVariableDistributionType>) {
        const type = event.target.value as FuzzyVariableDistributionType;
        setType(type);
    }

    return (
        <Fragment>
            <h5>{fuzzyVariableDistributionPart.partName}</h5>

            <Grid container spacing={2} sx={{ padding: 1 }}>

                <Grid item xs={12} sm={8}>
                    <FormControl disabled={readonly} size='small'>
                        <InputLabel id="label-select-type">Type</InputLabel>
                        <Select
                            labelId="label-select-type"
                            id="select-type"
                            value={type}
                            label="Type"
                            onChange={handleTypeChange}
                        >
                            <MenuItem value={FuzzyVariableDistributionType.TRIANGULAR}>{FuzzyVariableDistributionType.TRIANGULAR}</MenuItem>
                            <MenuItem value={FuzzyVariableDistributionType.TRAPEZOIDAL}>{FuzzyVariableDistributionType.TRAPEZOIDAL}</MenuItem>
                        </Select>

                    </FormControl>

                    {fuzzyVariablePartPosition !== FuzzyVariablePartPosition.START && (
                        <TextField size='small' sx={{ width: '6rem' }}
                            disabled={readonly} type="number" label="a" value={a != null ? a : ''} onChange={(e) => setA(e.target.value != null ? parseInt(e.target.value) : null)} />
                    )}
                    <TextField size='small' sx={{ width: '6rem' }}
                        disabled={readonly} type="number" label="b" value={b} onChange={(e) => setB(e.target.value != null ? parseInt(e.target.value) : 0)} />
                    {!(type === FuzzyVariableDistributionType.TRIANGULAR && fuzzyVariablePartPosition === FuzzyVariablePartPosition.END) && (
                        <TextField size='small' sx={{ width: '6rem' }}
                            disabled={readonly} type="number" label="c" value={c != null ? c : ''} onChange={(e) => setC(e.target.value != null ? parseInt(e.target.value) : null)} />

                    )}
                    {type === FuzzyVariableDistributionType.TRAPEZOIDAL && fuzzyVariablePartPosition !== FuzzyVariablePartPosition.END && (
                        <TextField size='small' sx={{ width: '6rem' }}
                            disabled={readonly} type="number" label="d" value={d != null ? d : ''} onChange={(e) => setD(e.target.value != null ? parseInt(e.target.value) : null)} />
                    )}

                </Grid>

            </Grid>
        </Fragment>
    );
}
