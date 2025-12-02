import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";


function EditUsers(){
    const [fullName, setFullName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [nominatedPass, setNominatedPass] = useState<string>("");
    const [confirmPass, setConfirmPass] = useState<string>("");
    const [roleId, setRoleId] = useState<number>(0);

    const [fullNameError, setFullNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [nominatedPassError, setNominatedPassError] = useState("");
    const [confirmPassError, setConfirmPassError] = useState("");
    const [roleError, setRoleError] = useState("");

    const navigate = useNavigate();
    const { id } = useParams(); 

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await api.get(`/users/${id}`);
                const user = res.data;

                setFullName(user.full_name);
                setEmail(user.email_address);
                setRoleId(user.role_id);
            } catch (error: any) {
                console.error(error);
            }
        }

        fetchUser();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setFullNameError("");
        setEmailError("");
        setNominatedPassError("");
        setConfirmPassError("");
        setRoleError("");

        let valid = true;
        if (!fullName){
            setFullNameError("Full name is required");
            valid = false;
        }

        if(!email){
            setEmailError("Email is required");
            valid = false;
        }

        if (nominatedPass || confirmPass){
            if (nominatedPass.length < 8){
                setNominatedPassError("Password must be at least 8 characters");
                valid = false;
            }

            if (confirmPass !== nominatedPass){
                setConfirmPassError("Password must be the same");
                valid = false;
            }
        }

        if(roleId === 0){
            setRoleError("Role is required")
            valid = false;
        }

        if(!valid) return

        try {
            await api.put(`/users/{$id}`, {
                full_name: fullName,
                email_address: email,
                nominated_pass: nominatedPass || undefined,
                confirmed_pass: confirmPass || undefined,
                role_id: roleId,
            });

            navigate("/users");
        } catch (error: any) {
            if (error.response && error.response.status === 422){
                const errors = error.response.data.errors;
                if (errors.full_name){
                    setFullNameError(errors.full_name[0]);
                }
                if (errors.email_address){
                    setEmailError(errors.email_address[0]);
                }
                if (errors.nominated_pass){
                    setNominatedPassError(errors.nominated_pass[0]);
                }
                if (errors.confirmed_pass){
                    setNominatedPassError(errors.confirmed_pass[0]);
                }
                if (errors.role_id){
                    setRoleError(errors.role_id[0]);
                }
            } else {
                console.error(error);
            }
        }
    }

    return(
        <div>
            <h1>Edit User</h1>
            <form action="" onSubmit={handleSubmit}>
                <label>Full Name</label>
                <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)}/> <br />
                {fullNameError && <p style={{ color: "red" }}>{fullNameError}</p>}

                <label>Email Address</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /> <br />
                {emailError && <p style={{ color: "red" }}>{emailError}</p>}

                <label>Nominated Password</label>
                <input type="password" value={nominatedPass} onChange={(e) => setNominatedPass(e.target.value)} /> <br />
                {nominatedPassError && <p style={{ color: "red" }}>{nominatedPassError}</p>}

                <label>Confirm Password</label>
                <input type="password" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} /> <br />
                {confirmPassError && <p style={{ color: "red" }}>{confirmPassError}</p>}

                <label>Role</label>
                <select value={roleId} onChange={(e) => setRoleId(Number(e.target.value))}> <br />
                    <option value={0}>Select a role</option>
                    <option value={1}>Admin</option>
                    <option value={2}>User</option>
                </select>
                {roleError && <p style={{ color: "red" }}>{roleError}</p>}

                <button type="submit">Update User</button>

                <button onClick={() => {
                    navigate("/dashboard");
                }} type="button">Back to dashboard</button>


            </form>
        </div>
    );
}

export default EditUsers;