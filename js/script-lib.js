var serverURL="https://6azqonbehd.execute-api.ap-south-1.amazonaws.com/dev/rajpurohit/"
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
	var map = getFormData($("#formDataid"));
	map["otp"]=otp;
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
			$(response).each(function(i,obj){				
					var tr="<tr><td data-type='number'><a href='javascript:void(0)' data-id="+$(obj).attr('id')+" onClick='getCustDetails(this)'>"+(++i)+"</a></td><td>"+$(obj).attr('name')+" "+$(obj).attr('fname')+"<br>Gotra: "+$(obj).attr('gotra')+"</td><td>"+$(obj).attr('mobile')+"</td><td>"+$(obj).attr('address')+" City: "+$(obj).attr('city')+"</td><td>Age: "+$(obj).attr('age')+"<br>Gender: "+$(obj).attr('gender')+"</td><td>Email: "+$(obj).attr('email')+"<br>Occupation: "+$(obj).attr('occupation')+"<br>Qualification: "+$(obj).attr('qualification')+"</td><td>Age Group: "+$(obj).attr('ageGroup')+"<br>VaccinationStatus: "+$(obj).attr('vaccinationstatus')+"</td><td>FundSubmitdate: "+$(obj).attr('fundSubmitdt')+"<br>Submit Fund: "+$(obj).attr('submitFund')+"<br>FundWithdrawaldate: "+$(obj).attr('fundWithdrawaldt')+"<br>FundWithdrawal: "+$(obj).attr('fundWithdrawal')+"</td><td>"+$(obj).attr('remark')+"</td></tr>";
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