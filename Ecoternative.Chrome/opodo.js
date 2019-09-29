
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
    setupEcoPopup(data);
}

var blender;
var modal;
function toggleModal()
{
    if (modal.style.visibility == 'hidden')
    {
        modal.style.visibility = 'visible';
        blender.style.visibility = 'visible';
    }
    else
    {
        modal.style.visibility = 'hidden';
        blender.style.visibility = 'hidden';
    }
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
    wrapperCopy.querySelector('.od-secondary-flight-info-time-stops-wrapper .odf-text-nowrap').innerText = hours + "h " + minutes + "'";
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

    var logo = document.createElement('img');
    logo.src = "https://i.imgsafe.org/ff/ff38aa2900.png";
    logo.style.height = "30px";
    logo.style.float = "right";
    logo.style.marginRight = "18px";
    wrapperCopy.querySelector('.od-resultpage-highlighted-title').append(logo);

    wrapperCopy.querySelector('.odf-btn-primary').setAttribute('data-search-id', '');
    wrapperCopy.querySelector('.odf-btn-primary').classList.remove('book_btn');
    wrapperCopy.querySelector('.odf-btn-primary').addEventListener("click", toggleModal);
}

function setupEcoPopup(data) {

    blender = document.createElement('div');
    blender.style.visibility = "hidden";
    blender.innerHTML = `<div style="position: fixed; z-index: 100000; background-color: rgba(0, 0, 0, 0.7); left: 0px; right: 0px; top: 0px; bottom: 0px;"></div>`;
    
    modal = document.createElement('div');
    modal.style.visibility = "hidden";
    modal.innerHTML = `<div style="-webkit-box-shadow: 0px 0px 35px -2px rgba(0,0,0,0.31);
    -moz-box-shadow: 0px 0px 35px -2px rgba(0,0,0,0.31);
    box-shadow: 0px 0px 35px -2px rgba(0,0,0,0.31);
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 0px;
    grid-auto-rows: minmax(100px, auto); overflow: hidden; border-radius: 10px; background-color: white; position: fixed; z-index: 100001; left: 20%; right: 20%; top: 20%; bottom: 20%; width: 60%; height: 60%;">
            
            <div style="grid-column: 1; grid-row: 1 / 5;  text-align: center; height: 100%; width: 300px; background-color: #00ce4e; color: white; font-size: 18px; font-weight: 500; font-family: Ubuntu, Arial; padding: 16px 16px;">
                <img style="display: block; margin-top: 0px; margin-left: auto; margin-right: auto; width: 60%;" src="https://i.imgsafe.org/fe/fee8d8ed4f.png">
            </div>
            <div style="grid-column: 2 / 4; position: relative; grid-row: 1 / 5; color: black; background-color: black; padding: 0px; font-size: 18px; font-weight: 500; font-family: Ubuntu, Arial;">
                <img style="object-fit: cover; width: 100%; height: 100%; opacity: 0.9; padding: 0px; margin: 0px;" src="
                    https://maps.googleapis.com/maps/api/staticmap${/*
                    */""}?markers=color:red%7Clabel:A%7C${data.alternative_data.departure}${/*
                    */""}&markers=color:blue%7Clabel:B%7C${data.alternative_data.destination}${/*
                    */""}&size=1000x800${/*
                    */""}&key=AIzaSyAiSBo9Ne2IEoMPpZsufKRypiq-iuCxspQ${/*
                    */""}&style=feature:landscape.natural.landcover%7Celement:geometry%7Ccolor:0xffffff${/*
                    */""}&style=feature:road%7Celement:geometry%7Ccolor:0x000000${/*
                    */""}&style=feature:road.local%7Celement:geometry%7Cvisibility:off${/*
                    */""}&style=feature:poi%7Celement:geometry%7Ccolor:0xB0B0B0${/*
                    */""}&style=feature:water%7Celement:geometry%7Ccolor:0x808080${/*
                    */""}&style=feature:landscape.man_made%7Cvisibility:off${/*
                    */""}&style=element:labels%7Cvisibility:off" />
            </div>
            <div style="grid-column: 1; grid-row: 2;">
                <center style="font-size: 70px; margin-top: 25px; color: white; font-weight: 800;">${Math.round(data.alternative_saving)},000</center>
                <center style="color: white; margin-top: 28px; font-weight: 100; font-size: 20px;">grams CO<sub>2</sub> saved</center>
                <div style="margin: 20px 30px;"><hr/></div>
                <div>
                    <center>
                        <div style="color: white; font-size: 15px; font-weight: 500;">
                            Total time for flight: <b>${(Math.round(data.alternative_data.original_time * 10) / 10)} hours</b><br />
                            Total time for transit: <b>${(Math.round(data.alternative_data.travel_time * 10) / 10)} hours</b>
                        </div>
                    </center>
                </div>
            </div>
            <button id="closeButtonOurs" style="position: absolute; right: 0px; top: 0px; min-width: 40px; min-height: 40px; font-size: 16px; border-radius: 0px 0px 0px 10px; color: black; border-color: transparent; background-color: #eeeeee;">✕</button>
            <div style="grid-column: 1; grid-row: 4;">
                <a href="${data.alternative_url}"><button style="color: white; position: absolute; height: 40px; left: 50px; width: 200px; bottom: 20px;  border-radius: 20px; border-color: transparent; font-weight: 800; border-width: 0px; background-color: #0A2D2B;">Take me there!</button></a>
                
            </div>
        </div>`;
        
    document.body.append(blender);
    document.body.append(modal);
    document.getElementById('closeButtonOurs').addEventListener("click", toggleModal);
}