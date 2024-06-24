import { Input, Select } from "@chakra-ui/react";

export default function Filters({filter, setFilter}){
    return (
        <div className="flex flex-col gap-5">
        <Input 
            placefolder="Search" 
            onChange={(e) => setFilter({...filter, search: e.target.value})} 
        />
        <Select onChange={(e) => setFilter({...filter, sortOrder: e.target.value})}>
            <option value={"desc"}>Last-added employees</option>
			<option value={"asc"}>First-added employees</option>
        </Select>
        </div>
    );
}