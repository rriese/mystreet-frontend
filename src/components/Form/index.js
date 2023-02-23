
import axios from "axios";
import React, { useEffect, useRef } from "react";
import * as C from "./styles";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Form = ({ getUsers, onEdit, setOnEdit }) => {
    const ref = useRef();
  
    useEffect(() => {
      if (onEdit) {
        const user = ref.current;
  
        user.nome.value = onEdit.nome;
        user.email.value = onEdit.email;
      }
    }, [onEdit]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const user = ref.current;
  
      if (
        !user.nome.value ||
        !user.email.value
      ) {
        return toast.warn("Preencha todos os campos!");
      }
  
      if (onEdit) {
        await axios
          .put("http://localhost:8800/" + onEdit.id, {
            nome: user.nome.value,
            email: user.email.value,
          })
          .then(({ data }) => toast.success(data))
          .catch(({ data }) => toast.error(data));
      } else {
        await axios
          .post("http://localhost:8800", {
            nome: user.nome.value,
            email: user.email.value,
          })
          .then(({ data }) => toast.success(data))
          .catch(({ data }) => toast.error(data));
      }
  
      user.nome.value = "";
      user.email.value = "";
  
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
        <C.InputArea>
          <C.Label>Senha</C.Label>
          <C.Input name="senha" />
        </C.InputArea>
        <C.Button type="submit">SALVAR</C.Button>
      </C.FormContainer>
    );
  };
  
  export default Form;