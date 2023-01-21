import React, {useContext, useEffect, useState} from 'react'
import Grid from "@mui/material/Unstable_Grid2";
import GridItem from "../layout/GridItem";
import LandingPageContext from "../../context/landingPageData/landingPageContext";
import {Chip, CircularProgress, Slider, TextField} from "@mui/material";
import {DataGrid, GRID_DATE_COL_DEF, GridToolbar} from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';

import {DesktopDateRangePicker} from '@mui/x-date-pickers-pro/DesktopDateRangePicker';

import Stack from '@mui/material/Stack';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import locale from 'date-fns/locale/de-AT';


function buildApplyDateFilterFn(filterItem, compareFn, showTime = false) {
    if (!filterItem.value) {
        return null;
    }
    return ({value}) => {
        if (!value) {
            return false;
        }
        const dateCopy = new Date(value);

        const cellValueMs = dateCopy.getTime();

        if (filterItem.value[0] && filterItem.value[1]) {

            if (cellValueMs >= filterItem.value[0] && cellValueMs <= filterItem.value[1]) return true
        }
        return false

    };
}


const getDateFilterOperators = (showTime = false) => {
    return [
        {
            value: 'between',
            getApplyFilterFn: (filterItem) => {
                return buildApplyDateFilterFn(
                    filterItem,
                    (value1, value2) => value1 <= value2,
                    showTime,
                );
            },
            //InputComponent: GridFilterDateInput,
            //InputComponentProps: {showTime},
        }
    ]
}

const dateAdapter = new AdapterDateFns({locale});

const dateColumnType = {
    ...GRID_DATE_COL_DEF,
    resizable: false,
    filterOperators: getDateFilterOperators(),
    valueFormatter: (params) => {
        if (typeof params.value === 'string') {
            return params.value;
        }
        if (params.value) {
            return dateAdapter.format(params.value, 'keyboardDate');
        }
        return '';
    },
};


/**
 * `dateTime` column
 */


const HomeDataGrid = props => {
    const [filteredData, setFilteredData] = useState()
    const [paxValue, setPaxValue] = React.useState(100);
    const [dateRange, setDateRange] = useState([null, null])


    const columns = [
        {field: 'id', headerName: 'ID', width: 50},
        {
            field: 'taskFrom_address',
            headerName: 'From',
            width: 200,
        },
        {
            field: 'createdAt',
            headerName: 'Request on',
            width: 200,
        },
        {
            field: 'taskFrom_time',
            headerName: 'Departure Time',
            type: "date",
            ...dateColumnType,
            width: 200,
            filter: true
        },
        {
            field: 'taskTo_address',
            headerName: 'To',
            width: 200,
        },
        {
            field: 'pax',
            headerName: 'Pax',
            width: 110,
            type: "number"
        },
        {
            field: 'distanceInMeters',
            headerName: 'Distance in km',
            width: 200,
            valueGetter: (params) =>
                `${(params.row.distanceInMeters / 1000).toLocaleString(undefined, {maximumFractionDigits: 2})}km`,
        },
        {
            field: 'bookingIntegration_id',
            headerName: 'External request',
            width: 200,
        },
    ];

    const landingPageContext = useContext(LandingPageContext)
    const {
        loadingLanding,
        searchRequests,
        getSearchRequests
    } = landingPageContext


    const handlePaxChange = (event, newValue) => {
        setPaxValue(newValue);

    };

    const handlePaxOnEnd = (event, newValue) => {

            setFilter([{
                columnField: "pax",
                operatorValue: "<=",
                value: newValue
            },
            ])

    }


    const [filter, setFilter] = useState([])

    const handleDateChange = (newValue) => {
        setDateRange(newValue)

        const decpOne = newValue[0].$d.getTime();
        const decpTwo = newValue[1].$d.getTime();


        if (decpOne && decpTwo) {
            setFilter([{
                columnField: "taskFrom_time",
                operatorValue: "between",
                //value: newValue[0].$d
                value: [decpOne, decpTwo]
            },
            ])
        }
    }

    useEffect(() => {
        if (loadingLanding) {
            getSearchRequests()
            if (searchRequests) setFilteredData(searchRequests)
        }


    }, [searchRequests]);


    return (
        (loadingLanding) ? <CircularProgress></CircularProgress> :
            <>
                <Grid container spacing={5}>
                    <Grid item xs={12} md={3} lg={3}>
                        <GridItem>
                            <Box sx={{width: 300}}>

                                <Typography id="pax-slider" gutterBottom>
                                    Pax max {paxValue}
                                </Typography>
                                <Slider defaultValue={paxValue} onChange={handlePaxChange} value={paxValue}
                                        onChangeCommitted={handlePaxOnEnd} aria-label="Pax" valueLabelDisplay="auto"
                                        aria-labelledby="pax-slider"/>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <Stack spacing={3}>
                                        <DesktopDateRangePicker
                                            value={dateRange}
                                            onChange={handleDateChange}
                                            renderInput={(startProps, endProps) => (
                                                <React.Fragment>
                                                    <TextField {...startProps} />
                                                    <Box sx={{mx: 2}}> to </Box>
                                                    <TextField {...endProps} />
                                                </React.Fragment>
                                            )}
                                        />
                                    </Stack>
                                </LocalizationProvider>
                            </Box>
                            <Box sx={{width: 300}} mt={3}>
                                {paxValue != 100 &&
                                    <Chip label="Pax" variant="outlined" onDelete={() => {
                                        setPaxValue(100)
                                        setFilter([])
                                    }
                                    }/>
                                }
                                {dateRange[0] && dateRange[1] &&
                                    <Chip label="Date" variant="outlined" onDelete={() => {
                                        setDateRange(([null, null]))
                                        setFilter([])
                                    }
                                    }/>
                                }
                            </Box>
                        </GridItem>


                    </Grid>

                    <Grid item xs={12} md={8} lg={9} height={"60vh"}>
                        {!loadingLanding &&
                            <GridItem>
                                <DataGrid
                                    rows={searchRequests}
                                    columns={columns}
                                    filterModel={{
                                        items: filter
                                    }}
                                    onFilterModelChange={(newFilterModel, details) => {
                                        setFilter(newFilterModel);
                                    }}
                                    pageSize={20}
                                    rowsPerPageOptions={[20]}
                                    checkboxSelection
                                    disableSelectionOnClick
                                    experimentalFeatures={{newEditingApi: false}}
                                />
                            </GridItem>
                        }
                    </Grid>
                </Grid>
            </>


    )


}


export default HomeDataGrid