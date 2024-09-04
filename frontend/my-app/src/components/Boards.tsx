import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { SxProps } from '@mui/system'; 
import { Item } from '../utils/items.model';
import UpdateDialog from './UpdateBoards'; 

interface OutlinedCardProps {
  sx?: SxProps; // sx プロパティを追加
  item: Item;
  onEdit: (item: Item) => void; // 編集ボタンのクリックハンドラーを追加
}

export default function OutlinedCard({ sx, item, onEdit}: OutlinedCardProps) {
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
              <Button size="small" onClick={() => onEdit(item)}>
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

export function Boards() {
  const [items, setItems] = React.useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = React.useState<Item | null>(null);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const fetchItems = async () => {
      const data = await findAll(); // APIから全アイテムを取得
      if (data) {
        setItems(data);
      }
    };

    fetchItems();
  }, []);

  const handleEdit = (item: Item) => {
    setSelectedItem(item);
    setOpen(true); // ダイアログを開く
  };

  const handleItemUpdated = async () => {
    const data = await findAll(); // アイテムが更新された後、最新のデータを取得
    setItems(data);
    setOpen(false); // ダイアログを閉じる
    setSelectedItem(null); // 選択をクリアする
  };

  return (
    <Box>
      {items.map((item) => (
        <OutlinedCard
          key={item.id}
          item={item}
          sx={{ textAlign: "center", padding: "50px" }}
          onEdit={handleEdit} // 編集ボタンがクリックされたときに呼び出す
        />
      ))}
      {selectedItem && (
        <UpdateDialog
          item={selectedItem}
          onItemUpdated={handleItemUpdated}
          open={open} // ダイアログの開閉状態を渡す
          onClose={() => setOpen(false)} // ダイアログを閉じるための関数を渡す
        />
      )}
    </Box>
  );
}