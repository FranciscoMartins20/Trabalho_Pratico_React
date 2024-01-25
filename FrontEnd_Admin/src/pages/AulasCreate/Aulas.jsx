import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./aulas.scss";
import AulasCreate from "../../components/AulasCreate";


const AulasCreat = () => {
    return (<div className="home">
        <Sidebar/>
     
        <div className="homeContainer">
            <Navbar/>
          <AulasCreate/>
        </div>
    </div>);
};



export default AulasCreat