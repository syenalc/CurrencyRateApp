import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import OutlinedCard from '../components/Boards';
import { findAll } from '../utils/api';
import { SettingsRemoteSharp } from '@mui/icons-material';
import { Item } from '../utils/items.model';
import CreateIcon from '@mui/icons-material/Create';
import FormDialog from '../components/CreateBoards';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}


export default function IconBreadcrumbs() {
  const [items, setItems] = React.useState<Item[]>([]);

  const fetchItems = async () => {
    const data = await findAll();
    if (data) {
      setItems(data);
    }
  };

  React.useEffect(() => {
    fetchItems();
  }, []);
  return (
    <div role="presentation" >
      <Box sx={{display:"flex",justifyContent:"space-between", alignItems:"center", bgcolor:(theme)=>theme.palette.blueColor.main, minHeight:"10vh",padding:"20px"}}>
        <Typography 
            sx={{textAlign:"left",fontSize:"44px", color:(theme)=>theme.palette.blueColor.light}} variant="h1" 
            fontWeight={"fontWeightRegular"}
        >為替速報</Typography>
        <Breadcrumbs aria-label="breadcrumb" sx={{textAlign:"right"}}>
          <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="inherit"
          href="/signup"
         >
          <AppRegistrationIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          サインアップ
          </Link>
          <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="inherit"
          href="/login"
         >
          <LoginIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          ログイン
         </Link>
         <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="inherit"
          href="/"
         >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          ホーム
         </Link>
        </Breadcrumbs>
      </Box>
      <Outlet/>
      <Typography 
            sx={{textAlign:"center",fontSize:"40px"}} variant="h2" 
            fontWeight={"fontWeightRegular"}
        >為替速報掲示板
      </Typography>
      {/* <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center'}}
          color="inherit"
          href="/"
         >
          
      </Link> */}
      <FormDialog onNewItemCreated={fetchItems} />
      <Box>
        {items.map((item)=>(
            <OutlinedCard
            key={item.id}
            item={item}
            sx={{textAlign:"center", padding:"50px"}}
            
            />
        ))}
      </Box>
    </div>
    )
}
