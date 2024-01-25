import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import Users from "./components/Registo";
import Registo from "./pages/Registo/Registo";
import Acessos from "./pages/Acessos/Acessos";
import Utilizadores from "./pages/Users/Users";
import Logout from "./pages/Logout/Logout";
import Aulas from "./pages/Aulas/Aulas";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {TabProvider} from "./components/contexts/UsersProvider";
import {DarkModeContext} from "./context/darkModeContext";
import Pagamentos from "./pages/Pagamentos/Pagamentos";
import "./style/dark.scss";
import Perfil from "./pages/Perfil/Perfil";
import ProtectedRouteAdmin from "./components/ProtectedRouteAdmin";
import AulasCreat from "./pages/AulasCreate/Aulas";
import React, {useContext, useEffect, useState} from "react";
import ProtectedRouteAdminGestor from "./components/ProtectedRouteAdminGestor";
import ProtectedRouteAdminGestorTrainer from "./components/ProtectedRouteAdminGestorTrainer";
import ProtectedRouteAdminGestorTrainerVIP from "./components/ProtectedRouteAdminGestorTrainerVIP";
import ProtectedRouteAdminGestorTrainerVIPMember from "./components/ProtectedRouteAdminGestorTrainerVIP copy";

function App() {
    const [isLoadingUser, setIsLoadingUser] = useState(true);
    const [user, setUser] = useState([]);

    useEffect(() => {
        fetch("auth/who", {
            headers: {
                Accept: "application/json"
            }
        }).then((response) => response.json()).then((response) => {
            setUser(response);
            setIsLoadingUser(false);
        });
        return() => setUser([]);

    }, []);
    const {darkMode} = useContext(DarkModeContext);

    return (
        <div className={
            darkMode ? "app dark" : "app"
        }>

            <BrowserRouter>

                <Routes>
                    <Route path="/">
                        <Route index
                            element={<Home/>}/>

                        <Route path="login"
                            element={<Login/>}/>

                        <Route path="users">
                            <Route index
                                element={
                                    <ProtectedRouteAdminGestor><Utilizadores/></ProtectedRouteAdminGestor>
                                }/>
                        </Route>


                        <Route path="pagamentos">
                            <Route index
                                element={
                                    <ProtectedRouteAdminGestor><Pagamentos/></ProtectedRouteAdminGestor>
                                }/>
                        </Route>
                        <Route path="acessos">
                            <Route index
                                element={
                                    <ProtectedRouteAdminGestor><Acessos/></ProtectedRouteAdminGestor>
                                }/>
                        </Route>
                        <Route path="registo">
                            <Route index
                                element={<Registo/>}/>
                        </Route>
                        <Route path="logout">
                            <Route index
                                element={<Logout/>}/>
                        </Route>
                        <Route path="perfil">
                            <Route index
                                element={<Perfil/>}/>
                        </Route>
                        <Route path="teste_1">
                            <Route index
                                element={<List/>}/>
                        </Route>
                        <Route path="aulas/create">
                            <Route index
                                element={<ProtectedRouteAdminGestor><AulasCreat/></ProtectedRouteAdminGestor>}/>
                        </Route>

                        <Route path="aulas">
                            <Route index
                                element={
                                    <ProtectedRouteAdminGestor><Aulas/></ProtectedRouteAdminGestor>
                                }/> {/* <Route path=":productId"
                                element={<Users/>}/> */} </Route>
                    </Route>
                </Routes>

            </BrowserRouter>
        </div>
    );
}

export default App;
