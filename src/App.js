import React from "react";
import GlobalStyle from "./styles/global";
import RoutesApp from "./routes";
import { AuthProvider } from "./contexts/auth";
import { toast, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { gapi } from 'gapi-script'

const App = () => {
  gapi.load("client:auth2", () => {
    gapi.client.init({
      clientId:
        process.env.REACT_APP_GOOGLE_OAUTH2_CLIENT_ID
    });
  });

  return (
    <AuthProvider>
      <RoutesApp />
      <GlobalStyle />
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
    </AuthProvider>
  )
}

export default App;