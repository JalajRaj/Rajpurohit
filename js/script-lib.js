var serverURL="https://a8ok76592i.execute-api.ap-south-1.amazonaws.com/dev/rajpurohit/"
function saveCustData(obj){


	if($("#name").val() == '' ){
		alert('Please enter your Name.');
		$("#name").focus()
		return false;
		}
	if($("#fname").val() == '' ){
		alert('Please enter your Father Name.');
		$("#fname").focus()
		return false;
		}
	}
	if($("#address").val() == '' ){
		alert('Please enter your Home Address.');
		$("#address").focus()
		return false;
		}
	if($("#city").val() == '' ){
		alert('Please enter your Cities/Towns/Villages name.');
		$("#city").focus()
		return false;
		}
	if($("#gotra").val() == '' ){
		alert('Please enter a Gotra name.');
	  $("#gotra").focus()
		return false;
		}
	if($("#age").val() == '' ){
			alert('Please enter your age.');
			$("#age").focus()
			return false;
			}
	if($("#mobile").val() == '' ){
		alert('Please enter 10 digit Phone/Mobile Number.');
		$("#mobile").focus()
		return false;
		}

	
	$(obj).attr('onclick', "");
	$(obj).html('Please Wait....<i class="fa fa-angle-right" aria-hidden="true"></i>');
	$.ajax({
			type: 'POST',
			data: JSON.stringify(getFormData($("#formDataid"))),
			url: serverURL + "raj_saveCustData",
			success: function (response) {	
				if("object" == typeof response){
					alert("User Profile created successfully");	
					
				}else{
					alert(response)
				}
				location.reload();
			},
			error: function (response) {
				alert("Error while Login "+response);
				checkErrorResp(response);
				location.reload();
			}
		});	
}

function getFormData($form){
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function(n, i){
        indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
}

function fetchAllCustInfo(){
	$.ajax({
		type: 'POST',
		url: serverURL + "raj_fetchAllDetails",
		success: function (response) {
			$("#displayTableDetails tbody").empty();
			console.log(response)
			$(response).each(function(i,obj){				
					var tr="<tr><td><a href='javascript:void(0)' onClick='getCustDetails(this)'>"+$(obj).attr('mobile')+"</a></td><td>"+$(obj).attr('name')+" "+$(obj).attr('fname')+"</td><td>"+$(obj).attr('gotra')+"</td><td>"+$(obj).attr('address')+" City: "+$(obj).attr('city')+"</td><td>Age: "+$(obj).attr('age')+"<br>Gender: "+$(obj).attr('gender')+"</td><td>Email: "+$(obj).attr('email')+"<br>Occupation: "+$(obj).attr('occupation')+"</td><td>Age Group: "+$(obj).attr('ageGroup')+"<br>VaccinationStatus: "+$(obj).attr('vaccinationstatus')+"</td><td>FundSubmitdate: "+$(obj).attr('fundSubmitdt')+"<br>Submit Fund: "+$(obj).attr('submitFund')+"<br>FundWithdrawaldate: "+$(obj).attr('fundWithdrawaldt')+"<br>FundWithdrawal: "+$(obj).attr('fundWithdrawal')+"</td><td>"+$(obj).attr('remark')+"</td></tr>";
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
	map["mobile"]=$(obj).html();
	
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
			checkErrorResp(response);
		}
	});	
	
	
}