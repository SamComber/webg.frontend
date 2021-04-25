/**
 * traverseToNewNode
 * Returns new node given the current node and the arrow key that has been pressed.
 * @param {string} key - the key that has been pressed
 * @param {object} currentNode - current node in focus
 * @param {{isVisible: boolean, coordinates: Object}[]} nodes - all nodes
 * @param {object} network - vis-react Network object
 */
const traverseToNewNode = (key, currentNode, nodes, network) => {
    let siblingsNodes;
    switch (key) {
        case "ArrowUp":
            return getParentNode(currentNode, nodes, network)
        case "ArrowDown":
            const childNodes = getChildNodes(currentNode, nodes, network);
            return childNodes.length ? childNodes[0] : null;
        case "ArrowLeft":
            siblingsNodes = getSiblingNodes(currentNode, nodes, network);
            return getPreviousSibling(currentNode, siblingsNodes)
        case "ArrowRight":
            siblingsNodes = getSiblingNodes(currentNode, nodes, network);
            return getNextSibling(currentNode, siblingsNodes)
        default:
            // do nothing
    }
}

const getParentNode = (node, nodes, network) => {
    const connectedNodeIds = network.getConnectedNodes(node.id);
    if (connectedNodeIds.length >= 1) {
        const parentNodeId = connectedNodeIds[0];
        return nodes[parentNodeId];
    }
    return null;
}

const getChildNodes = (node, nodes, network) => {
    const connectedNodeIds = network.getConnectedNodes(node.id);
    const childNodeIds = connectedNodeIds.slice(1, connectedNodeIds.length);
    return childNodeIds.map(nodeId => nodes[nodeId]);
}

const getSiblingNodes = (node, nodes, network) => {
    const parentNode = getParentNode(node, nodes, network);
    return getChildNodes(parentNode, nodes, network);
}

const getPreviousSibling = (node, siblingNodes) => {
    const indexOfNodeInFocus = siblingNodes.indexOf(node);
    if (indexOfNodeInFocus === 0) {
        return siblingNodes[siblingNodes.length - 1];
    } else {
        return siblingNodes[indexOfNodeInFocus - 1];
    }
}

const getNextSibling = (node, siblingNodes) => {
    const indexOfNodeInFocus = siblingNodes.indexOf(node);
    if (indexOfNodeInFocus === (siblingNodes.length - 1)) {
        return siblingNodes[0];
    } else {
        return siblingNodes[indexOfNodeInFocus + 1];
    }
}



export default traverseToNewNode;
