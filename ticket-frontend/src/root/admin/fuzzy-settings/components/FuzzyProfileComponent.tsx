import { Box, Button, Grid } from '@mui/material';
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

export interface FuzzyProfileComponentProps {
    fuzzyProfileDto: FuzzyProfileDto
}

export default function FuzzyProfileComponent({ fuzzyProfileDto }: FuzzyProfileComponentProps) {
    // const [fuzzyProfileDto, setFuzzyProfileDto] = useState<FuzzyProfileDto>(fuzzyProfileDto)
    const [fuzzyVariableYear, setFuzzyVariableYear] = useState<FuzzyVariableYear>(fuzzyProfileDto.fuzzyProfileData.fuzzyVariableYear);
    const [fuzzyVariableRating, setFuzzyVariableRating] = useState<FuzzyVariableRating>(fuzzyProfileDto.fuzzyProfileData.fuzzyVariableRating);
    const [fuzzyVariablePopularity, setFuzzyVariablePopularity] = useState<FuzzyVariablePopularity>(fuzzyProfileDto.fuzzyProfileData.fuzzyVariablePopularity);
    const [fuzzyVariableDuration, setFuzzyVariableDuration] = useState<FuzzyVariableDuration>(fuzzyProfileDto.fuzzyProfileData.fuzzyVariableDuration);
    const [fuzzyWeights, setFuzzyWeights] = useState<FuzzyWeights>(fuzzyProfileDto.fuzzyProfileData.fuzzyWeights);
    const [readonly, setReadonly] = useState<boolean>(fuzzyProfileDto.name === FUZZY_CONSTANTS.DEFAULT);


    const { enqueueSnackbar } = useSnackbar();

    // useEffect(() => {
    //     setFuzzyVariableYear(FuzzyService.convertFuzzyVariableTo(fuzzyProfileDto.fuzzyProfileData.fuzzyVariableYear));
    //     setFuzzyVariableRating(FuzzyService.convertFuzzyVariableTo(fuzzyProfileDto.fuzzyProfileData.fuzzyVariableRating));
    //     setFuzzyVariablePopularity(FuzzyService.convertFuzzyVariableTo(fuzzyProfileDto.fuzzyProfileData.fuzzyVariablePopularity));
    // }, [])


    return (
        <Fragment>
            <Box style={{ width: '100%', height: '100%' }}>
                <h2>Fuzzy Profile: {fuzzyProfileDto.name}</h2>

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
