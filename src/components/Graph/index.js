import VisJSGraph from 'vis-react';


const Graph = ({graph, handleNodeSelection}) => {

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
        />
    )
}

export default Graph;
