import Grid from "@material-ui/core/Grid";
import React, {useState} from "react";

import axios from "./axiosInstance";
import './App.css';
import URLInput from "./components/URLInput"
import Graph from "./components/Graph";
import Screenshot from "./components/Screenshot";

function App() {

    const [webPage, setWebPage] = useState();
    const [nodeInFocus, setNodeInFocus] = useState(0);


    const getWebPage = (url) => {
        setWebPage(undefined);
        axios.get("webPage", {params: {url}})
            .then((response) => {
                setWebPage(response.data);
            })
            .catch(error => alert(error.message))
    }

    const handleScreenshotClick = (e) => {
        // Calculates coordinates of click on screenshot scaled up to the original screenshot dimensions
        let screenshotRect = e.currentTarget.getBoundingClientRect();
        const clickX = (e.pageX - screenshotRect.left) * (webPage.viewportWidth / screenshotRect.width);
        const clickY = (e.pageY - screenshotRect.top) * (webPage.viewportHeight / screenshotRect.height);
        console.log(clickX, clickY);
        if (webPage){
            const nodesAtPoint = webPage.graph.nodes.filter(
                node => {
                    return node.isVisible
                        && (node.coordinates.left < clickX)
                        && (clickX < node.coordinates.right)
                        && (node.coordinates.top < clickY)
                        && (clickY < node.coordinates.bottom)
                }
            )
           console.log(`Found ${nodesAtPoint.length} visible nodes at clicked point:`);
           console.log(nodesAtPoint);
        }
    }

    const handleNodeSelection = (e) => {
        const  { nodes } = e;
        const nodeId = nodes[0];
        const node = webPage.graph.nodes[nodeId];
        console.log(node);
    }

    return (
        <Grid
            container
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
                    {
                        webPage
                            ? <Graph graph={webPage.graph} handleNodeSelection={handleNodeSelection}/>
                            : null
                    }

                </Grid>
                <Grid item xs={6}>
                    {
                        webPage
                            ? <Screenshot screenshot={webPage.screenshot} handleScreenshotClick={handleScreenshotClick}/>
                            : null
                    }
                </Grid>
            </Grid>

        </Grid>
    );
}

export default App;
