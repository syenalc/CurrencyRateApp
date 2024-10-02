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