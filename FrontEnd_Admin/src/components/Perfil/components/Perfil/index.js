import { useEffect } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { useForm } from "react-hook-form";
import styles from "./styles.module.scss";
import Qrcode from "../../../QrcodeCreate";


export const Perfil = ({ user = { email: "" } }) => {
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    // reset form with user data
    reset(user);
}, [user]);

const updateUser = (user) => {
  let jsonData = {
    ...user,
    };

  fetch(`/users/${user._id}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(jsonData),
  })
    .then((response) => {
      if (response.ok) {
        alert("Perfil atualizado com sucesso!");
        window.location.reload();
      } else {
        alert("Erro!");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

  return (
    <Container>
      <Row>
        <Col className={styles.column}>
          <h3>Perfil</h3>
          <div className={styles.container}>
            <form
              className={styles.form}
              onSubmit={handleSubmit((updateUser))}>
            
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
                  Age :
                </label>
                <input
                  id="age"
                  name="age"
                  type="number"
                  {...register("age")}
                />
              </div>
              <Row>
                <Button className="submit" type="submit">Editar</Button>
              </Row>
            </form>
          </div>
        </Col>
        <Col>
          <div className={styles.qrCodeContainer}>
            <h2>Qr Code to Login</h2>
            <Qrcode user={user}/>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
