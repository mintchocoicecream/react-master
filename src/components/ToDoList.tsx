import {useForm} from "react-hook-form";
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

interface IForm{
    toDo:string;
};

//todo 인터페이스
interface IToDo{
    id: number;
    text: string;
    category: "TO_DO"|"DOING"|"DONE";
};

const toDoState=atom<IToDo[]>({
    key: "toDo",
    default: [],
});

export default function ToDoList() {
    //useRecoilState: value(toDos)와 modifier(setTodos) 함수를 반환한다.
        //setState와 비슷
    const [toDos, setTodos]=useRecoilState(toDoState);

    // const value=useRecoilValue(toDoState); //value는 배열이 됨. (atom으로부터 값을 불러옴)
    // const modFn=useSetRecoilState(toDoState); //atom의 값을 바꿀 수도 있다.
    
    //handleSubmit을 사용할 때 첫번째 매개변수로 데이터가 유효할 때
        //호출되는 다른 함수를 받는다.
    //setValue: submit후에 value 비우기
    const {register, handleSubmit, setValue}=useForm<IForm>();
    const handleValid=({toDo}: IForm)=>{
        setTodos((oldToDos) => [{id:Date.now(), text:toDo, category:"TO_DO"}, ...oldToDos]);
        setValue("toDo", "");
    };
    console.log(toDos);
    return(
        <div>
            <h1>To Dos</h1>
            <hr/>
            <form onSubmit={handleSubmit(handleValid)}>
                <input {...register("toDo", {
                    required: "Please Write a Todo",
                })} 
                placeholder="Write here"/>
                <button>Add</button>
            </form>
            <ul>
                {toDos.map(toDo=> <li key={toDo.id}>{toDo.text}</li>)}
            </ul>
        </div>
    )
};
