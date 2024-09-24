import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { Typography } from '@mui/material';
import React, { useState } from 'react';
import { setHeapSnapshotNearHeapLimit } from 'v8';
import { login } from '../utils/api';
import { Login } from '../utils/login.model';

export default function LoginForm() {
  const [email, setEmail] = useState(''); // メールアドレスの状態
  const [password, setPassword] = useState(''); // パスワードの状態
  const [error, setError] = useState<string | null>(null); // エラーメッセージの状態
  
  const handleSubmit = async() => {
    if (!email || !password) {
      setError('メールアドレスとパスワードを入力してください。');
      return;
    }
    try{
      const loginInfo: Login={
        email: email,
        password: password
      }
      const loginUser = await login(loginInfo);

      setEmail('');
      setPassword('');
    }catch (e) {
      console.error('エラーが発生しました', e);
      setError('ログインに失敗しました。もう一度お試しください。');
    }
  }

  return (
    <>
    <Box>
    <Typography 
            sx={{textAlign:"center",fontSize:"40px"}} variant="h2" 
            fontWeight={"fontWeightRegular"}
        >ログイン
    </Typography>
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
        onChange={(e)=>setEmail(e.target.value)}
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
        type="password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}  
      />
    </Box>
    <Button 
      variant="contained" 
      endIcon={<SendIcon />}
      onClick={handleSubmit}
    >
        ログイン
    </Button>
    </Box>
  </>
  );
}