import {useContext} from "react";
import TasksContext from "../../contexts/Tasks/Tasks.js";

/** @module hooks/useTasks */

/**
 * Custom hook to access the {@link module:contexts/Tasks/Tasks~TasksContext|TasksContext}
 *
 * Checks if the context is used within its provider,
 * if yes - returns the context, if no - throws an error.
 *
 * @throws {Error} if used outside {@link module:contexts/Tasks/TasksProvider~TasksProvider|TasksProvider}
 * @returns {module:contexts/Tasks/Tasks~TasksContextValue} context value {@link module:contexts/Tasks/Tasks~TasksContextValue|TasksContextValue}
 */
const useTasks = () => {
    const context = useContext(TasksContext)

    if (!context) {
        throw new Error('useTasks should be used within TasksProvider')
    }

    return context
}

export default useTasks