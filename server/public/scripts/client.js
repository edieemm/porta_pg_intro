$(document).ready(onReady);

function onReady() {
    getMusicData();
    $('#add').on('click', postMusicData);
}

// get artist data from the server
function getMusicData() {
    $("#musicTableBody").empty();
    $.ajax({
        type: 'GET',
        url: '/musicLibrary'
    }).then(function (response) {
        console.log("skjfhsd", response);
        // append data to the DOM
        for (let i = 0; i < response.length; i++) {
            $('#musicTableBody').append(`
                <tr>
                    <td>${response[i].artist}</td>
                    <td>${response[i].track}</td>
                    <td>${response[i].rank}</td>
                    <td>${response[i].published}</td>
                    <td><button data-id="${response[i].id}" class="deleteThis">Delete</button></td>
                </tr>
            `);
        }
        $('.deleteThis').on('click', deleteBtn)
    });
}

function deleteBtn(){
    let songId = $(this).data('id');
    console.log('delete!', songId);
    $.ajax({
        type: 'DELETE',
        url: `/musicLibrary/${songId}`
    }).then( function(response) {
        console.log(response)
        getMusicData();
    })
}


function postMusicData() {
    let payloadObject = {
        artist: $('#artist').val(),
        track: $('#track').val(),
        rank: $('#rank').val(),
        published: $('#published').val()
    }
    $.ajax({
        type: 'POST',
        url: '/musicLibrary',
        data: payloadObject
    }).then( function (response) {
        $('#artist').val(''),
        $('#track').val(''),
        $('#rank').val(''),
        $('#published').val('')
        getMusicData();
    });
}