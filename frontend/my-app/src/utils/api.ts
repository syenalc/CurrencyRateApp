import { Item } from "./items.model";

export async function findAll(){
    try{
        const res = await fetch('http://localhost:4000/items',{
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