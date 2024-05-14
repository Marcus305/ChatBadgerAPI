import db from "./db.js";
import express from "express";
const roomRouter = express.Router();

//Create a room
roomRouter.post("/", (req, res) => {
	if(db.User === null) {
		return res.status(401).json({error: "You need to be logged in to do this"});
	}
    const { roomName } = req.body;
    const roomId =
        db.Rooms.length > 0 ? db.Rooms[db.Rooms.length - 1].id + 1 : 1;
    const newRoom = {
        id: roomId,
        roomName: roomName,
        users: [],
        messages: [],
    };
    newRoom.users.push(db.User.id);
    db.Rooms.push(newRoom);
    return res.status(201).json(newRoom);
});

//Delete a room
roomRouter.delete("/:id", (req, res) => {
	if(db.User === null) {
		return res.status(401).json({error: "You need to be logged in to do this"});
	}
    const id = parseInt(req.params.id);
    const room = db.Rooms.find((room) => room.id === id);
    if (!room) {
        return res.status(404).json({ error: "Room not found" });
    } else {
        const index = db.Rooms.indexOf(room);
        db.Rooms.splice(index, 1);
        return res.status(200).json(room);
    }
});

//Join in a specific room
roomRouter.post("/:id/enter", (req, res) => {
	if(db.User === null) {
		return res.status(401).json({error: "You need to be logged in to do this"});
	}
    const roomId = parseInt(req.params.id);

    const room = db.Rooms.find((room) => room.id === roomId);
    const index = db.Rooms.indexOf(room);

    if (room === undefined) {
        return res.status(404).json({ error: "Room not found" });
    } else if (
        db.Rooms[index].users.find((user) => user === db.User.id) !== undefined
    ) {
        return res.status(400).json({ error: "Already in this room" });
    }

    db.Rooms[index].users.push(db.User.id);
    return res.status(200).json(db.Rooms[index]);
});

//Remove a user in a room
roomRouter.delete("/:roomid/users/:userid", (req, res) => {
	if(db.User === null) {
		return res.status(401).json({error: "You need to be logged in to do this"});
	}
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
    return res.status(200).json(db.Rooms[roomIndex]);
});

//Send a message to a chat
roomRouter.post("/:roomid/messages", (req, res) => {
	if(db.User === null) {
		return res.status(401).json({error: "You need to be logged in to do this"});
	}
    const { message } = req.body;
    const roomId = parseInt(req.params.roomid);

    const roomIndex = db.Rooms.findIndex((room) => room.id === roomId);

    if (message === "") {
        return res.status(400).json({ error: "The message can not be empty" });
    } else if (roomIndex === -1) {
        return res.status(404).json({ error: "Room not found" });
    } else if (db.Rooms[roomIndex].users.find((userId) => userId === db.User.id) === undefined) {
		return res.status(401).json({ error: "Permission denied" });
	}

    const newMessageId = db.Rooms[roomIndex].messages.length > 0 ? db.Rooms[roomIndex].messages[db.Rooms[roomIndex].messages.length - 1].id + 1 : 1;
    const newMessage = {
        id: newMessageId,
        sender: db.User.id,
        message: message,
    };
    
    db.Rooms[roomIndex].messages.push(newMessage);

    return res.status(200).json(newMessage);
});

//Get all messages from a chat
roomRouter.get("/:roomid/messages", (req, res) => {
	if(db.User === null) {
		return res.status(401).json({error: "You need to be logged in to do this"});
	}

    const roomId = parseInt(req.params.roomid);

    const roomIndex = db.Rooms.findIndex((room) => room.id === roomId);

    if (roomIndex === -1) {
        return res.status(404).json({ error: "Room not found" });
    } else if (db.Rooms[roomIndex].users.find((userId) => userId === db.User.id) === undefined) {
		return res.status(401).json({ error: "Permission denied" });
	}

    return res.status(200).json(db.Rooms[roomIndex].messages);
});

export default roomRouter;
