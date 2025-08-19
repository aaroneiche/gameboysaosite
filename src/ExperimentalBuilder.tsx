import {Dotting, useDotting } from "dotting"
import type { DottingRef, PixelModifyItem } from "dotting";
import { useRef } from "react";

const CreateEmptySquareData = (
  size: number,
): Array<Array<PixelModifyItem>> => {
  const data: Array<Array<PixelModifyItem>> = [];
  for (let i = 0; i < size; i++) {
    const row: Array<PixelModifyItem> = [];
    for (let j = 0; j < size; j++) {
      row.push({ rowIndex: i, columnIndex: j, color: "#FFFFFF" });
    }
    data.push(row);
  }
  return data;
}; 

export default function SpriteGrouper() {
    const dottingRef = useRef<DottingRef>(null);
    
    const initialLayer = [{
        id:"layer1",
        data: CreateEmptySquareData(8)
    }]


    return <>
        <Dotting
            ref={dottingRef}
            width={600}
            height={600}
            isGridFixed={false}
            isPanZoomable={false}
            initLayers={initialLayer}
            resizeUnit={8}
            maxRowCount={32}
            maxColumnCount={32}
        />
    </>
}