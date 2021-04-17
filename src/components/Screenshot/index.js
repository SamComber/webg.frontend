

const Screenshot = ({ screenshot, handleScreenshotClick }) => {

    const src = "data:image/png;base64," + screenshot;

    return (
        <div style={{overflowY: "auto", height: "95vh", position: "relative"}}>
            <img src={src} alt="screenshot" style={{width: "100%", pointerEvents: "all"}} onClick={handleScreenshotClick}/>
        </div>
    )
}

export default Screenshot;
