// import * as React from 'react';
// import Box from '@mui/material/Box';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select, { SelectChangeEvent } from '@mui/material/Select';

// interface orderProps{
//     order:string;
//     setOrder:React.Dispatch<React.SetStateAction<string>>;
// }
// export default function BasicSelect({order,setOrder}:orderProps) {
  

//   const handleChange = (event: SelectChangeEvent) => {
//     setOrder(event.target.value as string);
//   };

//   return (
//     <Box sx={{ minWidth: 120 }}>
//       <FormControl fullWidth>
//         <InputLabel id="demo-simple-select-label">表示順</InputLabel>
//         <Select
//           labelId="demo-simple-select-label"
//           id="demo-simple-select"
//           value={order}
//           label="並び替え"
//           onChange={handleChange}
//         >
//           <MenuItem value={"0"}>新しい順</MenuItem>
//           <MenuItem value={"1"}>古い順</MenuItem>
//         </Select>
//       </FormControl>
//     </Box>
//   );
// }

import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

interface orderProps{
        order:string;
        setOrder:React.Dispatch<React.SetStateAction<string>>;
}
export default function BasicMenu({order,setOrder}:orderProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event: any) => {
        setOrder(event.target.value as string);
  };
  const handleMenuItemClick = (value: string) => {
    setOrder(value); // 選択された値でorderを更新
    handleClose(); // メニューを閉じる
  };


  return (
    <div className='order'>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        並び替え
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
          sx: { display: 'block' },
        }}
      >
        <li className='order-list'><MenuItem onClick={() => handleMenuItemClick("0")}>新しい順</MenuItem></li>
        <li className='order-list'><MenuItem onClick={() => handleMenuItemClick("1")}>古い順</MenuItem></li>
      </Menu>
    </div>
  );
}