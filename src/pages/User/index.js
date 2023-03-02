import React, { useEffect, useState } from "react";
import * as C from "./styles";
import Form from "../../components/Form";
import Grid from "../../components/Grid";
import { toast } from "react-toastify";
import { Card } from 'antd';
import ServiceBase from "../../services/serviceBase";

const User = () => {
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getUsers = async () => {
    try {
      let res = await ServiceBase.getRequest('api/user/');
      setUsers(res.content.sort((a, b) => (a.name > b.name ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [setUsers]);

  return (
    <Card title="Usuários">
      <C.Container>
        <C.Title>Usuários</C.Title>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />
        <Grid setOnEdit={setOnEdit} users={users} setUsers={setUsers} />
      </C.Container>
    </Card>
  );
};

export default User;