import { atom, selector } from "recoil";

//todo 인터페이스
export interface IToDo{
    id: number;
    text: string;
    category: "TO_DO"|"DOING"|"DONE";
};

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
        return [
            toDos.filter((toDo)=>toDo.category === "TO_DO"),
            toDos.filter((toDo)=>toDo.category === "DOING"),
            toDos.filter((toDo)=>toDo.category === "DONE")
        ];
    },
});