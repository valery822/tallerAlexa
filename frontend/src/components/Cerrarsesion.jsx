import { useNavigate } from "react-router-dom";
function Cerrarsesion() {
        const navigate = useNavigate();
        const Logout = () => {
            localStorage.removeItem("token");
            navigate("/");
        };

    return (
        <div>
            <button onClick={Logout}>Cerrar Sesión</button>
        </div>
    );
}

export default Cerrarsesion;