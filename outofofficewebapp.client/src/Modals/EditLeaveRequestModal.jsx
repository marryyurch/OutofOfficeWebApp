import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Input, Select, Button } from "@chakra-ui/react";
import { updateLeaveRequest, fetchLeaveRequests } from '../services/leaveRequests.js';

const EditLeaveRequestModal = ({ isOpen, onClose, editingLeaveRequest, setEditingLeaveRequest, setLeaveRequests, filter }) => {
    const handleEditChange = (e) => {
        const { name, value } = e.target;
        const parsedValue = ["absenceReasonType", "requestStatusType", "employeeId"].includes(name)
            ? parseInt(value)
            : value;
        setEditingLeaveRequest((prev) => ({
            ...prev,
            [name]: parsedValue,
        }));
    };

    const handleEditSubmit = async () => {
        const response = await updateLeaveRequest(editingLeaveRequest);
        const updatedLeaveRequests = await fetchLeaveRequests(filter);
        setLeaveRequests(updatedLeaveRequests);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Edit Leave Request</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <FormLabel>Employee Id</FormLabel>
                        <Input name="employeeId" value={editingLeaveRequest?.employeeId} onChange={handleEditChange} />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Reason</FormLabel>
                        <Select name="absenceReasonType" value={editingLeaveRequest?.absenceReasonType} onChange={handleEditChange}>
                            <option value="0">Vacation</option>
                            <option value="1">Sick Leave</option>
                            <option value="2">Personal Leave</option>
                            <option value="3">Other</option>
                        </Select>
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Start Date</FormLabel>
                        <Input name="startDate" type="date" value={editingLeaveRequest?.startDate} onChange={handleEditChange} />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>End Date</FormLabel>
                        <Input name="endDate" type="date" value={editingLeaveRequest?.endDate} onChange={handleEditChange} />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Comment</FormLabel>
                        <Input name="comment" value={editingLeaveRequest?.comment} onChange={handleEditChange} />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Status</FormLabel>
                        <Select name="requestStatusType" value={editingLeaveRequest?.requestStatusType} onChange={handleEditChange}>
                            <option value="0">New</option>
                            <option value="1">Submitted</option>
                            <option value="2">Approved</option>
                            <option value="3">Rejected</option>
                            <option value="4">Canceled</option>
                        </Select>
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handleEditSubmit}>
                        Save
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default EditLeaveRequestModal;