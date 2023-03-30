import {useForm} from "react-hook-form";

interface IForm{
    toDo:string;
};

export default function ToDoList() {
    //handleSubmit을 사용할 때 첫번째 매개변수로 데이터가 유효할 때
        //호출되는 다른 함수를 받는다.
    //setValue: submit후에 value 비우기
    const {
        register, handleSubmit, setValue
    }=useForm<IForm>();
    const handleValid=(data: IForm)=>{
        console.log("add to do", data.toDo);
        setValue("toDo", "");
    }
    return(
        <div>
            <form onSubmit={handleSubmit(handleValid)}>
                <input {...register("toDo", {
                    required: "Please Write a Todo",
                })} 
                placeholder="Write here"/>
                <button>Add</button>
            </form>
        </div>
    )
};
