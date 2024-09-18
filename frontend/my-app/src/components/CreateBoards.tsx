import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import CreateIcon from '@mui/icons-material/Create';
import { v4 as uuidv4 } from 'uuid'; 
import { Item } from '../utils/items.model';
import { create } from '../utils/api';
import { formGroupClasses } from '@mui/material';

interface FormDialogProp{
  onNewItemCreated:() => Promise<void>;
  from:string | null;
  to:string | null;
}

export default function FormDialog({onNewItemCreated,from,to}:FormDialogProp) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ description: '' });
  console.log(from,to);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setFormData({description:''});
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async() => {
    const newItem: Item = {
        id: uuidv4(),  // ランダムなIDを生成
        name: `User-${uuidv4().slice(0, 15)}`,  // ランダムなユーザー名を生成
        description: formData.description,
        createdAt: new Date().toISOString(),
        country1: from,
        country2: to,
    };
    console.log('送信されるアイテム:', newItem);  // ここで確認
    const createdItem = await create(newItem);
    console.log('新しいアイテムが作成されました:', createdItem);

    onNewItemCreated();
    handleClose();
  };


  

  return (
    <div className='comment-form'>
      <Button variant="contained" onClick={handleClickOpen}>
      <CreateIcon sx={{ mr: 0.5 }} fontSize="inherit" />コメントを書く
      </Button>
      <Dialog open={open} onClose={handleClose}>
        {/* <DialogTitle>コメント</DialogTitle> */}
        <DialogContent>
          <TextField          
            autoFocus
            margin="dense"
            name="description"
            // label="文章を入力してください"
            type="text"
            fullWidth
            multiline
            minRows={5}    // テキストエリアの最小行数
            style={{ width: '100%', resize: 'none', fontSize: '16px' }}  // 幅とフォントサイズの設定
            variant="outlined"
            value={formData.description}
            onChange={handleChange}
            placeholder='コメントする...'
            InputProps={{
                style: { maxHeight: '500px', overflowY: 'auto' } // 高さとスクロールのスタイル
              }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>キャンセル</Button>
          <Button onClick={handleSubmit}>投稿</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
