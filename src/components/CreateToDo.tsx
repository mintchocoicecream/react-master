import { useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { categoryState, toDoState } from '../atoms';

interface IForm{
    toDo:string;
};

export default function CreateToDo() {
  const setTodos=useSetRecoilState(toDoState);

  //현재 category 얻기
  const category=useRecoilValue(categoryState);

  const {register, handleSubmit, setValue}=useForm<IForm>();
  const handleValid=({toDo}: IForm)=>{
    setTodos((oldToDos) => [
      //에러 이유? category는 그냥 string인데, toDo의 category는 세 종류(TO_DO, DOING, DONE)으로 제한되기 때문.
      //따라서 타입스크립트에 categoryState가 이 세 개 중에 하나일 것이라고 알려주면 해결된다.
        {id:Date.now(), text: toDo, category},
        ...oldToDos,
    ]);
    setValue("toDo", "");
};
  return (
    <form onSubmit={handleSubmit(handleValid)}>
        <input {...register("toDo", {
            required: "Please Write a Todo",
        })} 
        placeholder="Write here"/>
        <button>Add</button>
    </form>
  )
}
