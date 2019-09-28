const ECOSHOPPING_IDENTIFIER = 'ecoshoppingEnabled'
const ECOTRAVEL_IDENTIFIER = 'ecotravelEnabled'
const ECOMETER_IDENTIFIER = 'ecometerEnabled'

$('#ecoshopping').change(function() {
    setEcoshoppingEnabled(this.checked);
});

$('#ecotravel').change(function() {
    setEcotravelEnabled(this.checked);
});

$('#ecometer').change(function() {
    setEcometerEnabled(this.checked);
});

function setEcoshoppingEnabled(ecoshoppingEnabled) {
    chrome.storage.sync.set({ecoshoppingEnabled: ecoshoppingEnabled}, function() {
        $("#ecoshopping").prop('checked', ecoshoppingEnabled);
    });
}

function setEcotravelEnabled(ecotravelEnabled) {
    chrome.storage.sync.set({ecotravelEnabled: ecotravelEnabled}, function() {
        $("#ecotravel").prop('checked', ecotravelEnabled);
    });
}

function setEcometerEnabled(ecometerEnabled) {
    chrome.storage.sync.set({ecometerEnabled: ecometerEnabled}, function() {
        $("#ecometer").prop('checked', ecometerEnabled);
        window.setTimeout(function() {
            $("#spinner").prop('hidden', true);
            $("#contentcontainer").css('opacity', '1.0');
        }, 220);
    });
}

$(document).ready(function() {
    chrome.storage.sync.get([ECOSHOPPING_IDENTIFIER], function(result) {
        if (result[ECOSHOPPING_IDENTIFIER] === 'undefined')
        {
            setEcoshoppingEnabled(false);
        }
        else
        {
            setEcoshoppingEnabled(result[ECOSHOPPING_IDENTIFIER]);
        }
    });

    chrome.storage.sync.get([ECOTRAVEL_IDENTIFIER], function(result) {
        if (result[ECOTRAVEL_IDENTIFIER] === 'undefined')
        {
            setEcotravelEnabled(false);
        }
        else
        {
            setEcotravelEnabled(result[ECOTRAVEL_IDENTIFIER]);
        }
    });

    chrome.storage.sync.get([ECOMETER_IDENTIFIER], function(result) {
        if (result[ECOMETER_IDENTIFIER] === 'undefined')
        {
            setEcometerEnabled(false);
        }
        else
        {
            setEcometerEnabled(result[ECOMETER_IDENTIFIER]);
            
        }
    });
});

chrome.storage.onChanged.addListener(function(changes, namespace) {
});




