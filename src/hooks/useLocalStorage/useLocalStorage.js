import {useCallback, useState} from "react"

/** @module hooks/useLocalStorage */

/**
 * Retrieves the value from local storage on a load.
 *
 * Falls back to defaultValue if the key was not found or if an error occurs.
 *
 * @function getValueOnLoad
 *
 * @param {string} key - The key of a value in local storage.
 * @param {*} defaultValue - The default value to return if the key is not found.
 *
 * @returns {*} The value from local storage or 'defaultValue'.
 */
const getValueOnLoad = (key, defaultValue) => {
    try {
        const value = localStorage.getItem(key)
        return value === null ? defaultValue : JSON.parse(value)
    } catch {
        return defaultValue
    }
}

/**
 * Custom hook to work with local storage and sync changes via the state.
 *
 * @param {string} key - The key for local storage.
 * @param {*} defaultValue - The default value.
 *
 * @returns {Array} An array of:
 *  1. item - current state value
 *  2. set - a function to set a new value and update the state
 *  3. remove - a function to remove the value from local storage and reset to 'defaultValue'.
 */
const useLocalStorage = (key, defaultValue) => {
    const [item, setItem] = useState(() => getValueOnLoad(key, defaultValue))

    const set = useCallback((value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value))
            setItem(value)
        } catch (e) {
            console.error(e.message)
        }
    }, [key])

    const remove = useCallback(() => {
        try {
            localStorage.removeItem(key)
            setItem(defaultValue)
        } catch (e) {
            console.error(e.message)
        }
    }, [key, defaultValue])

    return [item, set, remove]
}

export default useLocalStorage