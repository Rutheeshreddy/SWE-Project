import { useParams } from "react-router-dom";
import { useEffect } from "react";

const Redirect = () => 
{   const {token} = useParams();
    useEffect(()=> {
        
        sessionStorage.setItem("token",token);
        window.location.href = import.meta.env.VITE_ADMIN_FRONT
        }         
            ,[])
}

export default Redirect;