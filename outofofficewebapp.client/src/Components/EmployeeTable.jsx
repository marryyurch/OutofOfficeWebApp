import React, { useEffect, useState } from 'react';
import { Box, VStack, HStack, FormControl, FormLabel, Input, Select, Button, Table, Thead, Tbody, Tr, Th, Td, TableContainer, IconButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import { MdDelete, MdEdit, MdAdd } from "react-icons/md";
import Filters from './Filters';
import { fetchEmployees, fetchAllEmployees, deleteEmployee, updateEmployee, filterEmployees, addEmployee } from '../services/employees.js';

const getSubdivisionType = (value) => {
    const types = ["Marketing", "Sales", "HR", "Development", "Support"];
    return types[value] || "Unknown";
};

const getPositionType = (value) => {
    const types = ["Manager", "Analyst", "Tester", "Designer", "Developer"];
    return types[value] || "Unknown";
};

const getStatusType = (value) => {
    const types = ["Inactive", "Active"];
    return types[value] || "Unknown";
};

const getEmployeeNameById = (id, employees) => {
    const employee = employees.find(emp => emp.id === id);
    return employee ? employee.fullName : "Unknown";
};

const EmployeeTable = () => {
    const [employees, setEmployees] = useState([]);
    const [allEmployees, setAllEmployees] = useState([]);
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
        id: 0, // Default id
        fullName: '',
        subdivisionType: 0, // Default to the first subdivision type
        positionType: 0, // Default to the first position type
        statusType: 0, // Default to 'Inactive'
        peoplePartner: 1, // Default people partner
        outofOfficeBalance: 0, // Default to 0
    });

    useEffect(() => {
        const fetchData = async () => {
            const employeesData = await fetchEmployees(filter);
            setEmployees(employeesData);
            const allEmployeesData = await fetchAllEmployees();
            setAllEmployees(allEmployeesData);
        };

        fetchData();
    }, [filter]);

    const getRowColor = (status) => {
        return status === 1 ? 'green.100' : 'gray.100';
    };

    const handleDelete = async (id) => {
        await deleteEmployee(id);
        setEmployees(employees.filter(emp => emp.id !== id));
    };

    const handleEdit = (employee) => {
        setEditingEmployee(employee);
        setIsEditing(true);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        const parsedValue = name === "statusType" || name === "subdivisionType" || name === "positionType" || name === "peoplePartner" || name === "outofOfficeBalance"
            ? parseInt(value)
            : value;
        setEditingEmployee((prev) => ({
            ...prev,
            [name]: parsedValue,
        }));
    };

    const handleEditSubmit = async () => {
        console.log('Submitting update for employee:', editingEmployee);
        const response = await updateEmployee(editingEmployee, editingEmployee.outofOfficeBalance, editingEmployee.photo);
        console.log('Update response:', response);
        const updatedEmployees = await fetchEmployees(filter);
        setEmployees(updatedEmployees);
        setIsEditing(false);
        setEditingEmployee(null);
    };

    const handleFilterSubmit = async () => {
        console.log('Filtering with:', filterItem, itemContent);
        const filteredEmployees = await filterEmployees(filterItem, itemContent);
        console.log('Filtered employees:', filteredEmployees);
        setEmployees(filteredEmployees);
    };

    const handleAddChange = (e) => {
        const { name, value } = e.target;
        const parsedValue = name === "statusType" || name === "subdivisionType" || name === "positionType" || name === "peoplePartner" || name === "outofOfficeBalance"
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
            id: newEmployee.id || 0, // Ensure id is 0 if not set
            peoplePartner: newEmployee.peoplePartner || 1, // Ensure peoplePartner is 1 if not set
        };
        console.log('Submitting new employee:', employeeData);
        const response = await addEmployee(employeeData);
        console.log('Add response:', response);
        const updatedEmployees = await fetchEmployees(filter);
        setEmployees(updatedEmployees);
        setIsAdding(false);
        setNewEmployee({
            id: 0,
            fullName: '',
            subdivisionType: 0,
            positionType: 0,
            statusType: 0,
            peoplePartner: 1,
            outofOfficeBalance: 0,
        });
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" p={4}>
            <VStack spacing={4} align="stretch" width="100%" maxWidth="1200px">
                <Filters filter={filter} setFilter={setFilter} />
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
                    <Button leftIcon={<MdAdd />} colorScheme="teal" onClick={() => setIsAdding(true)}>
                        Add Employee
                    </Button>
                </HStack>
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
                                            <IconButton
                                                aria-label="Edit Employee"
                                                icon={<MdEdit />}
                                                onClick={() => handleEdit(e)}
                                            />
                                            <IconButton
                                                aria-label="Delete Employee"
                                                icon={<MdDelete />}
                                                onClick={() => handleDelete(e.id)}
                                            />
                                        </HStack>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </VStack>

            <Modal isOpen={isEditing} onClose={() => setIsEditing(false)}>
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
                        <Button onClick={() => setIsEditing(false)}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Modal isOpen={isAdding} onClose={() => setIsAdding(false)}>
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
                        <Button onClick={() => setIsAdding(false)}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default EmployeeTable;
