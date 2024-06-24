import axios from "axios";

export const fetchRole = async (email) => {
    try {
        var response = await axios.get("https://localhost:5173/api/Employees/check-employee-role", { 
            params: { email } 
        });
        
        return response.data;
    } catch (e) {
        console.error(e);
    }
};