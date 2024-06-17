import { } from "@chakra-ui/react";
import '../index.css';
import CreateLoginForm from '../Components/CreateLoginForm.jsx';

function Login() {
    return (
        <section className="p-8 flex flex-row justify-center items-center min-h-screen">
            <div className="flex flex-col w-full md:w-1/3 gap-10">
                <CreateLoginForm />
            </div>
        </section>
    );
}

export default Login;
