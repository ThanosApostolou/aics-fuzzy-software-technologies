
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Switch, Tab, Tabs, TextField, Typography } from '@mui/material';
import { FuzzySearchFiltersDto } from '../../../../modules/fuzzy/dtos/fuzzy-search-filters-dto';
import { useState } from 'react';
import { FuzzySearchChoices } from '../../../../modules/fuzzy/fuzzy-constants';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { FuzzySearchDebugInfoDto } from '../../../../modules/fuzzy/dtos/fuzzy-search-debug-info-dto';
import AdbIcon from '@mui/icons-material/Adb';
import { FuzzyProfileDto } from '../../../../modules/fuzzy/dtos/fuzzy-profile-dto';
import TabPanel from '../../../../modules/ui/components/TabPanelComponent';
import TabFuzzyProfileComponent from './TabFuzzyProfileComponent';

export interface DebugInfoDialogComponentProps {
    fuzzySearchDebugInfoDto: FuzzySearchDebugInfoDto;
    open: boolean;
    onClose?: () => void;
}



export default function DebugInfoDialogComponent({ fuzzySearchDebugInfoDto, open, onClose }: DebugInfoDialogComponentProps) {
    const [fuzzyProfileDto, setFuzzyProfileDto] = useState<FuzzyProfileDto>(fuzzySearchDebugInfoDto.fuzzyProfileDto);
    const [tabValue, setTabValue] = useState(0);

    function a11yProps(index: number) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    function handleChange(event: React.SyntheticEvent, newValue: number) {
        setTabValue(newValue);
    }

    return (
        <Dialog fullWidth={true} maxWidth={false} onClose={onClose} open={open}>
            <DialogTitle id="alert-dialog-title">
                Διαγραφή Ταινίας
            </DialogTitle>
            <DialogContent>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={tabValue} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Fuzzy Profile Used" {...a11yProps(0)} />
                            <Tab label="TOPSIS" {...a11yProps(1)} />
                            <Tab label="FUZZY TOPSIS" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={tabValue} index={0}>
                        <TabFuzzyProfileComponent fuzzyProfileDto={fuzzyProfileDto} />
                    </TabPanel>
                    <TabPanel value={tabValue} index={1}>
                        Item Two
                    </TabPanel>
                    <TabPanel value={tabValue} index={2}>
                        Item Three
                    </TabPanel>
                </Box>

            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>

        </Dialog>
    )
}
