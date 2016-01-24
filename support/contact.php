<?php
	function spamcheck($field) {
		//filter_var() sanitizes the e-mail 
		//address using FILTER_SANITIZE_EMAIL
		$field=filter_var($field, FILTER_SANITIZE_EMAIL);
  	
 	 	//filter_var() validates the e-mail
		//address using FILTER_VALIDATE_EMAIL
		if(filter_var($field, FILTER_VALIDATE_EMAIL)) {
			return TRUE;
    	} else {
    		return FALSE;
    	}
	} // end spamcheck function	
	
// verify all fields are filled in
if (isset($_POST['name'] && isset($_POST['email'] && isset($_POST['subject'] && isset($_POST['message']) {
	// all items filled out
	// verify email
	$mailcheck = spamcheck($_POST['email']);
	if ($mailcheck==FALSE) {
		echo "Please enter a valid email address.";
    }
    else { //send email
    		$messagebr = $_POST['message']; 
			$message = strip_tags($messagebr, '<div><cite><blockquote><script><a><b><i><u><img><br><br><strong><em><ul><li><ol><strike><p>');
			$to      = 'mbciarlo@gmail.com';
			$subject = 'Doo: ' . $_POST['subject'] ;
    		$name = $_POST['name'] ;
    		$email = $_POST['email'] ; 
    		$headers = "From: $name <$email>" . "\r\n" .
    		'Reply-To: ' . $email . "\r\n" .
    		'X-Mailer: PHP/' . phpversion();

			mail($to, $subject, $message, $headers); 
			header("Location: ../contact/thanks.html");
			exit();

		}
}
else {
echo "<form id='contactUs' action='form.php' method='post'>
				<ul class='contact_form'>
					<li>Name</li>
					<li><input id='name' class='{validate:{required:true}}' name='name' value='' type='text' /></li>
					<li>Email</li>
					<li><input id='email' class='{validate:{required:true}}' name='email' value='' type='text' /></li>
					<li>Subject</li>
					<li>
					<select  id='subject' name='subject' class='{validate:{required:true}}'>
						<option value='' selected='selected'>Please select...</option>
						<option label='General Inquiry' value='General Inquiry'>General Inquiry</option>
						<option label='Press Inquiry' value='Press Inquiry'>Press Inquiry</option>
						<option label='Account Issues' value='Account Issues'>Account Issues</option>
						<option label='Advertising' value='Advertising'>Advertising</option>
						<option label='Report a Problem' value='Report a Problem'>Report a Problem</option>
					</select>
					</li>
					<li>Human Check: What is 3 + 7 ?</li>
					<li><input id='spamCheck' class='{validate:{required:true}}' name='spamCheck' value='' type='text' /></li>
					 <li>Message</li>
					<li><textarea class='{validate:{required:true}}' name='message' rows='1' cols='1'></textarea></li>
					<li>
					  <input value='' id='contactSubmit' type='submit'/>

					</li>
				</ul>
				</form>";
		}
		
?>