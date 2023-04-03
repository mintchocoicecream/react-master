import {useRecoilValue} from "recoil";
import CreateToDo from "./CreateToDo";
import { toDoSelector, toDoState } from "../atoms";
import ToDo from "./ToDo";

export default function ToDoList() {
    // const toDos=useRecoilValue(toDoState); //return값은 배열
    const [toDo, doing, done]=useRecoilValue(toDoSelector);
    // const selectorOuput=useRecoilValue(toDoSelector);

    // console.log(toDos);
    return(
        <div>
            <h1>To Dos</h1>
            <hr/>
            <CreateToDo />
            <h2>To Do</h2>
            <ul>
                {toDo.map((toDo)=> <ToDo key={toDo.id} {...toDo}/>)}
            </ul>
            <hr/>
            <h2>Doing</h2>
            <ul>
                {doing.map((toDo)=> <ToDo key={toDo.id} {...toDo}/>)}
            </ul>
            <hr/>
            <h2>Done</h2>
            <ul>
                {done.map((toDo)=> <ToDo key={toDo.id} {...toDo}/>)}
            </ul>
            <hr/>
        </div>
    )
};
