import {
    Autocomplete,
    AutocompleteChangeReason,
    AutocompleteInputChangeReason,
    TextField
} from "@mui/material";
import { SearchBarProps } from "../lib/app.types";
import { SyntheticEvent, useCallback, useEffect, useRef } from "react";
import { debounce } from "../lib/debounce";

function SearchBar(props: SearchBarProps) {
    const searchTerms = props.searchTerms.reverse();

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

    function handleInputChange(e: SyntheticEvent, v: string, r: AutocompleteInputChangeReason | AutocompleteChangeReason) {
        if (r === 'input') {
            debouncedSearch(v);
        }
        if (r === 'clear') {
            props.deactivateSearch();
        }
        if (r === 'selectOption') {
            // No debounce for direct selection - immediate execution
            if (v.trim()) {
                props.activateSearch(v);
            }
        }
    }

    // function handleClose(e: SyntheticEvent<Element, Event>, r: AutocompleteCloseReason) {
    //     console.log('closed');
    //     props.deactivateSearch();
    // }

    return (
        <Autocomplete
            disablePortal={true}
            className={"search-autocomplete"}
            id="search-bar-input"
            options={searchTerms}
            sx={{width: 400}}
            renderInput={(params) => <TextField {...params} label="Search"/>}
            onInputChange={handleInputChange}
            // onClose={handleClose}
            noOptionsText={''}
            onChange={(e, v, r) => handleInputChange(e, v as string, r)}
            selectOnFocus={true}
        />
    );
}

export { SearchBar };
