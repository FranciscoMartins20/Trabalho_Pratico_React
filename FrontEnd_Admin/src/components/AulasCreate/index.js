import React, {useContext, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {usePostData} from "../Hooks/usePostData";
import {Button} from 'reactstrap';
import styles from "./styles.module.scss";
import {
    Row,
    Container,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
    Col
} from "reactstrap";


const AulasCreate = () => {

    const {register, handleSubmit} = useForm();

    const {isLoading: isLoadingPost, addData} = usePostData("aulas/create");
    const [isLoadingUser, setIsLoadingUser] = useState(true);
    const [user, setUser] = useState([]);

    useEffect(() => {
        fetch("/auth/who", {
          headers: { Accept: "application/json" },
        })
          .then((response) => response.json())
          .then((response) => {
            setUser(response);
            setIsLoadingUser(false);
          });
        return () => setUser([]);
        
      }, []);
    


    return (<Container>
    <Row>
        <Col className={styles.column}>
            <h3>Create Aula</h3>
            {isLoadingPost ? <div>is Loading</div> : (
                <div className={styles.container}>
                    <form className={styles.form} onSubmit={handleSubmit(addData)}>
                        <div className={styles.field}>
                            <label className={styles.label} for="Trainer">Trainer:</label>
                            <input id="Trainer" name="Trainer" required="required" {...register("Trainer")}/>
                        </div>
                        <div className={styles.field}>
                            <label className={styles.label} for="hora_inicio">Hora Inicio:</label>
                            <input id="hora_inicio" type="datetime-local" name="hora_inicio" required="required" {...register("hora_inicio")}/>
                        </div>
                        <div className={styles.field}>
                            <label className={styles.label} for="hora_fim">Hora Fim:</label>
                            <input id="hora_fim" type="datetime-local" name="hora_fim" required="required" {...register("hora_fim")}/>
                        </div>
                        <div className={styles.field}>
                            <label className={styles.label} for="tipo_aula">Tipo Aula:</label>
                            <input id="tipo_aula" name="tipo_aula" required="required" {...register("tipo_aula")}/>
                        </div>
                        <div className={styles.field}>
                                <label className={styles.label} for="photo">Foto:</label>
                                <input id="photo" name="photo"  {...register("photo")}/>
                            </div>
                            <Row>
                                <input className={styles.submit} type="submit"/>
                            </Row>
                        </form>
                    </div>
                )}
            </Col>
        </Row>
    </Container>);
};
export default AulasCreate;
