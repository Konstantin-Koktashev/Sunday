var gBoard = [

    {
        _id: "ID",
        name: "name",
        createdAt: "date",
        // Aggregation
        admins: [], // Min users
        users: [{
            userName: "name",
            fullName: " full name",
            password: "password",
            _id: "ID",
            isAdmin: "true",
            imgUrl: "www.img.com",
            lastSeen: "today",
            loggedAmount: 2,
            location: "tel aviv",
            notifications: [], //notification object
            boards: [] // Boards ids
        }, {
            userName: "name",
            fullName: " full name",
            password: "password",
            _id: "ID",
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
                    users: [], // Min users
                    // Inside Tas
                    columns: [], //  Columns Objects
                    updates: [], // updates objects
                    notes: [], // Notes objects
                    people:[],
                    status:'',
                    priority:'',
                    DueDate:'',
                    budget:'',
                    text:'',
                    link:''
                
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
                    status:'',
                    priority:'',
                    DueDate:'',
                    budget:'',
                    text:'',
                    link:''
                
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
                    people:[],
                    status:'',
                    priority:'',
                    DueDate:'',
                    budget:'',
                    text:'',
                    link:''
                
                }

                ], // Task object
                color: "color",
                lastUpdated: ""
            },
            {
                _id: 1234,
                name: "name",
                createdAt: "date",
                // Aggregation
                tasks: [], // Task object
                color: "color",
                lastUpdated: ""
            },
            {
                _id: 1235,
                name: "name",
                createdAt: "date",
                // Aggregation
                tasks: [], // Task object
                color: "color",
                lastUpdated: ""
            }

        ], // _Group Objects
        // Hard coded
        color: "color",
        history: [] //history objects
    }
]