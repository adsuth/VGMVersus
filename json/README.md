# How to Generate and Format Songs Files
## Songs File: File Name Formatting
JSON songs files must abide by the following conventions:
- Files must be of the JSON format
- Ensure no spaces before or after file name (eg: " main .json" is unacceptable)

Once created, place the songs files in the `./json` directory. Otherwise the app **will not find your file.**

## Songs File: JSON Format
### TSV File
Check out `link coming soon` for info on how you can batch parse your TSV or CSV into workable JSON files!

In order, each song requires:
- Track name
- Game name
- The series (if the game is a standalone, the title will suffice)
- A YouTube share link (gotten from the "Share" button below a YouTube video)
- (optionally) an offset for this song to start it later than 0s. If omitted, will start at 0 like normal.

Examples (these are CSV, but for TSV, simply replace commas with tabs. Excel/Sheets allow you to export as TSV):

`Demise,Virtue's Last Reward,Zero Escape,https://youtu.be/9VSCJAWEPRo,50`

`Accumula Town,Black and White,Pokemon,https://youtu.be/p3y5dtLOaQk,0`

`Megalovania,UNDERTALE,UNDERTALE,https://youtu.be/c5daGZ96QGU,0`

### JSON File
After processing, a JSON songs file will be generated. The following is an snippet of what the songs file should look like.

*Note: Sometimes songs files may be "too large". To remedy this, simply run the "Beautify" command in vscode on the songs file.*
```
{
    "9 Hours, 9 Persons, 9 Doors": [{
        "index": 0,
        "name": "Main Theme",
        "game": "9 Hours, 9 Persons, 9 Doors",
        "series": "Zero Escape",
        "url": "https://youtu.be/g9Qb3yDrj0c",
        "id": "g9Qb3yDrj0c",
        "start_time": 0
    }, {
        "index": 1,
        "name": "Recollection",
        "game": "9 Hours, 9 Persons, 9 Doors",
        "series": "Zero Escape",
        "url": "https://youtu.be/HlC9XkvWvKo",
        "id": "HlC9XkvWvKo",
        "start_time": 50
        }
    }]
}
```
