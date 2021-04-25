import React, { useRef, useEffect } from 'react'

const Screenshot = ({ webPage, handleScreenshotClick, nodeInFocus }) => {

    const src = "data:image/png;base64," + webPage.screenshot;

    const screenshotRef = useRef(null)
    const canvasRef = useRef(null)

    useEffect(() => {
        const screenshotElement = screenshotRef.current
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')

        // Set canvas height to match screenshot
        canvas.width = screenshotElement.width;
        canvas.height = screenshotElement.height;

        // Draw bounding box of node in focus on canvas
        if (nodeInFocus){
            const { coordinates } = nodeInFocus;
            // Node coordinates must be scaled down to fit screenshot
            const x = coordinates.left * (screenshotElement.width / webPage.viewportWidth);
            const width = coordinates.width * (screenshotElement.width / webPage.viewportWidth);
            const y = coordinates.top * (screenshotElement.height / webPage.viewportHeight);
            const height = coordinates.height * (screenshotElement.height / webPage.viewportHeight);

            // Draw bounding box of node on canvas
            context.fillStyle = "rgba(255, 165, 0, 0.5)"
            context.fillRect(x, y, width, height)
        }
    }, [webPage, nodeInFocus])

    return (
        <div style={{overflowY: "auto", height: "95vh", position: "relative"}}>
            <img ref={screenshotRef} src={src} alt="screenshot" style={{position: "absolute", zIndex: 1, width: "100%", pointerEvents: "all"}} onClick={handleScreenshotClick}/>
            <canvas ref={canvasRef} width={100} height={100} style={{position: "relative", zIndex: 20, pointerEvents: "none"}}/>
        </div>
    )
}

export default Screenshot;
