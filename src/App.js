import Grid from "@material-ui/core/Grid";
import React, { useState } from "react";

import './App.css';
import URLInput from "./components/URLInput"

function App() {

    const [state, setState] = useState();

    const getWebPage = () => {
        // call the api
        // setState(data)
        alert('api was called!');
    }

    return (
        <Grid
            container
            // direction="row"
            // justify="space-evenly"
            // alignItems="stretch"
            spacing={1}
            style={{height: "100vh"}}
        >

            <Grid item xs={12} style={{height: "5vh"}}>
                <URLInput onClick={getWebPage}/>
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
