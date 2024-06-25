import axios from 'axios';

const url = 'https://localhost:5173/api/ApprovalRequests';

export const fetchApprovalRequests = async (filter) => {
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
        console.error("Error fetching approval requests:", error);
        return [];
    }
};

export const deleteApprovalRequest = async (id) => {
    try {
        await axios.delete(`${url}/delete-approval-request?id=${id}`);
    } catch (error) {
        console.error("Error deleting approval request:", error);
    }
};

export const filterApprovalRequests = async (filterItem, itemContent) => {
    try {
        const response = await axios.get(`${url}/filter-approval-request`, {
            params: {
                filterItem: filterItem,
                itemContent: itemContent
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error filtering approval requests:", error);
        return [];
    }
};

export const addApprovalRequest = async (approvalRequest) => {
    try {
        const response = await axios.post(`${url}/add-approval-request`, approvalRequest);
        return response.data;
    } catch (error) {
        console.error("Error adding approval request:", error);
    }
};

export const updateApprovalRequest = async (approvalRequest) => {
    try {
        const response = await axios.post(`${url}/update-approval-request`, approvalRequest);
        return response.data;
    } catch (error) {
        console.error("Error updating approval request:", error);
    }
};

export const approveRequest = async (requestId) => {
    try {
        const response = await axios.post(`${url}/approve-request`, null, {
            params: {
                requestId: requestId
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error approving request:", error);
    }
};

export const rejectRequest = async (requestId, comment) => {
    try {
        const response = await axios.post(`${url}/reject-request`, null, {
            params: {
                requestId: requestId,
                comment: comment
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error rejecting request:", error);
    }
};
