import React, {useCallback, useReducer} from 'react'
import customerGroupDataReducer from "./customerGroupDataReducer";
import setAuthToken from "../../utils/setAuthToken";
import {DATA_FETCH_ERROR, GET_FILTERED_CUSTOMER_DATA, GET_USER_GROUPS} from "../types";
import axios from "axios";
import CustomerGroupDataContext from "./customerGroupDataContext";

const CustomerGroupDataState = props => {
    const initialState = {
        loadingGroups: true,
        groups: [],
        loadingData: true,
        groupData: [],
    }

    const [state, dispatch] = useReducer(customerGroupDataReducer, initialState)

    const getCustomerGroups = useCallback(async (params) => {
        setAuthToken(localStorage.token);
        try {
            const res = await axios.post('/data/getCustomerGroups');
            console.log(res);
            dispatch({
                type: GET_USER_GROUPS,
                payload: res.data
            })
        } catch (e) {
            dispatch({
                type: DATA_FETCH_ERROR
            })
        }
    }, [dispatch])


    const getFilteredData = useCallback(async (params)=>{
        setAuthToken(localStorage.token)
        const headers = {
            'Content-Type': 'application/json'
        }

        try{

            const res = await axios.post('/data/getFilteredCustomerGroup',params,{
                headers:headers
            });
            console.log(res);
            dispatch({
                type:GET_FILTERED_CUSTOMER_DATA,
                payload: res.data[0]
            })


        }catch (e){

        }

    })

    return (
        <CustomerGroupDataContext.Provider value={{
            loadingGroups: state.loadingGroups,
            groups: state.groups,
            loadingData: state.loadingData,
            groupData: state.groupData,
            getFilteredData,
            getCustomerGroups
        }}>
            {props.children}
        </CustomerGroupDataContext.Provider>
    )


}


export default CustomerGroupDataState

