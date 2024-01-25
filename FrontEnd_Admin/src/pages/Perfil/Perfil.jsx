import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import UserPage from "../../components/Perfil/index"

import "./perfil.scss";


const Perfil = () => {
    return (<div className="home">
        <Sidebar/>
     
        <div className="homeContainer">
            <Navbar/>
           <UserPage/>
        </div>
    </div>);
};



export default Perfil