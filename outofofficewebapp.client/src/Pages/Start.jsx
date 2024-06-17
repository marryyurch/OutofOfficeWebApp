import { Button } from "@chakra-ui/react";
import '../index.css';

function Start() {
    return (
        <section className="p-8 flex flex-row justify-center items-center min-h-screen">
            <div className="flex flex-col w-full md:w-1/3 gap-10">
                <Button>Start</Button>
            </div>
        </section>
    );
}

export default Start;