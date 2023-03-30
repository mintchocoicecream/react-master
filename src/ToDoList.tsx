import {useForm} from "react-hook-form";

interface IFormData {
    // errors: {
    //     email: {
    //         message: string;
    //     };

    // };
    email: string;
    name: string;
    password: string;
    password1: string;
    extraError?:string;
}

export default function ToDoList() {
    const {register, handleSubmit, formState:{errors}, setError}=useForm<IFormData>({
        defaultValues: {
            email: "@naver.com",
        }
    });

    // react-hook-form이 모든 validation을 다 마쳤을 때만 호출될 것
    const onValid=(data:IFormData)=>{
        if(data.password !== data.password1){
            return setError("password1", {message: "Password are not the same!"});
        };
        //전체 form에 해당되는 에러
        // setError("extraError", {message:"server offline..."});
    };

    // console.log(errors?.email?.message);
    return(
        <div>
            <form style={{display:"flex", flexDirection:"column"}} onSubmit={handleSubmit(onValid)}>
                <input 
                {...register("email", {
                    required: "Email is required", 
                    pattern: {
                    value: /^[A-Za-z0-9._%+-]+@naver.com$/,
                    message: "Only naver.com emails allowed.",
                },
                })} 
                placeholder='Email'/>
                <span style={{ color: errors?.email?.message ? "red" : "" }}>{errors?.email?.message}</span>
                <input {...register("name", {
                    required: "write here", 
                    validate: (value)=>!value.includes("nico")?true:"error message",
                    },
                    )} 
                    placeholder='name'/>
                <span style={{ color: errors?.name?.message ? "red" : "" }}>{errors?.name?.message}</span>
                <input {...register("password", {required:"write here", minLength:10})} placeholder='password'/>
                <span style={{ color: errors?.password?.message ? "red" : "" }}>{errors?.password?.message}</span>
                <input {...register("password1", {
                    required: "Password is required", 
                    minLength:{
                        value: 5,
                        message:"Your password is too short!"
                    },
                    })} placeholder='password check'/>
                <span style={{ color: errors?.password1?.message ? "red" : "" }}>{errors?.password1?.message}</span>
                <button>Add</button>
                <span style={{ backgroundColor: errors?.extraError?.message ? "red" : "" }}>{errors?.extraError?.message}</span>
            </form>
        </div> 
    )
};
