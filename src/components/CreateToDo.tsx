import React from 'react'
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { toDoState } from '../atoms';

interface IForm{
    toDo:string;
};

export default function CreateToDo() {
  const setTodos=useSetRecoilState(toDoState);
  const {register, handleSubmit, setValue}=useForm<IForm>();
  const handleValid=({toDo}: IForm)=>{
    setTodos((oldToDos) => [
        {id:Date.now(), text: toDo, category:"TO_DO"},
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
