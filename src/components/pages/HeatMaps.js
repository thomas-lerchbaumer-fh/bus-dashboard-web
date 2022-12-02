import React, {useEffect, useContext} from 'react';
import {CircularProgress} from "@mui/material";


import DashboardDataContext from "../../context/dashboardData/dashboardDataContext";

import Map from "../dashboard/heatMap/Map";
import FullGridItem from "../layout/FullGridItem";
import Grid from "@mui/material/Unstable_Grid2";

const HeatMaps = (props) => {

    const dashboardDataContext = useContext(DashboardDataContext)
    const {loading, error, heatmapFromData, heatMapToData, getHeatmapFromData, getHeatmapToData} = dashboardDataContext;

    useEffect(() => {
        getHeatmapFromData();
        console.log('heat')
    }, [error, getHeatmapToData]);


    console.log(heatMapToData)
    return (
        (loading) ? <CircularProgress></CircularProgress> :
            <>
                <Grid container>
                    <FullGridItem>
                        <Map heatMap={heatmapFromData} loading={loading} mapId="map-1" />
                    </FullGridItem>
                </Grid>



            </>
    )


}


export default HeatMaps;