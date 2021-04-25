import React, {useEffect, useState} from "react";

import VisJSGraph from 'vis-react';

const Graph = ({graph, handleNodeSelection, setNetwork}) => {

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
