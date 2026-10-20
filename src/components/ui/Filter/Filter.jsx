import styles from './Filter.module.css';
import FilterBtn from "./FilterBtn/FilterBtn.jsx";

/** @module components/ui/Filter */

/**
 * A filter component
 *
 * Renders a {@link module:components/ui/Filter/FilterBtn~FilterBtn|FilterBtn} for each option and allows picking one at a time.
 *
 * @param {Object} props
 * @param {string[]} props.options - List of unique values for filter
 * @param {string} props.name - A name attribute shared by all radio buttons
 * @param {string} props.current - Current selected option
 * @param {function(string): void} props.setCurrent - Function to set the current value
 *
 * @returns {JSX.Element} A filter component with rendered options
 */
const Filter = ({ options, name, current, setCurrent }) => {
    return (
        <div className={styles.filter}>
            {options.map((option) => (
                <FilterBtn
                    key={option}
                    value={option}
                    name={name}
                    current={current}
                    setCurrent={setCurrent}
                />
            ))}
        </div>
    );
};

export default Filter;