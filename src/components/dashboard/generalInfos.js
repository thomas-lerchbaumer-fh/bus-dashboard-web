import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import {Button, Card, CardActions, CardContent, CardHeader, CardMedia, CircularProgress} from "@mui/material";
import Typography from "@mui/material/Typography";
import GroupIcon from '@mui/icons-material/Group';
import Box from "@mui/material/Box";
import DirectionsBusFilledIcon from '@mui/icons-material/DirectionsBusFilled';
import PaidIcon from '@mui/icons-material/Paid';
const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const GeneralInfos = (props) => {
    const {data, loading} = props

    const nf = new Intl.NumberFormat();

    return (
        (loading)?<CircularProgress></CircularProgress>:
        <>
            <Grid container spacing={5}>
                <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
                    <Card elevation={6}>
                        <CardContent>
                            <Box display="flex" justifyContent="center" alignItems="center" flexDirection={"column"}
                                 p={2}>
                                <GroupIcon fontSize="large" color={"primary"}></GroupIcon>
                                <Typography  variant="h5" component="div">
                                    Average Pax
                                </Typography>
                                <Typography variant="h5" color="text.secondary">
                                    {data.avgPax}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
                    <Card elevation={6}>
                        <CardContent>
                            <Box display="flex" justifyContent="center" alignItems="center" flexDirection={"column"}
                                 p={2}>
                                <DirectionsBusFilledIcon fontSize="large" color={"primary"}></DirectionsBusFilledIcon>
                                <Typography  variant="h5" component="div">
                                    Total Requests
                                </Typography>
                                <Typography variant="h5" color="text.secondary">
                                    {data.totalRequests}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
                    <Card elevation={6}>
                        <CardContent>
                            <Box display="flex" justifyContent="center" alignItems="center" flexDirection={"column"}
                                 p={2}>
                                <PaidIcon  fontSize="large" color={"primary"}></PaidIcon>
                                <Typography  variant="h5" component="div">
                                    Average Order Volume
                                </Typography>
                                <Typography variant="h5" color="text.secondary">
                                    {data.avgPrice.toLocaleString(undefined, {maximumFractionDigits:2})} €
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
                    <Card elevation={6}>
                        <CardContent>
                            <Box display="flex" justifyContent="center" alignItems="center" flexDirection={"column"}
                                 p={2}>
                                <PaidIcon  fontSize="large" color={"primary"}></PaidIcon>
                                <Typography  variant="h5" component="div">
                                    Average Distance
                                </Typography>
                                <Typography variant="h5" color="text.secondary">
                                    {(data.avgDistance/1000).toLocaleString(undefined, {maximumFractionDigits:2})} km
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    )

}


export default GeneralInfos