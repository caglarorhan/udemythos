console.log('content injecte edildi')

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action == "changePlayRate") {
        console.log(request.value)
        document.querySelector("video").playbackRate = request.value;
    }
})



