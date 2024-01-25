import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import React, { useState } from "react";


const Home = () => {
    const [isESTG, setESTG] = useState(false);

    const handleESTGChange = (event) => {
        setESTG(event.target.checked);
    }
    return (<div className="home">
        <Sidebar/>
     
        <div className="homeContainer">
            <Navbar/>
            <div className="pricing-table">
            <h2>Tabela de Preços</h2>
            <label>
                <input
                    type="checkbox"
                    checked={isESTG}
                    onChange={handleESTGChange}
                />
                Pertenço à ESTG
            </label>
            <table>
                <thead>
                    <tr>
                        <th>Tipo de Utilizador</th>
                        <th>Preço (€/mês)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Membro</td>
                        <td>{isESTG ? 17.5 : 35}</td>
                    </tr>
                    <tr>
                        <td>VIP</td>
                        <td>{isESTG ? 22.5 : 45}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        </div>
    </div>);
};

export default Home;
