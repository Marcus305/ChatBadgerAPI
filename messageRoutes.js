import db from "./db.js";
import express from "express";
const messageRouter = express.Router();

//Send a direct to a user
messageRouter.post("/direct/:receiverid", (req, res) => {
    if (db.User === null) {
        return res
            .status(401)
            .json({ error: "You need to be logged in to do this" });
    }
    const { message } = req.body;
    const receiverId = parseInt(req.params.receiverid);

    const receiverIndex = db.Users.findIndex((user) => user.id === receiverId);

    if (message === "") {
        return res.status(400).json({ error: "The message can not be empty" });
    } else if (receiverIndex === -1) {
        return res.status(404).json({ error: "Receiver user not found" });
    } else if (receiverId === db.User.id) {
        return res
            .status(400)
            .json({ error: "Receiver can not be the sender" });
    }

    const directLoginIndex = db.User.direct.findIndex(
        (direct) => direct.userId === receiverId
    );

    if (directLoginIndex === -1) {
        const directLoginId =
            db.User.direct.length > 0
                ? db.User.direct[db.User.direct.length - 1].id + 1
                : 1;
        const directLoginObj = {
            id: directLoginId,
            userId: receiverId,
            message: [
                {
                    id: 1,
                    sender: db.User.id,
                    message: message,
                },
            ],
        };
        db.User.direct.push(directLoginObj);

        const directReceiverId =
            db.Users[receiverIndex].direct.length > 0
                ? db.Users[receiverIndex].direct[
                      db.Users[receiverIndex].direct.length - 1
                  ].id + 1
                : 1;

        const directReceiverObj = {
            id: directReceiverId,
            userId: db.User.id,
            message: [
                {
                    id: 1,
                    sender: db.User.id,
                    message: message,
                },
            ],
        };

        db.Users[receiverIndex].direct.push(directReceiverObj);

        return res.status(200).json(directLoginObj);
    } else {
        const chatReceiverIndex = db.Users[receiverIndex].direct.findIndex(
            (direct) => direct.userId === db.User.id
        );
        const newMessageId =
            db.User.direct[directLoginIndex].message[
                db.User.direct[directLoginIndex].message.length - 1
            ].id + 1;
        const newMessage = {
            id: newMessageId,
            sender: db.User.id,
            message: message,
        };
        db.User.direct[directLoginIndex].message.push(newMessage);
        db.Users[receiverIndex].direct[chatReceiverIndex].message.push(
            newMessage
        );

        return res.status(200).json(db.User.direct[directLoginIndex]);
    }
});

export default messageRouter;
