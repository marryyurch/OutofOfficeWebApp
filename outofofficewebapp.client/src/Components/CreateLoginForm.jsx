import { Button, Input, Text } from "@chakra-ui/react";
//import './index.css';

export default function CreateLoginForm() {
    return (
        <form className="w-full flex flex-col gap-3">
            <h3 className="font-bold text-xl">Log In</h3>
            <Input placeholder="E-mail" />
            <Input placeholder="Password" />
            <Button id='next-button' colorScheme="teal">Next</Button>
            <Text textAlign='center' color='#a6a6a6' as='samp'>OR:</Text>
            <Button colorScheme="blue">Register</Button>
            <Button colorScheme="purple">Register HR</Button>
        </form>
    );
}