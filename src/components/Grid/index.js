import React from "react";
import * as C from "./styles";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import ServiceBase from "../../services/serviceBase";

const Grid = ({ users, setUsers, setOnEdit }) => {
  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (id) => {
    const serviceResponse = await ServiceBase.deleteRequest(`api/user/${id}`);

    if (serviceResponse && serviceResponse.responseType === 'OK') {
      const newArray = users.filter((user) => user.id !== id);
      setUsers(newArray);
      toast.success("Usuário deletado com sucesso!");
    }
    setOnEdit(null);
  };

  return (
    <C.Table>
      <C.Thead>
        <C.Tr>
          <C.Th>Nome</C.Th>
          <C.Th>Email</C.Th>
          <C.Th onlyWeb>Cpf/Cnpj</C.Th>
          <C.Th></C.Th>
          <C.Th></C.Th>
        </C.Tr>
      </C.Thead>
      <C.Tbody>
        {users.map((item, i) => (
          <C.Tr key={i}>
            <C.Td width="30%">{item.name}</C.Td>
            <C.Td width="40%">{item.email}</C.Td>
            <C.Td width="20%" onlyWeb>
              {item.cpfCnpj}
            </C.Td>
            <C.Td alignCenter width="5%">
              <FaEdit onClick={() => handleEdit(item)} />
            </C.Td>
            <C.Td alignCenter width="5%">
              <FaTrash onClick={() => handleDelete(item.id)} />
            </C.Td>
          </C.Tr>
        ))}
      </C.Tbody>
    </C.Table>
  );
};

export default Grid;