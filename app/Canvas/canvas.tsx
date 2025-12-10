import React, { useEffect, useRef, useState } from "react"
import { CanvasDrawer } from "../lib/CanvasClass";

const Canvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [start, setstart] = useState({ x: 0, y: 0 });
    const [drawing, setdrawing] = useState(false);

    function HandleMouseDown(e: React.MouseEvent<HTMLCanvasElement>) {
        setdrawing(true);
        setstart({ x: e.clientX, y: e.clientY });
    }
    // function CreateRectangle(e: React.MouseEvent<HTMLCanvasElement>) {
    //     const canvas = canvasRef.current;
    //     if (!canvas || !drawing) return;

    //     const height = e.clientX - start.x;
    //     const width = e.clientY - start.y;

    //     canvas.width = window.innerWidth;
    //     canvas.height = window.innerHeight;
    //     const ctx = canvas.getContext('2d');
    //     if (!ctx) return;
    //     ctx.strokeStyle = 'white'
    //     ctx.roundRect(start.x, start.y, height, width, 5 * Math.PI);
    //     ctx.stroke();
    // }
    // function CreateCircle(e: React.MouseEvent<HTMLCanvasElement>) {
    //     const canvas = canvasRef.current;
    //     if (!canvas || !drawing) return;

    //     const height = e.clientY - start.y
    //     canvas.width = window.innerWidth;
    //     canvas.height = window.innerHeight;
    //     const ctx = canvas.getContext('2d');
    //     if (!ctx) return;
    //     ctx.strokeStyle = 'white'
    //     ctx.arc(start.x, start.y, Math.abs(height), 0, 2 * Math.PI);
    //     ctx.stroke();
    // }
    // function CreateLine(e: React.MouseEvent<HTMLCanvasElement>) {
    //     const canvas = canvasRef.current;
    //     if (!canvas || !drawing) return;

    //     const height = e.clientY - start.y
    //     const width = e.clientX - start.x;

    //     canvas.width = window.innerWidth;
    //     canvas.height = window.innerHeight;

    //     const ctx = canvas.getContext('2d');
    //     if (!ctx) return;
    //     ctx.strokeStyle = 'white'
    //     ctx.beginPath();
    //     ctx.moveTo(start.x, start.y);
    //     ctx.lineTo(e.clientX, e.clientY);
    //     ctx.stroke();
    // }
    function HandleMouseUp() {
        setdrawing(false);
    }

    const canvas = canvasRef.current
    if (!canvas) return;
    const drawer = new CanvasDrawer(canvas);
    return (
        <canvas ref={canvasRef}
            id="canvas"
            onMouseDown={HandleMouseDown}
            onMouseUp={HandleMouseUp}
            onMouseMove={CreateRectangle}
            className="bg-gray-800 w-screen h-screen" />
    )
}
export default Canvas