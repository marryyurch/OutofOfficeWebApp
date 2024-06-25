import React, { useEffect, useState } from 'react';
import { Box, VStack, HStack, FormControl, FormLabel, Input, Select, Button, Table, Thead, Tbody, Tr, Th, Td, TableContainer, IconButton } from "@chakra-ui/react";
import { MdDelete, MdEdit, MdAdd } from "react-icons/md";
import { fetchProjects, addProject, updateProject, deleteProject, filterProjects } from "../services/projects";
import EditProjectModal from "../Modals/EditProjectModal";
import AddProjectModal from "../Modals/AddProjectModal";

const ProjectsTable = ({ role }) => {
    const [projects, setProjects] = useState([]);
    const [filter, setFilter] = useState({
        search: "",
        sortItem: "",
        sortOrder: "",
    });

    const [filterItem, setFilterItem] = useState("");
    const [itemContent, setItemContent] = useState("");

    const [isEditing, setIsEditing] = useState(false);
    const [editingProject, setEditingProject] = useState(null);

    const [isAdding, setIsAdding] = useState(false);
    const [newProject, setNewProject] = useState({
        id: 0,
        type: 0,
        start: "",
        end: "",
        pm: 0,
        comment: '',
        status: 0,
    });

    useEffect(() => {
        const fetchData = async () => {
            const projectsData = await fetchProjects(filter);
            setProjects(projectsData);
        };

        fetchData();
    }, [filter]);

    const handleDelete = async (id) => {
        await deleteProject(id);
        setProjects(projects.filter(proj => proj.id !== id));
    };

    const handleEdit = (project) => {
        setEditingProject(project);
        setIsEditing(true);
    };

    const handleFilterSubmit = async () => {
        const filteredProjects = await filterProjects(filterItem, itemContent);
        setProjects(filteredProjects);
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" p={4}>
            <VStack spacing={4} align="stretch" width="100%" maxWidth="1200px">
                <HStack spacing={4} width="100%" justify="space-between">
                    <HStack spacing={4}>
                        <FormControl>
                            <FormLabel>Filter Item</FormLabel>
                            <Select value={filterItem} onChange={(e) => setFilterItem(e.target.value)}>
                                <option value="type">Type</option>
                                <option value="pm">Project Manager</option>
                                <option value="status">Status</option>
                            </Select>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Item Content</FormLabel>
                            <Input value={itemContent} onChange={(e) => setItemContent(e.target.value)} />
                        </FormControl>
                        <Button onClick={handleFilterSubmit}>Filter</Button>
                    </HStack>
                    {role === 'pm' && (
                        <Button leftIcon={<MdAdd />} colorScheme="teal" onClick={() => setIsAdding(true)}>
                            Add Project
                        </Button>
                    )}
                </HStack>
                <TableContainer>
                    <Table size="sm" style={{ width: '100%' }}>
                        <Thead>
                            <Tr>
                                <Th isNumeric>Id</Th>
                                <Th>Type</Th>
                                <Th>Start Date</Th>
                                <Th>End Date</Th>
                                <Th>Project Manager</Th>
                                <Th>Status</Th>
                                <Th>Comment</Th>
                                <Th>Actions</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {projects.map((proj) => (
                                <Tr key={proj.id}>
                                    <Td isNumeric>{proj.id}</Td>
                                    <Td>{proj.type}</Td>
                                    <Td>{proj.start}</Td>
                                    <Td>{proj.end}</Td>
                                    <Td>{proj.pm}</Td>
                                    <Td>{proj.status}</Td>
                                    <Td>{proj.comment}</Td>
                                    <Td>
                                        <HStack spacing={2}>
                                            {role === 'pm' && (
                                                <>
                                                    <IconButton
                                                        aria-label="Edit Project"
                                                        icon={<MdEdit />}
                                                        onClick={() => handleEdit(proj)}
                                                    />
                                                    <IconButton
                                                        aria-label="Delete Project"
                                                        icon={<MdDelete />}
                                                        onClick={() => handleDelete(proj.id)}
                                                    />
                                                </>
                                            )}
                                        </HStack>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </VStack>

            <EditProjectModal
                isOpen={isEditing}
                onClose={() => setIsEditing(false)}
                editingProject={editingProject}
                setEditingProject={setEditingProject}
                setProjects={setProjects}
                filter={filter}
            />

            <AddProjectModal
                isOpen={isAdding}
                onClose={() => setIsAdding(false)}
                newProject={newProject}
                setNewProject={setNewProject}
                setProjects={setProjects}
                filter={filter}
            />
        </Box>
    );
};

export default ProjectsTable;
