import {useRecoilState, useRecoilValue} from "recoil";
import CreateToDo from "./CreateToDo";
import { Categories, categoryState, toDoSelector} from "../atoms";
import ToDo from "./ToDo";

export default function ToDoList() {
    // const toDos=useRecoilValue(toDoState); //return값은 배열
    // const [toDo, doing, done]=useRecoilValue(toDoSelector);
    const toDos=useRecoilValue(toDoSelector);
    const [category, setCategory]=useRecoilState(categoryState);
    const onInput=(event:React.FormEvent<HTMLSelectElement>)=>{
        // 에러 이유? setCategory 함수는 categories 타입만 받게 되었다.
        // setCategory 함수를 호출할 때, 인자로 타입이 string인 값을 넘기고 있다.
        // 이를 해결하기 위해 as any를 적어줌.
        setCategory(event.currentTarget.value as any);
    };
    return(
        <div>
            <h1>To Dos</h1>
            <hr/>
            <select value={category} onInput={onInput}>
                <option value={Categories.TO_DO}>To Do</option>
                <option value={Categories.DOING}>Doing</option>
                <option value={Categories.DONE}>Done</option>
            </select>
            <CreateToDo />     
            {toDos?.map((toDo) => (
                <ToDo key={toDo.id} {...toDo} />
            ))}
        </div>
    )
};
