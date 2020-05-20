const initialState = {
    board: [{
        // BOARD OBJECT
        _id: "1",
        name: "Board 1",
        createdAt: 1589990735884,
        // Aggregation
        admins: [{
            userName: "user1412",
            // fullName
            _id: "1",
        }], // Min users
        users: [{
            _id: "1",
            userName: "user1412",
            fullName: " full name1412",
            password: "password", // NO PASSWORD
            isAdmin: true,
            imgUrl: "www.img.com",
            lastSeen: "today", // timestamp
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
                    users: [
                        { _id: 1234, name: 'shahar' }
                    ], // Min users
                    // Inside Tas
                    columns: [], //  Columns Objects
                    updates: [], // updates objects
                    notes: [], // Notes objects
                    people: [],
                    status: 'Done',
                    priority: 'urgent',
                    DueDate: '15.02',
                    budget: '150',
                    text: 'text about task',
                    link: ''

                },
                {
                    _id: 111,
                    taskTitle: "Mess",
                    createdAt: "date",
                    // Aggregation
                    users: [], // Min users
                    // Inside Tas
                    columns: [], //  Columns Objects
                    updates: [], // updates objects
                    notes: [], // Notes objects
                    people: [],
                    status: '',
                    priority: '',
                    DueDate: '',
                    budget: '',
                    text: '',
                    link: ''

                },
                {
                    _id: 12333,
                    taskTitle: "withus",
                    createdAt: "date",
                    // Aggregation
                    users: [], // Min users
                    users: [{
                        userName: "user1412",
                        _id: "1",
                    }], // Min users
                    // Inside Tas
                    updates: [{
                        user: {
                            userName: "user1412",
                            _id: "1",
                        },
                        lastUpdate: Date.now(),
                        description: "I changed all",
                        imgUrl: "",
                        aboutUser: 1234
                    }], // updates objects
                    notes: [{
                        name: "name",
                        description: "value",
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
                    columns: [{ status: 'done' }, { priority: 'important' }, { dueDate: 'tommarow' }, { budget: 100 }, { text: 'hey' }, { link: '' }]
                }
                ], // Task object
                color: 'blue',
                lastUpdatedAt: ""
            }
        ], // _Group Objects
        // Hard coded
        color: 'red',
        history: [
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
                    users: [
                        { _id: 1234 }
                    ], // Min users
                    // Inside Tas
                    columns: [], //  Columns Objects
                    updates: [], // updates objects
                    notes: [], // Notes objects
                    people: [],
                    status: 'undone',
                    priority: 'urgent',
                    DueDate: '15.02',
                    budget: '1540',
                    text: 'text about task 31142',
                    link: ''


                },
                {
                    _id: 111,
                    taskTitle: "Mess",
                    createdAt: "date",
                    // Aggregation
                    users: [], // Min users
                    // Inside Tas
                    columns: [], //  Columns Objects
                    updates: [], // updates objects
                    notes: [], // Notes objects
                    people: [],
                    status: '',
                    priority: '',
                    DueDate: '',
                    budget: '',
                    text: '',
                    link: ''

                },
                {
                    _id: 12333,
                    taskTitle: "withus",
                    createdAt: "date",
                    // Aggregation
                    users: [], // Min users
                    // Inside Tas
                    columns: [], //  Columns Objects
                    updates: [], // updates objects
                    notes: [], // Notes objects
                    people: [],
                    status: '',
                    priority: '',
                    DueDate: '',
                    budget: '',
                    text: '',
                    link: ''

                }

                ], // Task object
                color: "color",
                lastUpdated: "",
                type: 'status',
                name: "name",
                users: [{
                    userName: "user1412",
                    _id: "1234",
                }, {
                    userName: "user14as12",
                    _id: "1234",
                }],
                lastUpdate: Date.now(),
                descryption: "status was Change From",
                nextValue: 'urgent',
                prevValue: 'Low',
                assignedTo: 'Abir',
                createdBy: 'Kosta',
                defaultMsg: 'Assigned To',
                historyPath: 'Sunday/FrontEnd/CreatApp',
            },
            {
                type: 'priority',
                name: "name",
                users: [{
                    userName: "user1412",
                    _id: "1234",
                }, {
                    userName: "user14as12",
                    _id: "1234",
                }],
                lastUpdate: Date.now(),
                descryption: "Priority was Changed From",
                prevValue: 'medium',
                prevValue: 'critical',
                assignedTo: 'Abir',
                createdBy: 'Kosta',
                defaultMsg: 'Assigned To',
                historyPath: 'Sunday/FrontEnd/CreatApp',
            },
            {
                type: 'people',
                name: "name",
                users: [{
                    userName: "user1412",
                    _id: "1234",
                }, {
                    userName: "user14as12",
                    _id: "1234",
                }],
                lastUpdate: Date.now(),
                descryption: "taskAssigned To",
                prevValue: [{ userName: 'Kosta' }, { userName: 'Shahar' }],
                nextValue: [{ userName: 'Kosta' }, { userName: 'Shahar' }, { userName: 'Abir' }],
                assignedTo: 'Abir',
                createdBy: 'Kosta',
                defaultMsg: 'Assigned To',
                historyPath: 'Sunday/FrontEnd/CreatApp',
            },
        ] //history objects
    }]
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
