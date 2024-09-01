import { Item } from "./items.model";
import { User } from "./users.model";

const API_BASE_URL = import.meta.env.REACT_APP_API_URL || 'http://localhost:4000';

export async function findAll(){
    try{
        const res = await fetch('${API_BASE_URL}/items',{
            method:"GET",
        });
        if (!res.ok) {
            throw new Error(`エラーが発生しました。ステータス:${res.status}`);
        }
        const data:Item[]= await res.json();
        return data;
    } catch (e){
        console.log('エラーが発生しました', e);
    }
};

export async function create(item:Item){
    try{
        const res = await fetch('${API_BASE_URL}/items',{
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(item), // フロントエンドで入力されたデータを送信
        });
        if (!res.ok) {
            throw new Error(`エラーが発生しました。ステータス:${res.status}`);
        }
        const data:Item[]= await res.json();
        return data;
    } catch (e){
        console.log('エラーが発生しました', e);
    }
};

export async function signUp(user:User){
    try{
        const res = await fetch('${API_BASE_URL}/signup',{
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user), // フロントエンドで入力されたデータを送信
        });
        if (!res.ok) {
            throw new Error(`エラーが発生しました。ステータス:${res.status}`);
        }
        const data:User[]= await res.json();
        return data;
    } catch (e){
        console.log('エラーが発生しました', e);
    }
};