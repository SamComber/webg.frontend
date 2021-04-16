import Grid from "@material-ui/core/Grid";

import './App.css';
import URLInput from "./components/URLInput"

function App() {
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
                <URLInput/>
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
