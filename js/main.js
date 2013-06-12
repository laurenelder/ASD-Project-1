// Devin "Lauren" Elder
// ASD Term 1306
// ASD Application
// 06/03/2013

$('#homePage').on('pageinit', function() {
	$('#SecurityPage').click(function() {
		resetFields();
	});

	$('#displayBugIn').click(function() {
		displayData("Bug In");
		$("#resultsHeader").html("Displaying Bug In Preps...");
	});
	$('#displayBugOut').click(function() {
		displayData("Bug Out");
		$("#resultsHeader").html("Displaying Bug Out Preps...");
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
		var dButton = $(this).data("key");
		deleteItem(dButton);
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
			dataType: 'json',
			success : function(data, textStatus) {
				for (var n in data) {
					var id = Math.floor(Math.random() * 1000001);
					window.localStorage.setItem(id, JSON.stringify(data[n]));
				};
				alert("IT WORKS!!")
				console.log(textStatus);
			}
		});
		return false;
	});
	$('#addXML').click(function() {
		$.ajax({
			url		: 'xhr/data.xml',
			type 	: 'GET',
			dataType: 'xml',
			success : function(data, textStatus) {
				console.log(data);
				console.log(textStatus);
			}
		});
		return false;
	});
	$('#').click(function() {

	});
});

// Global Variables
var bugIn = "";
var bugOut = "";

// Clear Fields Function
var resetFields = function() {
	$('#securityForm')[0].reset();
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

// Display Data Function
var displayData = function(cat) {
	if (window.localStorage.length === 0) {
		alert("There are no preps to display.");
	}
	$(".results").empty();
	for (var i = 0, j = window.localStorage.length; i < j; i++) {
		$(".results").append("<br/>");
		var key = window.localStorage.key(i);
		var value = window.localStorage.getItem(key);
		var obj = JSON.parse(value);
		var liID = "" + (i) + "";
		var ulID = "" + key + "";
		$(".results").append("<li id=" + liID + "></li>");
		$("#" + liID + "").append("<ul id=" + ulID + "></ul>");
		console.log(key);
		if (obj.secSitBI[1] == "Yes" && cat == "Bug In" || obj.secSitBO[1] == "Yes" && cat == "Bug Out" || obj.secSitBI[1] == "Yes" && obj.secSitBO[1] == "Yes") {
			var content = "";
			for (var n in obj) {
				content += "<li>";
				content += obj[n][0] + " " + obj[n][1];
				content += "</li>";
			};
			$("#" + ulID + "").append(content);
			$("#" + ulID + "").append(
				"<li><a href='#securityPage' data-role='button' data-key='" + ulID + "' class='edit'>Edit Prep</a></li>" 
				+ 
				"<li><a href='#homePage' data-role='button' data-key='" + ulID + "' class='delete'>Delete Prep</a></li>"
			);
		}
	};
};

// Delete Item Function
var deleteItem = function(dButton) {
	var ask = confirm("Delete Prep?");
	if (ask) {
		window.localStorage.removeItem(dButton);
		alert("Prep Deleted");
	} else {
		alert("Prep Not Deleted")
	}
};

// Edit Item Function




