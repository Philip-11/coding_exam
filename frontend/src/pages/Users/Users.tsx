import { useEffect, useState } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../../components/LogoutButton";

interface User{
    id: number;
    full_name: string;
    email_address: string;
    role_id: string;
}

function Users(){
    const[users, setUsers] = useState<User[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token){
            navigate("/");
        }

        const fetchUsers = async () => {
        try {
            const res = await api.get("/users");
            setUsers(res.data);
        } catch (error: any) {
            console.error(error)
            navigate("/");
        }
    };

        fetchUsers();
    }, []);

    return(
        <>
            <div>
                <h1>Users</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u) => (
                            <tr key={u.id}>
                                <td>{u.full_name}</td>
                                <td>{u.email_address}</td>
                                <td>{u.role_id}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <button onClick={() => {
                navigate("/create/users");
            }}>Create</button>

            <LogoutButton />
        </>
    );
}

export default Users;