// Guidelines
// *. Support saving the entire board and also on the task level, 
// (no need for seperate APIs for mini-updates of task parts like members or status)
// *. No need for saving an activities array per task, those activities are easily filtered from the board activities
// *. activites - when board is updated, the frontend does not send the activities array within the board 
//    instead it only sends a new activity object: {txt, boardId, groupId, taskId}
//    the backend adds this activity to the board with $push and can also emit socket notificatios
// *. D & D Guidelines - vuedraggable / react-beutiful-dnd
// *. Same model for Monday style app (do not implement a generic columns feature)
// *. boardStore no need for group/task stores

// *. We do not handle concurrent editing - needs versioning

// Rendering performance:
// Store Mutation - saveBoard
// state.board = board
// Later, support switching a specific task

// Store - saveTask
function storeSaveTask(){

    const activity =   {
        "id": makeId(),
        "txt": "Changed Color",
        "createdAt": Date.now(),
        "byMember": userService.getLoggedinUser(),
        "task": task
    }
    board = boardService.saveTask(boardId, payload.groupId, payload.task, activity)
    commit(board)  
}
// socketService.emit('update-task', {boardId, groupId: payload.groupId, task: payload.task})


// boardService  -- BACKEND eventually
function saveTask(boardId, groupId, task, activity) {
    const board = getById(boardId)
    //TODO find the task, and update
    board.activities.push(activity)
    saveBoard(board)
    return board
}

async function loadAndWatchBoard({ commit }, { boardId }) {
    function commitBoard(board) {
        commit({ type: 'setWatchedBoard', board })
    }
    function commitTask(task) {
        commit({ type: 'setWatchedBoardTask', task })
    }
    try {
        const board = await boardService.getById(boardId);
        commitBoard(board)

        socketService.emit(SOCKET_EMIT_BOARD_WATCH, boardId) // This line needed when backend
        socketService.off(SOCKET_EVENT_BOARD_UPDATED, commitBoard)
        socketService.off(SOCKET_EVENT_TASK_UPDATED, commitTask)

        socketService.on(SOCKET_EVENT_BOARD_UPDATED, commitBoard)
        socketService.on(SOCKET_EVENT_TASK_UPDATED, commitTask)
    } catch (err) {
        console.log('userStore: Error in loadAndWatchBoard', err)
        throw err
    }
}



const board = {
    "_id": "b101",
    "title": "Robot dev proj",
    "createdAt": 1589983468418,
    "createdBy": {
        "_id": "u101",
        "fullname": "Abi Abambi",
        "imgUrl": "http://some-img"
    },
    "style": {},
    "labels": [
        {
            "id": "l101",
            "title": "Done",
            "color": "#61bd4f"
        }
    ],
    "members": [
        {
            "_id": "u101",
            "fullname": "Tal Tarablus",
            "imgUrl": "https://www.google.com"
        }
    ],
    "groups": [
        {
            "id": "g101",
            "title": "Group 1",
            "tasks": [
                {
                    "id": "c101",
                    "title": "Replace logo"
                },
                {
                    "id": "c102",
                    "title": "Add Samples"
                }
            ],
            "style": {}
        },
        {
            "id": "g102",
            "title": "Group 2",
            "tasks": [
                {
                    "id": "c103",
                    "title": "Do that"
                },
                {
                    "id": "c104",
                    "title": "Help me",
                    "description": "description",
                    "comments": [
                        {
                            "id": "ZdPnm",
                            "txt": "also @yaronb please CR this",
                            "createdAt": 1590999817436.0,
                            "byMember": {
                                "_id": "u101",
                                "fullname": "Tal Tarablus",
                                "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                            }
                        }
                    ],
                    "checklists": [
                        {
                            "id": "YEhmF",
                            "title": "Checklist",
                            "todos": [
                                {
                                    "id": "212jX",
                                    "title": "To Do 1",
                                    "isDone": false
                                }
                            ]
                        }
                    ],
                    "members": [
                        {
                            "_id": "u101",
                            "username": "Tal",
                            "fullname": "Tal Tarablus",
                            "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                        }
                    ],
                    "labelIds": ["l101", "l102"],
                    "createdAt": 1590999730348,
                    "dueDate": 16156215211,
                    "byMember": {
                        "_id": "u101",
                        "username": "Tal",
                        "fullname": "Tal Tarablus",
                        "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                    },
                    "style": {
                        "bgColor": "#26de81"
                    }
                }
            ],
            "style": {}
        }
    ],
    "activities": [
        {
            "id": "a101",
            "txt": "Changed Color",
            "createdAt": 154514,
            "byMember": {
                "_id": "u101",
                "fullname": "Abi Abambi",
                "imgUrl": "http://some-img"
            },
            "task": {
                "id": "c101",
                "title": "Replace Logo"
            }
        }
    ],
    // for monday
    "cmpsOrder": ["status-picker", "member-picker", "date-picker"]
}
const user = {
    "_id": "u101",
    "fullname": "Abi Abambi",
    "username": "abi@ababmi.com",
    "password": "aBambi123",
    "imgUrl": "http://some-img.jpg",
    "mentions": [{
        "id": "m101",
        "boardId": "m101",
        "taskId": "t101"
    }],
    
}


// Dynamic Components: TaskPreview <component :is="currCmp.type" :info="currCmp.info" @updated="updateTask(currCmp.type, $event)">
const cmp1 = {
    type: 'status-picker',
    info: {
        selectedStatus : 'pending',
        statuses: [{}, {}]
    }
}

const cmp2 = {
    type: 'member-picker',
    info: {
        selectedMembers : ['m1', 'm2'],
        members : ['m1', 'm2', 'm3']
    }
}

// Vue Mehotds:
function updateTask(cmpType, data) {

    // Switch
    // task.members = data;
    // task.status = data;

}

