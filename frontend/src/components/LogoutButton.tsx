import { useNavigate } from "react-router-dom";


function LogoutButton(){
    const navigate = useNavigate();

    return(
        <button onClick={() => {
            localStorage.removeItem("token");
            navigate("/");
        }}>Logout</button>
    );
}

export default LogoutButton;