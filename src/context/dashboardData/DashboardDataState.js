import React, {useCallback, useMemo, useReducer} from "react";
import DashboardDataContext from "./dashboardDataContext";
import dashboardDataReducer from "./dashboardDataReducer";
import axios from "axios";

import {
    GET_HEATMAP_FROM_DATA,
    GET_HEATMAP_TO_DATA,
    DATA_FETCH_ERROR
} from "../types";
import setAuthToken from "../../utils/setAuthToken";


const DashboardDataState = props => {
    const initialState= {
        loading: true,
        heatmapFromData: [],
        heatmapToData: [],
        error: null
    }

    const [state,dispatch] = useReducer(dashboardDataReducer,initialState)



    const getHeatmapFromData = useCallback(async (params) => {
        setAuthToken(localStorage.token);
        console.log('ex');
        try {
            const res = await axios.post('/data/heatmap')
            console.log(res)
            dispatch({
                type: GET_HEATMAP_FROM_DATA,
                payload: res.data
            });
        } catch (err) {
            console.log(err);
            dispatch({
                type: DATA_FETCH_ERROR,
            });
        }
    }, [dispatch]);


    return(
        <DashboardDataContext.Provider value={{
            loading: state.loading,
            heatmapFromData: state.heatmapFromData,
            heatMapToData: state.heatMapToData,
            getHeatmapFromData

        }}>
            {props.children}
        </DashboardDataContext.Provider>
    )

}

export default DashboardDataState