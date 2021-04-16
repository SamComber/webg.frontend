    import React, { useRef } from 'react';
    import {makeStyles} from '@material-ui/core/styles';
    import Paper from '@material-ui/core/Paper';
    import InputBase from '@material-ui/core/InputBase';
    import IconButton from '@material-ui/core/IconButton';
    import SearchIcon from '@material-ui/icons/Search';

const URLInput = ({ getWebPage }) => {

    const inputElement = useRef(null);

    const useStyles = makeStyles((theme) => ({
        root: {
            padding: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: "100%",
        },
        input: {
            width: 400,
            marginLeft: theme.spacing(1),
            flex: 1,
        },
        iconButton: {
            padding: 10,
        },
    }));

    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <InputBase
                className={classes.input}
                placeholder="Enter URL"
                inputProps={{'aria-label': 'enter url'}}
                inputRef={inputElement}
            />
            <IconButton className={classes.iconButton} aria-label="search" onClick={() => getWebPage(inputElement.current.value)}>
                <SearchIcon/>
            </IconButton>
        </Paper>
    );
}

export default URLInput;
