import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { Typography } from '@mui/material';
import { signup } from '../utils/api';
import { Auth } from '../utils/users.model';
import { v4 as uuidv4 } from 'uuid'; 
import { useState } from 'react';

export default function ComposedTextField() {
  const [name, setName] = useState(''); // ユーザー名の状態
  const [email, setEmail] = useState(''); // メールアドレスの状態
  const [password, setPassword] = useState(''); // パスワードの状態
  const [error, setError] = useState<string | null>(null); // エラーメッセージの状態
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
    } catch (e) {
      console.error('エラーが発生しました', e);
      setError('サインアップに失敗しました。もう一度お試しください。');
    }
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
    <Button variant="contained" endIcon={<SendIcon />} onClick={handleSubmit}>
        サインアップ
    </Button>
    </Box>
  </>
  );
}