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

const Home = () => {
  const currencyContext = useContext(CurrencyContext);

  if (!currencyContext) {
    throw new Error('CurrencySelect must be used within a CurrencyProvider');
  }

  
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null); //updateダイアログが選択された状態
  const [open, setOpen] = useState(false);  // updateダイアログの開閉状態を管理

  const [selectedDeleteItem, setSelectedDeleteItem] = useState<string | null>(null); //deleteダイアログが選択された状態
  const [openDelete, setOpenDelete] = useState(false);  // deleteダイアログの開閉状態を管理

  const fetchItems = async () => {
    const data = await findAll();
    if (data) {
      setItems(data);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  //編集機能
  const handleItemUpdated = async () => {
    await fetchItems();
    setSelectedItem(null);
    setOpen(false);  // ダイアログを閉じる
  };

  const handleEdit = (item: Item) => {
    setSelectedItem(item);
    setOpen(true);  // ダイアログを開く
  };

  //削除機能
  const handleItemAfterDelete = async ()=>{
    await fetchItems();
    setSelectedDeleteItem(null);
    setOpenDelete(false);  // ダイアログを閉じる
  }

  const handleDelete = (itemId:string) => {
    setSelectedDeleteItem(itemId);
    setOpenDelete(true);  // ダイアログを開く
  };
  // parsedTrigger={JSON.parse(localStorage.getItem('trigger') || 'false')}
  return (
    <>
      <Box sx={{ padding: "50px" }}>
        <CountrySelect />
      </Box>
      <Typography
        sx={{ textAlign: "center", fontSize: "40px" }}
        variant="h2"
        fontWeight={"fontWeightRegular"}
      >
        為替速報メモ
      </Typography>
      <FormDialog onNewItemCreated={fetchItems} />
      <Box>
        {items.map((item) => (
          <OutlinedCard
            key={item.id}
            item={item}
            sx={{ textAlign: "center", padding: "50px" }}
            onEdit={handleEdit}  // 編集ボタンがクリックされたときに呼び出す
            onDelete={handleDelete}
          />
        ))}
      </Box>
      {selectedItem && (
        <UpdateDialog
          item={selectedItem}
          onItemUpdated={handleItemUpdated}
          open={open}  // ダイアログの開閉状態を渡す
          onClose={() => setOpen(false)}  // ダイアログを閉じるための関数を渡す
        />
      )}
      {selectedDeleteItem && (
        <AlertDialog
          deleteItemId={selectedDeleteItem}
          onItemAfterDelete={handleItemAfterDelete}
          openDelete={openDelete}  // ダイアログの開閉状態を渡す
          onClose={() => setOpenDelete(false)}  // ダイアログを閉じるための関数を渡す
        />
      )}
    </>
  );
}

export default Home;