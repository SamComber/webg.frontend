import React, {useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import CircularProgress from '@material-ui/core/CircularProgress';

import axios from "./axiosInstance";
import './App.css';
import URLInput from "./components/URLInput"
import Graph from "./components/Graph";
import Screenshot from "./components/Screenshot";
import useKeyPress from "./hooks/useKeyPress"
import traverseToNewNode from "./utils/graph/traversal";
import getNodeAtPoint from "./utils/graph/node_at_point";

function App() {

    const [webPage, setWebPage] = useState();
    const [nodeInFocus, setNodeInFocus] = useState();
    const [network, setNetwork] = useState();  // vis.js Network object
    const [loading, setLoading] = useState(false);

    const getWebPage = (url) => {
        // Fetches web page data from backend API
        setLoading(true);
        setWebPage(undefined);
        setNodeInFocus(undefined);
        setNetwork(undefined);
        axios.get("webPage", {params: {url}})
            .then((response) => {
                setWebPage(response.data);
            })
            .catch(error => alert(error.message))
            .finally(() => setLoading(false))
    }

    const handleScreenshotClick = (e) => {
        // Handles selection of new node via click on screenshot
        let screenshotRect = e.currentTarget.getBoundingClientRect();
        // scale up event click coordinates to match original size of screenshot
        const x = (e.pageX - screenshotRect.left) * (webPage.viewportWidth / screenshotRect.width);
        const y = (e.pageY - screenshotRect.top) * (webPage.viewportHeight / screenshotRect.height);
        if (webPage) {
            // find visible node at point that was clicked
            const nodeAtPoint = getNodeAtPoint({ x , y}, webPage.graph.nodes);
            setNodeInFocus(nodeAtPoint);
            network.selectNodes([nodeAtPoint.id]);
            const scale = network.getScale() < 0.25 ? 1 : network.getScale();  // zoom in only if user is very zoomed out
            network.focus(nodeAtPoint.id, { scale });
        }
    }

    const handleNodeSelection = (e) => {
        // Handles selection of new node on vis.js graph
        const { nodes } = e;
        const nodeId = nodes[0];
        const node = webPage.graph.nodes[nodeId];
        setNodeInFocus(node);
    }

    useKeyPress(["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"], (key) => {
        // Traverse graph with arrow keys
        if (network && nodeInFocus) {
            const newNode = traverseToNewNode(key, nodeInFocus, webPage.graph.nodes, network);
            if (newNode) {
                setNodeInFocus(newNode);
                network.selectNodes([newNode.id]);
            }
        }
    })

    const preventScrollOnArrowKey = (e) => {
        if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.code)) {
            e.preventDefault();
        }
    }

    useEffect(() => {
        // Prevent scrolling down on screenshot when arrow keys are used to traverse vis.js graph
        window.addEventListener('keydown', preventScrollOnArrowKey);

        return () => {
            window.removeEventListener('keydown', preventScrollOnArrowKey);
        };
    }, []);

    return (
        <Grid
            container
            style={{height: "100vh"}}
        >

            <Grid item xs={12} style={{height: "5vh"}}>
                <URLInput getWebPage={getWebPage}/>
            </Grid>

            {
                webPage
                    ? (
                        <Grid
                            container
                            item
                            xs={12}
                            style={{height: "95vh"}}>
                            <Grid item xs={6}>
                                <Graph graph={webPage.graph}
                                       handleNodeSelection={handleNodeSelection}
                                       setNetwork={setNetwork}/>
                            </Grid>
                            <Grid item xs={6}>
                                <Screenshot webPage={webPage}
                                            handleScreenshotClick={handleScreenshotClick}
                                            nodeInFocus={nodeInFocus}/>
                            </Grid>
                        </Grid>
                    )
                    : loading
                    ? (
                        <Grid>
                            <div style={{display: "flex", justifyContent: "center", width: "100vw"}}>
                                <CircularProgress/>
                            </div>
                        </Grid>
                    )
                    : null
            }


        </Grid>
    );
}

export default App;
