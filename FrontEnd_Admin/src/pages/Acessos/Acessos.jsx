import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Acesso from "../../components/Acessos";
import "./acessos.scss";


const Acessos = () => {
    return (
        <div className="home">
            <Sidebar/>

            <div className="homeContainer">
                <Navbar/>
                <Acesso></Acesso>
                Acessos
            </div>
        </div>
    );
};

export default Acessos
