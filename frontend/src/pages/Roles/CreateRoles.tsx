import { useEffect, useState } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";


function CreateRoles(){
    const [roleName, setRoleName] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const [roleNameError, setRoleNameError] = useState("");
    const [descriptionError, setDescriptionError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token){
            navigate("/");
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setRoleNameError("");
        setDescriptionError("");

        let valid = true;
        if(!roleName){
            setRoleNameError("Role name is required");
            valid = false;
        }

        if(!description){
            setDescriptionError("Description is required");
            valid = false;
        }

        if(!valid) return

        try {
            await api.post("/roles", {
                rolename: roleName,
                description: description,
            });
            navigate("/roles");
        } catch (error: any) {
            if (error.response && error.response.status === 422){
                const errors = error.response.data.errors;
                if (errors.rolename){
                    setRoleNameError(errors.rolename[0]);
                }
                if (errors.description){
                    setDescriptionError(errors.description[0]);
                }
            }else {
                console.error(error);
            }
        }
    }

    return(
        <div>
            <h1>Create Role</h1>

            <form onSubmit={handleSubmit} >
                <label>Role Name</label>
                <input type="text" value={roleName} onChange={(e) => setRoleName(e.target.value)}/> <br />
                { roleNameError && <p style={{ color: "red" }}>{roleNameError}</p>}

                <label>Description</label>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} /> <br />
                { descriptionError && <p style={{ color: "red" }}>{descriptionError}</p>}
                
                <button type="submit">Create</button>

                <button onClick={() => {
                    navigate("/dashboard");
                }}>Back to dashboard</button>
            </form>
        </div>
    )
}   


export default CreateRoles;