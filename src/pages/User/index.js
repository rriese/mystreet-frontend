
import React, { useEffect, useState } from "react";
import * as C from "./styles";
import Form from "../../components/Form";
import Grid from "../../components/Grid";

const User = () => {
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getUsers = async () => {
    // try {
    //   const res = await axios.get("http://localhost:8800");
    //   setUsers(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    // } catch (error) {
    //   toast.error(error);
    // }
  };

  useEffect(() => {
    getUsers();
  }, [setUsers]);

  return (
    <C.Container>
      <C.Title>Usuários</C.Title>
      <Form onEdit={onEdit} setOnEdit={setOnEdit} null />
      <Grid setOnEdit={setOnEdit} users={users} setUsers={setUsers} />
    </C.Container>
  );
};

export default User;