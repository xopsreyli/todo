/** @module utils/delayAction */

/**
 * Function that adds delay for execution of the action
 *
 * @param {function} action - A callback that will be delayed
 * @param {number} milliseconds - Time of the delay in milliseconds
 *
 * @returns {number} - The timeout ID
 */
const delayAction = (action, milliseconds) => {
    return setTimeout(action, milliseconds)
}

export default delayAction