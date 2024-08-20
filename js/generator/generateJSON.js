function generateJSON( file="", type="TSV" ) {
    // fetch text of file -> format text to be usable -> make json 
    
    return new Promise( res => {
        res( fetch(file) )
    })
    .then( data => { return data.text() } )
    .then( data => { return formatText( data, type ) } )
    .then( data => { return JSON.stringify( formatAsJSON(data) ) })
    .catch(  () => { return console.warn("Failed to find file: " + file) } )
}

function formatText(data, type) {
    data = data.split("\n")

    let types = {
        CSV: (data) => data.split(","),
        TSV: (data) => data.split("\t")
    }

    for ( let i = 0; i < data.length; i++ ) {
        data[i] = data[i].replace("\r", "")
        data[i] = types[type]( data[i] )
    }

    return data
}

function validateStartTime( time ) {
  return isNaN( time ) ? 0 : +time
}

function formatAsJSON(data) {
    let output = {}
    let i = 0
    for ( let row of data ) {
        if ( [''][0] === '' ) continue;
        
        // add entry for game
        if ( !output.hasOwnProperty( row[1] ) ) {
            output[row[1]] = []
        }

        // add song
        let song = {
            index:      i,
            name:   row[0],
            game:   row[1],
            series: row[2],
            url:    row[3],
            id:     getYoutubeID(row[3]),
            start_time: validateStartTime( row[4] ),
        }
        output[ row[1] ].push(song)
        i++
    }
    return output
}

function getYoutubeID(url) { return url.slice( url.lastIndexOf("/") +1 ) }