// import React, { useEffect, useState } from "react";
// import * as C from "./styles";
// import Form from "../../components/Form";
// import Grid from "../../components/Grid";
// import { toast } from "react-toastify";
// import { Card, Spin } from 'antd';
// import ServiceBase from "../../services/serviceBase";

// const User = () => {
//   const [users, setUsers] = useState([]);
//   const [onEdit, setOnEdit] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const getUsers = async () => {
//     try {
//       setLoading(true);
//       let res = await ServiceBase.getRequest('api/user/');
//       setUsers(res.content.sort((a, b) => (a.name > b.name ? 1 : -1)));
//     } catch (error) {
//       toast.error(error);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     getUsers();
//   }, [setUsers]);

//   return (
//     <Card title="Usuários">
//       <Spin spinning={loading} size="large">
//         <C.Container>
//           <C.Title>Usuários</C.Title>
//           <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />
//           <Grid setOnEdit={setOnEdit} users={users} setUsers={setUsers} />
//         </C.Container>
//       </Spin>
//     </Card>
//   );
// };

// export default User;