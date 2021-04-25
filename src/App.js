import Grid from "@material-ui/core/Grid";
import CircularProgress from '@material-ui/core/CircularProgress';
import React, {useState} from "react";

import axios from "./axiosInstance";
import './App.css';
import URLInput from "./components/URLInput"
import Graph from "./components/Graph";
import Screenshot from "./components/Screenshot";
import useKeyPress from "./hooks/useKeyPress"

function App() {

    const [webPage, setWebPage] = useState();
    const [network, setNetwork] = useState();
    const [nodeInFocus, setNodeInFocus] = useState();
    const [loading, setLoading] = useState(false);

    const getParentNode = (node) => {
        const connectedNodeIds = network.getConnectedNodes(node.id);
        if (connectedNodeIds.length >= 1) {
            const parentNodeId = connectedNodeIds[0];
            return webPage.graph.nodes[parentNodeId];
        }
        return null;
    }

    const getChildNodes = (node) => {
        const connectedNodeIds = network.getConnectedNodes(node.id);
        const childNodeIds = connectedNodeIds.slice(1, connectedNodeIds.length);
        return childNodeIds.map(nodeId => webPage.graph.nodes[nodeId]);
    }

    useKeyPress("ArrowUp", () => {
        if (network && nodeInFocus) {
            const parentNode = getParentNode(nodeInFocus);
            if (parentNode) {
                setNodeInFocus(parentNode);
                network.selectNodes([parentNode.id]);
            }
        }
    })

    useKeyPress("ArrowDown", () => {
        if (network && nodeInFocus) {
            const childNodes = getChildNodes(nodeInFocus);
            if (childNodes.length > 0) {
                setNodeInFocus(childNodes[0]);
                network.selectNodes([childNodes[0].id]);

            }
        }
    })

    useKeyPress("ArrowLeft", () => {
        if (network && nodeInFocus) {
            const parentNode = getParentNode(nodeInFocus);
            const siblingNodes = getChildNodes(parentNode);
            const indexOfNodeInFocus = siblingNodes.indexOf(nodeInFocus);
            let siblingNode;
            if (indexOfNodeInFocus === 0) {
                siblingNode = siblingNodes[siblingNodes.length - 1];
            } else {
                siblingNode = siblingNodes[indexOfNodeInFocus - 1];
            }
            setNodeInFocus(siblingNode);
            network.selectNodes([siblingNode.id]);
        }
    })


    useKeyPress("ArrowRight", () => {
        if (network && nodeInFocus) {
            const parentNode = getParentNode(nodeInFocus);
            const siblingNodes = getChildNodes(parentNode);
            const indexOfNodeInFocus = siblingNodes.indexOf(nodeInFocus);
            let siblingNode;
            if (indexOfNodeInFocus === (siblingNodes.length - 1)) {
                siblingNode = siblingNodes[0];
            } else {
                siblingNode = siblingNodes[indexOfNodeInFocus + 1];
            }
            setNodeInFocus(siblingNode);
            network.selectNodes([siblingNode.id]);
        }
    })


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
            network.focus(nodeAtPoint.id);
        }
    }

    const handleNodeSelection = (e) => {
        // Handles selection of new node on vis.js graph
        const {nodes} = e;
        const nodeId = nodes[0];
        const node = webPage.graph.nodes[nodeId];
        setNodeInFocus(node);
    }

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
