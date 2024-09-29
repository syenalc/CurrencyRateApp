// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import SendIcon from '@mui/icons-material/Send';
// import { Typography } from '@mui/material';
// import React, { useContext, useState } from 'react';
// import { login } from '../utils/api';
// import { Login } from '../utils/login.model';
// import { useNavigate } from 'react-router-dom';
// import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
// import { CurrencyContext } from '../context/CurrencyContext';

// interface State extends SnackbarOrigin {
//   open: boolean;
// }
// interface LoginResponse {
//   message: string;
//   isLoggedIn: boolean;
//   name: string; // name プロパティを追加
// }

// export default function LoginForm() {
//     const currencyContextLogin = useContext(CurrencyContext);

//     // contextがundefinedでないか確認して値を取得する
//     if (!currencyContextLogin) {
//       throw new Error("CurrencyContext が提供されていません");
//     }
//     const { setIsLoggedIn, setUsername } = currencyContextLogin;
//     const [email, setEmail] = useState(''); // メールアドレスの状態
//     const [password, setPassword] = useState(''); // パスワードの状態
//     const [error, setError] = useState<string | null>(null); // ログインのエラーメッセージの状態
//     const navigate = useNavigate();


//     const [state, setState] = React.useState<State>({
//       open: false,
//       vertical: 'top',
//       horizontal: 'center',
//      });
//     const { vertical, horizontal, open } = state;
    
//     const handleSubmit = async() => {
//         if (!email || !password) {
//             setError('メールアドレスとパスワードを入力してください。');
//             return;
//         }

//         try {
//             const loginInfo: Login = { email, password };
//             const loginUser: LoginResponse = await login(loginInfo); // 型を明示的に指定
//             // const loginInfo: Login = {
//             //     email: email,
//             //     password: password,
//             // };
//             // const loginUser = await login(loginInfo);

//             //下記isLoggedInはapi.tsの変数
//             if (loginUser.isLoggedIn) {
//               setIsLoggedIn(true); // ログイン状態を更新
//               setUsername(loginUser.name); //ユーザー名をセット
//               console.log("ログイン中")
//               setEmail('');
//               setPassword('');
//               setError(null); // エラーメッセージをクリア

//               // スナックバーを開く
//               setState({ ...state, open: true });
      
//               // 2秒待ってから '/' へのリダイレクトを実行
//               setTimeout(() => {
//                 navigate('/');  // 2秒後にリダイレクト
//               }, 2500); // 2秒 (2000ms)
//             }
//         } catch (e) {
//             console.error('エラーが発生しました', e);
//             setError('ログインに失敗しました。もう一度お試しください。');
//         }
//     };

//     const handleClose = () => {
//       setState({ ...state, open: false });
//     };

//     return (
//         <>
//         <Box>
//         <Typography 
//                 sx={{textAlign:"center", fontSize:"40px"}} variant="h2" 
//                 fontWeight={"fontWeightRegular"}
//             >
//                 ログイン
//         </Typography>
//         {error && <Typography color="error">{error}</Typography>} {/* エラーメッセージを表示 */}
//         <Box
//           component="form"
//           sx={{
//             '& > :not(style)': { m: 1, width: '25ch' },
//           }}
//           noValidate
//           autoComplete="off"
//         >
//           <TextField 
//             id="outlined-basic" 
//             label="Eメール" 
//             variant="outlined" 
//             value={email} // 入力されたメールアドレスを表示
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </Box>
//         <Box
//           component="form"
//           sx={{
//             '& > :not(style)': { m: 1, width: '25ch' },
//           }}
//           noValidate
//           autoComplete="off"
//         >
//           <TextField 
//             id="outlined-basic" 
//             label="パスワード" 
//             type="password" // パスワード入力時に非表示
//             variant="outlined" 
//             value={password} // 入力されたパスワードを表示
//             onChange={(e) => setPassword(e.target.value)}  
//           />
//         </Box>
//         <Box sx={{ width: 500 }}>
//         {/* ボタンをクリックするとサインアップ処理とスナックバーの表示を行う */}
//         <Button 
//             variant="contained" 
//             endIcon={<SendIcon />} 
//             onClick={handleSubmit}
//           >
//             ログイン
//         </Button>
//         {/* スナックバー */}
//         <Snackbar
//           anchorOrigin={{ vertical, horizontal }}
//           open={open}
//           onClose={handleClose}
//           message="ログインが完了しました。"
//           key={vertical + horizontal}
//         />
//         </Box>
//         </Box>
//       </>
//     );
// }

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import { login } from '../utils/api';
import { Login } from '../utils/login.model';
import { useNavigate } from 'react-router-dom';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import { CurrencyContext } from '../context/CurrencyContext';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';

interface State extends SnackbarOrigin {
  open: boolean;
}

interface LoginResponse {
  message: string;
  isLoggedIn: boolean;
  name: string; // name プロパティを追加
}

export default function LoginForm() {
    const currencyContextLogin = useContext(CurrencyContext);

    // contextがundefinedでないか確認して値を取得する
    if (!currencyContextLogin) {
      throw new Error("CurrencyContext が提供されていません");
    }

    const { setIsLoggedIn, setUsername } = currencyContextLogin;
    const [email, setEmail] = useState(''); // メールアドレスの状態
    const [password, setPassword] = useState(''); // パスワードの状態
    const [error, setError] = useState<string | null>(null); // ログインのエラーメッセージの状態
    const navigate = useNavigate();

    const [state, setState] = useState<State>({
      open: false,
      vertical: 'top',
      horizontal: 'center',
    });
    
    const { vertical, horizontal, open } = state;
    
    const handleSubmit = async () => {
        if (!email || !password) {
            setError('メールアドレスとパスワードを入力してください。');
            return;
        }

        try {
            const loginInfo: Login = { email, password };
            const loginUser: LoginResponse = await login(loginInfo); // 型を明示的に指定

            if (loginUser.isLoggedIn) {
              setIsLoggedIn(true); // ログイン状態を更新
              setUsername(loginUser.name); // ユーザー名をセット
              console.log("ログイン中");
              setEmail('');
              setPassword('');
              setError(null); // エラーメッセージをクリア

              // スナックバーを開く
              setState({ ...state, open: true });
      
              // 2秒待ってから '/' へのリダイレクトを実行
              setTimeout(() => {
                navigate('/');  // 2秒後にリダイレクト
              }, 2500); // 2秒 (2000ms)
            }
        } catch (e) {
            console.error('エラーが発生しました', e);
            setError('ログインに失敗しました。もう一度お試しください。');
        }
    };

    const handleClose = () => {
      setState({ ...state, open: false });
    };

    return (
        <Box>
            <Typography 
                sx={{ textAlign: "center", fontSize: "40px" }} 
                variant="h2" 
                fontWeight={"fontWeightRegular"}
            >
                ログイン
            </Typography>
            {error && <Typography color="error">{error}</Typography>} {/* エラーメッセージを表示 */}
            <Box
                component="form"
                sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                noValidate
                autoComplete="off"
            >
                <TextField 
                    id="outlined-basic" 
                    label="Eメール" 
                    variant="outlined" 
                    value={email} // 入力されたメールアドレスを表示
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField 
                    id="outlined-basic" 
                    label="パスワード" 
                    type="password" // パスワード入力時に非表示
                    variant="outlined" 
                    value={password} // 入力されたパスワードを表示
                    onChange={(e) => setPassword(e.target.value)}  
                />
            </Box>
            <Box>
            <Link
              component={RouterLink}
              underline="hover"
              sx={{ display: 'flex', alignItems: 'center' }}
              color="inherit"
              to="/signup"
              className='toSignup'
            >
            サインアップがまだの方はこちら
            </Link>
            </Box>
            <Box sx={{ width: 500 }}>
                <Button 
                    variant="contained" 
                    endIcon={<SendIcon />} 
                    onClick={handleSubmit}
                >
                    ログイン
                </Button>
                {/* スナックバー */}
                <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    open={open}
                    onClose={handleClose}
                    message="ログインが完了しました。"
                    key={vertical + horizontal}
                />
            </Box>
        </Box>
    );
}
