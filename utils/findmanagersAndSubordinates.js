export const findManager = (employee, employees) => {
  const managerId = employee.parentId;
  return employees.find((e) => e.id === managerId);
};

export const findSubordinates = (employee, employees) => {
  return employees.filter((e) => e.parentId === employee.id);
};
