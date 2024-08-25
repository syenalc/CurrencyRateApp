import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';


function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}


export default function IconBreadcrumbs() {
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
          href="/"
         >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Home
         </Link>
        </Breadcrumbs>
      </Box>
      <Outlet/>
    </div>
    )
}
