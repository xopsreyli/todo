import {createContext} from "react";

/** @module contexts/StatusFilter/StatusFilter */

/**
 * @typedef {Object} StatusFilterContextValue
 *
 * @property {string} filter - The current value
 * @property {function(string): void} setFilter - Function to set the current value
 * @property {string[]} options - All available options
 */

/**
 * Context for the status statusFilter
 *
 * @type {React.Context<StatusFilterContextValue | null>}
 */
const StatusFilterContext = createContext(null)

export default StatusFilterContext