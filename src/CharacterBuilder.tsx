

export function CharacterBuilder() {

    return (
        <div>
            This is the character builder. 
            Here you can create Characters to move around.


            <ul>
                <li>Characters are made up of sprites</li>
                <li>Characters can be just 1 sprite, or as many as 4x4 sprites.</li>
                <li>Characters can have have 1-4 'frames' of animation</li>
                <li>Screen updates are around 20-30/sec. You can set how often your character switches frames.</li>
                <li>There are 8 character slots you can fill. You can have up to 8 characters on screen.</li>
            </ul>
        </div>
    )
}