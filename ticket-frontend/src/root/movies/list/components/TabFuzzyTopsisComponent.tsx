import { Box, DialogContentText, FormControlLabel, FormGroup, Grid, Switch, TextField } from '@mui/material';
import { Fragment, useState } from 'react';
import { FuzzyProfileDto } from '../../../../modules/fuzzy/dtos/fuzzy-profile-dto';
import TopsisTable from '../../../../modules/fuzzy/components/TopsisTable';
import { FuzzySearchFiltersDto } from '../../../../modules/fuzzy/dtos/fuzzy-search-filters-dto';
import { FuzzyTopsisInfoDto } from '../../../../modules/fuzzy/dtos/fuzzy-topsis-info-dto';

export interface TabFuzzyTopsisComponentProps {
    fuzzyProfileDto: FuzzyProfileDto;
    fuzzySearchFiltersDto: FuzzySearchFiltersDto,
    fuzzyTopsisInfoDto: FuzzyTopsisInfoDto
}

export default function TabFuzzyTopsisComponent({ fuzzyProfileDto, fuzzySearchFiltersDto, fuzzyTopsisInfoDto }: TabFuzzyTopsisComponentProps) {

    return (
        <Fragment>
            <Box style={{ width: '100%', height: '100%' }}>
                <h4>Step 1. Initial Data</h4>
                <TopsisTable dataTable={fuzzyTopsisInfoDto.table1InitialData} yearCostCriteria={fuzzySearchFiltersDto.yearCostCriteria} durationCostCriteria={fuzzySearchFiltersDto.durationCostCriteria}></TopsisTable>

                <h4>Step 2. Fuzzification of Data</h4>
                <TopsisTable dataTable={fuzzyTopsisInfoDto.table2FuzzifiedData} yearCostCriteria={fuzzySearchFiltersDto.yearCostCriteria} durationCostCriteria={fuzzySearchFiltersDto.durationCostCriteria}></TopsisTable>

                <h4>Step 3. Weighted Normalized Data</h4>
                {/* <TopsisTable dataTable={fuzzyTopsisInfoDto.table3WeightedNormalizedData} yearCostCriteria={fuzzySearchFiltersDto.yearCostCriteria} durationCostCriteria={fuzzySearchFiltersDto.durationCostCriteria}></TopsisTable> */}

                <h4>Step 4. Final Data ordered by TOPSIS distance</h4>
                {/* <TopsisTable dataTable={fuzzyTopsisInfoDto.table4TopsisScoreData} yearCostCriteria={fuzzySearchFiltersDto.yearCostCriteria} durationCostCriteria={fuzzySearchFiltersDto.durationCostCriteria}></TopsisTable> */}
            </Box>
        </Fragment>
    );
}
