/* const express = require('express'); */
import {Users, User} from './db.js';
import express from 'express';
const router = express.Router();

//router.use(express.json());

router.post('/', (req, res) => {
    const newUser = req.body;
    Users.push(newUser);
    res.status(201).json(newUser);
});

router.post('/login', (req, res) => {
    let login = req.body;
    User = login;
    res.status(200).json(login);
});

export default router;