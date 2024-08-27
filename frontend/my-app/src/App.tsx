import './App.css';
import { CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import { useState } from "react";
import {Route,BrowserRouter as Router,  Routes} from 'react-router-dom';
import { theme } from "./theme/theme";
import Home from "./pages/Home";
import Report from "./pages/Report";
import NoMatch from "./pages/NoMatch";
import IconBreadcrumbs from "./layout/AppLayout";
import { CurrencyProvider } from "./context/CurrencyContext";
import Signup from './pages/Signup';
import Login from './pages/Login';
const App=()=>{
    // const [linkDisabled,setLinkDisable] =useState(true); // リンクを無効にするためのフラグ
    return(
        <ThemeProvider theme={theme}>
         <CssBaseline/>
          <CurrencyProvider>
            <Router>
                <Routes>
                {/* linkDisabled={linkDisabled} */}
                    <Route path="/" element={<IconBreadcrumbs/>} >
                        <Route index element={
                            // linkDisabled={linkDisabled} setLinkDisable={setLinkDisable}
                            <Home/>
                        }>
                        </Route>
                        <Route path="report" element={
                            <Report/>
                        }> 
                        </Route>
                        <Route path="signup" element={
                            <Signup/>
                        }>
                        </Route>
                        <Route path="login" element={
                            <Login/>
                        }>
                        </Route>
                        <Route path="*" element={
                            <NoMatch/>
                        }>
                        </Route>
                    </Route>
                </Routes>
            </Router>
          </CurrencyProvider>
        </ThemeProvider>
    )
}

export default App;


// import './App.css';

// function App() {
//     return (
//         <div>
//             <h1>こんにちは</h1>
//         </div>
//     );
// }

// export default App;