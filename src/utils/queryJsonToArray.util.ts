import {QueryBuilder} from "objection";
import Tag from "../models/tag.model";
import Category from "../models/category.model";


export default function queryJsonToIdArray(query : Tag[] | Category[]){
    let dataObj = JSON.parse(JSON.stringify(query))
    let newArr : number[] = []
    for(let i = 0; i < dataObj.length; i++){
        newArr.push(dataObj[i]['id'])
    }
    return newArr
}