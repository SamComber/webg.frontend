import Grid from "@material-ui/core/Grid";
import CircularProgress from '@material-ui/core/CircularProgress';
import React, {useEffect, useState} from "react";

import axios from "./axiosInstance";
import './App.css';
import URLInput from "./components/URLInput"
import Graph from "./components/Graph";
import Screenshot from "./components/Screenshot";
import useKeyPress from "./hooks/useKeyPress"
import getNewNode from "./utils/graph/traversal"

function App() {

    const [webPage, setWebPage] = useState();
    const [network, setNetwork] = useState();
    const [nodeInFocus, setNodeInFocus] = useState();
    const [loading, setLoading] = useState(false);

    const getWebPage = (url) => {
        // Fetches web page data from backend API
        setLoading(true);
        setWebPage(undefined);
        axios.get("webPage", {params: {url}})
            .then((response) => {
                setWebPage(response.data);
                setNodeInFocus(undefined);
            })
            .catch(error => alert(error.message))
            .finally(() => setLoading(false))
    }

    const handleScreenshotClick = (e) => {
        // Handles clicks on screenshot
        let screenshotRect = e.currentTarget.getBoundingClientRect();
        // scale up event click coordinates to match original size of screenshot
        const clickX = (e.pageX - screenshotRect.left) * (webPage.viewportWidth / screenshotRect.width);
        const clickY = (e.pageY - screenshotRect.top) * (webPage.viewportHeight / screenshotRect.height);
        if (webPage) {
            // find visible node at point that was clicked
            const nodesAtPoint = webPage.graph.nodes.filter(
                node => {
                    return (node.isVisible)
                        && (node.coordinates.left < clickX)
                        && (clickX < node.coordinates.right)
                        && (node.coordinates.top < clickY)
                        && (clickY < node.coordinates.bottom)
                }
            )
            const nodeAtPoint = nodesAtPoint.pop();
            setNodeInFocus(nodeAtPoint);
            network.selectNodes([nodeAtPoint.id]);
            console.log(network.getScale());
            const scale = network.getScale() < 0.25 ? 1 : network.getScale();  // zoom in only if user is very zoomed out
            network.focus(nodeAtPoint.id, {scale: scale});
        }
    }

    const handleNodeSelection = (e) => {
        // Handles selection of new node on vis.js graph
        const {nodes} = e;
        const nodeId = nodes[0];
        const node = webPage.graph.nodes[nodeId];
        setNodeInFocus(node);
    }

    useKeyPress(["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"], (key) => {
        if (network && nodeInFocus) {
            const newNode = getNewNode(key, nodeInFocus, webPage.graph.nodes, network);
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
