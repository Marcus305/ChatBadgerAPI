const db = {
    Users: [],
    User: null, //logged user
    Rooms: [],
};

/* 
    User: {
        id:
        username:
        password:
        Directs: [
            {
                id:
                userid: //the user 
                messages: [
                    {
                        id:
                        sender:
                        message:
                    }
                ]
            }
        ]
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
