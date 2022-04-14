const users = [
  {
    username: "John",
    password: "johnny2022",
  },
  {
    username: "Mary",
    password: "mary2022",
  },
  {
    username: "Billy",
    password: "billy2022",
  },
];

function getUsers() {
  return users;
}

function insertUser(newUser) {
  users.push(newUser);
}

function loginUser(currentUser) {
  let count = 0;
  users.map((user) => {
    if (user.username === currentUser.username && user.password === currentUser.password) {
      count++;
    }
  });
  return count;
}

module.exports = { getUsers, insertUser, loginUser };
