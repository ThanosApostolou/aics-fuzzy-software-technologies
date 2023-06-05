
import { useSnackbar } from 'notistack';
import { Fragment, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { ChartData } from 'chart.js';

export interface GraphFuzzyDistributionComponentProps {
    datasetIdKey: string,
    xTitle: string,
    chartData: ChartData<"line", { x: number, y: number }[], number>;
}

export default function GraphFuzzyDistributionComponent(props: GraphFuzzyDistributionComponentProps) {

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
    }, [])


    const onClick = (id: string) => {
        console.log({ id })
    }

    function setSelectedFile(target: any) {
        console.log('target', target)
    }



    return (
        <Fragment>
            <div style={{ height: 200, width: "100%" }}>
                <Line height={200} width={800}
                    datasetIdKey={props.datasetIdKey}
                    options={{
                        responsive: true,
                        scales: {
                            y: {
                                type: 'linear',
                                title: {
                                    display: true,
                                    text: 'μ(x)',
                                    color: '#911',
                                    font: {
                                        family: 'Comic Sans MS',
                                        size: 20,
                                        weight: 'bold',
                                        lineHeight: 1.2,
                                    },
                                },
                                beginAtZero: true,
                                min: 0,
                                max: 1,
                                ticks: {
                                    stepSize: 0.2,
                                }
                            },
                            x: {
                                type: 'linear',
                                title: {
                                    display: true,
                                    text: props.xTitle,
                                    color: '#911',
                                    font: {
                                        family: 'Comic Sans MS',
                                        size: 20,
                                        weight: 'bold',
                                        lineHeight: 1.2,
                                    },
                                },
                                ticks: {
                                    stepSize: 5,
                                }
                            }
                        }
                    }}
                    data={props.chartData}
                />
            </div>
        </Fragment>
    )
}
