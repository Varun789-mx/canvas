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
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx.strokeStyle = "white";
    this.ctx.lineWidth = 1;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  CreateRectangle(
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    rounded?: boolean
  ) {
    const height = endY - startY;
    const width = endX - startX;

    this.ctx.strokeStyle = "white";
    if (rounded) {
      this.ctx.roundRect(startX, startY, width, height, 5 * Math.PI);
      this.ctx.stroke();
    }
    this.ctx.strokeRect(startX, startY, width, height);
  }

  CreateCircle(startX: number, startY: number, endX: number, endY: number) {
    const height = endY - startY;
    this.ctx.arc(startX, startY, Math.abs(height), 0, 2 * Math.PI);
    this.ctx.stroke();
  }
  CreateLine(startX: number, startY: number, endX: number, endY: number) {
    this.ctx.beginPath();
    this.ctx.moveTo(startX, startY);
    this.ctx.lineTo(endX, endY);
    this.ctx.stroke();
  }
}
