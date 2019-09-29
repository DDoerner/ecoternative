chrome.runtime.onMessage.addListener(
    function (request, sender, senderResponse) {
        chrome.storage.sync.get(["lat", "lng"], function(data) {
            var resp = senderResponse;
            var lat = data.lat;
            var lng = data.lng;
            switch (request.message) {
              case 'productName': {
                  $.ajax({
                      url: "https://ecoternative.azurewebsites.net",
                      type: "POST",
                      dataType: 'json',
                      data: JSON.stringify({ system: "Shopping", request_data: { lng: lng, lat: lat }, request: request.name.replace('(', ' ').replace('(', ' ').replace('/', ' ').split(' ').slice(0,4).join(' ') }),
                      contentType: "application/json;charset=UTF-8",
                      success: function (response) {
                          senderResponse(response);
                      }
                  });
                break;
              }
              case 'flightName': {
                  $.ajax({
                      url: "https://ecoternative.azurewebsites.net",
                      type: "POST",
                      dataType: 'json',
                      data: JSON.stringify({ system: "Travel", request: 'ganzegal', request_data: { type: "Flight", from: request.from, to: request.to, date: '2019-10-18', date_back: null  }}),
                      contentType: "application/json;charset=UTF-8",
                      success: function (response) {
                          senderResponse(response);
                      }
                  });
                break;
              }
              default:
            }
        })
        return true;
    }
);

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {
        updateClimateScore(tab.url)
    }
    if (changeInfo.status == 'loading') {
        updateClimateScore(undefined)
    }
});

chrome.tabs.onActivated.addListener( function (tabId, changeInfo, tab) {
    if (tab === undefined) 
    {
        updateClimateScore(undefined)
    }
    else
    {
        updateClimateScore(amazonButtonClick)
    }
});

function updateLocation(address) {

    $.ajax({
        url: "https://maps.googleapis.com/maps/api/geocode/json?address="+address+"&key=AIzaSyAiSBo9Ne2IEoMPpZsufKRypiq-iuCxspQ",
        type: "GET",
        dataType: 'json',
        data: {},
        contentType: "application/json;charset=UTF-8",
        success: function (response) {
            if (response.status != "OK")
                return;
            var coords = response.results[0].geometry.location;
            saveCoordinates(coords.lat, coords.lng);
        }
    });
    
}

function saveCoordinates(lat, lng) {
    chrome.storage.sync.set({
        lat: lat,
        lng: lng
    }, function() {});
}

function ensureCoordinates() {
    chrome.storage.sync.get("lat", function(data) {
        if (!data.lat) {
            saveCoordinates(49.008224, 8.399308);
        }
    });
}
ensureCoordinates();

function updateClimateScore(url)
{   
    if (url === undefined)
    {
        chrome.browserAction.setBadgeText({text: '?'});
        chrome.browserAction.setBadgeBackgroundColor({color: "#534F4B"})
        return;
    }

    $.ajax({
        url: "https://ecoternative.azurewebsites.net/score?company=" + encodeURIComponent(url),
        type: "GET",
        dataType: 'json',
        success: function (response) {

            if (!response.env_score_known) 
            {
                chrome.browserAction.setBadgeText({text: '?'});
                chrome.browserAction.setBadgeBackgroundColor({color: "#534F4B"})
                return
            }

            var score = Math.round(response.env_score);
            chrome.browserAction.setBadgeText({text: score.toString()});

            if (score <= 25)
            {
                chrome.browserAction.setBadgeBackgroundColor({color: "#8F0406"})
            }
            else if (score <= 50)
            {
                chrome.browserAction.setBadgeBackgroundColor({color: "#9B4F02"})
            }
            else if (score <= 75)
            {
                chrome.browserAction.setBadgeBackgroundColor({color: "#A09600"})
            }
            else
            {
                chrome.browserAction.setBadgeBackgroundColor({color: "#006C3B"})
            }
        }
    });
}
