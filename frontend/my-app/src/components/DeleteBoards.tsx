import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { deleteItemApi } from '../utils/api';

interface AlertDialogProp {
    deleteItemId: string;
    onItemAfterDelete: () => Promise<void>;
    openDelete: boolean;  // ダイアログの開閉状態を受け取る
    onClose: () => void;  // ダイアログを閉じるための関数
}

export default function AlertDialog({deleteItemId, onItemAfterDelete, openDelete, onClose}: AlertDialogProp) {
   const handleDelete = async () => {
    try {
        await deleteItemApi(deleteItemId);
        console.log('アイテムが削除されました');
        await onItemAfterDelete();  // アイテム削除後の処理
      } catch (e) {
        console.error('アイテムの削除中にエラーが発生しました', e);
      }
    onClose(); // ダイアログを閉じる
  };

  return (
    <React.Fragment>
      <Dialog
        open={openDelete}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"選択したアイテムを削除しますか?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            削除したアイテムは元に戻すことはできません。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>キャンセル</Button>
          <Button onClick={handleDelete} autoFocus>
            削除
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}