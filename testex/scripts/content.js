
try {
  
  ready(0);
  getEnabled( function(es) {
    enabledSearch = es;
    if (enabledSearch) {
      getWords( function(lw) {
        if (lw) {
          listWords = lw;
          searchInDocument(listWords, 'highlight3', 'highlight2', mouseEnterWord, mouseOutWord);
        }
      });
    }
  });
  
  
  
  
  
  //не используется
  function findParentNode(parentClass, childObj) {
    var testObj = childObj; //.parentNode;
    while(testObj) { //.getAttribute('class') != parentClass) {
      alert("1: " + testObj.getAttribute('class'));
      alert("2: " + testObj.parentNode.getAttribute('class'));
      if (!(testObj.getAttribute('class') != parentClass))
        return true;
      testObj = testObj.parentNode;
    }
    return false;
  }
  
	function collectionHas(a, b) {
		for (var i = 0; i < a.length; i++)
			if (a[i] == b)
				return true;
		return false;
	}

	function findParentBySelector(elm, selector) {
		var all = document.querySelectorAll(selector);
		var cur = elm;
		//alert($(cur).attr("class"));
		var s = "";
		while (cur) { // & !collectionHas(all, cur)) {
			if (collectionHas(all, cur))
				return true;
			cur = cur.parentNode;
			alert(cur + " : " + $(cur).attr("class"));
		}
		return false; //(cur == elm) ? null : cur;
	}

	function getTermThesaurusIDThesaurusesRelationship(_id) {
		if (_id)
			chrome.runtime.sendMessage( {msg: "getTermThesaurusIDThesaurusesRelationship", idw: _id, lv: 15, ln: 10}, function( response) {
				if (response != null) {
					refreshMainBoxThesaurusRelationshipThesauruses(response);
				}
			});
	}
	
} catch (ex) {"main code block: " + alert(ex);};










