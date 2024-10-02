import { useContext } from "react";
import { CurrencyContext } from "../context/CurrencyContext";
import { Item } from "./items.model";
import { Login, LoginResponse } from "./login.model";
import { Auth } from "./users.model";
import { Rate } from "./rate.model";

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
        throw e; // 例外を再スローすることで、呼び出し元でエラーハンドリングができる
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
        console.log(item.country1);
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

export async function signup(auth:Auth){
    try{
        const res = await fetch(`${API_BASE_URL}/auth`,{
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(auth), // フロントエンドで入力されたデータを送信
        });
        if (!res.ok) {
            const errorBody = await res.text(); // レスポンスボディをテキストで取得
            throw new Error(`エラーが発生しました。ステータス: ${res.status}, メッセージ: ${errorBody}`);
        }
        const data:Auth[]= await res.json();
        console.log(auth.id);
        return data;
    } catch (e){
        console.log('エラーが発生しました', e);
        throw e;
    }
};


export async function login(login: Login): Promise<LoginResponse> {
    try {
        const res = await fetch(`${API_BASE_URL}/auth/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(login),
        });

        if (!res.ok) {
            const errorBody = await res.text();
            throw new Error(`エラーが発生しました。ステータス: ${res.status}, メッセージ: ${errorBody}`);
        }

        const data = await res.json();
        
        if (data.token && data.name) {
            console.log('ログイン成功:', data);
            localStorage.setItem('token', data.token);
            return { message: data.message, isLoggedIn: true, name: data.name }; // LoginResponse型を返す
        } else {
            throw new Error('ログインに失敗しました');
        }
        
    } catch (e) {
        console.log('エラーが発生しました', e);
        throw e;
    }
}

export async function getPastRate(currencyPair: string, name: string) {
    try {
        const res = await fetch(`${API_BASE_URL}/rate/${name}/details/${currencyPair}`, {
            method: "GET",
        });
        if (!res.ok) {
            const errorBody = await res.text(); // レスポンスボディをテキストで取得
            throw new Error(`エラーが発生しました。ステータス: ${res.status}, メッセージ: ${errorBody}`);
        }
        const data: Rate= await res.json();
        return data;
    } catch (e) {
        console.log('エラーが発生しました', e);
        throw e; // 例外を再スローすることで、呼び出し元でエラーハンドリングができる
    }
};

export async function saveRate(rate:Rate){
    try{
        const res = await fetch(`${API_BASE_URL}/rate`,{
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(rate), // フロントエンドで入力されたデータを送信
        });
        if (!res.ok) {
            const errorBody = await res.text(); // レスポンスボディをテキストで取得
            throw new Error(`エラーが発生しました。ステータス: ${res.status}, メッセージ: ${errorBody}`);
        }
        const data:Rate[]= await res.json();
        return data;
    } catch (e){
        console.log('エラーが発生しました', e);
        throw e;
    }
};

// export async function login(login: Login) {
//     try {
//         const res = await fetch(`${API_BASE_URL}/auth/login`, {
//             method: "POST",
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(login), // フロントエンドで入力されたデータを送信
//         });

//         if (!res.ok) {
//             const errorBody = await res.text(); // エラー時のレスポンスボディを取得
//             throw new Error(`エラーが発生しました。ステータス: ${res.status}, メッセージ: ${errorBody}`);
//         }

//         const data = await res.json(); // ログイン結果を取得
        
//         // ログイン成功時の処理
//         if (data.token && data.name) {
//             console.log('ログイン成功:', data);
            
//             // トークンを localStorage に保存
//             localStorage.setItem('token', data.token);

//             // ログイン状態を管理する場合は、state を更新する
//             return { message: data.message, isLoggedIn: true, name: data.name };
//         } else {
//             throw new Error('ログインに失敗しました');
//         }
        
//     } catch (e) {
//         console.log('エラーが発生しました', e);
//         throw e;
//     }
// };
