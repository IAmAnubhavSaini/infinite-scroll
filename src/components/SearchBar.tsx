import {
    Autocomplete,
    AutocompleteChangeReason,
    AutocompleteInputChangeReason,
    debounce,
    TextField
} from "@mui/material";
import {SearchBarProps} from "../lib/app.types";
import {SyntheticEvent} from "react";

function SearchBar(props: SearchBarProps) {
    const searchTerms = props.searchTerms.reverse();

    function handleInputChange(e: SyntheticEvent, v: string, r: AutocompleteInputChangeReason | AutocompleteChangeReason) {
        console.log(e, v, r);
        if (r === 'input') {
            props.activateSearch(v);
        }
        if (r === 'clear') {
            props.deactivateSearch();
        }
        if (r === 'selectOption') {
            console.log(v);
            props.activateSearch(v);
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
            onInputChange={debounce(handleInputChange, 400)}
            // onClose={handleClose}
            noOptionsText={''}
            onChange={(e, v, r) => handleInputChange(e, v as string, r)}
            selectOnFocus={true}
        />
    );
}

export {SearchBar};
