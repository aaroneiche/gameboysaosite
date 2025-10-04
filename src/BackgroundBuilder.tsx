export function BackgroundBuilder() {


  return (
    <div>
      <div className="sideBySide">
        <div className={"sbsBlock"}>
          block A
          {/* <SpriteGrid
                scale={6}
                sprites={storedSprites}
                palette={currentPalette}
                onSelect={handleSelectSprite}
                /> */}
        </div>
        <div className={"sbsBlock"}>
          <div className="pixelEditorBlock">
            block B
            {/* <div style={{ display: "flex" }}>
                    <PixelEditor
                    currentColor={currentColor}
                    dataCallback={pixelUpdateCallback}
                    ref={childRef}
                    />
                </div>
                <div id="paletteSelector">{colorSelector}</div> */}
          </div>
        </div>
      </div>
      This is the Background builder. Here you can create backgrounds to put
      your characters in front of.
      <ul>
        <li>Backgrounds are made up of tiles. Each tiles is 4x4 sprites</li>
        <li>
          There are 25 Tiles in a background. 16 tiles are shown onscreen a time
        </li>
        <li>
          The tiles offscreen allow you to scroll the screen vertically or
          horizontally
        </li>
        <li>
          There is not enough memory to populate the entire display with unique
          sprites, so reusing sprites in tiles allows us to save RAM
        </li>
      </ul>
    </div>
  );
}
