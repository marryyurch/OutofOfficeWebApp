import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Select, Button } from "@chakra-ui/react";
import { getProjectType } from '../utilities';

const AssignProjectModal = ({ isOpen, onClose, projects, selectedProjectId, setSelectedProjectId, handleAddToProject }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Assign to Project</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <FormLabel>Select Project</FormLabel>
                        <Select value={selectedProjectId} onChange={(e) => setSelectedProjectId(e.target.value)}>
                            {projects.map(project => (
                                <option key={project.id} value={project.id}>{getProjectType(project.projectType)} - {project.comment}</option>
                            ))}
                        </Select>
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handleAddToProject}>
                        Assign
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default AssignProjectModal;
