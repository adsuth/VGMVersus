# json => for exporting songs as JSON to file
# csv  => for interpreting tsv file
import json, csv

class Song:
    """
    Song objects store data for songs.
    """
    def __init__( self, index, name, game, series, url ):
        self.index = index
        self.name = name
        self.game = game
        self.series = series
        self.url = url

        self.id = getSongId( self.url ) # id == url without fluff
    

def parseTSV( tsv_dir ):
    """
    Interprets VGMB tsv, stores all lines in a list and returns
    """
    songs = []

    with open( tsv_dir, "r", encoding='utf-8' ) as tsv:
        data = csv.reader( tsv, delimiter="\t" )
        index = 0
        for row in data:
            songs.append( Song( index, row[0], row[1], row[2], row[3] ) )
            index += 1
    
    return songs


def getGames(songs):
    """
    returns a dictionary with all unique games in the songs list
    """
    games = {}
    for song in songs:
        if song.game in games:
            continue
        games[song.game] = []
        
    return games


def getSeries( songs ):
    """
    returns a dictionary with all the unique series in the songs tsv
    Currently unused.
    """
    series = {}

    for song in songs:
        if song.series not in series:
            series[song.series] = {}

    return series


def getSongId( url ):
    """
    returns the id of the youtube video.
    eg:
    https://youtu.be/pLJ85XExZtQ
    becomes
    pLJ85XExZtQ
    """
    return url[slice( url.rindex("/")+1, len(url) )]
    


def processJSON( tsv_dir ):
    """
    Creates the export dictionary to be converted to JSON
    """
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


def clearJSON( json_dir ):
    """
    Deletes the current content of the given directory.
    Used to prevent adding to file instead of overwriting.
    """
    with open( json_dir, "w" ) as json:
        json.truncate( 0 )


########
# Main #
########

# change these to whatever is needed
DATA_FILE_NAME  = "megaman"

clearJSON("./json/%s.json" % (DATA_FILE_NAME))

json.dump( processJSON("./tsv/%s.tsv" % (DATA_FILE_NAME)), open("./json/%s.json" % (DATA_FILE_NAME), "w") )