

var timer_id = setInterval(checkReady, 50);

function checkReady()
{
    if (document.getElementById ("criteo-tags-div"))
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
    var newEl = document.createElement('div');
    newEl.style = `
        background-image: linear-gradient(to bottom, #063c39, #083734, #0a312f, #0b2c2a, #0c2725); 
        border-radius: 4px; margin: 10px 0px; 
      }`
    newEl.innerHTML = `<div style="padding: 10px; display: inline-block; display: grid; grid-template-columns: 1 9 9 9 9; grid-gap: 0px; grid-auto-columns: minmax(0px, auto);">
                            <img style="margin-top: 25px; margin-left: 20px; grid-column: 1; opacity: 0.7; grid-row: 1 / 4; width: 40px; height: 40px;" src="https://i.imgsafe.org/ee/eeefe591ec.png">
                            
                            <div style="grid-column: 2 / 5; grid-row: 1; margin-bottom: 3px; color: #D9E0E0; opacity: 0.7;"><b><h3>ecoternative.at</h3></b></div>
                            <div style="margin-top: 6px; grid-column: 2 / 5; grid-row: 2; color: white"><b><h4 style="font-size: 14px; font-weight: bold;">Estimated eco-friendly travel time is ${Math.floor(data.alternative_data.travel_time)} hours and ${Math.round(Math.round((data.alternative_data.travel_time - Math.floor(data.alternative_data.travel_time)) * 100) / 100 * 60)} minutes.</h4></b></div>
                            <div style="margin-top: 6px; color: white; grid-column: 2 / 5; grid-row: 3;"><span style="color: #D9DEDE; font-size: 14px;">Your destination will be ${data.alternative_data.destination} and you will go by tranist.</span></div>  
                            <div style="margin-top: 6px; color: white; grid-column: 2 / 5; grid-row: 4;"><span style="color: #D9DEDE; font-size: 14px;">The corrected flight time (incl. check-in / commute) is <i>${Math.floor(data.alternative_data.original_time + 2)} hours and ${Math.round(Math.round((data.alternative_data.original_time + 2 - Math.floor(data.alternative_data.original_time + 2)) * 100) / 100 * 60)} minutes</i>.</span></div>  

                            <button style="font-weight: bold; margin: 20px 0px; vertical-align: middle; font-size: 16px; grid-column: 5; grid-row: 1 / 6; border-radius: 50px; border-color: transparent; background-image: linear-gradient(to right, #00baae, #00c4b7, #00cebf, #00d8c8, #00e2d1); color: #083331;"><a href="${data.alternative_url}" style="color: #0A2D2B; vertical-align: middle;"><div style="display: inline-block;"><div><center>Save ${Math.round(data.alternative_saving)}kg</center></div><div> CO<sub>2</sub> now!</div></div></a></button>
                        </div>`;
    newEl.classList = 'priceInfo';
    if (document.getElementById('results-manager-options') !== undefined)
    {
        document.getElementById('results-manager-options').parentNode.insertBefore(newEl, document.getElementById('results-manager-options'));
    }
}