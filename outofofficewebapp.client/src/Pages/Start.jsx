import { Button } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';

function Start() {
    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate('/login');
    };

    return (
        <section className="p-8 flex flex-row justify-center items-center min-h-screen">
            <div className="flex flex-col w-full md:w-1/3 gap-10">
                <Button colorScheme='green' onClick={handleClick}>Start</Button>
            </div>
        </section>
    );
}

export default Start;