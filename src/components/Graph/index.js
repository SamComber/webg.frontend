import React, {useEffect, useState} from "react";

import VisJSGraph from 'vis-react';

const Graph = ({graph, handleNodeSelection, nodeInFocus}) => {

    const [network, setNetwork] = useState();

    useEffect(() => {
        if (nodeInFocus && network) {
            network.selectNodes([nodeInFocus.id]);
        }
    }, [nodeInFocus, network])

    const options = {
        layout: {
            hierarchical: true
        },
        edges: {
            color: '#000000'
        },
        interaction: {hoverEdges: true}
    };

    const events = {
        selectNode: handleNodeSelection
    };

    return (
        <VisJSGraph
            graph={graph}
            options={options}
            events={events}
            getNetwork={(n) => setNetwork(n)}
        />
    )
}

export default Graph;
