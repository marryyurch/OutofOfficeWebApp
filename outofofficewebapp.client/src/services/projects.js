import axios from "axios";

const url = 'https://localhost:5173/api/Projects';

export const fetchProjects = async (filter) => {
    try {
        const response = await axios.get(url, {
            params: {
                search: filter?.search,
                sortItem: filter?.sortItem,
                sortOrder: filter?.sortOrder
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching projects:", error);
        return [];
    }
};

export const addProject = async (project) => {
    try {
        const response = await axios.post(`${url}/add-project`, project);
        return response.data;
    } catch (error) {
        console.error("Error adding project:", error);
    }
};

export const updateProject = async (project) => {
    try {
        const response = await axios.post(`${url}/update-project`, project);
        return response.data;
    } catch (error) {
        console.error("Error updating project:", error);
    }
};

export const deleteProject = async (id) => {
    try {
        await axios.delete(`${url}/delete-project?id=${id}`);
    } catch (error) {
        console.error("Error deleting project:", error);
    }
};

export const filterProjects = async (filterItem, itemContent) => {
    try {
        const response = await axios.get(`${url}/filter-project`, {
            params: {
                filterItem: filterItem,
                itemContent: itemContent
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error filtering projects:", error);
        return [];
    }
};

export const fetchProjectsToListInModal = async () => {
    try {
        const response = await axios.get('https://localhost:5173/api/Projects');
        return response.data;
    } catch (error) {
        console.error("Error fetching projects:", error);
        return [];
    }
};

export const fetchEmployees = async () => {
    try {
        const response = await axios.get('https://localhost:5173/api/Employees');
        return response.data;
    } catch (error) {
        console.error("Error fetching employees:", error);
        return [];
    }
};
