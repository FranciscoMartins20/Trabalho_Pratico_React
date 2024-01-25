import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import styles from "./styles.module.scss";
import { useGetData } from "../Hooks/useGetData";
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
const AulasPage = () => {
  
 
  const { isError, isLoading, data } = useGetData("aulas", 0, 0)
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [user, setUser] = useState([]);
  const [presenca, setPresenca] = useState([]);
  const [subscribedClasses, setSubscribedClasses] = useState([]);

  const [isLoadingPresenca, setIsLoadingPresenca] = useState(true);
  

  
  useEffect(() => {
    fetch("auth/who", {
      headers: { Accept: "application/json" },
    })
      .then((response) => response.json())
      .then((response) => {
        setUser(response);
        setIsLoadingUser(false);
      });
    return () => setUser([]);
    
  }, []);

  useEffect(() => {
    fetch("presenca", {
      method: "GET",
      headers: {
        Accept: "application/json"
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setPresenca(response.data);
        setIsLoadingPresenca(false);
      });
    return () => setPresenca([]);
    
  }, []);


  


  const handleInscrever = (aulaId, userId) => {
    const payload = {
      Aula: aulaId,
      Aluno: userId,
        
    };
    setSubscribedClasses([...subscribedClasses, aulaId]);
    fetch("/presenca", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    })
    .then((response) => response.json())
        .then((response) => {
            if (response) {
                presenca.push(response.presenca);
                setPresenca([...presenca]);
            } else {
                alert("Error ao adicionar");
            }
        })
        .catch((error) => {
            console.error("Error", error);
            alert(error);
        });
};

  const handleDesinscrever = (aulaId, userId) => {

    const id = presenca.find(f => f.Aluno === userId && f.Aula ===aulaId)._id;
    

    fetch(`/presenca/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
     
      .then((response) => {
        if (response.ok) {
          var removeIndex = presenca.map(item => item._id).indexOf(id);
          presenca.splice(removeIndex, 1);
          setPresenca([...presenca]);
        } else {
          alert("Error ao desmarcar");
        }
      })
      .catch((error) => {
        console.error("Error", error);
        alert(error);
      });
  };
  

  console.log(user);
  if(isLoading) {
    console.log(data)
    return <div>Is Loading</div>
  }

  if(isError) {
    console.log(data)
    return <div>UPPSSSS</div>
  }
  if (isLoadingUser) {
    return <div>Loading user data...</div>
}


  
if(user.role == "admin" || user.role == "gestor" || user.role == "trainer") {
  
  return (
<>
   
    <Container>
      <br />
      <div className={styles.treinos}>
        {data.data.map((item) => {
          const isInscrito = presenca && presenca.some(f => f.Aluno === user.id && f.Aula === item._id);
          var dateInicio = new Date(item.hora_inicio);
        var dateFim = new Date(item.hora_fim);
          return (
            <div className={`${styles.box} fosco`} key={item._id} style={{ backgroundImage: `url(${item.photo})` }}>
              <h4>Aula de</h4>.
              <h4>
                <b>{item.tipo_aula}</b>
              </h4>
              <p>
                <b>Coach:</b> {item.Trainer}
              </p>
              <p>
              <b>Data e Hora:</b> {dateInicio.toLocaleDateString()} {dateInicio.toLocaleTimeString()} - {dateFim.toLocaleDateString()} {dateFim.toLocaleTimeString()}
              </p>
              <Button color="primary" onClick={() => (isInscrito ? handleDesinscrever(item._id,user.id) : handleInscrever(item._id,user.id))}>
                {isInscrito ? "Desmarcar" : "Marcar"}
            </Button>
            </div>
          );
        })}
      </div>
    </Container>
  </>
    );

}
if(user.role == "membervip") {
<>
    <Container>
      <br />
      <div className={styles.treinos}>
        {data.data.map((item) => {
          const isInscrito = presenca && presenca.some(f => f.Aluno === user.id && f.Aula === item._id);
          var dateInicio = new Date(item.hora_inicio);
        var dateFim = new Date(item.hora_fim);
          return (
            <div className={`${styles.box} fosco`} key={item._id} style={{ backgroundImage: `url(${item.photo})` }}>
              <h4>Aula de</h4>.
              <h4>
                <b>{item.tipo_aula}</b>
              </h4>
              <p>
                <b>Coach:</b> {item.Trainer}
              </p>
              <p>
              <b>Data e Hora:</b> {dateInicio.toLocaleDateString()} {dateInicio.toLocaleTimeString()} - {dateFim.toLocaleDateString()} {dateFim.toLocaleTimeString()}
              </p>
              <Button color="primary" onClick={() => (isInscrito ? handleDesinscrever(item._id,user.id) : handleInscrever(item._id,user.id))}>
                {isInscrito ? "Desmarcar" : "Marcar"}
            </Button>
            </div>
          );
        })}
      </div>
    </Container>
  </>
  }
else{
  
return (
  <Container>
    <br />
    <div className={styles.treinos}>
      {data.data.map((item) => {
        var dateInicio = new Date(item.hora_inicio);
        var dateFim = new Date(item.hora_fim);
        return (
          <div className={`${styles.box} fosco`} key={item._id} style={{ backgroundImage: `url(${item.photo})` }}>
            <h4>Aula de </h4>
            <h4>
              <b>{item.tipo_aula}</b>
            </h4>
            <p>
              <b>Coach:</b> {item.Trainer}
            </p>
            <p>
              <b>Data e Hora:</b> {dateInicio.toLocaleDateString()} {dateInicio.toLocaleTimeString()} - {dateFim.toLocaleDateString()} {dateFim.toLocaleTimeString()}
            </p>
          </div>
        )
      })}
    </div>
  </Container>
);
  
  
}
}

export default AulasPage;
