import { atom, selector } from "recoil";

// type categories = "TO_DO"|"DOING"|"DONE";
// enum을 지정하면 이제 직접 "TO_DO"나 "DOING"..을 쓰는 일은 없을 것.
export enum Categories {
    "TO_DO"="TO_DO",
    "DOING"="DOING",
    "DONE"="DONE",
};

//todo 인터페이스
export interface IToDo{
    id: number;
    text: string;
    category: Categories;
};

export const categoryState=atom<Categories>({
    key: "category",
    // default: "TO_DO",
    default: Categories.TO_DO,
});

export const toDoState=atom<IToDo[]>({
    key: "toDo",
    default: [],
});

export const toDoSelector=selector({
    key: "toDoSelector",
    get: ({get})=> {
        //get function이 있어야 atom을 받을 수 있다.
        const toDos=get(toDoState);
        //위 selector가 이 atom을 보고 있다. atom이 변하면, selector도 변할 것
        const category=get(categoryState);
        return toDos.filter((toDo)=>toDo.category===category);
    },
});