//alert("hi");


var enabled = true,
	b = chrome.runtime && chrome.runtime.sendMessage ? "runtime" : "extension",
	conf,
	dataListWords,
	dataDescriptionWord,
	data,
	data2,
	xhrd = new XMLHttpRequest(),
	xhrw = new XMLHttpRequest(),
	xhrc = new XMLHttpRequest(),
	xhrData = new XMLHttpRequest(),
	xhrData2 = new XMLHttpRequest();


xhrc.onreadystatechange = function() {
	if (xhrc.readyState == 4 && xhrc.status == 200) {
		conf = JSON.parse(xhrc.responseText);
	}
}
	
xhrd.onreadystatechange = function() {
	if (xhrd.readyState == 4 && xhrd.status == 200) {
		dataListWords = JSON.parse(xhrd.responseText);
    }
}

xhrw.onreadystatechange = function() {
	if (xhrw.readyState == 4 && xhrw.status == 200) {
		dataDescriptionWord = xhrw.responseText;
    }
}

xhrData.onreadystatechange = function() {
	if (xhrData.readyState == 4 && xhrData.status == 200) {
		data = JSON.parse(xhrData.responseText);
    }
}

xhrData2.onreadystatechange = function() {
	if (xhrData2.readyState == 4 && xhrData2.status == 200) {
		data2 = xhrData2.responseText;
    }
}

GetConfig();
//GetDictionaryWords();
GetTerms();



chrome[b].onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.msg == "setEnabled")
        {
			enabled = !enabled;
			if (enabled)
				GetTerms();
				//GetDictionaryWords();
            sendResponse(enabled);
            return true;
        }
	}
);

chrome[b].onMessage.addListener(
	function(request, sender, sendResponse) {
        if (request.msg == "getDataWords")
        {
			try {
				sendResponse(JSON.stringify(parseDictionary(dataListWords)));
			} catch(ex) { alert(ex); }
            return true;
        }
    }
);

chrome[b].onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.msg == "getEnabled")
        {
            sendResponse( enabled);
            return true;
        }
	}
);

chrome[b].onMessage.addListener(
	function(request, sender, sendResponse) {
        if (request.msg == "getDataDescription")
        {
			try {
				dataDescriptionWord = '';
				xhrw.open("GET", conf.UrlService + conf.GetTemporaryTableWordDescription + request.idw, false);
				xhrw.send();
				sendResponse(dataDescriptionWord);
			} catch(ex) { alert(ex); }
            return true;
        }
    }
);

chrome[b].onMessage.addListener(
	function(request, sender, sendResponse) {
		try {
			data = '';
			if (request.msg == "getTerms")
			{
				xhrData.open("GET", conf.UrlService + conf.GetTerms + request.idw, false);
				xhrData.send();
				sendResponse(JSON.stringify(parseDictionary(data)));
				return true;
			}
			else if (request.msg == "getTermIDRubrics")
			{
				xhrData.open("GET", conf.UrlService + conf.GetTermIDRubricks + request.idw, false);
				xhrData.send();
				sendResponse(JSON.stringify(parseDictionary(data)));
				return true;
			}
      else if (request.msg == "getTermTextRubrics")
			{
				xhrData.open("GET", conf.UrlService + conf.GetTermTextRubricks + request.text, false);
				xhrData.send();
				sendResponse(JSON.stringify(parseDictionary(data)));
				return true;
			}
			else if (request.msg == "getRelatedRubricsChilds")
			{
				xhrData.open("GET", conf.UrlService + conf.GetRelatedRubricsChilds + request.idw, false);
				xhrData.send();
				sendResponse(JSON.stringify(parseDictionary(data)));
				return true;
			}
			else if (request.msg == "getRelatedRubricsParents")
			{
				xhrData.open("GET", conf.UrlService + conf.GetRelatedRubricsParents + request.idw, false);
				xhrData.send();
				sendResponse(JSON.stringify(parseDictionary(data)));
				return true;
			}
			else if (request.msg == "getAdditionalRubricInfo")
			{
				xhrData.open("GET", conf.UrlService + conf.GetAdditionalRubricInfo + request.idw, false);
				xhrData.send();
				sendResponse(JSON.stringify(parseDictionary(data)));
				return true;
			}
			else if (request.msg == "editAdditionalRubricInfoDescription")
			{
				xhrData.open("GET", conf.UrlService + conf.EditAdditionalRubricInfoDescription + request.idw + "&" + request.dta, false);
				xhrData.send();
				sendResponse(true);
				return true;
			}
			else if (request.msg == "editAdditionalRubricInfoSign")
			{
				xhrData.open("GET", conf.UrlService + conf.EditAdditionalRubricInfoSign + request.idw + "&" + request.dta, false);
				xhrData.send();
				sendResponse(true);
				return true;
			}
			else if (request.msg == "editAdditionalRubricInfoDocuments")
			{
				xhrData.open("GET", conf.UrlService + conf.EditAdditionalRubricInfoDocuments + request.idw + "&" + request.dta, false);
				xhrData.send();
				sendResponse(true);
				return true;
			}
			else if (request.msg == "editAdditionalRubricInfoTerms")
			{
				xhrData.open("GET", conf.UrlService + conf.EditAdditionalRubricInfoTerms + request.idw + "&" + request.dta, false);
				xhrData.send();
				GetTerms();
				sendResponse(true);
				return true;
			}
			else if (request.msg == "getTermIDThesauruses")
			{
				xhrData2.open("GET", conf.UrlService + conf.GetTTermTThesaurusListById + request.idw + "&" + request.ft, false);
				xhrData2.send();
				sendResponse(data2);
				return true;
			}
      else if (request.msg == "getTermTextThesauruses")
			{
				xhrData2.open("GET", conf.UrlService + conf.GetTTermTThesaurusListByText + request.text + "&" + request.ft, false);
				xhrData2.send();
				sendResponse(data2);
				return true;
			}
			else if (request.msg == "getTTermTThesaurusNormalById")
				{
				xhrData2.open("GET", conf.UrlService + conf.GetTTermTThesaurusNormalById + request.idw + "&" + request.lv + "&" + request.ln, false);
				xhrData2.send();
				sendResponse(data2);
				return true;
			}
		}
		catch(ex) { alert(ex); }
    }
);

function GetConfig() {
	xhrc.open("GET", chrome.extension.getURL('/config.json'), false);
	xhrc.send();
}

function GetDictionaryWords() {
	xhrd.open("GET", conf.UrlService + conf.GetAllTemporaryWords + conf.ID, false);
	xhrd.send();
}

function GetTerms() {
	xhrData.open("GET", conf.UrlService + conf.GetTerms + conf.ID, false);
	xhrData.send();
	dataListWords = data;
}

function parseDictionary(dic) {
	var dat = {};
	for (var i = 0; i < dic.length; i++) {
		dat[dic[i].Key] = dic[i].Value;
	}
	return dat;
}



