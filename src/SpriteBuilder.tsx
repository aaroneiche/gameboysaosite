import { Dotting, useData, useDotting, useBrush } from "dotting";
import type { DottingRef, PixelModifyItem, } from "dotting";
import Navigation from "./Navigation";

import {useState, useRef } from "react";


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


const DottingExample = (props:{currentColor: string}) => {
  
  //CreateEmptySquareData(8)
  const ref = useRef<DottingRef>(null);
  
  const { clear, setData } = useDotting(ref);
  const { data, dataArray } = useData(ref);
  const { changeBrushColor } = useBrush(ref);

  // useEffect(() => {
  //   console.log(dataArray);
  // }, [dataArray]);

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);


  const initialLayer = [
    {
      id: "layer1",
      data: CreateEmptySquareData(8)
    }];

  return (
    <Dotting
      ref={ref}
      width={350}
      height={350}
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
    
    // const [currentColor,setCurrentColor] = useState<typeof currentColors[string]>(currentColors[1])
    const [currentColor,setCurrentColor] = useState(currentColors[1])

    const colorSelector = currentColors.map(c=><button onClick={()=>{setCurrentColor(c)}}>{c}</button>)

  return (
    <>
      <Navigation/>
      <div> This is the sprite builder</div>
      <DottingExample currentColor={currentColor}/>
      {colorSelector}
    </>
  );
}
