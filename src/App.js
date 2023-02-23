import React from "react";
import GlobalStyle from "./styles/global";
import RoutesApp from "./routes";
import { AuthProvider } from "./contexts/auth";
import { toast, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

const App = () => {
    return (
        <AuthProvider>
            <RoutesApp />
            <GlobalStyle />
            <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
        </AuthProvider>
    )
}

export default App;