import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import QRCode from "../../components/QRcodeLogin/index";
import "./login.scss";


const Login = () => {
    return (<div className="home">
        <Sidebar/>
     
        <div className="homeContainer">
            <Navbar/>
            <QRCode/>
        </div>
    </div>);
};



export default Login