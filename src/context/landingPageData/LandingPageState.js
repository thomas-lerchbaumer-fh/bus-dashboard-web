import React, {useCallback, useMemo, useReducer} from "react";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import landingPageReducer from "./landingPageReducer";
import {
    GET_ALL_SEARCH_REQUESTS,
    DATA_FETCH_ERROR

} from "../types";
import LandingPageContext from "./landingPageContext";



const LandingPageState = props => {
    const initialState = {
        loadingLanding: true,
        searchRequests: [],
        error: false,

    }

    const [state, dispatch] = useReducer(landingPageReducer, initialState)

    const getSearchRequests = useCallback(async (params) => {
        setAuthToken(localStorage.token);
        try {
            const res = await axios.post('/data/getAllSearchRequests')
            dispatch({
                type: GET_ALL_SEARCH_REQUESTS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: DATA_FETCH_ERROR,
            });
        }
    }, [dispatch]);


    return (
        <LandingPageContext.Provider value={{
            loadingLanding: state.loadingLanding,
            searchRequests: state.searchRequests,
            getSearchRequests
        }}>
            {props.children}
        </LandingPageContext.Provider>
    )

}

export default LandingPageState