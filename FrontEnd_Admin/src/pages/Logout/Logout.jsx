import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Log from "../../components/Logout";
import "./logout.scss";


const Logout = () => {
    return (<div className="home">
        <Sidebar/>
     
        <div className="homeContainer">
            <Navbar/>
            <Log></Log>
            
        </div>
    </div>);
};

export default Logout;
