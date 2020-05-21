const initialState = {
    board: [{
        // BOARD OBJECT
        _id: "1",
        name: "Board 1",
        createdAt: 1589990735884,
        //Label Object
        labels: [
            {
                color: '',
                value: '',
                order: ''

            }
        ],
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
                // ABIR COLS DONT TOUCH
                columns: [
                    {
                        type: 'date',
                        value: 'Date',
                        order: '4'

                    },
                    {
                        type: 'poeple',
                        value: 'poeple',
                        order: '5'

                    },
                    {
                        type: 'label',
                        value: 'Labels',
                        order: '3'

                    },
                    {
                        type: 'text',
                        value: 'Text',
                        order: '1'

                    },
                    {
                        type: 'number',
                        value: 'number',
                        order: '2'

                    }
                ],

                tasks: [{
                    _id: 2222,
                    taskTitle: "Todo",
                    createdAt: "date",
                    // Aggregation
                    users: [
                        { _id: 1234, name: 'shahar' }
                    ], // Min users
                    // ABIR COLS DONT TOUCH
                    columns: [
                        {
                            type: 'label',
                            value: 'Done3',
                            order: 3
                        },
                        {
                            type: 'text',
                            value: 'im text1',
                            order: 1
                        },
                        {
                            type: 'number',
                            value: 100,
                            order: 2
                        }
                    ], //  Columns Objects
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
                    people: [],
                    status: 'Done',
                    priority: 'urgent',
                    DueDate: '15.02',
                    budget: '150',
                    text: 'text about task',
                    link: ''
                }, {
                    _id: 2222,
                    taskTitle: "Todo",
                    createdAt: "date",
                    // Aggregation
                    users: [
                        { _id: 1234, name: 'shahar' }
                    ], // Min users
                    // ABIR COLS DONT TOUCH
                    columns: [
                        {
                            type: 'label',
                            value: 'Done3',
                            order: 3

                        },
                        {
                            type: 'text',
                            value: 'im text1',
                            order: 1

                        },
                        {
                            type: 'number',
                            value: 100,
                            order: 2

                        }


                    ], //  Columns Objects
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
                    people: [],
                    status: 'Done',
                    priority: 'urgent',
                    DueDate: '15.02',
                    budget: '150',
                    text: 'text about task',
                    link: ''
                },
                {
                    _id: 2222,
                    taskTitle: "Todo",
                    createdAt: "date",
                    // Aggregation
                    users: [
                        { _id: 1234, name: 'shahar' }
                    ], // Min users
                    // ABIR COLS DONT TOUCH
                    columns: [
                        {
                            type: 'label',
                            value: 'Done3',
                            order: 3

                        },
                        {
                            type: 'text',
                            value: 'im text1',
                            order: 1

                        },
                        {
                            type: 'number',
                            value: 100,
                            order: 2

                        }


                    ], //  Columns Objects
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
                    people: [],
                    status: 'Done',
                    priority: 'urgent',
                    DueDate: '15.02',
                    budget: '150',
                    text: 'text about task',
                    link: ''
                },
                {
                    _id: 2222,
                    taskTitle: "Todo",
                    createdAt: "date",
                    // Aggregation
                    users: [
                        { _id: 1234, name: 'shahar' }
                    ], // Min users
                    // ABIR COLS DONT TOUCH
                    columns: [
                        {
                            type: 'label',
                            value: 'Done3',
                            order: 3

                        },
                        {
                            type: 'text',
                            value: 'im text1',
                            order: 1

                        },
                        {
                            type: 'number',
                            value: 100,
                            order: 2

                        }


                    ], //  Columns Objects
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
                    people: [],
                    status: 'Done',
                    priority: 'urgent',
                    DueDate: '15.02',
                    budget: '150',
                    text: 'text about task',
                    link: ''
                },


                ], // Task object
                color: 'blue',
                lastUpdatedAt: ""
            }
        ],
        //group over

        // _Group Objects
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
                descryption: "status was Change ",
                nextValue: 'urgent',
                prevValue: 'Low',
                assignedTo: 'Abir',
                createdBy: 'Kosta',
                defaultMsg: 'status was Change ',
                path: 'Sunday/FrontEnd/CreatApp',
                assosicatedTaskId: '2222'
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
                descryption: "Priority was Changed ",
                prevValue: 'medium',
                prevValue: 'critical',
                assignedTo: 'Abir',
                createdBy: 'Kosta',
                defaultMsg: 'Priority changed ',
                historyPath: 'Sunday/FrontEnd/CreatApp',
                assosicatedTaskId: '111'
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




// columns: [
//     { type: 'done' }
//     , { priority: 'important' }
//     , { dueDate: 'tommarow' }
//     , { budget: 100 }
//     , { text: 'hey' }
//     , { link: '' }]