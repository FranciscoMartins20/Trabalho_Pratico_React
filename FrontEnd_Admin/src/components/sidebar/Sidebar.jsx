import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import React, { useContext, useEffect, useState } from "react";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import {Link} from "react-router-dom";
import {DarkModeContext} from "../../context/darkModeContext";

const Sidebar = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoadingUser, setIsLoadingUser] = useState(true);
    const [user, setUser] = useState([]);
    const {dispatch} = useContext(DarkModeContext);

    useEffect(() => {
        fetch("/auth/who", {
          headers: { Accept: "application/json" },
        })
          .then((response) => response.json())
          .then((response) => {
            setUser(response);
            if (response && response.email) {
                setIsLoggedIn(true);
              } else {
                setIsLoggedIn(false);
              }
              setIsLoadingUser(false);
            });
        return () => setUser([]);
        
      }, []);
      if(user.role == "admin") {
    return (
        <div className="sidebar">
            <div className="top">
                <Link to="/"
                    style={
                        {textDecoration: "none"}
                }>
                    <span className="logo">GYM ESTG</span>
                </Link>
            </div>
            <hr/>
            <div className="center">
                <ul>
                    <p className="title">MAIN</p>
                    <li>
                        <Link to="/"
                            style={
                                {textDecoration: "none"}
                        }>
                            <DashboardIcon className="icon"/>
                            <span>Página Principal</span>
                        </Link>
                    </li>
                    <p className="title">GINÁSIO</p>
                    <Link to="/users"
                        style={
                            {textDecoration: "none"}
                    }>
                        <li>
                            <PersonOutlineIcon className="icon"/>
                            <span>Utilizadores</span>
                        </li>
                    </Link>
                    <Link to="/aulas"
                        style={
                            {textDecoration: "none"}
                    }>
                        <li>
                            <StoreIcon className="icon"/>
                            <span>Aulas</span>
                        </li>
                    </Link>
                    <Link to="/aulas/create"
                        style={
                            {textDecoration: "none"}
                    }>
                        <li>
                            <StoreIcon className="icon"/>
                            <span>Criar Aulas</span>
                        </li>
                    </Link>
                    <Link to="/pagamentos"
                        style={
                            {textDecoration: "none"}
                    }>
                        <li>
                            <CreditCardIcon className="icon"/>
                            <span>Pagamentos</span>
                        </li>
                    </Link>
                    <Link to="/acessos"
                        style={
                            {textDecoration: "none"}
                    }>
                       
                        <li>
                            <CreditCardIcon className="icon"/>
                            <span>Lista de acessos</span>
                        </li>
                    </Link>
                  
                    <p className="title">USER</p>
                    <Link to="/perfil"
                        style={
                            {textDecoration: "none"}
                    }>
                        <li>
                            <AccountCircleOutlinedIcon className="icon"/>
                            <span>Perfil</span>
                        </li>
                    </Link>
                    <Link to="/logout"
                        style={
                            {textDecoration: "none"}
                    }>
                        <li>
                            <ExitToAppIcon className="icon"/>
                            <span>Logout</span>
                        </li>
                    </Link>
                    <p className="title">Testes</p>
                    <Link to="/teste_1"
                        style={
                            {textDecoration: "none"}
                    }>
                        <li>
                            <AccountCircleOutlinedIcon className="icon"/>
                            <span>Teste</span>
                        </li>
                    </Link>
                </ul>
            </div>

            <div className="bottom">
                <div className="colorOption"
                    onClick={
                        () => dispatch({type: "LIGHT"})
                }></div>
                <div className="colorOption"
                    onClick={
                        () => dispatch({type: "DARK"})
                }></div>
            </div>
        </div>
    );
}
if(user.role == "gestor") {
    return (
        <div className="sidebar">
            <div className="top">
                <Link to="/"
                    style={
                        {textDecoration: "none"}
                }>
                    <span className="logo">GYM ESTG</span>
                </Link>
            </div>
            <hr/>
            <div className="center">
                <ul>
                    <p className="title">MAIN</p>
                    <li>
                        <Link to="/"
                            style={
                                {textDecoration: "none"}
                        }>
                            <DashboardIcon className="icon"/>
                            <span>Página Principal</span>
                        </Link>
                    </li>
                    <p className="title">GINÁSIO</p>
                    <Link to="/users"
                        style={
                            {textDecoration: "none"}
                    }>
                        <li>
                            <PersonOutlineIcon className="icon"/>
                            <span>Utilizadores</span>
                        </li>
                    </Link>
                    <Link to="/aulas"
                        style={
                            {textDecoration: "none"}
                    }>
                        <li>
                            <StoreIcon className="icon"/>
                            <span>Aulas</span>
                        </li>
                    </Link>
                    <Link to="/pagamentos"
                        style={
                            {textDecoration: "none"}
                    }>
                        <li>
                            <CreditCardIcon className="icon"/>
                            <span>Pagamentos</span>
                        </li>
                    </Link>
                    <p className="title">USER</p>
                    <Link to="/perfil"
                        style={
                            {textDecoration: "none"}
                    }>
                        <li>
                            <AccountCircleOutlinedIcon className="icon"/>
                            <span>Perfil</span>
                        </li>
                    </Link>
                    <Link to="/logout"
                        style={
                            {textDecoration: "none"}
                    }>
                        <li>
                            <ExitToAppIcon className="icon"/>
                            <span>Logout</span>
                        </li>
                    </Link>
                
                </ul>
            </div>

            <div className="bottom">
                <div className="colorOption"
                    onClick={
                        () => dispatch({type: "LIGHT"})
                }></div>
                <div className="colorOption"
                    onClick={
                        () => dispatch({type: "DARK"})
                }></div>
            </div>
        </div>
    );
}
if(user.role == "trainer") {
    return (
        <div className="sidebar">
            <div className="top">
                <Link to="/"
                    style={
                        {textDecoration: "none"}
                }>
                    <span className="logo">GYM ESTG</span>
                </Link>
            </div>
            <hr/>
            <div className="center">
                <ul>
                    <p className="title">MAIN</p>
                    <li>
                        <Link to="/"
                            style={
                                {textDecoration: "none"}
                        }>
                            <DashboardIcon className="icon"/>
                            <span>Página Principal</span>
                        </Link>
                    </li>
                    <p className="title">GINÁSIO</p>
                    <Link to="/aulas"
                        style={
                            {textDecoration: "none"}
                    }>
                        <li>
                            <StoreIcon className="icon"/>
                            <span>Aulas</span>
                        </li>
                    </Link>
                    
                    
                    <p className="title">USER</p>
                    <Link to="/perfil"
                        style={
                            {textDecoration: "none"}
                    }>
                        <li>
                            <AccountCircleOutlinedIcon className="icon"/>
                            <span>Perfil</span>
                        </li>
                    </Link>
                    <Link to="/logout"
                        style={
                            {textDecoration: "none"}
                    }>
                        <li>
                            <ExitToAppIcon className="icon"/>
                            <span>Logout</span>
                        </li>
                    </Link>
                    <p className="title">Testes</p>
                    <Link to="/teste_1"
                        style={
                            {textDecoration: "none"}
                    }>
                        <li>
                            <AccountCircleOutlinedIcon className="icon"/>
                            <span>Teste</span>
                        </li>
                    </Link>
                </ul>
            </div>

            <div className="bottom">
                <div className="colorOption"
                    onClick={
                        () => dispatch({type: "LIGHT"})
                }></div>
                <div className="colorOption"
                    onClick={
                        () => dispatch({type: "DARK"})
                }></div>
            </div>
        </div>
    );
}
if(user.role == "member" || user.role == "membervip") {
    return (
        <div className="sidebar">
            <div className="top">
                <Link to="/"
                    style={
                        {textDecoration: "none"}
                }>
                    <span className="logo">GYM ESTG</span>
                </Link>
            </div>
            <hr/>
            <div className="center">
                <ul>
                    <p className="title">MAIN</p>
                    <li>
                        <Link to="/"
                            style={
                                {textDecoration: "none"}
                        }>
                            <DashboardIcon className="icon"/>
                            <span>Página Principal</span>
                        </Link>
                    </li>
                    <p className="title">GINÁSIO</p>
        
                    <Link to="/aulas"
                        style={
                            {textDecoration: "none"}
                    }>
                        <li>
                            <StoreIcon className="icon"/>
                            <span>Aulas</span>
                        </li>
                    </Link>
                  
                    
                    <p className="title">USER</p>
                    <Link to="/perfil"
                        style={
                            {textDecoration: "none"}
                    }>
                        <li>
                            <AccountCircleOutlinedIcon className="icon"/>
                            <span>Perfil</span>
                        </li>
                    </Link>
                    <Link to="/logout"
                        style={
                            {textDecoration: "none"}
                    }>
                        <li>
                            <ExitToAppIcon className="icon"/>
                            <span>Logout</span>
                        </li>
                    </Link>
                
                </ul>
            </div>

            <div className="bottom">
                <div className="colorOption"
                    onClick={
                        () => dispatch({type: "LIGHT"})
                }></div>
                <div className="colorOption"
                    onClick={
                        () => dispatch({type: "DARK"})
                }></div>
            </div>
        </div>
    );
    
}
if(user.role == "notmember") {
    return (
      
            <div className="sidebar">
                <div className="top">
                    <Link to="/"
                        style={
                            {textDecoration: "none"}
                    }>
                        <span className="logo">GYM ESTG</span>
                    </Link>
                </div>
                <hr/>
                <div className="center">
                    <ul>
                        <p className="title">MAIN</p>
                        <li>
                            <Link to="/"
                                style={
                                    {textDecoration: "none"}
                            }>
                                <DashboardIcon className="icon"/>
                                <span>Página Principal</span>
                            </Link>
                        </li>
                        <p className="title">GINÁSIO</p>
            
                        <Link to="/aulas"
                            style={
                                {textDecoration: "none"}
                        }>
                            <li>
                                <StoreIcon className="icon"/>
                                <span>Aulas</span>
                            </li>
                        </Link>
                      
                        
                        <p className="title">USER</p>
                        <Link to="/perfil"
                            style={
                                {textDecoration: "none"}
                        }>
                            <li>
                                <AccountCircleOutlinedIcon className="icon"/>
                                <span>Perfil</span>
                            </li>
                        </Link>
                        <Link to="/logout"
                            style={
                                {textDecoration: "none"}
                        }>
                            <li>
                                <ExitToAppIcon className="icon"/>
                                <span>Logout</span>
                            </li>
                        </Link>
                    
                    </ul>
                </div>
    
                <div className="bottom">
                    <div className="colorOption"
                        onClick={
                            () => dispatch({type: "LIGHT"})
                    }></div>
                    <div className="colorOption"
                        onClick={
                            () => dispatch({type: "DARK"})
                    }></div>
                </div>
            </div>
        );
}
else{
    
        return (
            <div className="sidebar">
                <div className="top">
                    <Link to="/"
                        style={
                            {textDecoration: "none"}
                    }>
                        <span className="logo">GYM ESTG</span>
                    </Link>
                </div>
                <hr/>
                <div className="center">
                    <ul>
                        <p className="title">MAIN</p>
                        <li>
                            <Link to="/"
                                style={
                                    {textDecoration: "none"}
                            }>
                                <DashboardIcon className="icon"/>
                                <span>Página Principal</span>
                            </Link>
                        </li>
                        
                        {!isLoggedIn && (
          <Link to="/registo" style={{ textDecoration: "none" }}>
            <li>
              <AccountCircleOutlinedIcon className="icon" />
              <span>Registo</span>
            </li>
          </Link>
        )}
        {!isLoggedIn && (
          <Link to="/login" style={{ textDecoration: "none" }}>
            <li>
              <AccountCircleOutlinedIcon className="icon" />
              <span>Login</span>
            </li>
          </Link>
        )}
        {isLoggedIn && (
          <Link to="/perfil" style={{ textDecoration: "none" }}>
            <li>
              <AccountCircleOutlinedIcon className="icon" />
              <span>Perfil</span>
            </li>
          </Link>
        )}
                       
                    </ul>
                </div>
    
                <div className="bottom">
                    <div className="colorOption"
                        onClick={
                            () => dispatch({type: "LIGHT"})
                    }></div>
                    <div className="colorOption"
                        onClick={
                            () => dispatch({type: "DARK"})
                    }></div>
                </div>
            </div>
        );
    };

}

export default Sidebar;
