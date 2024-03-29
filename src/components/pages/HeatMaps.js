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
import RankingTableRoutes from "../dashboard/heatMap/RankingTableRoutes";

const HeatMaps = (props) => {

    const dashboardDataContext = useContext(DashboardDataContext)
    const {
        loadingTo,
        loadingFrom,
        error,
        loadingRankingDest,
        heatmapFromData,
        heatMapToData,
        getHeatmapFromData,
        getHeatmapToData,
        getRanking,
        departureReq,
        loadingRanking,
        destinationReq,
        getRankingRoutes,
        loadingRankedRoutes,
        rankedRoutes
    } = dashboardDataContext;

    useEffect(() => {
        getHeatmapFromData();
        getRanking({"action": "departure"})
        getRanking({"action": "destination"})
        getHeatmapToData()
        getRankingRoutes()
    }, [error, getHeatmapToData]);

    return (
        (loadingTo || loadingRanking || loadingFrom || loadingRankingDest || loadingRankedRoutes) ?
            <CircularProgress></CircularProgress> :
            <>
                <Grid container spacing={4} alignItems="stretch">
                    <HalfGridItem>
                        <Map heatMap={heatmapFromData} loading={loadingFrom} mapId="map-1"/>
                    </HalfGridItem>
                    <Grid xs={12} xl={4} md={4} lg={4} item>
                        <GridItem>
                            <Typography variant="h5"> <DepartureBoardIcon></DepartureBoardIcon> Top 5 Departure Requests
                                (Radius 20km) </Typography>

                            <RankingTable loading={loadingRanking} ranking={departureReq}></RankingTable>
                        </GridItem>
                    </Grid>
                    <Grid xs={12} xl={4} md={4} lg={4} item>
                        <GridItem>
                            <Typography variant="h5"> <DepartureBoardIcon></DepartureBoardIcon> Top 5 Destination
                                Requests (Radius 20km)</Typography>
                            <RankingTable loading={loadingRanking} ranking={destinationReq}></RankingTable>
                        </GridItem>
                    </Grid>
                    <HalfGridItem>
                        <Map heatMap={heatMapToData} loading={loadingTo} mapId="map-2"/>
                    </HalfGridItem>
                    <Grid xs={12} xl={6} md={6} lg={6} item>
                        <GridItem>
                            <Map heatMap={heatmapFromData} loading={loadingFrom} mapId="map-1"/>
                        </GridItem>
                    </Grid>
                    <Grid xs={12} xl={6} md={6} lg={6} item>
                        <GridItem>
                            <Typography variant="h5"> <DepartureBoardIcon></DepartureBoardIcon> Top 5 Routes (no
                                roundtrips) </Typography>
                            <RankingTableRoutes loading={loadingRankedRoutes}
                                                ranking={rankedRoutes}></RankingTableRoutes>
                        </GridItem>
                    </Grid>
                </Grid>


            </>
    )


}


export default HeatMaps;