import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { Typography } from '@mui/material';
import { signup } from '../utils/api';
import { Auth } from '../utils/users.model';
import { v4 as uuidv4 } from 'uuid'; 
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';

interface State extends SnackbarOrigin {
  open: boolean;
}

export default function ComposedTextField() {
  const [name, setName] = useState(''); // ユーザー名の状態
  const [email, setEmail] = useState(''); // メールアドレスの状態
  const [password, setPassword] = useState(''); // パスワードの状態
  const [error, setError] = useState<string | null>(null); // エラーメッセージの状態
  const navigate = useNavigate();

  const [state, setState] = React.useState<State>({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = state;

  const handleSubmit = async() => {
    try {
      const newUser: Auth = {
        id: uuidv4(),  // ランダムなIDを生成
        name: name,
        createdAt: new Date().toISOString(),
        email: email,
        password: password,
      };
      console.log('送信されるアイテム:', newUser);  // ここで確認

      const createdUser = await signup(newUser);
      console.log('新しいアイテムが作成されました:', createdUser);

      setName('');
      setEmail('');
      setPassword('');

      // スナックバーを開く
      setState({ ...state, open: true });
      
      // 2秒待ってから '/' へのリダイレクトを実行
      setTimeout(() => {
        navigate('/');  // 2秒後にリダイレクト
      }, 2500); // 2秒 (2000ms)

    } catch (e) {
      console.error('エラーが発生しました', e);
      setError('サインアップに失敗しました。もう一度お試しください。');
    }
  };
  

  // const handleClick = (newState: SnackbarOrigin) => () => {
  //   setState({ ...newState, open: true });
  // };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  
  return (
    <>
    <Box>
    <Typography 
            sx={{textAlign:"center",fontSize:"40px"}} variant="h2" 
            fontWeight={"fontWeightRegular"}
        >サインアップ
    </Typography>
    {error && <Typography color="error">{error}</Typography>}
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField 
        id="outlined-basic" 
        label="ユーザーネーム" 
        variant="outlined" 
        value={name} 
        onChange={(e) => setName(e.target.value)}
      />
    </Box>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField 
        id="outlined-basic" 
        label="Eメール" 
        variant="outlined" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)}
      />
    </Box>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField 
        id="outlined-basic" 
        label="パスワード" 
        variant="outlined" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)}
      />
    </Box>
    <Box sx={{ width: 500 }}>
      {/* ボタンをクリックするとサインアップ処理とスナックバーの表示を行う */}
      <Button 
            variant="contained" 
            endIcon={<SendIcon />} 
            onClick={handleSubmit}
          >
            サインアップ
      </Button>
      {/* スナックバー */}
      <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={handleClose}
          message="サインアップが完了しました。"
          key={vertical + horizontal}
      />
    </Box>
    </Box>
  </>
  );
}