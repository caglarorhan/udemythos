window.addEventListener('load', function () {
    totalLoad();
});

function totalLoad() {

    const controlsRange = document.querySelectorAll('.controls input[type="range"]');
    const controlsColor = document.querySelectorAll('.controls input[type="color"]');
    controlsRange.forEach(input => input.addEventListener('mousedown', sync, true));
    controlsRange.forEach(input => input.addEventListener('click', detector, true));
    controlsRange.forEach(input => input.addEventListener('mouseup', unsync, true));
    controlsColor.forEach(input => input.addEventListener('change', detector, true));


    document.getElementById('setPlayRate').addEventListener('click', function () {
        console.log('test ok');
        let targetPlayRate = document.querySelector('#currentPlayRate').value;
        let messageToContentSide = {
            action: "changePlayRate",
            value: targetPlayRate
        }

        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, messageToContentSide, function (response) {
                console.log('Mesaj yayinlandi')
            });
        });

    })


    document.getElementById('setPlayRate_x1').addEventListener('click', function () {
        let messageToContentSide = {
            action: "changePlayRate",
            value: 1
        }
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, messageToContentSide, function (response) {
                console.log('Mesaj yayinlandi')
            });
        });
    })


}


function sync(event) {
    let input = event.target;
    //console.log(`Syncing... Last value is ${input.value}`);
    input.addEventListener('mousemove', detector, true);
}


function detector(event) {
    let input = event.target;
    //console.log('sysnc done:'+ input.value);
    let sizing = input.dataset.sizing || '';
    document.documentElement.style.setProperty(`--${this.name}`, `${input.value}${sizing}`);
    //document.querySelector("video").playbackRate = input.value;
    document.querySelector('#currentPlayRate').value = input.value;

}


function unsync(event) {
    let input = event.target;
    //console.log(`Unsyncing... Last value is ${input.value}`);
    input.removeEventListener('mousemove', detector, true);

}
