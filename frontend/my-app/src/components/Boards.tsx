import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { SxProps } from '@mui/system'; 
import { Item } from '../utils/items.model';
import { CurrencyContext } from '../context/CurrencyContext';

interface OutlinedCardProps {
  sx?: SxProps; // sx プロパティを追加
  item: Item;
  onEdit: (item: Item) => void; // 編集ボタンのクリックハンドラーを追加
  onDelete: (itemId: string) => void
}

export default function OutlinedCard({ sx, item, onEdit, onDelete}: OutlinedCardProps) {
  const [expanded, setExpanded] = React.useState(false); // 状態を管理
  // const [isOverflowed, setIsOverflowed] = React.useState(false); // コンテンツがオーバーフローしているかどうかの状態
  // const contentRef = React.useRef<HTMLDivElement | null>(null); // コンテンツを参照するためのrefを定義


  const currencyContextLogin = React.useContext(CurrencyContext);

  // contextがundefinedでないか確認して値を取得する
  if (!currencyContextLogin) {
      throw new Error("CurrencyContext が提供されていません");
  }
  const {isLoggedIn,username} = currencyContextLogin;

  const handleExpandClick = () => {
    setExpanded(!expanded); // コメント欄の拡大・縮小の状態を切り替える
  };

  // // コンテンツのオーバーフローをチェックする関数
  // const checkOverflow = () => {
  //   if (contentRef.current) {
  //     const isOverflowing = contentRef.current.scrollHeight > contentRef.current.clientHeight;
  //     setIsOverflowed(isOverflowing); // オーバーフローしているかを設定
  //   }
  // };

  // // 初回レンダリング時と、依存関係が変わるたびにオーバーフローをチェック
  // React.useEffect(() => {
  //   checkOverflow();
  //   // ウィンドウサイズが変更された時にもチェックするため、リサイズイベントを監視
  //   window.addEventListener('resize', checkOverflow);
  //   return () => window.removeEventListener('resize', checkOverflow);
  // }, [item.description]);

  //改行を反映させる関数
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
            // ref={contentRef} // コンテンツにrefを設定
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
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {formatDescriptionWithLineBreaks(item.description)}
            </Typography>
          </CardContent>
          <CardActions sx={{display:"flex",justifyContent: 'space-between'}}>
            <Button size="small" onClick={handleExpandClick}>
                <Button size="small" onClick={handleExpandClick}>
                  {expanded ? '閉じる' : '続きを読む'}
                </Button>
            </Button>
            <Box sx={{display:"flex" }}>
              {(isLoggedIn && username===item.name) 
                && <Button size="small" onClick={() => onEdit(item)}>
                編集  
              </Button>}
              {(isLoggedIn && username===item.name) 
                && <Button size="small" onClick={()=> onDelete(item.id)}>
                削除
              </Button>}
            </Box>
          </CardActions>
        </Card>
      </Box>
    </>
  );
}