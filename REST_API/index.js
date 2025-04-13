const express = require("express");
const users = require("./MOCK_DATA.json");
const app = express();
const PORT = 8000;
//Routes

//server side rendering
app.get("/users", (req, res) => {
  const html = `
  <ul>
  ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
  </ul>
  `;
  res.send(html);
});

// frontend (client side rendering)
app.get("/api/users", (req, res) => {
  return res.json(users);
});

//get user with id
app.get("/api/users/:id", (req, res) => {
  const paramId = Number(req.params.id);
  const matchedUser = users.find((user) => user.id === paramId);
  return res.json(matchedUser);
});

app.post("/api/users", (req, res) => {
  // TODO: create user
});

app
  .route("/api/users/:id")
  .get("/api/users/:id", (req, res) => {
    const paramId = Number(req.params.id);
    const matchedUser = users.find((user) => user.id === paramId);
    return res.json(matchedUser);
  })
  .patch((req, res) => {
    // Edit user with id
    return res.json({ status: "Pending" });
  })
  .delete((req, res) => {
    // Delete user with id
    return res.json({ status: "Pending" });
  });

// app.post("/api/users/:id", (req, res) => {
//   res.send("POST request to this id");
// });

// app.delete("/api/users/:id", (req, res) => {
//   res.send("Delete req to this id")
// })
app.listen(PORT, () => `Server is listening to post ${PORT}`);
