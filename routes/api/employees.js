const router = require("express").Router();

const data = {};
data.employees = require("../../data/employees.json");

router
  .route("/")
  .get((req, res) => {
    res.json(data.employees);
  })
  .post((req, res) => {
    const { firstname, lastname } = req.body;
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

      data.employees.push(newEmp);
      res.status(201).json({ msg: "User successfully created", id: newEmp.id });
    } else {
      res
        .status(500)
        .json({ msg: "Error: User with these details already exists" });
    }
  })
  .put((req, res) => {
    const { id } = req.body;

    let foundIndex = data.employees.findIndex((e) => e.id === id);

    if (foundIndex !== -1) {
      data.employees[foundIndex] = {
        ...data.employees[foundIndex],
        ...req.body,
      };
      res.json({ msg: `user details has been updated`, user: req.body });
    } else {
      res.status(200).json({ msg: `user with id ${id} doesn't exist` });
    }
  })
  .delete((req, res) => {
    const { id } = req.body;

    let found = false;
    data.employees = data.employees.filter((e) => {
      if (e.id === id) found = true;
      else return e;
    });

    if (found) {
      res.json({ msg: `user with id ${id} has been deleted` });
    } else res.status(200).json({ msg: `user with id ${id} doesn't exist` });

    // res.json({
    //   id: req.body.id,
    // });
  });

router.route("/:id").get((req, res) => {
  const { id } = req.params;
  let foundUser = data.employees.find((e) => e.id == id);

  if (!foundUser)
    return res
      .status(500)
      .json({ msg: `Employee with id ${id} doesn't exist` });
  res.json(foundUser);
});

module.exports = router;
