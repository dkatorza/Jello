

const initialState = {
    boards: [],
    board: null,
    task:null,
    currTask:null,
    currPopUp: {
        name: '',
        title:'',
        group:'',
        task:'',
        left: 0,
        top: 0,
        from:'',
    }
}
// console.log('initialState',initialState);
export function boardReducer(state = initialState, action) {

    switch (action.type) {
        case 'SET_BOARDS':
            return { ...state, boards: [ ...action.boards ] }
        case 'SAVE_BOARDS':
            return { ...state, boards: [ ...action.boards ] }
        case 'SAVE_BOARD':
            return { ...state, board: { ...action.board } }
        case 'SET_BOARD':
            return { ...state, board: action.board }
        case 'SET_POPUP':
            return { ...state, currPopUp: { name: action.cmpName, title: action.cmpTitle, group:action.group, task:action.task, top: action.top, left: action.left, from: action.from } }
        case 'SET_CURRTASK':
            return {...state,  currTask: {...action.task} }
     
            default:
            return state
    }

}


