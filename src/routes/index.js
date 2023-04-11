import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Home from "../pages/Home";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import Template from "../pages/Ant";
import AdminPage from "../pages/Admin";
import User from "../pages/User";
import Utils from "../services/utils";

const Private = ({ Item, Content }) => {
  const { signed } = useAuth();
  return signed > 0 ? (Content ? <Item content={<Content />} /> : <Item />) : <Signin />;
};

const Admin = ({ Item, Content }) => {
  const isAdmin = Utils.isAdmin();
  return isAdmin ? (Content ? <Item content={<Content />} /> : <Item />) : <Template content={<Home />} />;
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
          <Route exact path="/admin" element={<Admin Item={Template} Content={AdminPage} />} />
          <Route exact path="/admin/user" element={<Admin Item={Template} Content={User} />} />
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