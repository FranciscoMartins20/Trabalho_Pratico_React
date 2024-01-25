import React, { useContext, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import Table from "../Table";
import { useForm } from "react-hook-form";
import styles from "./styles.module.scss";
import { useGetData } from "../Hooks/useGetData";
import { UsersContext } from "../contexts/UsersProvider/UsersContext";
import { usePostData } from "../Hooks/usePostData";


const Users = () => {
  const { register, handleSubmit } = useForm();
  const { setUsers } = useContext(UsersContext);
  const { isError, isLoading, data } = useGetData("users", 0, 0);
  const { isLoading: isLoadingPost, addData } = usePostData("auth/register");
  

  const addUser = (data) => {
    const newData = {
      ...data,
      role: { name: 'user', scope: "notmember" },
    };

    addData(newData);
  }

  useEffect(() => {
    setUsers(data.data);
  },[data, setUsers]) 

  if(isLoading) {
    return <div>Is Loading</div>
  }

  if(isError) {
    return <div>Error</div>
  }

  return (
    <Container>
     
        <Col className={styles.column}>
          <h3>Registo</h3>
          <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit(addUser)}>
              <div className={styles.field}>
                <label className={styles.label} for="name">
                  Name:
                </label>
                <input
                  id="name"
                  type="name"
                  name="name"
                  required="required"
                  {...register("name")}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} for="password">
                  Password:
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  required="required"
                  {...register("password")}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} for="email">
                  Email:
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required="required"
                  {...register("email")}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} for="age">
                  Age:
                </label>
                <input id="age" name="age" type="number" {...register("age")} />
              </div>
              <div className={styles.field}>
            
    
              </div>
              <Row>
                <button className="submit" type="submit">Registar</button>
              </Row>
            </form>
          </div>
        </Col>
        
     
    </Container>
  );
  
};

export default Users;
