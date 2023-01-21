import React from 'react'
import Grid from "@mui/material/Unstable_Grid2";
import {Card, CardContent} from "@mui/material";
import Box from "@mui/material/Box";
import GroupIcon from "@mui/icons-material/Group";
import Typography from "@mui/material/Typography";
import DirectionsBusFilledIcon from "@mui/icons-material/DirectionsBusFilled";
import PaidIcon from "@mui/icons-material/Paid";


const customerGroupTiles = props => {

    const data = props.data

    return (
        <>
            <Grid container spacing={5} alignItems={"stretch"}>
                <Grid xs={12} sm={12} md={6} lg={3} xl={3} item>
                    <Card elevation={6}>
                        <CardContent>
                            <Box display="flex" justifyContent="center" alignItems="center" flexDirection={"column"}
                                 p={2}>
                                <GroupIcon fontSize="large" color={"primary"}></GroupIcon>
                                <Typography variant="h6" component="div">
                                    Average Pax
                                </Typography>
                                <Typography variant="h5" color="text.secondary">
                                    {data.avgPax}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid xs={12} sm={12} md={6} lg={3} xl={3} item>
                    <Card elevation={6}>
                        <CardContent>
                            <Box display="flex" justifyContent="center" alignItems="center" flexDirection={"column"}
                                 p={2}>
                                <DirectionsBusFilledIcon fontSize="large" color={"primary"}></DirectionsBusFilledIcon>
                                <Typography  variant="h6" component="div">
                                    Total Requests
                                </Typography>
                                <Typography variant="h5" color="text.secondary">
                                    {data.count}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid xs={12} sm={12} md={6} lg={3} xl={3} item>
                    <Card elevation={6}>
                        <CardContent>
                            <Box display="flex" justifyContent="center" alignItems="center" flexDirection={"column"}
                                 p={2}>
                                <PaidIcon  fontSize="large" color={"primary"}></PaidIcon>
                                <Typography  variant="h6" component="div">
                                    Average Distance
                                </Typography>
                                <Typography variant="h5" color="text.secondary">
                                    {(data.avgDistance/1000).toLocaleString(undefined, {maximumFractionDigits:2})} km
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid xs={12} sm={12} md={6} lg={3} xl={3} item>
                    <Card elevation={6}>
                        <CardContent>
                            <Box display="flex" justifyContent="center" alignItems="center" flexDirection={"column"}
                                 p={2}>
                                <PaidIcon  fontSize="large" color={"primary"}></PaidIcon>
                                <Typography  variant="h6" component="div">
                                    Average Order Volume
                                </Typography>
                                <Typography variant="h5" color="text.secondary">
                                    {data.avgPrice.toLocaleString(undefined, {maximumFractionDigits:2})} €
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>
        </>
    )
}

export default customerGroupTiles;