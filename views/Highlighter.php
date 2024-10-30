<?php	
/*
	Copyright 2010-2012 Highlighter (highlighter.com)
                        Cédric Houbart (cedric@scil.coop)

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License, version 2, as 
    published by the Free Software Foundation.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program; if not, write to the Free Software
    Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/
if($_GET['reset'] == 'widget') {
	update_option('ANNOtype_widgetTitleBarColor', '213C6C');
	update_option('ANNOtype_widgetShellColor', '00112C');
	update_option('ANNOtype_widgetFontColor', 'FFFFFF');
	
?>
<script type='text/javascript'>
	window.location = '<?php echo admin_url('admin.php').'?page=ANNOtype'; ?>';
</script>
<?php
}

if($_GET['reset'] == 'bubble') {
	update_option('ANNOtype_bubbleTitleBarColor', '273a6b');
	update_option('ANNOtype_bubbleShellColor', 'ededed');
	
	update_option('ANNOtype_bubbleSortColor', '10192f');
	update_option('ANNOtype_bubbleSortFontColor', 'FFFFFF');
	
	update_option('ANNOtype_bubbleCommentSepColor', '848484');
	update_option('ANNOtype_bubbleCommentColor', '6E6E6E');
	update_option('ANNOtype_bubbleAltCommentColor', '848484');
	
	update_option('ANNOtype_bubbleButtonColor', '989898');
	update_option('ANNOtype_bubbleButtonFontColor', 'FFFFFF');

	update_option('ANNOtype_bubblePostButtonColor', '1c2a50');
	update_option('ANNOtype_bubblePostButtonFontColor', 'FFFFFF');
	
	update_option('ANNOtype_bubbleFontColor', '1a1a1a');
	update_option('ANNOtype_bubbleLinkColor', '1a1a1a');
	
?>
<script type='text/javascript'>
	window.location = '<?php echo admin_url('admin.php').'?page=ANNOtype'; ?>';
</script>
<?php
}

update_option('ANNOtype_aweber', 'On');
update_option('ANNOtype_mailchimp', 'On');
update_option('ANNOtype_getResponse', 'On');
?>
<div id='ANNOtype'>
	<div id='ANNOtypeHeader'>
		<div id='ANNOtypeLogo'>
			<h1>Highlighter</h1>
		</div>
		<ul id='ANNOtypeNav'>
			<li class='currentTab'><a href='#general'>General</a></li>
			<li><a href='#color'>Appearance</a></li>
			<li><a href='#advanced'>Advanced</a></li>
			<li class='important'><a href='#help'>Help</a></li>
		</ul>
	</div>
	<div id='ANNOtypeTab'>
		
	</div>
	<div id='ANNOtypeOptions'>
		<?php if(get_option('ANNOtype_registerMsg') != 'On'): ?>
		<div class='updated' style='margin: 0; margin-bottom: 15px;'>
			<h3 style='margin: 0.5em 0px;'>Thank you for installing Highlighter!</h3>
			<p>We recommend that the first thing you do is hook up your email list to start collecting emails. Choose from one of the email management providers below!</p>
		</div>
		<?php update_option('ANNOtype_registerMsg', 'On'); ?>
		<?php endif; ?>
		<form action='' method='post'>
		

		
			<div id='general'>
			
			
	<div class="option">
		<div class='email_main'>
	<h3 id='email'>Highlighter Email Collection</h3>
	<p>Perhaps the most beneficial use of Highlighter is its ability to build a targeted email list for you, when your readers use the product. Select your email marketing provider to let Highlighter begin building an email list for you.</p>
	<p><strong>Your email marketing provider</strong> 
		<?php $helper->dropdown('collector', array('select' => 'Select', 'aweber' => 'Aweber', 'mailchimp' => 'Mailchimp', 'getResponse' => 'GetResponse')); ?>
		<a target="_blank" style="margin-left: 10px; font-size: 10px; text-decoration: none" href="http://highlighter.com/email-marketing/">Learn about the top email marketing providers &rarr;</a></p>
	</div>
	</div>
					<hr style='display: none;' />	
					
				
				<h3 style='display: none;' id='emailCollectionSetup'>Email Collection Setup</h3>
				<div class='option' style='display: none;'>
					<div class='main'>
						<span><input type="checkbox" id="aweber" name="aweber" value="On" checked="checked" disabled="disabled" /></span>
						<p><label for='aweber'>Collect reader name and email address to <a target="_blank" href="http://highlighter.com/aweber">AWeber</a></label></p>
						<a href='' class='help'>Help</a>
					</div>
					<div style="width: 250px; display: block;" class='more'>
						<div class='subOption'>
							<label class="aweber"  for='aweberListName'>List Name</label>
							<?php $helper->text('aweberListName'); ?>
						</div>
					</div>
				</div>
		
			
				
				<div class='option' style='display: none;'>
					<div class='main'>
						<span><input type="checkbox" id="mailchimp" name="mailchimp" value="On" checked="checked" disabled="disabled" /></span>
						<p><label for='mailchimp'>Collect reader name and email address to <a target="_blank" href="http://highlighter.com/mailchimp">MailChimp</a></label></p>
						<a href='' class='help'>Help</a>
					</div>
					<div style="width: 250px; display: block;" class='more'>
						<div class='subOption'>
							<label for='mailchimpAPIKey'>API Key</label>
							<?php $helper->text('mailchimpAPIKey'); ?>
						</div>
						<div class='subOption'>
							<label for='mailchimpUniqueListID'>Unique List ID</label>
							<?php $helper->text('mailchimpUniqueListID'); ?>
						</div>
					</div>
				</div>
				
				<div class='option' style='display: none;'>
					<div class='main'>
						<span><input type="checkbox" id="getResponse" name="getResponse" value="On" checked="checked" disabled="disabled" /></span>
						<p><label for='getResponse'>Collect reader name and email address to <a target="_blank" href="http://highlighter.com/getresponse">GetResponse</a></label></p>
						<a href='' class='help'>Help</a>
					</div>
					<div style="width: 250px; display: block;" class='more'>
						<div class='subOption'>
							<label for='getResponseAPIKey'>API Key</label>
							<?php $helper->text('getResponseAPIKey'); ?>
						</div>
						<div class='subOption'>
							<label for='getResponseCampaignID'>Campaign Name</label>
							<?php $helper->text('getResponseCampaignID'); ?>
						</div>
					</div>
				</div>
	
	<hr/>
			
					<h3 id="hr">Highlights & Responses</h3>
			
			
			
				<div class='option'>
					<div  class='main'>
						<?php $helper->checkbox('visitorsAnnotate'); ?>
						<p><label for='visitorsAnnotate'>Allow web visitors to highlight your blog posts</label></p>
						<a href='This allows you to limit the usage of Highlighter for your visitors. We recommend the default settings, but it is totally up to you!' class='help'>Help</a>
					</div>
					
					<div style="width:420px" class='more'>
						<div class='subOption'>
							<p>Visitors can add highlights to</p>
							<span class='container'><label style='display: inline; float: none; width: auto;' for='visitorsAnnotateWords'>Words</label> <?php $helper->checkbox('visitorsAnnotateWords'); ?></span>
							<span class='container'><label style='display: inline; float: none; width: auto;' for='visitorsAnnotateSentences'>Sentences</label> <?php $helper->checkbox('visitorsAnnotateSentences'); ?></span>
							<span class='container'><label style='display: inline; float: none; width: auto;' for='visitorsAnnotateImages'>Images</label> <?php $helper->checkbox('visitorsAnnotateImages'); ?></span>
						</div>
					</div>
				</div>
				
				
				
	
				<div class='option'>
					<div class='main'>
						<?php $helper->checkbox('responses'); ?>
						<p><label for='responses'>Allow reader responses to highlights</label></p>
						<a href='We recommend that you leave this setting turned on. This allows visitors to respond and participate in conversations!' class='help'>Help</a>
					</div>
				</div>
				
				<div class='option'>
					<div class='main'>
						<?php $helper->checkbox('annotationLength'); ?>
						<p><label for='annotationLength'>Limit highlight quote length</label></p>
						<a href='You can limit the number of characters (which ultimately limits words and sentences) that a visitor can quote to begin a conversation.' class='help'>Help</a>
					</div>
					<div style="width: 172px"  class='more'>
						<div class='subOption'>
							<label class="charCount" for='charCount'>Character Count</label>
							<?php $helper->text('charCount'); ?>
						</div>
					</div>
				</div>

	
	<hr/>
	
		<h3 id='share'>Social Sharing & Liking</h3>
							
				<div class='option'>
					<div class='main'>
						<?php $helper->checkbox('converseShare'); ?>
						<p><label for='converseShare'>Display Highlighter Share options</label></p>
						<a href='We recommend this setting be turned on. It will allow visitors to easily see and interact with conversations taking place on your site.' class='help'>Help</a>
					</div>
					
					
					<div style="width:360px" class='more'>
						<div class='subOption'>
							<p>Visitors can share via</p>
							<span class='container'><label style='display: inline; float: none; width: auto;' for='shareFacebook'>Facebook</label> <?php $helper->checkbox('shareFacebook'); ?></span>
							<span class='container'><label style='display: inline; float: none; width: auto;' for='shareTwitter'>Twitter</label> <?php $helper->checkbox('shareTwitter'); ?></span>
							<span class='container'><label style='display: inline; float: none; width: auto;' for='shareEmail'>Email</label> <?php $helper->checkbox('shareEmail'); ?></span>
						</div>
					</div>

					
				</div>
											
					

	
				<div style="margin-bottom:5px"  class='option'>
					<div  class='main'>
						<?php $helper->checkbox('ratings'); ?>
						<p><label for='ratings'>Allow visitors to 'Like' comments and responses</label></p>
						<a href='This is up to you, the publisher. We recommend user ratings be left on because it will reward those who start or respond to great conversation.' class='help'>Help</a>
					</div>
				</div>


				
				
								
						</div>
						<div id='advanced' style='display: none;'>
										
				<h3 id="admin">Highlight Administration</h3>
				
							<div class='option'>
					<div class='main'>
						<?php $helper->checkbox('moderation'); ?>
						<p><label for='moderation'>New highlights must be moderated by the blog administrator</label></p>
						<a href='We HIGHLY recommend that you leave this setting turned on. It will make sure that visitor conversations are approved by you, the publisher, prior to them being viewed by all visitors.' class='help'>Help</a>
					</div>
				</div>
				
				<div class='option'>
					<div class='main'>
						<?php $helper->checkbox('akismetFiltering'); ?>
						<p><label for='akismetFiltering'>Enable Akismet spam filtering</label></p>
						<a href='We highly recommend that you leave this setting turned on. It will filter out all conversations to remove spam. It will make your life much easier.' class='help'>Help</a>
					</div>
				</div>
				
				<div class='option'>
					<div class='main'>
						<?php $helper->checkbox('pages'); ?>
						<p><label for='pages'>Disable Highlighter on Pages</label></p>
						<a href='' class='help'>Help</a>
					</div>
				</div>
				
				<hr/>
				<h3 id="email_notify">Email Notification</h3>
				
				
				<div class='option'>
					<div class='main'>
						<?php $helper->checkbox('notifyAdmin'); ?>
						<p><label for='notifyAdmin'>Email site administrator upon new highlights and responses</label></p>
						<a href='This is up to you, the publisher. We recommend user ratings be left on because it will reward those who start or respond to great conversation.' class='help'>Help</a>
					</div>
				</div>
				
								<div class='option'>
					<div class='main'>
						<?php $helper->checkbox('notifySites'); ?>
						<p><label for='notifySites'>Email visitors upon responses to his/her highlight</label></p>
						<a href='We recommend that you leave this setting turned on. It is just like pingbacks, as it will help notify other sites that you have a conversation linking to them. It is great for networking and building traffic!' class='help'>Help</a>
					</div>
				</div>
				
				<hr/>
				
								
				<h3 id="signin">Third Party Sign In</h3>
				
				<div class='option'>
					<div class='main'>
						<?php $helper->checkbox('allowLoginFacebook'); ?>
						<p><label for='allowLoginFacebook'>Allow visitors to sign in using Facebook</label></p>
						<a href='WARNING: Visitors that log in via Facebook will not be sent to your email list. We recommend this setting off, unless you are not building your email list.' class='help'>Help</a>
					</div>
					<div style="width:280px" class='more'>
						<p style="font-size: 11px">To allow your visitors to connect via Facebook, you must enter an API key and secret key for your blog/site. <a target="_blank" href="http://www.facebook.com/developers/createapp.php">Get your key here &rarr;</a></p>
						<div class='subOption'>
							<label for='facebookAPIKey'>API Key</label>
							<?php $helper->text('facebookAPIKey'); ?>
						</div>
						<div class='subOption'>
							<label for='facebookSecretKey'>Secret Key</label>
							<?php $helper->text('facebookSecretKey'); ?>
						</div>
					</div>
				</div>
				<div class='option'>
					<div class='main'>
						<?php $helper->checkbox('allowLoginTwitter'); ?>
						<p><label for='allowLoginTwitter'>Allow visitors to sign in using Twitter</label></p>
						<a href='WARNING: Visitors that log in via Twitter will not be sent to your email list. We recommend this setting off, unless you are not building your email list.' class='help'>Help</a>
					</div>
					<div style="width:280px" class='more'>
						<p style="font-size: 11px">To allow your visitors to connect via Twitter, you must enter an API key and secret key for your blog/site. <a target="_blank" href="http://dev.twitter.com/apps/new">Get your key here &rarr;</a></p>
						<div class='subOption'>
							<label for='twitterConsumerKey'>Consumer Key</label>
							<?php $helper->text('twitterConsumerKey'); ?>
						</div>
						<div class='subOption'>
							<label for='twitterConsumerSecret'>Consumer Secret</label>
							<?php $helper->text('twitterConsumerSecret'); ?>
						</div>
					</div>
				</div>
				
				<hr/>
				<h3 id="misc">Miscellaneous</h3>

				
				
				<div class='option'>
					<div class='main'>
						<?php $helper->checkbox('allowHTML'); ?>
						<p><label for='allowHTML'>Allow HTML within comments</label></p>
						<a href='We highly recommend that you leave this setting turned on. It will allow you and your visitors to link to other sites within conversations, which will increase your networking.' class='help'>Help</a>
					</div>
				</div>
				<div style="margin-bottom:5px" class='option'>
					<div class='main'>
						<?php $helper->checkbox('registeredAnnotate'); ?>
						<p><label for='registeredAnnotate'>Comment author must fill out name and e-mail </label></p>
						<a href='We recommend leaving this feature turned off for most sites. If you are running a private blog or site in which you only want authorized individuals to converse, turn this on.' class='help'>Help</a>
					</div>
				</div>
				
				
				
							</div>
			<div id='color' style='display: none;'>
			
								
				<h3 id="textstyling">Highlight Styling</h3>
				
				<div style="float:left;">
				<div  class='option'>
					<div style="width: 380px" class='main'>
						<?php $helper->checkbox('highlightAnnotations'); ?>
						<p><label for='highlightAnnotations'>Display highlighted background</label></p>
						<a href='We recommend this setting be turned on. It will allow visitors to easily see and interact with conversations taking place on your site.' class='help'>Help</a>
					</div>
					<div style='width: 140px' class='more'>
						<div class='subOption'>
							<span class='colorLabel'>Highlight color</span>
							<span class='colorSelector'><span style='background-color: #<?php echo get_option("ANNOtype_highlightColor"); ?>;'></span></span>
							<input type='hidden' name='highlightColor' value="<?php echo get_option('ANNOtype_highlightColor'); ?>" />
						</div>
					</div>
				</div>
				
				
				<div class='option'>
					<div  style="width: 380px"  class='main'>
						<?php $helper->checkbox('dashedUnderline'); ?>
						<p><label for='dashedUnderline'>Displayed dashed underline on conversations</label></p>
						<a href='We recommend this setting be turned on. It will allow visitors to easily see and interact with conversations taking place on your site.' class='help'>Help</a>
					</div>
				</div>
				<div class='option' style='margin-bottom:0'>
					<div  style="width: 380px"  class='main'>
						<?php $helper->checkbox('bubbleCount'); ?>
						<p><label for='bubbleCount'>Display only comment count bubble upon mouseover</label></p>
						<a href='We recommend this setting be turned on. It will allow visitors to easily see and interact with conversations taking place on your site.' class='help'>Help</a>
					</div>
				</div>
				</div>
				<div style="width: 290px; padding: 15px;margin-bottom:0;padding:0px 15px;margin-right: 20px" class="preview">
				<p>Lorem Ipsum is the dummy text of the printing and typesetting industry. It has been the industry's <span class='annotation' style="cursor: pointer;">standard dummy text<span class='smallBubble'></span></span> ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type book.</p> 

<p>It is a long established fact that a reader will be distracted by the <span class='annotation' style="cursor: pointer;">readable content<span class='smallBubble'></span></span> of a page when looking at its layout.</p>

					<div style='display: none;' class='ANNOBubbleCount'>10</div>

				</div>
				
							<div style="clear:both"></div>
							<hr/>
							
							
							
						
		

								
				
				
					<h3 id="bubble_styling">Color Scheme</h3>
					
			
				<div style="margin-bottom:0px;padding-bottom:0" class='colorContainer'>
					<div class='colorOptions'>
						<div class='colorOption'>
			<p>			
						
							Select a color scheme
							
<?php echo $helper->dropdown('scheme', array('Dark' => 'Dark', 'Light' => 'Light')); ?>
							</p>	
						</div>
											</div>
					<div class='preview' id='bubblePreview'>
					<?php include 'bubblePreview.php'; ?>
					</div>
				</div>
				
							
	<hr/>
	
								<h3 id="chiclet_icon">Highlight Count Chiclet</h3>
			
				<div  class='colorContainer'>
					<div style="width:580px" class='colorOptions'>
						<div style="width:580px;" class='option'>
							<div style="width:550px" class='main'>
								<p>Style <?php $helper->dropdown('chiclet', array('turn off chiclet' => 'turn off chiclet', 'blue bar with bubble' => 'blue bar with bubble', 'blue bar' => 'blue bar', 'blue bubble' => 'blue bubble', 'white bar with bubble' => 'white bar with bubble', 'white bar' => 'white bar', 'white bubble' => 'white bubble')); ?> &nbsp;&nbsp;&nbsp;&nbsp; Location <?php $helper->dropdown('chicletLocation', array('above post content' => 'above post content', 'below post content' => 'below post content')); ?> &nbsp;&nbsp;&nbsp;&nbsp; Position <?php $helper->dropdown('chicletPosition', array('left' => 'left', 'right' => 'right')); ?></p>
							</div>
						</div>
					
					</div>
					<div class='preview'>
						<div class='blueBarBubble'>
							<span style='line-height: normal; margin: 0; padding: 0; font-size: 11px; color: #fff;'>34</span>
						</div>
						<div class='blueBar'>
							<span style='line-height: normal; margin: 0; padding: 0; font-size: 11px; color: #fff;'>34</span>
						</div>
						<div class='blueBubble'>
							<span style='line-height: normal; margin: 0; padding: 0; font-size: 11px; color: #fff;'>34</span>
						</div>
						<div class='whiteBarBubble'>
							<span style='line-height: normal; margin: 0; padding: 0; font-size: 11px; color: #20365e;'>34</span>
						</div>
						<div class='whiteBar'>
							<span style='line-height: normal; margin: 0; padding: 0; font-size: 11px; color: #20365e;'>34</span>
						</div>
						<div class='whiteBubble'>
							<span style='line-height: normal; margin: 0; padding: 0; font-size: 11px; color: #20365e;'>34</span>
						</div>
					</div>
				</div>
				
				<hr/>
				

			
								<h3 id="highlightbox">Highlight Box</h3>
			
		
			
				<div class='option'>
					<div class='main'>
						<?php $helper->checkbox('annobox'); ?>
						<p><label for='annobox'>Display Highlight Box</label></p>
						<a href='We recommend this setting be turned on. It will allow visitors to easily see and interact with conversations taking place on your site.' class='help'>Help</a>
					</div>
				</div>
				<!-- <div class='option'>
					<div class='main'>
						<?php $helper->checkbox('autoannobox'); ?>
						<p><label for='autoannobox'>Add Highlight Box below content</label></p>
						<a href='We recommend this setting be turned on. It will allow visitors to easily see and interact with conversations taking place on your site.' class='help'>Help</a>
					</div>
				</div> -->
				<div class='option'>
					<div class='main'>
						<?php $helper->checkbox('setannoboxwidth'); ?>
						<p><label for='setannoboxwidth'>Set Highlight Box width</label></p>
						<a href='We recommend this setting be turned on. It will allow visitors to easily see and interact with conversations taking place on your site.' class='help'>Help</a>
					</div>
					<div style="width:180px" class='more'>
						<div class='subOption'>
							<label for='annoboxwidth'>Highlight Box width </label>
							<?php $helper->text('annoboxwidth'); ?> px
						</div>
					</div>
				</div>
				<hr/>

							
								
				
		
							<h3 id="branding">Highlighter Branding</h3>
							
								<div class='option'>
								<div class='main'>
						<?php $helper->checkbox('topBar'); ?>
						<p><label for='topBar'>Display Highlighter Top Bar</label></p>
						<a href='We recommend this setting be turned on. It will allow visitors to easily see and interact with conversations taking place on your site.' class='help'>Help</a>
					</div>
				</div>
				
				<div class='option'>
							<div class='main'>
								<p style='margin-top:7px;margin-left:10px'><label for='widgetPosition'>Display the Highlighter Count Tab on </label><?php $helper->dropdown('widgetPosition', array('off' => 'turn off widget', 'bottom' => 'bottom', 'side' => 'side')); ?></p>
							
								<a href='We recommend this setting be turned on. It will allow visitors to easily see and interact with conversations taking place on your site.' class='help'>Help</a>

							</div>
							
						</div>


				
				
							</div>
			<div id='help' style='display: none;'>
				<h3>Using the WordPress Plugin</h3>
				<div class='q'>
					<div class='question'>How do I download Highlighter? <span>&rarr;</span></div>
					<div class='answer'>Please visit our <a href="http://highlighter.com/download/">download page</a> to get your free copy of Highlighter!</div>
				</div>
				<div class='q'>
					<div class='question'>How do I install the plugin?<span>&rarr;</span></div>
					<div class='answer'><h3>**Use this if you'd like to install via the WordPress Dashboard Uploader**</h3>
<ol>
<li>Log into your WordPress blog's dashboard. (www.yourdomain.com/wp-admin)</li>
<li>Navigate to the "Plugins" button on the left side of the dashboard, and then click on "Add New."</li>
<li>Below the title, "Install Plugins" you'll see a link called "Upload." Click that link.</li>
<li>Click the browse button, and choose the Highlighter.zip file that you downloaded from Highlighter.com/download or the WordPress plugins directory!</li>
<li>Click Install.</li>
<li>Activate!</li></ol>
<br />
<em>If you need further assistance, watch the video on our homepage at Highlighter.com. It shows the installation process in a video!</em>
<br /><br />
<h3>**Use this if you'd like to install via FTP**</h3>
<ol>
<li>Log into your server with your FTP client.</li>
<li>Navigate to the "wp-content/plugins/" directory.</li>
<li>Upload the UNZIPPED folder called Highlighter.</li>
<li>Log into your WordPress blog's dashboard. (www.yourdomain.com/wp-admin)</li>
<li>Navigate to the "Plugins" button on the left side of the dashboard.</li>
<li>Find Highlighter on the list of installed plugins, and click "Activate!"</li>
</ol>
</div>
				</div>
				
				<div class='q'>
					<div class='question'>What do you recommend considering prior to installing Highlighter? <span>&rarr;</span></div>
					<div class='answer'><p>Highlighter runs on the very popular content management system, WordPress. <a href="http://wordpress.org/download/">You can download a free copy of WordPress here.</p></a></div>
				</div>
				
				<div class='q'>
					<div class='question'>How do I turn off the Top Bar, Side Widget or Bottom Widget? <span>&rarr;</span></div>
					<div class='answer'><p>These can be easily turned off by logging into your WordPress Dashboard, and navigating to the "Highlighter" button on the left side of the window. Then, click on the "Appearance" tab to find the settings you're looking for!</p></div>
				</div>
				
				<div class='q'>
					<div class='question'>How do I change the look of the plugin to suit my site? <span>&rarr;</span></div>
					<div class='answer'><p>Currently, there are two color choices; "light" and "dark." Log into your WordPress Dashboard, and navigating to the "Highlighter" button on the left side of the window. Then, click on the "Appearance" tab to find the settings you're looking for!</p></div>
				</div>
				
				<div class='q'>
					<div class='question'>How do I hook up Aweber to Highlighter? <span>&rarr;</span></div>
					<div class='answer'><p>First, login to your <a href="http://highlighter.com/aweber">Aweber</a> account. If you don't have one, click here to get one! Once you've logged in, you'll want to find the name of your desired email list, then copy it. Then, navigate to your WordPress dashboard. Click on the Highlighter link, and choose Aweber as your email marketing provider. Then, paste your list name into the "List Name" field.</p> <p>Here is a video to show you exactly how to do it!</p></div>
				</div>
				
				<div class='q'>
					<div class='question'>How do I hook up MailChimp to Highlighter? <span>&rarr;</span></div>
					<div class='answer'><p>First, login to your <a href='http://highlighter.com/mailchimp'>MailChimp</a> account. If you don't have one, click here to get one! Once you've logged in, you'll want to find the name of your desired email list, then copy it. Then, navigate to your WordPress dashboard. Click on the Highlighter link, and choose Aweber as your email marketing provider. Then, paste your list name into the "List Name" field.</p><p>Here is a video to show you exactly how to do it!</p></div>
				</div>
				
				<div class='q'>
					<div class='question'>How do I hook up GetResponse to Highlighter? <span>&rarr;</span></div>
					<div class='answer'><p>First, login to your <a href="http://highlighter.com/getresponse">GetResponse</a> account. If you don't have one, click here to get one! Once you've logged in, you'll want to find the name of your desired email list, then copy it. Then, navigate to your WordPress dashboard. Click on the Highlighter link, and choose Aweber as your email marketing provider. Then, paste your list name into the "List Name" field.</p><p>Here is a video to show you exactly how to do it!</p></div>
				</div>
				
				<br />
						<h3>F.A.Q.</h3>

				<div class='q'>
					<div class='question'>Are you offering free phone consultation or support? <span>&rarr;</span></div>
					<div class='answer'><p>Unfortunately, we cannot provide support or consultation over the phone. Please visit our Support Forums!</p></div>
				</div>
				
				<div class='q'>
					<div class='question'>Why did you choose WordPress.org for Highlighter? <span>&rarr;</span></div>
					<div class='answer'><p>WordPress is the best platform for modern publishers. It allows you to easily modify your site or blog, and retain the powerful content editing tools. In a nutshell, WordPress is the easiest, yet most powerful, way to roll this technology out! We will be building versions of the plugins for all major blogging platforms and deploying it via a Javascript snippet (similar to a Facebook "Like" button).</p><p>Furthermore, we plan to roll Highlighter out on most tablets, phones, and book readers!</p></div>
				</div>
				
				<div class='q'>
					<div class='question'>When are you bringing Highlighter to other platforms? <span>&rarr;</span></div>
					<div class='answer'><p>ASAP! We're working hard to improve and expand Highlighter's reach into different content consumption portals. Make sure to download Highlighter, or sign up to our email list to keep up to date!</p></div>
				</div>
				<div class='q'>
					<div class='question'>How do I sign up for the forum? <span>&rarr;</span></div>
					<div class='answer'><p>Follow this link to the <a href="http://highlighter.com/forum/">forum</a> to sign up!</p></div>
				</div>

			</div>
		</form>
	</div>
		</div>
