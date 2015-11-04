
var enabledSearch = false, enabledMove = false, moveDivX = 0, moveDivY = 0, textSelected = '',
  arrayUndo = [function() { alert("private")} ],
  listWords, arrowDiv, arrowSelectDiv, mainDiv,
  classesNames = ".mainArrowBox,.mainArrowBoxBackground,.arrowBox,.mainArrowSelectBox,.mainArrowSelectBoxBackground,.arrowSelectBox,"
    + ".mainBox,.mainBoxMovable,.mainBoxBackground,.mainBoxTitle,.mainBoxButtonsVote,.menuRubricatorBoxBackground,.menuRubricatorBoxTitle,"
    + ".butBack,.butEdit,.imgTypeBT,.imgTypeNT,.imgTypeRT,.imgTypeSN,.imgTypeUF,.imgTypeRUB,"
    + ".menuRubricatorBoxTitle,.menuRubricatorBoxButtons,.menuRubricatorBoxButtonsRubric,.menuRubricatorBoxButtonsParent,.menuRubricatorBoxButtonsChild,.menuRubricatorBoxDescription,"
    + ".menuRubricatorBoxSign,.menuRubricatorBoxDocuments,.menuRubricatorBoxTerms,.menuThesaurusBoxBackground,.menuThesaurusBoxTitle,.menuThesaurusBoxButtons,.menuThesaurusBoxButtonsRelationships,"
    + ".menuGlossaryBoxBackground,.menuGlossaryBoxTitle,.menuGlossaryBoxButtons,.menuGlossaryBoxDescription";

function createArrowDiv(mca) {
  
	try {
		var mainArrowBoxElement = document.createElement('div');
		document.body.appendChild(mainArrowBoxElement);
		mainArrowBoxElement.className = 'mainArrowBox';
    mainArrowBoxElement.id = 'testexMainArrowBox';
		
		var mainArrowBoxBackgroundElement = document.createElement('div');
		mainArrowBoxElement.appendChild(mainArrowBoxBackgroundElement);
		mainArrowBoxBackgroundElement.className = 'mainArrowBoxBackground';
    mainArrowBoxBackgroundElement.id = 'testexMainArrowBoxBackground';
		
		var arrowBoxElement = document.createElement('div');
		mainArrowBoxBackgroundElement.appendChild(arrowBoxElement);
		arrowBoxElement.className = 'arrowBox';
    arrowBoxElement.id = 'testexArrowBox';
		arrowBoxElement.addEventListener("click", mca, false);
		
		arrowDiv = mainArrowBoxElement;
	} catch (ex) { alert("createArrowDivElement(mca): " + ex); }
}

function createArrowSelectDiv(mca) {
  
	try {
		var mainArrowBoxElement = document.createElement('div');
		document.body.appendChild(mainArrowBoxElement);
		mainArrowBoxElement.className = 'mainArrowSelectBox';
    mainArrowBoxElement.id = 'testexMainArrowSelectBox';
		
		var mainArrowBoxBackgroundElement = document.createElement('div');
		mainArrowBoxElement.appendChild(mainArrowBoxBackgroundElement);
		mainArrowBoxBackgroundElement.className = 'mainArrowSelectBoxBackground';
    mainArrowBoxBackgroundElement.id = 'testexMainArrowSelectBoxBackground';
		
		var arrowBoxElement = document.createElement('div');
		mainArrowBoxBackgroundElement.appendChild(arrowBoxElement);
		arrowBoxElement.className = 'arrowSelectBox';
    arrowBoxElement.id = 'testexArrowSelectBox';
		arrowBoxElement.addEventListener("click", mca, false);
		
		arrowSelectDiv = mainArrowBoxElement;
	} catch (ex) { alert("createArrowSelectSelectDivElement(mca): " + ex); }
}

function createMainDiv() {
	
  try {
    var divMain = document.createElement('div');
    document.body.appendChild(divMain);
    divMain.className = 'mainBox';
    divMain.id = 'testexMainBox';
    
    mainDiv = divMain;
  } catch (ex) { alert("createMainDiv(): " + ex); }
}

function createVoteMainMenuDiv(_id, text) {
  
  try {
    while(mainDiv.hasChildNodes()) {
			mainDiv.removeChild(mainDiv.lastChild);
		}
		
		var mainBoxBackgroundElement = document.createElement('div');
		mainDiv.appendChild(mainBoxBackgroundElement);
		mainBoxBackgroundElement.className = 'mainBoxBackground';
    mainBoxBackgroundElement.id = 'testexMainBoxBackground';
    
    var mainBoxMovableElement = document.createElement('div');
		mainBoxBackgroundElement.appendChild(mainBoxMovableElement);
		mainBoxMovableElement.className = 'mainBoxMovable';
    mainBoxMovableElement.id = 'testexMainBoxMovableVote';
    mainBoxMovableElement.onmousedown = function(e) {
      enabledMove = true;
      var m = mouseMovePosition(e);
      moveDivX = m[0] - $(mainDiv).position().left;
      moveDivY = m[1] - $(mainDiv).position().top;
    };
    mainBoxMovableElement.onmouseup = function(e) {
      enabledMove = false;
    };
    
    var mainBoxTitleElement = document.createElement('div');
		mainBoxBackgroundElement.appendChild(mainBoxTitleElement);
		mainBoxTitleElement.className = 'mainBoxTitle';
    mainBoxTitleElement.innerHTML = 'Получить информацию из:';
    mainBoxTitleElement.id = 'testexMainBoxTitle';
    
    var mainBoxButtonsVoteElement = document.createElement('div');
		mainBoxBackgroundElement.appendChild(mainBoxButtonsVoteElement);
		mainBoxButtonsVoteElement.className = 'mainBoxButtonsVote';
    mainBoxButtonsVoteElement.id = 'testexMainBoxButtonsVote';
    
    var butRubricatorElement = document.createElement('a');
		mainBoxButtonsVoteElement.appendChild(butRubricatorElement);
		butRubricatorElement.className = 'mainBoxButtonsVote';
		butRubricatorElement.text = "Рубрикатор";
		butRubricatorElement.onclick = function(e) {
			refreshMainBoxRubricatorFirst(_id, false, text);
		};
    
    var butThesaurusElement = document.createElement('a');
		mainBoxButtonsVoteElement.appendChild(butThesaurusElement);
		butThesaurusElement.className = 'mainBoxButtonsVote';
		butThesaurusElement.text = "Тезаурус";
		butThesaurusElement.onclick = function(e) {
			refreshMainBoxThesaurusFirst(_id, false, text);
		};
		
		var butGlossaryElement = document.createElement('a');
		mainBoxButtonsVoteElement.appendChild(butGlossaryElement);
		butGlossaryElement.className = 'mainBoxButtonsVote';
		butGlossaryElement.text = "Глоссарий";
		butGlossaryElement.onclick = function(e) {
			refreshMainBoxGlossaryFirst(_id, false, text);
		};
    
  } catch (ex) { alert("createMainMenuDiv(): " + ex); }
}

function createRubricatorMenuDiv() {
  
  try {
    while(mainDiv.hasChildNodes()) {
			mainDiv.removeChild(mainDiv.lastChild);
		}
    
		var menuRubricatorBoxBackgroundElement = document.createElement('div');
		mainDiv.appendChild(menuRubricatorBoxBackgroundElement);
		menuRubricatorBoxBackgroundElement.className = 'menuRubricatorBoxBackground';
    menuRubricatorBoxBackgroundElement.id = 'testexMenuRubricatorBoxBackground';
    
    var mainBoxMovableElement = document.createElement('div');
		menuRubricatorBoxBackgroundElement.appendChild(mainBoxMovableElement);
		mainBoxMovableElement.className = 'mainBoxMovable';
    mainBoxMovableElement.id = 'testexMainBoxMovableRubricator';
    mainBoxMovableElement.onmousedown = function(e) {
      enabledMove = true;
      var m = mouseMovePosition(e);
      moveDivX = m[0] - $(mainDiv).position().left;
      moveDivY = m[1] - $(mainDiv).position().top;
    };
    mainBoxMovableElement.onmouseup = function(e) {
      enabledMove = false;
    };
    
    var menuRubricatorBoxTitleElement = document.createElement('div');
		menuRubricatorBoxBackgroundElement.appendChild(menuRubricatorBoxTitleElement);
		menuRubricatorBoxTitleElement.className = 'menuRubricatorBoxTitle';
    menuRubricatorBoxTitleElement.id = 'testexMenuRubricatorBoxTitle';
    
    var butBackElement = document.createElement('a');
    menuRubricatorBoxTitleElement.appendChild(butBackElement);
    butBackElement.className = 'butBack';
    butBackElement.onclick = function(e) {
      undoUse();
    };
    
    var menuRubricatorBoxTitleTextElement = document.createElement('div');
		menuRubricatorBoxTitleElement.appendChild(menuRubricatorBoxTitleTextElement);
		menuRubricatorBoxTitleTextElement.className = 'menuRubricatorBoxTitle';
    menuRubricatorBoxTitleTextElement.innerHTML = 'Рубрики имеющие совпадение по слову:';
    menuRubricatorBoxTitleTextElement.id = 'testexMenuRubricatorBoxTitle';
    
    var menuRubricatorBoxButtonsElement = document.createElement('div');
		menuRubricatorBoxBackgroundElement.appendChild(menuRubricatorBoxButtonsElement);
		menuRubricatorBoxButtonsElement.className = 'menuRubricatorBoxButtons';
    menuRubricatorBoxButtonsElement.id = 'testexMenuRubricatorBoxButtons';
    
    var menuRubricatorBoxButtonsRubricElement = document.createElement('div');
		menuRubricatorBoxButtonsElement.appendChild(menuRubricatorBoxButtonsRubricElement);
		menuRubricatorBoxButtonsRubricElement.className = 'menuRubricatorBoxButtonsRubric';
    menuRubricatorBoxButtonsRubricElement.id = 'testexMenuRubricatorBoxButtonsRubric';
    
    var menuRubricatorBoxButtonsParentElement = document.createElement('div');
		menuRubricatorBoxButtonsElement.appendChild(menuRubricatorBoxButtonsParentElement);
		menuRubricatorBoxButtonsParentElement.className = 'menuRubricatorBoxButtonsParent';
    menuRubricatorBoxButtonsParentElement.id = 'testexMenuRubricatorBoxButtonsParent';
    
    var menuRubricatorBoxButtonsChildElement = document.createElement('div');
		menuRubricatorBoxButtonsElement.appendChild(menuRubricatorBoxButtonsChildElement);
		menuRubricatorBoxButtonsChildElement.className = 'menuRubricatorBoxButtonsChild';
    menuRubricatorBoxButtonsChildElement.id = 'testexMenuRubricatorBoxButtonsChild';
    
    var menuRubricatorBoxTitleCurrentElement = document.createElement('div');
		menuRubricatorBoxBackgroundElement.appendChild(menuRubricatorBoxTitleCurrentElement);
		menuRubricatorBoxTitleCurrentElement.className = 'menuRubricatorBoxTitle';
    menuRubricatorBoxTitleCurrentElement.innerHTML = 'Текущая рубрика';
    menuRubricatorBoxTitleCurrentElement.id = 'testexMenuRubricatorBoxTitleCurrent';
    
    var menuRubricatorBoxDescriptionElement = document.createElement('div');
    menuRubricatorBoxBackgroundElement.appendChild(menuRubricatorBoxDescriptionElement);
    menuRubricatorBoxDescriptionElement.className = 'menuRubricatorBoxDescription';
    menuRubricatorBoxDescriptionElement.id = 'testexMenuRubricatorBoxDescription';
    
    var menuRubricatorBoxDescriptionEditElement = document.createElement('a');
    menuRubricatorBoxDescriptionElement.appendChild(menuRubricatorBoxDescriptionEditElement);
    menuRubricatorBoxDescriptionEditElement.className = 'butEdit';
    menuRubricatorBoxDescriptionEditElement.id = 'testexMenuBoxDescriptionEdit';
    
    var menuRubricatorBoxDescriptionTextElement = document.createElement('div');
    menuRubricatorBoxDescriptionElement.appendChild(menuRubricatorBoxDescriptionTextElement);
    menuRubricatorBoxDescriptionTextElement.className = 'menuRubricatorBoxDescription';
    menuRubricatorBoxDescriptionTextElement.innerHTML = "Описание";
    menuRubricatorBoxDescriptionTextElement.id = 'testexMenuBoxDescriptionText';
    
    var menuRubricatorBoxSignElement = document.createElement('div');
    menuRubricatorBoxBackgroundElement.appendChild(menuRubricatorBoxSignElement);
    menuRubricatorBoxSignElement.className = 'menuRubricatorBoxSign';
    menuRubricatorBoxSignElement.id = 'testexMenuRubricatorBoxSign';
    
    var menuRubricatorBoxSignEditElement = document.createElement('a');
    menuRubricatorBoxSignElement.appendChild(menuRubricatorBoxSignEditElement);
    menuRubricatorBoxSignEditElement.className = 'butEdit';
    menuRubricatorBoxSignEditElement.id = 'testexMenuRubricatorBoxSignEdit';
    
    var menuRubricatorBoxSignTextElement = document.createElement('div');
    menuRubricatorBoxSignElement.appendChild(menuRubricatorBoxSignTextElement);
    menuRubricatorBoxSignTextElement.className = 'menuRubricatorBoxSign';
    menuRubricatorBoxSignTextElement.innerHTML = "Признак деления";
    menuRubricatorBoxSignTextElement.id = 'testexMenuRubricatorBoxSignText';
    
    var menuRubricatorBoxDocumentsElement = document.createElement('div');
    menuRubricatorBoxBackgroundElement.appendChild(menuRubricatorBoxDocumentsElement);
    menuRubricatorBoxDocumentsElement.className = 'menuRubricatorBoxDocuments';
    menuRubricatorBoxDocumentsElement.id = 'testexMenuRubricatorBoxDocuments';
    
    var menuRubricatorBoxDocumentsEditElement = document.createElement('a');
    menuRubricatorBoxDocumentsElement.appendChild(menuRubricatorBoxDocumentsEditElement);
    menuRubricatorBoxDocumentsEditElement.className = 'butEdit';
    menuRubricatorBoxDocumentsEditElement.id = 'testexMenuRubricatorBoxDocumentsEdit';
    
    var menuRubricatorBoxDocumentsTextElement = document.createElement('div');
    menuRubricatorBoxDocumentsElement.appendChild(menuRubricatorBoxDocumentsTextElement);
    menuRubricatorBoxDocumentsTextElement.className = 'menuRubricatorBoxDocuments';
    menuRubricatorBoxDocumentsTextElement.innerHTML = "Документы";
    menuRubricatorBoxDocumentsTextElement.id = 'testexMenuRubricatorBoxDocumentsText';
    
    var menuRubricatorBoxTermsElement = document.createElement('div');
    menuRubricatorBoxBackgroundElement.appendChild(menuRubricatorBoxTermsElement);
    menuRubricatorBoxTermsElement.className = 'menuRubricatorBoxTerms';
    menuRubricatorBoxTermsElement.id = 'testexMenuRubricatorBoxTerms';
    
    var menuRubricatorBoxTermsEditElement = document.createElement('a');
    menuRubricatorBoxTermsElement.appendChild(menuRubricatorBoxTermsEditElement);
    menuRubricatorBoxTermsEditElement.className = 'butEdit';
    menuRubricatorBoxTermsEditElement.id = 'testexMenuRubricatorBoxTermsEdit';
    
    var menuRubricatorBoxTermsTextElement = document.createElement('div');
    menuRubricatorBoxTermsElement.appendChild(menuRubricatorBoxTermsTextElement);
    menuRubricatorBoxTermsTextElement.className = 'menuRubricatorBoxTerms';
    menuRubricatorBoxTermsTextElement.innerHTML = "Ключевые слова";
    menuRubricatorBoxTermsTextElement.id = 'testexMenuRubricatorBoxTermsText';
    
  } catch (ex) { alert("createRubricatorMenuDiv(_id): " + ex); }
}

function createThesaurusMenuDiv() {
  
  try {
    while(mainDiv.hasChildNodes()) {
			mainDiv.removeChild(mainDiv.lastChild);
		}
    
		var menuThesaurusBoxBackgroundElement = document.createElement('div');
		mainDiv.appendChild(menuThesaurusBoxBackgroundElement);
		menuThesaurusBoxBackgroundElement.className = 'menuThesaurusBoxBackground';
    menuThesaurusBoxBackgroundElement.id = 'testexMenuThesaurusBoxBackground';
    
    var mainBoxMovableElement = document.createElement('div');
		menuThesaurusBoxBackgroundElement.appendChild(mainBoxMovableElement);
		mainBoxMovableElement.className = 'mainBoxMovable';
    mainBoxMovableElement.id = 'testexMainBoxMovableThesaurus';
    mainBoxMovableElement.onmousedown = function(e) {
      enabledMove = true;
      var m = mouseMovePosition(e);
      moveDivX = m[0] - $(mainDiv).position().left;
      moveDivY = m[1] - $(mainDiv).position().top;
    };
    mainBoxMovableElement.onmouseup = function(e) {
      enabledMove = false;
    };
    
    var menuThesaurusBoxTitleElement = document.createElement('div');
		menuThesaurusBoxBackgroundElement.appendChild(menuThesaurusBoxTitleElement);
		menuThesaurusBoxTitleElement.className = 'menuThesaurusBoxTitle';
    menuThesaurusBoxTitleElement.id = 'testexMenuThesaurusBoxTitle';
    
    var butBackElement = document.createElement('a');
    menuThesaurusBoxTitleElement.appendChild(butBackElement);
    butBackElement.className = 'butBack';
    butBackElement.onclick = function(e) {
      undoUse();
    };
    
    var menuThesaurusBoxTitleTextElement = document.createElement('div');
		menuThesaurusBoxTitleElement.appendChild(menuThesaurusBoxTitleTextElement);
		menuThesaurusBoxTitleTextElement.className = 'menuThesaurusBoxTitle';
    menuThesaurusBoxTitleTextElement.innerHTML = 'Совпадения в терминах тезауруса:';
    menuThesaurusBoxTitleTextElement.id = 'testexMenuThesaurusBoxTitleText';
    
    var menuThesaurusBoxButtonsElement = document.createElement('div');
		menuThesaurusBoxBackgroundElement.appendChild(menuThesaurusBoxButtonsElement);
		menuThesaurusBoxButtonsElement.className = 'menuThesaurusBoxButtons';
    menuThesaurusBoxButtonsElement.id = 'testexMenuThesaurusBoxButtons';
    
    var menuThesaurusBoxButtonsRelationshipsElement = document.createElement('div');
		menuThesaurusBoxBackgroundElement.appendChild(menuThesaurusBoxButtonsRelationshipsElement);
		menuThesaurusBoxButtonsRelationshipsElement.className = 'menuThesaurusBoxButtonsRelationships';
    menuThesaurusBoxButtonsRelationshipsElement.id = 'testexMenuThesaurusBoxButtonsRelationships';
    
  } catch (ex) { alert("createThesaurusMenuDiv(): " + ex); }
}

function createGlossaryMenuDiv() {
  
  try {
    while(mainDiv.hasChildNodes()) {
			mainDiv.removeChild(mainDiv.lastChild);
		}
    
    var menuGlossaryBoxBackgroundElement = document.createElement('div');
		mainDiv.appendChild(menuGlossaryBoxBackgroundElement);
		menuGlossaryBoxBackgroundElement.className = 'menuGlossaryBoxBackground';
    menuGlossaryBoxBackgroundElement.id = 'testexMenuGlossaryBoxBackground';
    
    var mainBoxMovableElement = document.createElement('div');
		menuGlossaryBoxBackgroundElement.appendChild(mainBoxMovableElement);
		mainBoxMovableElement.className = 'mainBoxMovable';
    mainBoxMovableElement.id = 'testexMainBoxMovableRubricator';
    mainBoxMovableElement.onmousedown = function(e) {
      enabledMove = true;
      var m = mouseMovePosition(e);
      moveDivX = m[0] - $(mainDiv).position().left;
      moveDivY = m[1] - $(mainDiv).position().top;
    };
    mainBoxMovableElement.onmouseup = function(e) {
      enabledMove = false;
    };
    
    var menuGlossaryBoxTitleElement = document.createElement('div');
		menuGlossaryBoxBackgroundElement.appendChild(menuGlossaryBoxTitleElement);
		menuGlossaryBoxTitleElement.className = 'menuGlossaryBoxTitle';
    menuGlossaryBoxTitleElement.id = 'testexMenuGlossaryBoxTitle';
    
    var butBackElement = document.createElement('a');
    menuGlossaryBoxTitleElement.appendChild(butBackElement);
    butBackElement.className = 'butBack';
    butBackElement.onclick = function(e) {
      undoUse();
    };
    
    var menuGlossaryBoxTitleTextElement = document.createElement('div');
		menuGlossaryBoxTitleElement.appendChild(menuGlossaryBoxTitleTextElement);
		menuGlossaryBoxTitleTextElement.className = 'menuGlossaryBoxTitle';
    menuGlossaryBoxTitleTextElement.innerHTML = 'Глоссы имеющие совпадение по слову:';
    menuGlossaryBoxTitleTextElement.id = 'testexMenuGlossaryBoxTitle';
    
    var menuGlossaryBoxButtonsElement = document.createElement('div');
		menuGlossaryBoxBackgroundElement.appendChild(menuGlossaryBoxButtonsElement);
		menuGlossaryBoxButtonsElement.className = 'menuGlossaryBoxButtons';
    menuGlossaryBoxButtonsElement.id = 'testexMenuGlossaryBoxButtons';
    
    var menuGlossaryBoxDescriptionElement = document.createElement('div');
    menuGlossaryBoxBackgroundElement.appendChild(menuGlossaryBoxDescriptionElement);
    menuGlossaryBoxDescriptionElement.className = 'menuGlossaryBoxDescription';
    menuGlossaryBoxDescriptionElement.id = 'testexMenuGlossaryBoxDescription';
    
  } catch (ex) { alert("createGlossaryMenuDiv(): " + ex); }
}


