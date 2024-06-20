import { Button } from "@chakra-ui/react";
import '../index.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import Employee from "../Components/Employee.jsx";
import Filters from "../Components/Filters.jsx";
import { fetchEmployees } from "../services/employees.js";


function Start() {
        const navigate = useNavigate();

        const [employees, setEmployees] = useState([]);
        const [filter, setFilter] = useState({
            search: "",
            sortItem: "",
            sortOrder: "desc",
        });

        useEffect(() => {
            const fetchData = async () => {
                let employees = await fetchEmployees(filter);
                setEmployees(employees);
            };
    
            fetchData();
        }, [filter]);
      
        const handleClick = () => {
          navigate('/login');
        };

    return (
        <section className="p-8 flex flex-row justify-center items-center min-h-screen">
            <div className="flex flex-col w-full md:w-1/3 gap-10">
                <Button colorScheme='green' onClick={handleClick}>Start</Button>
                <Filters filter={filter} setFilter={setFilter} />
            </div>
            <ul className="flex flex-col gap-5 w-1/2">
            {employees.map((e) => (
                <li key={e.id}>
                    <Employee
                        id={e.id}
                        fullName={e.fullName}
                        division={e.subdivisionType}
                        position={e.positionType}
                        status={e.statusType}
                        partner={e.peoplePartner}
                        balance={e.outofOfficeBalance}
                    />
                </li>
            ))}
            </ul>
        </section>
    );
}

export default Start;