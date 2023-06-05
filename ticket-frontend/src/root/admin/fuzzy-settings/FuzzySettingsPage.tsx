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
export default function FuzzySettingsPage() {
    const [readonly, setReadonly] = useState<boolean>(false);
    // const [yearChart, setYearChart] = useState<Chart | null>(null);
    // const yearChartRef = useRef<HTMLCanvasElement | null>(null);
    const [fuzzyVariableYear, setFuzzyVariableYear] = useState<FuzzyVariableYear>(new FuzzyVariableYear({
        min: 1950,
        max: 2030,
        varOld: new FuzzyVariableDistributionPart({
            fuzzyVariableDistributionPartTriangular: new FuzzyVariableDistributionPartTriangular({
                a: null,
                b: 1950,
                c: 2005,
            })
        }),
        varRecent: new FuzzyVariableDistributionPart({
            fuzzyVariableDistributionPartTriangular: new FuzzyVariableDistributionPartTriangular({
                a: 2000,
                b: 2010,
                c: 2015,
            })
        }),
        varNew: new FuzzyVariableDistributionPart({
            fuzzyVariableDistributionPartTriangular: new FuzzyVariableDistributionPartTriangular({
                a: 2010,
                b: 2030,
                c: null,
            })
        })
    }))
    const [fuzzyVariableYearChartData, setFuzzyVariableYearChartData] = useState<ChartData<"line", { x: number, y: number }[], number>>(FuzzyService.convertFuzzyVariableYearToChartData(fuzzyVariableYear));

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        console.log('fuzzyVariableYear', fuzzyVariableYear)
        // createYearChart()

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

    return (
        <Fragment>
            <Box style={{ width: '100%', height: '100%' }}>
                <h1>Fuzzy Settings</h1>

                <hr></hr>
                <h2>Year Variable</h2>

                <GraphFuzzyDistributionComponent datasetIdKey="yearChart" xTitle="YEAR" chartData={fuzzyVariableYearChartData}></GraphFuzzyDistributionComponent>

                <hr></hr>

            </Box>
        </Fragment>
    );
}
