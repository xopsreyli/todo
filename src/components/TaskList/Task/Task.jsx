import styles from './Task.module.css';
import useTasks from "../../../hooks/useTasks/useTasks.js";
import CheckMark from '../../../assets/svg/check-mark.svg?react'
import CrossIcon from '../../../assets/svg/cross.svg?react'
import {useEffect, useRef} from "react";
import delayAction from "../../../utils/delayAction/delayAction.js";

/** @module components/TaskList/Task */

/**
 * Task component
 *
 * Renders a list item that represents a task. Contain a task's text, status checkbox, and delete button.
 * Gets different styles if the task is completed.
 *
 * Handles the completion and deletion of the task
 * using methods `completeTask` and `deleteTask` from {@link module:hooks/useTasks~useTasks|useTasks}
 *
 * @param {Object} props
 * @param {Object} props.task - Task object
 *
 * @returns {JSX.Element} List item representing a task
 */
const Task = ({task}) => {
    const {
        id,
        text,
        isCompleted,
    } = task
    const {
        completeTask,
        deleteTask,
    } = useTasks()
    const completeTimeout = useRef(null)
    const deleteTimeout = useRef(null)

    useEffect(() => {
        return () => {
            clearTimeout(completeTimeout.current)
            clearTimeout(deleteTimeout.current)
        }
    }, [])

    const handleCheck = () => {
        if (completeTimeout.current) return

        completeTimeout.current = delayAction(() => {
            completeTask(id)
            completeTimeout.current = null
        }, 200)
    }

    const handleDelete = () => {
        if (deleteTimeout.current) return

        deleteTimeout.current = delayAction(() => {
            deleteTask(id)
            deleteTimeout.current = null
        }, 200)
    }

    return (
        <li
            className={styles.task}
        >
            <label className={styles.task__status} htmlFor={id}>
                <CheckMark className={styles[`check-mark`]} />
                <input
                    type="checkbox"
                    id={id}
                    checked={isCompleted}
                    onChange={handleCheck}
                    disabled={isCompleted}
                />
            </label>
            <span className={styles.task__text}>{text}</span>
            <button
                className={styles.task__delete}
                onClick={handleDelete}
                aria-label={`Delete task`}
            >
                <CrossIcon className={styles[`cross-icon`]} />
            </button>
        </li>
    );
};

export default Task;