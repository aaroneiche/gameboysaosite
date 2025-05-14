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
    const [currentColors] = useState<string[]>([
      "#FFFFFF",
      "#FF0000",
      "#00FF00",
      "#0000FF",
    ]);
    
    const [currentColor, setCurrentColor] = useState(currentColors[1])
    const colorSelector = currentColors.map(c=><button onClick={()=>{setCurrentColor(c)}}>
      <div style={{backgroundColor:c, height: "20px", width:"20px"}}> </div>
    </button>)

    const [spriteBytes, setSpriteBytes] = useState("--");


    // function d2b(dec) {
    //   // return (dec >>> 0).toString(2);
    //   return dec.toString(2).padStart(8,'0');
    // }


    const processData = (input: Array<Array<PixelModifyItem>>) => {
      const upperBytes: number[] = [0,0,0,0,0,0,0,0];
      const lowerBytes: number[] = [0,0,0,0,0,0,0,0];

      input.forEach((byte, b) => {
        for (let i = 7; i >= 0; i--) {
          const val = currentColors.indexOf(byte[i].color);
          if (val >= 0) {
            upperBytes[b] |= ((val & 2) >> 1) << (7 - i);
            lowerBytes[b] |= (val & 1) << (7 - i);
          } else {
            upperBytes[b] |= 0;
            lowerBytes[b] |= 0;
          }
        }
      });
      
      setSpriteBytes([...lowerBytes, ...upperBytes].join(","))
    };

  return (
    <>
      <div> This is the sprite builder</div>
      <div style={{ display: "flex" }}>
        <PixelEditor currentColor={currentColor} dataCallback={processData} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          {colorSelector}
        </div>
      </div>
      <textarea name="spriteOutput" id="" value={spriteBytes}></textarea>
    </>
  );
}
