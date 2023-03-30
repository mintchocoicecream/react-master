import {useState} from 'react';
import {useForm} from "react-hook-form";

// export default function ToDoList() {
//   const [todo, setTodo]=useState("");
//   const onChange=(event:React.FormEvent<HTMLInputElement>)=>{
//     const {
//         currentTarget: {value},
//     } = event;
//     setTodo(value);
//   };

//   const onSubmit=(event:React.FormEvent<HTMLFormElement>)=>{
//     event.preventDefault();
//     console.log(todo);
//   };
//   return (
//     <div>
//         <form onSubmit={onSubmit}>
//             <input onChange={onChange} value={todo} placeholder='Write a to do'/>
//             <button>Add</button>
//         </form>
//     </div>
//   )
// };

export default function ToDoList() {
    const {register, watch}=useForm();
    console.log(watch());
    return(
        <div>
            <form>
                <input {...register("toDo")} placeholder='Write a to do'/>
                <button>Add</button>
            </form>
        </div> 
    )
};
