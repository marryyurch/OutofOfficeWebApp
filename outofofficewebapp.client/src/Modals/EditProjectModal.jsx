import React, { useState, useEffect } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Input, Select, Button } from "@chakra-ui/react";
import { updateProject, fetchProjects, fetchEmployees } from '../services/projects';

const EditProjectModal = ({ isOpen, onClose, editingProject, setEditingProject, setProjects, filter }) => {
    const [projectDetails, setProjectDetails] = useState(editingProject);
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchEmployeesData = async () => {
            const employeesData = await fetchEmployees();
            setEmployees(employeesData);
        };
        fetchEmployeesData();
    }, []);

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        const parsedValue = ["type", "pm", "status"].includes(name)
            ? parseInt(value)
            : value;
        setProjectDetails((prev) => ({
            ...prev,
            [name]: parsedValue,
        }));
    };

    const handleEditSubmit = async () => {
        await updateProject(projectDetails);
        const updatedProjects = await fetchProjects(filter);
        setProjects(updatedProjects);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Edit Project</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <FormLabel>Type</FormLabel>
                        <Select name="type" value={projectDetails?.type} onChange={handleEditChange}>
                            <option value="1">Research</option>
                            <option value="2">Development</option>
                            <option value="3">Testing</option>
                            <option value="4">Deactivated</option>
                        </Select>
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Start Date</FormLabel>
                        <Input name="start" type="date" value={projectDetails?.start} onChange={handleEditChange} />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>End Date</FormLabel>
                        <Input name="end" type="date" value={projectDetails?.end} onChange={handleEditChange} />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Project Manager</FormLabel>
                        <Select name="pm" value={projectDetails?.pm} onChange={handleEditChange}>
                            {employees.map(emp => (
                                <option key={emp.id} value={emp.id}>{emp.fullName}</option>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Status</FormLabel>
                        <Select name="status" value={projectDetails?.status} onChange={handleEditChange}>
                            <option value="0">Inactive</option>
                            <option value="1">Active</option>
                        </Select>
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Comment</FormLabel>
                        <Input name="comment" value={projectDetails?.comment} onChange={handleEditChange} />
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

export default EditProjectModal;
