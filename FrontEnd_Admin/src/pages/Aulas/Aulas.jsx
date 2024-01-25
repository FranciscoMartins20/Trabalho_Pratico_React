import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./aulas.scss";
import AulasPage from "../../components/Aulas";


const Aulas = () => {
    return (<div className="home">
        <Sidebar/>
     
        <div className="homeContainer">
            <Navbar/>
          <AulasPage/>
        </div>
    </div>);
};



export default Aulas