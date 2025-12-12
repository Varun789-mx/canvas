import React, { use, useEffect, useRef, useState } from "react";
import { CanvasDrawer } from "../lib/CanvasClass";
import { Circle, LineSquiggle, Shapes, Square } from "lucide-react";

enum ShapeProp {
  circle = "Circle",
  rectangle = "Rectangle",
  line = "Line",
  ellipse = "Ellipse",
}
interface Shape {
  type: ShapeProp;
  x: number;
  y: number;
  endX: number;
  endY: number;
  points?: { x: number; y: number }[];
  radius?: number;
}

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [start, setstart] = useState({ x: 0, y: 0 });
  const drawerRef = useRef<CanvasDrawer | null>(null);
  const [shape, setshape] = useState<Shape>();
  const [SelectedShape, setSelectedShape] = useState<ShapeProp>();
  const [drawing, setdrawing] = useState(false);
  const [CurrentShapes, setCurrentShapes] = useState<Shape[]>([]);
  const [Camera, setCamera] = useState({ x: 0, y: 0, zoom: 1 });
  const [currentPath, setCurrentPath] = useState<{ x: number; y: number }[]>(
    []
  );

  useEffect(() => {
    if (canvasRef.current && !drawerRef.current) {
      drawerRef.current = new CanvasDrawer(canvasRef.current);
    }
  }, []);
  function HandleMouseDown(e: React.MouseEvent<HTMLCanvasElement>) {
    setdrawing(true);
    setstart({ x: e.clientX, y: e.clientY });
    if (shape?.type === ShapeProp.line) {
      setCurrentPath([{ x: e.clientX, y: e.clientY }]);
    }
  }
  function ScrollToWorld(screenX: number, screenY: number) {
    const worldX = (screenX - Camera.x) / Camera.zoom;
    const worldY = (screenY - Camera.y) / Camera.zoom;
  }
  function HandleMouseUp(e: React.MouseEvent<HTMLCanvasElement>) {
    setdrawing(false);
    const NewShape = {
      type: ShapeProp.rectangle,
      x: start.x,
      y: start.y,
      endX: e.clientX,
      endY: e.clientY,
      ...(shape?.type === ShapeProp.line &&
        currentPath.length > 1 && { points: [...currentPath] }),
    };
    setshape(NewShape);
    setCurrentShapes((prev)=>[...prev,NewShape]);
    setCurrentPath([]);
  }
  const Redraw = (currentShape: Shape[]) => {
    const drawer = drawerRef.current;
    if (!drawer) return;
    currentShape.forEach((shape) => {
      // switch (shape.type) {
      //   case ShapeProp.rectangle:
      //     drawer.CreateRectangle(
      //       shape.x,
      //       shape.y,
      //       shape.endX,
      //       shape.endY,
      //       Camera,
      //       true
      //     );
      //   case ShapeProp.circle:
      //     drawer.CreateCircle(shape.x, shape.y, shape.endY, shape.endY);
      //   case ShapeProp.line:
      //     if (shape.points && shape.points.length > 1) {
      //       drawer.CreateFreehandLine(shape.points, Camera);
      //     } else {
      //       drawer.CreateLine(shape.x, shape.y, shape.endX, shape.endY);
      //     }
      //     break;
      // }
    drawer.CreateRectangle(shape.x,shape.y,shape.endX,shape.endY,Camera);
    });
  };
  useEffect(() => {
    Redraw(CurrentShapes);
    console.log(CurrentShapes);
  }, [CurrentShapes]);
  const HandleDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (drawing) {
      const drawer = drawerRef.current;
      const endX = e.clientX - 
      if (!drawer) return;
      // switch (shape?.type) {
      //   case ShapeProp.rectangle:
      //     drawer.CreateRectangle(
      //       shape.x,
      //       shape.y,
      //       shape.endX,
      //       shape.endY,
      //       Camera,
      //       true
      //     );
      //   case ShapeProp.circle:
      //     drawer.CreateCircle(shape.x, shape.y, shape.endX, shape.endY);
      //   case ShapeProp.line:
      //     const NewPath = [...currentPath, { x: e.clientX, y: e.clientY }];
      //     setCurrentPath(NewPath);
      //     drawer.CreateFreehandLine(NewPath, Camera);
      //     break;
      // }
drawer.CreateRectangle(e.clientX,e.clientY,)
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
          <button onClick={() => setSelectedShape(ShapeProp.rectangle)}>
            <Square />
          </button>
          <button onClick={() => setSelectedShape(ShapeProp.circle)}>
            <Circle />
          </button>
          <button onClick={() => setSelectedShape(ShapeProp.line)}>
            <LineSquiggle />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Canvas;
