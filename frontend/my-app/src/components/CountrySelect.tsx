import {useContext } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import { Fab, ThemeProvider } from '@mui/material';
import { theme } from '../theme/theme';
import RateButton from './RateButton';
import { CurrencyContext } from '../context/CurrencyContext';


interface CountryType {
  code: string;
  label: string;
  currency: string;
}

interface CountrySelectProps{
  parsedTrigger:boolean
}



const countries: readonly CountryType[] = [
  {
    code: 'AE',
    label: 'UAEディルハム',
    currency: 'AED',
  },
  { code: 'AR', label: 'アルゼンチンペソ' ,currency: 'ARS'},
  {
    code: 'AU',
    label: 'オーストラリアドル',
    currency: 'AUD',
  },
  { code: 'BR', label: 'レアル',currency: 'BRL', },
  {
    code: 'CA',
    label: 'カナダドル',
    currency: 'CAD',
  },
  { code: 'CN', label: '元', currency: 'CNY' },
  { code: 'CO', label: 'コロンビアペソ', currency: 'COP' },
  {
    code: 'DE',
    label: 'ユーロ',
    currency: 'EUR'
  },
  { code: 'GB', label: 'ポンド',currency: 'GBP', },
  { code: 'ID', label: 'ルピア', currency: 'IDR', },
  { code: 'IN', label: 'ルピー', currency: 'INR',},
  {
    code: 'JP',
    label: '円',
    currency: 'JPY'
  },
  { code: 'KR', label: 'ウォン',currency: 'KRW'},
  { code: 'MX', label: 'メキシコペソ', currency: 'MXN'},
  { code: 'PH', label: 'フィリピンペソ', currency: 'PHP'},
  { code: 'TH', label: 'バーツ' ,currency: 'THB'},
  { code: 'TR', label: 'リラ' ,currency: 'TRY'},
  {
    code: 'US',
    label: 'ドル',
    currency: 'USD',
  },

  { code: 'VN', label: 'ドン',currency: 'VND'},
  { code: 'ZA', label: 'ランド',currency: 'ZAR'},
];

export default function CountrySelect({parsedTrigger}:CountrySelectProps) {
  const currencyContext = useContext(CurrencyContext);

  if (!currencyContext) {
    throw new Error('CurrencySelect must be used within a CurrencyProvider');
  }

  const { val1, val2, setVal1, setVal2 } = currencyContext;


  const onChangeleft=(event:any,newValue:CountryType | null)=> setVal1(newValue);
  const onChangeright=(event:any,newValue:CountryType | null)=> setVal2(newValue);


  const exchangeCurrency = () => {
    if (val1 && val2) {
      // Swap labels between val1 and val2
      console.log(val1);
      const newLabel1= val2;
      const newLabel2 = val1;
      setVal1(newLabel1);
      setVal2(newLabel2);

    }
    
  }
  
  
  return (
    <>
     <ThemeProvider theme={theme}>
      <Box display={"flex"} justifyContent={"space-evenly"} sx={{marginBottom:"30px"}}>
        <Autocomplete
          id="country-select-demo"
          sx={{ width: 400 }}
          options={countries}
          autoHighlight
          getOptionLabel={(option) => option.label}
          onChange={onChangeleft}// Update val1 on option select
          value={val1}
          renderOption={(props, option) => {
            const { key, ...optionProps } = props;
            return (
              <Box
                key={key}
                component="li"
                sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                {...optionProps}
              >
                <img
                  loading="lazy"
                  width="20"
                  srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                  src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                  alt=""
                />
                {option.label} ({option.currency}) 
              </Box>
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="換算元通貨"
              inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password', 
                placeholder: '入力してください', 
              }}
              sx={{ '& .MuiInputBase-input': { width: 100 } }}
              value={val1 ? val1.label : ''} // Display the label of the selected option
           />
           )}
          />
        <Fab color="primary" aria-label="add">
          <SyncAltIcon onClick={exchangeCurrency}/>
        </Fab>
        <Autocomplete
          id="country-select-demo"
          sx={{ width: 400 }}
          options={countries}
          autoHighlight
          getOptionLabel={(option) => option.label}
          onChange={onChangeright} // Update val2 
          value={val2}
          renderOption={(props, option) => {
           const { key, ...optionProps } = props;
            return (
              <Box
                key={key}
                component="li"
                sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                {...optionProps}
              >
                <img
                  loading="lazy"
                  width="20"
                  srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                  src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                  alt=""
                  
                />
                {option.label} ({option.currency}) 
              </Box>
            );
          }}
          renderInput={(params) => (
            <TextField
              sx={{ '.MuiAutocomplete-input': { width: "auto" }, '& .css-1k5x6e8-MuiAutocomplete-root': { width: "auto" }}}
              {...params}
              label="換算先通貨"
              inputProps={{
                ...params.inputProps,
                placeholder: '入力してください', // Add the placeholder here
              }}
              value={val2 ? val2.label : ''} // Display the label of the selected option
            />
        )}
        />
      </Box>
      <RateButton 
        parsedTrigger={parsedTrigger}
      />
     </ThemeProvider>
    </>
    
    
  );
}
