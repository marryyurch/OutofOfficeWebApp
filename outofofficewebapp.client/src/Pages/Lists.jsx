import { Button, Grid, GridItem } from "@chakra-ui/react";
import AuthorizeView, { UserRole } from "../Components/AuthorizeView.jsx";
import { useState } from 'react';
import TablesHandler from "../Components/TablesHandler.jsx";
import { useNavigate } from 'react-router-dom';

function Lists() {
    const [role, setRole] = useState("");
    const navigate = useNavigate();

    const handleRoleFetched = (fetchedRole) => {
        setRole(fetchedRole);
    };

    const handleClick = () => {
        navigate('/home');
    };

    return (
        <AuthorizeView>
            <Grid templateColumns="1fr auto" gap={12} p={8}>
                <GridItem>
                    <UserRole onRoleFetched={handleRoleFetched} />
                    <TablesHandler role={role} />
                </GridItem>
                <GridItem>
                    <Button colorScheme='green' onClick={handleClick}>Go back</Button>
                </GridItem>
            </Grid>
        </AuthorizeView>
    );
}

export default Lists;
