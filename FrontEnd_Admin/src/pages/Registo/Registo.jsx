import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Users from "../../components/Registo";
import "./registo.scss";


const Registo = () => {
    return (
        <div className="home">
            <Sidebar/>

            <div className="homeContainer">
                <Navbar/>
                    <Users></Users>
                </div>
            </div>
    );
};


export default Registo
