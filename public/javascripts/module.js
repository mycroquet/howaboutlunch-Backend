$(document).ready(function() {
    navigator.geolocation.getCurrentPosition(function(result) {
        console.log(result);
        let xCoord = result.coords.latitude;
        let yCoord = result.coords.longitude;
        $.get(`/templates/maps?xCoord=${xCoord}&yCoord=${yCoord}`)
            .then((placeInfo) => {
                $("#place-info").html(placeInfo)
            })
            .catch(error => console.error);
    })
})
