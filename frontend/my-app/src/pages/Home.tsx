import React, { useState, useEffect, useContext } from "react";
import { Box, Typography } from "@mui/material";
import CountrySelect from "../components/CountrySelect";
import FormDialog from "../components/CreateBoards";
import OutlinedCard from "../components/Boards";
import UpdateDialog from "../components/UpdateBoards";
import { CurrencyContext } from "../context/CurrencyContext";
import { Item } from "../utils/items.model";
import { findAll } from "../utils/api";
import AlertDialog from "../components/DeleteBoards";
import BasicSelect from "../components/Order";
import BasicMenu from "../components/Order";

const Home = () => {
  const currencyContext = useContext(CurrencyContext);

  if (!currencyContext) {
    throw new Error('CurrencySelect must be used within a CurrencyProvider');
  }

  
  
  return (
    <>
      <Box sx={{ padding: "50px" }}>
        <CountrySelect />
      </Box>
      
    </>
  );
}

export default Home;