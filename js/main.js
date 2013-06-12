// Devin "Lauren" Elder
// ASD Term 1306
// ASD Application
// 06/03/2013

$('#homePage').on('pageinit', function() {
	$('#SecurityPage').click(function() {
		resetFields();
	});

	$('#displayBugIn').click(function() {
		displayData("Bug In", "bugInResults");
	});
	$('#displayBugOut').click(function() {
		displayData("Bug Out", "bugOutResults");
	});
	$('#').click(function() {

	});
});

$('#securityPage').on('pageinit', function() {
	$('#SecurityPage').click(function() {
		resetFields();
	});
	$('#securitySubmit').click(function() {
		storeData();
	});
});

$('#bugInSetup').on('pageinit', function() {
	$('#SecurityPage').click(function() {
		resetFields();
	});
	$('#clearLoc1').click(function() {
		clearStorage();
	});
	$('.edit').click(function() {

	});
	$('.delete').click(function() {
		deleteItem();
	});
});

$('#bugOutSetup').on('pageinit', function() {
	$('#SecurityPage').click(function() {
		resetFields();
	});
	$('#clearLoc2').click(function() {
		clearStorage();
	});
	$('#').click(function() {

	});
	$('#').click(function() {

	});
});

$('#aboutPage').on('pageinit', function() {
	$('#SecurityPage').click(function() {
		resetFields();
	});
	$('#addJSON').click(function() {
		$.ajax({
			url		: 'xhr/data.json',
			type 	: 'GET',
			dataType: 'jsonp',
			success : function(response) {
				console.log(response);
			}
		});
		return false;
	});
	$('#addXML').click(function() {
		xmlFillLocal();
	});
	$('#').click(function() {

	});
});

// Global Variables
var bugIn = "";
var bugOut = "";

// Clear Fields Function
var resetFields = function() {
	$(":input").not(":radio :checkbox").val("");
	$(":checked").prop("checked", false);
	$(":checkbox").val("No");
	$(":selected").prop("selected", false);
	//$(":radio").each().prop("selected", false);
	//$("#dflt").attr("selected", "selected");
};

// Clear Local Storage Function
var clearLocal = function() {
	window.localStorage.clear();
	alert("All preps deleted.");
	return false;
};
var clearStorage = function() {
	if (window.localStorage.length === 0) {
		alert("There is no data to clear.");
	} else {
		var ask = confirm("Delete all preps?");
		if (ask) {
			clearLocal()
		} else {
			alert("Preps not deleted.");
		}
	}
};

// Auto Fill Local Storage Function
var jsonFillLocal = function() {
	$.ajax({
		url		: "xhr/json.js",
		type 	: "GET",
		dataType: "json",
		success : function(data, status) {
			console.log(status, data);
			alert("Data Stored!");
		}
	});
};
var xmlFillLocal = function() {
	$.ajax({
		url		: "data/data.xml",
		type 	: "GET",
		dataType: "xml",
		success : function(data, status) {
			console.log(staus, data);
		}
	});
};

// Store Data Function
var storeData = function(key) {
	if (!key) {
		var id				= Math.floor(Math.random() * 1000001);
	} else {
		var id = key;
	}
	$(":input:checkbox:checked").val("Yes");
	var	item					= {};
	item.secSitBI				= ["Bug In Weapon: ", $("#secSitBI").val()];
	item.secSitBO				= ["Bug Out Weapon: ", $("#secSitBO").val()];
	item.securityWeaponType		= ["Weapon Type: ", $("#securityWeaponType").val()];
	item.securityManufacturer	= ["Manufacturer: ", $("#securityManufacturer").val()];
	item.securityModel			= ["Model: ", $("#securityModel").val()];
	item.securityCaliber		= ["Caliber: ", $("#securityCaliber").val()];
	item.securityAmmo			= ["Amount of Ammo: ", $("#securityAmmo").val()];
	item.securityPod			= ["Has Bipod/Tripod: ", $("#securityPod").val()];
	item.securityScope			= ["Has Scope: ", $("#securityScope").val()];
	item.securityRedDot			= ["Has Red-Dot Sight: ", $("#securityRedDot").val()];
	item.securityLaser			= ["Has Laser: ", $("#securityLaser").val()];
	item.securitySling			= ["Has Sling: ", $("#securitySling").val()];
	item.securityNotes			= ["Notes: ", $("#securityNotes").val()];
	window.localStorage.setItem(id, JSON.stringify(item));
	alert("Prep Saved!")
};

// Make Links Function
var makeLinks = function(key, linksLi) {

	// Edit Link
	var editLink = document.createElement("a");
	editLink.href = "#securityPage";
	editLink.key = key;
	editLink.setAttribute("class", "edit");
	editLink.setAttribute("data-key", key);
	//var editText = "Edit Prep"
	editLink.innerHTML = "Edit Prep";
	linksLi.appendChild(editLink);

	// Break Tag
	var breakTag = document.createElement("br");
	linksLi.appendChild(breakTag);

	// Delete Link
	var deleteLink = document.createElement("a");
	deleteLink.href = "#homePage";
	deleteLink.key = key;
	deleteLink.setAttribute("class", "delete");
	editLink.setAttribute("data-key", key);
	//var deleteText = "Delete User"
	deleteLink.innerHTML = "Delete Prep";
	linksLi.appendChild(deleteLink);
};

// Display Data Function
var displayData = function(cat, elem) {
	if (window.localStorage.length === 0) {
		alert("There are no preps to display.");
	}
	$(".results").empty();
	for (var i = 0, j = window.localStorage.length; i < j; i++) {
		//$(".results").append("<br/>");
		var key = window.localStorage.key(i);
		var value = window.localStorage.getItem(key);
		var obj = JSON.parse(value);
		var makeLi = document.createElement("li");
		console.log(obj);
		var linksLi = document.createElement("li");
		var results = document.getElementById(elem)
		results.appendChild(makeLi);
		var makeSubList = document.createElement("ul");
		makeLi.appendChild(makeSubList);
		console.log(key);
		if (obj.secSitBI[1] == "Yes" && cat == "Bug In" || obj.secSitBO[1] == "Yes" && cat == "Bug Out" || obj.secSitBI[1] == "Yes" && obj.secSitBO[1] == "Yes") {
			for (var n in obj) {
				var makeSubLi = document.createElement("li");
				makeSubList.appendChild(makeSubLi);
				var optSubText = obj[n][0] + " " + obj[n][1];
				makeSubLi.innerHTML = optSubText;
				makeSubList.appendChild(linksLi)
			};
			makeLinks(window.localStorage.key(i), linksLi);
		}
	};
/*
	for (var i = 0, j = window.localStorage.length; i < j; i++) {
		//$(".results").append("<br/>");
		$(".results").append("<li class='makeLi'></li>");
		var key = window.localStorage.key(i);
		var value = window.localStorage.getItem(key);
		var obj = JSON.parse(value);
		$(".makeLi").filter(":last").append("<ul class='makeSubList'></ul>");
		console.log(key);
		if (obj.secSitBI[1] == cat || obj.secSitBO[1] == cat) {
			var content = "";
			for (var n in obj) {
				content += "<li>";
				content += obj[n][0] + " " + obj[n][1];
				content += "</li>";
			};
			$(".makeSubList").filter(":last").append(content);
			$(".makeSubList").filter(":last").append("<li class='linksLi'><a href='#securityPage' class='edit'>Edit Prep</a></li>");
			$(".makeSubList").filter(":last").append("<li><a href='#homePage' class='delete'>Delete Bike</a></li>");
			$(".edit").filter(":last").data("key", key);
			$(".delete").filter(":last").data("key", key);
		}
	};
*/
};

// Delete Item Function
var deleteItem = function() {
	var ask = confirm("Delete Prep?");
	if (ask) {
		var dButton = $(this).data("key")
		window.localStorage.removeItem(dButton);
		alert("Prep Deleted");
	} else {
		alert("Prep Not Deleted")
	}
};

// Edit Item Function




