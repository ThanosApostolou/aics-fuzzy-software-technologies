import { Box, Button, Grid } from '@mui/material';
import { Fragment, useEffect, useRef, useState } from 'react';
import { Add } from '@mui/icons-material';
import { FuzzySettingsService } from './fuzzy-settings-service';
import { useSnackbar } from 'notistack';
import { Line } from 'react-chartjs-2';
import { FuzzyVariableYear } from '../../../modules/fuzzy/fuzzy-variable-year';
import { FuzzyVariableDistributionPart, FuzzyVariableDistributionPartTriangular } from '../../../modules/fuzzy/fuzzy-variable-distribution';
import { ChartData } from 'chart.js';
import { FuzzyService } from '../../../modules/fuzzy/fuzzy-service';
import GraphFuzzyDistributionComponent from './components/GraphFuzzyDistributionComponent';
import { FetchFuzzyProfileResponseDto } from './dtos/fetch-fuzzy-profile-dto';
import { FUZZY_CONSTANTS } from '../../../modules/fuzzy/fuzzy-constants';
export default function FuzzySettingsPage() {
    const [readonly, setReadonly] = useState<boolean>(false);
    // const [yearChart, setYearChart] = useState<Chart | null>(null);
    // const yearChartRef = useRef<HTMLCanvasElement | null>(null);
    const [fetchFuzzyProfileResponseDto, setFetchFuzzyProfileResponseDto] = useState<FetchFuzzyProfileResponseDto | null>(null)
    const [fuzzyVariableYearChartData, setFuzzyVariableYearChartData] = useState<ChartData<"line", { x: number, y: number }[], number> | null>(null);
    const [fuzzyVariableRatingChartData, setFuzzyVariableRatingChartData] = useState<ChartData<"line", { x: number, y: number }[], number> | null>(null);
    const [fuzzyVariablePopularityChartData, setFuzzyVariablePopularityChartData] = useState<ChartData<"line", { x: number, y: number }[], number> | null>(null);

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        console.log('fuzzyVariableYear', fetchFuzzyProfileResponseDto)
        loadData();


        return () => {
            // if (yearChart) {
            //     yearChart.destroy();
            // }
            // const yearChartCanvasEl = document.getElementById('yearChart') as HTMLCanvasElement | null;
            // if (yearChartCanvasEl) {
            //     console.log('removing element')
            //     yearChartCanvasEl.remove()
            // }
        }
    }, [])

    async function init() {
        return fetchFuzzyProfileResponseDto;
    }
    async function loadData() {
        setFetchFuzzyProfileResponseDto(null);
        try {
            const fetchFuzzyProfileResponseDto = await FuzzySettingsService.fetchFuzzyProfile(FUZZY_CONSTANTS.DEFAULT)

            const fetchFuzzyProfilesResponseDto = await FuzzySettingsService.fetchFuzzyProfiles();
            console.log('fetchFuzzyProfilesResponseDto', fetchFuzzyProfilesResponseDto)
            setFuzzyVariableYearChartData(FuzzyService.convertFuzzyVariableToChartData(fetchFuzzyProfileResponseDto.year));
            setFuzzyVariableRatingChartData(FuzzyService.convertFuzzyVariableToChartData(fetchFuzzyProfileResponseDto.rating));
            setFuzzyVariablePopularityChartData(FuzzyService.convertFuzzyVariableToChartData(fetchFuzzyProfileResponseDto.popularity));
            setFetchFuzzyProfileResponseDto(fetchFuzzyProfileResponseDto);
        } catch (e) {
            console.error(e);
            enqueueSnackbar('Αποτυχημένη εύρεση λίστας ταινιών', { variant: 'error' })
        }
    }

    return (
        <Fragment>
            <Box style={{ width: '100%', height: '100%' }}>
                <h1>Fuzzy Settings</h1>

                <hr></hr>
                <h2>Year Variable</h2>
                {fetchFuzzyProfileResponseDto && fuzzyVariableYearChartData && (
                    <GraphFuzzyDistributionComponent datasetIdKey="yearChart" xTitle="YEAR" chartData={fuzzyVariableYearChartData} xStepSize={5}></GraphFuzzyDistributionComponent>
                )}


                <hr></hr>
                <h2>Rating Variable</h2>
                {fetchFuzzyProfileResponseDto && fuzzyVariableRatingChartData && (
                    <GraphFuzzyDistributionComponent datasetIdKey="ratingChart" xTitle="RATING" chartData={fuzzyVariableRatingChartData} xStepSize={1}></GraphFuzzyDistributionComponent>
                )}
                <hr></hr>

                <h2>Popularity Variable</h2>
                {fetchFuzzyProfileResponseDto && fuzzyVariablePopularityChartData && (
                    <GraphFuzzyDistributionComponent datasetIdKey="popularityChart" xTitle="POPULARITY" chartData={fuzzyVariablePopularityChartData} xStepSize={10}></GraphFuzzyDistributionComponent>
                )}
                <hr></hr>

            </Box>
        </Fragment>
    );
}
