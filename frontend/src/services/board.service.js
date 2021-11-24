import { storageService } from './async-storage.service'
// const gBoards = require('../data/boards.json')
// const gBoards = require('../data/new-board.json')
// localStorage.setItem("boards",JSON.stringify(gBoards));
// const gBoards = require('../data/presentation-demo-board.json')
// const STORAGE_KEY_BOARD = 'board'

export const boardService = {
    save,
    getBoardById,
    query,
    saveBoards
}

window.boardService = boardService

async function getBoardById(boardId){
    try{
        const boards = await storageService.query('boards') 
        const board = boards.find(board => board._id === boardId) 
        
        return board

    } catch (err) {
        throw err
    }
}

async function query(userId) {
    console.log('query',userId);

    try {
        const boards = await storageService.query('boards') 
        const filterBoards = boards.filter(board => {
            return board.createdBy._id === userId
        })
        // console.log(filterBoards,'board service query');
        return filterBoards
    } catch (err) {
        throw err
    }
}

async function save(data) {
    if (data._id) {
        try {
            const boards = await storageService.query('boards')
            const idx = boards.findIndex(board => board._id === data._id);
            boards[idx] = data;
            await this.saveBoards(boards)
           return await storageService.put('board', data)
        } catch (err) {
            throw err
        }
    } else {
        try {
            return await storageService.post('board', data)
        } catch (err) {
            throw err
        }
    }
}
async function saveBoards(data) {
    try {
        return await storageService.putArray('boards', data)
    } catch (err) {
        throw err
    }
}

    // } else {
    //     try {
    //         return await storageService.post('boards', data)
    //     } catch (err) {
    //         throw err
    //     }
    // }

