import { Box, Button, Grid } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { ChartData } from 'chart.js';
import { FuzzyService } from '../fuzzy-service';
import GraphFuzzyDistributionComponent from './GraphFuzzyDistributionComponent';
import { FuzzyProfileDto } from '../dtos/fuzzy-profile-dto';
import { FUZZY_CONSTANTS, FuzzyVariablePartPosition } from '../fuzzy-constants';
import { FuzzyVariableDistributionPart, FuzzyVariableI } from '../models/fuzzy-variable-distribution';
import FuzzyVarPartComponent from './FuzzyVarPartComponent';

export interface FuzzyVarComponentProps {
    fuzzyVariable: FuzzyVariableI;
    readonly: boolean;
    xStepSize: number;
    fuzzyVarUpdated?: (fuzzyVariable: FuzzyVariableI) => void;
}

export default function FuzzyVarComponent({ fuzzyVariable, readonly, xStepSize }: FuzzyVarComponentProps) {
    const [fuzzyVariableChartData, setFuzzyVariableChartData] = useState<ChartData<"line", { x: number, y: number }[], number> | null>(FuzzyService.convertFuzzyVariableToChartData(fuzzyVariable));
    const [fuzzyVartPart1, setFuzzyVartPart1] = useState<FuzzyVariableDistributionPart>(fuzzyVariable.get1stPart());
    const [fuzzyVartPart2, setFuzzyVartPart2] = useState<FuzzyVariableDistributionPart>(fuzzyVariable.get2ndPart());
    const [fuzzyVartPart3, setFuzzyVartPart3] = useState<FuzzyVariableDistributionPart>(fuzzyVariable.get3rdPart());
    const [fuzzyVartPart4, setFuzzyVartPart4] = useState<FuzzyVariableDistributionPart>(fuzzyVariable.get4thPart());
    const [name, setName] = useState<string>(fuzzyVariable.getName());


    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        // setFuzzyVariableYearChartData(FuzzyService.convertFuzzyVariableToChartData(fuzzyProfileDto.fuzzyProfileData.fuzzyVariableYear));
        // setFuzzyVariableRatingChartData(FuzzyService.convertFuzzyVariableToChartData(fuzzyProfileDto.fuzzyProfileData.fuzzyVariableRating));
        // setFuzzyVariablePopularityChartData(FuzzyService.convertFuzzyVariableToChartData(fuzzyProfileDto.fuzzyProfileData.fuzzyVariablePopularity));
    }, [])

    function fuzzyVariableToState(fuzzyVariable: FuzzyVariableI) {

    }

    function stateToFuzzyVariableI(): FuzzyVariableI {
        // return fuzzyVariable.getFuzzyVariableMap;
        return fuzzyVariable;


    }

    function fuzzyVarPart1Updated(fuzzyVariableDistributionPart: FuzzyVariableDistributionPart) {
        setFuzzyVartPart1(fuzzyVariableDistributionPart);
        fuzzyVariable.set1stPart(fuzzyVariableDistributionPart);
        setFuzzyVariableChartData(FuzzyService.convertFuzzyVariableToChartData(fuzzyVariable));
    }

    function fuzzyVarPart2Updated(fuzzyVariableDistributionPart: FuzzyVariableDistributionPart) {
        setFuzzyVartPart2(fuzzyVariableDistributionPart);
        fuzzyVariable.set2ndPart(fuzzyVariableDistributionPart);
        setFuzzyVariableChartData(FuzzyService.convertFuzzyVariableToChartData(fuzzyVariable));
    }

    function fuzzyVarPart3Updated(fuzzyVariableDistributionPart: FuzzyVariableDistributionPart) {
        setFuzzyVartPart3(fuzzyVariableDistributionPart);
        fuzzyVariable.set3rdPart(fuzzyVariableDistributionPart);
        setFuzzyVariableChartData(FuzzyService.convertFuzzyVariableToChartData(fuzzyVariable));
    }

    function fuzzyVarPart4Updated(fuzzyVariableDistributionPart: FuzzyVariableDistributionPart) {
        setFuzzyVartPart4(fuzzyVariableDistributionPart);
        fuzzyVariable.set4thPart(fuzzyVariableDistributionPart);
        setFuzzyVariableChartData(FuzzyService.convertFuzzyVariableToChartData(fuzzyVariable));
    }


    return (
        <Fragment>
            <Box style={{ width: '100%', height: '100%' }}>
                <h3 style={{ textAlign: 'center' }}>{name} Variable</h3>
                <Grid container spacing={2} sx={{ padding: 1 }}>
                    <Grid item container xs={12} lg={6} boxShadow={1}>
                        <FuzzyVarPartComponent fuzzyVariableDistributionPart={fuzzyVartPart1} readonly={readonly} fuzzyVariablePartPosition={FuzzyVariablePartPosition.START}
                            fuzzyVarPartUpdated={fuzzyVarPart1Updated}></FuzzyVarPartComponent>
                    </Grid>
                    <Grid item container xs={12} lg={6} boxShadow={1}>
                        <FuzzyVarPartComponent fuzzyVariableDistributionPart={fuzzyVartPart2} readonly={readonly} fuzzyVariablePartPosition={FuzzyVariablePartPosition.MIDDLE}
                            fuzzyVarPartUpdated={fuzzyVarPart2Updated}></FuzzyVarPartComponent>
                    </Grid>
                    <Grid item container xs={12} lg={6} boxShadow={1}>
                        <FuzzyVarPartComponent fuzzyVariableDistributionPart={fuzzyVartPart3} readonly={readonly} fuzzyVariablePartPosition={FuzzyVariablePartPosition.MIDDLE}
                            fuzzyVarPartUpdated={fuzzyVarPart3Updated}></FuzzyVarPartComponent>
                    </Grid>
                    <Grid item container xs={12} lg={6} boxShadow={1}>
                        <FuzzyVarPartComponent fuzzyVariableDistributionPart={fuzzyVartPart4} readonly={readonly} fuzzyVariablePartPosition={FuzzyVariablePartPosition.END}
                            fuzzyVarPartUpdated={fuzzyVarPart4Updated}></FuzzyVarPartComponent>
                    </Grid>
                </Grid>

                {fuzzyVariableChartData && (
                    <div>
                        <GraphFuzzyDistributionComponent datasetIdKey={name + 'Chart'} xTitle={name} chartData={fuzzyVariableChartData} xStepSize={xStepSize}></GraphFuzzyDistributionComponent>
                    </div>
                )}
            </Box>
        </Fragment>
    );
}
