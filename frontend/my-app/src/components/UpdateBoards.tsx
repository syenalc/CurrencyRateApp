import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import CreateIcon from '@mui/icons-material/Create';
import { v4 as uuidv4 } from 'uuid'; 

import { Item } from '../utils/items.model';
import { update } from '../utils/api';

interface FormDialogProp {
  item: Item;
  onItemUpdated: () => Promise<void>;
}

export default function UpdateDialog({ item, onItemUpdated }: FormDialogProp) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ description: item.description });

  useEffect(() => {
    setFormData({ description: item.description });
  }, [item]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    const updatedItem: Item = {
      ...item,
      description: formData.description,
    };

    const result = await update(updatedItem);
    console.log('アイテムが更新されました:', result);

    onItemUpdated();
    handleClose();
  };

  return (
    <div className='update-form'>
      <Button variant="contained" onClick={handleClickOpen}>
        <CreateIcon sx={{ mr: 0.5 }} fontSize="inherit" />更新
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="description"
            type="text"
            fullWidth
            multiline
            minRows={5}
            style={{ width: '100%', resize: 'none', fontSize: '16px' }}
            variant="outlined"
            value={formData.description}
            onChange={handleChange}
            placeholder='コメントする...'
            InputProps={{
              style: { maxHeight: '500px', overflowY: 'auto' }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>キャンセル</Button>
          <Button onClick={handleSubmit}>更新</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
