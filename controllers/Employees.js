const data = {
  employees: require("../model/employees.json"),
  setEmployees(data) {
    this.employees = data;
  },
};

const getAllEmployees = (req, res) => {
  res.json(data.employees);
};

const createNewEmployee = (req, res) => {
  const { firstname, lastname } = req.body;

  if (!firstname || !lastname)
    return res.status(400).json({ msg: "Error: Please provide all details." });

  let index = data.employees.findIndex((e) => {
    return e.firstname === firstname && e.lastname === lastname;
  });

  if (index === -1) {
    let id = data.employees.length + 1;
    const newEmp = {
      id,
      firstname,
      lastname,
    };

    data.setEmployees([...data.employees, newEmp]);
    res.status(201).json({ msg: "User successfully created", id: newEmp.id });
  } else {
    res
      .status(400)
      .json({ msg: "Error: User with these details already exists" });
  }
};

const updateEmployee = (req, res) => {
  const { id } = req.body;

  let foundIndex = data.employees.findIndex((e) => e.id === id);

  if (foundIndex !== -1) {
    let updatedEmployees = data.employees;
    updatedEmployees[foundIndex] = {
      ...updatedEmployees[foundIndex],
      ...req.body,
    };
    data.setEmployees(updatedEmployees);
    res.json({ msg: `user details has been updated`, user: req.body });
  } else {
    res.status(200).json({ msg: `user with id ${id} doesn't exist` });
  }
};

const deleteEmployee = (req, res) => {
  const { id } = req.body;

  let found = false;
  const updatedEmployees = data.employees.filter((e) => {
    if (e.id === id) found = true;
    else return e;
  });

  data.setEmployees(updatedEmployees);

  if (found) {
    res.json({ msg: `user with id ${id} has been deleted` });
  } else res.status(200).json({ msg: `user with id ${id} doesn't exist` });
};

const getEmployee = (req, res) => {
  const { id } = req.params;
  let foundUser = data.employees.find((e) => e.id == id);

  if (!foundUser)
    return res
      .status(500)
      .json({ msg: `Employee with id ${id} doesn't exist` });
  res.json(foundUser);
};

module.exports = {
  getAllEmployees,
  getEmployee,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
};
