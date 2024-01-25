import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Container, Row, Col, Button } from "reactstrap";
import styles from "./styles.module.scss";
import { CameraMedia } from "../../../CameraMedia";
import { usePostData } from "../../../Hooks/usePostData";
import { useGetMember } from "../../../Hooks/useGetMember";
//Criar membros listar
export const Member = ({ user }) => {
  const localhost = "http://127.0.0.1:5000";
  const [showForm, setShowForm] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const { isLoading: isLoadingPost, addData } = usePostData(
    `users/${user._id}/member`
  );
  const { member } = useGetMember(user._id);

  const { register, handleSubmit, reset } = useForm();
  const isMember = user.role ? user.role.scope.includes("member") : false;

  const isNotMember = (user) => {
     return user.role && user.role.scope === "notmember";
  };
  const addMember = (data) => {
    const body = {
      ...data,
      base64image: imageSrc,
      
    };

    addData(body);
  };
  

  useEffect(() => {
    if (isMember) {
      // reset form with user data
      reset(member);
    }

  }, [member, isMember, reset]);

  if (!showForm && !isMember) {

    return <Button className={styles.button} onClick={() => setShowForm(!showForm)}>Be a Member</Button>
    
    
    // return isNotMember(user) ? (
    //   <Button className={styles.button} onClick={() => setShowForm(!showForm)}>Be a Member</Button>
    // ) : null;
    
  }

  return (
    <Container>
      <Row>
        <Col className={styles.column}>
          <h3>Member Perfil</h3>
          <div className={styles.container}>
          
            {!isMember && (
              <form className={styles.form} onSubmit={handleSubmit(addMember)}>
                <div className={styles.field}>
                  <label className={styles.label} for="taxNumber">
                   NIF:
                  </label>
                  <input
                    id="taxNumber"
                    type="name"
                    name="taxNumber"
                    required="required"
                    {...register("taxNumber")}
                  />
                </div>
                <CameraMedia setImage={setImageSrc} imageFile={imageSrc} />
                <Row>
                  <input className="submit" type="submit" />
                </Row>
              </form>
            )}
            {isMember && (
              <>
                <div className={styles.field}>
                  <label className={styles.label} for="taxNumber">
                    NIF:
                  </label>
                  <span>{user.taxNumber}</span>
                </div>
                <div className={styles.field}>
                  <label className={styles.label} for="taxNumber">
                    Photo:
                  </label>
                  <img alt="" src={`${localhost}/${user.photo}`} />
                </div>
              </>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};
