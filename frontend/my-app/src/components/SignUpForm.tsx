import * as React from 'react';
import Box from '@mui/material/Box';
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { Typography } from '@mui/material';

export default function ComposedTextField() {
  return (
    <>
    <Box>
    <Typography 
            sx={{textAlign:"center",fontSize:"40px"}} variant="h2" 
            fontWeight={"fontWeightRegular"}
        >サインアップ
    </Typography>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="ユーザーネーム" variant="outlined" />
    </Box>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Eメール" variant="outlined" />
    </Box>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="パスワード" variant="outlined" />
    </Box>
    <Button variant="contained" endIcon={<SendIcon />}>
        送信
    </Button>
    </Box>
  </>
  );
}