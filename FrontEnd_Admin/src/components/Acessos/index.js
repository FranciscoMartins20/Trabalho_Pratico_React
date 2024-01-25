import _ from "lodash";
import React, {useState, useEffect} from "react";
import {QrReader} from "react-qr-reader";
import {useSearchParams} from "react-router-dom";
import styles from "./styles.module.scss";

function Acesso({setDataAcesso}) {
    const [data, setData] = useState("No result");
    const [parametros, setParametros] = useSearchParams();
    const [acesso, setAcesso] = useState(" ");

    const login = (data) => {

        let local = "";
        console.log(parametros.get("local"))

        fetch("/users/acessAutorize", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(data)
        }).then((r) => r.json()).then((response) => {
            console.log(response);
            setAcesso(response);
        }).catch((error) => {
            console.error("Error:", error);
        });

    };

    useEffect(() => {
        if (!_.isEmpty(data)) {
            login(data);
        }
    }, [data])

    useEffect(() => {
        if (!_.isEmpty(acesso)) {
            alert("Acesso Concedido")
        } else {
            alert("Acesso Negado")
        }
    }, [acesso])


    return (
        <div className={
            styles.qrCodeReader
        }>
            <QrReader constraints={
                    {facingMode: 'user'}
                }
                onResult={
                    (result, error) => {
                        if (!_.isNil(result)) {
                            const newResult = result.text.split("&&");
                            const data = {
                                email: newResult[0],
                                password: newResult[1],
                                isQrCode: true,
                                local: parametros.get("local")
                            }
                            setData(data);
                            setDataAcesso(data);
                        }
                        if (!!error) { // console.info(error);
                        }
                    }
                }/>
            <p>{
                data.email
            }</p>
        </div>
    );
}
export default Acesso;
