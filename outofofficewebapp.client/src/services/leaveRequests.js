import axios from 'axios';

const url = 'https://localhost:5173/api/LeaveRequests';

export const fetchLeaveRequests = async (filter) => {
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
        console.error("Error fetching leave requests:", error);
        return [];
    }
};

export const deleteLeaveRequest = async (id) => {
    try {
        await axios.delete(`${url}/delete-leave-reuest?id=${id}`);
    } catch (error) {
        console.error("Error deleting leave request:", error);
    }
};

export const filterLeaveRequests = async (filterItem, itemContent) => {
    try {
        const defaultFilterItem = 'reason';
        const response = await axios.get(`${url}/filter-leave-request`, {
            params: {
                filterItem: filterItem || defaultFilterItem,
                itemContent: itemContent || ''
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error filtering leave requests:", error);
        return [];
    }
};

export const addLeaveRequest = async (leaveRequest) => {
    try {
        const response = await axios.post(`${url}/add-leave-request`, leaveRequest);
        console.log('Server response:', response.data);
        return response.data;
    } catch (error) {
        console.error("Error adding leave request:", error);
    }
};

export const updateLeaveRequest = async (leaveRequest) => {
    try {
        const response = await axios.post(`${url}/update-leave-request`, leaveRequest);
        console.log('Server response:', response.data);
        return response.data;
    } catch (error) {
        console.error("Error updating leave request:", error);
    }
};

export const submitLeaveRequest = async (requestId, employeeId) => {
    try {
        const response = await axios.post(`${url}/submit-request`, null, {
            params: {
                requestId: requestId,
                employeeId: employeeId
            }
        });
        console.log('Submit request response:', response.data);
        return response.data;
    } catch (error) {
        console.error("Error submitting leave request:", error);
    }
};

export const cancelLeaveRequest = async (requestId) => {
    try {
        const response = await axios.post(`${url}/cancel-request`, null, {
            params: {
                requestId: requestId
            }
        });
        console.log('Cancel request response:', response.data);
        return response.data;
    } catch (error) {
        console.error("Error canceling leave request:", error);
    }
};
