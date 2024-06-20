import { Text, Heading, Button } from "@chakra-ui/react";
import LogoutLink from "../Components/LogoutLink.jsx";
import AuthorizeView, { AuthorizedUser } from "../Components/AuthorizeView.jsx";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    const handleListsClick = () => {
        navigate("/lists");
    }

    return (
        <AuthorizeView>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Heading>OutOfOffice</Heading>
            <Button colorScheme="teal" size="md" onClick={handleListsClick}>Lists</Button>
            <LogoutLink>
                <Text align="right" fontSize="lg">Logout <AuthorizedUser value="email" /></Text>
            </LogoutLink>
        </header>
            <Text fontSize='4xl' align="center" mt={{ base: 8, md: 16 }}>Welcome Home</Text>
        </AuthorizeView>
    );
}

export default Home;