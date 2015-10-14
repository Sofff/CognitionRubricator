

function createArrowDivElement( dcm, mca) {
	try {
		var div = dcm.createElement('div');
		dcm.body.appendChild(div);
		div.className = 'mainArrowBox';
		
		var div1 = dcm.createElement('div');
		div.appendChild(div1);
		div1.className = 'mainArrowBoxBackground';
		
		var div2 = dcm.createElement('div');
		div1.appendChild(div2);
		div2.className = 'arrowBox';
		div2.addEventListener("click", mca, false);
		
		return div;
	} catch (ex) { alert(ex); }
}


function createMenuDivElement( dcm) {
	
	var div = dcm.createElement('div');
	dcm.body.appendChild(div);
	div.className = 'mainMenuBox';
	
	var divMenuBoxBackground = dcm.createElement('div');
	div.appendChild(divMenuBoxBackground);
	divMenuBoxBackground.className = 'mainMenuBoxBackground';
	
	var divMenuBox = dcm.createElement('div');
	divMenuBoxBackground.appendChild(divMenuBox);
	divMenuBox.className = 'menuBox';
	//divMenuBox.draggable = 'true';
	
	var divTitle1 = dcm.createElement('div');
	divMenuBox.appendChild(divTitle1);
	divTitle1.className = 'menuBoxTitle';
	divTitle1.innerHTML = "Связанные рубрики"
	
	var divButtons = dcm.createElement('div');
	divMenuBox.appendChild(divButtons);
	divButtons.className = 'menuBoxButtons';
	
	var divButtonsRubric = dcm.createElement('div');
	divButtons.appendChild(divButtonsRubric);
	divButtonsRubric.className = 'menuBoxButtonsRubric';
	
	var divButtonsParent = dcm.createElement('div');
	divButtons.appendChild(divButtonsParent);
	divButtonsParent.className = 'menuBoxButtonsParent';
	
	var divButtonsChild = dcm.createElement('div');
	divButtons.appendChild(divButtonsChild);
	divButtonsChild.className = 'menuBoxButtonsChild';
	
	var divButtons = dcm.createElement('div');
	divMenuBox.appendChild(divButtons);
	divButtons.className = 'menuBoxButtons';
	
	var divTitle2 = dcm.createElement('div');
	divMenuBox.appendChild(divTitle2);
	divTitle2.className = 'menuBoxTitle';
	divTitle2.innerHTML = "Текущая рубрика"
	
	var divDescription = dcm.createElement('div');
	divMenuBox.appendChild(divDescription);
	divDescription.className = 'menuBoxDescription';
	//divDescription.innerHTML = "Описание"
	
	var divDescriptionEdit = dcm.createElement('a');
	divDescription.appendChild(divDescriptionEdit);
	divDescriptionEdit.className = 'butEdit';
	
	var divDescriptionText = dcm.createElement('div');
	divDescription.appendChild(divDescriptionText);
	divDescriptionText.className = 'menuBoxDescription';
	divDescriptionText.innerHTML = "Описание"
	
	var divSign = dcm.createElement('div');
	divMenuBox.appendChild(divSign);
	divSign.className = 'menuBoxSign';
	//divSign.innerHTML = "Признак деления"
	
	var divSignEdit = dcm.createElement('a');
	divSign.appendChild(divSignEdit);
	divSignEdit.className = 'butEdit';
	
	var divSignText = dcm.createElement('div');
	divSign.appendChild(divSignText);
	divSignText.className = 'menuBoxSign';
	divSignText.innerHTML = "Признак деления"
	
	var divDocuments = dcm.createElement('div');
	divMenuBox.appendChild(divDocuments);
	divDocuments.className = 'menuBoxDocuments';
	//divDocuments.innerHTML = "Документы"
	
	var divDocumentsEdit = dcm.createElement('a');
	divDocuments.appendChild(divDocumentsEdit);
	divDocumentsEdit.className = 'butEdit';
	
	var divDocumentsText = dcm.createElement('div');
	divDocuments.appendChild(divDocumentsText);
	divDocumentsText.className = 'menuBoxDocuments';
	divDocumentsText.innerHTML = "Документы"
	
	var divTerms = dcm.createElement('div');
	divMenuBox.appendChild(divTerms);
	divTerms.className = 'menuBoxSign';
	//divTerms.innerHTML = "Ключевые слова"
	
	var divTermsEdit = dcm.createElement('a');
	divTerms.appendChild(divTermsEdit);
	divTermsEdit.className = 'butEdit';
	
	var divTermsText = dcm.createElement('div');
	divTerms.appendChild(divTermsText);
	divTermsText.className = 'menuBoxSign';
	divTermsText.innerHTML = "Ключевые слова"
	
	return div;
}

function refreshMenuDivElementDynamic(arr) {
	
	try {
		var divButtons = menuDiv.childNodes[0].childNodes[0].childNodes[1];
		while(divButtons.hasChildNodes()) {
			divButtons.removeChild(divButtons.lastChild);
		}
		
		var divButtonsRubric = document.createElement('div');
		divButtons.appendChild(divButtonsRubric);
		divButtonsRubric.className = 'menuBoxButtonsRubric';
		
		// var divButtons = document.createElement('div');
		// divButtons.className = 'menuButtonsBox';
		// menuBox.appendChild(divButtons);
		// var divButtonsParents = document.createElement('div');
		// divButtonsParents.className = 'menuButtonsBox';
		// menuBox.appendChild(divButtonsParents);
		// var divButtonsChilds = document.createElement('div');
		// divButtonsChilds.className = 'menuButtonsBox';
		// menuBox.appendChild(divButtonsChilds);
		// var divDesc = document.createElement('div');
		// divDesc.className = 'menuDescriptionBox';
		// divDesc.text = 'Дополнительная информация';
		// menuBox.appendChild(divDesc);
	
		$.each(JSON.parse(arr), function(key, value) {
			var but = document.createElement('a');
			divButtonsRubric.appendChild(but);
			but.className = 'menuBoxButtonsRubric';
			but.text = value;
			but.onclick = function(e) {
				mainRefreshMenuDivElementDynamic(key);
			};
		});
	} catch (ex) {alert(ex);};
}

function mainRefreshMenuDivElementDynamic(_id) {
	try {
		var divButtons = menuDiv.childNodes[0].childNodes[0].childNodes[1];
		while(divButtons.hasChildNodes()) {
			divButtons.removeChild(divButtons.lastChild);
		}
		var divButtonsParent = document.createElement('div');
		divButtons.appendChild(divButtonsParent);
		divButtonsParent.className = 'menuBoxButtonsParent';
		var divButtonsChild = document.createElement('div');
		divButtons.appendChild(divButtonsChild);
		divButtonsChild.className = 'menuBoxButtonsChild';
		
		getRelatedRubricsParents(_id, refreshMenuDivElementDynamicParents);
		getRelatedRubricsChilds(_id, refreshMenuDivElementDynamicChilds);
		getAdditionalRubricInfo(_id, refreshMenuDivElementDynamicRubricInfo);
	} catch (ex) { alert(ex); }
}

function refreshMenuDivElementDynamicParents(arr) {
	
	try {
		var divButtonsParents = menuDiv.childNodes[0].childNodes[0].childNodes[1].childNodes[0];
		while(divButtonsParents.hasChildNodes()) {
			divButtonsParents.removeChild(divButtonsParents.lastChild);
		}
		if (arr)
			$.each(JSON.parse(arr), function(key, value) {
				var but = document.createElement('a');
				divButtonsParents.appendChild(but);
				but.className = 'menuBoxButtonsParent';
				but.text = value;
				but.onclick = function(e) {
					mainRefreshMenuDivElementDynamic(key);
				};
			});
	} catch (ex) {alert(ex);};
}

function refreshMenuDivElementDynamicChilds(arr) {
	
	try {
		var divButtonsChilds = menuDiv.childNodes[0].childNodes[0].childNodes[1].childNodes[1];
		while(divButtonsChilds.hasChildNodes()) {
			divButtonsChilds.removeChild(divButtonsChilds.lastChild);
		}
		if (arr)
			$.each(JSON.parse(arr), function(key, value) {
				var but = document.createElement('a');
				divButtonsChilds.appendChild(but);
				but.className = 'menuBoxButtonsChild';
				but.text = value;
				but.onclick = function(e) {
					mainRefreshMenuDivElementDynamic(key);
				};
			});
	} catch (ex) {alert(ex);};
}

function refreshMenuDivElementDynamicRubricInfo(arr) {
	
	try {
		var divTitle2 = menuDiv.childNodes[0].childNodes[0].childNodes[3];
		
		var divDescriptionEdit = menuDiv.childNodes[0].childNodes[0].childNodes[4].childNodes[0];
		var divDescriptionText = menuDiv.childNodes[0].childNodes[0].childNodes[4].childNodes[1];
		var divSignEdit = menuDiv.childNodes[0].childNodes[0].childNodes[5].childNodes[0];
		var divSignText = menuDiv.childNodes[0].childNodes[0].childNodes[5].childNodes[1];
		var divDocumentsEdit = menuDiv.childNodes[0].childNodes[0].childNodes[6].childNodes[0];
		var divDocumentsText = menuDiv.childNodes[0].childNodes[0].childNodes[6].childNodes[1];
		var divTermsEdit = menuDiv.childNodes[0].childNodes[0].childNodes[7].childNodes[0];
		var divTermsText = menuDiv.childNodes[0].childNodes[0].childNodes[7].childNodes[1];
		
		if (arr)
		{
			divDescriptionEdit.onclick = function(e) {
				var val = prompt("Please enter description", arr["description"]);
				if (val)
					editAdditionalRubricInfoDescription(arr["id"], val, function() { mainRefreshMenuDivElementDynamic(arr["id"])} );
					//alert( val + " 1 privaet " + arr["id"]);
			};
			divSignEdit.onclick = function(e) {
				var val = prompt("Please enter sign", arr["sign"]);
				if (val)
					editAdditionalRubricInfoSign(arr["id"], val, function() { mainRefreshMenuDivElementDynamic(arr["id"])} );
					//alert(val + " 2 privaet " + arr["id"]);
			};
			divDocumentsEdit.onclick = function(e) {
				var val = prompt("Please enter new document", "");
				if (val)
					editAdditionalRubricInfoDocuments(arr["id"], val, function() { mainRefreshMenuDivElementDynamic(arr["id"])} );
			};
			divTermsEdit.onclick = function(e) {
				var val = prompt("Please enter new term", "");
				if (val)
					editAdditionalRubricInfoTerms(arr["id"], val, function() { mainRefreshMenuDivElementDynamic(arr["id"])} );
			};
		
			divTitle2.innerHTML = arr["name"];
			divDescriptionText.innerHTML = arr["description"];
			divSignText.innerHTML = arr["sign"];
			divDocumentsText.innerHTML = arr["docs"];
			divTermsText.innerHTML = arr["terms"];
		}
		
	} catch (ex) {alert(ex);};
}













