const db = {
    Users: [],
    User: null, //logged user
    Rooms: []
}

/* 
    User: {
        id:
        username:
        password:
    }

    Room: {
        id:
        users: [{id}]
        messages: [
            {
                id:
                userId:
                Message:
            }
        ]
    }

*/

export default db;