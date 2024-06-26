import db from "./db.js";
import express from "express";
const userRouter = express.Router();

//Create a new user
userRouter.post("/", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res
            .status(400)
            .json({ error: "Username and password are required!" });
    } else if (
        db.Users.find((user) => user.username === username) !== undefined
    ) {
        return res.status(400).json({ error: "Username already in use" });
    } else if (password.length < 8) {
        return res
            .status(400)
            .json({ error: "Password must be at least 8 characters long" });
    }

    const id = db.Users.length > 0 ? db.Users[db.Users.length - 1].id + 1 : 1;

    const newUser = {
        id: id,
        username: username,
        password: password,
        direct: [],
    };

    db.Users.push(newUser);

    return res.status(201).json(newUser);
});

//User login
userRouter.post("/login", (req, res) => {
    const { username, password } = req.body;
    const login = db.Users.find(
        (user) => user.username === username && user.password === password
    );

    if (db.User !== null) {
        return res.status(400).json({ error: "User already logged in" });
    } else if (!username || !password) {
        return res
            .status(400)
            .json({ error: "Username and password are required!" });
    } else if (login === undefined) {
        return res.status(400).json({ error: "Wrong password or username" });
    }

    db.User = login;

    return res.status(200).json(login);
});

//User logout
userRouter.delete("/logout", (req, res) => {
    db.User = null;
    return res.status(200).json({ message: "Logout successful" });
});

//Show user data by id
userRouter.get("/:id", (req, res) => {
    if (db.User === null) {
        return res
            .status(401)
            .json({ error: "You need to be logged in to do this" });
    }
    const id = parseInt(req.params.id);
    const user = db.Users.find((user) => user.id === id);
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    } else {
        return res.status(200).json(user);
    }
});

export default userRouter;
