import React, { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.heat";
import { useMap } from 'react-leaflet'
import {CircularProgress} from "@mui/material";





export default function Map(props) {
    console.log(props);
    const {heatMap, loading,mapId} = props

    useEffect(() => {
        var container = L.DomUtil.get(mapId);

        if (container != null) {
            container._leaflet_id = null;
        }

        var map = L.map(mapId).setView([-37.87, 175.475], 12);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        const points = heatMap
            ? heatMap.map((p) => {
                return [p[1], p[0]];
            })
            : [];


        L.heatLayer(points).addTo(map);
    }, []);

    return (
        (loading)? <CircularProgress></CircularProgress>:
        <div id={mapId} style={{ height: "100vh" }}></div>

    );
}




//
//     const HeatMapComponent = (props) => {
//         console.log(props);
//         const {loading, heatMap} = props;
//
//         useEffect(() => {
//             if (container != null) {
//                 container._leaflet_id = null;
//             }
//
//             var map = L.map("map").setView([-37.87, 175.475], 12);
//
//             L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//                 attribution:
//                     '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//             }).addTo(map);
//
//             const points = addressPoints
//                 ? addressPoints.map((p) => {
//                     return [p[0], p[1]];
//                 })
//                 : [];
//
//             L.heatLayer(points).addTo(map);
//         }, []);
//         return (
//             (loading) ? <CircularProgress></CircularProgress>
//                 :
//                 <div id="map" style={{height: "100vh"}}></div>
//         );
//
//
//
// }
//
//
// export default HeatMapComponent;

