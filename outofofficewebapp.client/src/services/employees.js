import axios from "axios";

export const fetchEmployees = async (filter) => {
    try {
        var response = await axios.get("https://localhost:5173/api/Employees", { 
            params: {
                search: filter?.search,
                sortItem: filter?.sortItem,
                sortOrder: filter?.sortOrder
            } });
        
        return response.data;
    } catch (e) {
        console.error(e);
    }
};