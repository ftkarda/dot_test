import { Navigate } from "react-router-dom";

export default function RequireAuth({ children }) {
    const accessToken = localStorage.getItem('access_token')
    if (!accessToken) {
        return <Navigate to="/login" replace />
    }
    return children
}