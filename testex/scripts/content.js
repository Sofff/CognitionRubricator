
try {
	var bc = false,
		//arrowDiv  = createArrowDivElement(),
		//menuDiv = createMenuDivElement();
		arrowDiv  = createArrowDivElement( document, mouseClickArrow),
		menuDiv = createMenuDivElement( document);
	document.addEventListener("click", mouseClick, false);

	chrome.runtime.sendMessage( {msg: "getEnabled"}, function(resp) {
		if (resp) {
			chrome.runtime.sendMessage( {msg: "getDataWords"}, function(response) {
				if (response != null) {
					hlWords(JSON.parse(response), 'highlight3', 'highlight2');
					//var ii = 0;
					$.each(document.getElementsByName("hiliwo"), function() {
						this.addEventListener("mouseenter", mouseEnterWord, false);
						//this.textContent = this.textContent + ii;
						//if (ii > 40) console.log(ii +": " + this.textContent);
						//ii++;
						this.addEventListener("mouseleave", mouseOutWord, false);
					});
				}
			});
		}
	});

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

	function mouseEnterWord(e) {
		clearTimeout($(arrowDiv).data('timeoutId'));
		arrowDiv.style.display = 'block';
		var r = e.target.getClientRects();
		//console.log('left: ' + document.body.scrollLeft + r[r.length - 1].right + '     top: ' + document.body.scrollTop + r[r.length - 1].top);
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
		bc = true;
		getTermIDRubrics(arrowDiv.id);
		menuDiv.style.display = 'block';
		menuDiv.style.left = document.body.scrollLeft + r[r.length - 1].right + 'px';
		menuDiv.style.top = document.body.scrollTop + r[r.length - 1].top + 'px';
	}

	function mouseClick(e) {
		//alert($(e.target).attr("class"));
		if (!$(e.target).is( ".mainArrowBox,.arrowBoxBackground,.arrowBox,.mainMenuBox,.mainMenuBoxBackground,.menuBox,.menuBoxTitle,.menuBoxButtons,.menuBoxDescription,.menuBoxSign,.menuBoxDocuments,.menuBoxTerms,.menuBoxButtonsRubric,.menuBoxButtonsParent,.menuBoxButtonsChild,.butEdit" ))
			hideAll();
		//if (!findParentBySelector(e.target, "div.mainArrowBox, div.mainMenuBox"))
		//	hideAll();
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

	function hideAll() {
		
		//if (!bc) {
			// arrowDiv.style.display = 'none';
			// arrowDiv.style.left = '-100px';
			// arrowDiv.style.top = '-100px';
			menuDiv.style.display = 'none';
			menuDiv.style.left = '-100px';
			menuDiv.style.top = '-100px';
		//} else bc = false;
	}

	function getDescription(_id) {
		if (_id)
			chrome.runtime.sendMessage( {msg: "getDataDescription", idw: _id}, function( response) {
				if (response != null) {
					menuDiv.childNodes[0].childNodes[0].childNodes[1].innerText = "Описание: " + response;
				}
			});
	}

	function getTermIDRubrics(_id) {
		if (_id)
			chrome.runtime.sendMessage( {msg: "getTermIDRubrics", idw: _id}, function( response) {
				if (response != null) {
					refreshMenuDivElementDynamic(response); //JSON.parse(response));
				}
			});
	}

	function getRelatedRubricsParents(_id, cb) {
		if (_id)
		{
			chrome.runtime.sendMessage( {msg: "getRelatedRubricsParents", idw: _id}, function( response) {
				if (response != null) {
					cb(response); //JSON.parse(response));
				}
			});
		}
	}

	function getRelatedRubricsChilds(_id, cb) {
		if (_id)
		{
			chrome.runtime.sendMessage( {msg: "getRelatedRubricsChilds", idw: _id}, function( response) {
				if (response != null) {
					cb(response); //JSON.parse(response));
				}
			});
		}
	}

	function getAdditionalRubricInfo(_id, cb) {
		if (_id)
		{
			chrome.runtime.sendMessage( {msg: "getAdditionalRubricInfo", idw: _id}, function( response) {
				if (response != null) {
					cb(JSON.parse(response));
				}
			});
		}
	}
	
	function editAdditionalRubricInfoDescription(_id, _dta, cb) {
		try {
			if (_id)
			{
				chrome.runtime.sendMessage( {msg: "editAdditionalRubricInfoDescription", idw: _id, dta: _dta}, function( response) {
					if (response != null) {
						cb();
					}
				});
			}
		} catch (ex) {alert(ex);};
	}
	
	function editAdditionalRubricInfoSign(_id, _dta, cb) {
		try {
			if (_id)
			{
				chrome.runtime.sendMessage( {msg: "editAdditionalRubricInfoSign", idw: _id, dta: _dta}, function( response) {
					if (response != null) {
						cb();
					}
				});
			}
		} catch (ex) {alert(ex);};
	}
	
	function editAdditionalRubricInfoDocuments(_id, _dta, cb) {
		try {
			if (_id)
			{
				chrome.runtime.sendMessage( {msg: "editAdditionalRubricInfoDocuments", idw: _id, dta: _dta}, function( response) {
					if (response != null) {
						cb();
					}
				});
			}
		} catch (ex) {alert(ex);};
	}
	
	function editAdditionalRubricInfoTerms(_id, _dta, cb) {
		try {
			if (_id)
			{
				chrome.runtime.sendMessage( {msg: "editAdditionalRubricInfoTerms", idw: _id, dta: _dta}, function( response) {
					if (response != null) {
						cb();
					}
				});
			}
		} catch (ex) {alert(ex);};
	}
	
	
} catch (ex) {alert(ex);};










