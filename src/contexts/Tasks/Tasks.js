import {createContext} from "react";

/** @module contexts/Tasks/Tasks */

/**
 * @typedef {Object} Task
 *
 * @property {string} id - unique id of the task
 * @property {string} text - text of the task
 * @property {boolean} isCompleted - status of the task
 */

/**
 * @typedef {Object} TasksContextValue
 *
 * @property {Task[]} tasks - array of tasks
 * @property {function(string): void} createTask - function to create a task
 * @property {function(string): void} completeTask - function to complete a task
 * @property {function(string): void} deleteTask - function to delete a task
 * @property {function(): void} deleteCompletedTasks - function to delete all completed tasks
 * @property {function(): void} deleteTasks - function to delete all tasks
 */

/**
 * Context for tasks
 *
 * @type {React.Context<TaskContextValue | null>}
 */
const TasksContext = createContext(null)

export default TasksContext