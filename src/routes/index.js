import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Home from "../pages/Home";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import User from "../pages/User";
import Template from "../pages/Ant";

const Private = ({ Item, Content }) => {
  const { signed } = useAuth();
  return signed > 0 ? (Content ? <Item content={<Content />} /> : <Item />): <Signin />;
};

const Authenticated = ({ Item }) => {
  const { signed } = useAuth();
  return signed > 0 ? <Template content={<Home />} /> : <Item />;
};

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
          <Route exact path="/user" element={<Private Item={Template} Content={User} />} />
          <Route path="/" element={<Authenticated Item={Signin} />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/home" element={<Private Item={Template} Content={Home} />} />
          <Route path="*" element={<Signin />} />
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
};

export default RoutesApp;