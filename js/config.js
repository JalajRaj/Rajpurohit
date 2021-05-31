
var myPath="../";
if(document.getElementById("myConfigLib") != null){
	myPath="";
}

var marquee =  '<marquee  style= "background-color:hsl(0, 92%, 50%); color:white ;  font-size:20px" height="40px"> '+
			   ' वेबसाइट / डाटा एंट्री में किसी भी तरह की मदद के लिए 9827062335, 9907231249, 9820684534 पर संपर्क करें या व्हाट्सएप करें। '+
				'</marquee>';

var footerSection =  '<footer class="container-fluid" style="margin-top:130px;padding-top:80px" id="gtco-footer">'+
    '<div class="container">'+
        '<div class="row">'+
            '<div class="col-lg-6" id="contact">'+
                '<h4> Contact Us </h4>'+
                '<input type="text" id="name" class="form-control" maxlength="15"placeholder="Full Name">'+
                '<input type="text" id="mobile" class="form-control"  maxlength="10"placeholder="Mobile Number">'+
                '<textarea class="form-control" id="message" maxlength="140" placeholder="Message"></textarea>'+
                '<a href="javascript:void(0);" onclick="return sendMessageFooter(this)" class="submit-button">Send Message <i class="fa fa-angle-right" aria-hidden="true"></i></a>'+
            '</div>'+
            '<div class="col-lg-6">'+
                '<div class="row">'+
                    '<div class="col-6">'+
                        '<h4>Location</h4>'+
                        '<ul class="nav flex-column services-nav">'+
                            '<li class="nav-item"><a class="nav-link" href="#">Rajpurohit Dharmashala, Ratlam (M.P.) </a></li>'+
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
			'<div class="container"><a href="index.html" class="navbar-brand"><img src="images/RPLogo.png" width=215 height="50" alt="" ></a>  '+
				'<button class="navbar-toggler" data-target="#my-nav" onclick="myFunction(this)" data-toggle="collapse" style="background-color: #01e6f8;"><span '+
						'class="bar1"></span> <span class="bar2"></span> <span class="bar3"></span></button>'+
			'</div>'+
		'</nav>';	
$("#topHeadersection").html(header);		
$("#footersection").html(footerSection);
$("#marquee").html(marquee);
 
function logout(){
	localStorage.removeItem('i_data');
	localStorage.removeItem('i_token');
	localStorage.removeItem('i_userType');
	localStorage.removeItem('i_username');
	localStorage.removeItem('i_area');
	location.href="login.html";
}



function checkErrorResp(resp){	
	if(resp.responseJSON.startsWith("Fail")){
		alert("Your session has been expire, Please login");
		logout();
	}
}