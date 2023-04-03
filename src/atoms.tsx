import { atom } from "recoil";

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