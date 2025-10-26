import { Dotting, useData, useDotting } from "dotting";
import type { DottingRef, PixelModifyItem, } from "dotting";
import {useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";

import { SpriteGrid } from "./SpriteGrid";

const CreateEmptySquareData = (  size: number,): Array<Array<PixelModifyItem>> => {
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


const generateSpritePage = () => {
  const page = new Map();
  for(let i = 0; i < 64; i++) {
    page.set(i, {pixels:[]});
  }
  return page;
}



const PixelEditor = forwardRef((props: { currentColor: string; dataCallback: Function}, ref) => {
  const dottingRef = useRef<DottingRef>(null);

  const { dataArray } = useData(dottingRef);
  const { setData, downloadImage } = useDotting(dottingRef);

  useImperativeHandle(ref, ()=>({
    changePixelData(dottingPixels: Array<Array<PixelModifyItem>>) {
      setData(dottingPixels)
    }
  }));

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
    <>
      <Dotting
        ref={dottingRef}
        width={288}
        height={288}
        isGridFixed={true}
        isPanZoomable={false}
        initLayers={initialLayer}
        brushColor={props.currentColor}
        // defaultPixelColor="#FFFFFF"
      />
    </>
    
  );
});

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

  const [editorVisible, setEditorVisible] = useState<boolean>(false);

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

  const defaultNewPage = generateSpritePage();

  const [spriteBytes, setSpriteBytes] = useState<number[]>([]);
  const [storedSprites, setStoredSprites] = useLocalStorage<
    Map<number, { pixels: number[] }>
  >("storedSprites", defaultNewPage);
  const [spriteOrder, setSpriteOrder] = useLocalStorage<number[]>(
    "spriteOrder",
    []
  );

  const [currentSprite, setCurrentSprite] = useState(0);

  const formattedBytes = spriteBytes
    .map((b) => {
      return "0x" + b.toString(16);
    })
    .join(", ");

  function hexToBRG(color: string) {
    const r = Math.round((Number(`0x${color.substring(1, 3)}`) / 255) * 31);
    const g = Math.round((Number(`0x${color.substring(3, 5)}`) / 255) * 63);
    const b = Math.round((Number(`0x${color.substring(5, 7)}`) / 255) * 31);
    const rgb = (r << 11) | (g << 5) | b;

    const rgb565 = rgb.toString(16).padStart(4, "0");
    return `${rgb565.substring(0, 2)}${rgb565.substring(2, 4)}`;
  }

  function getCurrentColorFromBitVal(bitVal: number): string {
    return currentPalette[bitVal];
  }

  function blockToHex(val: string) {
    const bytes = val.split(", ");
    console.log(bytes);
    const outputPixelGrid: PixelModifyItem[][] = [];

    //each row
    for (let i = 0; i < 8; i++) {
      // 2 bytes per row
      const p1 = Number(bytes[2 * i + 1]) & 0x3;
      const p2 = (Number(bytes[2 * i + 1]) & 0xc) >> 2;
      const p3 = (Number(bytes[2 * i + 1]) & 0x30) >> 4;
      const p4 = (Number(bytes[2 * i + 1]) & 0xc0) >> 6;
      const p5 = Number(bytes[2 * i]) & 0x3;
      const p6 = (Number(bytes[2 * i]) & 0xc) >> 2;
      const p7 = (Number(bytes[2 * i]) & 0x30) >> 4;
      const p8 = (Number(bytes[2 * i]) & 0xc0) >> 6;

      console.log(p1);

      // getCurrentColorFromBitVal(p1);
      outputPixelGrid[i] = [
        { rowIndex: i, columnIndex: 1, color: getCurrentColorFromBitVal(p1) },
        { rowIndex: i, columnIndex: 2, color: getCurrentColorFromBitVal(p2) },
        { rowIndex: i, columnIndex: 3, color: getCurrentColorFromBitVal(p3) },
        { rowIndex: i, columnIndex: 4, color: getCurrentColorFromBitVal(p4) },
        { rowIndex: i, columnIndex: 5, color: getCurrentColorFromBitVal(p5) },
        { rowIndex: i, columnIndex: 6, color: getCurrentColorFromBitVal(p6) },
        { rowIndex: i, columnIndex: 7, color: getCurrentColorFromBitVal(p7) },
        { rowIndex: i, columnIndex: 8, color: getCurrentColorFromBitVal(p8) },
      ];
    }

    console.log(outputPixelGrid);

    return outputPixelGrid;
  }

  function convertToDotting(sprite: any) {
    const dottingPixels = sprite.pixels.map((color: number, idx: number) => {
      const row = Math.floor(idx / 8);
      return {
        rowIndex: row,
        columnIndex: idx - row * 8,
        color: currentPalette[color],
      };
    });

    const dottingSprite = [];
    for (let i = 0; i < 8; i++) {
      dottingSprite.push(dottingPixels.slice(i * 8, (i + 1) * 8));
    }
    return dottingSprite;
  }

  function convertToSpriteFormat(dottingData, id) {
    const spritePixels = dottingData
      .map((row, r) => {
        return row.map((pixel, p) => {
          // return (pixel.color === undefined)? currentPalette[0]: currentPalette[pixel.color];
          return currentPalette.indexOf(pixel.color);
        });
      })
      .flat();

    return { id: id, pixels: spritePixels };
  }

  /* 
    Gets called on pixel changes in Dotting component. 
  */
  const pixelUpdateCallback = (input: Array<Array<PixelModifyItem>>) => {
    /* 
      //A typical Row.
      [{row:0, column:0, color: "#FFFFFF"}],
      [{row:0, column:0, color: "#FFFFFF"}],
      [{row:0, column:0, color: "#FFFFFF"}],
      [{row:0, column:0, color: "#FFFFFF"}],
      [{row:0, column:0, color: "#FFFB86"}],
      [{row:0, column:0, color: "#FFFB86"}],
      [{row:0, column:0, color: "#FFFB86"}],
      [{row:0, column:0, color: "#FFFB86"}],
    */

    const newSprites = [...storedSprites];

    newSprites[currentSprite] = convertToSpriteFormat(input, currentSprite);

    const byteSet: number[] = [];

    // This creates the list of bytes for using in programming
    input.forEach((byte) => {
      let outputBytes = 0;

      // The bits are laid out from left to right. We need bits littleEndian
      // start with the "last" (furthest left) pixel in the row first
      for (let i = 7; i >= 0; i--) {
        // We get a 0, 1, 2, or 3
        let colorIndex = currentPalette.indexOf(byte[i].color);
        colorIndex = colorIndex === -1 ? 0 : colorIndex;
        const theseBits = colorIndex << (2 * (7 - i));

        outputBytes |= theseBits;
      }
      byteSet.push((outputBytes & 0xff00) >> 8); //Second Byte
      byteSet.push(outputBytes & 0x00ff); //First Byte
    });

    setSpriteBytes(byteSet); //Set the text bytes.
    setStoredSprites(newSprites); //Store the data bytes
  };

  const copyArray = () => {
    navigator.clipboard.writeText(formattedBytes);
  };

  const [textContents, setTextContents] = useState("");
  const childRef = useRef(null);

  // Is called to load pixels into Dotting component at SpriteSelection.
  const handleChangePixels = (dottingData) => {
    childRef.current?.changePixelData(dottingData);
  };
  //Is called when a sprite is selected in the SpriteGrid.
  const handleSelectSprite = (gridPosition) => {
    if (storedSprites[gridPosition].length === 0) {
      handleChangePixels(CreateEmptySquareData(8));
    } else {
      handleChangePixels(convertToDotting(storedSprites[gridPosition]));
    }
    setCurrentSprite(gridPosition);
  };

  // Ensure "order" always has something valid
  useEffect(() => {
    if (spriteOrder.length === 0 && storedSprites.size > 0) {
      setSpriteOrder(Array.from(storedSprites.keys()));
    }
  }, [spriteOrder, storedSprites]);

  return (
    <div>
      <div className="sideBySide">
        <div className={"sbsBlock"}>
          <SpriteGrid
            scale={6}
            sprites={storedSprites}
            palette={currentPalette}
            order={spriteOrder}
            onSelect={handleSelectSprite}
          />
          <div>
            <button>Character Sprites</button>
            <button>Background Sprites</button>
          </div>
        </div>
        <div className={"sbsBlock"}>
          <div className="pixelEditorBlock">
            <div style={{ display: "flex" }}>
              <PixelEditor
                currentColor={currentColor}
                dataCallback={pixelUpdateCallback}
                ref={childRef}
              />
            </div>
            <div id="paletteSelector">{colorSelector}</div>
          </div>

          <textarea
            name="editor"
            id=""
            onChange={(v) => {
              console.log(v.target.value);
              setTextContents(v.target.value);
            }}
          ></textarea>
          <div>
            <button onClick={() => copyArray()}>Copy</button>
            <button
              onClick={() => {
                handleChangePixels(blockToHex(textContents));
              }}
            >
              Load Bytes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
