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
import GroupIcon from "@mui/icons-material/Group";
import AltRouteIcon from '@mui/icons-material/AltRoute';
import DirectionsBusFilledIcon from '@mui/icons-material/DirectionsBusFilled';


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
    const [paxValue, setPaxValue] = useState(100);
    const [dateRange, setDateRange] = useState([null, null])

    const [distanceValue,setDistanceValue] = useState(5000)

    const [tmpData, setTmpData] =useState([]);

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
            type:"number",
            valueGetter: (params) =>(params.row.distanceInMeters / 1000)
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
            console.log(searchRequests,'searchreq')

            setFilter([{
                columnField: "pax",
                operatorValue: "<=",
                value: newValue
            },
            ])

        if(searchRequests){
            const tmpFiltered = searchRequests.filter(item => item.pax <= newValue);
            let tmpPax=0;
            let tmpDistance = 0;
            let tmpAmount = 0
            tmpFiltered.forEach(item =>{
                tmpPax += item.pax;
                tmpDistance += item.distanceInMeters
                tmpAmount += item.cheapestPrice_amount
            })

            const result = {
                "pax":tmpPax / tmpFiltered.length,
                "distance": (tmpDistance/ tmpFiltered.length) / 1000,
                "price":tmpAmount /tmpFiltered.length,
                "requests":tmpFiltered.length
            }
            setFilteredData(result);

        }


    }

    const calcFilteredDataValues = (filter, filterVal) =>{


    }

    const handleDistanceChange = (event,newValue)=>{
        setDistanceValue(newValue)
    }

    const handleDistanceOnEnd = (event, newValue) =>{
        setFilter([{
            columnField: "distanceInMeters",
            operatorValue: "<=",
            value: newValue
        },
        ])
        if(searchRequests){
            const tmpFiltered = searchRequests.filter(item => item.distanceInMeters <= newValue *1000);
            let tmpPax=0;
            let tmpDistance = 0;
            let tmpAmount = 0
            tmpFiltered.forEach(item =>{
                tmpPax += item.pax;
                tmpDistance += item.distanceInMeters
                tmpAmount += item.cheapestPrice_amount
            })

            const result = {
                "pax":tmpPax / tmpFiltered.length,
                "distance": (tmpDistance/ tmpFiltered.length) / 1000,
                "price":tmpAmount /tmpFiltered.length,
                "requests":tmpFiltered.length
            }
            setFilteredData(result);

        }
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
            if(searchRequests){

                const startDate = newValue[0].$d
                const endDate = newValue[1].$d
                const tmpFiltered = searchRequests.filter(item => Date.parse(item.taskFrom_time) >=  Date.parse(startDate) && Date.parse(item.taskFrom_time) <= Date.parse(endDate));
                let tmpPax=0;
                let tmpDistance = 0;
                let tmpAmount = 0
                tmpFiltered.forEach(item =>{
                    tmpPax += item.pax;
                    tmpDistance += item.distanceInMeters
                    tmpAmount += item.cheapestPrice_amount
                })

                const result = {
                    "pax":tmpPax / tmpFiltered.length,
                    "distance": (tmpDistance/ tmpFiltered.length) / 1000,
                    "price":tmpAmount /tmpFiltered.length,
                    "requests":tmpFiltered.length
                }
                setFilteredData(result);
            }
        }
    }

    useEffect(() => {
        if (loadingLanding) {
            getSearchRequests()
            if (searchRequests) setFilteredData(searchRequests)
        }


    }, [searchRequests]);


    return (
        (loadingLanding) ? <></> :
            <>
                <Grid container spacing={5}>
                    <Grid item xs={12} md={3} lg={3}>
                        <GridItem>
                            <Box sx={{width: 300}}>

                                <Typography id="pax-slider" gutterBottom>
                                    Pax {paxValue}
                                </Typography>
                                <Slider defaultValue={paxValue} onChange={handlePaxChange} value={paxValue}
                                        onChangeCommitted={handlePaxOnEnd} aria-label="Pax" valueLabelDisplay="auto"
                                        aria-labelledby="pax-slider"/>
                                <Box sx={{width: 300}}>

                                    <Typography id="distance-Slider" gutterBottom>
                                        Distance {distanceValue} km
                                    </Typography>
                                    <Slider defaultValue={distanceValue} onChange={handleDistanceChange}  max={5000} value={distanceValue}
                                            onChangeCommitted={handleDistanceOnEnd} aria-label="distance" valueLabelDisplay="auto"
                                            aria-labelledby="distance-Slider"/>

                                </Box>
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
                                {paxValue !== 100 &&
                                    <Chip label="Pax" variant="outlined" onDelete={() => {
                                        setPaxValue(100)
                                        setFilter([])
                                        setFilteredData([])
                                    }
                                    }/>
                                }
                                {distanceValue !== 5000 &&
                                    <Chip label="distance" variant="outlined" onDelete={() => {
                                        setDistanceValue(5000)
                                        setFilter([])
                                        setFilteredData([])
                                    }
                                    }/>
                                }
                                {dateRange[0] && dateRange[1] &&
                                    <Chip label="Date" variant="outlined" onDelete={() => {
                                        setDateRange(([null, null]))
                                        setFilter([])
                                        setFilteredData([])
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
                                    experimentalFeatures={{newEditingApi: true}}
                                />
                            </GridItem>
                        }
                    </Grid>
                </Grid>


                {filteredData.requests && filter.length &&
                <Grid container spacing={5}>
                    <Grid item xs={3} >
                        <GridItem>
                            <Box display="flex" justifyContent="space-around" alignItems="center" flexDirection={"row"}
                                 >
                                <GroupIcon fontSize="large" color={"primary"}></GroupIcon>
                                <Typography  variant="h6" component="div">
                                    AVG Pax
                                </Typography>
                                <Typography variant="h6" color="text.secondary">
                                    {filteredData.pax.toFixed(2)}
                                </Typography>
                            </Box>
                        </GridItem>
                    </Grid>
                    <Grid item xs={3} >
                        <GridItem>
                            <Box display="flex" justifyContent="space-around" alignItems="center" flexDirection={"row"}
                            >
                                <DirectionsBusFilledIcon fontSize="large" color={"primary"}></DirectionsBusFilledIcon>
                                <Typography  variant="h6" component="div">
                                    Requests
                                </Typography>
                                <Typography variant="h6" color="text.secondary">
                                    {filteredData.requests}
                                </Typography>
                            </Box>
                        </GridItem>
                    </Grid>
                    <Grid item xs={3} >
                        <GridItem>      <Box display="flex" justifyContent="space-around" alignItems="center" flexDirection={"row"}
                        >
                            <GroupIcon fontSize="large" color={"primary"}></GroupIcon>
                            <Typography  variant="h6" component="div">
                                AVG Order Vol
                            </Typography>
                            <Typography variant="h6" color="text.secondary">
                                {filteredData.price.toFixed(2)}
                            </Typography>
                        </Box></GridItem>
                    </Grid>
                    <Grid item xs={3} >
                        <GridItem>      <Box display="flex" justifyContent="space-around" alignItems="center" flexDirection={"row"}
                        >
                            <AltRouteIcon  fontSize="large" color={"primary"}></AltRouteIcon >
                            <Typography  variant="h6" component="div">
                                AVG Distance
                            </Typography>
                            <Typography variant="h6" color="text.secondary">
                                {filteredData.distance.toFixed(2)}km
                            </Typography>
                        </Box></GridItem>
                    </Grid>
                </Grid>
                }


            </>


    )


}


export default HomeDataGrid