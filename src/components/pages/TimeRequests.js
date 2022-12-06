import React, {useContext, useEffect} from 'react';
import {Group} from '@visx/group';
import genBins, {Bin, Bins} from '@visx/mock-data/lib/generators/genBins';
import {scaleLinear} from '@visx/scale';
import Grid from "@mui/material/Unstable_Grid2";
import DashboardDataContext from "../../context/dashboardData/dashboardDataContext";
import {Card, CircularProgress} from "@mui/material";
import HalfGridItem from "../layout/HalfGridItem";
import TimeLine from "../dashboard/time/TimeLine";
import Typography from "@mui/material/Typography";
import TimeCalendar from "../dashboard/time/TimeCalendar";
import GridItem from "../layout/GridItem";


const TimeRequests = (props) => {
    const dashboardDataContext = useContext(DashboardDataContext)
    const {
        loadingTimeReq,
        getTimeRequests,
        timeReq,
        loadingTimeCalendar,
        getTimeCalendar,
        timeCalendar
    } = dashboardDataContext

    useEffect(() => {
        getTimeRequests()
        getTimeCalendar()
    }, [getTimeRequests, getTimeRequests]);


    return (
        (loadingTimeReq) ? <CircularProgress></CircularProgress> :
            <>
                <Grid container spacing={4} alignItems={"stretch"}>
                    <Grid container xs={12} sm={8} lg={8}>
                        <Grid item lg={12}>
                            <GridItem>
                                <Typography variant="h5">Requests per daytime</Typography>
                                <div style={{width: "100%", height: "30vh"}}>
                                    <TimeLine data={timeReq} loading={loadingTimeReq}></TimeLine>
                                </div>
                            </GridItem>
                        </Grid>
                        <Grid item lg={12}>
                            <GridItem>
                                <Typography variant="h5">Requests per day (departure date)</Typography>

                                <div style={{width: "100%", height: "30vh"}}>
                                    <TimeCalendar data={timeCalendar} loading={loadingTimeCalendar}></TimeCalendar>
                                </div>
                            </GridItem>
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} sm={3} lg={3} alignItems={"stretch"}>
                        <Grid item md={12} lg={12}>
                            <GridItem>
                                <Card variant="outlined">hello</Card>
                            </GridItem>
                        </Grid>
                    </Grid>
                </Grid>
            </>
    )


}


export default TimeRequests