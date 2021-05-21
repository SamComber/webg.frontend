import React, { useRef } from 'react';

import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

import styles from "./search_bar.module.css"

const SearchBar = ({ getWebPage }) => {

    const inputElement = useRef(null);

    return (
        <Paper className={styles.searchBarContainer}>
            <InputBase
                className={styles.searchBarInput}
                placeholder="Enter URL"
                inputProps={{'aria-label': 'enter url'}}
                inputRef={inputElement}
            />
            <IconButton className={styles.searchBarIcon} onClick={() => getWebPage(inputElement.current.value)}>
                <SearchIcon/>
            </IconButton>
        </Paper>
    );
}

export default SearchBar;
