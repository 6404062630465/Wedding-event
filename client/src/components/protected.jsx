import axios from "axios";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const Protected = ({ element }) => {
    const [state, setState] = useState(false);
    const [load, setLoad] = useState(true);
    useEffect(() => {
        const authen = async () => {
            try {
                await axios.get("http://localhost:5000/authen", {
                    withCredentials: true, 
                })
                setState(true)
            }
            catch {
                setState(false)
            }
            setLoad(false)
        }
        authen()
    }, [])

    if (load) {
        return <span>hi loading</span>
    }

    return (
        state ? element : <Navigate to="/"></Navigate>
    );
}

export default Protected;
