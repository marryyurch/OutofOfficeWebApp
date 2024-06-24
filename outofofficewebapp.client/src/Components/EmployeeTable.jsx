import { useEffect, useState } from 'react';
import { Box, VStack, HStack, FormControl, FormLabel, Input, Select, Button, Table, Thead, Tbody, Tr, Th, Td, TableContainer, IconButton } from "@chakra-ui/react";
import { MdDelete, MdEdit, MdAdd } from "react-icons/md";
import Filters from './Filters';
import { fetchEmployees, fetchAllEmployees, deleteEmployee, filterEmployees, addEmployeeToProject } from '../services/employees.js';
import { fetchProjects } from "../services/projects";
import EditEmployeeModal from '../Modals/EditEmployeeModal';
import AddEmployeeModal from '../Modals/AddEmployeeModal';
import AssignProjectModal from '../Modals/AssignProjectModal';
import { getSubdivisionType, getPositionType, getStatusType, getEmployeeNameById, getRowColor } from '../utilities';

const EmployeeTable = ({ role }) => {
    const [employees, setEmployees] = useState([]);
    const [allEmployees, setAllEmployees] = useState([]);
    const [projects, setProjects] = useState([]);
    const [filter, setFilter] = useState({
        search: "",
        sortItem: "",
        sortOrder: "",
    });

    const [filterItem, setFilterItem] = useState("");
    const [itemContent, setItemContent] = useState("");

    const [isEditing, setIsEditing] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState(null);

    const [isAdding, setIsAdding] = useState(false);
    const [newEmployee, setNewEmployee] = useState({
        id: 0,
        fullName: '',
        subdivisionType: 0,
        positionType: 0,
        statusType: 0,
        peoplePartner: 1,
        outofOfficeBalance: 0,
    });

    const [isAssigning, setIsAssigning] = useState(false);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
    const [selectedProjectId, setSelectedProjectId] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const employeesData = await fetchEmployees(filter);
            setEmployees(employeesData);
            const allEmployeesData = await fetchAllEmployees();
            setAllEmployees(allEmployeesData);
            const projectsData = await fetchProjects();
            setProjects(projectsData);
        };

        fetchData();
    }, [filter]);

    const handleDelete = async (id) => {
        await deleteEmployee(id);
        setEmployees(employees.filter(emp => emp.id !== id));
    };

    const handleEdit = (employee) => {
        setEditingEmployee(employee);
        setIsEditing(true);
    };

    const handleFilterSubmit = async () => {
        const filteredEmployees = await filterEmployees(filterItem, itemContent);
        setEmployees(filteredEmployees);
    };

    const handleAddToProject = async () => {
        const response = await addEmployeeToProject(selectedEmployeeId, selectedProjectId);
        console.log('Add to project response:', response);
        setIsAssigning(false);
    };

    const openAssignModal = (employeeId) => {
        setSelectedEmployeeId(employeeId);
        setIsAssigning(true);
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" p={4}>
            <VStack spacing={4} align="stretch" width="100%" maxWidth="1200px">
                {(role === 'hr' || role === 'pm') && <Filters filter={filter} setFilter={setFilter} />}
                {(role === 'hr' || role === 'pm') && (
                    <HStack spacing={4} width="100%" justify="space-between">
                        <HStack spacing={4}>
                            <FormControl>
                                <FormLabel>Filter Item</FormLabel>
                                <Select value={filterItem} onChange={(e) => setFilterItem(e.target.value)}>
                                    <option value="name">Name</option>
                                    <option value="subdivision">Subdivision</option>
                                    <option value="position">Position</option>
                                    <option value="status">Status</option>
                                    <option value="ppartner">People Partner</option>
                                </Select>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Item Content</FormLabel>
                                <Input value={itemContent} onChange={(e) => setItemContent(e.target.value)} />
                            </FormControl>
                            <Button onClick={handleFilterSubmit}>Filter</Button>
                        </HStack>
                        {role === 'hr' && (
                            <Button leftIcon={<MdAdd />} colorScheme="teal" onClick={() => setIsAdding(true)}>
                                Add Employee
                            </Button>
                        )}
                    </HStack>
                )}
                <TableContainer>
                    <Table size="sm" style={{ width: '100%' }}>
                        <Thead>
                            <Tr>
                                <Th isNumeric>Id</Th>
                                <Th>Full Name</Th>
                                <Th>Subdivision</Th>
                                <Th>Position</Th>
                                <Th>Status</Th>
                                <Th>People Partner</Th>
                                <Th isNumeric>Day-off balance</Th>
                                <Th>Actions</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {employees.map((e) => (
                                <Tr key={e.id} bg={getRowColor(e.statusType)}>
                                    <Td isNumeric>{e.id}</Td>
                                    <Td>{e.fullName}</Td>
                                    <Td>{getSubdivisionType(e.subdivisionType)}</Td>
                                    <Td>{getPositionType(e.positionType)}</Td>
                                    <Td>{getStatusType(e.statusType)}</Td>
                                    <Td>{getEmployeeNameById(e.peoplePartner, allEmployees)}</Td>
                                    <Td isNumeric>{e.outofOfficeBalance}</Td>
                                    <Td>
                                        <HStack spacing={2}>
                                            {(role === 'hr' || role === 'pm') && (
                                                <IconButton
                                                    aria-label="Edit Employee"
                                                    icon={<MdEdit />}
                                                    onClick={() => handleEdit(e)}
                                                />
                                            )}
                                            {role === 'hr' && (
                                                <IconButton
                                                    aria-label="Delete Employee"
                                                    icon={<MdDelete />}
                                                    onClick={() => handleDelete(e.id)}
                                                />
                                            )}
                                            {role === 'pm' && (
                                                <Button
                                                    colorScheme="blue"
                                                    onClick={() => openAssignModal(e.id)}
                                                >
                                                    Assign to Project
                                                </Button>
                                            )}
                                        </HStack>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </VStack>

            <EditEmployeeModal
                isOpen={isEditing}
                onClose={() => setIsEditing(false)}
                editingEmployee={editingEmployee}
                setEditingEmployee={setEditingEmployee}
                allEmployees={allEmployees}
                setEmployees={setEmployees}
                filter={filter}
            />

            <AddEmployeeModal
                isOpen={isAdding}
                onClose={() => setIsAdding(false)}
                newEmployee={newEmployee}
                setNewEmployee={setNewEmployee}
                setEmployees={setEmployees}
                filter={filter}
                allEmployees={allEmployees}
            />

            <AssignProjectModal
                isOpen={isAssigning}
                onClose={() => setIsAssigning(false)}
                projects={projects}
                selectedProjectId={selectedProjectId}
                setSelectedProjectId={setSelectedProjectId}
                handleAddToProject={handleAddToProject}
            />
        </Box>
    );
};

export default EmployeeTable;
