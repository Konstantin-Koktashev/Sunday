const initialState = {
    board: [{
        // BOARD OBJECT
        _id: "1",
        name: "Board 1",
        createdAt: "date",
        // Aggregation
        admins: [{
            userName: "user1412",
            _id: "1",
        }], // Min users
        users: [{
            userName: "user1412",
            fullName: " full name1412",
            password: "password",
            _id: "1",
            isAdmin: "true",
            imgUrl: "www.img.com",
            lastSeen: "today",
            loggedAmount: 2,
            location: "tel aviv",
            notifications: [], //notification object
            boards: [] // Boards ids
        },
        {
            userName: "user112",
            fullName: " full name1123",
            password: "password",
            _id: "1",
            isAdmin: "true",
            imgUrl: "www.img.com",
            lastSeen: "today",
            loggedAmount: 2,
            location: "tel aviv",
            notifications: [], //notification object
            boards: [] // Boards ids
        },
        {
            userName: "user2",
            fullName: " full name2",
            password: "password",
            _id: "1",
            isAdmin: "true",
            imgUrl: "www.img.com",
            lastSeen: "today",
            loggedAmount: 2,
            location: "tel aviv",
            notifications: [], //notification object
            boards: [] // Boards ids
        }], // Min users
        groups: [
            {
                _id: 123,
                name: "",
                createdAt: "date",
                // Aggregation
                tasks: [{
                    _id: 2222,
                    taskTitle: "Todo",
                    createdAt: "date",
                    // Aggregation
                    users: [{
                        userName: "user1412",
                        _id: "1",
                    }], // Min users
                    // Inside Tas
                    updates: [{
                        name: 'name',
                        user: {
                            userName: "user1412",
                            _id: "1",
                        },
                        lastUpdate: Date.now(),
                        value: "I changed all",
                        imgUrl: "",
                    }], // updates objects
                    notes: [{
                        name: "name",
                        value: "value",
                        user: {
                            userName: "user1412",
                            _id: "1",
                        },
                        lastUpdate: Date.now()

                    }], // Notes objects
                    people: [
                        {
                            userName: "user1412",
                            _id: "1",
                        },
                        {
                            userName: "user1412",
                            _id: "1",
                        }, {
                            userName: "user1412",
                            _id: "1",
                        }
                    ],
                    status: 'done',
                    priority: 'important',
                    DueDate: 'tommarow',
                    budget: '100',
                    text: 'hey',
                    link: ''

                }
                ], // Task object
                color: "color",
                lastUpdated: ""
            }
        ], // _Group Objects
        // Hard coded
        color: "color",
        history: [
            {
                name: "name",
                user: [{
                    userName: "user1412",
                    _id: "1",
                }, {
                    userName: "user14as12",
                    _id: "2",
                }],
                lastUpdate: Date.now(),
                actionType: "something",
                prevValue: "from 1",
                nextValue: "to 2"
            }
        ] //history objects
    }
    ]
};

export default function (state = initialState, action = {}) {
    switch (action.type) {
        case 'SET_BOARD':
            return { ...state, boards: action.reviews };
        case 'foundTasks':
            return {
                ...state,
                board: {
                    ...state.boards,
                    groups: {
                        ...state.boards.groups,
                        tasks: { ...state.board.groups.tasks }
                    }
                }
            };
        default:
            return state;
    }
}
