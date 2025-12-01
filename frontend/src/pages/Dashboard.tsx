import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Dashboard(){
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token){
            navigate("/");
        }
    }, []);

    return(
        <>
            <div>
                <h1>Dashboard</h1>
                <p>You're logged in!</p>
                <button onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/");
                }}>Logout</button>
            </div>
        </>
    );
}

export default Dashboard;