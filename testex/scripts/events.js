
function getEnabled(cb) {
  try {
    chrome.runtime.sendMessage( {msg: "getEnabled"}, function( response) {
      cb(response);
    });
  } catch (ex) {alert("getEnabled():" + ex);};
}

function getWords(cb) {
  
  chrome.runtime.sendMessage( {msg: "getDataWords"}, function( response) {
    cb(response);
  });
}

function getDescription(_id) {
  if (_id)
    chrome.runtime.sendMessage( {msg: "getDataDescription", idw: _id}, function( response) {
      if (response != null) {
        mainDiv.childNodes[0].childNodes[0].childNodes[1].innerText = "Описание: " + response;
      }
    });
}

function getTermIDRubrics(_id, cb) {
  if (_id)
    chrome.runtime.sendMessage( {msg: "getTermIDRubrics", idw: _id}, function( response) {
      if (response != null) {
        cb(response); //JSON.parse(response));
      }
    });
}

function getTermTextRubrics(_text, cb) {
  if (_text)
    chrome.runtime.sendMessage( {msg: "getTermTextRubrics", text: _text}, function( response) {
      if (response != null) {
        cb(response); //JSON.parse(response));
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
  
function getTermIDThesauruses(_id, cb) {
  if (_id)
    chrome.runtime.sendMessage( {msg: "getTermIDThesauruses", idw: _id, ft: 2}, function( response) {
      if (response != null) {
        cb(response);
      }
    });
}
  
function getTermTextThesauruses(_text, cb) {
  if (_text)
    chrome.runtime.sendMessage( {msg: "getTermTextThesauruses", text: _text, ft: 2}, function( response) {
      if (response != null) {
        cb(response);
      }
    });
}
  
function getTTermTThesaurusNormalById(_id, cb) {
  if (_id)
    chrome.runtime.sendMessage( {msg: "getTTermTThesaurusNormalById", idw: _id, lv: 5, ln: 10}, function( response) {
      if (response != null) {
        cb(JSON.stringify(response));
      }
    });
}

function getGTermGGlossaryListByText(_text, cb) {
  if (_text)
    chrome.runtime.sendMessage( {msg: "getGTermGGlossaryListByText", text: _text, ft: 2}, function( response) {
      if (response != null) {
        cb(response);
      }
    });
}

function getGTermGGlossaryDescriptionByID(_id, cb) {
  if (_id)
    chrome.runtime.sendMessage( {msg: "getGTermGGlossaryDescriptionByID", id: _id}, function( response) {
      if (response != null) {
        cb(response);
      }
    });
}



