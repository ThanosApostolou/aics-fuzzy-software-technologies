import { Box, Button, CircularProgress, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Fragment, useEffect, useRef, useState } from 'react';
import { FuzzySettingsService } from './fuzzy-settings-service';
import { useSnackbar } from 'notistack';
import { FUZZY_CONSTANTS } from '../../../modules/fuzzy/fuzzy-constants';
import { FetchFuzzyProfilesResponseDto } from './dtos/fetch-fuzzy-profiles-dto';
import FuzzyProfileComponent from './components/FuzzyProfileComponent';
import React from 'react';
import { FuzzyProfileDto } from '../../../modules/fuzzy/dtos/fuzzy-profile-dto';
export default function FuzzySettingsPage() {
    const [fetchFuzzyProfilesResponseDto, setFetchFuzzyProfilesResponseDto] = useState<FetchFuzzyProfilesResponseDto | null>(null)
    const [fuzzyProfileDto, setFuzzyProfileDto] = useState<FuzzyProfileDto | null>(null);
    const [selectedProfileName, setSelectedProfileName] = useState<string>(FUZZY_CONSTANTS.DEFAULT);
    // const [fetchFuzzyProfileResponseDto, setFetchFuzzyProfileResponseDto] = useState<FetchFuzzyProfileResponseDto | null>(null)
    // const [fuzzyVariableYearChartData, setFuzzyVariableYearChartData] = useState<ChartData<"line", { x: number, y: number }[], number> | null>(null);
    // const [fuzzyVariableRatingChartData, setFuzzyVariableRatingChartData] = useState<ChartData<"line", { x: number, y: number }[], number> | null>(null);
    // const [fuzzyVariablePopularityChartData, setFuzzyVariablePopularityChartData] = useState<ChartData<"line", { x: number, y: number }[], number> | null>(null);

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        loadData();
    }, [])

    async function loadData() {
        setFetchFuzzyProfilesResponseDto(null);
        try {
            setFetchFuzzyProfilesResponseDto(null)
            const fetchFuzzyProfilesResponseDto = await FuzzySettingsService.fetchFuzzyProfiles();
            console.log('fetchFuzzyProfilesResponseDto', fetchFuzzyProfilesResponseDto)
            const fuzzyProfileDto: FuzzyProfileDto = fetchFuzzyProfilesResponseDto.fuzzyProfilesMap[FUZZY_CONSTANTS.DEFAULT];
            setFetchFuzzyProfilesResponseDto(fetchFuzzyProfilesResponseDto);
            setFuzzyProfileDto(fuzzyProfileDto);
        } catch (e) {
            console.error(e);
            enqueueSnackbar('Αποτυχημένη εύρεση των Fuzzy Profiles', { variant: 'error' })
        }
    }

    function handleProfileChange(event: SelectChangeEvent<string>) {
        const newProfileName = event.target.value;
        const newProfile = fetchFuzzyProfilesResponseDto?.fuzzyProfilesMap[newProfileName];
        if (!newProfile) {
            console.error(`cannot find ${newProfileName}`);
            return;
        }
        setSelectedProfileName(newProfileName)
        setFuzzyProfileDto(null)
        setTimeout(() => {
            setFuzzyProfileDto(newProfile);
        })
    }

    return (
        <Fragment>
            <Box style={{ width: '100%', height: '100%' }}>
                <h1>Fuzzy Settings</h1>

                <hr></hr>
                {fetchFuzzyProfilesResponseDto && fuzzyProfileDto
                    ? (
                        <React.Fragment>
                            <FormControl>
                                <InputLabel id="label-select-profile">Profile</InputLabel>
                                <Select
                                    labelId="label-select-profile"
                                    id="select-profile"
                                    value={selectedProfileName}
                                    label="Profile"
                                    onChange={handleProfileChange}
                                >
                                    {fetchFuzzyProfilesResponseDto.fuzzyProfilesNames.map(profileName => (
                                        <MenuItem key={profileName} value={profileName}>{profileName}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <FuzzyProfileComponent fuzzyProfileDto={fuzzyProfileDto}></FuzzyProfileComponent>
                        </React.Fragment>
                    )
                    : (
                        <CircularProgress />
                    )}

            </Box>
        </Fragment>
    );
}
