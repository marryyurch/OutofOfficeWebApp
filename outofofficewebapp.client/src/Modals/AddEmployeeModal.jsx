import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Input, Select, Button } from "@chakra-ui/react";
import { addEmployee, fetchEmployees } from '../services/employees.js';

const AddEmployeeModal = ({ isOpen, onClose, newEmployee, setNewEmployee, setEmployees, filter, allEmployees }) => {
    const handleAddChange = (e) => {
        const { name, value } = e.target;
        const parsedValue = ["statusType", "subdivisionType", "positionType", "peoplePartner", "outofOfficeBalance"].includes(name)
            ? parseInt(value)
            : value;
        setNewEmployee((prev) => ({
            ...prev,
            [name]: parsedValue,
        }));
    };

    const handleAddSubmit = async () => {
        const employeeData = {
            ...newEmployee,
            id: newEmployee.id || 0,
            peoplePartner: newEmployee.peoplePartner || 1,
        };
        const response = await addEmployee(employeeData);
        const updatedEmployees = await fetchEmployees(filter);
        setEmployees(updatedEmployees);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add Employee</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <FormLabel>Full Name</FormLabel>
                        <Input name="fullName" value={newEmployee.fullName} onChange={handleAddChange} />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Subdivision</FormLabel>
                        <Select name="subdivisionType" value={newEmployee.subdivisionType} onChange={handleAddChange}>
                            <option value="0">Marketing</option>
                            <option value="1">Sales</option>
                            <option value="2">HR</option>
                            <option value="3">Development</option>
                            <option value="4">Support</option>
                        </Select>
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Position</FormLabel>
                        <Select name="positionType" value={newEmployee.positionType} onChange={handleAddChange}>
                            <option value="0">Manager</option>
                            <option value="1">Analyst</option>
                            <option value="2">Tester</option>
                            <option value="3">Designer</option>
                            <option value="4">Developer</option>
                        </Select>
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Status</FormLabel>
                        <Select name="statusType" value={newEmployee.statusType} onChange={handleAddChange}>
                            <option value="0">Inactive</option>
                            <option value="1">Active</option>
                        </Select>
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>People Partner</FormLabel>
                        <Select name="peoplePartner" value={newEmployee.peoplePartner} onChange={handleAddChange}>
                            {allEmployees.map(emp => (
                                <option key={emp.id} value={emp.id}>{emp.fullName}</option>
                            ))}
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

export default AddEmployeeModal;
