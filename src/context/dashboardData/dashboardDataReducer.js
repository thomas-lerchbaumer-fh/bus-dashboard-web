import {
    GET_HEATMAP_FROM_DATA,
    GET_HEATMAP_TO_DATA,
    GET_DEPARTURE_RANKING,
    GET_DESTINATION_RANKING
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
    }


}