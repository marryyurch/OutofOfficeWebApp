import { Table, TableContainer, Tbody, Thead, Tr, Th, Td } from "@chakra-ui/react";


export default function Employee({ id, fullName, division, position, status, partner, balance}) {
    return (
        <TableContainer>
            <Table variant={"striped"} size='sm'>
            <Thead>
                <Tr>
                    <Th isNumeric>Id</Th>
                    <Th>Full Name</Th>
                    <Th>Subdivision</Th>
                    <Th>Position</Th>
                    <Th>Status</Th>
                    <Th isNumeric>People Partner</Th>
                    <Th isNumeric>Day-off balance</Th>
                </Tr>
            </Thead>
            <Tbody>
                    <Td isNumeric>{id}</Td>
                    <Td>{fullName}</Td>
                    <Td>{division}</Td>
                    <Td>{position}</Td>
                    <Td>{status}</Td>
                    <Td isNumeric>{partner}</Td>
                    <Td isNumeric>{balance}</Td>
            </Tbody>
        </Table>
        </TableContainer>
    );
}