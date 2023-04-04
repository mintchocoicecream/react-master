import { useSetRecoilState } from 'recoil';
import { Categories, IToDo, toDoState } from '../atoms'

//원소 배열 변경 개념
// const color=["red", "black", "pink", "white"];
// const target=1;
// const front=["red"]; //color.slice(0,1)
// const back=["pink", "white"]; //color.slice(target+1)
// // const finalPart=[...front, "blue", ...back];
// const finalPart=[...color.slice(0, target), "blue", ...color.slice(target+1)];

export default function ToDo({text, category, id}:IToDo) {
const setToDos=useSetRecoilState(toDoState);
const onClick=(event:React.MouseEvent<HTMLButtonElement>)=>{
   const {
    currentTarget:{name},
    }=event;
    setToDos((oldToDos)=>{
        const targetIndex=oldToDos.findIndex((toDo)=>toDo.id===id);
        // const oldToDo=oldToDos[targetIndex];
        const newToDo={text, id, category:name as any};
        // console.log(oldToDo, newToDo);
        return [...oldToDos.slice(0, targetIndex), newToDo, ...oldToDos.slice(targetIndex+1)];
    });
};
return (
    <li>
        <span>{text}</span>
        {category !==Categories.DOING && <button name={Categories.DOING} onClick={onClick}>Doing</button>}
        {category !==Categories.TO_DO && <button name={Categories.TO_DO} onClick={onClick}>ToDo</button>}
        {category !==Categories.DONE && <button name={Categories.DONE} onClick={onClick}>Done</button>}
    </li>
  )
}
