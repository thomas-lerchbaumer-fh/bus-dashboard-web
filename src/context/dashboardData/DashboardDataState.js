import React, {useCallback, useMemo, useReducer} from "react";
import DashboardDataContext from "./dashboardDataContext";
import dashboardDataReducer from "./dashboardDataReducer";
import axios from "axios";

import {
    GET_HEATMAP_FROM_DATA,
    GET_HEATMAP_TO_DATA,
    DATA_FETCH_ERROR,
    GET_DEPARTURE_RANKING,
    GET_DESTINATION_RANKING
} from "../types";
import setAuthToken from "../../utils/setAuthToken";


const DashboardDataState = props => {
    const initialState = {
        loadingFrom: true,
        loadingTo: true,
        loadingRanking: true,
        heatmapFromData: [],
        heatmapToData: [],
        departureReq: [],
        destinationReq: [],
        error: null,
        loadingRankingDest: true

    }

    const [state, dispatch] = useReducer(dashboardDataReducer, initialState)

    const getHeatmapFromData = useCallback(async (params) => {
        setAuthToken(localStorage.token);
        state.loading= true
        try {
            const res = await axios.post('/data/heatmap')
            dispatch({
                type: GET_HEATMAP_FROM_DATA,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: DATA_FETCH_ERROR,
            });
        }
    }, [dispatch]);

    const getHeatmapToData = useCallback(async (params) => {
        setAuthToken(localStorage.token);
        state.loading = true
        try {
            const res = await axios.post('/data/heatmapTo')
            dispatch({
                type: GET_HEATMAP_TO_DATA,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: DATA_FETCH_ERROR,
            });
        }
    }, [dispatch]);

    const getRanking = useCallback(async (params) => {
        setAuthToken(localStorage.token);
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        state.loadingRaking = true
        try {
            const res = await axios.post('/data/mostRequests', params, config)
            if (params.action === "departure") {
                dispatch({
                    type: GET_DEPARTURE_RANKING,
                    payload: res.data
                });
            } else {
                dispatch({
                    type: GET_DESTINATION_RANKING,
                    payload: res.data
                });
            }
        } catch (err) {
            dispatch({
                type: DATA_FETCH_ERROR,
            });
        }
    }, [dispatch]);


    return (
        <DashboardDataContext.Provider value={{
            loadingFrom: state.loadingFrom,
            loadingTo: state.loadingTo,
            heatmapFromData: state.heatmapFromData,
            heatMapToData: state.heatMapToData,
            departureReq: state.departureReq,
            destinationReq: state.destinationReq,
            loadingRanking: state.loadingRanking,
            loadingRankingDest: state.loadingRankingDest,
            getHeatmapFromData,
            getRanking,
            getHeatmapToData

        }}>
            {props.children}
        </DashboardDataContext.Provider>
    )

}

export default DashboardDataState