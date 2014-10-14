(function($){ 

	$(document).ready(function() {

		// globals
		var name;

		$("#name").focus();

		$("#loginButton").on("click", function(event){
			event.preventDefault();

			// get and display user's name
			name = $("[name='name']").val();
			$("#displayName").text(name);

			// add iframe to #chat div to maintain HTTP Push ("Coment") connection to /listen
			$("#chat").append("<iframe style='display:none' src='/listen?name=" + name + "'></iframe>");

			// update the display to show chat form
			$("#login").hide();
			$("#chat").show();
			$("#message").focus();

		});

		$("#sendButton").on("click", function(event){
			event.preventDefault();

			// send user name and message to server
			$.ajax({
				url: "/publish",
				method: "POST",
				data: {"name":name, "message": $("#message").val()},
				// success: function(data) {
				// 	console.log(data);
				// }
			});

			// clear the message field
			$("#message").val("");

		});

	});

})(jQuery);

function addChat(name, message) {
	var chatItem = $("<div></div>");
	chatItem.append("<b>" + name + ": </b>");
	chatItem.append(message);
	$("#chatDisplay").append(chatItem);
}