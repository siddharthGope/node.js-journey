const express = require("express");
const allUsers = require("./MOCK_DATA.json");
const fs = require("fs");
const app = express();
const PORT = 8000;
const router = express.Router();

app.use(express.urlencoded({ extended: false }));

//Routes

//server side rendering
app.get("/allUsers", (req, res) => {
  const html = `
  <ul>
  ${allUsers.map((user) => `<li>${user.first_name}</li>`).join("")}
  </ul>
  `;
  res.send(html);
});

// frontend (client side rendering)
app.get("/api/allUsers", (req, res) => {
  return res.json(allUsers);
});

//get user with id
app.get("/api/allUsers/:id", (req, res) => {
  const paramId = Number(req.params.id);
  const matchedUser = allUsers.find((user) => user.id === paramId);
  return res.json(matchedUser);
});

//express routes chaining
// app
//   .route("/api/allUsers/:id")
//   .get((req, res) => {
//     const paramId = Number(req.params.id);
//     const matchedUser = allUsers.find((user) => user.id === paramId);
//     return res.json(matchedUser);
//   })
//   .patch((req, res) => {
//     // Edit user with id
//     return res.json({ status: "Pending" });
//   })
//   .delete((req, res) => {
//     // Delete user with id
//     return res.json({ status: "Pending" });
//   });

app.post("/api/allUsers", (req, res) => {
  const responseBody = req.body;
  allUsers.push({ ...responseBody, id: allUsers.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(allUsers), (err, data) => {
    return res.json({ status: "success", id: allUsers.length });
  });
});

app.delete("/api/allUsers/:id", (req, res) => {
  const paramId = parseInt(req.params.id);
  const matchedIndex = allUsers.findIndex((item) => {
    return item.id === paramId;
  });
  // checks data exists for this id
  if (matchedIndex === -1) {
    return res.status(404).send("Data not found");
  }
  // Remove data from the array using splice
  allUsers.splice(matchedIndex, 1);

  //write file json data (optional)

  // fs.writeFile("./MOCK_DATA.json", JSON.stringify(allUsers), (err, data) => {
  //   if (err) {
  //     return res.status(500).send("Failed to write data");
  //   }
  // });
  res.json(`Delete req to this id ${paramId}`);
});
app.listen(PORT, () => console.log(`Server is listening to post ${PORT}`));
