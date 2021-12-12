$(document).ready(function(){

    var variable = ""

    $.ajax({
        url: "AA_Songs.json",
        dataType: "json",
        success: function(data) { 
            variable = data["Phoenix Wright: Ace Attorney"][0].name
        },
        async: false
    })

    alert( variable )

})

function testFill(data) {
}