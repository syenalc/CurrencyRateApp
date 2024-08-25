import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { SxProps } from '@mui/system'; 

interface OutlinedCardProps {
    sx?: SxProps; // sx プロパティを追加
  }

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const card = (
  <>
  <React.Fragment>
    <CardContent>
      <Box sx={{display:"flex"}}>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            ユーザー名
        </Typography>
        <Typography variant="h5" component="div">
            投稿日時
        </Typography>
      </Box>
      <Typography variant="h5" component="div">
        タイトル
      </Typography>
      {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
        本文
      </Typography> */}
      <Typography variant="body2">
        本文
        <br />
        {/* {'"a benevolent smile"'} */}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">続きを読む</Button>
    </CardActions>
  </React.Fragment>
  </>
);

export default function OutlinedCard({ sx }: OutlinedCardProps) {
  return (
    <>
        <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">{card}</Card>
        </Box>
        <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">{card}</Card>
        </Box>
    </>
    
  );
}