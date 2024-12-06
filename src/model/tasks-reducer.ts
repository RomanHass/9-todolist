import {TasksStateType, TaskType} from "../App";
import {v1} from "uuid";
import { AddTodolistActionType, RemoveTodolistActionType } from "./todolists-reducer";

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
	switch (action.type) {
		case 'REMOVE_TASK': {
			return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
		}
		case 'ADD_TASK': {
			const newTask: TaskType = { id: v1(), title: action.title, isDone: false }
			return {...state, [action.todolistId]: [newTask, ...state[action.todolistId]]}
		}
		case 'REMOVE-TODOLIST': {
			delete state[action.payload.id]
			return {...state}
		}
		case 'CHANGE_TASK_STATUS': {
			return {...state, [action.todolistId]: state[action.todolistId].map(tl => tl.id === action.taskId ? {...tl, isDone: action.isDone} : tl)}		
		}
		case 'CHANGE_TASK_TITLE': {
			return {...state, [action.todolistId]: state[action.todolistId].map(tl => tl.id === action.taskId ? {...tl, title: action.title} : tl)}		
		}
		case 'ADD-TODOLIST': {
			return {...state, [action.payload.todolistId]: []}
		}
		default:
			throw new Error("I don't understand this type")
	}
}

// Action creators
export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
	return {type: 'REMOVE_TASK', taskId, todolistId} as const
}

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
	return {type: 'ADD_TASK', title, todolistId} as const
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
	return {
		type: 'CHANGE_TASK_STATUS',
		taskId,
		isDone,
		todolistId
	} as const
}

export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string): ChangeTaskTitleActionType => {
	return { type: 'CHANGE_TASK_TITLE', todolistId, taskId, title} as const
}

// Actions types
export type RemoveTaskActionType = {
	type: 'REMOVE_TASK'
	taskId: string
	todolistId: string
}
export type AddTaskActionType = {
	type: 'ADD_TASK'
	title: string
	todolistId: string
}
export type ChangeTaskStatusActionType = {
	type: 'CHANGE_TASK_STATUS'
	taskId: string
	isDone: boolean
	todolistId: string
}
export type ChangeTaskTitleActionType = {
	type: 'CHANGE_TASK_TITLE'
	todolistId: string
	taskId: string
	title: string
}


type ActionsType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType | AddTodolistActionType | RemoveTodolistActionType

