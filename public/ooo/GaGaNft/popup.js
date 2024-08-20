(function () {
    var $ = function (id) {
        return document.getElementById(id);
    };
    var Tasks = {
        show: function (obj) {
            obj.className = '';
            return this;
        },
        hide: function (obj) {
            obj.className = 'hide';
            return this;
        },
        hello:function(text){
            let url = chrome.runtime.getURL
            alert(`hello ${url}`);
        },
        $deposit: $('deposit'),
        init: function () {
            Tasks.$deposit.addEventListener('click', function () {
                Tasks.hello('dfinity');
            }, true);
            $('send').addEventListener('click',()=>{
                Tasks.hello('send');
            },true)
        }
        
    }
    Tasks.init();
})();

// Initialize button with user's preferred color
let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackgroundColor,
  });
});

// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColor() {
  chrome.storage.sync.get("color", ({ color }) => {
    document.body.style.backgroundColor = color;
  });
}