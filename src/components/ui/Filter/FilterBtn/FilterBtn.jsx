import styles from "./FilterBtn.module.css"

/** @module components/ui/Filter/FilterBtn */

/**
 * A radio option for {@link module:components/ui/Filter~Filter|Filter}
 *
 * Renders a radio option. Shows the state if the `value` is the same as the `current` value from filter.
 * Handles setting its value as the current value of the filter.
 *
 * Internal part of {@link module:components/ui/Filter~Filter|Filter}: it is rendered as the radio option for the filter
 * and is not meant to be used on its own.
 *
 * @param {Object} props
 * @param {string} props.value - The value of the radio
 * @param {string} props.name - The name for name attribute of the radio
 * @param {string} props.current - The current value of the filter
 * @param {function(string): void} props.setCurrent - The function to set the current value of the filter
 *
 * @returns {JSX.Element} The radio option
 */
const FilterBtn = ({
    value,
    name,
    current,
    setCurrent,
                   }) => {
    const handleChange = () => {
        setCurrent(value)
    }

    return (
        <label
            className={styles.option}
            htmlFor={value}
        >
            <span>{value}</span>
            <input
                type="radio"
                name={name}
                id={value}
                value={value}
                checked={current === value}
                onChange={handleChange}
            />
        </label>
    );
};

export default FilterBtn;