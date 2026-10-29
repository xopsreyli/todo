import useTasks from "../../hooks/useTasks/useTasks.js";
import styles from './DeleteAllBtn.module.css'
import delayAction from "../../utils/delayAction/delayAction.js";
import {useEffect, useRef} from "react";

/** @module components/DeleteAllBtn */

/**
 * A button component.
 *
 * Handles deleting all tasks.
 * Gets tasks from {@link module:hooks/useTasks~useTasks|useTasks}.
 *
 * @returns {JSX.Element|null} A button element if at least 1 task exists,
 * and null, if not.
 */
const DeleteAllBtn = () => {
    const {
        tasks,
        deleteTasks
    } = useTasks()
    const timeoutRef = useRef(null)

    useEffect(() => {
        return () => {
            clearTimeout(timeoutRef.current)
        }
    }, [])

    const handleClick = () => {
        if (timeoutRef.current) return

        timeoutRef.current = delayAction(() => {
            deleteTasks()
            timeoutRef.current = null
        }, 500)
    }

    if (tasks.length === 0) return null

    return (
        <button
            className={styles.btn}
            onClick={handleClick}
        >Delete All</button>
    );
};

export default DeleteAllBtn;