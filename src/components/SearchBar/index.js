import React, { useRef } from 'react';

import { Paper, InputBase, IconButton } from '@mui/material';
import { Search } from '@mui/icons-material';

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
                <Search/>
            </IconButton>
        </Paper>
    );
}

export default SearchBar;
