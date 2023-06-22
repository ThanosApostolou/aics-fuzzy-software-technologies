
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { TopsisDataRowDto } from '../dtos/topsis-data-row-dto';
import { TopsisDataTableDto } from '../dtos/topsis-data-table-dto';

export interface TopsisTableProps {
    dataTable: TopsisDataTableDto;
    showDminus: boolean;
    showDplus: boolean;
    showS: boolean;
    yearCostCriteria: boolean;
    durationCostCriteria: boolean;
}

export default function TopsisTable({ dataTable, showDminus, showDplus, showS, yearCostCriteria, durationCostCriteria }: TopsisTableProps) {
    const columns = useMemo(() => {
        return createColumns(showDminus, showDplus, showS)
    }, [showDminus, showDplus, showS]);

    function createColumns(showDminus: boolean, showDplus: boolean, showS: boolean): GridColDef[] {
        const columns: GridColDef[] = [
            {
                field: 'name',
                headerName: 'Movies Alternatives',
                minWidth: 100,
                flex: 1,
                editable: false,
                sortable: false
            },
            {
                field: 'rating',
                headerName: 'Rating (B)',
                minWidth: 50,
                flex: 1,
                editable: false,
                sortable: false
            }, {
                field: 'popularity',
                headerName: 'Popularity (C)',
                width: 50,
                flex: 1,
                editable: false,
                sortable: false
            }, {
                field: 'year',
                headerName: `Year ${yearCostCriteria ? '(C)' : '(B)'}`,
                width: 50,
                flex: 1,
                editable: false,
                sortable: false
            }, {
                field: 'duration',
                headerName: `Duration ${durationCostCriteria ? '(C)' : '(B)'}`,
                width: 50,
                flex: 1,
                editable: false,
                sortable: false
            }
        ];
        if (showDminus) {
            columns.push({
                field: 'dminus',
                headerName: 'D-',
                width: 50,
                flex: 1,
                editable: false,
                sortable: false
            })
        }
        if (showDplus) {
            columns.push({
                field: 'dplus',
                headerName: 'D+',
                width: 50,
                flex: 1,
                editable: false,
                sortable: false
            })
        }
        if (showS) {
            columns.push({
                field: 's',
                headerName: 'S',
                width: 50,
                flex: 1,
                editable: false,
                sortable: false
            });
        }
        return columns;
    }

    return (
        <Box sx={{ height: '500px', padding: 2 }}>
            <DataGrid
                rows={dataTable.rows}
                columns={columns}
                hideFooter={true}
                checkboxSelection={false}
                disableRowSelectionOnClick
                getRowId={(row) => row.movieId}
                density='compact'
                disableColumnMenu
            />
        </Box>
    )
}
