import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { ChartData } from 'chart.js';
import { FuzzyService } from '../../../../modules/fuzzy/fuzzy-service';
import GraphFuzzyDistributionComponent from './GraphFuzzyDistributionComponent';
import { FuzzyProfileDto } from '../../../../modules/fuzzy/dtos/fuzzy-profile-dto';
import { FUZZY_CONSTANTS, FuzzyVariableDistributionType, FuzzyVariablePartPosition } from '../../../../modules/fuzzy/fuzzy-constants';
import { FuzzyVariableDistributionPart, FuzzyVariableI } from '../../../../modules/fuzzy/models/fuzzy-variable-distribution';
import MyKatexComponent from '../../../../modules/mykatex/MyKatexComponent';

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

    function createLatexEquals(): string {
        const partName = fuzzyVariableDistributionPart.partName.replace('_', '\\_');

        let branches = '';
        if (type === FuzzyVariableDistributionType.TRIANGULAR) {
            if (a != null && c != null) {
                branches += String.raw`0 & \text{, } x \leq ${a} \text{ or } x \geq ${c} \\\\`
            } else if (a != null) {
                branches += String.raw`0 & \text{, } x \leq ${a} \\\\`
            } else if (c != null) {
                branches += String.raw`0 & \text{, } x \geq ${c} \\\\`
            }
            if (a != null) {
                branches += String.raw`{x - ${a}} \over {${b - a}} & \text{, } ${a} \leq x \leq ${b} \\\\`
            }
            if (c != null) {
                branches += String.raw`{${b} - x} \over {${c - b}} & \text{, } ${b} \leq x \leq ${c} \\\\`
            }
        } else if (type === FuzzyVariableDistributionType.TRAPEZOIDAL) {
            if (a != null && d != null) {
                branches += String.raw`0 & \text{, } x \leq ${a} \text{ or } x \geq ${d} \\\\`
            } else if (a != null) {
                branches += String.raw`0 & \text{, } x \leq ${a} \\\\`
            } else if (d != null) {
                branches += String.raw`0 & \text{, } x \geq ${d} \\\\`
            }
            if (a != null) {
                branches += String.raw`{x - ${a}} \over {${b - a}} & \text{, } ${a} \leq x \leq ${b} \\\\`
            }
            branches += String.raw`1 & \text{, } ${b} \leq x \leq ${c} \\\\`
            if (c != null && d != null) {
                branches += String.raw`{${c} - x} \over {${d - c}} & \text{, } ${c} \leq x \leq ${d} \\\\`
            }
        }
        return String.raw`μ_{${partName}}(x) =
        \left\{
            \begin{array}{ll}
                ${branches}
            \end{array}
        \right.`
    }

    return (
        <Fragment>
            <Grid container spacing={2} sx={{ justifyContent: 'center', justifyItems: 'center' }}>
                <h5 style={{ textAlign: 'center' }}>{fuzzyVariableDistributionPart.partName}</h5>
            </Grid>

            <Grid container spacing={2} sx={{ padding: 1 }}>

                <Grid item xs={12} sm={6}>
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
                <Grid item xs={12} sm={6}>
                    <MyKatexComponent latexStr={createLatexEquals()}></MyKatexComponent>
                </Grid>

            </Grid>
        </Fragment>
    );
}
