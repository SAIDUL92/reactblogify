import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function Logout() {
    const { setAuth } = useAuth()
    const navigate = useNavigate();
    const handleLogout = () => {
        setAuth({})
        navigate('/login')
    }
    return (
        <Link to='/login' onClick={handleLogout}>Logout</Link>
    )
}