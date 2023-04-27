import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as C from "./styles";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { Spin } from 'antd'

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [emailConf, setEmailConf] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { signup } = useAuth();

  const handleSignup = async () => {
    setLoading(true);
    if (!name | !email | !emailConf | !password) {
      setError("Preencha todos os campos");
      setLoading(false);
      return;
    } else if (email !== emailConf) {
      setError("Os e-mails não são iguais");
      setLoading(false);
      return;
    }

    const res = await signup(name, cpfCnpj, email, password);

    setLoading(false);

    if (res) {
      setError(res);
      return;
    }

    toast.success("Usuário cadastrado com sucesso!");
    navigate("/");
  };

  return (
    <C.Container style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/img/fundo.jpg'})`, backgroundRepeat: "no-repeat", backgroundSize: "100% 100%"}}>
      <Spin spinning={loading} size="large">
        <C.Label>MYSTREET</C.Label>
        <C.Content>
          <Input
            type="text"
            placeholder="Digite seu Nome"
            value={name}
            onChange={(e) => [setName(e.target.value), setError("")]}
          />
          <Input
            type="text"
            placeholder="Digite seu Cpf/Cnpj"
            value={cpfCnpj}
            onChange={(e) => [setCpfCnpj(e.target.value), setError("")]}
          />
          <Input
            type="email"
            placeholder="Digite seu E-mail"
            value={email}
            onChange={(e) => [setEmail(e.target.value), setError("")]}
          />
          <Input
            type="email"
            placeholder="Confirme seu E-mail"
            value={emailConf}
            onChange={(e) => [setEmailConf(e.target.value), setError("")]}
          />
          <Input
            type="password"
            placeholder="Digite sua Senha"
            value={password}
            onChange={(e) => [setPassword(e.target.value), setError("")]}
          />
          <C.labelError>{error}</C.labelError>
          <Button Text="Inscrever-se" onClick={handleSignup} />
          <C.LabelSignin>
            Já tem uma conta?
            <C.Strong>
              <Link to="/">&nbsp;Entre</Link>
            </C.Strong>
          </C.LabelSignin>
        </C.Content>
      </Spin>
    </C.Container>
  );
};

export default Signup;