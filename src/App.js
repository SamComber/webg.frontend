import Grid from "@material-ui/core/Grid";
import React, { useState } from "react";

import axios from "./axiosInstance";
import './App.css';
import URLInput from "./components/URLInput"

function App() {

    const [state, setState] = useState();


    const getWebPage = (url) => {
        axios.get("webPage", { params: { url } })
            .then((response) => {
                setState(response.data);
            })
            .catch(error => alert(error.message))
    }

    return (
        <Grid
            container
            spacing={1}
            style={{height: "100vh"}}
        >

            <Grid item xs={12} style={{height: "5vh"}}>
                <URLInput getWebPage={getWebPage}/>
            </Grid>

            <Grid
                container
                item
                xs={12}
                style={{height: "95vh"}}>

                <Grid item xs={6}>
                    <div>
                        col1
                    </div>
                </Grid>
                <Grid item xs={6} >
                    <div>
                        col2
                    </div>
                </Grid>
            </Grid>

        </Grid>
    );
}

export default App;
