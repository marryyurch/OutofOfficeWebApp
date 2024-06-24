export const getSubdivisionType = (value) => {
    const types = ["Marketing", "Sales", "HR", "Development", "Support"];
    return types[value] || "Unknown";
};

export const getPositionType = (value) => {
    const types = ["Manager", "Analyst", "Tester", "Designer", "Developer"];
    return types[value] || "Unknown";
};

export const getStatusType = (value) => {
    const types = ["Inactive", "Active"];
    return types[value] || "Unknown";
};

export const getProjectType = (value) => {
    const types = {
        1: "Research",
        2: "Development",
        3: "Testing",
        4: "Deactivated"
    };
    return types[value] || "Unknown";
};

export const getEmployeeNameById = (id, employees) => {
    const employee = employees.find(emp => emp.id === id);
    return employee ? employee.fullName : "Unknown";
};

export const getRowColor = (status) => {
    return status === 1 ? 'green.100' : 'gray.100';
};
