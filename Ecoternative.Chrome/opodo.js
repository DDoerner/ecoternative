
var timer_id = setInterval(checkReady, 100);

function checkReady()
{
    if (document.querySelector('.saving_message .odf-text-positive'))
    {
        clearInterval(timer_id);
        onReady();
    }
}

function onReady()
{
    var fromName = document.querySelector('#origin_field_container input').value;
    var toName = document.querySelector('#destination_field_container input').value;
   // var toName = document.getElementById('destination_field_container').getElementsByClassName('od-oneline-airport-field');

    chrome.runtime.sendMessage({ message: 'flightName', from: fromName, to:  toName }, callbackHook);
}

function callbackHook(data)
{
    replaceMainDeal(data);
}

function replaceMainDeal(data) {
    var wrapper = document.querySelector('.od-results-area > div > .result_wrapper');
    var wrapperCopy = wrapper.cloneNode(true);
    wrapper.parentNode.prepend(wrapperCopy);

    // empty old highlight box
    wrapper.querySelector('.odf-header').remove();
    wrapper.querySelector('.result').classList.remove('highlighted');
    wrapper.querySelector('.odf-box').classList.add('odf-box-primary');

    // fill new highlight box
    var hours = Math.floor(data.alternative_data.travel_time);
    var minutes = Math.round(Math.round((data.alternative_data.travel_time - Math.floor(data.alternative_data.travel_time)) * 100) / 100 * 60);
    wrapperCopy.querySelector('.od-resultpage-highlighted-title').innerText = "Eco Deal! Why not take the train?";
    var endTime = new Date(2019, 10, 19, 9 + hours, minutes)
    wrapperCopy.querySelector('.od-resultpage-segment-info-tip > div').innerText = "09:00 - " + endTime.getHours() + ":" + endTime.getMinutes();
    wrapperCopy.querySelector('.flight_info_cities').innerText = data.alternative_data.departure + " to " + data.alternative_data.destination;
    wrapperCopy.querySelector('.od-secondary-flight-info-time-stops-wrapper .odf-text-nowrap').innerText = hours + "h " + minutes;
    var priceElem = wrapperCopy.querySelector('.od-price-container .odf-text-2xl');
    priceElem.innerText = priceElem.innerText * 1.6;
    wrapperCopy.querySelector('.od-primary-info-airline img').remove();
    wrapperCopy.querySelector('.od-results-leg-descriptor').remove();
    wrapperCopy.querySelector('.od-resultpage-buttonbox').style.backgroundColor = "#00ce4e2a";
    wrapperCopy.querySelector('.od-resultpage-segment-itinerary-row').style.backgroundColor = "#00ce4e2a";
    wrapperCopy.querySelector('.odf-btn-primary').style.backgroundColor = "#00ce4e";
    wrapperCopy.querySelector('.odf-btn-primary').innerText = "Save "+Math.round(data.alternative_saving)+" kg of CO2";
    wrapperCopy.querySelector('.saving_message .odf-text-positive').innerHTML = "<span class=\"odf-icon odf-icon-tick\"></span> 85% less CO2";
    wrapperCopy.querySelector('.saving_message .odf-text-mono-color-04').innerText = " than with a flight!";

    wrapperCopy.querySelector('.odf-btn-primary').addEventListener("click", function (evnt) { triggerEcoPopup(data); });
}

function triggerEcoPopup(data) {

}