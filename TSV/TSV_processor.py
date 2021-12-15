# json => for exporting songs as JSON to file
# csv  => for interpreting tsv file
import json, csv

"""
Song objects store data for songs.
"""
class Song:
    def __init__( self, index, name, game, series, url ):
        self.index = index
        self.name = name
        self.game = game
        self.series = series
        self.url = url

        self.id = getSongId( self.url ) # returns the song id
    
"""
Interprets VGMB tsv, stores all lines in a list and returns
"""
def parseTSV( tsv_dir ) -> list:
    songs = []

    with open( tsv_dir, "r" ) as tsv:
        data = csv.reader( tsv, delimiter="\t" )
        index = 0
        for row in data:
            songs.append( Song( index, row[0], row[1], row[2], row[3] ) )
            index += 1
    
    return songs

"""
returns a dictionary with all unique games in the songs list
"""
def getGames(songs) -> dict:
    games = {}
    for song in songs:
        if song.game in games:
            continue
        games[song.game] = []
        
    return games

"""
returns a dictionary with all the unique series in the songs tsv
Currently unused.
"""
def getSeries( songs ) -> dict:
    series = {}

    for song in songs:
        if song.series not in series:
            series[song.series] = {}

    return series

"""
returns the id of the youtube video.
eg:
https://youtu.be/pLJ85XExZtQ
becomes
pLJ85XExZtQ
"""
def getSongId( url ) -> str:
    return url[slice( url.rindex("/")+1, len(url) )]
    

"""
Creates the export dictionary to be converted to JSON
"""
def processJSON( tsv_dir ) -> dict:
    output = {}
    songs = parseTSV( tsv_dir )
    
    output.update( getGames(songs) )
    # output.update( getSeries(songs) )
    # print( output )

    # # get games
    # for serie in output:
    #     output[serie].update( getGames(songs, serie) )
    
    # get songs
    for i in range( len(songs) ):
        # output[songs[i].series][songs[i].game].append( songs[i].__dict__ )
        output[songs[i].game].append( songs[i].__dict__ )
        # output[ songs[i].series ][ songs[i].game ] = output.get([ songs[i].series ][ songs[i].game ], songs[i].__dict__ ).append(songs[i].__dict__)
    
    return output

"""
Deletes the current content of the given directory.
Used to prevent adding to file instead of overwriting.
"""
def clearJSON( json_dir ) -> None:
    with open( json_dir, "w" ) as json:
        json.truncate( 0 )


########
# Main #
########

clearJSON( "AA_Songs.json" )
json.dump( processJSON("TSV/VGMB - Ace Attorney.tsv"), open("AA_Songs.json", "w") )