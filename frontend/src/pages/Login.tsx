import { useState } from "react";

function Login(){
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        let valid = true;

        if (!email){
            setEmailError("Email is required");
            valid = false;
        }
        
        if (!password){
            setPasswordError("Password is required");
            valid = false;
        }else if (password.length < 8){
            setPasswordError("Password must be at least 8 characters");
            valid = false;
        }

        if (!valid) return;

        
        
    }
 
    return (
        <>
            <div>
                <form action="" onSubmit={handleSubmit}>
                    <label htmlFor="">Email Adress</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>

                    <label htmlFor="">Password</label>
                    <input type="text" value={password} onChange={(e) => setPassword(e.target.value)}/>

                    <button type="submit">Login</button>
                </form>
            </div>
        </>
    )
}


export default Login;