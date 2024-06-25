import React, { useEffect, useState } from 'react';
import { Box, VStack, HStack, FormControl, FormLabel, Input, Select, Button, Table, Thead, Tbody, Tr, Th, Td, TableContainer, IconButton } from "@chakra-ui/react";
import { MdDelete, MdEdit, MdAdd } from "react-icons/md";
import { fetchLeaveRequests, deleteLeaveRequest, filterLeaveRequests, updateLeaveRequest, addLeaveRequest, submitLeaveRequest, cancelLeaveRequest } from '../services/leaveRequests';
import EditLeaveRequestModal from '../Modals/EditLeaveRequestModal';
import AddLeaveRequestModal from '../Modals/AddLeaveRequestModal';
import { getAbsenceReasonType, getRequestStatusType } from '../utilities';

const LeaveRequestsTable = ({ role }) => {
    const [leaveRequests, setLeaveRequests] = useState([]);
    const [filter, setFilter] = useState({
        search: "",
        sortItem: "",
        sortOrder: "",
    });

    const [filterItem, setFilterItem] = useState("");
    const [itemContent, setItemContent] = useState("");

    const [isEditing, setIsEditing] = useState(false);
    const [editingLeaveRequest, setEditingLeaveRequest] = useState(null);

    const [isAdding, setIsAdding] = useState(false);
    const [newLeaveRequest, setNewLeaveRequest] = useState({
        id: 0,
        employeeId: 0,
        absenceReasonType: 0,
        startDate: '',
        endDate: '',
        comment: '',
        requestStatusType: 0,
    });

    useEffect(() => {
        const fetchData = async () => {
            const leaveRequestsData = await fetchLeaveRequests(filter);
            setLeaveRequests(leaveRequestsData);
        };

        fetchData();
    }, [filter]);

    const handleDelete = async (id) => {
        await deleteLeaveRequest(id);
        setLeaveRequests(leaveRequests.filter(req => req.id !== id));
    };

    const handleEdit = (leaveRequest) => {
        setEditingLeaveRequest(leaveRequest);
        setIsEditing(true);
    };

    const handleFilterSubmit = async () => {
        const filteredLeaveRequests = await filterLeaveRequests(filterItem, itemContent);
        setLeaveRequests(filteredLeaveRequests);
    };

    const handleSubmitRequest = async (requestId, employeeId) => {
        const response = await submitLeaveRequest(requestId, employeeId);
        console.log('Submit request response:', response);
        const updatedLeaveRequests = await fetchLeaveRequests(filter);
        setLeaveRequests(updatedLeaveRequests);
    };

    const handleCancelRequest = async (requestId) => {
        const response = await cancelLeaveRequest(requestId);
        console.log('Cancel request response:', response);
        const updatedLeaveRequests = await fetchLeaveRequests(filter);
        setLeaveRequests(updatedLeaveRequests);
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" p={4}>
            <VStack spacing={4} align="stretch" width="100%" maxWidth="1200px">
                <HStack spacing={4} width="100%" justify="space-between">
                    <HStack spacing={4}>
                        <FormControl>
                            <FormLabel>Filter Item</FormLabel>
                            <Select value={filterItem} onChange={(e) => setFilterItem(e.target.value)}>
                                <option value="reason">Reason</option>
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
                    {role === 'emp' && (
                        <Button leftIcon={<MdAdd />} colorScheme="teal" onClick={() => setIsAdding(true)}>
                            Add Leave Request
                        </Button>
                    )}
                </HStack>
                <TableContainer>
                    <Table size="sm" style={{ width: '100%' }}>
                        <Thead>
                            <Tr>
                                <Th isNumeric>Id</Th>
                                <Th>Employee Id</Th>
                                <Th>Reason</Th>
                                <Th>Start Date</Th>
                                <Th>End Date</Th>
                                <Th>Comment</Th>
                                <Th>Status</Th>
                                <Th>Actions</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {leaveRequests.map((req) => (
                                <Tr key={req.id}>
                                    <Td isNumeric>{req.id}</Td>
                                    <Td>{req.employeeId}</Td>
                                    <Td>{getAbsenceReasonType(req.absenceReasonType)}</Td>
                                    <Td>{req.startDate}</Td>
                                    <Td>{req.endDate}</Td>
                                    <Td>{req.comment}</Td>
                                    <Td>{getRequestStatusType(req.requestStatusType)}</Td>
                                    <Td>
                                        <HStack spacing={2}>
                                            {(role === 'hr' || role === 'pm' || role === 'emp') && (
                                                <IconButton
                                                    aria-label="Edit Leave Request"
                                                    icon={<MdEdit />}
                                                    onClick={() => handleEdit(req)}
                                                />
                                            )}
                                            {role === 'emp' && (
                                                <>
                                                    <Button
                                                        colorScheme="blue"
                                                        onClick={() => handleSubmitRequest(req.id, req.employeeId)}
                                                    >
                                                        Submit
                                                    </Button>
                                                    <Button
                                                        colorScheme="red"
                                                        onClick={() => handleCancelRequest(req.id)}
                                                    >
                                                        Cancel
                                                    </Button>
                                                </>
                                            )}
                                            {(role === 'hr' || role === 'pm') && (
                                                <IconButton
                                                    aria-label="Delete Leave Request"
                                                    icon={<MdDelete />}
                                                    onClick={() => handleDelete(req.id)}
                                                />
                                            )}
                                        </HStack>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </VStack>

            <EditLeaveRequestModal
                isOpen={isEditing}
                onClose={() => setIsEditing(false)}
                editingLeaveRequest={editingLeaveRequest}
                setEditingLeaveRequest={setEditingLeaveRequest}
                setLeaveRequests={setLeaveRequests}
                filter={filter}
            />

            <AddLeaveRequestModal
                isOpen={isAdding}
                onClose={() => setIsAdding(false)}
                newLeaveRequest={newLeaveRequest}
                setNewLeaveRequest={setNewLeaveRequest}
                setLeaveRequests={setLeaveRequests}
                filter={filter}
            />
        </Box>
    );
};

export default LeaveRequestsTable;
