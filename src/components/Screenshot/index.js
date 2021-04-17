import React, { useRef, useEffect } from 'react'

const Screenshot = ({ screenshot, handleScreenshotClick }) => {

    const src = "data:image/png;base64," + screenshot;

    const screenshotRef = useRef(null)
    const canvasRef = useRef(null)

    useEffect(() => {
        const screenshotElement = screenshotRef.current
        const canvas = canvasRef.current
        canvas.width = screenshotElement.width;
        canvas.height = screenshotElement.height;

        const context = canvas.getContext('2d')


        //Our first draw
        context.fillStyle = "rgba(255, 165, 0, 0.8)"
        context.fillRect(10, 10, 50, 50)
    }, [])

    return (
        <div style={{overflowY: "auto", height: "95vh", position: "relative"}}>
            <img ref={screenshotRef} src={src} alt="screenshot" style={{position: "absolute", zIndex: 1, width: "100%", pointerEvents: "all"}} onClick={handleScreenshotClick}/>
            <canvas ref={canvasRef} width={100} height={100} style={{position: "relative", zIndex: 20, pointerEvents: "none"}}/>
        </div>
    )
}

export default Screenshot;
