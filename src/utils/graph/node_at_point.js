/**
 * getNodeAtPoint
 * Returns the visible node at a given point. If multiple visible nodes
 * exist at that point then the lowest (leaf node) is returned.
 * @param {{x: number, y: number}} point
 * @param {{isVisible: boolean, coordinates: Object}[]} nodes - all nodes
 */
const getNodeAtPoint = (point, nodes) => {
    const {x, y} = point;
    const nodesAtPoint = nodes.filter(
        node => {
            return (node.isVisible)
                && (node.coordinates.left < x)
                && (x < node.coordinates.right)
                && (node.coordinates.top < y)
                && (y < node.coordinates.bottom)
        }
    )
    return nodesAtPoint.pop();
}

export default getNodeAtPoint;
