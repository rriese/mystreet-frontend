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
import MyClaims from "../pages/Claim/myClaims";
import Profile from "../pages/User/profile";
import CityHall from "../pages/CityHall";
import Details from "../pages/Claim/details";
import SendEmail from "../pages/ResetPassword/email";
import ChangePassword from "../pages/ResetPassword/change";
import Charts from "../pages/Charts";
import Reports from "../pages/Reports";
import Search from "../pages/Search";
import AllClaims from "../pages/Claim/allclaims";
import State from "../pages/State";
import City from "../pages/City";

const Private = ({ Item, Content }) => {
  const { signed } = useAuth();
  return signed > 0 ? (Content ? <Item content={<Content />} /> : <Item />) : <Signin />;
};

const AdminAllowed = ({ Item, Content }) => {
  const isAdmin = Utils.isAdmin();
  const { signed } = useAuth();
  return signed > 0 ? isAdmin ? (Content ? <Item content={<Content />} /> : <Item />) : <Template content={<Home />} /> : <Signin />;
};

const VisitorAllowed = ({ Item, Content }) => {
  const isUser = Utils.isVisitor();
  const { signed } = useAuth();
  return signed > 0 ? isUser ? (Content ? <Item content={<Content />} /> : <Item />) : <Template content={<Home />} /> : <Signin />;
};

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
          <Route exact path="/admin" element={<AdminAllowed Item={Template} Content={AdminPage} />} />
          <Route exact path="/admin/user" element={<AdminAllowed Item={Template} Content={User} />} />
          <Route exact path="/admin/cityhall" element={<AdminAllowed Item={Template} Content={CityHall} />} />
          <Route exact path="/admin/charts" element={<AdminAllowed Item={Template} Content={Charts} />} />
          <Route exact path="/admin/reports" element={<AdminAllowed Item={Template} Content={Reports} />} />
          <Route exact path="/admin/claims" element={<AdminAllowed Item={Template} Content={AllClaims} />} />
          <Route exact path="/admin/states" element={<AdminAllowed Item={Template} Content={State} />} />
          <Route exact path="/admin/cities" element={<AdminAllowed Item={Template} Content={City} />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/resetpassword" element={<SendEmail />} />
          <Route exact path="/home" element={<Private Item={Template} Content={Home} />} />
          <Route exact path="/myclaims" element={<VisitorAllowed Item={Template} Content={MyClaims} />} />
          <Route exact path="/profile" element={<Private Item={Template} Content={Profile} />} />
          <Route exact path="/claim/:id" element={<Private Item={Template} Content={Details} />} />
          <Route exact path="/search/:term" element={<Private Item={Template} Content={Search} />} />
          <Route exact path="/changepassword/:token" element={<ChangePassword />} />
          <Route path="*" element={<Signin />} />
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
};

export default RoutesApp;