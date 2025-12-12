export class CanvasDrawer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Unable to get the canas element");
    this.ctx = ctx;
    this.init();
  }

  private init() {
    this.canvas.width = window.innerWidth * 2;
    this.canvas.height = window.innerHeight * 2;
    this.canvas.style.width = `${window.innerWidth}px`;
    this.canvas.style.height = `${window.innerHeight}px`;
    this.ctx.strokeStyle = "white";
    this.ctx.lineWidth = 5;
    this.ctx.scale(2, 2);
    this.ctx.lineCap = "round";
    this.ctx.lineJoin = "round";
  }
  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  CreateRectangle(
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    camera: { x: number; y: number; zoom: number },
    rounded?: boolean
  ) {
    const height = endY - startY;
    const width = endX - startX;

    this.ctx.strokeStyle = "white";
    this.ctx.save();
    this.ctx.translate(camera.x, camera.y);
    this.ctx.scale(camera.zoom, camera.zoom);
    if (rounded) {
      this.ctx.roundRect(startX, startY, width, height, 5 * Math.PI);
      this.ctx.stroke();
    } else {
      this.ctx.strokeRect(startX, startY, width, height);
    }
  }

  CreateCircle(startX: number, startY: number, endX: number, endY: number) {
    const height = startY - endY;
    this.ctx.arc(startX, startY, Math.abs(height), 0, 2 * Math.PI);
    this.ctx.stroke();
  }
  CreateLine(startX: number, startY: number, endX: number, endY: number) {
    this.ctx.beginPath();
    this.ctx.moveTo(startX, startY);
    this.ctx.lineTo(endX, endY);
    this.ctx.stroke();
  }

  CreateFreehandLine(
    points: { x: number; y: number }[],
    camera: { x: number; y: number; zoom: number }
  ) {
    if (points.length < 2) return;
    this.ctx.save();
    this.ctx.translate(camera.x, camera.y);
    this.ctx.scale(camera.zoom, camera.zoom);
    this.ctx.beginPath();
    this.ctx.moveTo(points[0].x, points[0].y);
    for (let i = 0; i < points.length; i++) {
      this.ctx.lineTo(points[i].x, points[i].y);
    }
    this.ctx.stroke();
    this.ctx.reset();
  }
}
