import React, { useRef, useState } from "react";
import { CanvasDrawer } from "../lib/CanvasClass";

enum ShapeProp {
  circle = "Circle",
  rectangele = "Rectangle",
  line = "Line",
  ellipse = "Ellipse",
}
const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [start, setstart] = useState({ x: 0, y: 0 });
  const [shape, setshape] = useState<ShapeProp>(ShapeProp.line);
  const [drawing, setdrawing] = useState(false);

  function HandleMouseDown(e: React.MouseEvent<HTMLCanvasElement>) {
    setdrawing(true);
    setstart({ x: e.clientX, y: e.clientY });
  }

  function HandleMouseUp() {
    setdrawing(false);
  }
  const HandleDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (drawing) {
      const drawer = new CanvasDrawer(canvas);
      drawer.CreateRectangle(start.x, start.y, e.clientX, e.clientY);
    }
  };
  return (
    <div>
      <div className="w-3/4 flex items bg-white ">
        <div>Circle</div>
        <div>Rectangle</div>
        <div>line</div>
      </div>
      <canvas
        ref={canvasRef}
        id="canvas"
        onMouseDown={HandleMouseDown}
        onMouseUp={HandleMouseUp}
        onMouseMove={HandleDrawing}
        className="bg-gray-800 w-screen h-screen"
      />
    </div>
  );
};
export default Canvas;
