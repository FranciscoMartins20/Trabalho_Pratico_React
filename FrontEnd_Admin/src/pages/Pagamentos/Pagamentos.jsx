import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./pagamentos.scss";


const Pagamentos = () => {
    return (<div className="home">
        <Sidebar/>
     
        <div className="homeContainer">
            <Navbar/>
            Pagamentos
        </div>
    </div>);
};



export default Pagamentos