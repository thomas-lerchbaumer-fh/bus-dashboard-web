import logo from './logo.svg';
import './App.css';
import Menu from './components/navigation/Menu';
import Login from './components/login/Login';
import setAuthToken from './utils/setAuthToken';
import {BrowserRouter, BrowserRouter as Router, Route, Routes} from 'react-router-dom';


//import pages below
import Home from './components/pages/Home'
//import states below
import AuthState from './context/auth/AuthState';
import Container from "@mui/material/Container";
import AlertInfo from "./components/layout/AlertInfo";
import AlertState from "./context/alert/AlertState";
import {Alert} from "@mui/material";
import PrivateRoute from "./components/routing/PrivateRoute";
import AvailableRoutes from "./components/routing/AvailableRoutes";
import DashboardDataState from "./context/dashboardData/DashboardDataState";


function App() {
    return (
        <div className="App">
            <AuthState>
                <DashboardDataState>
                <AlertState>
                    <BrowserRouter>
                    <Menu><AvailableRoutes></AvailableRoutes></Menu>

                    </BrowserRouter>
                </AlertState>
                </DashboardDataState>
            </AuthState>
        </div>
    );
}

export default App;
