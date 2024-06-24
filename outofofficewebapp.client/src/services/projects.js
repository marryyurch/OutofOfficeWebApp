import axios from "axios";

export const fetchProjects = async () => {
    try {
        const response = await axios.get('https://localhost:5173/api/Projects');
        return response.data;
    } catch (error) {
        console.error("Error fetching projects:", error);
        return [];
    }
};


