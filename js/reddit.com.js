//Content Script file for webpages in domain reddit.com

//Listening for process request
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

    //Checking if this is a process links request
    if (request.action === "process_links") {
        //Searching for all imgur links on current page
        var hrefStrings = [];
        jQuery("a[href*='imgur.com']").each(function(index, elem) {
            hrefStrings.push(jQuery(elem).attr("href"));
        });

        var outputArray = [];
        for (var i = 0; i < hrefStrings.length; i++) {
            if ((jQuery.inArray(hrefStrings[i], outputArray)) == -1) {
                outputArray.push(hrefStrings[i]);
            }
        }

        for( var i = 0; i < outputArray.length; i++) {
            //Sending a request to background script for opening new tab with found imgur url
            if (outputArray[i] !== null && outputArray[i].match(/http/gi) !== null) {
                chrome.runtime.sendMessage({
                    action: "createTab",
                    url: outputArray[i]
                });
            }
        }

    }
});