var serverURL="https://6azqonbehd.execute-api.ap-south-1.amazonaws.com/dev/rajpurohit/"
checkHttpReq()
function checkHttpReq(){	
	if (location.protocol == 'http:'){
	  location.href = location.href.replace("http","https");
	}
}
var folder="UsersPhoto";
var isedit=false;
function saveCustData(obj){

	if($("[name='name']").val() == '' ){
		alert('Please enter your Name.');
		$("[name='name']").focus()
		return false;
		}
		
	if($("[name='fname']").val() == '' ){
		alert('Please enter your Father Name.');
		$("[name='fname']").focus()
		return false;
		}
	if($("[name='address']").val() == '' ){
		alert('Please enter your Home Address.');
		$("[name='address']").focus()
		return false;
		}
	if($("[name='city']").val() == '' ){
		alert('Please enter your Cities/Towns/Villages name.');
		$("[name='city']").focus()
		return false;
		}
	if($("[name='gotra']").val() == '' ){
		alert('Please enter a Gotra name.');
		$("[name='gotra']").focus()
		return false;
		}
	if($("[name='age']").val() == '' ){
		alert('Please enter your DOB.');
		$("[name='age']").focus()
		return false;
		}
	if($("[name='mobile']").val() == '' ){
		alert('Please enter 10 digit Phone/Mobile Number.');
		$("[name='mobile']").focus()
		return false;
		}
	if(checkExistNameMobile($("[name='mobile']").val(),$("[name='name']").val())){
		return false;
	}
	if($("[name='occupation']").val() == -1 ){
		alert('Please Select Occupation.');
		$("[name='occupation']").focus()
		return false;
		}
	if($("[name='ageGroup']").val() == -1 ){
		alert('Please Select Age Group.');
		$("[name='ageGroup']").focus()
		return false;
		}
	if($("[name='vaccinationstatus']").val() == -1 ){
		alert('Please Select Vaccination status.');
		$("[name='vaccinationstatus']").focus()
		return false;
		}	

		

	$(obj).attr('onclick', "");
	$(obj).html('Please Wait....<i class="fa fa-angle-right" aria-hidden="true"></i>');
	
	$.ajax({
			type: 'POST',
			data:'{"mobile":"' + $("[name='mobile']").val() + '"}',
			url: serverURL + "raj_generateOTP",
			success: function (response) {	
				if("Y" == response){
					oTPSend($("[name='mobile']").val(),obj);
				}else{
					alert("Error while Sending OTP");
					$(obj).attr('onclick', "saveCustData(this)");
					$(obj).html('Save <i class="fa fa-angle-right" aria-hidden="true"></i>');
				}
			},
			error: function (response) {
				alert("Error while Login "+response);
				checkErrorResp(response);
				location.reload();
			}
		});	
}

function oTPSend(mobile,obj){
	var otp = prompt("Please enter OTP Send to Mobile No. "+mobile);
	 if (otp != null) {	
		verifyOTPandSave(obj,otp,mobile);
	 }else{
		 $(obj).attr('onclick', "saveCustData(this)");
		 $(obj).html('Save <i class="fa fa-angle-right" aria-hidden="true"></i>');
	 }
}

function verifyOTPandSave(obj,otp,mobile){
	$(obj).attr('onclick', "");
	$(obj).html('Please Wait....<i class="fa fa-angle-right" aria-hidden="true"></i>');
	
	var custPic="";	
	if($("#custPic-image").attr('src') != undefined && $("#custPic-image").attr('src') != ""){
		custPic = $("#custPic-image").attr('src').split(',')[1];
	}
	var map = getFormData($("#formDataid"));
	map["otp"]=otp;
	map["custPic"]=custPic;
	$.ajax({
			type: 'POST',
			data: JSON.stringify(map),
			url: serverURL + "raj_saveCustData",
			success: function (response) {	
				if(response.startsWith("Sorry!")){
					alert(response);	
					oTPSend(mobile,obj)
				}else{
					alert(response);
					location.reload();
				}				
			},
			error: function (response) {
				alert("Error while Login "+response);
				
			}
		});		
}

function fetchAllCustInfo(){
	$.ajax({
		type: 'POST',
		url: serverURL + "raj_fetchAllDetails",
		success: function (response) {
			$("#displayTableDetails tbody").empty();
			console.log(response)
			folder="UsersPhoto";
			$(response).each(function(i,obj){				
					var tr="<tr data-mobile='"+$(obj).attr('mobile')+"' data-name='"+$(obj).attr('name')+"'><td data-type='number'><a href='javascript:void(0)' data-id="+$(obj).attr('id')+" onClick='getCustDetails(this)'>"+(++i)+"</a></td><td>"+$(obj).attr('name')+" "+$(obj).attr('fname')+"<br>Gotra: "+$(obj).attr('gotra')+"</td><td>"+$(obj).attr('mobile')+"</td><td>"+$(obj).attr('address')+" City: "+$(obj).attr('city')+"</td><td>Age: "+$(obj).attr('age')+"<br>Gender: "+$(obj).attr('gender')+"</td><td>Email: "+$(obj).attr('email')+"<br>Occupation: "+$(obj).attr('occupation')+"<br>Qualification: "+$(obj).attr('qualification')+"</td><td>Age Group: "+$(obj).attr('ageGroup')+"<br>VaccinationStatus: "+$(obj).attr('vaccinationstatus')+"</td><td>FundSubmitdate: "+$(obj).attr('fundSubmitdt')+"<br>Submit Fund: "+$(obj).attr('submitFund')+"</td><td>"+$(obj).attr('remark')+"</td></tr>";
					$("#displayTableDetails tbody").append(tr);	
			});
			
			$("#loadingdiv").hide();
		},
		error: function (response) {
			alert("Error while updating data "+response);
			checkErrorResp(response);
		}
	});	
}

function getCustDetails(obj){
	var map={};
	map["id"]=$(obj).attr('data-id');
	fetchImageDetails($(obj).attr('data-id'),'image-sec');
			//$("[name='mobile']").disabled = true
			//alert("disable Mobile number:");
	$.ajax({
		type: 'POST',
		data: JSON.stringify(map),
		url: serverURL + "raj_fetchCustDetails",
		success: function (response) {			
			console.log(response);
			for (var key in response) {
			  if (response.hasOwnProperty(key)) {
				$("[name='"+key+"']").val(response[key]);
			  }
			}
			isedit = true;
			$("html, body").animate({ scrollTop:  $("#contact").offset().top }, "slow");

		},
		error: function (response) {
			alert("Error while updating data "+response);
		}
	});	
}


function getMap(){
	$.ajax({
		type: 'POST',
		url: serverURL + "raj_Map",
		success: function (response) {
			console.log(response);
			
		},
		error: function (response) {
			alert("Error while updating data "+response);
		}
	});	
}

   function fetchImageDetails(custid,divClass){
		$("."+divClass+"-cust").append('<i class="fa fa-refresh fa-spin " style="font-size: 81px;color: #2e6da4;"></i>');
		$("."+divClass+"-cust").find('img').attr('src','data:image/png;base64,');
		var map= {};
		map["id"]=custid;
		map["folder"]=folder;
        $.ajax({
            type: "POST",
            url: serverURL +"raj_downloadPic",
            data: JSON.stringify(map),
            success: function (response) {
				$("."+divClass+"-cust").find('.fa-refresh').remove();
                $("."+divClass+"-cust").find('img').attr('src','data:image/png;base64,'+response);  
            },
            error: function (e) {
                alert(e);
            }
        });
    }

function resizeCustPic(){
		resizeImageToSpecificWidth("custPic",input2);
}
function resizeImageToSpecificWidth(imgPath,myInput) {
		var width = 200;
        if (myInput.files && myInput.files[0]) {
            var reader = new FileReader();
            reader.onload = function(event) {
                var img = new Image();
                img.onload = function() {
                    if (img.width > width) {
                        var oc = document.createElement('canvas'), octx = oc.getContext('2d');
                        oc.width = img.width;
                        oc.height = img.height;
                        octx.drawImage(img, 0, 0);
                        while (oc.width * 0.5 > width) {
                            oc.width *= 0.5;
                            oc.height *= 0.5;
                            octx.drawImage(oc, 0, 0, oc.width, oc.height);
                        }
                        oc.width = width;
                        oc.height = oc.width * img.height / img.width;
                        octx.drawImage(img, 0, 0, oc.width, oc.height);
						$(".fa-refresh").remove();
                        document.getElementById(imgPath+"-image").src = oc.toDataURL();
                    }
                };
                document.getElementById(imgPath+"-orignal").src = event.target.result;
                img.src = event.target.result;
            };
            reader.readAsDataURL(myInput.files[0]);
        }
    }


	function sendMessageFooter(obj){
		if($("#name").val() == ""){
			alert("Please enter Full Name");
			return false;
		}
		
		if($("#mobile").val() == ""){
			alert("Please enter Mobile No");
			return false;
		}
		if($("#message").val() == ""){
			alert("Please enter Message");
			return false;
		}
		$(obj).attr('onclick', "");
		$(obj).html('Please Wait....<i class="fa fa-angle-right" aria-hidden="true"></i>');
		var map = {};
			map["name"] = $("#name").val();
			map["mobile"] = $("#mobile").val();
			map["message"] = $("#message").val();
		$.ajax({
				type: 'POST',
				data: JSON.stringify(map),
				url: serverURL + "raj_saveSentMsg",
				success: function (response) {					
					alert(response);
					$(obj).attr('onclick', "return sendMessageFooter(this)");
					$(obj).html('Send Message<i class="fa fa-angle-right" aria-hidden="true"></i>');
				},
				error: function (response) {
					alert("Error "+response);
					location.reload();
				}
			});	
			return false;
	}


	function fetchFeedbackSugInfo(){

		var password = prompt("Please enter Password. ");
	 		if (password != null) {	
				var map = {};
				map["password"]=password;
	 
		$.ajax({
			type: 'POST',
			data: JSON.stringify(map),

			url: serverURL + "raj_fetchFeedbackSugInfo",
			success: function (response) {
				if(typeof response=="string"){
					alert(response);
					location.reload();
				}else{
						$("#displayTableDetails tbody").empty();
						console.log(response)
						$(response).each(function(i,obj){				
								var tr="<tr><td>"+(++i)+"</td><td>"+$(obj).attr('name')+"</td><td>"+$(obj).attr('mobile')+"</td><td>"+$(obj).attr('message')+"</td><td>"+$(obj).attr('dateTime')+"</td></tr>";
								$("#displayTableDetails tbody").append(tr);	
						});
						
						$("#loadingdiv").hide();
					}

			},
			error: function (response) {
				alert("Error while updating data "+response);
				checkErrorResp(response);
			}
		});	
	}else{
		//fetchFeedbackSugInfo()
		location.href = "index.html"
	}

	}

	function checkExistNameMobile(mobileNo,name){
		if(!isedit){
		  var result = false;
		  $('#displayTableDetails tbody tr').each(function(i,obj){
			  if($(obj).attr('data-mobile').trim() == mobileNo.trim() && $(obj).attr('data-name').toUpperCase().trim() == name.toUpperCase().trim()){
				  alert("Data for "+mobileNo+" and name already exists at row no "+(++i));
				  result = true;
			  }		
		  });
		  return result;
		}
	  }


	  var isedit=false;
function saveMatrimonyData(obj){

	if($("[name='gender']").val() == -1 ){
		alert('Please Select Mr. / Miss.');
		$("[name='gender']").focus()
		return false;
		}

		if($("[name='name']").val() == '' ){
		alert('Please enter your Name.');
		$("[name='name']").focus()
		return false;
		}
	
		if($("[name='mobile']").val() == '' ){
			alert('Please enter 10 digit Phone/Mobile Number.');
			$("[name='mobile']").focus()
			return false;
			}
		if(checkExistNameMobile($("[name='mobile']").val(),$("[name='name']").val())){
			return false;
		}

	if($("[name='fname']").val() == '' ){
		alert('Please enter your Father Name.');
		$("[name='fname']").focus()
		return false;
		}
		
	if($("[name='mname']").val() == '' ){
			alert('Please enter your Mother Name.');
			$("[name='mname']").focus()
			return false;
			}

	if($("[name='address']").val() == '' ){
		alert('Please enter your Home Address.');
		$("[name='address']").focus()
		return false;
		}
	if($("[name='city']").val() == '' ){
		alert('Please enter your Cities/Towns/Villages name.');
		$("[name='city']").focus()
		return false;
		}
	if($("[name='gotra']").val() == '' ){
		alert('Please enter a Gotra name.');
		$("[name='gotra']").focus()
		return false;
		}
	if($("[name='age']").val() == '' ){
		alert('Please enter your DOB.');
		$("[name='age']").focus()
		return false;
		}
	
	if($("[name='time']").val() == '' ){
		alert('Please enter your DOB Time.');
		$("[name='time']").focus()
		return false;
		}

	$(obj).attr('onclick', "");
	$(obj).html('Please Wait....<i class="fa fa-angle-right" aria-hidden="true"></i>');
	
	$.ajax({
			type: 'POST',
			data:'{"mobile":"' + $("[name='mobile']").val() + '"}',
			url: serverURL + "raj_generateOTP",
			success: function (response) {	
				if("Y" == response){
					oTPSendMatrimony($("[name='mobile']").val(),obj);
				}else{
					alert("Error while Sending OTP");
					$(obj).attr('onclick', "saveMatrimonyData(this)");
					$(obj).html('Save <i class="fa fa-angle-right" aria-hidden="true"></i>');
				}
			},
			error: function (response) {
				alert("Error while Login "+response);
				checkErrorResp(response);
				location.reload();
			}
		});	
}

function getMatrimonyDetails(obj){
	var map={};
	map["id"]=$(obj).attr('data-id');
	fetchImageDetails($(obj).attr('data-id'),'image-sec');
			//$("[name='mobile']").disabled = true
			//alert("disable Mobile number:");
	$.ajax({
		type: 'POST',
		data: JSON.stringify(map),
		url: serverURL + "raj_fetchMatrimonyDetails",
		success: function (response) {			
			console.log(response);
			for (var key in response) {
			  if (response.hasOwnProperty(key)) {
				$("[name='"+key+"']").val(response[key]);
			  }
			}
			isedit = true;
			$("html, body").animate({ scrollTop:  $("#contact").offset().top }, "slow");

		},
		error: function (response) {
			alert("Error while updating data "+response);
		}
	});	
}

function fetchAllMatrimonyInfo(){
	$.ajax({
		type: 'POST',
		url: serverURL + "raj_fetchAllMDetails",
		success: function (response) {
			$("#displayTableDetails tbody").empty();
			console.log(response)
			folder="UsersMPhoto";
			$(response).each(function(i,obj){				
					var tr="<tr data-mobile='"+$(obj).attr('mobile')+"' data-name='"+ $(obj).attr('name')+"'><td data-type='number'><a href='javascript:void(0)' data-id="+$(obj).attr('id')+" onClick='getMatrimonyDetails(this)'>"+(++i)+"</a></td><td>"+$(obj).attr('gender')+ " " +$(obj).attr('name')+"<br>Gotra: "+$(obj).attr('gotra')+"</td><td>"+$(obj).attr('mobile')+"<br> "+$(obj).attr('email')+"</td><td>"+"Father: "+$(obj).attr('fname')+"<br> Mother: "+$(obj).attr('mname')+"</td><td> Address: " + $(obj).attr('address')+" City: "+$(obj).attr('city')+"</td><td>DOB: " + $(obj).attr('age')+"<br>Time: "+ $(obj).attr('time')+"</td><td>Height: "+$(obj).attr('height')+"<br>Weight: "+$(obj).attr('weight')+"</td><td>Education: "+$(obj).attr('qualification')+"<br>Job: "+$(obj).attr('job')+"</td><td>"+$(obj).attr('remark')+"</td></tr>";
					$("#displayTableDetails tbody").append(tr);	
			});
			
			$("#loadingdiv").hide();
		},
		error: function (response) {
			alert("Error while updating data "+response);
			checkErrorResp(response);
		}
	});	
}


function oTPSendMatrimony(mobile,obj){
	var otp = prompt("Please enter OTP Send to Mobile No. "+mobile);
	 if (otp != null) {	
		verifyOTPandSaveMatrimony(obj,otp,mobile);
	 }else{
		 $(obj).attr('onclick', "saveMatrimonyData(this)");
		 $(obj).html('Save <i class="fa fa-angle-right" aria-hidden="true"></i>');
	 }
}

function verifyOTPandSaveMatrimony(obj,otp,mobile){
	$(obj).attr('onclick', "");
	$(obj).html('Please Wait....<i class="fa fa-angle-right" aria-hidden="true"></i>');

	var custPic="";	
	if($("#custPic-image").attr('src') != undefined && $("#custPic-image").attr('src') != ""){
		custPic = $("#custPic-image").attr('src').split(',')[1];
	}
	var map = getFormData($("#formDataid"));
	map["otp"]=otp;
	map["custPic"]=custPic;
	$.ajax({
			type: 'POST',
			data: JSON.stringify(map),
			url: serverURL + "raj_saveMatrimonyData",
			success: function (response) {	
				if(response.startsWith("Sorry!")){
					alert(response);	
					oTPSendMatrimony(mobile,obj)
				}else{
					alert(response);
					location.reload();
				}				
			},
			error: function (response) {
				alert("Error while Login "+response);
				
			}
		});		
}
