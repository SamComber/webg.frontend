import React from "react";
import { CircularProgress } from '@mui/material';

import styles from "./loading_spinner.module.css";

const LoadingSpinner = () => {
    return (
        <div style={{display: "flex", justifyContent: "center", width: "100vw"}}>
            <CircularProgress/>
        </div>
    )
}

export default LoadingSpinner
