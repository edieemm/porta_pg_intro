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
        // append data to the DOM
        for (let i = 0; i < response.length; i++) {
            $('#musicTableBody').append(`
                <tr data-id="${response[i].id}">
                    <td>${response[i].artist}</td>
                    <td>${response[i].track}</td>
                    <td>${response[i].rank}</td>
                    <td>${response[i].published}</td>
                    <td><button class="deleteThis">Delete</button></td>
                    <td><button class="update">+</button><button class="update">-</button></td>
                </tr>
            `);
        }
        $('.deleteThis').on('click', deleteBtn)
        $('.update').on('click', updateRank)
    });
}

function deleteBtn(){
    let songId = $(this).parent().parent().data('id');
    console.log('delete!', songId);
    $.ajax({
        type: 'DELETE',
        url: `/musicLibrary/${songId}`
    }).then( function(response) {
        console.log(response)
        getMusicData();
    })
}
function updateRank(){
    let direction = $(this).text();
    let songId = $(this).parent().parent().data('id');
    console.log(direction, songId);
    $.ajax({
        type: 'PUT',
        url: `/musicLibrary/rank/${songId}`,
        data: { direction: direction }
    }).then(function (response) {
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