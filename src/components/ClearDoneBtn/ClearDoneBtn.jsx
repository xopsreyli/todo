import useTasks from "../../hooks/useTasks/useTasks.js";
import {useMemo} from "react";
import styles from "./ClearDoneBtn.module.css";

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

    const completedTasks = useMemo(() => {
        return tasks.filter(task => task.isCompleted)
    }, [tasks])

    if (completedTasks.length === 0) return null

    return (
        <button
            className={styles.btn}
            onClick={deleteCompletedTasks}
        >Clear Done</button>
    );
};

export default ClearDoneBtn;