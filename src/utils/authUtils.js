import { jwtDecode } from "jwt-decode";

export const getRoleFromToken = (token) => {

    if (!token) {
        return null;
    }

    try {

        const decodedToken = jwtDecode(token);

        console.log("Decoded JWT:", decodedToken);

        return decodedToken.role;

    } catch (error) {

        console.error("Invalid JWT:", error);

        return null;
    }
};