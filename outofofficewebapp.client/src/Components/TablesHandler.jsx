import { Text, Tab, Tabs, TabList, TabPanel, TabPanels, Box, Center } from "@chakra-ui/react";
import EmployeeTable from './EmployeeTable';

export default function TablesHandler({ role }) {
    return (
        <Box width="100%">
            {role === "emp" && (
                <Tabs isManual variant='enclosed' width="100%">
                    <TabList>
                        <Tab>Leave Requests</Tab>
                        <Tab>Projects</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Center><p>leave!!</p></Center>
                        </TabPanel>
                        <TabPanel>
                            <Center><p>projects!!</p></Center>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            )}
            {role === "hr" && (
                <Tabs isManual variant='enclosed' width="100%">
                    <TabList>
                        <Tab>Employees</Tab>
                        <Tab>Approval Requests</Tab>
                        <Tab>Leave Requests</Tab>
                        <Tab>Projects</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <EmployeeTable role={role} />
                        </TabPanel>
                        <TabPanel>
                            <Center><p>approval!!</p></Center>
                        </TabPanel>
                        <TabPanel>
                            <Center><p>leave!!</p></Center>
                        </TabPanel>
                        <TabPanel>
                            <Center><p>projects!!</p></Center>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            )}
            {role === "pm" && (
                <Tabs isManual variant='enclosed' width="100%">
                    <TabList>
                        <Tab>Employees</Tab>
                        <Tab>Approval Requests</Tab>
                        <Tab>Leave Requests</Tab>
                        <Tab>Projects</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <EmployeeTable role={role} />
                        </TabPanel>
                        <TabPanel>
                            <Center><p>approval!!</p></Center>
                        </TabPanel>
                        <TabPanel>
                            <Center><p>leave!!</p></Center>
                        </TabPanel>
                        <TabPanel>
                            <Center><p>projects!!</p></Center>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            )}
            {!role && <Text>Loading role...</Text>}
        </Box>
    );
}
