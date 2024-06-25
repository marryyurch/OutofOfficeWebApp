import React, { useEffect, useState } from 'react';
import { Box, VStack, HStack, FormControl, FormLabel, Input, Select, Button, Table, Thead, Tbody, Tr, Th, Td, TableContainer, IconButton } from "@chakra-ui/react";
import { MdDelete, MdEdit, MdAdd } from "react-icons/md";
import { fetchApprovalRequests, deleteApprovalRequest, filterApprovalRequests, updateApprovalRequest, addApprovalRequest, approveRequest, rejectRequest } from '../services/approvalRequests';
import EditApprovalRequestModal from "../Modals/EditApprovalRequestModal";
import AddApprovalRequestModal from "../Modals/AddApprovalRequestModal";
import { getRequestStatusType } from '../utilities';

const ApprovalRequestsTable = ({ role }) => {
    const [approvalRequests, setApprovalRequests] = useState([]);
    const [filter, setFilter] = useState({
        search: "",
        sortItem: "",
        sortOrder: "",
    });

    const [filterItem, setFilterItem] = useState("");
    const [itemContent, setItemContent] = useState("");

    const [isEditing, setIsEditing] = useState(false);
    const [editingApprovalRequest, setEditingApprovalRequest] = useState(null);

    const [isAdding, setIsAdding] = useState(false);
    const [newApprovalRequest, setNewApprovalRequest] = useState({
        id: 0,
        approver: 0,
        leaveRequest: 0,
        status: 0,
        comment: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            const approvalRequestsData = await fetchApprovalRequests(filter);
            setApprovalRequests(approvalRequestsData);
        };

        fetchData();
    }, [filter]);

    const handleDelete = async (id) => {
        await deleteApprovalRequest(id);
        setApprovalRequests(approvalRequests.filter(req => req.id !== id));
    };

    const handleEdit = (approvalRequest) => {
        setEditingApprovalRequest(approvalRequest);
        setIsEditing(true);
    };

    const handleFilterSubmit = async () => {
        const filteredApprovalRequests = await filterApprovalRequests(filterItem, itemContent);
        setApprovalRequests(filteredApprovalRequests);
    };

    const handleApproveRequest = async (requestId) => {
        const response = await approveRequest(requestId);
        const updatedApprovalRequests = await fetchApprovalRequests(filter);
        setApprovalRequests(updatedApprovalRequests);
    };

    const handleRejectRequest = async (requestId, comment) => {
        const response = await rejectRequest(requestId, comment);
        const updatedApprovalRequests = await fetchApprovalRequests(filter);
        setApprovalRequests(updatedApprovalRequests);
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" p={4}>
            <VStack spacing={4} align="stretch" width="100%" maxWidth="1200px">
                <HStack spacing={4} width="100%" justify="space-between">
                    <HStack spacing={4}>
                        <FormControl>
                            <FormLabel>Filter Item</FormLabel>
                            <Select value={filterItem} onChange={(e) => setFilterItem(e.target.value)}>
                                <option value="approver">Approver</option>
                                <option value="leaverequest">Leave Request</option>
                                <option value="status">Status</option>
                                <option value="comment">Comment</option>
                            </Select>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Item Content</FormLabel>
                            <Input value={itemContent} onChange={(e) => setItemContent(e.target.value)} />
                        </FormControl>
                        <Button onClick={handleFilterSubmit}>Filter</Button>
                    </HStack>
                </HStack>
                <TableContainer>
                    <Table size="sm" style={{ width: '100%' }}>
                        <Thead>
                            <Tr>
                                <Th isNumeric>Id</Th>
                                <Th>Approver</Th>
                                <Th>Leave Request</Th>
                                <Th>Status</Th>
                                <Th>Comment</Th>
                                <Th>Actions</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {approvalRequests.map((req) => (
                                <Tr key={req.id}>
                                    <Td isNumeric>{req.id}</Td>
                                    <Td>{req.approver}</Td>
                                    <Td>{req.leaveRequest}</Td>
                                    <Td>{getRequestStatusType(req.status)}</Td>
                                    <Td>{req.comment}</Td>
                                    <Td>
                                        <HStack spacing={2}>
                                            {(role === 'hr' || role === 'pm') && (
                                                <>
                                                    <Button
                                                        colorScheme="green"
                                                        onClick={() => handleApproveRequest(req.id)}
                                                    >
                                                        Approve
                                                    </Button>
                                                    <Button
                                                        colorScheme="red"
                                                        onClick={() => handleRejectRequest(req.id, "Rejection Comment")}
                                                    >
                                                        Reject
                                                    </Button>
                                                </>
                                            )}
                                            <IconButton
                                                aria-label="Edit Approval Request"
                                                icon={<MdEdit />}
                                                onClick={() => handleEdit(req)}
                                            />
                                            <IconButton
                                                aria-label="Delete Approval Request"
                                                icon={<MdDelete />}
                                                onClick={() => handleDelete(req.id)}
                                            />
                                        </HStack>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </VStack>

            <EditApprovalRequestModal
                isOpen={isEditing}
                onClose={() => setIsEditing(false)}
                editingApprovalRequest={editingApprovalRequest}
                setEditingApprovalRequest={setEditingApprovalRequest}
                setApprovalRequests={setApprovalRequests}
                filter={filter}
            />

            <AddApprovalRequestModal
                isOpen={isAdding}
                onClose={() => setIsAdding(false)}
                newApprovalRequest={newApprovalRequest}
                setNewApprovalRequest={setNewApprovalRequest}
                setApprovalRequests={setApprovalRequests}
                filter={filter}
            />
        </Box>
    );
};

export default ApprovalRequestsTable;
