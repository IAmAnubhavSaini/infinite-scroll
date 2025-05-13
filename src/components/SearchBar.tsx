import { SearchBarProps } from "../lib/app.types";
import { useCallback, useState, useMemo } from "react";
import { debounce } from "../lib/debounce.js";

function SearchBar(props: SearchBarProps) {
    const reversedSearchTerms = useMemo(() => [...props.searchTerms].reverse(), [props.searchTerms]);
    const [showOptions, setShowOptions] = useState(false);
    const [inputValue, setInputValue] = useState("");

    // Create a memoized debounced version of the search activation
    const debouncedSearch = useCallback(
        debounce((value: string) => {
            if (value.trim()) {
                props.activateSearch(value);
            } else if (props.isInSearch) {
                props.deactivateSearch();
            }
        }, 500),
        [props.activateSearch, props.deactivateSearch, props.isInSearch]
    );

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setInputValue(value);
        setShowOptions(value.length > 0);
        debouncedSearch(value);
    }

    function handleOptionSelect(value: string) {
        setInputValue(value);
        setShowOptions(false);
        props.activateSearch(value);
    }

    function handleClear() {
        setInputValue("");
        setShowOptions(false);
        props.deactivateSearch();
    }

    return (
        <div className="search-container">
            <div className="search-input-wrapper">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search"
                    value={inputValue}
                    onChange={handleInputChange}
                    onFocus={() => setShowOptions(inputValue.length > 0)}
                />
                {inputValue && (
                    <button className="clear-button" onClick={handleClear}>
                        ×
                    </button>
                )}
            </div>
            {showOptions && reversedSearchTerms.length > 0 && (
                <ul className="search-options">
                    {reversedSearchTerms.map((term, index) => (
                        <li
                            key={`${term}-${index}`}
                            onClick={() => handleOptionSelect(term)}
                            className="search-option"
                        >
                            {term}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export { SearchBar };
