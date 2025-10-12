



Set Character Pose
Command: 3
Args: Character ID, pose ID, pose ID, pose ID, pose ID
Description: 
This command populates the pose slots in the characters poses list. Provide at least the first pose id. Unused pose id arguments should be provided a `0`. You can use the 


Set Character Position
Command: 4
Args: Character ID, X, Y
Description: 
This command sets a character's X,Y Position

Set Character direction
Command: 5
Args: Character ID, flip X, flip Y


Animate Character
Command: 10
Args: Character ID, Move Type (1), Target X, Target Y, By X, By Y, Frame Delay.
Description
Creates an animation for the character to move to. Target X and Y are where you want the character to end up. By X and Y are the steps to move 
Frame delay is how often to take the next step.
(Dev note, I'm tempted to do this over number of frames instead of explicitly.)

