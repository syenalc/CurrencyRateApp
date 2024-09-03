import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { SxProps } from '@mui/system'; 
import { Item } from '../utils/items.model';

interface OutlinedCardProps {
  sx?: SxProps; // sx プロパティを追加
  item: Item;
}

export default function OutlinedCard({ sx, item }: OutlinedCardProps) {
  const [expanded, setExpanded] = React.useState(false); // 状態を管理

  const handleExpandClick = () => {
    setExpanded(!expanded); // 状態を切り替える
  };

  return (
    <>
      <Box sx={{ minWidth: 275, ...sx }}>
        <Card variant="outlined">
          <CardContent
            sx={{
              height: expanded ? 'auto' : 100, // デフォルトの高さを制限
              overflow: 'hidden', // デフォルトではオーバーフローを隠す
            }}
          >
            <Box sx={{ display: "flex", justifyContent: 'space-between' }}>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {item.name}
              </Typography>
              <Typography variant="h5" component="div">
                {item.createdAt.split('T')[0]}
              </Typography>
            </Box>
            <br />
            <Typography variant="body2">
              {item.description}
              <br />
            </Typography>
          </CardContent>
          <CardActions sx={{display:"flex",justifyContent: 'space-between'}}>
            <Button size="small" onClick={handleExpandClick}>
              {expanded ? '閉じる' : '続きを読む'}
            </Button>
            <Box sx={{display:"flex" }}>
              <Button size="small">
                編集  
              </Button>
              <Button size="small">
                削除
              </Button>
            </Box>
          </CardActions>
        </Card>
      </Box>
    </>
  );
}
