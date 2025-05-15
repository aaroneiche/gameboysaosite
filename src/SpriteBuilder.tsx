import { Dotting, useData, useDotting, useBrush } from "dotting";
import type { DottingRef, PixelModifyItem, } from "dotting";
import {useState, useRef, useEffect } from "react";

const CreateEmptySquareData = (
  size: number,
): Array<Array<PixelModifyItem>> => {
  const data: Array<Array<PixelModifyItem>> = [];
  for (let i = 0; i < size; i++) {
    const row: Array<PixelModifyItem> = [];
    for (let j = 0; j < size; j++) {
      row.push({ rowIndex: i, columnIndex: j, color: "" });
    }
    data.push(row);
  }
  return data;
}; 

const PixelEditor = (props: { currentColor: string; dataCallback: Function }) => {
  const ref = useRef<DottingRef>(null);

  const { dataArray } = useData(ref);

  const initialLayer = [
    {
      id: "layer1",
      data: CreateEmptySquareData(8),
    },
  ];

  useEffect(() => {
    props.dataCallback(dataArray)
  }, [dataArray]);

  return (
    <Dotting
      ref={ref}
      width={300}
      height={300}
      isGridFixed={true}
      isPanZoomable={false}
      initLayers={initialLayer}
      brushColor={props.currentColor}
    />
  );
};

export default function SpriteBuilder() {
  // RED = 0x00F8   #e6003a
  // GREEN = 0xE007
  // BLUE = 0x1F00    #001cc5
  // WHITE = 0xFFFF
  // BLACK = 0x0000

  type palette = string[];
  type palettes = palette[];
  const initialPalettes: palettes = [
    ["#FFFFFF", "#FF0000", "#00FF00", "#0000FF"],
    ["#FFFFFF", "#FFFB86", "#4E4D52", "#A9A861"],
  ];

  const palettes = useState<palettes>(initialPalettes);
  const [currentPalette] = useState<palette>(initialPalettes[1]);
  
  const [currentColor, setCurrentColor] = useState<palette>(currentPalette);
  
  const colorSelector = currentPalette.map((c) => (
    <button
      onClick={() => {
        setCurrentColor(c);
      }}
    >
      <div style={{ backgroundColor: c, height: "20px", width: "60px" }}> </div>
      {hexToBRG(c)}
    </button>
  ));

  const [spriteBytes, setSpriteBytes] = useState<number[]>([]);
  const formattedBytes = spriteBytes
    .map((b) => {
      return "0x" + b.toString(16).padStart(2, "0");
    })
    .join(", ");


  function hexToBRG(color: string) {
    const r = Math.round((Number(`0x${color.substring(1, 3)}`) / 255) * 31);
    const g = Math.round((Number(`0x${color.substring(3, 5)}`) / 255) * 63);
    const b = Math.round((Number(`0x${color.substring(5, 7)}`) / 255) * 31);
    const rgb = (r << 11) | (g << 5) | b;

    const rgb565 = rgb.toString(16).padStart(4,"0");
    return `${rgb565.substring(2, 4)}${rgb565.substring(0, 2)}`;
  }

  const processData = (input: Array<Array<PixelModifyItem>>) => {
    const upperBytes: number[] = [0, 0, 0, 0, 0, 0, 0, 0];
    const lowerBytes: number[] = [0, 0, 0, 0, 0, 0, 0, 0];

    input.forEach((byte, b) => {
      for (let i = 7; i >= 0; i--) {
        const val = currentPalette.indexOf(byte[i].color);
        if (val >= 0) {
          upperBytes[b] |= ((val & 2) >> 1) << (7 - i);
          lowerBytes[b] |= (val & 1) << (7 - i);
        } else {
          upperBytes[b] |= 0;
          lowerBytes[b] |= 0;
        }
      }
    });

    setSpriteBytes([...lowerBytes, ...upperBytes]);
  };

  return (
    <>
      <div> This is the sprite builder</div>
      <div id="paletteSelector"></div>
      <div style={{ display: "flex" }}>
        <PixelEditor currentColor={currentColor} dataCallback={processData} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          {colorSelector}
        </div>
      </div>
      <textarea name="spriteOutput" id="" value={formattedBytes} style={{width: "296px", height: "70px"}}></textarea>
    </>
  );
}
