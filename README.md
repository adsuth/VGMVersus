# VGM Versus
## History
The game was made to practice for [The Chase VGM](https://www.twitch.tv/thechasevgm), a gameshow on the livestreaming platform Twitch which itself is based on *The Chase*, a now-global quiz show where players answer questions to elude the primary antagonist, "the Chaser", and take home a large cash prize. Should they get caught, it's game over and they'll leave the game with nothing.

While *The Chase* is a general knowledge quiz show, *The Chase VGM* tests a contestant's knowledge of music from videogames of all genres; from Pokémon to The Last of Us. The format has been tweaked for a livestreaming context, but the heart is still there - Chasers and all.

Once every so often, a special episode of *The Chase VGM* takes place known as "Masters". *Masters* has individual players compete head to head to earn the title of Master for a specific game - *Ace Attorney Master*, *Mario Master*, *Final Fantasy Master*, etc. and that's where *VGM Versus* comes in: a way to practice the head-to-head in a simple, specified format.

## The Game
Both players start with a set amount of time; by default, one minute and thirty seconds, but that can be changed in the Settings. A player's timer ticks down during a their turn, only passing on to the next player **after they guess a collective two points**. 

A player gets a point for every correct part of an answer. If they correctly guess the game and track, they receive two points. Should they guess *only* the game or track, they'll receive only one point. Guessing nothing correct, obviously, grants no points.

When a player's time runs out, they lose.

## APIs used
VGM Versus makes use of the *YouTube Player* API to play its tracks. There aren't any requirements like API Keys, only that Javascript be enabled in your browser.

## Special Credits
"Game Over Yeah!" by Takenobu Mitsuyoshi from the game *SEGA Rally Championship*

## Known Issues
### Known Unknown Issues
The site is a work in progress (WIP). As such, there are bound to be little bugs - perhaps even game breaking ones. Please bear with me while I get it working. This is - first and foremost - a pet project by an amateur (and even that is generous).

### Visual Bug With First Song's Data on Restart (Fixed?)
Occassionally, when restarting the game, the FIRST song will display incorrectly.
This is purely a visual bug. I'm trying to figure out how this happens so I can get it fixed, so bear with me.

### Unavailable Videos (Cicumvented)
Due to the dubious nature of video game soundtrack uploads in terms of copyright, video links are volatile at best. Channels get taken down, deleted or copyright struck. Whether or not a video can play on am HTML iframe is determined by the owner, so it's difficult to know what links will break and when.

There is a solution: just skip broken links. The site does this implicitly, but the problem of broken songs is something to be aware of.

## Roadmap
Just a list of future ideas for implementations. 
### 