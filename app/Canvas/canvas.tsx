import { Caveat } from "next/font/google";
import React, { useEffect, useRef, useState } from "react"

const Canvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [start, setstart] = useState({ x: 0, y: 0 });
    const [drawing, setdrawing] = useState(false);
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.fillStyle = 'white';
        ctx.strokeRect(10, 10, 100, 100);
    }, [])

    function HandleMouseDown(e: React.MouseEvent<HTMLCanvasElement>) {
        setdrawing(true);
        setstart({ x: e.clientX, y: e.clientY });
    }
    function CreateRectangle(e: React.MouseEvent<HTMLCanvasElement>) {
        const canvas = canvasRef.current;
        if (!canvas || !drawing) return;

        const height = e.clientX - start.x;
        const width = e.clientY - start.y;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.reset();
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(e.clientX, e.clientY);
        
    }

    function HandleMouseUp() {
        setdrawing(false);
    }
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