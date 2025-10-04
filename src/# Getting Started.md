# Getting Started

## Sprites!
Old video game systems (like the NES and the Gameboy) use sprites to draw pictures on the display. A sprite is (usually) a square block of pixels. In the case of the gameboy and NES, it was 8 pixels wide and 8 pixels tall. Everything on the screen with these systems was a sprite of some sort.

(picture of Sprite)

You could combine several sprites together to make a bigger picture. 

(picture of Sprites combined to Goomba or something)

The Gameboy SAO uses sprites in a very similar way to the original Gameboy, though there some helpers and some restrictions to make it easier.

## Putting sprites on the GameboySAO's display.
As noted above, everything on the screen is a sprite. You can combine sprites to make bigger images. With the GameboySAO, we draw **Characters** and **Backgrounds**.

### Characters
Characters are made up of sprites, and some extra information about how to draw, and where. A character is essentially anything that moves around on the screen. Think of a falling Tetris block or Mario as a character. Characters can be as small as 1 sprite, or as large as 4x4 (16) sprites. 

Characters have an x and y position, a vertical and horizontal flip. They also have a set of animation frames, that animate a character as they move. For some (like a Tetris block) there's only one frame. For others (like Mario running) there are 3 frames.

### Backgrounds
Backgrounds are made up of *tiles*. Tiles are made up of sprites. There are 16 sprites in a tile, in a 4x4 arrangement. There are 16 tiles on a screen at a time. Because there's not a lot of memory on the GameboySAO, tiles make it easier to make an interesting background.

## Using the premade characters and backgrounds.
There are several Backgrounds and characters already on the GameboySAO. This makes it easy to animate something without spending too much time in the creation process.


## Sequences
Sequences are what make the GameboySAO show something on screen. A sequence always has a *control set* and one or more *animation sets*. The control set does things like load the background into memory, and set what sprites are going to be used in the characters.  

