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

export const fetchAllEmployees = async () => {
    try {
        const response = await axios.get('https://localhost:5173/api/Employees');
        return response.data;
    } catch (error) {
        console.error("Error fetching all employees:", error);
        return [];
    }
};

export const deleteEmployee = async (id) => {
    try {
        await axios.delete(`https://localhost:5173/api/Employees/delete-employee?id=${id}`);
    } catch (error) {
        console.error("Error deleting employee:", error);
    }
};

export const updateEmployee = async (employeeData, offBalance, photo) => {
    try {
        const response = await axios.post('https://localhost:5173/api/Employees/update-employee', {
            Id: employeeData.id,
            FullName: employeeData.fullName,
            Division: employeeData.subdivisionType,
            Position: employeeData.positionType,
            Status: employeeData.statusType,
            partner: employeeData.peoplePartner
        }, {
            params: {
                offBalance: offBalance,
                photo: photo || null
            }
        });
        console.log('Server response:', response.data);
        return response.data;
    } catch (error) {
        console.error("Error updating employee:", error);
    }
};

export const filterEmployees = async (filterItem, itemContent) => {
    try {
        const response = await axios.get('https://localhost:5173/api/Employees/filter-employee', {
            params: {
                filterItem: filterItem,
                itemContent: itemContent
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error filtering employees:", error);
    }
};

export const addEmployee = async (employeeData) => {
    try {
        const response = await axios.post('https://localhost:5173/api/Employees/add-employee', {
            Id: employeeData.id,
            FullName: employeeData.fullName,
            Division: employeeData.subdivisionType,
            Position: employeeData.positionType,
            Status: employeeData.statusType,
            partner: employeeData.peoplePartner
        });
        console.log('Server response:', response.data);
        return response.data;
    } catch (error) {
        console.error("Error adding employee:", error);
    }
};

