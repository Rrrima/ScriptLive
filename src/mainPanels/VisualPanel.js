import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import VideocamIcon from "@mui/icons-material/Videocam";
// import MicIcon from "@mui/icons-material/Mic";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react'
import { fabric } from "fabric";
import Stitch from "../resources/Images/stitch.png";
import { objectDict } from "../resources/ObjectDict";

export default function VisualPanel() {

  const { editor, onReady } = useFabricJSEditor()

  React.useEffect(() => {
    if (!editor || !fabric || !editor.canvas.isEmpty()) {
      return;
    }
    fabric.Image.fromURL(
      Stitch,
      (image) => {
        const obj = editor.canvas.add(image);
        console.log(obj)
      }
    );
  }, [editor?.canvas.isEmpty()])

  const onAddCircle = () => {
    editor?.addCircle()
  }
  const onAddRectangle = () => {
    editor?.addRectangle()
  }

  return (
    <div className="main-panel" id="visual-panel">
      <div>
        <button onClick={onAddCircle}>Add circle</button>
        <button onClick={onAddRectangle}>Add Rectangle</button>
        <FabricJSCanvas className="canvas-panel" onReady={onReady} />
      </div>
      <div className="bottom right">
        <Stack direction="row">
          <IconButton aria-label="videocam">
            <VideocamIcon fontSize="small" />
          </IconButton>
          <IconButton aria-label="scriptfollow">
            <AutoGraphIcon fontSize="small" className="color-primary" />
          </IconButton>
        </Stack>
      </div>
    </div>
  );
}
