import React, {useEffect, useContext} from 'react';
import {CircularProgress} from "@mui/material";
import DashboardDataContext from "../../context/dashboardData/dashboardDataContext";
import Map from "../dashboard/heatMap/Map";
import HalfGridItem from "../layout/HalfGridItem";
import Grid from "@mui/material/Unstable_Grid2";
import NestedGrid from "../layout/NestedGrid";
import menuEntries from "../../utils/menuEntries";
import GridItem from "../layout/GridItem";
import Typography from "@mui/material/Typography";
import DepartureBoardIcon from '@mui/icons-material/DepartureBoard';
import RankingTable from "../dashboard/heatMap/RankingTable";

const HeatMaps = (props) => {

    const dashboardDataContext = useContext(DashboardDataContext)
    const {loadingTo,loadingFrom, error,loadingRankingDest, heatmapFromData, heatMapToData, getHeatmapFromData, getHeatmapToData,getRanking,departureReq, loadingRanking,destinationReq,} = dashboardDataContext;

    useEffect(() => {
        getHeatmapFromData();
        getRanking({"action":"departure"})
        getRanking({"action":"destination"})
        getHeatmapToData()
    }, [error, getHeatmapToData]);

    return (
        (loadingTo || loadingRanking || loadingFrom || loadingRankingDest ) ? <CircularProgress></CircularProgress> :
            <>
                <Grid container spacing={4}  alignItems="stretch">
                    <HalfGridItem>
                        <Map heatMap={heatmapFromData} loading={loadingFrom} mapId="map-1" />
                    </HalfGridItem>
                    <Grid xs={12} xl={4} md={4} lg={4} item>
                        <GridItem>
                            <Typography variant="h5"> <DepartureBoardIcon></DepartureBoardIcon> Top 5 Departure Requests (Radius 20km) </Typography>

                            <RankingTable loading={loadingRanking} ranking={departureReq}></RankingTable>
                        </GridItem>
                    </Grid>
                    <Grid xs={12} xl={4} md={4} lg={4} item>
                        <GridItem>
                            <Typography variant="h5"> <DepartureBoardIcon></DepartureBoardIcon> Top 5 Destination Requests (Radius 20km)</Typography>
                            <RankingTable loading={loadingRanking} ranking={destinationReq}></RankingTable>
                        </GridItem>
                    </Grid>
                    <HalfGridItem>
                        <Map heatMap={heatMapToData} loading={loadingTo} mapId="map-2" />
                    </HalfGridItem>

                </Grid>



            </>
    )


}


export default HeatMaps;