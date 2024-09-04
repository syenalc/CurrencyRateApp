import React, { useState, useEffect, useContext } from "react";
import { Box, Typography } from "@mui/material";
import CountrySelect from "../components/CountrySelect";
import FormDialog from "../components/CreateBoards";

import { CurrencyContext } from "../context/CurrencyContext";
import { Item } from "../utils/items.model";
import { findAll } from "../utils/api";
import Boards from "../components/Boards";

const Home = () => {
  const currencyContext = useContext(CurrencyContext);

  if (!currencyContext) {
    throw new Error('CurrencySelect must be used within a CurrencyProvider');
  }

  const { setFrom, setTo, setRate } = currencyContext;

  const [items, setItems] = useState<Item[]>([]);

  const fetchItems = async () => {
    const data = await findAll();
    if (data) {
      setItems(data);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <>
      <Box sx={{ padding: "50px" }}>
        <CountrySelect parsedTrigger={JSON.parse(localStorage.getItem('trigger') || 'false')} />
      </Box>
      <Typography
        sx={{ textAlign: "center", fontSize: "40px" }}
        variant="h2"
        fontWeight={"fontWeightRegular"}
      >
        為替速報掲示板
      </Typography>
      {/* onNewItemCreated に fetchItems 関数を渡す */}
      <FormDialog onNewItemCreated={fetchItems} />
      <Boards /> 
    </>
  );
}

export default Home;

