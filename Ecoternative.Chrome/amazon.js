var productName = document.getElementById('productTitle').innerText;
chrome.runtime.sendMessage({ message: 'productName', name: productName }, callbackHook);

function callbackHook(data)
{
    var head= document.getElementsByTagName('head')[0];
    var script= document.createElement('script');
    script.type= 'text/javascript';
    script.src= 'clickHandlerAmazon.js';
    script.onreadystatechange= function () {
        alert('attach')
        if (this.readyState == 'complete') alert('scirpt redy!');
    }

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
   newEl.innerHTML = `<div style="margin-bottom: 10px;"><button id="ourSubmitActionButton" type="button" style="z-index: 100001; background-image: linear-gradient(to top, #00ce4e, #05d453, #0ada58, #0fe05e, #13e663); width: 100%; padding: 6px; border-radius: 3px; color: #111111; border-color: #858569"><div style="background-color: #2F3840; float: left; border-radius: 2px; padding: 3px; margin: -4px;"><img src="https://i.imgsafe.org/ff/ff38aa2900.png" width="18px"></div>Save ${Math.round(data.alternative_saving * 1000)} grams CO<sub>2</sub></button></div>`;

   if (document.getElementById('addToCart_feature_div'))
   {
       document.getElementById('addToCart_feature_div').parentNode.insertBefore(newEl, document.getElementById('addToCart_feature_div'));
   }
   else if (document.getElementById('add-to-cart-button-ubb'))
   {
       document.getElementById('add-to-cart-button-ubb').parentNode.parentNode.parentNode.prepend(newEl);
   }
   else if (document.getElementById('add-to-cart-button'))
   {
       document.getElementById('add-to-cart-button').parentNode.parentNode.prepend(newEl);
   }

   chrome.storage.sync.get(['lat', 'lng'], function(store) {
       createModal(data, store.lng, store.lat);
   });
}

function createModal(data, lng, lat) {
    
   var blender = document.createElement('div');
   blender.style.visibility = "hidden";
   blender.innerHTML = `<div style="position: fixed; z-index: 100000; background-color: rgba(0, 0, 0, 0.7); left: 0px; right: 0px; top: 0px; bottom: 0px;"></div>`;
   
   var head = document.getElementsByTagName('HEAD')[0];  
  
    // Create new link Element 
    var link = document.createElement('link'); 
  
    // set the attributes for link element  
    link.rel = 'stylesheet';  
      
    link.type = 'text/css'; 
      
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css';  
  
    // Append link element to HTML head 
    head.appendChild(link);  

    var modal = document.createElement('div');
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
                    */""}?markers=color:red%7Clabel:A%7C${lat},${lng}${/*
                    */""}&markers=color:blue%7Clabel:B%7C${data.alternative_data.lat},${data.alternative_data.lng}${/*
                    */""}&size=1000x800&zoom=15${/*
                    */""}&key=AIzaSyAiSBo9Ne2IEoMPpZsufKRypiq-iuCxspQ${/*
                    */""}&style=feature:landscape.natural.landcover%7Celement:geometry%7Ccolor:0xffffff${/*
                    */""}&style=feature:road%7Celement:geometry%7Ccolor:0x000000${/*
                    */""}&style=feature:road.local%7Celement:geometry%7Ccolor:0x505050${/*
                    */""}&style=feature:poi%7Celement:geometry%7Ccolor:0xB0B0B0${/*
                    */""}&style=feature:water%7Celement:geometry%7Ccolor:0x808080${/*
                    */""}&style=feature:landscape.man_made%7Cvisibility:off${/*
                    */""}&style=element:labels%7Cvisibility:off" />
                    <img style="position: absolute; bottom: 10px; left: 10px;" src="${data.alternative_data.vendor_logo}">
            </div>
            <div style="grid-column: 1; grid-row: 2;">
                <center style="font-size: 70px; margin-top: 25px; color: white; font-weight: 800;">${Math.round(data.alternative_saving * 1000)}</center>
                <center style="color: white; margin-top: 28px; font-weight: 100; font-size: 20px;">grams CO<sub>2</sub> saved</center>
                <div style="margin: 20px 30px;"><hr/></div>
                <div>
                    <center>
                        
                        <div style="color: white; font-size: 15px; font-weight: 500;"><b>alternative in ${(Math.round(data.alternative_data.distance / 10) * 10)} meters,</b></div>
                        <div style="color: white; font-size: 15px; font-weight: 500;"><b>within ${data.alternative_data.method.toLowerCase()} distance</b></div>

                    </center>
                </div>
            </div>
            <button id="closeButtonOurs" style="position: absolute; right: 0px; top: 0px; min-width: 40px; min-height: 40px; font-size: 16px; border-radius: 0px 0px 0px 10px; color: black; border-color: transparent; background-color: #eeeeee;">✕</button>
            <div style="grid-column: 1; grid-row: 4;">
                <a href="${data.alternative_url}"><button style="color: white; position: absolute; height: 40px; left: 50px; width: 200px; bottom: 20px;  border-radius: 20px; border-color: transparent; font-weight: 800; border-width: 0px; background-color: #0A2D2B;">Take me there!</button></a>
                
            </div>
        </div>`

    document.body.append(blender);
    document.body.append(modal);

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

    document.getElementById('closeButtonOurs').addEventListener("click", toggleModal);
    document.getElementById('ourSubmitActionButton').addEventListener("click", toggleModal);
}