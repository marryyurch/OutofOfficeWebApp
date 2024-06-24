import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Input, Select, Button } from "@chakra-ui/react";
import { updateEmployee, fetchEmployees } from '../services/employees.js';

const EditEmployeeModal = ({ isOpen, onClose, editingEmployee, setEditingEmployee, allEmployees, setEmployees, filter }) => {
    const handleEditChange = (e) => {
        const { name, value } = e.target;
        const parsedValue = ["statusType", "subdivisionType", "positionType", "peoplePartner", "outofOfficeBalance"].includes(name)
            ? parseInt(value)
            : value;
        setEditingEmployee((prev) => ({
            ...prev,
            [name]: parsedValue,
        }));
    };

    const handleEditSubmit = async () => {
        const response = await updateEmployee(editingEmployee, editingEmployee.outofOfficeBalance, editingEmployee.photo);
        const updatedEmployees = await fetchEmployees(filter);
        setEmployees(updatedEmployees);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Edit Employee</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <FormLabel>Subdivision</FormLabel>
                        <Select name="subdivisionType" value={editingEmployee?.subdivisionType} onChange={handleEditChange}>
                            <option value="0">Marketing</option>
                            <option value="1">Sales</option>
                            <option value="2">HR</option>
                            <option value="3">Development</option>
                            <option value="4">Support</option>
                        </Select>
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Position</FormLabel>
                        <Select name="positionType" value={editingEmployee?.positionType} onChange={handleEditChange}>
                            <option value="0">Manager</option>
                            <option value="1">Analyst</option>
                            <option value="2">Tester</option>
                            <option value="3">Designer</option>
                            <option value="4">Developer</option>
                        </Select>
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Status</FormLabel>
                        <Select name="statusType" value={editingEmployee?.statusType} onChange={handleEditChange}>
                            <option value="0">Inactive</option>
                            <option value="1">Active</option>
                        </Select>
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>People Partner</FormLabel>
                        <Select name="peoplePartner" value={editingEmployee?.peoplePartner} onChange={handleEditChange}>
                            {allEmployees.map(emp => (
                                <option key={emp.id} value={emp.id}>{emp.fullName}</option>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Day-off Balance</FormLabel>
                        <Input name="outofOfficeBalance" type="number" value={editingEmployee?.outofOfficeBalance} onChange={handleEditChange} />
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

export default EditEmployeeModal;
