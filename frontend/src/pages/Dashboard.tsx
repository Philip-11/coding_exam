import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import api from "../api/api";
import LogoutButton from "../components/LogoutButton";

function Dashboard(){
    const navigate = useNavigate();
    const [fullName, setFullName] = useState<string>("");

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token){
            navigate("/");
        }

        const fetchName = async () => {
            try {
                const response = await api.get("/user");
                setFullName(response.data.full_name);
            } catch (error: any) {
                console.error(error);
                navigate("/");
            }
        };

        fetchName();
    }, []);

    return(
        <>
            <div>
                <h1>Dashboard</h1>
                <p>You're logged in!</p>
                <p>Welcome, {fullName || "loading..."} </p>
                <LogoutButton />

                <button onClick={() => {
                    navigate("/users");
                }}>Users</button>
            </div>
        </>
    );
}

export default Dashboard;