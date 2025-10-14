// A component for arranging and displaying the sprite grid
//
import { useRef, useState, useEffect, useCallback } from "react";

/**
 * Minimal types: an 8x8 sprite where each cell is a palette index (0..N-1).
 */
export type Sprite8 = number[][]; // [8][8]
export type Palette = string[];   // CSS colors like "#RRGGBB" or rgba(...)

/**
 * Helper: build a transparent checkerboard background for clarity when colors include transparent.
 */
function drawChecker(ctx: CanvasRenderingContext2D, w: number, h: number, tile = 8) {
  const light = "#eee";
  const dark = "#cfcfcf";
  for (let y = 0; y < h; y += tile) {
    for (let x = 0; x < w; x += tile) {
      const useDark = ((x / tile) ^ (y / tile)) & 1;
      ctx.fillStyle = useDark ? dark : light;
      ctx.fillRect(x, y, tile, tile);
    }
  }
}

/**
 * SpriteThumb — renders a single 8x8 sprite to a <canvas>, scaled up for visibility.
 */
export function SpriteThumb({
  sprite,
  palette,
  scale = 6, // each pixel becomes scale x scale canvas pixels
  border = true,
  rounded = true,
  className = "",}: 
  {
  sprite: any;
  palette: Palette;
  scale?: number;
  border?: boolean;
  rounded?: boolean;
  className?: string;}) 
  {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sizePx = 8 * scale;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = sizePx;
    canvas.height = sizePx;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // checker background
    drawChecker(ctx, sizePx, sizePx, Math.max(2, Math.floor(scale / 2)));

    // draw pixels
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        // const color = sprite[y]?.[x].color ?? 0;
        if(!sprite.pixels) continue;

        const color = palette[sprite.pixels[(y*8)+ x]];

        // if (color === "transparent") continue;
        ctx.fillStyle = color;
        ctx.fillRect(x * scale, y * scale, scale, scale);
      }
    }
  }, [sprite, palette, scale, sizePx]);

  return (
    <canvas
      ref={canvasRef}
      className={[
        "block shadow-sm",
        border ? "ring-1 ring-black/10" : "",
        rounded ? "rounded-xl" : "",
        className,
      ].join(" ")}
      style={{ width: sizePx, height: sizePx, imageRendering: "pixelated" as const }}
    />
  );
}

/**
 * Draggable wrapper — minimal HTML5 drag/drop that swaps positions.
 */
function DraggableThumb({
  id,
  onSwap,
  onClick,
  isSelected,
  scale,
  children,}: 
  {
  id: number;
  onSwap: (from: number, to: number) => void;
  onClick?: () => void;
  isSelected?: boolean;
  scale: number;
  children: React.ReactNode;}) 
  {
  const ref = useRef<HTMLDivElement | null>(null);
  const dragId = String(id);

  return (
    <div
      ref={ref}
      draggable
      onClick={onClick}
      onDragStart={(e) => {
        e.dataTransfer.setData("text/plain", dragId);
        e.dataTransfer.effectAllowed = "move";
      }}
      onDragOver={(e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
      }}
      onDrop={(e) => {
        e.preventDefault();
        const from = Number(e.dataTransfer.getData("text/plain"));
        const to = id;
        if (!Number.isNaN(from)) onSwap(from, to);
      }}
      className={[
        "relative cursor-grab active:cursor-grabbing select-none",
        "transition-shadow",    
        isSelected ? "ring-2 ring-sky-500 rounded-xl" : "ring-0",
      ].join(" ")}
      style={{ width: 8 * scale, height: 8 * scale }}
      title={`Sprite ${id}`}
    >
      {children}
    </div>
  );
}

/**
 * SpriteGrid — shows many SpriteThumbs in a responsive grid and supports drag-to-reorder.
 */
export function SpriteGrid({
  sprites,
  palette,
  cols = 8,
  scale = 4,
  gap = 4,
  onReorder,
  onSelect,
  selectedIndex,
  className = "", 
}: 
  {
  sprites: Sprite8[];
  palette: Palette;
  cols?: number;
  scale?: number;
  gap?: number; // px gap between cells
  onReorder?: (nextSprites: Sprite8[]) => void;
  onSelect?: (index: number) => void;
  selectedIndex?: number | null;
  className?: string;
}) 
  {
  const [order, setOrder] = useState<number[]>(() => sprites.map((_, i) => i));

  // keep order length in sync if sprites change externally
  useEffect(() => {
    setOrder((prev) => {
      if (prev.length === sprites.length) return prev;
      return sprites.map((_, i) => i);
    });
  }, [sprites.length]);

  const onDropSwap = useCallback(
    (from: number, to: number) => {
      if (from === to) return;
      setOrder((prev) => {
        const next = [...prev];
        const fromPos = next.indexOf(from);
        const toPos = next.indexOf(to);
        if (fromPos < 0 || toPos < 0) return prev;
        [next[fromPos], next[toPos]] = [next[toPos], next[fromPos]];
        // propagate sprite order to parent if requested
        if (onReorder) {
          const reordered = next.map((idx) => sprites[idx]);
          onReorder(reordered);
        }
        return next;
      });

    },
    [onReorder, sprites]
  );

  return (
    <div
      className={[
        "grid",
        className,
      ].join(" ")}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, ${8 * scale}px)`,
        gap,
      }}
    >
      {order.map((spriteIdx) => (
        <DraggableThumb
          key={spriteIdx}
          id={spriteIdx}
          scale={scale}
          isSelected={selectedIndex === spriteIdx}
          onClick={() => onSelect?.(spriteIdx)}
          onSwap={onDropSwap}
        >
          <SpriteThumb sprite={sprites[spriteIdx]} palette={palette} scale={scale} />
        </DraggableThumb>
      ))}
    </div>
  );
}