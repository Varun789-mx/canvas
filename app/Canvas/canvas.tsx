import React, { use, useEffect, useRef, useState } from "react";
import { CanvasDrawer } from "../lib/CanvasClass";
import { Circle, LineSquiggle, Minus, Shapes, Square } from "lucide-react";
import { start } from "repl";

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
  const startRef = useRef({ x: 0, y: 0 });
  const drawerRef = useRef<CanvasDrawer | null>(null);
  const shape = useRef<Shape>({
    type: ShapeProp.rectangle,
    x: 0,
    y: 0,
    endX: 0,
    endY: 0,
  });
  const [SelectedShape, setSelectedShape] = useState<ShapeProp>(ShapeProp.line);
  const isDrawingRef = useRef(false);
  const [CurrentShapes, setCurrentShapes] = useState<Shape[]>([]);
  const [Camera, setCamera] = useState({ x: 0, y: 0, zoom: 1 });
  const currentPathRef = useRef<{ x: number, y: number }[]>([]);

  useEffect(() => {
    if (canvasRef.current && !drawerRef.current) {
      drawerRef.current = new CanvasDrawer(canvasRef.current);
    }
  }, []);
  function HandleMouseDown(e: React.MouseEvent<HTMLCanvasElement>) {
    isDrawingRef.current = true;
    startRef.current = { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY };
    if (SelectedShape === ShapeProp.line) {
      currentPathRef.current = [{ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY }];
    }
    shape.current = ({
      type: SelectedShape,
      x: startRef.current.x,
      y: startRef.current.y,
      endX: e.nativeEvent.offsetX,
      endY: e.nativeEvent.offsetY,
      points: SelectedShape === ShapeProp.line ? [{ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY }] : undefined
    });
  }
  function ScrollToWorld(screenX: number, screenY: number) {
    const worldX = (screenX - Camera.x) / Camera.zoom;
    const worldY = (screenY - Camera.y) / Camera.zoom;
  }
  function HandleMouseUp(e: React.MouseEvent<HTMLCanvasElement>) {
    isDrawingRef.current = false;
    const finalShape = {
      ...shape.current,
      points: shape.current.points ? [...shape.current.points] : undefined
    };
    setCurrentShapes((prev) => [...prev, finalShape]);
    currentPathRef.current = [];
  }
  useEffect(() => {
    Redraw(CurrentShapes, null, false)
  }, [CurrentShapes])
  const Redraw = (currentShape: Shape[], shape: Shape | null, drawing: boolean) => {
    const drawer = drawerRef.current;
    if (!drawer) return;
    drawer.clear();
    currentShape.forEach((s) => {
      switch (s.type) {
        case ShapeProp.rectangle:
          drawer.CreateRectangle(
            s.x,
            s.y,
            s.endX,
            s.endY,
            { x: 0, y: 0, zoom: 1 },
            true
          );
          break;
        case ShapeProp.circle:
          drawer.CreateCircle(s.x, s.y, s.endX, s.endY);
          break;
        case ShapeProp.line:
          if (s.points && s.points.length > 1) {
            drawer.CreateFreehandLine(s.points, { x: 0, y: 0, zoom: 1 });
          } else {
            drawer.CreateLine(s.x, s.y, s.endX, s.endY);
          }
          break;
      }
    });
    if (drawing && shape) {
      switch (shape.type) {
        case ShapeProp.rectangle:
          drawer.CreateRectangle(
            shape.x,
            shape.y,
            shape.endX,
            shape.endY,
            { x: 0, y: 0, zoom: 1 },
            true
          );
          break;
        case ShapeProp.circle:
          drawer.CreateCircle(shape.x, shape.y, shape.endX, shape.endY);
          break;
        case ShapeProp.line:
          if (shape.points && shape.points.length > 1) {
            drawer.CreateFreehandLine(shape.points, { x: 0, y: 0, zoom: 1 });
          } else {
            drawer.CreateLine(shape.x, shape.y, shape.endX, shape.endY);
          }
          break;
      }
    }
  };
  const HandleDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (!isDrawingRef.current) return;
    if (SelectedShape === ShapeProp.line) {
      currentPathRef.current.push({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
      shape.current.points = currentPathRef.current;
    } else {
      shape.current = {
        type: SelectedShape,
        x: startRef.current.x,
        y: startRef.current.y,
        endX: e.nativeEvent.offsetX,
        endY: e.nativeEvent.offsetY,
      }
    }
    Redraw(CurrentShapes, shape.current, isDrawingRef.current);
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
          <button onClick={() => setSelectedShape(ShapeProp.rectangle)} className={` p-2 ${SelectedShape === ShapeProp.rectangle ? "bg-blue-700 rounded-lg" : ""}`}>
            <Square />
          </button>
          <button onClick={() => setSelectedShape(ShapeProp.circle)} className={` p-2 ${SelectedShape === ShapeProp.circle ? "bg-blue-700 rounded-lg" : ""}`}>
            <Circle />
          </button>
          <button onClick={() => setSelectedShape(ShapeProp.line)} className={` p-2 ${SelectedShape === ShapeProp.line ? "bg-blue-700 rounded-lg" : ""}`}>
            <Minus />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Canvas;
