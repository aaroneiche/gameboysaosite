import { Dotting, useData, useDotting, useBrush } from "dotting";
import type { DottingRef } from "dotting";

import { useEffect, useRef } from "react";

const DottingExample = () => {
  
    const ref = useRef<DottingRef>(null);
    console.log(ref);
    const { clear } = useDotting(ref);
    const {data, dataArray} = useData(ref);
    const { changeBrushColor } = useBrush(ref);    

    useEffect(()=>{
        console.log(dataArray);
    },[dataArray])

    useEffect(()=>{
        console.log(data);
    },[data])

    return (
        <Dotting ref={ref} width={350} height={350} isGridFixed={true} />
  );
};

export default function SpriteBuilder() {

  return (
    <>
      <div> This is the sprite builder</div>
      <DottingExample/>
    </>
  );
}
