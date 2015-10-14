

window.addEventListener("load", loadPage);
document.getElementById("enabledButton").addEventListener("click", enabled);

chrome.runtime.sendMessage( {msg: "getDataWords"}, function(response) {
	if (response != null)
		document.getElementById('dataList').innerHTML = response;
});


function loadPage() {
	chrome.runtime.sendMessage( {msg: "getEnabled"}, function(resp) {
		changeStateButton(resp);
	});
}

function enabled() {
	chrome.runtime.sendMessage( {msg: "setEnabled"}, function(resp) {
		changeStateButton(resp);
	});
}

function changeStateButton(b) {
	var elem = document.getElementById("enabledButton");
		if (b) {
			elem.innerText = "Работаем";
			elem.className = "b1";
		} else {
			elem.innerText = "Неработаем";
			elem.className = "b0";
		}
}












