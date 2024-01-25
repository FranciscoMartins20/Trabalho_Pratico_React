import React, { useContext, useEffect } from "react";
import { useGetData } from "../Hooks/useGetData";
import { UsersContext } from "../contexts/UsersProvider/UsersContext";



const Logout = () => {
  const { setUsers } = useContext(UsersContext);
  const { isError, isLoading, data } = useGetData("auth/logout", 0, 0);
  

  

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
<p>Logout com Sucesso.</p>
   );
};

export default Logout;
