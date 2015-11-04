
function ready(i) {
  if (document != null && document.body) {
    createArrowDiv(mouseClickArrow);
    createArrowSelectDiv(mouseClickArrowSelect);
    createMainDiv();
    document.addEventListener("click", mouseClick, false);
    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("selectionchange", selectionChange, false);
    document.addEventListener("mouseup", mouseUp, false);
    //chrome.contextMenus.create( { title: "Посмотреть определения", contexts:["selection"], onclick: onClickContextMenu });
    chrome[chrome.runtime && chrome.runtime.sendMessage ? "runtime" : "extension"].onMessage.addListener(
      function(request, sender, sendResponse) {
        if (request.msg == "cbContextMenu")
        {
        try {
          onClickContextMenu(request.txt);
          sendResponse(true);
        } catch(ex) { alert(ex); }
            return true;
        }
      }
    );
  }
  else if (i < 10)
    setTimeout(ready, 1, i+1)
}

function searchInDocument(wrds, hl1, hl2, mew, mow) {
  
  hlWords(JSON.parse(wrds), hl1, hl2);
  $.each(document.getElementsByName("hiliwo"), function() {
    this.addEventListener("mouseenter", mew, false);
    this.addEventListener("mouseleave", mow, false);
  });
}

function hlWords(arr, hl, hl2){
  if ($(document).length > 0)
    return $(document).each(function() { htmlreplace($(document), arr, hl); });
  if ($(document).prevObject.length > 0)
    return $(document).prevObject.each(function() { htmlreplace($(document), arr, hl2); });
};

function htmlreplace(element, arr, hl){
  if (!element)
    element = document.body;
  var wrap = $(element).contents().each(function () {
    if (this.nodeType === 3) {
      var result = $(this).text();
      var arrEls = [];
      $.each(arr, function(key, value) {
        result = result.replace(new RegExp(value,'gi'),'<span name="hiliwo" id="' + key + '" class="' + hl + '">$&</span>');
      })
      $(this).after(result).remove();
    } else {
      htmlreplace(this, arr, hl);
    };
  });
};

function hideAll() {

  mainDiv.style.display = 'none';
  mainDiv.style.left = '-100px';
  mainDiv.style.top = '-100px';
  arrayUndo = [function() { alert("private")} ];
}

function mouseClick(e) {
  //if (!$(e.target).is( ".mainArrowBox,.arrowBoxBackground,.arrowBox,.mainMenuBox,.mainMenuBoxBackground,.menuBox,.menuBoxTitle,.menuBoxButtons,.menuBoxDescription,.menuBoxSign,.menuBoxDocuments,.menuBoxTerms,.menuBoxButtonsRubric,.menuBoxButtonsParent,.menuBoxButtonsChild,.butEdit" ))
  //	hideAll();
  //if (!findParentBySelector(e.target, "div.mainArrowBox, div.mainMenuBox"))
    //hideAll();
  //if (!$(e.target).parents('.mainMenuBox'))
  //  hideAll();
  //if (!findParentNode('mainDiv', e.target))
    //hideAll();
  if (!$(e.target).is(classesNames))
    hideAll();
}

function mouseEnterWord(e) {
  clearTimeout($(arrowDiv).data('timeoutId'));
  arrowDiv.style.display = 'block';
  var r = e.target.getClientRects();
  arrowDiv.style.left = document.body.scrollLeft + r[r.length - 1].right + 'px';
  arrowDiv.style.top = document.body.scrollTop + r[r.length - 1].top + 'px';
  arrowDiv.childNodes[0].style.height = r[r.length - 1].height + 'px';
  arrowDiv.id = e.target.id;
}

function mouseOutWord(e) {
  timeoutId = setTimeout( function() {
    arrowDiv.style.display = 'none';
    arrowDiv.style.left = '-100px';
    arrowDiv.style.top = '-100px';
    arrowDiv.id = null;
  }, 2000);
  $(arrowDiv).data('timeoutId', timeoutId);
}

function mouseClickArrow(e) {
  
  var r = e.target.getClientRects();
  refreshMainBoxVote(arrowDiv.id);
  mainDiv.style.display = 'block';
  var px = document.body.scrollLeft + r[r.length - 1].right;
  var py = document.body.scrollTop + r[r.length - 1].top;
  var mx = mainDiv.scrollWidth;
  var my = mainDiv.scrollHeight;
  
  mainDiv.style.left = ((document.body.clientWidth - r[r.length - 1].right - mx) < 10 ? (px - mx) : px) + "px";
  mainDiv.style.top = ((document.body.clientHeight - r[r.length - 1].top - my) < 10 ? (py - my) : py) + 'px';
}

function mouseClickArrowSelect(e) {
  
  var r = e.target.getClientRects();
  refreshMainBoxVote(null, false, textSelected);
  mainDiv.style.display = 'block';
  var px = document.body.scrollLeft + e.clientX; // document.body.scrollLeft + r[r.length - 1].right;
  var py = document.body.scrollTop + e.clientY; // document.body.scrollTop + r[r.length - 1].top;
  var mx = mainDiv.scrollWidth;
  var my = mainDiv.scrollHeight;
  
  mainDiv.style.left = ((document.body.clientWidth - e.clientX - mx) < 10 ? (px - mx) : px) + "px";
  mainDiv.style.top = ((document.body.clientHeight - e.clientY - my) < 10 ? (py - my) : py) + 'px';
}

function undoAdd(f) {
  
  arrayUndo[arrayUndo.length] = f;
}

function undoUse() {
  
  arrayUndo[arrayUndo.length - 2]();
  arrayUndo.pop();
}

function mouseMovePosition(e) {
  if (window.event) {
    var docs = [ document.body.scrollLeft, document.body.scrollTop];
    if (!document.body.scrollTop)
      docs = [ document.documentElement.scrollLeft, document.documentElement.scrollTop];
    
    return [e.clientX + docs[0],e.clientY + docs[1]];
  }
  
  return [e.pageX, e.pageY];
}

function mouseMove(e) {
  
  if (enabledMove) {
    e = e || window.event;
    var m = mouseMovePosition(e);
    
    mainDiv.style.left = (m[0] - moveDivX) + "px";
    mainDiv.style.top = (m[1] - moveDivY) + "px";
  }
}

function selectionChange(e) {
  //alert('privet');
}

function mouseUp(e) {
  if ($(e.target).is('.mainArrowSelectBox,.mainArrowSelectBoxBackground,.arrowSelectBox'))
    return;
  textSelected = window.getSelection();
  if (textSelected.toString().length > 1)
  {
    var d = getRangeFromSelection(textSelected);
    var b = getPointFromRange(d);
    textSelected = textSelected.toString();
    arrowSelectDiv.style.display = 'block';
    arrowSelectDiv.style.left = document.body.scrollLeft +  b.left + 'px'; //document.body.scrollLeft + oRect.right + 'px';
    arrowSelectDiv.style.top = document.body.scrollTop + b.top + 'px'; // document.body.scrollTop + oRect.top + 'px';
    arrowSelectDiv.childNodes[0].style.height = b.height + 'px'; // oRect.height + 'px';
    arrowSelectDiv.id = e.target.id;
  }
  else {
    arrowSelectDiv.style.display = 'none';
    arrowSelectDiv.style.left = '-100px';
    arrowSelectDiv.style.top = '-100px';
    textSelected = '';
  }
}

function onClickContextMenu(text) {
  textSelected = window.getSelection();
  if (textSelected.toString().length > 1)
  {
    refreshMainBoxVote(null, false, textSelected.toString());
    mainDiv.style.display = 'block';
    var px = document.body.scrollLeft + document.body.offsetWidth / 2; // + e.clientX; // document.body.scrollLeft + r[r.length - 1].right;
    var py = document.body.scrollTop + document.body.offsetHeight / 2; // + e.clientY; // document.body.scrollTop + r[r.length - 1].top;
    
    mainDiv.style.left = px + "px";
    mainDiv.style.top = py + 'px';
  }
}

function refreshMainBoxVote(_id, b, text) {
	
	try {
		createVoteMainMenuDiv(_id, text);
    
    if (!b)
      undoAdd(function() { refreshMainBoxVote(_id, true, text); });
	
	} catch (ex) { alert("refreshMainBoxVote(_id): " + ex); };
}

function refreshMainBoxRubricatorFirst(_id, b, text) {
	
	try {
		createRubricatorMenuDiv();
    if (_id != null)
      getTermIDRubrics(_id, refreshMainBoxRubricatorSecond);
    else if (text)
      getTermTextRubrics(text, refreshMainBoxRubricatorSecond);
    
    if (!b)
      undoAdd(function() { refreshMainBoxRubricatorFirst(_id, true, text); });
		
	} catch (ex) { alert("refreshMainBoxRubricatorFirst(_id)" + ex); };
}

function refreshMainBoxThesaurusFirst(_id, b, text) {
	
	try {
		createThesaurusMenuDiv();
    if (_id != null)
      getTermIDThesauruses(_id, refreshMainBoxThesaurusSecond);
    else if (text)
      getTermTextThesauruses(text, refreshMainBoxThesaurusSecond);
    
    if (!b)
      undoAdd(function() { refreshMainBoxThesaurusFirst(_id, true, text); });
		
	} catch (ex) { alert("refreshMainBoxThesaurusFirst(_id)" + ex); };
}

function refreshMainBoxGlossaryFirst(_id, b, text) {
	
	try {
		createGlossaryMenuDiv();
		if (text)
      getGTermGGlossaryListByText(text, refreshMainBoxGlossarySecond);
    
    if (!b)
      undoAdd(function() { refreshMainBoxGlossaryFirst(_id, true, text); });
    
	} catch (ex) { alert("refreshMainBoxGlossaryFirst(_id)" + ex); };
}

function refreshMainBoxGlossarySecond(arr) {
	
	try {
    var menuGlossaryBoxButtonsElement = $(mainDiv).find('#testexMenuGlossaryBoxButtons')[0];
    while(menuGlossaryBoxButtonsElement.hasChildNodes()) {
			menuGlossaryBoxButtonsElement.removeChild(menuGlossaryBoxButtonsElement.lastChild);
		}
    var menuGlossaryBoxDescriptionElement = $(mainDiv).find('#testexMenuGlossaryBoxDescription')[0];
    menuGlossaryBoxDescriptionElement.innerHTML = '';
    menuGlossaryBoxDescriptionElement.style.display = 'none';
		
		$.each(JSON.parse(arr), function(key, value) {
			var but = document.createElement('a');
			menuGlossaryBoxButtonsElement.appendChild(but);
			but.className = 'menuGlossaryBoxButtons';
			but.text = value.GTerm + " (" + value.GGlossary + ")";
			but.onclick = function(e) {
				refreshMainBoxGlossaryDescription(value.ID);
			};
		});
		
	} catch (ex) {alert("refreshMainBoxGlossarySecond(arr): " + ex);};
}

function refreshMainBoxGlossaryDescription(_id, b) {
  
	try {
		var menuGlossaryBoxButtonsElement = $(mainDiv).find('#testexMenuGlossaryBoxButtons')[0];
    while(menuGlossaryBoxButtonsElement.hasChildNodes()) {
			menuGlossaryBoxButtonsElement.removeChild(menuGlossaryBoxButtonsElement.lastChild);
		}
    var menuGlossaryBoxDescriptionElement = $(mainDiv).find('#testexMenuGlossaryBoxDescription')[0];
    menuGlossaryBoxDescriptionElement.innerHTML = '';
		
		getGTermGGlossaryDescriptionByID(_id, refreshMainBoxGlossaryDescriptionText);
    
    if (!b)
      undoAdd(function() { refreshMainBoxGlossaryDescription(_id, true); });
    
	} catch (ex) { alert("refreshMainBoxGlossaryDescription(_id): " + ex); }
}

function refreshMainBoxGlossaryDescriptionText(arr) {
	
	try {
		var menuGlossaryBoxButtonsElement = $(mainDiv).find('#testexMenuGlossaryBoxButtons')[0];
    while(menuGlossaryBoxButtonsElement.hasChildNodes()) {
			menuGlossaryBoxButtonsElement.removeChild(menuGlossaryBoxButtonsElement.lastChild);
		}
    var menuGlossaryBoxDescriptionElement = $(mainDiv).find('#testexMenuGlossaryBoxDescription')[0];
    menuGlossaryBoxDescriptionElement.innerHTML = '';
    menuGlossaryBoxDescriptionElement.style.display = 'block';
		
		if (arr)
		{
      var val = JSON.parse(arr);
			menuGlossaryBoxDescriptionElement.innerHTML = val.Description;
    }
		
	} catch (ex) { alert("refreshMainBoxGlossaryDescriptionText: " + ex); };
}


function refreshMainBoxRubricatorSecond(arr) {
	
	try {
    var menuRubricatorBoxButtonsRubricElement = $(mainDiv).find('#testexMenuRubricatorBoxButtonsRubric')[0];
		while(menuRubricatorBoxButtonsRubricElement.hasChildNodes()) {
			menuRubricatorBoxButtonsRubricElement.removeChild(menuRubricatorBoxButtonsRubricElement.lastChild);
		}
		var menuRubricatorBoxButtonsParentElement = $(mainDiv).find('#testexMenuRubricatorBoxButtonsParent')[0];
		while(menuRubricatorBoxButtonsParentElement.hasChildNodes()) {
			menuRubricatorBoxButtonsParentElement.removeChild(menuRubricatorBoxButtonsParentElement.lastChild);
		}
    var menuRubricatorBoxButtonsChildElement = $(mainDiv).find('#testexMenuRubricatorBoxButtonsChild')[0];
		while(menuRubricatorBoxButtonsChildElement.hasChildNodes()) {
			menuRubricatorBoxButtonsChildElement.removeChild(menuRubricatorBoxButtonsChildElement.lastChild);
		}
    
		
		var menuRubricatorBoxTitleCurrentElement = $(mainDiv).find('#testexMenuRubricatorBoxTitleCurrent')[0];
		var menuRubricatorBoxDescriptionElement = $(mainDiv).find('#testexMenuRubricatorBoxDescription')[0];
		var menuRubricatorBoxDescriptionEditElement = $(mainDiv).find('#testexMenuBoxDescriptionEdit')[0];
		var menuRubricatorBoxDescriptionTextElement = $(mainDiv).find('#testexMenuBoxDescriptionText')[0];
		var menuRubricatorBoxSignElement = $(mainDiv).find('#testexMenuRubricatorBoxSign')[0];
		var menuRubricatorBoxSignEditElement = $(mainDiv).find('#testexMenuRubricatorBoxSignEdit')[0];
		var menuRubricatorBoxSignTextElement = $(mainDiv).find('#testexMenuRubricatorBoxSignText')[0];
		var menuRubricatorBoxDocumentsElement = $(mainDiv).find('#testexMenuRubricatorBoxDocuments')[0];
		var menuRubricatorBoxDocumentsEditElement = $(mainDiv).find('#testexMenuRubricatorBoxDocumentsEdit')[0];
		var menuRubricatorBoxDocumentsTextElement = $(mainDiv).find('#testexMenuRubricatorBoxDocumentsnText')[0];
		var menuRubricatorBoxTermsElement = $(mainDiv).find('#testexMenuRubricatorBoxTerms')[0];
		var menuRubricatorBoxTermsEditElement = $(mainDiv).find('#testexMenuRubricatorBoxTermsEdit')[0];
		var menuRubricatorBoxTermsTextElement = $(mainDiv).find('#testexMenuRubricatorBoxTermsText')[0];
	
		$.each(JSON.parse(arr), function(key, value) {
			var but = document.createElement('a');
			menuRubricatorBoxButtonsRubricElement.appendChild(but);
			but.className = 'menuRubricatorBoxButtonsRubric';
			but.text = value;
			but.onclick = function(e) {
				refreshMainBoxRubricatorRelationshipRubrics(key);
			};
		});

		menuRubricatorBoxDescriptionEditElement.onclick = null;
		menuRubricatorBoxSignEditElement.onclick = null;
		menuRubricatorBoxDocumentsEditElement.onclick = null;
		menuRubricatorBoxTermsEditElement.onclick = null;

		menuRubricatorBoxTitleCurrentElement.style.display = 'none';
		menuRubricatorBoxDescriptionElement.style.display = 'none';
		menuRubricatorBoxSignElement.style.display = 'none';
		menuRubricatorBoxDocumentsElement.style.display = 'none';
		menuRubricatorBoxTermsElement.style.display = 'none';
	} catch (ex) {alert("refreshMainBoxRubricatorSecond(arr): " + ex);};
}

function refreshMainBoxRubricatorRelationshipRubrics(_id, b) {
  
	try {
		var menuRubricatorBoxButtonsRubricElement = $(mainDiv).find('#testexMenuRubricatorBoxButtonsRubric')[0];
		while(menuRubricatorBoxButtonsRubricElement.hasChildNodes()) {
			menuRubricatorBoxButtonsRubricElement.removeChild(menuRubricatorBoxButtonsRubricElement.lastChild);
		}
		var menuRubricatorBoxButtonsParentElement = $(mainDiv).find('#testexMenuRubricatorBoxButtonsParent')[0];
		while(menuRubricatorBoxButtonsParentElement.hasChildNodes()) {
			menuRubricatorBoxButtonsParentElement.removeChild(menuRubricatorBoxButtonsParentElement.lastChild);
		}
    var menuRubricatorBoxButtonsChildElement = $(mainDiv).find('#testexMenuRubricatorBoxButtonsChild')[0];
		while(menuRubricatorBoxButtonsChildElement.hasChildNodes()) {
			menuRubricatorBoxButtonsChildElement.removeChild(menuRubricatorBoxButtonsChildElement.lastChild);
		}
		
		getRelatedRubricsParents(_id, refreshMainBoxRubricatorRelationshipRubricsParents);
		getRelatedRubricsChilds(_id, refreshMainBoxRubricatorRelationshipRubricsChilds);
		getAdditionalRubricInfo(_id, refreshMainBoxRubricatorRelationshipRubricsInfo);
    
    if (!b)
      undoAdd(function() { refreshMainBoxRubricatorRelationshipRubrics(_id, true); });
    
	} catch (ex) { alert("refreshMainBoxRubricatorRelationshipRubrics(_id): " + ex); }
}

function refreshMainBoxRubricatorRelationshipRubricsParents(arr) {
	
	try {
		var menuRubricatorBoxButtonsParentElement = $(mainDiv).find('#testexMenuRubricatorBoxButtonsParent')[0];
    
		if (arr)
			$.each(JSON.parse(arr), function(key, value) {
				var but = document.createElement('a');
				menuRubricatorBoxButtonsParentElement.appendChild(but);
				but.className = 'menuRubricatorBoxButtonsParent';
				but.text = value;
				but.onclick = function(e) {
					refreshMainBoxRubricatorRelationshipRubrics(key);
				};
			});
	} catch (ex) {alert("refreshMainBoxRubricatorRelationshipRubricsParents(arr): " + ex);};
}

function refreshMainBoxRubricatorRelationshipRubricsChilds(arr) {
	
	try {
		var menuRubricatorBoxButtonsChildElement = $(mainDiv).find('#testexMenuRubricatorBoxButtonsChild')[0];
    
		if (arr)
			$.each(JSON.parse(arr), function(key, value) {
				var but = document.createElement('a');
				menuRubricatorBoxButtonsChildElement.appendChild(but);
				but.className = 'menuRubricatorBoxButtonsChild';
				but.text = value;
				but.onclick = function(e) {
					refreshMainBoxRubricatorRelationshipRubrics(key);
				};
			});
	} catch (ex) {alert("refreshMainBoxRubricatorRelationshipRubricsChilds(arr): " + ex);};
}

function refreshMainBoxRubricatorRelationshipRubricsInfo(arr) {
	
	try {
		var menuRubricatorBoxTitleCurrentElement = $(mainDiv).find('#testexMenuRubricatorBoxTitleCurrent')[0];
		var menuRubricatorBoxDescriptionElement = $(mainDiv).find('#testexMenuRubricatorBoxDescription')[0];
		var menuRubricatorBoxDescriptionEditElement = $(mainDiv).find('#testexMenuBoxDescriptionEdit')[0];
		var menuRubricatorBoxDescriptionTextElement = $(mainDiv).find('#testexMenuBoxDescriptionText')[0];
		var menuRubricatorBoxSignElement = $(mainDiv).find('#testexMenuRubricatorBoxSign')[0];
		var menuRubricatorBoxSignEditElement = $(mainDiv).find('#testexMenuRubricatorBoxSignEdit')[0];
		var menuRubricatorBoxSignTextElement = $(mainDiv).find('#testexMenuRubricatorBoxSignText')[0];
		var menuRubricatorBoxDocumentsElement = $(mainDiv).find('#testexMenuRubricatorBoxDocuments')[0];
		var menuRubricatorBoxDocumentsEditElement = $(mainDiv).find('#testexMenuRubricatorBoxDocumentsEdit')[0];
		var menuRubricatorBoxDocumentsTextElement = $(mainDiv).find('#testexMenuRubricatorBoxDocumentsText')[0];
		var menuRubricatorBoxTermsElement = $(mainDiv).find('#testexMenuRubricatorBoxTerms')[0];
		var menuRubricatorBoxTermsEditElement = $(mainDiv).find('#testexMenuRubricatorBoxTermsEdit')[0];
		var menuRubricatorBoxTermsTextElement = $(mainDiv).find('#testexMenuRubricatorBoxTermsText')[0];
		
		menuRubricatorBoxTitleCurrentElement.style.display = 'block';
		menuRubricatorBoxDescriptionElement.style.display = 'block';
		menuRubricatorBoxSignElement.style.display = 'block';
		menuRubricatorBoxDocumentsElement.style.display = 'block';
		menuRubricatorBoxTermsElement.style.display = 'block';
		
		if (arr)
		{
		    menuRubricatorBoxDescriptionEditElement.onclick = function (e) {
				var val = prompt("Please enter description", arr["description"]);
				if (val)
					editAdditionalRubricInfoDescription(arr["id"], val, function() { refreshMainBoxRubricatorRelationshipRubrics(arr["id"])} );
			};
			menuRubricatorBoxSignEditElement.onclick = function(e) {
				var val = prompt("Please enter sign", arr["sign"]);
				if (val)
					editAdditionalRubricInfoSign(arr["id"], val, function() { refreshMainBoxRubricatorRelationshipRubrics(arr["id"])} );
			};
			menuRubricatorBoxDocumentsEditElement.onclick = function(e) {
				var val = prompt("Please enter new document", "");
				if (val)
					editAdditionalRubricInfoDocuments(arr["id"], val, function() { refreshMainBoxRubricatorRelationshipRubrics(arr["id"])} );
			};
			menuRubricatorBoxTermsEditElement.onclick = function(e) {
				var val = prompt("Please enter new term", "");
				if (val)
					editAdditionalRubricInfoTerms(arr["id"], val, function() { refreshMainBoxRubricatorRelationshipRubrics(arr["id"])} );
			};
		
			menuRubricatorBoxTitleCurrentElement.innerHTML = arr["name"];
			menuRubricatorBoxDescriptionTextElement.innerHTML = arr["description"];
			menuRubricatorBoxSignTextElement.innerHTML = arr["sign"];
			menuRubricatorBoxDocumentsTextElement.innerHTML = arr["docs"];
			menuRubricatorBoxTermsTextElement.innerHTML = arr["terms"];
		}
		
	} catch (ex) { alert("refreshMainBoxRubricatorRelationshipRubricsInfo(arr): " + ex); };
}

function refreshMainBoxThesaurusSecond(arr) {
	
	try {
    var menuThesaurusBoxButtonsElement = $(mainDiv).find('#testexMenuThesaurusBoxButtons')[0];
    while(menuThesaurusBoxButtonsElement.hasChildNodes()) {
			menuThesaurusBoxButtonsElement.removeChild(menuThesaurusBoxButtonsElement.lastChild);
		}
    var menuThesaurusBoxButtonsRelationshipsElement = $(mainDiv).find('#testexMenuThesaurusBoxButtonsRelationships')[0];
    while(menuThesaurusBoxButtonsRelationshipsElement.hasChildNodes()) {
			menuThesaurusBoxButtonsRelationshipsElement.removeChild(menuThesaurusBoxButtonsRelationshipsElement.lastChild);
		}
		
		$.each(JSON.parse(arr), function(key, value) {
			var but = document.createElement('a');
			menuThesaurusBoxButtonsElement.appendChild(but);
			but.className = 'menuThesaurusBoxButtons';
			but.text = value.T_Name + " (" + value.Th_Name + ")";
			but.onclick = function(e) {
				refreshMainBoxThesaurusRelationship(value.ID);
			};
		});
		
	} catch (ex) {alert("refreshMainBoxThesaurusSecond(arr): " + ex);};
}

function refreshMainBoxThesaurusRelationship(_id, b) {
	
	try {
		var menuThesaurusBoxButtonsElement = $(mainDiv).find('#testexMenuThesaurusBoxButtons')[0];
    while(menuThesaurusBoxButtonsElement.hasChildNodes()) {
			menuThesaurusBoxButtonsElement.removeChild(menuThesaurusBoxButtonsElement.lastChild);
		}
    var menuThesaurusBoxButtonsRelationshipsElement = $(mainDiv).find('#testexMenuThesaurusBoxButtonsRelationships')[0];
    while(menuThesaurusBoxButtonsRelationshipsElement.hasChildNodes()) {
			menuThesaurusBoxButtonsRelationshipsElement.removeChild(menuThesaurusBoxButtonsRelationshipsElement.lastChild);
		}
		
		getTTermTThesaurusNormalById(_id, refreshMainBoxThesaurusRelationshipThesauruses);
    
    if (!b)
      undoAdd(function() { refreshMainBoxThesaurusRelationship(_id, true); });
		
	} catch (ex) { alert("refreshMainBoxThesaurusRelationship(_id): " + ex); };
}

function refreshMainBoxThesaurusRelationshipThesauruses(arr) {
	
	try {
		var menuThesaurusBoxButtonsElement = $(mainDiv).find('#testexMenuThesaurusBoxButtons')[0];
    while(menuThesaurusBoxButtonsElement.hasChildNodes()) {
			menuThesaurusBoxButtonsElement.removeChild(menuThesaurusBoxButtonsElement.lastChild);
		}
    var menuThesaurusBoxButtonsRelationshipsElement = $(mainDiv).find('#testexMenuThesaurusBoxButtonsRelationships')[0];
    while(menuThesaurusBoxButtonsRelationshipsElement.hasChildNodes()) {
			menuThesaurusBoxButtonsRelationshipsElement.removeChild(menuThesaurusBoxButtonsRelationshipsElement.lastChild);
		}
		
		var val = JSON.parse(JSON.parse(arr));
		recursRefreshMainBoxThesaurusRelationshipThesauruses(val, menuThesaurusBoxButtonsRelationshipsElement);
		
	} catch (ex) {"refreshMainBoxThesaurusRelationshipThesauruses(arr) " + alert(ex);};
}

function recursRefreshMainBoxThesaurusRelationshipThesauruses(obj, db) {
	
  try {
    if (!obj) return;
    
    var but = document.createElement('a');
    db.appendChild(but);
    but.className = 'menuThesaurusBoxButtonsRelationships';
    but.text = obj.Name + "(" + obj.Th_Name + ")";
    but.style.left = (obj.Level * 30) + "px";
    but.onclick = function(e) {
      refreshMainBoxThesaurusRelationship(obj.ID);
    };
    
    var img = document.createElement('img');
    but.appendChild(img);
    img.className = "imgType" + obj.TTRT_Name;
    
    $.each(obj.LT2, function(key, value) {
      recursRefreshMainBoxThesaurusRelationshipThesauruses(value, db)
    });
  } catch (ex) {"recursRefreshMainBoxThesaurusRelationshipThesauruses(obj, db): " + alert(ex);};
}


function getPointFromRange(a) {
  var b,
  c = a.smartLinkNode,
  d = !1;
  c ? (b = c.getClientRects(), d = !0) : b = a.getClientRects();
  var e = b[b.length - 1],
  f = e.top,
  g = e.bottom,
  h = g - f,
  i = e.right;
  if (!d && b.length > 1) {
    var j = b[b.length - 2].bottom;
    f > j && (d = !0, f = j)
  }
  if (!d) {
    var c = a.endContainer;
    for (c = a.commonAncestorContainer; c && 1 != c.nodeType; )
      c = c.parentNode;
    var k = window.getComputedStyle(c),
    l = parseInt(k["line-height"]);
    l > h && (f = g - l);
    var m = c.getBoundingClientRect();
    f < m.top && (f = m.top)
  }
  console.log("x: " + i + "; y: " + f);
  return {
    left : i,
    top : f,
    bottom : g,
    height : h,
    position : {
      horizontal : "right",
      vertical : "bottom"
    }
  }
}

function getRangeFromSelection(a) {
  function b(a) {
    if (a.previousSibling) {
      for (a = a.previousSibling; a.lastChild; )
        a = a.lastChild;
      return a
    }
    return a = a.parentNode
  }
  function c(a) {
    do
      a = b(a);
    while (a && 3 != a.nodeType);
    return a
  }
  function d(a) {
    return a.replace(/\s+$/, "")
  }
  function e(a) {
    if (0 != a.endOffset)
      return !1;
    var c = a.endContainer;
    do
      c = b(c);
    while (c && 3 != c.nodeType);
    return c ? (a.setEnd(c, c.nodeValue.length), !0) : !1
  }
  function f(a) {
    var b = a.endContainer;
    if (3 != b.nodeType)
      return !1;
    var c = b.nodeValue,
    e = d(c).length;
    return e >= a.endOffset ? !1 : (a.setEnd(b, e), !0)
  }
  function g(a) {
    var b = a.endContainer;
    return 3 == b.nodeType ? !1 : (b = b.childNodes[a.endOffset]) && (b = c(b)) ? (a.setEnd(b, b.nodeValue.length), !0) : !1
  }
  function h(a) {
    try {
      var b = a.endContainer;
      if (b = b.parentNode.parentNode, "ctrlcopy" == b.id)
        return b = c(b), a.setEnd(b, b.nodeValue.length), !0
    } catch (d) {}

    return !1
  }
  if (1 != a.rangeCount)
    return null;
  for (var i = a.getRangeAt(0); ; )
    if (!(e(i) || f(i) || g(i) || h(i)))
      break;
  return i
}
