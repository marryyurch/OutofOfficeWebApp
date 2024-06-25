import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Input, Select, Button } from "@chakra-ui/react";
import { addLeaveRequest, fetchLeaveRequests } from '../services/leaveRequests.js';

const AddLeaveRequestModal = ({ isOpen, onClose, newLeaveRequest, setNewLeaveRequest, setLeaveRequests, filter }) => {
    const handleAddChange = (e) => {
        const { name, value } = e.target;
        const parsedValue = ["absenceReasonType", "requestStatusType", "employeeId"].includes(name)
            ? parseInt(value)
            : value;
        setNewLeaveRequest((prev) => ({
            ...prev,
            [name]: parsedValue,
        }));
    };

    const handleAddSubmit = async () => {
        const response = await addLeaveRequest(newLeaveRequest);
        const updatedLeaveRequests = await fetchLeaveRequests(filter);
        setLeaveRequests(updatedLeaveRequests);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add Leave Request</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <FormLabel>Employee Id</FormLabel>
                        <Input name="employeeId" value={newLeaveRequest?.employeeId} onChange={handleAddChange} />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Reason</FormLabel>
                        <Select name="absenceReasonType" value={newLeaveRequest?.absenceReasonType} onChange={handleAddChange}>
                            <option value="0">Vacation</option>
                            <option value="1">Sick Leave</option>
                            <option value="2">Unpaid Leave</option>
                            <option value="3">Other</option>
                        </Select>
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Start Date</FormLabel>
                        <Input name="startDate" type="date" value={newLeaveRequest?.startDate} onChange={handleAddChange} />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>End Date</FormLabel>
                        <Input name="endDate" type="date" value={newLeaveRequest?.endDate} onChange={handleAddChange} />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Comment</FormLabel>
                        <Input name="comment" value={newLeaveRequest?.comment} onChange={handleAddChange} />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Status</FormLabel>
                        <Select name="requestStatusType" value={newLeaveRequest?.requestStatusType} onChange={handleAddChange}>
                            <option value="0">New</option>
                            <option value="1">Approved</option>
                            <option value="2">Rejected</option>
                            <option value="3">Canceled</option>
                            <option value="4">Submitted</option>
                        </Select>
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handleAddSubmit}>
                        Add
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default AddLeaveRequestModal;
