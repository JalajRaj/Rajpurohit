
var myPath="../";
if(document.getElementById("myConfigLib") != null){
	myPath="";
}

var footerSection =  '<footer class="container-fluid" style="margin-top:130px;padding-top:80px" id="gtco-footer">'+
    '<div class="container">'+
        '<div class="row">'+
            '<div class="col-lg-6" id="contact">'+
                '<h4> Contact Us </h4>'+
                '<input type="text" id="name" class="form-control" placeholder="Full Name">'+
                '<input type="email" id="email" class="form-control" placeholder="Email Address">'+
                '<input type="text" id="phone" class="form-control" placeholder="Phone Number">'+
                '<textarea class="form-control" id="message" placeholder="Message"></textarea>'+
                '<a href="javascript:void(0);" onclick="return sendMessageFooter(this)" class="submit-button">Send Message <i class="fa fa-angle-right" aria-hidden="true"></i></a>'+
            '</div>'+
            '<div class="col-lg-6">'+
                '<div class="row">'+
                    '<div class="col-6">'+
                        '<h4>Location</h4>'+
                        '<ul class="nav flex-column services-nav">'+
                            '<li class="nav-item"><a class="nav-link" href="#">Rajpurohit Dharmashala, Ratlam (M.p.) </a></li>'+
                        '</ul>'+
                    '</div>'+
                   
                '</div>'+
            '</div>'+
        '</div>'+
		'<div class="col-12">'+
			'<p>All Rights Reserved. Design by - Jalaj Rajpurohit</p>'+
		'</div>'+
    '</div>'+
'</footer>';


var header = "";

	header = '<nav class="navbar navbar-expand-lg navbar-light bg-light bg-transparent" id="gtco-main-nav" >'+
			'<div class="container"><a href="index.html" class="navbar-brand"><img src="images/RajpurohitLogo.png" width=215 height="50" alt="" ></a>  '+
				'<button class="navbar-toggler" data-target="#my-nav" onclick="myFunction(this)" data-toggle="collapse" style="background-color: #01e6f8;"><span '+
						'class="bar1"></span> <span class="bar2"></span> <span class="bar3"></span></button>'+
			'</div>'+
		'</nav>';	
$("#topHeadersection").html(header);		
$("#footersection").html(footerSection);
 
function logout(){
	localStorage.removeItem('i_data');
	localStorage.removeItem('i_token');
	localStorage.removeItem('i_userType');
	localStorage.removeItem('i_username');
	localStorage.removeItem('i_area');
	location.href="login.html";
}
function sendMessageFooter(obj){
	if($("#name").val() == ""){
		alert("Please enter Full Name");
		return false;
	}
	if($("#email").val() == ""){
		alert("Please enter Email ID");
		return false;
	}
	if($("#phone").val() == ""){
		alert("Please enter Phone No");
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
		map["emailid"] = $("#email").val();
		map["phone"] = $("#phone").val();
		map["message"] = $("#message").val();
	$.ajax({
			type: 'POST',
			data: JSON.stringify(map),
			url: serverURL.substr(0,serverURL.length -4)+"C/C/sendFooterMsg",
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


function checkErrorResp(resp){	
	if(resp.responseJSON.startsWith("Fail")){
		alert("Your session has been expire, Please login");
		logout();
	}
}