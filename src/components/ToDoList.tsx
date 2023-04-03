import {useRecoilState, useRecoilValue} from "recoil";
import CreateToDo from "./CreateToDo";
import { categoryState, toDoSelector} from "../atoms";
import ToDo from "./ToDo";

export default function ToDoList() {
    // const toDos=useRecoilValue(toDoState); //return값은 배열
    // const [toDo, doing, done]=useRecoilValue(toDoSelector);
    const toDos=useRecoilValue(toDoSelector);
    const [category, setCategory]=useRecoilState(categoryState);
    const onInput=(event:React.FormEvent<HTMLSelectElement>)=>{
        setCategory(event.currentTarget.value);
    };
    return(
        <div>
            <h1>To Dos</h1>
            <hr/>
            <select value={category} onInput={onInput}>
                <option value="TO_DO">To Do</option>
                <option value="DOING">Doing</option>
                <option value="DONE">Done</option>
            </select>
            <CreateToDo />     
            {toDos?.map((toDo) => (
                <ToDo key={toDo.id} {...toDo} />
            ))}
        </div>
    )
};
