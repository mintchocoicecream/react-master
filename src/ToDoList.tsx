import {useForm} from "react-hook-form";



export default function ToDoList() {
    const {register, handleSubmit, formState}=useForm();
    // react-hook-form이 모든 validation을 다 마쳤을 때만 호출될 것
    const onValid=(data:any)=>{
        console.log(data)
    };
    console.log(formState.errors);
    return(
        <div>
            <form style={{display:"flex", flexDirection:"column"}} onSubmit={handleSubmit(onValid)}>
                <input {...register("email", {required: true})} placeholder='Email'/>
                <input {...register("name", {required: true, minLength:5})} placeholder='name'/>
                <input {...register("password", {required: true, minLength:10})} placeholder='password'/>
                <input {...register("password1", {
                    required: "Password is required", 
                    minLength:{
                        value: 5,
                        message:"Your password is too short!"
                    },
                    })} placeholder='password check'/>
                <button>Add</button>
            </form>
        </div> 
    )
};
