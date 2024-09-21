import './App.css';
import { CssBaseline, ThemeProvider } from "@mui/material";
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
    return(
        <ThemeProvider theme={theme}>
         <CssBaseline/>
          <CurrencyProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<IconBreadcrumbs/>} >
                        <Route index element={
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

