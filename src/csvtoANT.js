var XMLData = '<?xml version="1.0" encoding="UTF-8"?>\n'+
				'<Package xmlns="http://soap.sforce.com/2006/04/metadata">\n';	
var manifestMap = {};
var typeRowNum = 0;
var manifestNameRowNum = 0;

 window.onload = function() {
	var fileInput = document.getElementById('fileInput');
	fileInput.addEventListener('change', function(e) {
		var file = fileInput.files[0];
		var reader = new FileReader();
		reader.onload = function(e) {
			successFunction(reader.result);
		}
		reader.readAsText(file);  
	});
}

function addValueToKey(key, value) {
  manifestMap[key] = manifestMap[key] || [];
  manifestMap[key].push(value);
}

function successFunction(data) {
  var allRows = data.split(/\r?\n|\r/);
  var table = '<table border="1">';
  for (var singleRow = 0; singleRow < allRows.length; singleRow++) {
	if (singleRow === 0) {
	  table += '<thead>';
	  table += '<tr>';
	} else {
	  table += '<tr>';
	}
	var rowCells = allRows[singleRow].split(',');
	
	var typeData = '';
	var manifestNameData = '';

	for (var rowCell = 0; rowCell < rowCells.length; rowCell++) {
	  if (singleRow === 0) {
		table += '<th>';
		table += rowCells[rowCell];
		table += '</th>';
					
		if(rowCells[rowCell] == '"Type"') {
			typeRowNum = rowCell;
		}else if(rowCells[rowCell] == '"Manifest Item Name"') {
			manifestNameRowNum = rowCell;
		}
		
		
	  } else {
		table += '<td>';
		table += rowCells[rowCell];
		table += '</td>';
		
		if(rowCell == typeRowNum) {
			typeData = rowCells[rowCell].substr(1).slice(0, -1);
		}else if(rowCell == manifestNameRowNum) {
			manifestNameData = rowCells[rowCell].substr(1).slice(0, -1);
		}
		
	}
}
	
addValueToKey(typeData,manifestNameData);
	if (singleRow === 0) {
	  table += '</tr>';
	  table += '</thead>';
	  table += '<tbody>';
	} else {
	  table += '</tr>';
	}
  } 
  table += '</tbody>';
  table += '</table>';
   
  makeXML();
  XMLData = XMLData+ '<version>44.0</version>\n'+'</Package>';
  
  $('.xmlData').val(XMLData);
  $('.tableData').append(table);
}

function makeXML() {
	for( var i in manifestMap){	
    XMLData = XMLData+ '\t<types>\n';
      for( var itm in manifestMap[i]){
        XMLData = XMLData+ '\t\t<members>'+manifestMap[i][itm]+'</members>\n';
      }
    XMLData = XMLData+ '\t\t<name>'+i+'</name>\n';		
    XMLData = XMLData+ '\t</types>\n';	
	}
}
