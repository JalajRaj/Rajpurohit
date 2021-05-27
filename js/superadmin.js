serverURL = serverURL + "S/"+localStorage.getItem("i_userType")+"/";





function closePopup(){
	$("#lodaingModal").modal('hide');
}
function saveNotesInfo(obj){
	$(obj).attr('value', "Please wait..");
	$(obj).attr('disabled',true);
	var map = {};
	map["omsg"] = $("#offerNotes").val();
	map["smsg"] = $("#contactNotes").val();
	map["token"]=localStorage.getItem("i_token");
	$.ajax({
		type: 'POST',
		url: serverURL + "updateNotes",
		data: JSON.stringify(map),
		success: function (response) {
			alert(response);
			$(obj).attr('value', "Save Notes");
			$(obj).attr('disabled',false);
		},
		error: function (response) {
			alert("Error unable to deleting Admin User "+response);
			checkErrorResp(response);
			
		}
	});	
return false;
}
function initOfferNotes(){
	$.ajax({
		type: 'POST',
		url: serverURL.substr(0,60)+"C/C/getofferNote",
		success: function (response) {	
			$("#offerNotes").val($(response)[0]);
			$("#contactNotes").val($(response)[1]);				
		},
		error: function (response) {
		}
	});
}