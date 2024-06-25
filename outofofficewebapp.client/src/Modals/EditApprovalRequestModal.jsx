import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Input, Select, Button } from "@chakra-ui/react";
import { addApprovalRequest, fetchApprovalRequests } from '../services/approvalRequests.js';

const AddApprovalRequestModal = ({ isOpen, onClose, newApprovalRequest, setNewApprovalRequest, setApprovalRequests, filter }) => {
    const handleAddChange = (e) => {
        const { name, value } = e.target;
        const parsedValue = ["approver", "leaveRequest", "status"].includes(name)
            ? parseInt(value)
            : value;
        setNewApprovalRequest((prev) => ({
            ...prev,
            [name]: parsedValue,
        }));
    };

    const handleAddSubmit = async () => {
        const response = await addApprovalRequest(newApprovalRequest);
        const updatedApprovalRequests = await fetchApprovalRequests(filter);
        setApprovalRequests(updatedApprovalRequests);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add Approval Request</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <FormLabel>Approver</FormLabel>
                        <Input name="approver" value={newApprovalRequest?.approver} onChange={handleAddChange} />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Leave Request</FormLabel>
                        <Input name="leaveRequest" value={newApprovalRequest?.leaveRequest} onChange={handleAddChange} />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Status</FormLabel>
                        <Select name="status" value={newApprovalRequest?.status} onChange={handleAddChange}>
                            <option value="0">New</option>
                            <option value="1">Approved</option>
                            <option value="2">Rejected</option>
                            <option value="3">Canceled</option>
                            <option value="4">Submitted</option>
                        </Select>
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Comment</FormLabel>
                        <Input name="comment" value={newApprovalRequest?.comment} onChange={handleAddChange} />
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

export default AddApprovalRequestModal;
