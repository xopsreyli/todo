import useTasks from "../../hooks/useTasks/useTasks.js";
import {useEffect, useMemo, useRef} from "react";
import styles from "./ClearDoneBtn.module.css";
import delayAction from "../../utils/delayAction/delayAction.js";

/** @module components/ClearDoneBtn */

/**
 * A button component.
 *
 * Handles clearing completed tasks.
 * Gets tasks from {@link module:hooks/useTasks~useTasks|useTasks}.
 *
 * @returns {JSX.Element|null} A button element if at least 1 completed task exists,
 * and null, if not.
 */
const ClearDoneBtn = () => {
    const {
        tasks,
        deleteCompletedTasks,
    } = useTasks()
    const timeoutRef = useRef(null)

    useEffect(() => {
        return () => {
            clearTimeout(timeoutRef.current)
        }
    }, [])

    const completedTasks = useMemo(() => {
        return tasks.filter(task => task.isCompleted)
    }, [tasks])

    const handleClick = () => {
        if (timeoutRef.current) return

        timeoutRef.current = delayAction(() => {
            deleteCompletedTasks()
            timeoutRef.current = null
        }, 500)
    }

    if (completedTasks.length === 0) return null

    return (
        <button
            className={styles.btn}
            onClick={handleClick}
        >Clear Done</button>
    );
};

export default ClearDoneBtn;