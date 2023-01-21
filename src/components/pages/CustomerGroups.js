import React, {useContext, useEffect, useState} from 'react';
import CustomerGroupDataContext from "../../context/customerGroupData/customerGroupDataContext";
import Grid from "@mui/material/Unstable_Grid2";
import GridItem from "../layout/GridItem";
import Typography from "@mui/material/Typography";
import {CircularProgress, ToggleButton, ToggleButtonGroup} from "@mui/material";
import CustomerGroupTiles from "../dashboard/customerGroupTiles";


const CustomerGroups = props => {

    const customerGroupContext = useContext(CustomerGroupDataContext);
    const {getCustomerGroups, groups, loadingGroups, getFilteredData, groupData, loadingData} = customerGroupContext;
    const [view, setView] = React.useState('list');
    const [selectedGroups, setSelectedGroups] = useState(["School"]);

    useEffect(() => {
        if (loadingGroups) {
            getCustomerGroups()
            getFilteredData({
                customerGroup: "School"
            })
        }

    }, [groups, groupData])


    const handleChange = (e, nextView) => {
        setView(nextView)
        getFilteredData(
            {
                customerGroup: nextView
            }
        )
    }

    return (
        (loadingGroups ? "" :
                <>
                    <Grid container spacing={4} alignItems="stretch">
                        <Grid xs={3} xl={3} md={3} lg={3} item>
                            <GridItem>
                                <Typography mb={1} variant={"h6"}>Available Customer Groups:</Typography>
                                <ToggleButtonGroup
                                    orientation="vertical"
                                    value={view}
                                    exclusive
                                    onChange={handleChange}
                                >
                                    {groups.map((group) => (
                                        <ToggleButton value={group.group_name} aria-label="list">
                                            {group.group_name}
                                        </ToggleButton>
                                    ))}
                                </ToggleButtonGroup>
                            </GridItem>
                        </Grid>

                        <Grid xs={9} xl={9} md={9} lg={9} item>
                            <GridItem>
                                {loadingData && <CircularProgress></CircularProgress>}
                                {!loadingData &&
                                    <>
                                        <CustomerGroupTiles data={groupData} ></CustomerGroupTiles>
                                    </>
                                }

                            </GridItem>
                        </Grid>

                    </Grid>
                </>
        )
    )


}

export default CustomerGroups;