
const canvasGridSize = 45 // not conviced i need this
export const canvasWidth = 12 * canvasGridSize;
export const canvasHeight = 18 * canvasGridSize;

export const fillRect = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number
) => {
  ctx.fillRect(x, y, w, h)
}

// This method will need to create the starting board and pop it with all the things 
export const initializeBoard = (ctx: CanvasRenderingContext2D, board: Array<Array<number>>) => {
  ctx.strokeStyle = '#003779'
  for (let x = 0; board[0].length > x; x++) {
    for (let y = 0; board.length > y; y++) {
      if (board[y][x] == 0) {
        ctx.fillStyle = '#0000FF'   
      } else if (board[y][x] == 1) {
        
        ctx.fillStyle = '#000000'   
      } else if (board[y][x] == 2) {
        
        ctx.fillStyle = '#FFFF00'   
      } else if (board[y][x] == 3) {
        
        ctx.fillStyle = '#FFA500'   
      } else if (board[y][x] == 4) {
        
        ctx.fillStyle = '#FF0000'   
      } else if (board[y][x] == 5) {
        
        ctx.fillStyle = '#8B0000'   
      }

      fillRect(
        ctx,
        x * canvasGridSize,
        y * canvasGridSize,
        canvasGridSize,
        canvasGridSize
      )
    }
  }

}

export const digBlocks = (ctx: CanvasRenderingContext2D, x: number, y: number, backgroundColor: string) => {
  ctx.fillStyle = backgroundColor;

      fillRect(
        ctx,
        x * canvasGridSize,
        y * canvasGridSize,
        canvasGridSize,
        canvasGridSize
      )
}

export const drawSprit = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, imageSrc: string) => {
  let image = new Image();
  image.src = imageSrc;

  image.onload = () => {
    ctx.drawImage(image,
      x * canvasGridSize,
      y * canvasGridSize,
      canvasGridSize,
      canvasGridSize)
  }
}

export const drawInfaltor = (ctx: CanvasRenderingContext2D, x: number, y: number) => {

  let image = new Image();
  image.src = "static/images/wiggle.png";
  
  image.onload = () => {
    ctx.drawImage(image, x * canvasGridSize, y * canvasGridSize, canvasGridSize, canvasGridSize)
  }
}