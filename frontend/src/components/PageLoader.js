import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Loader from "./Loader";

function PageLoader() {
    const location = useLocation();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true); 
        
        const timer = setTimeout(() => {
            setLoading(false); 
        }, 1000);

        return () => clearTimeout(timer); 
    }, [location]);

    return loading ? <Loader /> : null;
}

export default PageLoader;
