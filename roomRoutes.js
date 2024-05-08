import db from "./db.js";
import express from "express";
const roomRouter = express.Router();

//Create a room
roomRouter.post("/", (req, res) => {
    const { id } = req.body;
    const roomId =
        db.Rooms.length > 0 ? db.Rooms[db.Rooms.length - 1].id + 1 : 1;
    const newRoom = {
        id: roomId,
        users: [],
        messages: [],
    };
    newRoom.users.push(id);
    db.Rooms.push(newRoom);
    res.status(201).json(newRoom);
});

//Delete a room
roomRouter.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const room = db.Rooms.find((room) => room.id === id);
    if (!room) {
        res.status(404).json({ error: "Room not found" });
    } else {
        const index = db.Rooms.indexOf(room);
        db.Rooms.splice(index, 1);
        res.status(200).json(db.Rooms);
    }
});

//Join in a specific room
roomRouter.post("/:id/enter", (req, res) => {
    const roomId = parseInt(req.params.id);
    const { id } = req.body;

    const room = db.Rooms.find((room) => room.id === roomId);
	const index = db.Rooms.indexOf(room);

    if (room === undefined) {
		return res.status(404).json({ error: "Room not found" });
    } else if (db.Rooms[index].users.find((user) => user === id) !== undefined) {
        return res.status(400).json({error: "Already in this room"});
    }

    db.Rooms[index].users.push(id);
    res.status(200).json(db.Rooms[index]);
});

//Leave in a specific room
roomRouter.post("/:id/leave", (req, res) => {
    const roomId = parseInt(req.params.id);
    const { id } = req.body;

    const room = db.Rooms.find((room) => room.id === roomId);

    if (room !== undefined) {
        const roomIndex = db.Rooms.indexOf(room);
        const userIndex = db.Rooms[roomIndex].users.indexOf(id);
        db.Rooms[roomIndex].users.splice(userIndex, 1);
        res.status(200).json(db.Rooms[roomIndex]);
    } else {
        res.status(404).json({ error: "Room not found" });
    }
});

//Remove a user in a room

roomRouter.delete("/:roomid/users/:userid", (req, res) => {
    const roomId = parseInt(req.params.roomid);
    const userId = parseInt(req.params.userid);

    const roomIndex = db.Rooms.findIndex((room) => room.id === roomId);
    const userIndex = db.Rooms[roomIndex].users.findIndex(
        (user) => user === userId
    );

    if (userIndex === -1 || roomIndex === -1) {
        return res.status(404).json({ error: "Room or user not found" });
    }

    db.Rooms[roomIndex].users.splice(userIndex, 1);
    res.status(200).json(db.Rooms[roomIndex]);
});

export default roomRouter;
