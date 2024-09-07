import { Item } from "./items.model";
import { User } from "./users.model";

const API_BASE_URL:string = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export async function findAll(){
    try{
        const res = await fetch(`${API_BASE_URL}/items`,{
            method:"GET",
        });
        if (!res.ok) {
            const errorBody = await res.text(); // レスポンスボディをテキストで取得
            throw new Error(`エラーが発生しました。ステータス: ${res.status}, メッセージ: ${errorBody}`);
        }
        const data:Item[]= await res.json();
        return data;
    } catch (e){
        console.log('エラーが発生しました', e);
        throw e; // 例外を再スローすることで、呼び出し元でもエラーハンドリングが可能になります
    }
};

export async function create(item:Item){
    try{
        const res = await fetch(`${API_BASE_URL}/items`,{
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(item), // フロントエンドで入力されたデータを送信
        });
        if (!res.ok) {
            const errorBody = await res.text(); // レスポンスボディをテキストで取得
            throw new Error(`エラーが発生しました。ステータス: ${res.status}, メッセージ: ${errorBody}`);
        }
        const data:Item[]= await res.json();
        console.log(item.id);
        return data;
    } catch (e){
        console.log('エラーが発生しました', e);
        throw e;
    }
};

export async function update(item:Item){
    try{
        const res = await fetch(`${API_BASE_URL}/items/${item.id}`,{
            method:"PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(item), // フロントエンドで入力されたデータを送信
        });
        if (!res.ok) {
            console.log(item.id);
            const errorBody = await res.text(); // レスポンスボディをテキストで取得
            throw new Error(`エラーが発生しました。ステータス: ${res.status}, メッセージ: ${errorBody}`);
        }
        const updatedItem: Item = await res.json();
        return updatedItem;
    } catch (e){
        console.log('エラーが発生しました', e);
        throw e;
    }
};

export async function deleteItemApi(itemId:string){
    try{
        const res = await fetch(`${API_BASE_URL}/items/${itemId}`,{
            method:"DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!res.ok) {
            const errorBody = await res.text(); // レスポンスボディをテキストで取得
            throw new Error(`エラーが発生しました。ステータス: ${res.status}, メッセージ: ${errorBody}`);
        }
        return {};
    } catch (e){
        console.log('エラーが発生しました', e);
        throw e;
    }
};
// export async function signUp(user:User){
//     try{
//         const res = await fetch(`${API_BASE_URL}/signup`,{
//             method:"POST",
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(user), // フロントエンドで入力されたデータを送信
//         });
//         if (!res.ok) {
//             throw new Error(`エラーが発生しました。ステータス:${res.status}`);
//         }
//         const data:User[]= await res.json();
//         return data;
//     } catch (e){
//         console.log('エラーが発生しました', e);
//     }
// };