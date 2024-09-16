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
  onEdit: (item: Item) => void; // 編集ボタンのクリックハンドラーを追加
  onDelete: (itemId: string) => void
}

export default function OutlinedCard({ sx, item, onEdit, onDelete}: OutlinedCardProps) {
  const [expanded, setExpanded] = React.useState(false); // 状態を管理

  const handleExpandClick = () => {
    setExpanded(!expanded); // コメント欄の拡大・縮小の状態を切り替える
  };

  const formatDescriptionWithLineBreaks = (description: string) => {
    return description.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  return (
    <>
      <Box sx={{ minWidth: 275, ...sx }}>
        <Card variant="outlined">
          <CardContent
            sx={{
              height: expanded ? 'auto' : 100, // デフォルトの高さを100に制限
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
            {/* <Typography variant="body2">
              
              <br />
            </Typography> */}
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {formatDescriptionWithLineBreaks(item.description)}
            </Typography>
          </CardContent>
          <CardActions sx={{display:"flex",justifyContent: 'space-between'}}>
            <Button size="small" onClick={handleExpandClick}>
              {expanded ? '閉じる' : '続きを読む'}
            </Button>
            <Box sx={{display:"flex" }}>
              <Button size="small" onClick={() => onEdit(item)}>
                編集  
              </Button>
              <Button size="small" onClick={()=> onDelete(item.id)}>
                削除
              </Button>
            </Box>
          </CardActions>
        </Card>
      </Box>
    </>
  );
}