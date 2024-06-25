import React, { useState, useEffect } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Input, Select, Button } from "@chakra-ui/react";
import { addProject, fetchProjects, fetchEmployees } from '../services/projects';

const AddProjectModal = ({ isOpen, onClose, newProject, setNewProject, setProjects, filter }) => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchEmployeesData = async () => {
            const employeesData = await fetchEmployees();
            setEmployees(employeesData);
        };
        fetchEmployeesData();
    }, []);

    const handleAddChange = (e) => {
        const { name, value } = e.target;
        const parsedValue = ["type", "pm", "status"].includes(name)
            ? parseInt(value)
            : value;
        setNewProject((prev) => ({
            ...prev,
            [name]: parsedValue,
        }));
    };

    const handleAddSubmit = async () => {
        await addProject(newProject);
        const updatedProjects = await fetchProjects(filter);
        setProjects(updatedProjects);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add Project</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <FormLabel>Type</FormLabel>
                        <Select name="type" value={newProject?.type} onChange={handleAddChange}>
                            <option value="1">Research</option>
                            <option value="2">Development</option>
                            <option value="3">Testing</option>
                            <option value="4">Deactivated</option>
                        </Select>
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Start Date</FormLabel>
                        <Input name="start" type="date" value={newProject?.start} onChange={handleAddChange} />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>End Date</FormLabel>
                        <Input name="end" type="date" value={newProject?.end} onChange={handleAddChange} />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Project Manager</FormLabel>
                        <Select name="pm" value={newProject?.pm} onChange={handleAddChange}>
                            {employees.map(emp => (
                                <option key={emp.id} value={emp.id}>{emp.fullName}</option>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Status</FormLabel>
                        <Select name="status" value={newProject?.status} onChange={handleAddChange}>
                            <option value="0">Inactive</option>
                            <option value="1">Active</option>
                        </Select>
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Comment</FormLabel>
                        <Input name="comment" value={newProject?.comment} onChange={handleAddChange} />
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

export default AddProjectModal;
