var productName = document.getElementById('productTitle').innerText;
chrome.runtime.sendMessage({ message: 'productName', name: productName }, callbackHook);

function callbackHook(data)
{
    var head= document.getElementsByTagName('head')[0];
    var script= document.createElement('script');
    script.type= 'text/javascript';
    script.src= 'clickHandlerAmazon.js';
    head.appendChild(script);

    if (!data.alternative_found) {
        var newEl = document.createElement('div');
        newEl.innerHTML = '<div style="color: red">nothing found</div>';
        document.getElementById('desktop_unifiedPrice').parentNode.insertBefore(newEl, document.getElementById('desktop_unifiedPrice'));
        return;
    }

    /*
    var newEl = document.createElement('div');
    newEl.style = `
        background-image: linear-gradient(to bottom, #063c39, #083734, #0a312f, #0b2c2a, #0c2725); 
        border-radius: 4px; margin: 10px 0px; 
      }`
    newEl.innerHTML = `<div style="padding: 10px; display: inline-block; display: grid; grid-template-columns: 1 9 9 9 9; grid-gap: 0px; grid-auto-columns: minmax(0px, auto);">
                            <img style="margin-top: 14px; grid-column: 1; opacity: 0.7; grid-row: 1 / 4; width: 40px; height: 40px;" src="https://i.imgsafe.org/ee/eeefe591ec.png">
                            
                            <div style="grid-column: 2 / 5; grid-row: 1; margin-bottom: 3px; color: #D9E0E0; opacity: 0.7;"><b><h3>ecoternative.at</h3></b></div>
                            <div style="grid-column: 2 / 5; grid-row: 2; color: white"><b><h4 style="font-size: 14px">${Math.round(data.alternative_data.distance)} meters, ${data.alternative_data.method.toLowerCase()} distance</h4></b></div>
                            <div style="margin-top: 6px; color: white; grid-column: 2 / 5; grid-row: 3;"><span style="color: #D9DEDE;">${data.alternative_data.vendor}, ${data.alternative_data.address}</span></div>  
                            
                            <button style="font-weight: bold; margin: 8px 0px; vertical-align: middle; font-size: 16px; grid-column: 5; grid-row: 1 / 5; border-radius: 50px; border-color: transparent; background-image: linear-gradient(to right, #00baae, #00c4b7, #00cebf, #00d8c8, #00e2d1); color: #083331;"><a href="${data.alternative_url}" style="color: #0A2D2B; vertical-align: middle;"><div style="display: inline-block;"><div><center>Save ${Math.round(data.alternative_saving * 1000)}g</center></div><div> CO<sub>2</sub> now!</div></div></a></button>
                        </div>`;
    newEl.classList = 'priceInfo';
    */

   var newEl = document.createElement('div');
   newEl.innerHTML = `<div style="margin-bottom: 10px;"><a href="https://google.com"><button onclick="amazonButtonClick()" style="background-color: #00ce4e; width: 100%; padding: 10px; border-radius: 3px; color: black;">Save ${Math.round(data.alternative_saving * 1000)} grams CO<sub>2</sub></button></a></div>`;

    if (document.getElementById('addToCart_feature_div') !== undefined)
    {
        document.getElementById('addToCart_feature_div').parentNode.insertBefore(newEl, document.getElementById('addToCart_feature_div'));
    }
    else if (document.getElementById('desktop_unifiedPrice') !== undefined)
    {
        document.getElementById('desktop_unifiedPrice').parentNode.insertBefore(newEl, document.getElementById('desktop_unifiedPrice'));
    }
}