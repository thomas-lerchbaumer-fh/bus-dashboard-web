import React, {useCallback, useMemo, useReducer} from "react";
import DashboardDataContext from "./dashboardDataContext";
import dashboardDataReducer from "./dashboardDataReducer";
import axios from "axios";

import {
    GET_HEATMAP_FROM_DATA,
    GET_HEATMAP_TO_DATA,
    DATA_FETCH_ERROR,
    GET_DEPARTURE_RANKING,
    GET_DESTINATION_RANKING,
    GET_TIME_REQUESTS, GET_TIME_CALENDAR, GET_GENERAL_DATA, GET_NO_RESULTS, GET_RANKING_ROUTES
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
        timeReq: [],
        loadingTimeReq: true,
        error: null,
        loadingRankingDest: true,
        timeCalendar: [],
        loadingTimeCalendar: true,
        generalData: [],
        loadingGeneralData: true,
        noResultsForRequest: [],
        loadingNoResults: true,
        loadingRankedRoutes: true,
        rankedRoutes: []
    }

    const [state, dispatch] = useReducer(dashboardDataReducer, initialState)

    const getHeatmapFromData = useCallback(async (params) => {
        setAuthToken(localStorage.token);
        state.loading = true
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


    const getRankingRoutes = useCallback(async ()=>{
        setAuthToken(localStorage.token)

        try{
            const res = await axios.post('/data/getRankingRoutes')
            console.log(res);
            dispatch({
                type:GET_RANKING_ROUTES,
                payload:res.data,
            })
        }catch (e)
        {
            dispatch({
                type:DATA_FETCH_ERROR
            })
        }


    },[dispatch])

    const getNoResults = useCallback(async (params) => {
        setAuthToken(localStorage.token);
        state.loading = true
        try {
            const res = await axios.post('/data/noSearchResults')
            dispatch({
                type: GET_NO_RESULTS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: DATA_FETCH_ERROR,
            });
        }
    }, [dispatch]);

    const getTimeRequests = useCallback(async () => {
        setAuthToken(localStorage.token);
        try {
            const res = await axios.post('/data/timeRequests')
            dispatch({
                type: GET_TIME_REQUESTS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: DATA_FETCH_ERROR,
            });
        }
    }, [dispatch]);

    const getTimeCalendar = useCallback(async () => {
        setAuthToken(localStorage.token);
        try {
            const res = await axios.post('/data/requestsPerDay')
            dispatch({
                type: GET_TIME_CALENDAR,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: DATA_FETCH_ERROR,
            });
        }
    }, [dispatch]);


    const getGeneralData = useCallback(async () => {
        setAuthToken(localStorage.token);
        try {
            const res = await axios.post('/data/generalData')
            dispatch({
                type: GET_GENERAL_DATA,
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
            timeReq: state.timeReq,
            loadingTimeReq: state.loadingTimeReq,
            timeCalendar: state.timeCalendar,
            loadingTimeCalendar: state.loadingTimeCalendar,
            generalData: state.generalData,
            loadingGeneralData: state.loadingGeneralData,
            noResultsForRequest: state.noResultsForRequest,
            loadingNoResults: state.loadingNoResults,
            rankedRoutes: state.rankedRoutes,
            loadingRankedRoutes:state.loadingRankedRoutes,
            getHeatmapFromData,
            getRankingRoutes,
            getRanking,
            getHeatmapToData,
            getTimeRequests,
            getTimeCalendar,
            getGeneralData,
            getNoResults

        }}>
            {props.children}
        </DashboardDataContext.Provider>
    )

}

export default DashboardDataState