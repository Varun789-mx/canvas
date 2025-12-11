import React, { useRef, useState } from "react";
import { CanvasDrawer } from "../lib/CanvasClass";
import { Circle, LineSquiggle, Shapes, Square } from "lucide-react";

enum ShapeProp {
  circle = "Circle",
  rectangle = "Rectangle",
  line = "Line",
  ellipse = "Ellipse",
}
interface Shape {
  type: ShapeProp,
  x: number,
  y: number,
  height: number,
  width?: number,
  radius?: number
}

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [start, setstart] = useState({ x: 0, y: 0 });
  const [shape, setshape] = useState<ShapeProp>(ShapeProp.line);
  const [drawing, setdrawing] = useState(false);
  const [CurrentShapes, setCurrentShapes] = useState<Shape[]>([])
  const [Camera, setCamera] = useState({ x: 0, y: 0, zoom: 1 });

  function HandleMouseDown(e: React.MouseEvent<HTMLCanvasElement>) {
    setdrawing(true);
    setstart({ x: e.clientX, y: e.clientY });
  }
  function ScrollToWorld(screenX: number, screenY: number) {
    const worldX = (screenX - Camera.x) / Camera.zoom;
    const worldY = (screenY - Camera.y) / Camera.zoom;
  }
  function HandleMouseUp() {
    setdrawing(false);
  }
  const HandleDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (drawing) {
      const drawer = new CanvasDrawer(canvas);
      
      if (shape === ShapeProp.rectangle) {
         const currentShape = {type:ShapeProp.rectangle,x:start.x,y:start.y,width:e.clientX,height:e.clientY};
        setCurrentShapes(Shape=>([...Shape,currentShape]))
        drawer.CreateRectangle(start.x, start.y, e.clientX, e.clientY, Camera, true);
        drawer.CreateRectangle(currentShape.x,currentShape.y,currentShape.width!,currentShape.height!,Camera,true);
      }
      if (shape === ShapeProp.circle) {
        drawer.CreateCircle(start.x, start.y, e.clientX, e.clientY);
      }
      if (shape === ShapeProp.line) {
        drawer.CreateLine(start.x, start.y, e.clientX, e.clientY);
      }
    }
  };
  return (
    <div className="overflow-hidden inset-0 fixed">
      <canvas
        ref={canvasRef}
        id="canvas"
        onMouseDown={HandleMouseDown}
        onMouseUp={HandleMouseUp}
        onMouseMove={HandleDrawing}
        className="bg-gray-900  w-screen h-screen"
      />
      <div className="absolute top-4 left-1/2 -translate-x-1/2  bg-blend-saturation border border-gray-700 rounded-2xl">
        <div className="flex gap-4  rounded-lg shadow-lg p-2">
          <button onClick={() => setshape(ShapeProp.rectangle)}><Square /></button>
          <button onClick={() => setshape(ShapeProp.circle)}><Circle /></button>
          <button onClick={() => setshape(ShapeProp.line)}><LineSquiggle /></button>
        </div>

      </div>
    </div>
  );
};
export default Canvas;
