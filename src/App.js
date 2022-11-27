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


function App() {
    return (
        <div className="App">
            <AuthState>
                <AlertState>
                    <Menu></Menu>
                    <BrowserRouter>
                        <Container sx={{maxWidth: '80%'}}>
                            <AlertInfo></AlertInfo>
                            <Routes>
                                <Route
                                    path="/"
                                    element={
                                        <PrivateRoute>
                                            <Home />
                                        </PrivateRoute>
                                    }
                                />
                                <Route exact path='/login' element={<Login/>}></Route>
                            </Routes>
                        </Container>
                    </BrowserRouter>
                </AlertState>
            </AuthState>
        </div>
    );
}

export default App;
