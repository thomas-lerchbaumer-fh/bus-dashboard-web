import {
    GET_HEATMAP_FROM_DATA,
    GET_HEATMAP_TO_DATA,
    GET_DEPARTURE_RANKING,
    GET_DESTINATION_RANKING, GET_TIME_REQUESTS, GET_TIME_CALENDAR, GET_GENERAL_DATA, GET_NO_RESULTS, GET_RANKING_ROUTES
} from "../types";


export default (state,action)=>{
    switch (action.type){
        case GET_HEATMAP_FROM_DATA:
            return{
                ...state,
                heatmapFromData: action.payload,
                loadingFrom:false
            }
        case GET_DEPARTURE_RANKING:
            return {
             ...state,
                departureReq: action.payload,
                loadingRanking:false
            }
        case GET_DESTINATION_RANKING:
            return{
                ...state,
                destinationReq: action.payload,
                loadingRankingDest:false
            }
        case GET_HEATMAP_TO_DATA:
            return{
                ...state,
                heatMapToData: action.payload,
                loadingTo:false
            }
        case GET_TIME_REQUESTS:
            return{
                ...state,
                timeReq: action.payload,
                loadingTimeReq:false
            }
        case GET_TIME_CALENDAR:
            return{
                ...state,
                timeCalendar: action.payload,
                loadingTimeCalendar: false
            }
        case GET_GENERAL_DATA:
            return{
                ...state,
                generalData: action.payload,
                loadingGeneralData: false
            }
        case GET_NO_RESULTS:
            return{
                ...state,
                noResultsForRequest: action.payload,
                loadingNoResults: false,
            }
        case GET_RANKING_ROUTES:
            return{
                ...state,
                rankedRoutes: action.payload,
                loadingRankedRoutes: false
            }
    }


}