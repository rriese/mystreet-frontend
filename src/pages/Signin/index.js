import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as C from "./styles";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Spin } from 'antd'
import GoogleAuth2Login from "../../components/OAuth2/login";
import GoogleAuth2Logout from "../../components/OAuth2/logout";

const Signin = () => {
  const { signin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    if (!email | !senha) {
      setError("Preencha todos os campos");
      setLoading(false);
      return;
    }

    const res = await signin(email, senha);

    setLoading(false);

    if (res) {
      setError(res);
      return;
    }
    navigate("/home");
  };

  return (
    <C.Container style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/img/fundo.jpg'})`, backgroundRepeat: "no-repeat", backgroundSize: "100% 100%" }}>
      <Spin spinning={loading} size="large">
        <C.Label>MYSTREET</C.Label>
        <C.Content>
          <Input
            type="email"
            placeholder="Digite seu E-mail"
            value={email}
            onChange={(e) => [setEmail(e.target.value), setError("")]}
          />
          <Input
            type="password"
            placeholder="Digite sua Senha"
            value={senha}
            onChange={(e) => [setSenha(e.target.value), setError("")]}
          />
          <C.labelError>{error}</C.labelError>
          <Button Text="Entrar" onClick={handleLogin} />
          <C.LabelSignup>
            Não tem uma conta?
            <C.Strong>
              <Link to="/signup">&nbsp;Registre-se</Link>
            </C.Strong>
          </C.LabelSignup>
          <C.LabelSignup>
            Esqueceu a senha?
            <C.Strong>
              <Link to="/resetpassword">&nbsp;Clique aqui</Link>
            </C.Strong>
          </C.LabelSignup>
          <GoogleAuth2Login />
        </C.Content>
      </Spin>
    </C.Container>
  );
};

export default Signin;