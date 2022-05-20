import { generateJSON } from "./generateJSON.js"

$(document).ready( () => {
    generatorEvents()
} )

function generatorEvents() {
    $("#drop_input").on("dragenter", ev => {
        $("#drop_zone").css( {backgroundColor: "var(--colorDark)",outlineStyle: "solid"} )
    })

    $("#drop_input").on("dragleave", ev => {
        $("#drop_zone").css( {outlineStyle: "dashed", backgroundColor: "transparent"} )
    })

    $("#drop_input").on("change", ev => {
        let fileName = ev.target?.files[0].name
        let type = fileName.slice( fileName.lastIndexOf( "." ) +1 ).toUpperCase()
        
        let isCSV = type == "CSV"
        let isTSV = type == "TSV"
        let isJSON = type == "JSON"
        
        if ( ev.target.value && (isCSV || isTSV) ) { 
            updateMessage(`Generating JSON...`)
            updateGeneratorData(ev.target.files[0], type)
            return getJSON(ev.target.files[0], type)
        }
        
        if ( isJSON ) {
            updateGeneratorData(ev.target.files[0], type, "JSON File accepted")
            return addPreexistingJSON( ev.target.files[0], removeFileExtension(fileName) )
        }

        updateMessage( `<span class="error">The file <b>${fileName}</b> isn't supported<br>Please choose a TSV or CSV</span>` )

        resetGeneratorData()
        $("#drop_zone").css( {outlineStyle: "dashed", backgroundColor: "transparent"} )
    })

}

function addPreexistingJSON( file, fileName ) {
    file = URL.createObjectURL(file)
    return new Promise( res => {
        res( fetch(file) )
    })
    .then( data => data.json() )
    .then( data => {
        CURRENT_SONG_LISTS[ fileName.toLowerCase() ] = data
        updateMessage(`<span class="correct">JSON song list added to session. Enter <b>${fileName}</b> in settings to play.</span>`)
    } )
    .catch( () => {
        updateMessage(`<span class="error">Error with song list... Make sure JSON is formatted as per GitHub specs.</span>`)
    } )
}

function resetGeneratorData() {
    $("#fileName").html( "No File Chosen" )
    $("#btn_download").prop("disabled", true)

    $("#drop_zone>p").html( "Click here or Drop CSV or TSV Here" )
    $("#drop_zone>p").removeClass("correct")
}

function updateGeneratorData(data, type, msg="") {
    $("#fileName").html( data.name )
    $("#btn_generate").prop("disabled", false)
    $("#drop_zone>p").html( msg || `${type} file accepted. Click button to begin download` )
    $("#drop_zone>p").addClass("correct")
}

function getJSON( data, type ) {
    let fileName = removeFileExtension(data.name).replace("VGMB - ", "").toLowerCase()
    let file = URL.createObjectURL( data )

    generateJSON(file, type )
    .then( data => { 
        addToList(data, fileName) 
        updateMessage(`<span class="correct">Song list added session. enter <b>${fileName}</b> in settings to play.</span>`)
        return data
    } )
    .then( data => {
        $("#btn_download").prop( "disabled", false )
        $("#btn_download").unbind() // remove previous event
        $("#btn_download").click( () => {
            let blob = new Blob(
                [data],
                { type: "application/json;charset=utf-8" }
            )
            // add download attributes to button (well, a tag)
            $("#a_download").prop( "href", URL.createObjectURL(blob) )
            $("#a_download").prop( "download", fileName + ".json" )
        } )
    } )
    .catch( () => {
        updateMessage(`<span class="error">Error creating song list... Make sure TSV/CSV is formatted as per GitHub specs.</span>`)
    })
    
}

function addToList( data, fileName ) {
    CURRENT_SONG_LISTS[ fileName ] = JSON.parse(data)
}

/**
 * Removes the file extension from given file name
 * For example, main.tsv -> main
 * @param {String} fileName 
 * @returns 
 */
function removeFileExtension( fileName ) {
    return fileName.slice( 0, fileName.lastIndexOf(".") )
}

function updateMessage( msg = "" ) {
    $("#caption_message").html( msg )
}