import { useState } from "react";
import api from "../api/api";
import setAuthToken from "../api/setAuthToken";
import { useNavigate } from "react-router-dom";

function Login(){
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setEmailError("");
        setPasswordError("");

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

        try {
            const response = await api.post("/login", {
                "email_address": email,
                "nominated_pass": password,
            });

            const token = response.data.token;
            localStorage.setItem("token", token);

            setAuthToken(token);
            navigate("/dashboard");
        } catch (error: any) {
            if (error.response && error.response.status === 401){
                setPasswordError("Invalid credentials");
            } else {
                console.error(error);
            }
        }
        
    }
 
    return (
        <>
            <div>
                <form action="" onSubmit={handleSubmit}>
                    <label htmlFor="">Email Adress</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    {emailError && <p style={{ color: "red" }}>{ emailError }</p>}

                    <label htmlFor="">Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    {passwordError && <p style={{ color: "red" }}>{ passwordError }</p>}


                    <button type="submit">Login</button>
                </form>
            </div>
        </>
    )
}


export default Login;