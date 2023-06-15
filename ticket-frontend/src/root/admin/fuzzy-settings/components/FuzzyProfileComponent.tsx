import { Box, Button, Grid } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { ChartData } from 'chart.js';
import { FuzzyService } from '../../../../modules/fuzzy/fuzzy-service';
import GraphFuzzyDistributionComponent from '../components/GraphFuzzyDistributionComponent';
import { FuzzyProfileDto } from '../../../../modules/fuzzy/dtos/fuzzy-profile-dto';
import { FUZZY_CONSTANTS } from '../../../../modules/fuzzy/fuzzy-constants';

export interface FuzzyProfileComponentProps {
    fuzzyProfileDto: FuzzyProfileDto
}

export default function FuzzyProfileComponent(props: FuzzyProfileComponentProps) {
    const [fuzzyProfileDto, setFuzzyProfileDto] = useState<FuzzyProfileDto>(props.fuzzyProfileDto)
    const [fuzzyVariableYearChartData, setFuzzyVariableYearChartData] = useState<ChartData<"line", { x: number, y: number }[], number>>(FuzzyService.convertFuzzyVariableToChartData(props.fuzzyProfileDto.fuzzyProfileData.fuzzyVariableYear));
    const [fuzzyVariableRatingChartData, setFuzzyVariableRatingChartData] = useState<ChartData<"line", { x: number, y: number }[], number>>(FuzzyService.convertFuzzyVariableToChartData(props.fuzzyProfileDto.fuzzyProfileData.fuzzyVariableRating));
    const [fuzzyVariablePopularityChartData, setFuzzyVariablePopularityChartData] = useState<ChartData<"line", { x: number, y: number }[], number>>(FuzzyService.convertFuzzyVariableToChartData(props.fuzzyProfileDto.fuzzyProfileData.fuzzyVariablePopularity));
    const [fuzzyVariableDurationChartData, setFuzzyVariableDurationChartData] = useState<ChartData<"line", { x: number, y: number }[], number>>(FuzzyService.convertFuzzyVariableToChartData(props.fuzzyProfileDto.fuzzyProfileData.fuzzyVariableDuration));
    const [fuzzyWeightsChartData, setFuzzyWeightsChartData] = useState<ChartData<"line", { x: number, y: number }[], number>>(FuzzyService.convertFuzzyVariableToChartData(props.fuzzyProfileDto.fuzzyProfileData.fuzzyWeights));
    const [readonly, setReadonly] = useState<boolean>(props.fuzzyProfileDto.name === FUZZY_CONSTANTS.DEFAULT);


    const { enqueueSnackbar } = useSnackbar();

    // useEffect(() => {
    //     setFuzzyVariableYearChartData(FuzzyService.convertFuzzyVariableToChartData(fuzzyProfileDto.fuzzyProfileData.fuzzyVariableYear));
    //     setFuzzyVariableRatingChartData(FuzzyService.convertFuzzyVariableToChartData(fuzzyProfileDto.fuzzyProfileData.fuzzyVariableRating));
    //     setFuzzyVariablePopularityChartData(FuzzyService.convertFuzzyVariableToChartData(fuzzyProfileDto.fuzzyProfileData.fuzzyVariablePopularity));
    // }, [])


    return (
        <Fragment>
            <Box style={{ width: '100%', height: '100%' }}>
                <h2>Fuzzy Profile</h2>

                <hr></hr>
                <h3>Year Variable</h3>
                {fuzzyProfileDto && fuzzyVariableYearChartData && (
                    <GraphFuzzyDistributionComponent datasetIdKey="yearChart" xTitle="YEAR" chartData={fuzzyVariableYearChartData} xStepSize={5}></GraphFuzzyDistributionComponent>
                )}


                <hr></hr>
                <h3>Rating Variable</h3>
                {fuzzyProfileDto && fuzzyVariableRatingChartData && (
                    <GraphFuzzyDistributionComponent datasetIdKey="ratingChart" xTitle="RATING" chartData={fuzzyVariableRatingChartData} xStepSize={1}></GraphFuzzyDistributionComponent>
                )}
                <hr></hr>

                <h3>Popularity Variable</h3>
                {fuzzyProfileDto && fuzzyVariablePopularityChartData && (
                    <GraphFuzzyDistributionComponent datasetIdKey="popularityChart" xTitle="POPULARITY" chartData={fuzzyVariablePopularityChartData} xStepSize={10}></GraphFuzzyDistributionComponent>
                )}
                <hr></hr>

                <h3>Duration Variable</h3>
                {fuzzyProfileDto && fuzzyVariableDurationChartData && (
                    <GraphFuzzyDistributionComponent datasetIdKey="durationChart" xTitle="DURATION" chartData={fuzzyVariableDurationChartData} xStepSize={20}></GraphFuzzyDistributionComponent>
                )}
                <hr></hr>

                <h3>Weights </h3>
                {fuzzyProfileDto && fuzzyWeightsChartData && (
                    <GraphFuzzyDistributionComponent datasetIdKey="weightsChart" xTitle="WEIGHTS" chartData={fuzzyWeightsChartData} xStepSize={1}></GraphFuzzyDistributionComponent>
                )}
            </Box>
        </Fragment>
    );
}
