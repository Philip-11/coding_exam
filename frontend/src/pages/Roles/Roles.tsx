import { useEffect, useState } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";

interface Roles{
    id: number;
    role_name: string;
    description: string;
}

function Roles(){
    const [roles, setRoles] = useState<Roles[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const res = await api.get("/roles");
                setRoles(res.data);
            } catch (error: any) {
                console.error(error);
            }
        };

        fetchRoles();
    }, []);

    const deleteRole = async (id: number) => {
        if (!confirm("Are you sure you want to delete this role?")) return;

        try {
            await api.delete(`roles/${id}`);
            setRoles(roles.filter((r) => r.id !== id));
        } catch (error: any) {
            console.error(error);
        }
    }

    return(
        <div>
            <h1>Roles</h1>
            <table>
                <thead>
                    <tr>
                        <th>Role Name</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {roles.map((r) => (
                        <tr key={r.id}>
                            <td>{r.id}</td>
                            <td>{r.role_name}</td>
                            <td>{r.description}</td>
                            <td>
                                <button onClick={() => navigate(`roles/edit/${r.id}`)}>Edit</button>

                                <button onClick={() => deleteRole(r.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Roles;