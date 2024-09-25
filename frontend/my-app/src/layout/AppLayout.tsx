import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { CurrencyContext } from '../context/CurrencyContext';


export default function IconBreadcrumbs() {
  const currencyContextLogin = React.useContext(CurrencyContext);

  // contextがundefinedでないか確認して値を取得する
  if (!currencyContextLogin) {
      throw new Error("CurrencyContext が提供されていません");
  }
  const {isLoggedIn,setIsLoggedIn,username} = currencyContextLogin;

  const handleLogout = () => {
    localStorage.removeItem('token'); // ローカルストレージからトークンを削除
    setIsLoggedIn(false); // ログイン状態をfalseに更新
  };

  return (
    <div role="presentation" >
      <Box sx={{display:"flex",justifyContent:"space-between", alignItems:"center", bgcolor:(theme)=>theme.palette.blueColor.main, minHeight:"10vh",padding:"20px"}}>
        <Typography 
            sx={{textAlign:"left",fontSize:"44px", color:(theme)=>theme.palette.blueColor.light}} variant="h1" 
            fontWeight={"fontWeightRegular"}
        >為替速報</Typography>
        <Breadcrumbs aria-label="breadcrumb" sx={{textAlign:"right"}}>
         {/* <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="inherit"
          href="/"
         > */}
        {isLoggedIn ? 
          <Box sx={{display:'flex'}}>
          <Typography
          sx={{ display: 'flex', alignItems: 'center' }}
          color="inherit"
          >
            <AccountCircleIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            {username}さん
          </Typography>
          <Link
          component={RouterLink}
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="inherit"
          to="/"
          onClick={handleLogout}
          >
            <LogoutIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            ログアウト
          </Link>
          </Box>
           :
          <Box sx={{display:'flex'}}>
          <Link
          component={RouterLink}
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="inherit"
          to="/signup"
          >
            <AppRegistrationIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            サインアップ
          </Link>
          <Link
          component={RouterLink}
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="inherit"
          to="/login"
          >
            <LoginIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            ログイン
          </Link>
          </Box>
        }
        <Box sx={{display:'flex'}}>
        <Link
          component={RouterLink}  //React RouterのLinkに変更
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="inherit"
          to="/"  // "href"ではなく"to"を使用
         >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          ホーム
        </Link>
        </Box>
        </Breadcrumbs>
      </Box>
      <Outlet/>
    </div>
    )
}
