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
  return Promise.resolve(users);
}

function insertUser(newUser) {
  users.push(newUser);
  return Promise.resolve(newUser);
}

function loginUser(currentUser) {
  let count = 0;
  users.map((user) => {
    if (user.username === currentUser.username && user.password === currentUser.password) {
      count++;
    }
  });
  return Promise.resolve(count);
}

module.exports = { getUsers, insertUser, loginUser };
