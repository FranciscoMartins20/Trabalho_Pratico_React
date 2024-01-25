import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import UsersAdmin from "../../components/Users/index";
import "./users.scss";


const Users = () => {
    return (<div className="home">
        <Sidebar/>
     
        <div className="homeContainer">
            <Navbar/>
            <UsersAdmin></UsersAdmin>
        </div>
    </div>);
};



export default Users