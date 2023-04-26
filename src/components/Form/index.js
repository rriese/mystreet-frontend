
import React, { useEffect, useRef } from "react";
import * as C from "./styles";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ServiceBase from "../../services/serviceBase";

const Form = ({ getUsers, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;

      user.nome.value = onEdit.name;
      user.cpfCnpj.value = onEdit.cpfCnpj;
      user.email.value = onEdit.email;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = ref.current;

    if (
      !user.nome.value ||
      !user.cpfCnpj.value ||
      !user.email.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      let serviceResponse = await ServiceBase.putRequest('api/user/', {
        id: onEdit.id,
        name: user.nome.value,
        email: user.email.value,
        cpfCnpj: user.cpfCnpj.value
      });

      if (serviceResponse && serviceResponse.responseType === 'OK') {
        toast.success('Usuário atualizado com sucesso!');
      }
    } else {
      let serviceResponse = await ServiceBase.postRequest('api/user/', {
        nome: user.nome.value,
        email: user.email.value
      });

      if (serviceResponse && serviceResponse.responseType === 'OK') {
        toast.success('Usuário criado com sucesso!');
      }
    }

    user.nome.value = "";
    user.email.value = "";
    user.cpfCnpj.value = "";

    setOnEdit(null);
    getUsers();
  };

  return (
    <C.FormContainer ref={ref} onSubmit={handleSubmit}>
      <C.InputArea>
        <C.Label>Nome</C.Label>
        <C.Input name="nome" />
      </C.InputArea>
      <C.InputArea>
        <C.Label>Cpf/Cnpj</C.Label>
        <C.Input name="cpfCnpj" />
      </C.InputArea>
      <C.InputArea>
        <C.Label>E-mail</C.Label>
        <C.Input name="email" type="email" />
      </C.InputArea>
      <C.Button type="submit">SALVAR</C.Button>
    </C.FormContainer>
  );
};

export default Form;