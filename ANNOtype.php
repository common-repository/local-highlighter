<?php
/*
Plugin Name: Local highlighter
Plugin URI: http://scil.coop
Description: Highlight. Comment. Share. It really is that simple.
Author: ANNOtype, Inc. SCIL, Scop
Version: devel
Author URI: http://scil.coop
Licence: GPL2
*/
/*
	Copyright 2010-2012 Highlighter (highlighter.com)
	                    Cédric Houbart (email : cedric@scil.coop)

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
define('UBD_PATH', dirname(__FILE__));
define('UBD_URL', plugins_url().'/local-highlighter');

update_option('ANNOtype_version', '1.0.10');

if(!class_exists('ANNOtype')) {
	class ANNOtype
	{
		/**
		 * The current version of the plugin.
		 * You can get the plugin version by using $this->version inside the ANNOtype class.
		 */
		public $version = '1.0.10';
		
		public function __construct()
		{	
			register_activation_hook(__FILE__, array($this, 'install'));
			register_deactivation_hook(__FILE__, array($this, 'uninstall'));
			
			add_action('admin_menu', array($this, 'adminMenus'));
			
			add_action('wp_ajax_ANNOtype_updateCP', array($this, 'updateCP'));
			add_action('wp_ajax_ANNOtype_addAnnotation', array($this, 'addAnnotation'));
			add_action('wp_ajax_ANNOtype_deleteAnnotation', array($this, 'deleteAnnotation'));
			add_action('wp_ajax_ANNOtype_addPostComment', array($this, 'addPostComment'));
			add_action('wp_ajax_ANNOtype_addNewAnnotation', array($this, 'addNewAnnotation'));
			add_action('wp_ajax_ANNOtype_getAnnotationByTextAndPostID', array($this, 'getAnnotationByTextAndPostID'));
			add_action('wp_ajax_ANNOtype_bubbleHitCount', array($this, 'bubbleHitCount'));
			add_action('wp_ajax_ANNOtype_likes', array($this, 'likes'));
			add_action('wp_ajax_ANNOtype_shareHighlight', array($this, 'shareHighlight'));
			add_action('wp_ajax_ANNOtype_scheme', array($this, 'scheme'));
			add_action('wp_ajax_ANNOtype_trackHighlight', array($this, 'trackHighlight'));
			
			add_action('wp_ajax_nopriv_ANNOtype_addAnnotation', array($this, 'addAnnotation'));
			add_action('wp_ajax_nopriv_ANNOtype_deleteAnnotation', array($this, 'deleteAnnotation'));
			add_action('wp_ajax_nopriv_ANNOtype_addPostComment', array($this, 'addPostComment'));
			add_action('wp_ajax_nopriv_ANNOtype_addNewAnnotation', array($this, 'addNewAnnotation'));
			add_action('wp_ajax_nopriv_ANNOtype_getAnnotationByTextAndPostID', array($this, 'getAnnotationByTextAndPostID'));
			add_action('wp_ajax_nopriv_ANNOtype_bubbleHitCount', array($this, 'bubbleHitCount'));
			add_action('wp_ajax_nopriv_ANNOtype_likes', array($this, 'likes'));
			add_action('wp_ajax_nopriv_ANNOtype_shareHighlight', array($this, 'shareHighlight'));
			add_action('wp_ajax_nopriv_ANNOtype_trackHighlight', array($this, 'trackHighlight'));
			
			add_action('edit_post', array($this, 'editPost'));
			add_action('wp_print_styles', array($this, 'css'));
			add_action('wp_footer', array($this, 'footer'));
			add_action('wp_head', array($this, 'head'));
			
			add_action('post_submitbox_misc_actions', array($this, 'post_submitbox_misc_actions'));
			add_action('save_post', array($this, 'save_post'));
			
			add_action('wp_dashboard_setup', array($this, 'wp_dashboard_setup'));
			
			add_filter('mce_css', array($this, 'mceCSS'));
			add_filter('the_content', array($this, 'theContent'));
			add_filter('the_excerpt', array($this, 'theExcerpt'));
			
			remove_filter('the_content', 'wptexturize');
			
			wp_deregister_script('autosave');
		}
		
		public function install()
		{
			global $wpdb;
			
			$annotations =
			'CREATE TABLE IF NOT EXISTS `'.$wpdb->prefix.'annotations` (
				  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
				  `postID` bigint(20) NOT NULL,
				  `type` varchar(10) NOT NULL,
				  `subtype` VARCHAR(3) DEFAULT "txt" NOT NULL,
				  `text` text NOT NULL,
				  `timestamp` varchar(10) NOT NULL,
				  PRIMARY KEY (`ID`)
			);';
			
			$wpdb->query($annotations);
			
			$comments =
			'CREATE TABLE IF NOT EXISTS `'.$wpdb->prefix.'annotationcomments` (
				  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
				  `annotationID` bigint(20) NOT NULL,
				  `userID` bigint(20) DEFAULT NULL,
				  `name` varchar(250) DEFAULT NULL,
				  `url` varchar(100) DEFAULT NULL,
				  `email` varchar(100) DEFAULT NULL,
				  `comment` text,
				  `status` varchar(8) NOT NULL DEFAULT "pending",
				  `timestamp` varchar(10) NOT NULL,
				  `likes` bigint(20) NOT NULL DEFAULT "0",
				  PRIMARY KEY (`ID`)
			)';
			
			$wpdb->query($comments);
			
			$comments = 'ALTER TABLE `'.$wpdb->prefix.'annotationcomments` ADD COLUMN `likes` BIGINT DEFAULT "0" NOT NULL;';
			
			$wpdb->query($comments);
			
			add_option('ANNOtype_moderation', 'On');
			add_option('ANNOtype_visitorsAnnotate', 'On');
			add_option('ANNOtype_visitorsAnnotateWords', 'On');
			add_option('ANNOtype_visitorsAnnotateSentences', 'On');
			add_option('ANNOtype_visitorsAnnotateImages', 'On');
			add_option('ANNOtype_responses', 'On');
			add_option('ANNOtype_notifySites', 'On');
			add_option('ANNOtype_highlights', 'On');
			add_option('ANNOtype_underline', 'On');
			add_option('ANNOtype_topBar', 'On');
			add_option('ANNOtype_ratings', 'On');
			add_option('ANNOtype_converseShare', 'On');
			add_option('ANNOtype_annobox', 'On');
			add_option('ANNOtype_autoannobox', 'On');
			add_option('ANNOtype_notifyAdmin', 'On');
			add_option('ANNOtype_bubbleCount', 'Off');
			
			add_option('ANNOtype_allowHTML', 'On');
			add_option('ANNOtype_requireEmail', 'On');
			add_option('ANNOtype_akismetFiltering', 'On');
			add_option('ANNOtype_registeredAnnotate', 'Off');
			
			add_option('ANNOtype_widgetPosition', 'side');
			add_option('ANNOtype_dashedUnderline', 'Off'); // Dashed underline
			
			add_option('ANNOtype_highlightAnnotations', 'On');
			add_option('ANNOtype_highlightColor', 'fbf7cd'); // Highlight color
			
			add_option('ANNOtype_annotationLength', 'Off'); // Limit annotation length option
			add_option('ANNOtype_charCount', 125); // Annotation length limit character count field
			
			add_option('ANNOtype_aweber', 'Off'); // Aweber: Default = Off
			
			add_option('ANNOtype_chichlet', 'blue bar with bubble');
			add_option('ANNOtype_chichletLocation', 'above post content');
			add_option('ANNOtype_chichletPosition', 'left');
			
			add_option('ANNOtype_setannoboxwidth', 'On');
			add_option('ANNOtype_annoboxwidth', '600');
			
			// Widget default colors
			
			/*delete_option('ANNOtype_widgetTitleBarColor');
			delete_option('ANNOtype_widgetShellColor');
			delete_option('ANNOtype_widgetFontColor');*/
			
			add_option('ANNOtype_widgetTitleBarColor', '000000');
			add_option('ANNOtype_widgetShellColor', '000000');
			add_option('ANNOtype_widgetFontColor', 'FFFFFF');
			
			// Bubble default colors
			
			add_option('ANNOtype_shareFacebook', 'On');
			add_option('ANNOtype_shareTwitter', 'On');
			add_option('ANNOtype_shareEmail', 'On');
			
			add_option('ANNOtype_scheme', 'Light');

			add_option('ANNOtype_bubbleTitleBarColor', '273a6b');
			add_option('ANNOtype_bubbleShellColor', 'ededed');
			
			add_option('ANNOtype_bubbleSortColor', '10192f');
			add_option('ANNOtype_bubbleSortFontColor', 'FFFFFF');
			
			add_option('ANNOtype_bubbleCommentSepColor', 'aaaeb4');
			add_option('ANNOtype_bubbleCommentColor', 'FFFFFF');
			add_option('ANNOtype_bubbleAltCommentColor', 'FFFFFF');
			
			add_option('ANNOtype_bubbleButtonColor', '989898');
			add_option('ANNOtype_bubbleButtonFontColor', 'FFFFFF');
		
			add_option('ANNOtype_bubblePostButtonColor', '1c2a50');
			add_option('ANNOtype_bubblePostButtonFontColor', 'FFFFFF');
			
			add_option('ANNOtype_bubbleFontColor', '1a1a1a');
			add_option('ANNOtype_bubbleLinkColor', '1a1a1a');

			add_option('ANNOtype_bubbleMainBg', 'e9edf5');
			add_option('ANNOtype_bubbleMainBorder', '91a2c8');
			add_option('ANNOtype_bubbleMainColor', '000000');

			add_option('ANNOtype_pages', 'Off');
		}
		
		function head()
		{
			$enabled = get_option('highlightr_post_'.$post->ID);
			$pages = get_option('ANNOtype_pages');
			
			if(is_single() || (is_page() && $pages == 'Off') && $enabled != 'Off') {
				global $post, $posts;
				$first_img = '';
				ob_start();
				ob_end_clean();
				$output = preg_match_all('/<img.+src=[\'"]([^\'"]+)[\'"].*>/i', $post->post_content, $matches);
				$first_img = $matches[1][0];
				
				if(empty($first_img)){ //Defines a default image
					//$first_img = "/images/default.jpg";
				}
				
				echo '<meta name="medium" content="image" />';
				echo '<meta property="og:image" content="'.$first_img.'" />';
			}
		}
		
		function uninstall()
		{
		}
		
		function adminMenus()
		{
			global $wpdb;
		
			add_object_page('Highlighter', 'Highlighter', 'administrator', 'Highlighter', array($this, 'adminView'), UBD_URL . '/public/images/wp.png');
			
			$count = $wpdb->get_results('SELECT COUNT(*) AS c FROM '.$wpdb->prefix.'annotationcomments WHERE status = "pending"');
			if($count[0]->c) {
				$countHTML = ' <span id="awaiting-mod" class="count-1"><span class="pending-count">'.$count[0]->c.'</span></span>';
			} else {
				$countHTML = '';
			}
			
			add_object_page('Highlights', 'Highlights'.$countHTML, 'administrator', 'Highlights', array($this, 'adminView'), UBD_URL . '/public/images/highlight-icon.png');
			
			add_action('admin_print_styles-toplevel_page_Highlighter', array($this, 'adminHead'));
			//add_action('admin_print_styles-'.$submenu, array($this, 'adminHead'));
			
			add_meta_box('ANNOtype_metaAnnotations', __('Author Highlights'), array($this, 'metaAnnotations'), 'post', 'side');
			//add_meta_box('ANNOtype_metaNotepad', __('Annotype - Notepad'), array($this, 'metaNotepad'), 'post', 'side');
		}
		
		function adminView()
		{	
			include 'ANNOtypeHelper.php';
			$helper = new ANNOtypeHelper;
			
			if($_GET['page']) {
				include 'views/'.ucwords($_GET['page']).'.php';
			}
		}
		
		function adminHead()
		{
			wp_deregister_script('jquery');
			wp_enqueue_script('jquery', UBD_URL.'/public/js/jquery.min.js', '', '1.4.3');
			wp_enqueue_script('jquery-form');
			wp_enqueue_script('phpjs', UBD_URL.'/public/js/php.js', 'jquery', '3.17');
			wp_enqueue_script('jquery.tipTip', UBD_URL.'/public/js/jquery.tipTip.js', 'jquery', '1.2');
	
			wp_enqueue_script('ANNOtype', UBD_URL.'/public/js/ANNOtype.js', 'jquery', '1');		
			wp_enqueue_style('ANNOtype', UBD_URL.'/public/style.css', '', '1');
			
			wp_localize_script('ANNOtype', 'ANNOVars', array(
				'ajaxUrl' => admin_url('admin-ajax.php'),
				'ubdUrl' => UBD_URL
			));
		}
		
		function updateCP()
		{
			foreach($_POST as $name => $value) {
				update_option('ANNOtype_'.$name, $value);
			}
			
			exit;
		}
		
		function metaAnnotations($post)
		{
			global $current_user;
			get_currentuserinfo();
			
			include 'views/metaAnnotations.php';
		}
		
		function metaNotepad($post)
		{
			include 'views/metaNotepad.php';
		}
		
		function getAnnotations($postID, $type = 'annotation')
		{
			global $wpdb;
			
			return $wpdb->get_results('SELECT * FROM '.$wpdb->prefix.'annotations WHERE postID ="' . $postID .'" AND type="'.$type.'"');
		}
		
		function addAnnotation($text = '', $postID = '', $user = '', $selectedText = '', $type = 'annotation')
		{
			global $wpdb;
			
			if($_POST) {
				$text = $_POST['text'];
				$postID = $_POST['postID'];
				$selectedText = $_POST['selectedText'];
				$type = $_POST['type'];
				
				if(is_array($user)) {
				} else {
					$user = $_POST['userID'];
				}
			}
			
			if($type == 'annotation') {
				$prepareAnnotation[0] = array('postID' => $postID, 'type' => $type, 'text' => $selectedText, 'timestamp' => $_SERVER['REQUEST_TIME']);
				$prepareAnnotation[1] = array('%d', '%s', '%s', '%s');
			} else {
				$prepareAnnotation[0] = array('postID' => $postID, 'type' => $type, 'text' => $text, 'timestamp' => $_SERVER['REQUEST_TIME']);
				$prepareAnnotation[1] = array('%d', '%s', '%s', '%s');
			}
			
			$wpdb->insert($wpdb->prefix.'annotations', $prepareAnnotation[0], $prepareAnnotation[1]);
			
			echo $wpdb->insert_id;
			
			if(is_array($user)) {
			} else {
				$wpdb->insert($wpdb->prefix.'annotationcomments', array('annotationID' => $wpdb->insert_id, 'userID' => $user, 'comment' => $text, 'timestamp' => $_SERVER['REQUEST_TIME'], 'status' => 'approved'), array('%d', '%d', '%s', '%s', '%s'));
			}
			
			exit;
		}
		
		function addNewAnnotation()
		{
			global $wpdb;
			
			if($_POST['website'] == 'Website (optional)') {
				$_POST['website'] = '';
			}
			
			$_POST['comment'] = make_clickable(stripslashes(nl2br($_POST['comment'])));
			
			$prepareAnnotation[0] = array('postID' => $_POST['postID'], 'type' => 'annotation', 'text' => $_POST['selectText'], 'timestamp' => $_SERVER['REQUEST_TIME'], 'subtype' => $_POST['subtype']);
			$prepareAnnotation[1] = array('%d', '%s', '%s', '%s', '%s');
			
			$wpdb->insert($wpdb->prefix.'annotations', $prepareAnnotation[0], $prepareAnnotation[1]);
			$annotationID = $wpdb->insert_id;
			
			if(get_option('ANNOtype_moderation') == 'Off' || current_user_can('activate_plugins')) {
				$status = 'approved';
			} else {
				if(get_option('wordpress_api_key') && get_option('ANNOtype_akismetFiltering') == 'On') {
					include 'class.microakismet.inc.php';
					
					$vars = array();
					
					$vars['user_ip'] = $_SERVER['REMOTE_ADDR'];
					$vars['user_agent'] = $_SERVER['HTTP_USER_AGENT'];
					
					$vars['comment_content'] = $_POST['comment'];
					$vars['comment_author'] = $_POST['name'];
					$vars['comment_author_email'] = $_POST['email'];
	   
					$akismet = new MicroAkismet(get_option('wordpress_api_key'), get_option('wpurl'), 'ANNOtype/1.0');
					
					if($akismet->check($vars)) {
						$status = 'spam';
					} else {
						$status = 'pending';
					}
				} else {
					$status = 'pending';
				}
			}
			
			$post = get_post($_POST['postID']);
			
			if($_POST['subtype'] == 'txt') {
				$newPost = str_replace(stripslashes($_POST['selectText']), '<span id="annotationID_'.$annotationID.'" class="annotation">'.stripslashes($_POST['selectText']).'</span>', $post->post_content);
				$wpdb->update($wpdb->prefix.'posts', array('post_content' => $newPost), array('ID' => $_POST['postID']), array('%s'), array('%d'));
			}
			
			$wpdb->insert($wpdb->prefix.'annotationcomments', array('annotationID' => $annotationID, 'userID' => $_POST['userID'], 'comment' => $_POST['comment'], 'timestamp' => $_SERVER['REQUEST_TIME'], 'status' => $status, 'name' => $_POST['name'], 'url' => $_POST['website'], 'email' => $_POST['email']), array('%d', '%d', '%s', '%s', '%s', '%s', '%s', '%s'));
			$lastid = $wpdb->insert_id;
			
			if($_POST['subscribe']) {
				if(get_option('ANNOtype_collector') == 'Mailchimp' && get_option('ANNOtype_mailchimp') == 'On' && $_POST['email']) {
					include 'libs/MCAPI.class.php';
					$mc = new MCAPI(get_option('ANNOtype_mailchimpAPIKey'));
					$mc->listSubscribe(get_option('ANNOtype_mailchimpUniqueListID'), $_POST['email'], '');
				}
				
				if(get_option('ANNOtype_collector') == 'GetResponse' && get_option('ANNOtype_getResponse') == 'On' && $_POST['email'] && $_POST['name']) {
					include_once 'libs/jsonRPCClient.php';
					
					$api_key = get_option('ANNOtype_getResponseAPIKey');
					$api_url = 'http://api2.getresponse.com';
					
					$client = new jsonRPCClient($api_url);
					$result = NULL;
					
				    $result = $client->get_campaigns(
				        $api_key,
				        array (
				            # find by name literally
				            'name' => array ('EQUALS' => get_option('ANNOtype_getResponseCampaignID'))
				        )
				    );
				    
				    $listID = array_pop(array_keys($result));
				    
				    $result = $client->add_contact(
				        $api_key,
				        array(
				            'campaign'  => $listID,
				            'name'      => $_POST['name'],
				            'email'     => $_POST['email'],
				            'cycle_day' => '0',
				        )
				    );
				}
			}
			
			if(get_option('ANNOtype_notifyAdmin') == 'On') {
				$comment = $this->getComment($lastid);
				$comment = $comment[0];
				
				if($comment->status == 'pending') {
					$annotation = $this->getAnnotationByID($annotationID);
					$annotation = $annotation[0];
					$post = get_post($annotation->postID);
					
					$count = $wpdb->get_results('SELECT COUNT(*) AS c FROM '.$wpdb->prefix.'annotationcomments WHERE status = "pending"');
					
					if($comment->userID) { // is this user already registered?
						$user = get_userdata($comment->userID);
						
						$comment->name = $user->display_name;
						$comment->url = $user->user_url;
						$comment->email = $user->user_email;
					}
					
					$comment->url = esc_url($comment->url);
					
					$comment->comment = make_clickable(stripslashes($comment->comment)); // annotation comment
								
					$subject = '['.get_bloginfo('name').'] Please moderate a new highlight';
					$message .= 'A new highlight on the post "'.$post->post_title.'" is waiting for your approval '.make_clickable(get_permalink($annotation->postID)).'<br /><br />';
					$message .= 'Author : '.$comment->name.' (IP: '.$_SERVER['REMOTE_ADDR'].')'.'<br />';
					$message .= 'Email: '.make_clickable($comment->email).'<br />';
					$message .= 'URL: '.make_clickable($comment->url).'<br />';
					$message .= 'Comment: '.$comment->comment.'<br />'.'<br />';
					$message .= 'Approve it: '.make_clickable(admin_url('admin.php').'?page=Highlights&changeStatus=approved&id='.$lastid).'<br />';
					$message .= 'Trash it: '.make_clickable(admin_url('admin.php').'?page=Highlights&changeStatus=trash&id='.$lastid).'<br />';
					$message .= 'Spam it: '.make_clickable(admin_url('admin.php').'?page=Highlights&changeStatus=spam&id='.$lastid).'<br />';
					if($count[0]->c) {
						$message .= 'Currently '.$count[0]->c.' highlights/responses are waiting for approval. Please visit the moderation panel: '.make_clickable(admin_url('admin.php').'?page=Highlights');
					}
					
					$headers  = 'MIME-Version: 1.0' . "\r\n";
					$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
					
					wp_mail(get_bloginfo('admin_email'), $subject, $message, $headers);
				}
			}
			
			exit;
		}
		
		function deleteAnnotation($annotationID = '')
		{
			global $wpdb;
			
			if($_POST) {
				$annotationID = $_POST['annotationID'];
				$annotationID = explode('_', $annotationID);
				$annotationID = $annotationID[1];
				
				echo $annotationID;
			}
			
			$wpdb->query('DELETE FROM '.$wpdb->prefix.'annotations WHERE ID = "'.$annotationID.'"');
			$wpdb->query('DELETE FROM '.$wpdb->prefix.'annotationcomments WHERE annotationID = "'.$annotationID.'"');
			
			exit;
		}
	
		function addPostComment() {
			global $wpdb;
			
			if($_POST['website'] == 'Website (optional)') {
				$_POST['website'] = '';
			}
			
			$_POST['comment'] = make_clickable(stripslashes(nl2br($_POST['comment'])));
			
			if(get_option('ANNOtype_moderation') == 'Off' || current_user_can('activate_plugins')) {
				$status = 'approved';
			} else {
				if(get_option('wordpress_api_key') && get_option('ANNOtype_akismetFiltering') == 'On') {
					include 'class.microakismet.inc.php';
					
					$vars = array();
					
					$vars['user_ip'] = $_SERVER['REMOTE_ADDR'];
					$vars['user_agent'] = $_SERVER['HTTP_USER_AGENT'];
					
					if($_POST['userID'] != 'undefined' AND isset($_POST['userID'])) {
						$info = get_userdata($_POST['userID']);
						
						$_POST['name'] = $info->display_name;
						$_POST['email'] = $info->user_email;
					}
					
					$vars['comment_content'] = $_POST['comment'];
					$vars['comment_author'] = $_POST['name'];
					$vars['comment_author_email'] = $_POST['email'];
	   
					$akismet = new MicroAkismet(get_option('wordpress_api_key'), get_option('wpurl'), 'ANNOtype/1.0');
					
					if($akismet->check($vars)) {
						$status = 'spam';
					} else {
						$status = 'pending';
					}
				} else {
					$status = 'pending';
				}
			}
			
			if($_POST['userID'] != 'undefined' AND isset($_POST['userID'])) {
				$wpdb->insert($wpdb->prefix.'annotationcomments', array('annotationID' => $_POST['ID'], 'userID' => $_POST['userID'], 'comment' => $_POST['comment'], 'status' => $status, 'timestamp' => $_SERVER['REQUEST_TIME']), array('%d', '%d', '%s', '%s', '%s'));
			} else {
				$wpdb->insert($wpdb->prefix.'annotationcomments', array('annotationID' => $_POST['ID'], 'name' => $_POST['name'], 'email' => $_POST['email'], 'comment' => $_POST['comment'], 'status' => $status, 'timestamp' => $_SERVER['REQUEST_TIME'], 'url' => $_POST['website']), array('%d', '%s', '%s', '%s', '%s', '%s', '%s'));
			}
			
			if($_POST['userID'] != 'undefined' AND isset($_POST['userID'])) {
				$user = get_userdata($_POST['userID']);
				
				$_POST['name'] = $user->display_name;
				$_POST['website'] = $user->user_url;
				$_POST['email'] = $user->user_email;
			}
			
			$date = date('D, M jS Y', $_SERVER['REQUEST_TIME']).' at '.date('H:i:s', $_SERVER['REQUEST_TIME']);
	
			if($status != 'spam') {
				if($status == 'pending') {
					$statusHTML = '<p style="font-size: 11px !important;">Your comment is being reviewed. Check back soon to see if it has been approved.</p><br /><br />';
				}
				
				if($_POST['website']) {
					$_POST['name'] = "<a style='font-size: 14px !important; font-weight: bold !important; color: #".get_option('ANNOtype_bubbleLinkColor')." !important;' href='{$_POST['website']}'>{$_POST['name']}</a>";
					$_POST['name'] = make_clickable($_POST['name']);
				}
				
				if($_POST['email']) { // if annoated by a registered user, get gravatar
					$avatar = get_avatar($_POST['email'], 24);
				} elseif(strpos($_POST['website'], 'twitter') !== false) { // if its a twitter user, get twitter avatar
					$getUser = preg_match_all('#http://(.*)twitter.com/(.*)#', $_POST['website'], $matches);
					$twitterID = $matches[2][0];
					$avatar = "<img src='http://img.tweetimag.es/i/{$twitterID}_m' alt='{$twitterID}' />";
				} else { // else no avatar
					$avatar = '';
				}
				
				$lastid = $wpdb->insert_id;
				
				echo "<li style='{$style} border-color: #".get_option('ANNOtype_bubbleCommentSepColor')." !important;' id='ANNOComment_{$lastid}'>";
					echo "<div class='ANNOresponseTitle'>";
						echo "<div class='ANNOresponseTitleDetails'>";
							echo $avatar;
							echo "<span class='name' style='font-size: 14px !important; font-weight: bold !important; color: #".get_option('ANNOtype_bubbleFontColor')." !important;'>{$_POST['name']}</span>";
						echo "</div>";
						if($is_admin) {
							echo "<div class='ANNOresponseTitleAdmin'>";
								echo "<a href='#'><img src='".UBD_URL."/public/images/bubble2/edit.png' alt='Edit' /></a>";
								echo "<a href='#'><img src='".UBD_URL."/public/images/bubble2/delete.png' alt='Delete' /></a>";
							echo "</div>";
						}
					echo "</div>";
					echo "<div class='ANNOresponseComment' style='font-size: 11px !important; color: #".get_option('ANNOtype_bubbleFontColor')." !important;'>";
						echo $statusHTML.$_POST['comment'];
					echo "</div>";
					echo "<div class='ANNOresponseMeta'>";
						echo "<span class='date' style='color: #".get_option('ANNOtype_bubbleFontColor')." !important; font-size: 11px !important;'>Posted <abbr class='timeago' title='".date('c', $_SERVER['REQUEST_TIME'])."'>".date('M, d Y', $_SERVER['REQUEST_TIME'])."</abbr></span>";
						echo "<div class='ANNOresponseAction'>";
							//echo "<a href='#' style='color: #".get_option('ANNOtype_bubbleButtonFontColor')."; background-color: #".get_option('ANNOtype_bubbleButtonColor')."; margin-right: 5px;' class='reply'>Reply</a>";
							if(get_option('ANNOtype_ratings') == 'On') {
								echo "<a href='#' class='like' style='color: #".get_option('ANNOtype_bubbleButtonFontColor')." !important; background-color: #".get_option('ANNOtype_bubbleButtonColor')." !important;'>Like</a>";
								
								$style = 'display: none !important;';
								
								echo "<span class='count' style='margin-left: 5px !important; color: #".get_option('ANNOtype_bubbleFontColor')." !important; {$style}'>+<span class='likes'>0/span></span>";
							}
						echo "</div>";
					echo "</div>";
				echo "</li>";
				
				if($_POST['subscribe']) {
					if(get_option('ANNOtype_collector') == 'Mailchimp' && get_option('ANNOtype_mailchimp') == 'On' && $_POST['email']) {
						include 'libs/MCAPI.class.php';
						$mc = new MCAPI(get_option('ANNOtype_mailchimpAPIKey'));
						$mc->listSubscribe(get_option('ANNOtype_mailchimpUniqueListID'), $_POST['email'], '');
					}
					
					if(get_option('ANNOtype_collector') == 'GetResponse' && get_option('ANNOtype_getResponse') == 'On' && $_POST['email'] && $_POST['name']) {
						include_once 'libs/jsonRPCClient.php';
						
						$api_key = get_option('ANNOtype_getResponseAPIKey');
						$api_url = 'http://api2.getresponse.com';
						
						$client = new jsonRPCClient($api_url);
						$result = NULL;
						
					    $result = $client->get_campaigns(
					        $api_key,
					        array (
					            # find by name literally
					            'name' => array ('EQUALS' => get_option('ANNOtype_getResponseCampaignID'))
					        )
					    );
					    
					    $listID = array_pop(array_keys($result));
					    
					    $result = $client->add_contact(
					        $api_key,
					        array(
					            'campaign'  => $listID,
					            'name'      => $_POST['name'],
					            'email'     => $_POST['email'],
					            'cycle_day' => '0',
					        )
					    );
					}
				}
				
				$message = '';
				
				if(get_option('ANNOtype_notifyAdmin') == 'On') {
					$comment = $this->getComment($lastid);
					$comment = $comment[0];
					
					if($comment->status == 'pending') {
						$annotation = $this->getAnnotationByID($_POST['ID']);
						$annotation = $annotation[0];
						$post = get_post($annotation->postID);
						
						$count = $wpdb->get_results('SELECT COUNT(*) AS c FROM '.$wpdb->prefix.'annotationcomments WHERE status = "pending"');
						
						if($comment->userID) { // is this user already registered?
							$user = get_userdata($comment->userID);
							
							$comment->name = $user->display_name;
							$comment->url = $user->user_url;
							$comment->email = $user->user_email;
						}
						
						$comment->url = esc_url($comment->url);
						
						$comment->comment = make_clickable(stripslashes($comment->comment)); // annotation comment
									
						$subject = '['.get_bloginfo('name').'] Please moderate a new highlight';
						$message .= 'A new highlight on the post "'.$post->post_title.'" is waiting for your approval '.make_clickable(get_permalink($annotation->postID)).'<br /><br />';
						$message .= 'Author : '.$comment->name.' (IP: '.$_SERVER['REMOTE_ADDR'].')'.'<br />';
						$message .= 'Email: '.make_clickable($comment->email).'<br />';
						$message .= 'URL: '.make_clickable($comment->url).'<br />';
						$message .= 'Comment: '.$comment->comment.'<br />'.'<br />';
						$message .= 'Approve it: '.make_clickable(admin_url('admin.php').'?page=Highlights&changeStatus=approved&id='.$lastid).'<br />';
						$message .= 'Trash it: '.make_clickable(admin_url('admin.php').'?page=Highlights&changeStatus=trash&id='.$lastid).'<br />';
						$message .= 'Spam it: '.make_clickable(admin_url('admin.php').'?page=Highlights&changeStatus=spam&id='.$lastid).'<br />';
						if($count[0]->c) {
							$message .= 'Currently '.$count[0]->c.' highlights/responses are waiting for approval. Please visit the moderation panel: '.make_clickable(admin_url('admin.php').'?page=Highlights');
						}
						
						$headers  = 'MIME-Version: 1.0' . "\r\n";
						$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
						
						wp_mail(get_bloginfo('admin_email'), $subject, $message, $headers);
					}
				}
				
				$message = '';
				
				if(get_option('ANNOtype_notifySites') == 'On') {
					$comment = $this->getComment($lastid);
					$comment = $comment[0];
					
					$annotation = $this->getAnnotationByID($_POST['ID']);
					$annotation = $annotation[0];
					$post = get_post($annotation->postID);
					
					$allComments = $this->getComments($_POST['ID']);
					
					if($comment->userID) { // is this user already registered?
						$user = get_userdata($comment->userID);
						
						$comment->name = $user->display_name;
						$comment->url = $user->user_url;
						$comment->email = $user->user_email;
					}
					
					$comment->url = esc_url($comment->url);
					
					$comment->comment = make_clickable(stripslashes($comment->comment)); // annotation comment
						
					$subject = $comment->name.' replied to your comment on '.$post->post_title;
					
					$message .= $comment->name.' replied to your comment on <a href="'.get_permalink($post->ID).'">'.$post->post_title.'</a> / <a href="'.get_bloginfo('wpurl').'">'.get_bloginfo('name').'</a>:<br /><br />';
					$message .= '"'.$comment->comment.'"<br /><br />';
					$message .= '<a href="'.get_permalink($post->ID).'#annotationID_'.$annotation->ID.'">Go to comment</a><br /><br />';
					$message .= 'In reply to your comment:<br /><br />';
					$message .= '"'.make_clickable(stripslashes($allComments[0]->comment)).'"<br /><br />';
					$message .= '- - -<br />';
					$message .= 'This email was sent by Highlighter, the best way to share content.';
					
					$headers  = 'MIME-Version: 1.0' . "\r\n";
					$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
					
					if($allComments[0]->userID) {
						$user = get_userdata($allComments[0]->userID);
						$allComments[0]->email = $user->user_email;
					}
					wp_mail($allComments[0]->email, $subject, $message, $headers);
				}
			} else {
				echo 'spam';
			}
			
			exit;
		}
		
		function getComment($ID)
		{
			global $wpdb;
			
			return $wpdb->get_results('SELECT * FROM '.$wpdb->prefix.'annotationcomments WHERE ID = "'.$ID.'" ORDER BY ID ASC');
		}
		
		function getANNOComment($ID)
		{
			global $wpdb;
			
			return $wpdb->get_results('SELECT * FROM '.$wpdb->prefix.'annotationcomments WHERE annotationID = "'.$ID.'" AND status = "approved" ORDER BY ID ASC');
		}
		
		function getComments($ID)
		{
			global $wpdb;
			
			return $wpdb->get_results('SELECT * FROM '.$wpdb->prefix.'annotationcomments WHERE status = "approved" AND annotationID = "'.$ID.'" ORDER BY id ASC');
		}
		
		function getCommentsByAnnotationID($postID)
		{
			global $wpdb;
			
			//return $wpdb->get_results('SELECT * FROM '.$wpdb->prefix.'annotationcomments LEFT JOIN '.$wpdb->prefix.'annotations ON ('.$wpdb->prefix.'annotations.ID = '.$wpdb->prefix.'annotationcomments.annotationID) WHERE status = "approved" AND '.$wpdb->prefix.'annotations.postID = "'.$postID.'" AND '.$wpdb->prefix.'annotations.subtype = "txt" ORDER BY wp_annotationcomments.ID DESC');
			return $wpdb->get_results('SELECT * FROM '.$wpdb->prefix.'annotationcomments LEFT JOIN '.$wpdb->prefix.'annotations ON ('.$wpdb->prefix.'annotations.ID = '.$wpdb->prefix.'annotationcomments.annotationID) WHERE status = "approved" AND '.$wpdb->prefix.'annotations.postID = "'.$postID.'" AND '.$wpdb->prefix.'annotations.subtype = "txt" ORDER BY wp_annotationcomments.ID DESC');
		}
		
		function getAnnotationsByID($postID)
		{
			global $wpdb;
			
			return $wpdb->get_results('SELECT * FROM '.$wpdb->prefix.'annotations WHERE postID = "'.$postID.'"');
		}
		
		function getAnnotationByID($id)
		{
			global $wpdb;
			
			return $wpdb->get_results('SELECT * FROM '.$wpdb->prefix.'annotations WHERE id = "'.$id.'"');
		}
		
		function getAnnotationByTextAndPostID()
		{
			global $wpdb;
			
			echo json_encode($wpdb->get_results('SELECT * FROM '.$wpdb->prefix.'annotations WHERE text = "'.$_POST['selectedText'].'" AND postID = "'.$_POST['postID'].'"'));
				
			exit;
		}
		
		function deleteComment($ID)
		{
			global $wpdb;
			
			$wpdb->query('DELETE FROM '.$wpdb->prefix.'annotationcomments WHERE ID = "'.$ID.'"');
		}
		
		function getPostID($annotationID)
		{
			global $wpdb;
			
			return $wpdb->get_results('SELECT postID FROM '.$wpdb->prefix.'annotations WHERE ID ="' . $annotationID .'"');
		}
		
		function mceCSS()
		{
			return UBD_URL.'/public/tinyMCE.css';
		}
		
		function editPost($postID)
		{
			global $wpdb;
			
			$post = get_post($postID);
			
			$content = $post->post_content;
	
			$searchAnnotations = preg_match_all('/<span id="annotationID_(.+?)" class="annotation">(.+?)<\/span>/', $content, $matches, PREG_PATTERN_ORDER);
			
			foreach($matches[1] as $key => $annotationID) {
				$wpdb->update($wpdb->prefix.'annotations', array('text' => $matches[2][$key]), array('ID' => $annotationID), array('%s'), array('%d'));	
			}
		}
		
		function changeStatus($ID, $newStatus)
		{
			global $wpdb;
			
			$accepted = array('approved', 'pending', 'spam', 'trash');
			
			if(in_array($newStatus, $accepted)) {
				$wpdb->update($wpdb->prefix.'annotationcomments', array('status' => $newStatus), array('ID' => $ID), array('%s'), array('%d'));
			}
		}
		
		function css()
		{
			global $post;
			
			$enabled = get_option('highlightr_post_'.$post->ID);
			$pages = get_option('ANNOtype_pages');
			if(is_single() || (is_page() && $pages == 'Off') && $enabled != 'Off') {
				wp_deregister_script('jquery');
				wp_enqueue_script('jquery', UBD_URL.'/public/js/jquery.min.js', '', '1.4.3');
				wp_enqueue_script('jquery.c', UBD_URL.'/public/js/jquery.c.js', 'jquery', '1');
				wp_enqueue_script('jquery.tipTip', UBD_URL.'/public/js/jquery.tipTip.js', 'jquery', '1.2');
				wp_enqueue_script('jquery.fancybox', UBD_URL.'/public/js/jquery.fancybox.js', 'jquery', '1.3.1');
				wp_enqueue_script('effects.core', UBD_URL.'/public/js/effects.core.js', 'jquery', '1.7.2');
				wp_enqueue_script('effects.slide', UBD_URL.'/public/js/effects.slide.js', 'jquery', '1.7.2');
				wp_enqueue_script('jquery.timeago', UBD_URL.'/public/js/jquery.timeago.js', 'jquery', '0.9.2');
				wp_enqueue_script('rangy', UBD_URL.'/public/js/rangy.js', '0.1.195');
				
				if(is_user_logged_in()) {
					$loggedIn = 'On';
				} else {
					$loggedIn = 'Off';
				}
				
				wp_enqueue_script('ANNOtype', UBD_URL.'/public/js/ANNOtypeMain.js', 'jquery', '1');
				wp_localize_script('ANNOtype', 'ANNOVars', array(
					'ajaxUrl' => admin_url('admin-ajax.php'),
					'pluginUrl' => UBD_URL,
					'postID' => $post->ID,
					'highlight' => get_option('ANNOtype_highlightAnnotations'),
					'highlightColor' => get_option('ANNOtype_highlightColor'),
					'underline' => get_option('ANNOtype_dashedUnderline'),
					'aweber' => get_option('ANNOtype_aweber'),
					'aweberListName' => get_option('ANNOtype_aweberListName'),
					'bubbleLinkColor' => get_option('ANNOtype_bubbleLinkColor'),
					'visitorsAnnotate' => get_option('ANNOtype_visitorsAnnotate'),
					'words' => get_option('ANNOtype_visitorsAnnotateWords'),
					'sentences' => get_option('ANNOtype_visitorsAnnotateSentences'),
					'images' => get_option('ANNOtype_visitorsAnnotateImages'),
					'userLoggedIn' => $loggedIn,
					'length' => get_option('ANNOtype_annotationLength'),
					'lengthLimit' => get_option('ANNOtype_charCount'),
					'bubbleCount' => get_option('ANNOtype_bubbleCount'),
					'collector' => get_option('ANNOtype_collector'),
					'post_title' => $post->post_title,
					'post_permalink' => get_permalink($post->ID),
					'blogname' => get_bloginfo('blogname'),
					'blogurl' => get_bloginfo('wpurl')
				));
				
				wp_register_style('ANNOtype', UBD_URL.'/public/ANNOtype.css');
				wp_enqueue_style('ANNOtype');
			}
			wp_enqueue_script('jquery');
			wp_enqueue_script('ANNOtypeBasic', UBD_URL.'/public/js/ANNOtypeBasic.js', 'jquery', '1');
			
			wp_register_style('ANNOtypeBasic', UBD_URL.'/public/ANNOtypeBasic.css');
			wp_enqueue_style('ANNOtypeBasic');
		}
		
		function footer()
		{
			wp_reset_query();
			global $post;
			
			$enabled = get_option('highlightr_post_'.$post->ID);
			$pages = get_option('ANNOtype_pages');
			if(is_single() || (is_page() && $pages == 'Off') && $enabled != 'Off') {
				global $user_ID;
				if($user_ID) {
					if(current_user_can('level_10')) {
						$is_admin = true;
					} else {
						$is_admin = false;
					}
				}
				
				$postID = $post->ID;
				
				/* Bubble with count */
				
				foreach($this->getAnnotationsByID($postID) as $id => $annotation) {
					$annotations = count($this->getANNOComment($annotation->ID));
					echo "<div style='display: none;' class='ANNOBubbleCount' id='ANNOtype_bubble_count_{$annotation->ID}'>{$annotations}</div>";
				}
				
				/* Top Bar */
				
				if(get_option('ANNOtype_topBar') == 'On') { ?>
				<div class='ANNOTopBar'>
					<a href='#' class='close'><span>Close</span></a>
					<p>Highlighting is <span>Turned On</span> - Give it a try by highlighting some text or hovering over an image!</p>
					<a target='_blank' href='http://highlighter.com' class='logo'><img src='<?php echo UBD_URL; ?>/public/images/topBarLogo.png' alt='powered by Highlighter' /></a>
				</div>
				<?php }
				
				/* Pre-loading the annotations for this post */
				
				if(get_option('ANNOtype_allowLoginFacebook') != 'On' || $_SESSION['status'] == 'verified' || is_user_logged_in()) {
					unset($_COOKIE['fbs_'.get_option('ANNOtype_facebookAPIKey')]);
				}
				
				echo "<div id='ANNOScreenOverlay' style='visibility: hidden;'></div>";
				
				// Moderation Bubble
				echo "<div id='ANNOtype_bubble_moderation' class='ANNOtype_bubble' style='border-color: #".get_option('ANNOtype_bubbleTitleBarColor')." !important;'>";
					echo "<div class='before' style='border-bottom-color: #".get_option('ANNOtype_bubbleTitleBarColor')." !important;'></div>";
					echo "<div style='background-color: #".get_option('ANNOtype_bubbleTitleBarColor')." !important; color: #".get_option('ANNOtype_bubbleLinkColor')." !important;' class='ANNOtype_bubbleTitle'>";
						echo "<h1><a target='_blank' href='http://highlighter.com'>Highlighter</a></h1>";
						echo "<a href='#' class='closeBubble'><img src='".UBD_URL."/public/images/bubble2/closeButton.png' alt='Close Bubble' /></a>";
					echo "</div>";
					echo "<div class='ANNOtype_bubbleContainer' style='background-color: #".get_option('ANNOtype_bubbleShellColor')." !important;'>";
						echo "<h3 style='font-size: 14px !important; font-weight: bold !important; color: #".get_option('ANNOtype_bubbleFontColor')." !important;'>Thank you for your comment!</h3>";
						if(!is_user_logged_in()) {
							echo "<p style='margin: 0 !important; margin-top: 10px !important; font-size: 12px !important; color: #".get_option('ANNOtype_bubbleFontColor')." !important;'>Your comment will be shown publicly once it is approved by site moderator.</p>";
						}
					echo "</div>";
					echo "<div style='background-color: #".get_option('ANNOtype_bubbleTitleBarColor')." !important; color: #".get_option('ANNOtype_bubbleLinkColor')." !important;' class='getANNOtype'></div>";
				echo "</div>";
				
				// Bubble 2.0
				foreach($this->getAnnotationsByID($postID) as $id => $annotation) {
					echo "<div id='ANNOtype_bubble_{$annotation->ID}' class='ANNOtype_bubble' style='border-color: #".get_option('ANNOtype_bubbleTitleBarColor')." !important;'>";
						echo "<input type='hidden' name='selectedText' value='{$annotation->text}' />";
						echo "<input type='hidden' name='annotationID' value='{$annotation->ID}' />";
						
						echo "<div class='before' style='border-bottom-color: #".get_option('ANNOtype_bubbleTitleBarColor')." !important;'></div>";
						echo "<div style='background-color: #".get_option('ANNOtype_bubbleTitleBarColor')." !important; color: #".get_option('ANNOtype_bubbleLinkColor')." !important;' class='ANNOtype_bubbleTitle'>";
							echo "<h1><a target='_blank' href='http://highlighter.com'>Highlighter</a></h1>";
							echo "<a href='#' class='closeBubble'><img src='".UBD_URL."/public/images/bubble2/closeButton.png' alt='Close Bubble' /></a>";
							//echo "<a href='#' class='expandBubble'><img src='".UBD_URL."/public/images/expand.png' alt='Expand Bubble' /></a>";
						echo "</div>";
						echo "<div class='ANNOtype_bubbleSorting' style='font-size: 10px !important; background-color: #".get_option('ANNOtype_bubbleSortColor')." !important; color: #".get_option('ANNOtype_bubbleSortFontColor')." !important;'>";
						 	echo "Sort by <a style='font-size: 10px !important; text-decoration: none !important; color: #".get_option('ANNOtype_bubbleSortFontColor')." !important;' href='#newest'>Newest</a> <a style='font-size: 10px !important; text-decoration: none !important; color: #".get_option('ANNOtype_bubbleSortFontColor')." !important;' href='#oldest'>Oldest</a> <a style='font-size: 10px !important; text-decoration: none !important; color: #".get_option('ANNOtype_bubbleSortFontColor')." !important;' href='#rating'>Likes</a>";
						echo "</div>";
						echo "<div class='ANNOtype_bubbleContainer' style='background-color: #".get_option('ANNOtype_bubbleShellColor')." !important;'>";
							/*if(get_option('ANNOtype_adsense') == 'On' && get_option('ANNOtype_adsenseID') && get_option('ANNOtype_adPosition') == 'top') {
								echo "<div class='topAdsense'>";
									echo '<script type="text/javascript">
									google_ad_client = "pub-'.get_option('ANNOtype_adsenseID').'";
									google_ad_width = 200;
									google_ad_height = 90;
									google_ad_format = "200x90_0ads_al";
									google_color_border = "'.get_option('ANNOtype_bubbleShellColor').'";
									google_color_bg = "'.get_option('ANNOtype_bubbleShellColor').'";
									google_color_link = "'.get_option('ANNOtype_bubbleLinkColor').'";
									google_color_text = "'.get_option('ANNOtype_bubbleFontColor').'";
									google_color_url = "'.get_option('ANNOtype_bubbleFontColor').'";
									</script><script type="text/javascript" src="http://pagead2.googlesyndication.com/pagead/show_ads.js"></script>';
								echo "</div>";
								echo "<div class='ANNOsep' style='background-color: #".get_option('ANNOtype_bubbleTitleBarColor').";'></div>";
							}*/
							
							$comments = $this->getComments($annotation->ID);
							
							if($comments) {
								$comment = $comments[0];
								if($comment->userID) { // is this user already registered?
									$user = get_userdata($comment->userID);
									
									$comment->name = $user->display_name;
									$comment->url = $user->user_url;
									$comment->email = $user->user_email;
								}
								
								$comment->url = esc_url($comment->url);
								$comment->name = $comment->name;
														
								if($comment->url) {
									$comment->name = "<a style='text-decoration: none !important; font-size: 14px !important; font-weight: bold !important; color: #".get_option('ANNOtype_bubbleLinkColor')." !important;' href='{$comment->url}'>{$comment->name}</a>";
								}
								
								$comment->comment = make_clickable(stripslashes($comment->comment)); // annotation comment
							
								if($comment->email) { // if annoated by a registered user, get gravatar
									$avatar = get_avatar($comment->email, 24, UBD_URL.'/public/images/annotar.jpg');
								} elseif(strpos($comment->url, 'twitter') !== false) { // if its a twitter user, get twitter avatar
									$getUser = preg_match_all('#http://(.*)twitter.com/(.*)#', $comment->url, $matches);
									$twitterID = $matches[2][0];
									$avatar = "<img src='http://img.tweetimag.es/i/{$twitterID}_m' alt='{$twitterID}' />";
								} else { // else no avatar
									$avatar = '';
								}
								
								echo "<div class='ANNOmainComment' data-likes='".$comment->likes."' data-date='".$comment->timestamp."' id='ANNOComment_{$comment->ID}' style='margin-bottom: 15px !important;'>";
									echo "<div class='ANNOmainCommentTitle'>";
										echo "<div class='ANNOmainCommentTitleDetails'>";
											echo $avatar;
											echo "<span class='name' style='font-size: 14px !important; font-weight: bold !important; color: #".get_option('ANNOtype_bubbleFontColor')." !important;'>{$comment->name}</span>";
										echo "</div>";
										echo "<div class='ANNOmainCommentLike'>";
											if(get_option('ANNOtype_ratings') == 'On') {
												if($_COOKIE['ANNOCommentID_'.$comment->ID] == 'like') {
													echo "<a href='#' class='like' style='display: none  !important; color: #".get_option('ANNOtype_bubbleButtonFontColor')." !important; background-color: #".get_option('ANNOtype_bubbleButtonColor')." !important;'>Like</a>";
													echo "<a href='#' class='unlike' style='color: #".get_option('ANNOtype_bubbleButtonFontColor')." !important; background-color: #".get_option('ANNOtype_bubbleButtonColor')." !important;'>Unlike</a>";	
												} else {
													echo "<a href='#' class='like' style='color: #".get_option('ANNOtype_bubbleButtonFontColor')." !important; background-color: #".get_option('ANNOtype_bubbleButtonColor')." !important;'>Like</a>";
													echo "<a href='#' class='unlike' style='display: none !important; color: #".get_option('ANNOtype_bubbleButtonFontColor')." !important; background-color: #".get_option('ANNOtype_bubbleButtonColor')." !important;'>Unlike</a>";
												}
												
												if($comment->likes == 0) {
													$style = 'display: none !important;';
												} else {
													$style = '';
												}
												echo "<span class='count' style='margin-left: 5px !important; color: #".get_option('ANNOtype_bubbleFontColor')." !important; {$style}'>+<span class='likes'>{$comment->likes}</span></span>";
											}
										echo "</div>";
									echo "</div>";
									echo "<div class='ANNOmainCommentComment' style='margin: 0  !important; margin-bottom: 5px  !important; background: #".get_option('ANNOtype_bubbleMainBg')." !important; padding: 10px !important; border: 1px #".get_option('ANNOtype_bubbleMainBorder')." solid !important; color: #".get_option('ANNOtype_bubbleMainColor')." !important;'>";
										echo $comment->comment;
									echo "</div>";
									echo "<span class='date' style='color: #".get_option('ANNOtype_bubbleFontColor')." !important; font-size: 11px !important; text-decoration: none !important; border: 0 !important;'>Posted <abbr class='timeago' style='text-decoration: none !important; border: 0 !important;' title='".date('c', $comment->timestamp)."'>".date('M, d Y', $comment->timestamp)."</abbr></span>";
								echo "</div>";
							} else {
								echo "<div class='ANNOmainComment' id='ANNOComment_{$comment->ID}' style='margin-bottom: 15px !important;'>";
									echo "<div class='ANNOmainCommentComment' style='margin: 0 !important; margin-bottom: 5px !important; background: #".get_option('ANNOtype_bubbleMainBg')." !important; padding: 10px !important; border: 1px #".get_option('ANNOtype_bubbleMainBorder')." solid !important; color: #".get_option('ANNOtype_bubbleMainColor')." !important;'>";
										echo 'Your comment is in moderation.';
									echo "</div>";
								echo "</div>";
								echo "<input type='hidden' name='status' value='pending' />";
							}
							
							if(count($comments) >= 2) {
								echo "<div class='ANNOresponses'>";
							} else {
								echo "<div class='ANNOresponses' style='display: none !important;'>";
							}
							
							echo "<ul style='list-style: none !important; margin: 0 !important; padding: 0 !important;'>";
								if($comments) {
									$count = 1;
									$count_list = 1;
									
									foreach($comments as $comment) {
										if($comment->userID) { // is this user already registered?
											$user = get_userdata($comment->userID);
											
											$comment->name = $user->display_name;
											$comment->url = $user->user_url;
											$comment->email = $user->user_email;
										}
										
										$comment->url = esc_url($comment->url);
										$comment->name = $comment->name;
										
										if($comment->url) {
											$comment->name = "<a style='text-decoration: none !important; font-size: 14px !important; font-weight: bold !important; color: #".get_option('ANNOtype_bubbleLinkColor')." !important;' href='{$comment->url}'>{$comment->name}</a>";
										}
										
										$comment->comment = make_clickable(stripslashes($comment->comment)); // annotation comment
									
										if($comment->email) { // if annoated by a registered user, get gravatar
											$avatar = get_avatar($comment->email, 24, UBD_URL.'/public/images/annotar.jpg');
										} elseif(strpos($comment->url, 'twitter') !== false) { // if its a twitter user, get twitter avatar
											$getUser = preg_match_all('#http://(.*)twitter.com/(.*)#', $comment->url, $matches);
											$twitterID = $matches[2][0];
											$avatar = "<img src='http://img.tweetimag.es/i/{$twitterID}_m' alt='{$twitterID}' />";
										} else { // else no avatar
											$avatar = '';
										}
										
										if($count == 3) {
											$count = 1;
										}
										
										if($count == 2) {
											$style = 'background-color:#'.get_option('ANNOtype_bubbleAltCommentColor').' !important;';
										} else {
											$style = '';
										}
										
										if($count_list == 1) {
											$style_d = 'display: none !important;';
										} else {
											$style_d = '';
										}
										
										$count_list++;
										
										echo "<li data-likes='".$comment->likes."' data-date='".$comment->timestamp."' style='{$style} {$style_d} padding: 10px !important; border-color: #".get_option('ANNOtype_bubbleCommentSepColor')." !important;' id='ANNOComment_{$comment->ID}'>";
											echo "<div class='ANNOresponseTitle'>";
												echo "<div class='ANNOresponseTitleDetails'>";
													echo $avatar;
													echo "<span class='name' style='font-size: 14px !important; font-weight: bold !important; color: #".get_option('ANNOtype_bubbleFontColor')." !important;'>{$comment->name}</span>";
												echo "</div>";
												if($is_admin) {
													echo "<div class='ANNOresponseTitleAdmin' style='display: none !important;'>";
														echo "<a href='".admin_url('admin.php')."?page=Highlights&action=edit&id={$comment->ID}'><img src='".UBD_URL."/public/images/bubble2/edit.png' alt='Edit' /></a>";
														echo "<a href='".admin_url('admin.php')."?page=Highlights&changeStatus=trash&id={$comment->ID}'><img src='".UBD_URL."/public/images/bubble2/delete.png' alt='Delete' /></a>";
													echo "</div>";
												}
											echo "</div>";
											echo "<div class='ANNOresponseComment' style='font-size: 11px !important; color: #".get_option('ANNOtype_bubbleFontColor')." !important;'>";
												echo $comment->comment;
											echo "</div>";
											echo "<div class='ANNOresponseMeta'>";
												echo "<span class='date' style='color: #".get_option('ANNOtype_bubbleFontColor')." !important; font-size: 11px !important;'>Posted <abbr class='timeago' title='".date('c', $comment->timestamp)."'>".date('M, d Y', $comment->timestamp)."</abbr></span>";
												echo "<div class='ANNOresponseAction'>";
													//echo "<a href='#' style='color: #".get_option('ANNOtype_bubbleButtonFontColor')."; background-color: #".get_option('ANNOtype_bubbleButtonColor')."; margin-right: 5px;' class='reply'>Reply</a>";
													if(get_option('ANNOtype_ratings') == 'On') {
														
														if($_COOKIE['ANNOCommentID_'.$comment->ID] == 'like') {
															echo "<a href='#' class='like' style='display: none !important; color: #".get_option('ANNOtype_bubbleButtonFontColor')." !important; background-color: #".get_option('ANNOtype_bubbleButtonColor')." !important;'>Like</a>";
															echo "<a href='#' class='unlike' style='color: #".get_option('ANNOtype_bubbleButtonFontColor')." !important; background-color: #".get_option('ANNOtype_bubbleButtonColor')." !important;'>Unlike</a>";	
														} else {
															echo "<a href='#' class='like' style='color: #".get_option('ANNOtype_bubbleButtonFontColor')." !important; background-color: #".get_option('ANNOtype_bubbleButtonColor')." !important;'>Like</a>";
															echo "<a href='#' class='unlike' style='display: none !important; color: #".get_option('ANNOtype_bubbleButtonFontColor')." !important; background-color: #".get_option('ANNOtype_bubbleButtonColor')." !important;'>Unlike</a>";
														}
														
														if($comment->likes == 0) {
															$style = 'display: none !important;';
														} else {
															$style = '';
														}
														echo "<span class='count' style='margin-left: 5px !important; color: #".get_option('ANNOtype_bubbleFontColor')." !important; {$style}'>+<span class='likes'>{$comment->likes}</span></span>";
													}
												echo "</div>";
											echo "</div>";
										echo "</li>";
										
										$count++;
									}
								}
							echo "</ul>";
							
							echo "</div>";
							
							echo "<div class='respondForm' style='margin-top: 25px !important;'>
								<h2 style='font-size: 14px !important; margin-bottom: 10px !important; border-bottom: 1px #".get_option('ANNOtype_bubbleCommentSepColor')." solid !important; padding-bottom: 3px !important; color:#".get_option('ANNOtype_bubbleFontColor')." !important; font-weight: bold !important;'>Post a Response</h2>";
								echo "<div class='ANNOtype_bubbleRespond'>";
								if(is_user_logged_in()) {
									global $current_user;
									$current_user = wp_get_current_user();
									echo "<input type='hidden' name='userID' value='{$current_user->ID}' />";
									echo "<div class='ANNOtype_twitter' style='margin-bottom: 10px !important;'>";
										echo "<p class='avatar' style='float: left !important; padding:0 !important; margin: 0 !important; margin-right: 5px !important;'>".get_avatar($current_user->ID, 32)."</p>";
										echo "<div style='float: left !important;'>";
											echo "<h3 style='margin: 0 !important; font-size: 13px !important; font-weight: bold !important; color: #".get_option('ANNOtype_bubbleFontColor')." !important;'>{$current_user->display_name}</h3>";
											$postID = $this->getPostID($annotation->ID);
											echo "<p style='margin: 0 !important;'>(<a style='font-size: 10px !important; color: #".get_option('ANNOtype_bubbleFontColor')." !important; text-decoration: none !important;' href='".wp_logout_url(get_permalink($postID[0]->postID))."'>Log Out</a>)</p>";
											
										echo "</div>";
										
										if(get_option('ANNOtype_moderation') == 'On') {
									echo '<div class="moderation" style="margin: 0 !important; margin-top:17px !important; font-size: 11px !important; font-weight: normal !important; color: #'.get_option('ANNOtype_bubbleFontColor').' !important; float:right !important;">
											Moderation is ON.
											<a href="Your comment will not appear until it is approved by the author." class="help"><img style="padding-bottom: 2px !important;" src="'.UBD_URL.'/public/images/bubble2/help.png" alt="Help" /></a>
										</div>';}
										
										echo "<div style='clear: left !important;'></div>";
										
										echo "<div class='ANNOtype_bubbleText'>";
										echo "<input type='hidden' name='name' value='{$twitterUser->name}' />";
										echo "<input type='hidden' name='website' value='http://twitter.com/{$twitterUser->screen_name}' />";
										echo "</div>";
										
										
											
								
										
									echo "</div>";
								}
								
							
								if($_SESSION['status'] == 'verified') {
									include 'twitteroauth/twitteroauth.php';
									$access_token = $_SESSION['access_token'];
									$twitterConnect = new TwitterOAuth(get_option('ANNOtype_twitterConsumerKey'), get_option('ANNOtype_twitterConsumerSecret'), $access_token['oauth_token'], $access_token['oauth_token_secret']);
									$twitterUser = $twitterConnect->get('account/verify_credentials');
								
									echo "
									<div class='ANNOtype_twitter' style='margin-bottom: 10px !important;'>";
										echo "<img style='float: left !important; margin-right: 5px !important;' src='http://img.tweetimag.es/i/{$twitterUser->screen_name}_n' alt='{$twitterUser->screen_name}' />";
										echo "<div style='float: left !important;'>";
											echo "<h3 style='margin: 0 !important; font-size: 13px !important; font-weight: normal !important; color: #".get_option('ANNOtype_bubbleFontColor')." !important;'>{$twitterUser->screen_name}</h3>";
											$postID = $this->getPostID($annotation->ID);
											echo "<p style='margin: 0 !important;'>(<a style='font-size: 10px !important; color: #".get_option('ANNOtype_bubbleFontColor')." !important; text-decoration: none !important;' href='".UBD_URL."/twitteroauth/signout.php?url=".get_permalink($postID[0]->postID)."'>Log Out</a>)</p>";
										echo "</div>";
			
										echo "<div style='clear: left !important;'></div>";
										
										echo "<div class='ANNOtype_bubbleText'>";
										echo "<input type='hidden' name='name' value='{$twitterUser->name}' />";
										echo "<input type='hidden' name='website' value='http://twitter.com/{$twitterUser->screen_name}' />";
										echo "</div>";
									echo "</div><div style='height: 1px !important; width: 298px !important; background: silver !important; display: block !important; margin-top: 5px !important;'></div>";
								}
								
								if(isset($_COOKIE['fbs_'.get_option('ANNOtype_facebookAPIKey')])) {
								?>
								<div id="fb-root"></div>
								<script src="http://connect.facebook.net/en_US/all.js"></script>
								<script>
								  FB.init({appId: '<?php echo get_option('ANNOtype_facebookAPIKey'); ?>', status: true, cookie: true, xfbml: true});
								</script>
								<?php
									if(!function_exists('get_facebook_cookie')) {
										function get_facebook_cookie($app_id, $application_secret) {
										  $args = array();
										  parse_str(trim($_COOKIE['fbs_' . $app_id], '\\"'), $args);
										  ksort($args);
										  $payload = '';
										  foreach ($args as $key => $value) {
										    if ($key != 'sig') {
										      $payload .= $key . '=' . $value;
										    }
										  }
										  if (md5($payload . $application_secret) != $args['sig']) {
										    return null;
										  }
										  return $args;
										}
									}
									
									$cookie = get_facebook_cookie(get_option('ANNOtype_facebookAPIKey'), get_option('ANNOtype_facebookSecretKey'));
									$user = json_decode(file_get_contents('https://graph.facebook.com/me?access_token='.$cookie['access_token']));
				
									echo "<div id='ANNOtype_facebook' style='margin-bottom: 10px !important;'>";
										echo "<h3 style='margin: 0 !important; font-size: 13px !important; font-weight: normal !important; color: #".get_option('ANNOtype_bubbleFontColor')." !important;'>{$user->first_name}</h3>";
										$postID = $this->getPostID($annotation->ID);
										echo "<p style='margin: 0 !important;'>".'<a href="#" style="font-size: 10px !important; color: #'.get_option('ANNOtype_bubbleFontColor').' !important; text-decoration: none !important;" onclick="FB.logout(function() {window.location.reload();});return false;">'."(Log Out)</a></p>";
										
										echo "<div class='ANNOtype_bubbleText'>";
										echo "<input type='hidden' name='name' value='{$user->name}' />";
										echo "<input type='hidden' name='website' value='{$user->link}' />";
										echo "</div>";
									echo "</div><div style='height: 1px !important; width: 298px !important; background: silver !important; display: block !important; margin-top: 5px !important;'></div>";
								}
								
								echo "
								
								<textarea cols='10' rows='5' name='annotation' onfocus='if (this.value == \"What is on your mind?\") {this.value = \"\";}' onblur='if (this.value == \"\") {this.value = \"What is on your mind?\";}'>What is on your mind?</textarea>";
								
								if(!is_user_logged_in() AND $_SESSION['status'] != 'verified' AND !isset($_COOKIE['fbs_'.get_option('ANNOtype_facebookAPIKey')])) {
									echo "<div class='ANNOtype_bubbleFields'>";
									echo "<div class='ANNOtype_bubbleText'>";
									echo "<div class='ANNOtype_bubbleName'>";
										echo "<p><input class='name' type='text' name='name' value='Name (required)' onfocus='if (this.value == \"Name (required)\") {this.value = \"\";}' onblur='if (this.value == \"\") {this.value = \"Name (required)\";}' /></p>";
										
										if(get_option('ANNOtype_requireEmail') == 'On') {
											echo "<p><input class='email' type='text' name='email' value='Email (required, private)' onfocus='if (this.value == \"Email (required, private)\") {this.value = \"\";}' onblur='if (this.value == \"\") {this.value = \"Email (required, private)\";}' /></p>";
										} else {
											echo "<p><input class='email' type='text' name='email' value='Email (optional, private)' onfocus='if (this.value == \"Email (optional, private)\") {this.value = \"\";}' onblur='if (this.value == \"\") {this.value = \"Email (optional, private)\";}' /></p>";
										}
									echo "</div>";
									
									echo "<p><input type='text' name='website' value='Website (optional)' onfocus='if (this.value == \"Website (optional)\") {this.value = \"\";}' onblur='if (this.value == \"\") {this.value = \"Website (optional)\";}' /></p>";
					
									echo "<input type='hidden' name='emailRequired' value='".get_option('ANNOtype_requireEmail')."' />";
									echo "</div>";
									echo "</div><div style='height: 1px !important; width: 298px !important; background: silver !important; display: block !important; margin-top: 5px !important;'></div>";
								}
								
								echo "<input type='hidden' name='annotationID' value='{$annotation->ID}' />";
								
								echo '<div class="ANNOtype_bubbleDiscussButton">';
									echo "<a href='#'class='commentAnnotation' style='font-size: 11px !important; background-color: #".get_option('ANNOtype_bubblePostButtonColor')." !important; color: #".get_option('ANNOtype_bubblePostButtonFontColor')." !important;'>Post Comment &rsaquo;</a>";
										// This is the email checkbox for existing bubbles.
										if(is_user_logged_in() == false && (get_option('ANNOtype_aweber') == 'On' || get_option('ANNOtype_mailchimp') == 'On' || get_option('ANNOtype_getResponse') == 'On')) {
											echo '<div class="subscribeupdates" style="margin: 0 !important; font-size: 11px !important; font-weight: normal !important; color: #'.get_option('ANNOtype_bubbleFontColor').' !important; float: left !important;">
											<input style="margin-left: 3px !important;" type="checkbox" checked="checked" name="subscribecheck" id="subscribecheck_bubble_'.$annotation->ID.'" />
												<label for="subscribecheck_bubble_'.$annotation->ID.'">Subscribe for updates</label>
											</div>';
										}
									
								echo '</div>';
								echo "</div>";
								
								if(!is_user_logged_in() && $_SESSION['status'] != 'verified' && !isset($_COOKIE['fbs_'.get_option('ANNOtype_facebookAPIKey')])) {
									if((get_option('ANNOtype_allowLoginFacebook') == 'On' && get_option('ANNOtype_facebookAPIKey') && get_option('ANNOtype_facebookSecretKey') || (get_option('ANNOtype_allowLoginTwitter') == 'On' && get_option('ANNOtype_twitterConsumerKey') && get_option('ANNOtype_twitterConsumerSecret')))) {
										echo "<div class='ANNOtype_bubbleConnect'>";
										if($_SESSION['status'] != 'verified' && get_option('ANNOtype_allowLoginTwitter') == 'On' && get_option('ANNOtype_twitterConsumerKey') && get_option('ANNOtype_twitterConsumerSecret')) {
											$postID = $this->getPostID($annotationID);
											echo "<a href='".UBD_URL."/twitteroauth/redirect.php?url=".get_permalink($postID[0]->postID)."' id='ANNOtype_twitterConnect'><img src='".UBD_URL."/public/images/bubble2/twitterConnect.png' alt='Twitter Connect' /></a>";
										}
										if(!isset($_COOKIE['fbs_'.get_option('ANNOtype_facebookAPIKey')]) && get_option('ANNOtype_allowLoginFacebook') == 'On' && get_option('ANNOtype_facebookAPIKey') && get_option('ANNOtype_facebookSecretKey')) {
										?>
										<div id="fb-root"></div>
										<script src="http://connect.facebook.net/en_US/all.js"></script>
										<script>
										  FB.init({appId: '<?php echo get_option('ANNOtype_facebookAPIKey'); ?>', status: true, cookie: true, xfbml: true});
										  FB.Event.subscribe('auth.sessionChange', function(response) {
										    if (response.session) {
										    	window.location.reload();
										    } else {
										    	window.location.reload();
										    }
										  });
										</script>
										<?php
										echo "<a href='#' id='ANNOtype_facebookConnect'><img style='margin-right: 4px !important;' src='".UBD_URL."/public/images/bubble2/facebookConnect.png' alt='Facebook Connect' /></a>";
										}
										echo "<span style='margin-top: 0 !important; margin-bottom: 0 !important; font-size: 11px !important; font-weight: normal !important; color: #".get_option('ANNOtype_bubbleFontColor')."' !important;'>Sign in using</span>";
										echo "</div>";
									}
								}
								echo "</div>";
						echo "</div>";
						echo "<div style='background-color: #".get_option('ANNOtype_bubbleTitleBarColor')." !important; color: #".get_option('ANNOtype_bubbleLinkColor')." !important;' class='getANNOtype'></div>";
					echo "</div>";
					
					echo "<div id='ANNOtype_fullBubble_{$annotation->ID}' class='ANNOtype_bubble ANNOtype_fullBubble' style='border-color: #".get_option('ANNOtype_bubbleTitleBarColor')." !important;'>";
						echo "<input type='hidden' name='selectedText' value='{$annotation->text}' />";
						echo "<input type='hidden' name='annotationID' value='{$annotation->ID}' />";
						
						echo "<div style='background-color: #".get_option('ANNOtype_bubbleTitleBarColor')." !important; color: #".get_option('ANNOtype_bubbleLinkColor')." !important;' class='ANNOtype_bubbleTitle'>";
							echo "<h1><a target='_blank' href='http://highlighter.com'>Highlighter</a></h1>";
							echo "<a href='#' class='closeBubble'><img src='".UBD_URL."/public/images/bubble2/closeButton.png' alt='Close Bubble' /></a>";
							echo "<a href='#' class='collapseBubble'><img src='".UBD_URL."/public/images/collapse.png' alt='Collapse Bubble' /></a>";
						echo "</div>";
						echo "<div class='ANNOtype_bubbleSorting' style='font-size: 10px !important; background-color: #".get_option('ANNOtype_bubbleSortColor')." !important; color: #".get_option('ANNOtype_bubbleSortFontColor')." !important;'>";
						 	echo "<div class='ANNOtype_bubbleSort'>Sort by <a style='font-size: 10px !important; text-decoration: none !important; color: #".get_option('ANNOtype_bubbleSortFontColor')." !important;' href='#newest'>Newest</a> <a style='font-size: 10px !important; text-decoration: none !important; color: #".get_option('ANNOtype_bubbleSortFontColor')." !important;' href='#oldest'>Oldest</a> <a style='font-size: 10px !important; text-decoration: none !important; color: #".get_option('ANNOtype_bubbleSortFontColor')." !important;' href='#rating'>Likes</a></div>";
						 	echo "<div class='ANNOtype_bubbleSortingShare'>";
						 		echo "<span>Share</span>";
							 	echo "<ul>";
								if(get_option('ANNOtype_shareFacebook') == 'On') {
									echo "<li class='shareBar'><a href='#' class='FB'>Facebook</a></li>";
								}
								if(get_option('ANNOtype_shareTwitter') == 'On') {
									echo "<li class='shareBar'><a href='#' class='Twitter'>Twitter</a></li>";
								}
								if(get_option('ANNOtype_shareEmail') == 'On') {
									echo "<li class='shareBar'><a href='#' class='Email'>Email This</a></li>";
								}
							 	echo "</ul>";
						 	echo "</div>";
						echo "</div>";
						echo "<div class='ANNOtype_bubbleContainer' style='background-color: #".get_option('ANNOtype_bubbleShellColor')." !important;'>";
							/*if(get_option('ANNOtype_adsense') == 'On' && get_option('ANNOtype_adsenseID') && get_option('ANNOtype_adPosition') == 'top') {
								echo "<div class='topAdsense'>";
									echo '<script type="text/javascript">
									google_ad_client = "pub-'.get_option('ANNOtype_adsenseID').'";
									google_ad_width = 200;
									google_ad_height = 90;
									google_ad_format = "200x90_0ads_al";
									google_color_border = "'.get_option('ANNOtype_bubbleShellColor').'";
									google_color_bg = "'.get_option('ANNOtype_bubbleShellColor').'";
									google_color_link = "'.get_option('ANNOtype_bubbleLinkColor').'";
									google_color_text = "'.get_option('ANNOtype_bubbleFontColor').'";
									google_color_url = "'.get_option('ANNOtype_bubbleFontColor').'";
									</script><script type="text/javascript" src="http://pagead2.googlesyndication.com/pagead/show_ads.js"></script>';
								echo "</div>";
								echo "<div class='ANNOsep' style='background-color: #".get_option('ANNOtype_bubbleTitleBarColor').";'></div>";
							}*/
							
						
							echo "<h2 style='font-size: 14px !important; margin-bottom: 10px !important; color:#".get_option('ANNOtype_bubbleFontColor')." !important; font-weight: bold !important;'>Highlighted text</h2>";
							
							echo "<div class='ANNOmainComment' id='ANNOComment_{$comment->ID}' style='margin-bottom: 15px !important;'>";
								echo "<div class='ANNOmainCommentComment' style='margin: 0 !important; margin-bottom: 5px !important; background: #".get_option('ANNOtype_bubbleMainBg')." !important; padding: 10px !important; border: 1px #".get_option('ANNOtype_bubbleMainBorder')." solid !important; color: #".get_option('ANNOtype_bubbleMainColor')." !important;'>";
									echo $annotation->text;
								echo "</div>";
							echo "</div>";
							
							$comments = $this->getComments($annotation->ID);
							echo "<div class='ANNOresponses'>";
							
							echo "<ul style='list-style: none !important; margin: 0 !important; padding: 0 !important;'>";
								if($comments) {
									$count = 1;
									
									foreach($comments as $comment) {
										if($comment->userID) { // is this user already registered?
											$user = get_userdata($comment->userID);
											
											$comment->name = $user->display_name;
											$comment->url = $user->user_url;
											$comment->email = $user->user_email;
										}
										
										$comment->url = esc_url($comment->url);
										$comment->name = $comment->name;
										
										if($comment->url) {
											$comment->name = "<a style='text-decoration: none !important; font-size: 14px !important; font-weight: bold !important; color: #".get_option('ANNOtype_bubbleLinkColor')." !important;' href='{$comment->url}'>{$comment->name}</a>";
										}
										
										$comment->comment = make_clickable(stripslashes($comment->comment)); // annotation comment
									
										if($comment->email) { // if annoated by a registered user, get gravatar
											$avatar = get_avatar($comment->email, 24, UBD_URL.'/public/images/annotar.jpg');
										} elseif(strpos($comment->url, 'twitter') !== false) { // if its a twitter user, get twitter avatar
											$getUser = preg_match_all('#http://(.*)twitter.com/(.*)#', $comment->url, $matches);
											$twitterID = $matches[2][0];
											$avatar = "<img src='http://img.tweetimag.es/i/{$twitterID}_m' alt='{$twitterID}' />";
										} else { // else no avatar
											$avatar = '';
										}
										
										if($count == 3) {
											$count = 1;
										}
										
										if($count == 2) {
											$style = 'background-color:#'.get_option('ANNOtype_bubbleAltCommentColor').' !important;';
										} else {
											$style = '';
										}
										
										echo "<li data-likes='".$comment->likes."' data-date='".$comment->timestamp."' style='{$style} padding: 10px !important; border-color: #".get_option('ANNOtype_bubbleCommentSepColor')." !important;' id='ANNOComment_{$comment->ID}'>";
											echo "<div class='ANNOresponseTitle'>";
												echo "<div class='ANNOresponseTitleDetails'>";
													echo $avatar;
													echo "<span class='name' style='font-size: 14px !important; font-weight: bold !important; color: #".get_option('ANNOtype_bubbleFontColor')." !important;'>{$comment->name}</span>";
												echo "</div>";
												if($is_admin) {
													echo "<div class='ANNOresponseTitleAdmin' style='display: none !important;'>";
														echo "<a href='".admin_url('admin.php')."?page=Highlights&action=edit&id={$comment->ID}'><img src='".UBD_URL."/public/images/bubble2/edit.png' alt='Edit' /></a>";
														echo "<a href='".admin_url('admin.php')."?page=Highlights&changeStatus=trash&id={$comment->ID}'><img src='".UBD_URL."/public/images/bubble2/delete.png' alt='Delete' /></a>";
													echo "</div>";
												}
											echo "</div>";
											echo "<div class='ANNOresponseComment' style='font-size: 11px !important; color: #".get_option('ANNOtype_bubbleFontColor')." !important;'>";
												echo $comment->comment;
											echo "</div>";
											echo "<div class='ANNOresponseMeta'>";
												echo "<span class='date' style='color: #".get_option('ANNOtype_bubbleFontColor')." !important; font-size: 11px !important;'>Posted <abbr class='timeago' title='".date('c', $comment->timestamp)."'>".date('M, d Y', $comment->timestamp)."</abbr></span>";
												echo "<div class='ANNOresponseAction'>";
													//echo "<a href='#' style='color: #".get_option('ANNOtype_bubbleButtonFontColor')."; background-color: #".get_option('ANNOtype_bubbleButtonColor')."; margin-right: 5px;' class='reply'>Reply</a>";
													if(get_option('ANNOtype_ratings') == 'On') {
														
														if($_COOKIE['ANNOCommentID_'.$comment->ID] == 'like') {
															echo "<a href='#' class='like' style='display: none !important; color: #".get_option('ANNOtype_bubbleButtonFontColor')." !important; background-color: #".get_option('ANNOtype_bubbleButtonColor')." !important;'>Like</a>";
															echo "<a href='#' class='unlike' style='color: #".get_option('ANNOtype_bubbleButtonFontColor')." !important; background-color: #".get_option('ANNOtype_bubbleButtonColor')." !important;'>Unlike</a>";	
														} else {
															echo "<a href='#' class='like' style='color: #".get_option('ANNOtype_bubbleButtonFontColor')." !important; background-color: #".get_option('ANNOtype_bubbleButtonColor')." !important;'>Like</a>";
															echo "<a href='#' class='unlike' style='display: none !important; color: #".get_option('ANNOtype_bubbleButtonFontColor')." !important; background-color: #".get_option('ANNOtype_bubbleButtonColor')." !important;'>Unlike</a>";
														}
														
														if($comment->likes == 0) {
															$style = 'display: none !important;';
														} else {
															$style = '';
														}
														echo "<span class='count' style='margin-left: 5px !important; color: #".get_option('ANNOtype_bubbleFontColor')." !important; {$style}'>+<span class='likes'>{$comment->likes}</span></span>";
													}
												echo "</div>";
											echo "</div>";
										echo "</li>";
										
										$count++;
									}
								}
							echo "</ul>";
							
							echo "</div>";
							
							echo "<div class='respondForm' style='margin-top: 25px !important;'>
								<h2 style='font-size: 14px !important; margin-bottom: 10px !important; border-bottom: 1px #".get_option('ANNOtype_bubbleCommentSepColor')." solid !important; padding-bottom: 3px !important; color:#".get_option('ANNOtype_bubbleFontColor')." !important; font-weight: bold !important;'>Post a Response</h2>";
								echo "<div class='ANNOtype_bubbleRespond'>";
								if(is_user_logged_in()) {
									global $current_user;
									$current_user = wp_get_current_user();
									echo "<input type='hidden' name='userID' value='{$current_user->ID}' />";
									echo "<div class='ANNOtype_twitter' style='margin-bottom: 10px !important;'>";
										echo "<p class='avatar' style='float: left !important; padding:0 !important; margin: 0 !important; margin-right: 5px !important;'>".get_avatar($current_user->ID, 32)."</p>";
										echo "<div style='float: left !important;'>";
											echo "<h3 style='margin: 0 !important; font-size: 13px !important; font-weight: bold !important; color: #".get_option('ANNOtype_bubbleFontColor')." !important;'>{$current_user->display_name}</h3>";
											$postID = $this->getPostID($annotation->ID);
											echo "<p style='margin: 0 !important;'>(<a style='font-size: 10px !important; color: #".get_option('ANNOtype_bubbleFontColor')." !important; text-decoration: none !important;' href='".wp_logout_url(get_permalink($postID[0]->postID))."'>Log Out</a>)</p>";
											
										echo "</div>";
										
										if(get_option('ANNOtype_moderation') == 'On') {
									echo '<div class="moderation" style="margin: 0 !important; margin-top:17px !important; font-size: 11px !important; font-weight: normal !important; color: #'.get_option('ANNOtype_bubbleFontColor').' !important; float:right !important;">
											Moderation is ON.
											<a href="Your comment will not appear until it is approved by the author." class="help"><img style="padding-bottom: 2px !important;" src="'.UBD_URL.'/public/images/bubble2/help.png" alt="Help" /></a>
										</div>';}
										
										echo "<div style='clear: left !important;'></div>";
										
										echo "<div class='ANNOtype_bubbleText'>";
										echo "<input type='hidden' name='name' value='{$twitterUser->name}' />";
										echo "<input type='hidden' name='website' value='http://twitter.com/{$twitterUser->screen_name}' />";
										echo "</div>";
										
										
											
								
										
									echo "</div>";
								}
								
							
								if($_SESSION['status'] == 'verified') {
									include 'twitteroauth/twitteroauth.php';
									$access_token = $_SESSION['access_token'];
									$twitterConnect = new TwitterOAuth(get_option('ANNOtype_twitterConsumerKey'), get_option('ANNOtype_twitterConsumerSecret'), $access_token['oauth_token'], $access_token['oauth_token_secret']);
									$twitterUser = $twitterConnect->get('account/verify_credentials');
								
									echo "
									<div class='ANNOtype_twitter' style='margin-bottom: 10px !important;'>";
										echo "<img style='float: left !important; margin-right: 5px !important;' src='http://img.tweetimag.es/i/{$twitterUser->screen_name}_n' alt='{$twitterUser->screen_name}' />";
										echo "<div style='float: left !important;'>";
											echo "<h3 style='margin: 0 !important; font-size: 13px !important; font-weight: normal !important; color: #".get_option('ANNOtype_bubbleFontColor')." !important;'>{$twitterUser->screen_name}</h3>";
											$postID = $this->getPostID($annotation->ID);
											echo "<p style='margin: 0 !important;'>(<a style='font-size: 10px !important; color: #".get_option('ANNOtype_bubbleFontColor')." !important; text-decoration: none !important;' href='".UBD_URL."/twitteroauth/signout.php?url=".get_permalink($postID[0]->postID)."'>Log Out</a>)</p>";
										echo "</div>";
			
										echo "<div style='clear: left !important;'></div>";
										
										echo "<div class='ANNOtype_bubbleText'>";
										echo "<input type='hidden' name='name' value='{$twitterUser->name}' />";
										echo "<input type='hidden' name='website' value='http://twitter.com/{$twitterUser->screen_name}' />";
										echo "</div>";
									echo "</div><div style='height: 1px !important; width: 298px !important; background: silver !important; display: block !important; margin-top: 5px !important;'></div>";
								}
								
								if(isset($_COOKIE['fbs_'.get_option('ANNOtype_facebookAPIKey')])) {
								?>
								<div id="fb-root"></div>
								<script src="http://connect.facebook.net/en_US/all.js"></script>
								<script>
								  FB.init({appId: '<?php echo get_option('ANNOtype_facebookAPIKey'); ?>', status: true, cookie: true, xfbml: true});
								</script>
								<?php
									if(!function_exists('get_facebook_cookie')) {
										function get_facebook_cookie($app_id, $application_secret) {
										  $args = array();
										  parse_str(trim($_COOKIE['fbs_' . $app_id], '\\"'), $args);
										  ksort($args);
										  $payload = '';
										  foreach ($args as $key => $value) {
										    if ($key != 'sig') {
										      $payload .= $key . '=' . $value;
										    }
										  }
										  if (md5($payload . $application_secret) != $args['sig']) {
										    return null;
										  }
										  return $args;
										}
									}
									
									$cookie = get_facebook_cookie(get_option('ANNOtype_facebookAPIKey'), get_option('ANNOtype_facebookSecretKey'));
									$user = json_decode(file_get_contents('https://graph.facebook.com/me?access_token='.$cookie['access_token']));
				
									echo "<div id='ANNOtype_facebook' style='margin-bottom: 10px !important;'>";
										echo "<h3 style='margin: 0 !important; font-size: 13px !important; font-weight: normal !important; color: #".get_option('ANNOtype_bubbleFontColor')." !important;'>{$user->first_name}</h3>";
										$postID = $this->getPostID($annotation->ID);
										echo "<p style='margin: 0 !important;'>".'<a href="#" style="font-size: 10px !important; color: #'.get_option('ANNOtype_bubbleFontColor').' !important; text-decoration: none !important;" onclick="FB.logout(function() {window.location.reload();});return false;">'."(Log Out)</a></p>";
										
										echo "<div class='ANNOtype_bubbleText'>";
										echo "<input type='hidden' name='name' value='{$user->name}' />";
										echo "<input type='hidden' name='website' value='{$user->link}' />";
										echo "</div>";
									echo "</div><div style='height: 1px !important; width: 298px !important; background: silver !important; display: block !important; margin-top: 5px !important;'></div>";
								}
								
								echo "
								
								<textarea cols='10' rows='5' name='annotation' onfocus='if (this.value == \"What is on your mind?\") {this.value = \"\";}' onblur='if (this.value == \"\") {this.value = \"What is on your mind?\";}'>What is on your mind?</textarea>";
								
								if(!is_user_logged_in() AND $_SESSION['status'] != 'verified' AND !isset($_COOKIE['fbs_'.get_option('ANNOtype_facebookAPIKey')])) {
									echo "<div class='ANNOtype_bubbleFields'>";
									echo "<div class='ANNOtype_bubbleText'>";
									echo "<div class='ANNOtype_bubbleName'>";
										echo "<p><input class='name' type='text' name='name' value='Name (required)' onfocus='if (this.value == \"Name (required)\") {this.value = \"\";}' onblur='if (this.value == \"\") {this.value = \"Name (required)\";}' /></p>";
										
										if(get_option('ANNOtype_requireEmail') == 'On') {
											echo "<p><input class='email' type='text' name='email' value='Email (required, private)' onfocus='if (this.value == \"Email (required, private)\") {this.value = \"\";}' onblur='if (this.value == \"\") {this.value = \"Email (required, private)\";}' /></p>";
										} else {
											echo "<p><input class='email' type='text' name='email' value='Email (optional, private)' onfocus='if (this.value == \"Email (optional, private)\") {this.value = \"\";}' onblur='if (this.value == \"\") {this.value = \"Email (optional, private)\";}' /></p>";
										}
									echo "</div>";
									
									echo "<p><input type='text' name='website' value='Website (optional)' onfocus='if (this.value == \"Website (optional)\") {this.value = \"\";}' onblur='if (this.value == \"\") {this.value = \"Website (optional)\";}' /></p>";
					
									echo "<input type='hidden' name='emailRequired' value='".get_option('ANNOtype_requireEmail')."' />";
									echo "</div>";
									echo "</div><div style='height: 1px !important; width: 298px !important; background: silver !important; display: block !important; margin-top: 5px !important;'></div>";
								}
								
								echo "<input type='hidden' name='annotationID' value='{$annotation->ID}' />";
								
								echo '<div class="ANNOtype_bubbleDiscussButton">';
									echo "<a href='#'class='commentAnnotation' style='font-size: 11px !important; background-color: #".get_option('ANNOtype_bubblePostButtonColor')." !important; color: #".get_option('ANNOtype_bubblePostButtonFontColor')." !important;'>Post Comment &rsaquo;</a>";
										// This is the email checkbox for existing bubbles.
										if(is_user_logged_in() == false && (get_option('ANNOtype_aweber') == 'On' || get_option('ANNOtype_mailchimp') == 'On' || get_option('ANNOtype_getResponse') == 'On')) {
											echo '<div class="subscribeupdates" style="margin: 0 !important; font-size: 11px !important; font-weight: normal !important; color: #'.get_option('ANNOtype_bubbleFontColor').' !important; float: left !important;">
											<input style="margin-left: 3px !important;" type="checkbox" checked="checked" name="subscribecheck" id="subscribecheck_bubble_'.$annotation->ID.'" />
												<label for="subscribecheck_bubble_'.$annotation->ID.'">Subscribe for updates</label>
											</div>';
										}
									
								echo '</div>';
								echo "</div>";
								
								if(!is_user_logged_in() && $_SESSION['status'] != 'verified' && !isset($_COOKIE['fbs_'.get_option('ANNOtype_facebookAPIKey')])) {
									if((get_option('ANNOtype_allowLoginFacebook') == 'On' && get_option('ANNOtype_facebookAPIKey') && get_option('ANNOtype_facebookSecretKey') || (get_option('ANNOtype_allowLoginTwitter') == 'On' && get_option('ANNOtype_twitterConsumerKey') && get_option('ANNOtype_twitterConsumerSecret')))) {
										echo "<div class='ANNOtype_bubbleConnect'>";
										if($_SESSION['status'] != 'verified' && get_option('ANNOtype_allowLoginTwitter') == 'On' && get_option('ANNOtype_twitterConsumerKey') && get_option('ANNOtype_twitterConsumerSecret')) {
											$postID = $this->getPostID($annotationID);
											echo "<a href='".UBD_URL."/twitteroauth/redirect.php?url=".get_permalink($postID[0]->postID)."' id='ANNOtype_twitterConnect'><img src='".UBD_URL."/public/images/bubble2/twitterConnect.png' alt='Twitter Connect' /></a>";
										}
										if(!isset($_COOKIE['fbs_'.get_option('ANNOtype_facebookAPIKey')]) && get_option('ANNOtype_allowLoginFacebook') == 'On' && get_option('ANNOtype_facebookAPIKey') && get_option('ANNOtype_facebookSecretKey')) {
										?>
										<div id="fb-root"></div>
										<script src="http://connect.facebook.net/en_US/all.js"></script>
										<script>
										  FB.init({appId: '<?php echo get_option('ANNOtype_facebookAPIKey'); ?>', status: true, cookie: true, xfbml: true});
										  FB.Event.subscribe('auth.sessionChange', function(response) {
										    if (response.session) {
										    	window.location.reload();
										    } else {
										    	window.location.reload();
										    }
										  });
										</script>
										<?php
										echo "<a href='#' id='ANNOtype_facebookConnect'><img style='margin-right: 4px !important;' src='".UBD_URL."/public/images/bubble2/facebookConnect.png' alt='Facebook Connect' /></a>";
										}
										echo "<span style='margin-top: 0 !important; margin-bottom: 0 !important; font-size: 11px !important; font-weight: normal !important; color: #".get_option('ANNOtype_bubbleFontColor')."' !important;'>Sign in using</span>";
										echo "</div>";
									}
								}
								echo "</div>";
						echo "</div>";
						echo "<div style='background-color: #".get_option('ANNOtype_bubbleTitleBarColor')." !important; color: #".get_option('ANNOtype_bubbleLinkColor')." !important;' class='getANNOtype'></div>";
					echo "</div>";
				}
				
				/*foreach($this->getAnnotationsByID($postID) as $id => $annotation) {
					$thumbs = $annotation->thumbs;
					
					echo "<div id='ANNOtype_bubble_{$annotation->ID}' class='ANNOtype_bubble' style='border-color: #".get_option('ANNOtype_bubbleTitleBarColor').";'>";
						echo "<div class='before' style='border-bottom-color: #".get_option('ANNOtype_bubbleTitleBarColor').";'></div>";
						echo "<div class='ANNOtype_bubbleTitle'>";
							echo "<a href='http://highlighter.com.com' class='bubbleTopLogo'><img src='".UBD_URL."/public/images/bubble2/bubbleTopLogo.png' alt='ANNOtype' /></a>";
							echo "<a href='#' class='closeBubble'><img src='".UBD_URL."/public/images/bubble2/closeButton.png' alt='Close Bubble' /></a>";
						echo "</div>";
						echo "<div class='ANNOtype_bubbleContainer' style='background-color: #".get_option('ANNOtype_bubbleShellColor').";'>";
							if(get_option('ANNOtype_adsense') == 'On' && get_option('ANNOtype_adsenseID') && get_option('ANNOtype_adPosition') == 'top') {
								echo "<div class='topAdsense'>";
									echo '<script type="text/javascript">
									google_ad_client = "pub-'.get_option('ANNOtype_adsenseID').'";
									google_ad_width = 200;
									google_ad_height = 90;
									google_ad_format = "200x90_0ads_al";
									google_color_border = "'.get_option('ANNOtype_bubbleShellColor').'";
									google_color_bg = "'.get_option('ANNOtype_bubbleShellColor').'";
									google_color_link = "'.get_option('ANNOtype_bubbleLinkColor').'";
									google_color_text = "'.get_option('ANNOtype_bubbleFontColor').'";
									google_color_url = "'.get_option('ANNOtype_bubbleFontColor').'";
									</script><script type="text/javascript" src="http://pagead2.googlesyndication.com/pagead/show_ads.js"></script>';
								echo "</div>";
								echo "<div class='ANNOsep' style='background-color: #".get_option('ANNOtype_bubbleTitleBarColor').";'></div>";
							}
							
							echo "<input type='hidden' name='selectedText' value='{$annotation->text}' />";
														
							// user is logged in via twitter?
							if(get_option('ANNOtype_twitterConsumerKey') && get_option('ANNOtype_twitterConsumerSecret') && $_SESSION['status'] == 'verified') {
								include 'twitteroauth/twitteroauth.php';
					
								$access_token = $_SESSION['access_token'];
								$twitterConnect = new TwitterOAuth(get_option('ANNOtype_twitterConsumerKey'), get_option('ANNOtype_twitterConsumerSecret'), $access_token['oauth_token'], $access_token['oauth_token_secret']);
								$twitterUser = $twitterConnect->get('account/verify_credentials');
							}
							
							$annotations = $this->getANNOComment($annotation->ID); // get the annotation
							
							if($annotations) { // there is a main annotation?
								if($annotations[0]->userID) { // is this user already registered?
									$user = get_userdata($annotations[0]->userID);
									
									$annotations[0]->name = $user->display_name;
									$annotations[0]->url = $user->user_url;
									$annotations[0]->email = $user->user_email;
								}
								
								$date = date('D, M jS Y', $annotations[0]->timestamp); // date of the annotation
								
								$annotations[0]->url = esc_url($annotations[0]->url);
								 
								if($annotations[0]->url) {
									$annotations[0]->name = "<a style='font-size: 14px; color: #".get_option('ANNOtype_bubbleLinkColor').";' href='{$annotations[0]->url}'>{$annotations[0]->name}</a>";
								}
								
								$annotations[0]->comment = make_clickable(stripslashes($annotations[0]->comment)); // annotation comment
								
								if($annotations[0]->email) { // if annoated by a registered user, get gravatar
									$avatar = get_avatar($annotations[0]->email, 24, UBD_URL.'/public/images/annotar.jpg');
								} elseif(strpos($annotations[0]->url, 'twitter') !== false) { // if its a twitter user, get twitter avatar
									$getUser = preg_match_all('#http://(.*)twitter.com/(.*)#', $annotations[0]->url, $matches);
									$twitterID = $matches[2][0];
									$avatar = "<img src='http://img.tweetimag.es/i/{$twitterID}_m' alt='{$twitterID}' />";
								} else { // else no avatar
									$avatar = '';
								}
								
								$status = $annotations[0]->status;
								
								echo "<div class='mainAnnoComment'>";
									echo "<input type='hidden' name='status' value='{$status}' />";
									echo "<div class='mainAnnoCommentAuthor'>";
										echo $avatar;
										echo "<span class='name' style='font-size: 14px; color: #".get_option('ANNOtype_bubbleFontColor').";'>{$annotations[0]->name}</span>";
										echo "<span class='date' style='font-size: 10px; color: #".get_option('ANNOtype_bubbleFontColor').";'> on {$date}</span>";
									echo "</div>";
									echo "<div class='mainAnnoActualComment' style='font-size: 13px; background-color: #".get_option('ANNOtype_bubbleCommentColor')."; color: #".get_option('ANNOtype_bubbleFontColor').";'>{$annotations[0]->comment}</div>";
									echo "<div class='mainAnnoCommentMeta'>";
										if(get_option('ANNOtype_ratings') == 'On') {
											echo "<div class='thumbs'>";
												echo "<span class='count' style='font-size: 10px; color: #".get_option('ANNOtype_bubbleFontColor').";'>{$thumbs}</span>";	
												echo "<img src='".UBD_URL."/public/images/thumbsUp.png' alt='Thumbs Up' class='thumbsUp' />";
												echo "<img src='".UBD_URL."/public/images/thumbsDown.png' alt='Thumbs Down' class='thumbsDown' />";
											echo "</div>";
										}
										if(get_option('ANNOtype_shareFacebook') == 'On' || get_option('ANNOtype_shareTwitter') == 'On') {
											echo "<div class='share'>";
												if(get_option('ANNOtype_shareTwitter') == 'On') {
													echo "<a target='_blank' href='http://twitter.com/share?url=".get_permalink($postID)."&text={$annotations[0]->comment}'><img src='".UBD_URL."/public/images/tweetThis.png' alt='Tweet This' class='tweetThis' /></a>";
												}
												
												if(get_option('ANNOtype_shareFacebook') == 'On') {
													echo "<a target='_blank' href='http://www.facebook.com/sharer.php?u=".get_permalink($postID)."&t={$annotations[0]->comment}'><img src='".UBD_URL."/public/images/shareThis.png' alt='Share This' class='shareThis' /></a>";
												}
											echo "</div>";
										}
									echo "</div>";
									if(get_option('ANNOtype_responses') == 'On') {
										echo "<a href='#' class='respondAnnotation'>Respond To This Comment</a>";
									}
									echo "<div class='respondForm' style='display: none;'>";
										echo "<h3 style='font-size: 14px; color: #".get_option('ANNOtype_bubbleFontColor').";'>Respond to this comment:</h3>";
										echo "<div class='ANNOtype_bubbleRespond'>";
										if(!is_user_logged_in() AND $_SESSION['status'] != 'verified' AND !isset($_COOKIE['fbs_'.get_option('ANNOtype_facebookAPIKey')])) {
										echo "<div class='ANNOtype_bubbleFields'>";
										echo "<div class='ANNOtype_bubbleText'>";
										
										if($_COOKIE['anno_name']) {
											$value = $_COOKIE['anno_name'];
										} else {
											$value = 'Name (required)';
										}
										
										echo "<p><input type='text' name='name' value='{$name}' onfocus='if (this.value == \"Name (required)\") {this.value = \"\";}' onblur='if (this.value == \"\") {this.value = \"Name (required)\";}' /></p>";
										
										if(get_option('ANNOtype_requireEmail') == 'On') {
											if($_COOKIE['anno_email']) {
												$value = $_COOKIE['anno_email'];
											} else {
												$value = 'Email (required, private)';
											}
											echo "<p><input type='text' name='email' value='{$value}' onfocus='if (this.value == \"Email (required, private)\") {this.value = \"\";}' onblur='if (this.value == \"\") {this.value = \"Email (required, private)\";}' /></p>";
										} else {
											if($_COOKIE['anno_email']) {
												$value = $_COOKIE['anno_email'];
											} else {
												$value = 'Email (optional, private)';
											}
											echo "<p><input type='text' name='email' value='{$value}' onfocus='if (this.value == \"Email (optional, private)\") {this.value = \"\";}' onblur='if (this.value == \"\") {this.value = \"Email (optional, private)\";}' /></p>";
										}
										
										if($_COOKIE['anno_website']) {
											$value = $_COOKIE['anno_website'];
										} else {
											$value = 'Website (optional)';
										}
											
										echo "<p><input type='text' name='website' value='{$value}' onfocus='if (this.value == \"Website (optional)\") {this.value = \"\";}' onblur='if (this.value == \"\") {this.value = \"Website (optional)\";}' /></p>";
						
										echo "<input type='hidden' name='emailRequired' value='".get_option('ANNOtype_requireEmail')."' />";
										echo "</div>";
										echo "<div class='ANNOtype_bubbleConnect'>";
										if(get_option('ANNOtype_facebookAPIKey') && get_option('ANNOtype_facebookSecretKey')) {
										?>
										<div id="fb-root"></div>
										<script src="http://connect.facebook.net/en_US/all.js"></script>
										<script>
										  FB.init({appId: '<?php echo get_option('ANNOtype_facebookAPIKey'); ?>', status: true, cookie: true, xfbml: true});
										  FB.Event.subscribe('auth.sessionChange', function(response) {
										    if (response.session) {
										    	window.location.reload();
										    } else {
										    	window.location.reload();
										    }
										  });
										</script>
										<?php
										echo "<p><fb:login-button></fb:login-button></p>";
										}
										if(get_option('ANNOtype_twitterConsumerKey') && get_option('ANNOtype_twitterConsumerSecret')) {
											$postID = $this->getPostID($annotationID);
											echo "<a href='".UBD_URL."/twitteroauth/redirect.php?url=".get_permalink($postID[0]->postID)."' id='ANNOtype_twitterConnect'><img src='".UBD_URL."/public/images/signTwitter.png' alt='Twitter Connect' /></a>";
										}
										echo "</div>";
										echo "</div>";
										}
										
										if(is_user_logged_in()) {
											global $current_user;
											$current_user = wp_get_current_user();
											echo "<input type='hidden' name='userID' value='{$current_user->ID}' />";
										}
										
										if($_SESSION['status'] == 'verified') {
											echo "<div class='ANNOtype_twitter'>";
											echo "<h3 style='font-size: 14px; color: #".get_option('ANNOtype_bubbleFontColor').";'>Connected with twitter account @{$twitterUser->screen_name}</h3>";
											$postID = $this->getPostID($annotation->ID);
											echo "<p><a style='font-size: 12px; color: #".get_option('ANNOtype_bubbleLinkColor').";' href='".UBD_URL."/twitteroauth/signout.php?url=".get_permalink($postID[0]->postID)."'>Sign out from Twitter</a></p>";
											echo "</div>";
											
											echo "<div class='ANNOtype_bubbleText'>";
											echo "<input type='hidden' name='name' value='{$twitterUser->name}' />";
											echo "<input type='hidden' name='website' value='http://twitter.com/{$twitterUser->screen_name}' />";
											echo "</div>";
										}
										
										if(isset($_COOKIE['fbs_'.get_option('ANNOtype_facebookAPIKey')])) {
										?>
										<div id="fb-root"></div>
										<script src="http://connect.facebook.net/en_US/all.js"></script>
										<script>
										  FB.init({appId: '<?php echo get_option('ANNOtype_facebookAPIKey'); ?>', status: true, cookie: true, xfbml: true});
										</script>
										<?php
											if(!function_exists('get_facebook_cookie')) {
												function get_facebook_cookie($app_id, $application_secret) {
												  $args = array();
												  parse_str(trim($_COOKIE['fbs_' . $app_id], '\\"'), $args);
												  ksort($args);
												  $payload = '';
												  foreach ($args as $key => $value) {
												    if ($key != 'sig') {
												      $payload .= $key . '=' . $value;
												    }
												  }
												  if (md5($payload . $application_secret) != $args['sig']) {
												    return null;
												  }
												  return $args;
												}
											}
											
											$cookie = get_facebook_cookie(get_option('ANNOtype_facebookAPIKey'), get_option('ANNOtype_facebookSecretKey'));
											$user = json_decode(file_get_contents('https://graph.facebook.com/me?access_token='.$cookie['access_token']));
						
											echo "<div id='ANNOtype_facebook' style='margin-bottom: 15px;'>";
											echo "<h3 style='font-size: 14px; color: #".get_option('ANNOtype_bubbleFontColor').";'>Connected with Facebook, {$user->first_name}!</h3>";
											echo "<div style='clear: both;'></div>";
											$postID = $this->getPostID($annotation->ID);
											echo "<p>".'<a href="#" onclick="FB.logout(function() {window.location.reload();});return false;">'."<img id='fb_logout_image' src='http://static.ak.fbcdn.net/images/fbconnect/logout-buttons/logout_small.gif' alt='Connect'/></a></p>";
											echo "</div>";
											
											echo "<div class='ANNOtype_bubbleText'>";
											echo "<input type='hidden' name='name' value='{$user->name}' />";
											echo "<input type='hidden' name='website' value='{$user->link}' />";
											echo "</div>";
										}
										echo "<input type='hidden' name='annotationID' value='{$annotation->ID}' />";
										echo "<textarea cols='10' rows='5' name='annotation' onfocus='if (this.value == \"What is on your mind?\") {this.value = \"\";}' onblur='if (this.value == \"\") {this.value = \"What is on your mind?\";}'>What is on your mind?</textarea>";
										echo "<a href='#' class='commentAnnotation'>Respond</a>";
										echo "</div>";
									echo "</div>";
								echo "</div>";
								if(get_option('ANNOtype_responses') == 'On') {
									echo "<div class='ANNOsep' style='background-color: #".get_option('ANNOtype_bubbleTitleBarColor').";'></div>";
								}
								if(get_option('ANNOtype_adsense') == 'On' && get_option('ANNOtype_adsenseID') && get_option('ANNOtype_adPosition') == 'middle') {
									echo "<div class='middleAdsense'>";
										echo '<script type="text/javascript">
										google_ad_client = "pub-'.get_option('ANNOtype_adsenseID').'";
										google_ad_width = 200;
										google_ad_height = 90;
										google_ad_format = "200x90_0ads_al";
										google_color_border = "'.get_option('ANNOtype_bubbleShellColor').'";
										google_color_bg = "'.get_option('ANNOtype_bubbleShellColor').'";
										google_color_link = "'.get_option('ANNOtype_bubbleLinkColor').'";
										google_color_text = "'.get_option('ANNOtype_bubbleFontColor').'";
										google_color_url = "'.get_option('ANNOtype_bubbleFontColor').'";
										</script><script type="text/javascript" src="http://pagead2.googlesyndication.com/pagead/show_ads.js"></script>';
									echo "</div>";
									echo "<div class='ANNOsep' style='background-color: #".get_option('ANNOtype_bubbleTitleBarColor').";'></div>";
								}
								$comments = $this->getComments($annotation->ID);
								if($comments && get_option('ANNOtype_responses') == 'On') {
									echo "<div class='ANNOresponses'>";
								} else {
									echo "<div class='ANNOresponses' style='display: none;'>";
								}
									echo "<h4 style='font-size: 15px; color: #".get_option('ANNOtype_bubbleFontColor').";'>Responses</h4>";
									echo "<ul>";
									foreach($comments as $comment) {
										if($comment->userID) { // is this user already registered?
											$user = get_userdata($comment->userID);
											
											$comment->name = $user->display_name;
											$comment->url = $user->user_url;
											$comment->email = $user->user_email;
										}
										
										$comment->url = esc_url($comment->url);
																				
										if($comment->url) {
											$comment->name = "<a style='font-size: 14px; color: #".get_option('ANNOtype_bubbleLinkColor').";' href='{$comment->url}'>{$comment->name}</a>";
										}
										
										$comment->comment = make_clickable(stripslashes($comment->comment)); // annotation comment
									
										if($comment->email) { // if annoated by a registered user, get gravatar
											$avatar = get_avatar($comment->email, 24, UBD_URL.'/public/images/annotar.jpg');
										} elseif(strpos($comment->url, 'twitter') !== false) { // if its a twitter user, get twitter avatar
											$getUser = preg_match_all('#http://(.*)twitter.com/(.*)#', $comment->url, $matches);
											$twitterID = $matches[2][0];
											$avatar = "<img src='http://img.tweetimag.es/i/{$twitterID}_m' alt='{$twitterID}' />";
										} else { // else no avatar
											$avatar = '';
										}
										
										echo "<li>";
											echo "<div class='ANNOCommentAuthor'>";
												echo $avatar;
												echo "<span class='name' style='color: #".get_option('ANNOtype_bubbleFontColor').";'>{$comment->name}</span>";
											echo "</div>";
											echo "<p class='ANNOComment' style='font-size: 12px; color: #".get_option('ANNOtype_bubbleFontColor').";'>{$comment->comment}</p>";
										echo "</li>";
									}
									echo "</ul>";
								echo "</div>";
							}
							if(get_option('ANNOtype_adsense') == 'On' && get_option('ANNOtype_adsenseID') && get_option('ANNOtype_adPosition') == 'bottom') {
								echo "<div class='ANNOsep' style='background-color: #".get_option('ANNOtype_bubbleTitleBarColor').";'></div>";
								echo "<div class='bottomAdsense'>";
									echo '<script type="text/javascript">
									google_ad_client = "pub-'.get_option('ANNOtype_adsenseID').'";
									google_ad_width = 200;
									google_ad_height = 90;
									google_ad_format = "200x90_0ads_al";
									google_color_border = "'.get_option('ANNOtype_bubbleShellColor').'";
									google_color_bg = "'.get_option('ANNOtype_bubbleShellColor').'";
									google_color_link = "'.get_option('ANNOtype_bubbleLinkColor').'";
									google_color_text = "'.get_option('ANNOtype_bubbleFontColor').'";
									google_color_url = "'.get_option('ANNOtype_bubbleFontColor').'";
									</script><script type="text/javascript" src="http://pagead2.googlesyndication.com/pagead/show_ads.js"></script>';
								echo "</div>";
							}
						echo "</div>";
						echo "<a href='http://highlighter.com.com' target='none' style='background-color: #".get_option('ANNOtype_bubbleTitleBarColor')."; color: #".get_option('ANNOtype_bubbleLinkColor').";' class='getANNOtype'><img src='".UBD_URL."/public/images/getANNOtype.png' alt='Get ANNOtype' /></a>";
					echo "</div>";
				}*/
				
				// Bubble for new annotations
				echo "<div id='newAnno_' class='ANNOtype_bubble ANNOtype_newBubble' style='border-color: #".get_option('ANNOtype_bubbleTitleBarColor')." !important;'>";
					echo "<div class='before' style='border-bottom-color: #".get_option('ANNOtype_bubbleTitleBarColor')." !important;'></div>";
					echo "<div class='ANNOtype_bubbleTitle' style='background-color: #".get_option('ANNOtype_bubbleTitleBarColor')." !important; color: #".get_option('ANNOtype_bubbleLinkColor')." !important;'>";
						echo "<h1><a target='blank' href='http://highlighter.com'>Highlighter</a></h1>";
						echo "<a href='#' class='closeBubble'><img src='".UBD_URL."/public/images/bubble2/closeButton.png' alt='Close Bubble' /></a>";
					echo "</div>";
					echo "<div class='ANNOtype_bubbleContainer' style='background-color: #".get_option('ANNOtype_bubbleShellColor')." !important;'>";
						/*if(get_option('ANNOtype_adsense') == 'On' && get_option('ANNOtype_adsenseID') && get_option('ANNOtype_adPosition') == 'top') {
							echo "<div class='topAdsense'>";
								echo '<script type="text/javascript">
								google_ad_client = "pub-'.get_option('ANNOtype_adsenseID').'";
								google_ad_width = 200;
								google_ad_height = 90;
								google_ad_format = "200x90_0ads_al";
								google_color_border = "'.get_option('ANNOtype_bubbleShellColor').'";
								google_color_bg = "'.get_option('ANNOtype_bubbleShellColor').'";
								google_color_link = "'.get_option('ANNOtype_bubbleLinkColor').'";
								google_color_text = "'.get_option('ANNOtype_bubbleFontColor').'";
								google_color_url = "'.get_option('ANNOtype_bubbleFontColor').'";
								</script><script type="text/javascript" src="http://pagead2.googlesyndication.com/pagead/show_ads.js"></script>';
							echo "</div>";
							echo "<div class='ANNOsep' style='background-color: #".get_option('ANNOtype_bubbleTitleBarColor').";'></div>";
						}*/
						echo "<div class='mainAnnoComment'>";
							echo "<div class='respondForm'>";
								echo "<div class='ANNOtype_bubbleRespond'>";
								if(is_user_logged_in()) {
									global $current_user;
									$current_user = wp_get_current_user();
									echo "<input type='hidden' name='userID' value='{$current_user->ID}' />";
									echo "<div class='ANNOtype_twitter' style='margin-bottom: 0px; !important'>";
										echo "<p class='avatar' style='float: left !important; padding:0 !important; margin: 0 !important; margin-right: 5px !important;'>".get_avatar($current_user->ID, 32)."</p>";
										echo "<div style='float: left !important;'>";
											echo "<h3 style='margin: 0 !important; font-size: 13px !important; font-weight: bold !important; color: #".get_option('ANNOtype_bubbleFontColor')." !important;'>{$current_user->display_name}</h3>";
											$postID = $this->getPostID($annotation->ID);
											echo "<p style='margin: 0 !important;'><a style='font-size: 10px !important; color: #".get_option('ANNOtype_bubbleFontColor')." !important; text-decoration: none !important;' href='".wp_logout_url(get_permalink($postID[0]->postID))."'>(Log Out)</a></p>";
										echo "</div>";
										
										if(get_option('ANNOtype_moderation') == 'On') {
										echo '<div class="moderation" style="margin: 0 !important; margin-top: 17px !important; font-size: 11px !important; font-weight: normal !important; color: #'.get_option('ANNOtype_bubbleFontColor').' !important; float: right !important;">
											Moderation is ON.
											<a href="Your comment will not appear until it is approved by the author." class="help"><img src="'.UBD_URL.'/public/images/bubble2/help.png" alt="Help" /></a>
										</div>';
										}
										
										echo "<div style='clear: left !important;'></div>";
										
										echo "<div class='ANNOtype_bubbleText'>";
										echo "<input type='hidden' name='name' value='{$twitterUser->name}' />";
										echo "<input type='hidden' name='website' value='http://twitter.com/{$twitterUser->screen_name}' />";
										echo "</div>";
									echo "</div>";
								}
								
								
								if($_SESSION['status'] == 'verified') {
									include 'twitteroauth/twitteroauth.php';
									$access_token = $_SESSION['access_token'];
									$twitterConnect = new TwitterOAuth(get_option('ANNOtype_twitterConsumerKey'), get_option('ANNOtype_twitterConsumerSecret'), $access_token['oauth_token'], $access_token['oauth_token_secret']);
									$twitterUser = $twitterConnect->get('account/verify_credentials');
								
									echo "<div class='ANNOtype_twitter' style='margin-bottom: 0px;'>";
										echo "<img style='float: left !important; margin-right: 5px !important;' src='http://img.tweetimag.es/i/{$twitterUser->screen_name}_n' alt='{$twitterUser->screen_name}' />";
										echo "<div style='float: left !important;'>";
											echo "<h3 style='margin: 0; font-size: 13px !important; font-weight: normal !important; color: #".get_option('ANNOtype_bubbleFontColor')." !important;'>{$twitterUser->screen_name}</h3>";
											$postID = $this->getPostID($annotation->ID);
											echo "<p style='margin: 0;'><a style='font-size: 10px !important; color: #".get_option('ANNOtype_bubbleFontColor')." !important; text-decoration: none !important;' href='".UBD_URL."/twitteroauth/signout.php?url=".get_permalink($postID[0]->postID)."'>(Log Out)</a></p>";
										echo "</div>";
										echo "<div style='clear: left !important;'></div>";
										
										echo "<div class='ANNOtype_bubbleText'>";
										echo "<input type='hidden' name='name' value='{$twitterUser->name}' />";
										echo "<input type='hidden' name='website' value='http://twitter.com/{$twitterUser->screen_name}' />";
										echo "</div>";
									echo "</div>";
								}
								
								if(isset($_COOKIE['fbs_'.get_option('ANNOtype_facebookAPIKey')])) {
								?>
								<div id="fb-root"></div>
								<script src="http://connect.facebook.net/en_US/all.js"></script>
								<script>
								  FB.init({appId: '<?php echo get_option('ANNOtype_facebookAPIKey'); ?>', status: true, cookie: true, xfbml: true});
								</script>
								<?php
									if(!function_exists('get_facebook_cookie')) {
										function get_facebook_cookie($app_id, $application_secret) {
										  $args = array();
										  parse_str(trim($_COOKIE['fbs_' . $app_id], '\\"'), $args);
										  ksort($args);
										  $payload = '';
										  foreach ($args as $key => $value) {
										    if ($key != 'sig') {
										      $payload .= $key . '=' . $value;
										    }
										  }
										  if (md5($payload . $application_secret) != $args['sig']) {
										    return null;
										  }
										  return $args;
										}
									}
									
									$cookie = get_facebook_cookie(get_option('ANNOtype_facebookAPIKey'), get_option('ANNOtype_facebookSecretKey'));
									$user = json_decode(file_get_contents('https://graph.facebook.com/me?access_token='.$cookie['access_token']));
				
									echo "<div id='ANNOtype_facebook'>";
										echo "<h3 style='margin: 0; font-size: 13px !important; font-weight: normal !important; color: #".get_option('ANNOtype_bubbleFontColor')." !important;'>{$user->first_name}</h3>";
										$postID = $this->getPostID($annotation->ID);
										echo "<p style='margin: 0;'>".'<a href="#" style="font-size: 10px !important; color: #'.get_option('ANNOtype_bubbleFontColor').' !important; text-decoration: none !important;" onclick="FB.logout(function() {window.location.reload();});return false;">'."(Log Out)</a></p>";
										
										echo "<div class='ANNOtype_bubbleText'>";
										echo "<input type='hidden' name='name' value='{$user->name}' />";
										echo "<input type='hidden' name='website' value='{$user->link}' />";
										echo "</div>";
									echo "</div>";
								}
								
								echo "<textarea cols='10' rows='5' name='annotation' onfocus='if (this.value == \"What is on your mind?\") {this.value = \"\";}' onblur='if (this.value == \"\") {this.value = \"What is on your mind?\";}'>What is on your mind?</textarea>";
								
								if(!is_user_logged_in() AND $_SESSION['status'] != 'verified' AND !isset($_COOKIE['fbs_'.get_option('ANNOtype_facebookAPIKey')])) {
									echo "<div class='ANNOtype_bubbleFields'>";
									echo "<div class='ANNOtype_bubbleText'>";
									echo "<div class='ANNOtype_bubbleName'>";
										echo "<p><input class='name' type='text' name='name' value='Name (required)' onfocus='if (this.value == \"Name (required)\") {this.value = \"\";}' onblur='if (this.value == \"\") {this.value = \"Name (required)\";}' /></p>";
										
										if(get_option('ANNOtype_requireEmail') == 'On') {
											echo "<p><input class='email' type='text' name='email' value='Email (required, private)' onfocus='if (this.value == \"Email (required, private)\") {this.value = \"\";}' onblur='if (this.value == \"\") {this.value = \"Email (required, private)\";}' /></p>";
										} else {
											echo "<p><input class='email' type='text' name='email' value='Email (optional, private)' onfocus='if (this.value == \"Email (optional, private)\") {this.value = \"\";}' onblur='if (this.value == \"\") {this.value = \"Email (optional, private)\";}' /></p>";
										}
									echo "</div>";
									
									echo "<p><input type='text' name='website' value='Website (optional)' onfocus='if (this.value == \"Website (optional)\") {this.value = \"\";}' onblur='if (this.value == \"\") {this.value = \"Website (optional)\";}' /></p>";
					
									echo "<input type='hidden' name='emailRequired' value='".get_option('ANNOtype_requireEmail')."' />";
									echo "</div>";
									echo "</div><div style='height:1px !important;width:298px !important;background: silver !important;display:block !important;margin-top:5px !important;'></div>";
								}
								
								echo "<input type='hidden' name='selectedText' value='' />";
								echo "<input type='hidden' name='subtype' value='' />";
								
								echo "<input type='hidden' name='annotationID' value='{$annotation->ID}' />";
								echo '<div class="ANNOtype_bubbleDiscussButton">';
									echo "<a href='#' class='discussAnnotation' style='font-size: 11px !important; background-color: #".get_option('ANNOtype_bubblePostButtonColor')." !important; color: #".get_option('ANNOtype_bubblePostButtonFontColor')." !important;'>Post Comment &rsaquo;</a>";
									
										// This is the email checkbox for existing bubbles.
										if(is_user_logged_in() == false && (get_option('ANNOtype_aweber') == 'On' || get_option('ANNOtype_mailchimp') == 'On' || get_option('ANNOtype_getResponse') == 'On')) {
											echo '<div class="subscribeupdates" style="margin: 0; font-size: 11px !important; font-weight: normal !important; color: #'.get_option('ANNOtype_bubbleFontColor').' !important; float:left !important;">
											<input style="margin-left: 0px;" type="checkbox" checked="checked" name="subscribecheck" id="new_subscribecheck" />
												<label for="new_subscribecheck">Subscribe for updates</label>
											</div>';
										}
									
								echo '</div>';
								echo "</div>";
								
								if(!is_user_logged_in() && $_SESSION['status'] != 'verified' && !isset($_COOKIE['fbs_'.get_option('ANNOtype_facebookAPIKey')])) {
									if((get_option('ANNOtype_allowLoginFacebook') == 'On' && get_option('ANNOtype_facebookAPIKey') && get_option('ANNOtype_facebookSecretKey') || (get_option('ANNOtype_allowLoginTwitter') == 'On' && get_option('ANNOtype_twitterConsumerKey') && get_option('ANNOtype_twitterConsumerSecret')))) {
										echo "<div class='ANNOtype_bubbleConnect'>";
										if($_SESSION['status'] != 'verified' && get_option('ANNOtype_allowLoginTwitter') == 'On' && get_option('ANNOtype_twitterConsumerKey') && get_option('ANNOtype_twitterConsumerSecret')) {
											$postID = $this->getPostID($annotationID);
											echo "<a href='".UBD_URL."/twitteroauth/redirect.php?url=".get_permalink($postID[0]->postID)."' id='ANNOtype_twitterConnect'><img src='".UBD_URL."/public/images/bubble2/twitterConnect.png' alt='Twitter Connect' /></a>";
										}
										if(!isset($_COOKIE['fbs_'.get_option('ANNOtype_facebookAPIKey')]) && get_option('ANNOtype_allowLoginFacebook') == 'On' && get_option('ANNOtype_facebookAPIKey') && get_option('ANNOtype_facebookSecretKey')) {
										?>
										<div id="fb-root"></div>
										<script src="http://connect.facebook.net/en_US/all.js"></script>
										<script>
										  FB.init({appId: '<?php echo get_option('ANNOtype_facebookAPIKey'); ?>', status: true, cookie: true, xfbml: true});
										  FB.Event.subscribe('auth.sessionChange', function(response) {
										    if (response.session) {
										    	window.location.reload();
										    } else {
										    	window.location.reload();
										    }
										  });
										</script>
										<?php
										echo "<a href='#' id='ANNOtype_facebookConnect'><img style='margin-right: 4px !important;' src='".UBD_URL."/public/images/bubble2/facebookConnect.png' alt='Facebook Connect' /></a>";
										}
										echo "<span style='margin-top: 0; margin-bottom: 0; font-size: 11px !important; font-weight: normal !important; color: #".get_option('ANNOtype_bubbleFontColor')."' !important;'>Sign in using</span>";
										echo "</div>";
									}
								}
								echo "</div>";
							echo "</div>";
						echo "</div>";
						/*if(get_option('ANNOtype_adsense') == 'On' && get_option('ANNOtype_adsenseID') && get_option('ANNOtype_adPosition') == 'bottom') {
							echo "<div class='ANNOsep' style='background-color: #".get_option('ANNOtype_bubbleTitleBarColor').";'></div>";
							echo "<div class='bottomAdsense'>";
								echo '<script type="text/javascript">
								google_ad_client = "pub-'.get_option('ANNOtype_adsenseID').'";
								google_ad_width = 200;
								google_ad_height = 90;
								google_ad_format = "200x90_0ads_al";
								google_color_border = "'.get_option('ANNOtype_bubbleShellColor').'";
								google_color_bg = "'.get_option('ANNOtype_bubbleShellColor').'";
								google_color_link = "'.get_option('ANNOtype_bubbleLinkColor').'";
								google_color_text = "'.get_option('ANNOtype_bubbleFontColor').'";
								google_color_url = "'.get_option('ANNOtype_bubbleFontColor').'";
								</script><script type="text/javascript" src="http://pagead2.googlesyndication.com/pagead/show_ads.js"></script>';
							echo "</div>";
						}*/
					//echo "</div>";
					echo "<div style='background-color: #".get_option('ANNOtype_bubbleTitleBarColor')." !important; color: #".get_option('ANNOtype_bubbleLinkColor')." !important;' class='getANNOtype'></div>";
				echo "</div>";
				
				// New annotation button
				if(get_option('ANNOtype_scheme') == 'Dark') {
					$dropdown_class = 'newANNODiscussDark';
				} else {
					$dropdown_class = 'newANNODiscussLight';
				}
				
				echo "<div class='newANNODiscuss ".$dropdown_class."' style='display: none;' />";
					echo "<div class='arrow'></div>";
					echo "<ul>";
					if(get_option('ANNOtype_converseShare') == 'On') {
						echo "<li><a href='#' class='converse'>Comment</a></li>";
						if(get_option('ANNOtype_shareFacebook') == 'On') {
							echo "<li class='shareBar'><a href='#' class='FB'>Share via Facebook</a></li>";
						}
						if(get_option('ANNOtype_shareTwitter') == 'On') {
							echo "<li class='shareBar'><a href='#' class='Twitter'>Share via Twitter</a></li>";
						}
						if(get_option('ANNOtype_shareEmail') == 'On') {
							echo "<li class='shareBar'><a href='#' class='Email'>Email This</a></li>";
						}
					} else {
						echo "<li><a href='#' class='converse'>Comment</a></li>";
					}
					echo "</ul>";
					echo "<a class='ANNODropLogo' target='_blank' href='http://highlighter.com'><img src='".UBD_URL."/public/images/dropdown/".strtolower(get_option('ANNOtype_scheme'))."_highlighter.png' alt='Highlighter' /></a>";
				echo "</div>";

				// New annotation button for images
				echo "<div class='newANNODiscussImg ".$dropdown_class."' style='display: none;' />";
					echo "<div class='arrow'></div>";
					echo "<ul>";
					if(get_option('ANNOtype_converseShare') == 'On') {
						echo "<li><a href='#' class='converse'>Comment <span class='countW'>(<span class='count'></span>)</span></a></li>";
						if(get_option('ANNOtype_shareFacebook') == 'On') {
							echo "<li class='shareBar'><a href='#' class='FB'>Share via Facebook</a></li>";
						}
						if(get_option('ANNOtype_shareTwitter') == 'On') {
							echo "<li class='shareBar'><a href='#' class='Twitter'>Share via Twitter</a></li>";
						}
						if(get_option('ANNOtype_shareEmail') == 'On') {
							echo "<li class='shareBar'><a href='#' class='Email'>Email This</a></li>";
						}
					} else {
						echo "<li><a href='#' class='converse'>Comment (<span class='count'></span>)</a></li>";
					}
					echo "</ul>";
					echo "<a class='ANNODropLogo' target='_blank' href='http://highlighter.com'><img src='".UBD_URL."/public/images/dropdown/".strtolower(get_option('ANNOtype_scheme'))."_highlighter.png' alt='Highlighter' /></a>";
				echo "</div>";
				
				// New comment button
				// New annotation button
				echo "<div class='newANNOComment ".$dropdown_class."' style='display: none;' />";
					echo "<div class='arrow'></div>";
					echo "<ul>";
					if(get_option('ANNOtype_converseShare') == 'On') {
						echo "<li><a href='#' class='converse'>Comment (<span class='count'></span>)</a></li>";
						if(get_option('ANNOtype_shareFacebook') == 'On') {
							echo "<li class='shareBar'><a href='#' class='FB'>Share via Facebook</a></li>";
						}
						if(get_option('ANNOtype_shareTwitter') == 'On') {
							echo "<li class='shareBar'><a href='#' class='Twitter'>Share via Twitter</a></li>";
						}
						if(get_option('ANNOtype_shareEmail') == 'On') {
							echo "<li class='shareBar'><a href='#' class='Email'>Email This</a></li>";
						}
					} else {
						echo "<li><a href='#' class='converse'>Comment (<span class='count'></span>)</a></li>";
					}
					echo "</ul>";
					echo "<a class='ANNODropLogo' target='_blank' href='http://highlighter.com'><img src='".UBD_URL."/public/images/dropdown/".strtolower(get_option('ANNOtype_scheme'))."_highlighter.png' alt='Highlighter' /></a>";
				echo "</div>";
								
				// What is ANNOtype
				
				echo "<div style='display: none;'>";
					echo "<div id='whatIsAnnotype'>";
						echo "<div class='title'>";
							echo "<h3>what is Highlighter?</h3>";
							echo "<h4><a target='_blank' href='http://highlighter.com'>highlighter.com</a></h4>";
						echo "</div>";
						echo "<div class='container'>";
							echo "<p>Annotype allows you to highlight any text or image on this page, then leave an annotation right there for everyone to see! It's just like leaving a comment.</p>";
							echo "<p>Watch the video below to see it in action!</p>";
							echo "<div class='video'>";
							?>
							<object width="355" height="275"><param name="movie" value="http://www.youtube.com/v/J1pKGDasWJ0?fs=1&amp;hl=en_US"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/J1pKGDasWJ0?fs=1&amp;hl=en_US" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="355" height="275"></embed></object>
							<?php
							echo "</div>";
						echo "</div>";
					echo "</div>";
				echo "</div>";
				
				// Email Share
				if(is_user_logged_in()) {
					$postID = $postID[0]->postID;
				}
				?>
				<div id='ANNO_emailShare' style='display: none;'>
					<div class='title'>
						<h1><a target='_blank' href='http://highlighter.com'>Highlighter</a></h1>
						<a href='#' class='close'><img src='<?php echo UBD_URL; ?>/public/images/emailClose.png' alt='Close' /></a>
					</div>
					<div class='ANNO_emailShareContainer'>
						<img src='<?php echo UBD_URL; ?>/public/images/email.png' class='email' alt='Email' />
						<h3>Send your highlighted text to a friend!</h3>
						<form action='' method='post'>
							<p><input type='text' name='yourName' value='Your Name' onfocus="if (this.value == 'Your Name') {this.value = '';}" onblur="if (this.value == '') {this.value = 'Your Name'}" /></p>
							<p><input type='text' name='yourEmail' value='Your Email' onfocus="if (this.value == 'Your Email') {this.value = '';}" onblur="if (this.value == '') {this.value = 'Your Email'}" /></p>
							<div class='sep'></div>
							<p><input type='text' name='friendName' value="Friend's Name" onfocus="if (this.value == 'Friend\'s Name') {this.value = '';}" onblur="if (this.value == '') {this.value = 'Friend\'s Name'}" /></p>
							<p><input type='text' name='friendEmail' value="Friend's Email" onfocus="if (this.value == 'Friend\'s Email') {this.value = '';}" onblur="if (this.value == '') {this.value = 'Friend\'s Email'}" /></p>
<p><textarea name='comment'>
Hey, I wanted you to check out this text I highlighted from the blog post, '{post name}' on {website_name}:

'{my highlighted text}'
</textarea></p>
							<p><a href='#' class='submit'>Send Now &rsaquo;</a></p>
							<input type='hidden' name='highlight' value='' />
							<input type='hidden' name='postID' value='<?php echo $postID; ?>' />
							<input type='hidden' name='action' value='ANNOtype_shareHighlight' />
						</form>
					</div>
				</div>
				<?php
					// Bottom Widget
					if(get_option('ANNOtype_widgetPosition') == 'bottom') {
				?>
					<div id='bottom_ANNOWidget' class='ANNOWidget'>
						<div class='ANNOWidgetDesc'>
						<h3>What is Highlighter?</h3>
						<p>Highlight. Comment. Share. It really is that simple!</p>
							<div class='effects'>
								<?php if(get_option('ANNOtype_highlightAnnotations') == 'On'): ?>
								<input type='checkbox' id='effects' name='effects' value='Off' />
								<label for='effects'>Turn Off Highlights</label>
								<?php else: ?>
								<input type='checkbox' id='effects' name='effects' value='On' />
								<label for='effects'>Turn On Highlights</label>
								<?php endif; ?>
							</div>
						</div>
						<div class='ANNOWidgetLogo'>
							<a href='http://highlighter.com' target="_blank"><img src='<?php echo UBD_URL; ?>/public/images/ANNOBottomWidgetLogo.png' alt='ANNOtype' /></a>
							<span class='ANNOWidgetCount'><?php echo $this->count($postID); ?></span>
						</div>
					</div>
					<?php
					}
					// Side Widget
					if(get_option('ANNOtype_widgetPosition') == 'side') {
					?>
					<div id='side_ANNOWidget' class='ANNOWidget'>
						<div class='ANNOWidgetDesc'>
							<h3>What is Highlighter?</h3>
						<p>Highlight. Comment. Share. It really is that simple!</p>
							<div class='effects'>
								<?php if(get_option('ANNOtype_highlightAnnotations') == 'On'): ?>
								<input type='checkbox' id='effects' name='effects' value='Off' />
								<label for='effects'>Turn Off Highlights</label>
								<?php else: ?>
								<input type='checkbox' id='effects' name='effects' value='On' />
								<label for='effects'>Turn On Highlights</label>
								<?php endif; ?>
							</div>
						</div>
						<div class='ANNOWidgetLogo'>
							<span class='ANNOWidgetCount'><?php echo $this->count($postID); ?></span>
							<a href='http://highlighter.com' target="_blank"><img src='<?php echo UBD_URL; ?>/public/images/ANNOSideWidgetLogo.png' alt='ANNOtype' /></a>
						</div>
					</div>
					<?php
					}
			}
		}
		
		public function theContent($content)
		{
			global $post, $wpdb;
			
			$enabled = get_option('highlightr_post_'.$post->ID);
			$pages = get_option('ANNOtype_pages');
			
			if(is_single() || (is_page() && $pages == 'Off') && $enabled != 'Off') {
				$get = $wpdb->get_results('SELECT * FROM '.$wpdb->prefix.'annotationcomments LEFT JOIN '.$wpdb->prefix.'annotations ON ('.$wpdb->prefix.'annotations.ID = '.$wpdb->prefix.'annotationcomments.annotationID) WHERE status = "approved" AND '.$wpdb->prefix.'annotations.postID = "'.$post->ID.'" ORDER BY '.$wpdb->prefix.'annotationcomments.ID DESC');
				$count = count($get);
			
				$float = get_option('ANNOtype_chicletPosition');
				$link = get_permalink($post->ID);
				
				if(!is_single() && !is_page()) {
					$class = 'ANNOchiclet';
				}
				
				if(get_option('ANNOtype_chiclet') == 'blue bar with bubble') {
					$chiclet = "<div style='float: {$float};' id='{$link}' class='{$class} blueBarBubble'>
						<span style='float: left; text-align: center; font-family: lucida grande; display: block; width: 24px; height: 20px; line-height: 20px; margin: 0; padding: 0; padding-top: 1px;  font-size: 11px; color: #fff;'>{$count}</span>
					</div><div class='chicletClear'></div>";
				} elseif(get_option('ANNOtype_chiclet') == 'blue bar') {
					$chiclet .= "<div style='float: {$float};' id='{$link}' class='{$class} blueBar'>
						<span style='float: left; text-align: center; font-family: lucida grande; line-height: 14px; display: block; width: 25px; height: 14px; margin: 0; padding: 0; padding-top: 1px;  font-size: 11px; color: #fff;'>{$count}</span>
					</div><div class='chicletClear'></div>";
				} elseif(get_option('ANNOtype_chiclet') == 'blue bubble') {
					$chiclet .= "<div style='float: {$float};' id='{$link}' class='{$class} blueBubble'>
						<span style='float: left; text-align: center; font-family: lucida grande; display: block; width: 24px; height: 20px; line-height: 20px; margin: 0; padding: 0; padding-top: 1px;  font-size: 11px; color: #fff;'>{$count}</span>
					</div><div class='chicletClear'></div>";
				} elseif(get_option('ANNOtype_chiclet') == 'white bar with bubble') {
					$chiclet .= "<div style='float: {$float};' id='{$link}' class='{$class} whiteBarBubble'>
						<span style='float: left; text-align: center; font-family: lucida grande; display: block; width: 24px; height: 20px; line-height: 20px; margin: 0; padding: 0; padding-top: 1px;  font-size: 11px; color: #20365e;'>{$count}</span>
					</div><div class='chicletClear'></div>";
				} elseif(get_option('ANNOtype_chiclet') == 'white bar') {
					$chiclet .= "<div style='float: {$float};' id='{$link}' class='{$class} whiteBar'>
						<span style='float: left; text-align: center; font-family: lucida grande; line-height: 14px; display: block; width: 25px; height: 14px; margin: 0; padding: 0; padding-top: 1px;  font-size: 11px; color: #20365e;'>{$count}</span>
					</div><div class='chicletClear'></div>";
				} elseif(get_option('ANNOtype_chiclet') == 'white bubble') {
					$chiclet .= "<div style='float: {$float};' id='{$link}' class='{$class} whiteBubble'>
						<span style='float: left; text-align: center; font-family: lucida grande; display: block; width: 24px; height: 20px; line-height: 20px; margin: 0; padding: 0; padding-top: 1px; font-size: 11px; color: #20365e;'>{$count}</span>
					</div><div class='chicletClear'></div>";
				}
				
				/*$content .= '<div class="the-content">';
				
				if(get_option('ANNOtype_chicletLocation') == 'above post content') {
					$content .= $chiclet;
				}
				
				$content .= $content;
				
				if(get_option('ANNOtype_chicletLocation') == 'below post content') {
					$content .= $chiclet;
				
				}
				$content .= '</div>';*/
				
				if(get_option('ANNOtype_chicletLocation') == 'above post content') {
					$content = $chiclet.'<div class="the-content">'.$content.'</div>';
				} elseif(get_option('ANNOtype_chicletLocation') == 'below post content') {
					$content = '<div class="the-content">'.$content.'</div>'.$chiclet;
				} else {
					$content = '<div class="the-content">'.$content.'</div>';
				}
				
				if((is_single() || is_page()) && get_option('ANNOtype_annobox') == 'On') {
					$content .= ANNObox_html($post->ID);
				}
			}
			return $content;
		}
		
		public function theExcerpt($content)
		{
			global $post, $wpdb;
			
			$get = $wpdb->get_results('SELECT * FROM '.$wpdb->prefix.'annotationcomments LEFT JOIN '.$wpdb->prefix.'annotations ON ('.$wpdb->prefix.'annotations.ID = '.$wpdb->prefix.'annotationcomments.annotationID) WHERE status = "approved" AND '.$wpdb->prefix.'annotations.postID = "'.$post->ID.'" ORDER BY wp_annotationcomments.ID DESC');
			$count = count($get);
		
			$float = get_option('ANNOtype_chicletPosition');
			$link = get_permalink($post->ID);
			
			if(!is_single() && !is_page()) {
				$class = 'ANNOchiclet';
			}
			
			if(get_option('ANNOtype_chiclet') == 'blue bar with bubble') {
				$chiclet = "<div style='float: {$float};' id='{$link}' class='{$class} blueBarBubble'>
					<span style='float: left; text-align: center; font-family: lucida grande; display: block; width: 24px; height: 20px; line-height: 20px; margin: 0; padding: 0; padding-top: 1px;  font-size: 11px; color: #fff;'>{$count}</span>
				</div><div class='chicletClear'></div>";
			} elseif(get_option('ANNOtype_chiclet') == 'blue bar') {
				$chiclet .= "<div style='float: {$float};' id='{$link}' class='{$class} blueBar'>
					<span style='float: left; text-align: center; font-family: lucida grande; line-height: 14px; display: block; width: 25px; height: 14px; margin: 0; padding: 0; padding-top: 1px;  font-size: 11px; color: #fff;'>{$count}</span>
				</div><div class='chicletClear'></div>";
			} elseif(get_option('ANNOtype_chiclet') == 'blue bubble') {
				$chiclet .= "<div style='float: {$float};' id='{$link}' class='{$class} blueBubble'>
					<span style='float: left; text-align: center; font-family: lucida grande; display: block; width: 24px; height: 20px; line-height: 20px; margin: 0; padding: 0; padding-top: 1px;  font-size: 11px; color: #fff;'>{$count}</span>
				</div><div class='chicletClear'></div>";
			} elseif(get_option('ANNOtype_chiclet') == 'white bar with bubble') {
				$chiclet .= "<div style='float: {$float};' id='{$link}' class='{$class} whiteBarBubble'>
					<span style='float: left; text-align: center; font-family: lucida grande; display: block; width: 24px; height: 20px; line-height: 20px; margin: 0; padding: 0; padding-top: 1px;  font-size: 11px; color: #20365e;'>{$count}</span>
				</div><div class='chicletClear'></div>";
			} elseif(get_option('ANNOtype_chiclet') == 'white bar') {
				$chiclet .= "<div style='float: {$float};' id='{$link}' class='{$class} whiteBar'>
					<span style='float: left; text-align: center; font-family: lucida grande; line-height: 14px; display: block; width: 25px; height: 14px; margin: 0; padding: 0; padding-top: 1px;  font-size: 11px; color: #20365e;'>{$count}</span>
				</div><div class='chicletClear'></div>";
			} elseif(get_option('ANNOtype_chiclet') == 'white bubble') {
				$chiclet .= "<div style='float: {$float};' id='{$link}' class='{$class} whiteBubble'>
					<span style='float: left; text-align: center; font-family: lucida grande; display: block; width: 24px; height: 20px; line-height: 20px; margin: 0; padding: 0; padding-top: 1px; font-size: 11px; color: #20365e;'>{$count}</span>
				</div><div class='chicletClear'></div>";
			}
			
			if(get_option('ANNOtype_chicletLocation') == 'above post content') {
				$content = $chiclet.'<div class="the-content">'.$content.'</div>';
			} elseif(get_option('ANNOtype_chicletLocation') == 'below post content') {
				$content = '<div class="the-content">'.$content.'</div>'.$chiclet;
			} else {
				$content = '<div class="the-content">'.$content.'</div>';
			}
			
			return $content;
		}
		
		public function bubbleHitCount()
		{
		}
		
		public function likes()
		{
			global $wpdb;
			
			$id = $_POST['id'];
			$status = $_POST['status'];
			
			if($status == 'like') {
				$wpdb->query('UPDATE '.$wpdb->prefix.'annotationcomments SET likes = likes + 1 WHERE ID = "'.$id.'"');
			}
			
			if($status == 'unlike') {
				$wpdb->query('UPDATE '.$wpdb->prefix.'annotationcomments SET likes = likes - 1 WHERE ID = "'.$id.'"');
			}
			
			exit;
		}
		
		public function count($postID)
		{
			global $wpdb;

			$get = $wpdb->get_results('SELECT * FROM '.$wpdb->prefix.'annotationcomments LEFT JOIN '.$wpdb->prefix.'annotations ON ('.$wpdb->prefix.'annotations.ID = '.$wpdb->prefix.'annotationcomments.annotationID) WHERE status = "approved" AND '.$wpdb->prefix.'annotations.postID = "'.$postID.'" ORDER BY '.$wpdb->prefix.'annotationcomments.ID DESC');
			
			$count = count($get);
			
			return $count;
		}
		
		public function shareHighlight()
		{
			$post = get_post($_POST['postID']);
			$_POST['comment'] = stripslashes($_POST['comment']);
			
			$message = str_replace('{post name}', '<a href="'.get_permalink($_POST['postID']).'">'.$post->post_title.'</a>', $_POST['comment']);
			$message = str_replace('{website_name}', '<a href="'.get_bloginfo('wpurl').'">'.get_bloginfo('name').'</a>', $message);
			$message = str_replace('{my highlighted text}', '"'.$_POST['highlight'].'"', $message);
			
			$headers  = 'MIME-Version: 1.0' . "\r\n";
			$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
			$headers .= 'To: '.$_POST['friendName'].' <'.$_POST['friendEmail'].'>' . "\r\n";
			$headers .= 'From: '.$_POST['yourName'].' <'.$_POST['yourEmail'].'>' . "\r\n";
			
			wp_mail($_POST['friendEmail'], 'I want you to see this!', nl2br($message), $headers);
			
			exit;
		}
		
		public function post_submitbox_misc_actions()
		{
			global $post;
			
			if(get_option('highlightr_post_'.$post->ID) == 'Off') {
				$value = 'Off';
			} else {
				$checked = 'checked="checked"';
				$value = 'On';
			}
			
			echo "<div class='misc-pub-section' style='border-top: 1px solid #EEE;'>";
				echo "<img style='margin-bottom: 5px;margin-left:-7px' src='".UBD_URL."/public/images/small_logo.png'/><br/><input type='hidden' name='highlightr_post_{$post->ID}' value='Off' />";
				echo "<input type='checkbox' value='On' name='highlightr_post_{$post->ID}' id='highlightr_post_{$post->ID}' ".$checked." />";
				echo "<label style='line-height: 15px; margin-left: 5px;'for='highlightr_post_{$post->ID}'>Enable Highlighter</label>";
			echo "</div>";
		}
		
		public function save_post()
		{
			global $post;
			
			update_option('highlightr_post_'.$post->ID, $_POST['highlightr_post_'.$post->ID]);
		}
		
		public function wp_dashboard_setup()
		{
			wp_add_dashboard_widget('highlights', 'Recent Highlights', array($this, 'recentHighlights'));
		}
		
		public function recentHighlights()
		{
			global $wpdb;
			
			include 'views/recentHighlights.php';
		}
		
		public function scheme()
		{
			$scheme = $_POST['scheme'];
			
			if($scheme == 'Light') {
				update_option('ANNOtype_bubbleTitleBarColor', '273a6b');
				update_option('ANNOtype_bubbleShellColor', 'ededed');
				
				update_option('ANNOtype_bubbleSortColor', '10192f');
				update_option('ANNOtype_bubbleSortFontColor', 'FFFFFF');
				
				update_option('ANNOtype_bubbleCommentSepColor', 'aaaeb4');
				update_option('ANNOtype_bubbleCommentColor', 'FFFFFF');
				update_option('ANNOtype_bubbleAltCommentColor', 'FFFFFF');
				
				update_option('ANNOtype_bubbleButtonColor', '989898');
				update_option('ANNOtype_bubbleButtonFontColor', 'FFFFFF');
			
				update_option('ANNOtype_bubblePostButtonColor', '1c2a50');
				update_option('ANNOtype_bubblePostButtonFontColor', 'FFFFFF');
				
				update_option('ANNOtype_bubbleFontColor', '1a1a1a');
				update_option('ANNOtype_bubbleLinkColor', '1a1a1a');

				update_option('ANNOtype_bubbleMainBg', 'e9edf5');
				update_option('ANNOtype_bubbleMainBorder', '91a2c8');
				update_option('ANNOtype_bubbleMainColor', '000000');
			} elseif($scheme == 'Dark') {
				update_option('ANNOtype_bubbleTitleBarColor', '000000');
				update_option('ANNOtype_bubbleShellColor', '474747');
				
				update_option('ANNOtype_bubbleSortColor', '000000');
				update_option('ANNOtype_bubbleSortFontColor', 'FFFFFF');
				
				update_option('ANNOtype_bubbleCommentSepColor', '848484');
				update_option('ANNOtype_bubbleCommentColor', '6E6E6E');
				update_option('ANNOtype_bubbleAltCommentColor', '848484');
				
				update_option('ANNOtype_bubbleButtonColor', '989898');
				update_option('ANNOtype_bubbleButtonFontColor', 'FFFFFF');
			
				update_option('ANNOtype_bubblePostButtonColor', '000000');
				update_option('ANNOtype_bubblePostButtonFontColor', 'FFFFFF');
				
				update_option('ANNOtype_bubbleFontColor', 'FFFFFF');
				update_option('ANNOtype_bubbleLinkColor', 'FFFFFF');
				
				update_option('ANNOtype_bubbleMainBg', '848484');
				update_option('ANNOtype_bubbleMainBorder', '000');
				update_option('ANNOtype_bubbleMainColor', 'FFFFFF');
			}
			
			include 'views/bubblePreview.php';
			
			exit;
		}
		
		function trackHighlight()
		{
		}
	}
}

function ANNObox($postID) {
	if(get_option('ANNOtype_annobox') == 'On'):
	global $wpdb, $user_ID;
				if($user_ID) {
					if(current_user_can('level_10')) {
						$is_admin = true;
					} else {
						$is_admin = false;
					}
				}
	
	if(get_option('ANNOtype_allowLoginFacebook') != 'On' || $_SESSION['status'] == 'verified' || is_user_logged_in()) {
		unset($_COOKIE['fbs_'.get_option('ANNOtype_facebookAPIKey')]);
	}
				
	$annotations = $wpdb->get_results('SELECT * FROM '.$wpdb->prefix.'annotations WHERE postID = "'.$postID.'"');
?>

<div id="annobox">
	<?php $get = $wpdb->get_results('SELECT * FROM '.$wpdb->prefix.'annotationcomments LEFT JOIN '.$wpdb->prefix.'annotations ON ('.$wpdb->prefix.'annotations.ID = '.$wpdb->prefix.'annotationcomments.annotationID) WHERE status = "approved" AND '.$wpdb->prefix.'annotations.postID = "'.$postID.'" ORDER BY wp_annotationcomments.ID DESC'); ?>
	<div class="annoboxrssbar">
		<a href="#"><div class="annoboxbigbubble"><p>Highlights (<?php echo count($get); ?>)</p></div></a>
			
	</div>
	
	<div class="annoboxoptionbar">
		<div>
			
<input type="checkbox" id='annoboxtoggle' name="annoboxtoggle" />		</div>
	</div>
	
	<?php $cc = 1; ?>
	<?php foreach($annotations as $id => $annotation): ?>
		<?php if($cc == 3) { $cc = 1; } else { $blah = ''; } ?>
		<?php if($cc == 1) { $class = 'annoboxresponselightgray'; } else { $class = 'annoboxresponsedarkgray'; } ?>
		<?php $comments = $wpdb->get_results('SELECT * FROM '.$wpdb->prefix.'annotationcomments WHERE status = "approved" AND annotationID = "'.$annotation->ID.'" ORDER BY id ASC'); ?>
		<?php if($comments): ?>
			<?php $annoboxcount++; ?>
			<?php if($annotation->subtype == 'txt'): ?>
			<div class="<?php echo $class; ?>" style='display: none;'>
				<p style='width: 520px;'><?php echo substr(strip_tags($annotation->text), 0, 150); ?></p>
				<div class="annoboxbubble"><?php echo count($comments); ?></div>
				<span></span>
				<?php
				if($is_admin) {
$html .= "<div class='annoboxadmin' style='display: none !important; position: absolute !important; top: 8px !important; right: 18px !important;'>";						echo "<a href='".admin_url('admin.php')."?page=Conversations&action=edit&id={$comment->ID}'><img src='".UBD_URL."/public/images/bubble2/edit.png' alt='Edit' /></a>";
						echo "<a style='margin-left: 5px;' href='".admin_url('admin.php')."?page=Conversations&changeStatus=trash&id={$comment->ID}'><img src='".UBD_URL."/public/images/bubble2/delete.png' alt='Delete' /></a>";
					echo "</div>";
				}
				?>
			</div>
			<?php else: ?>
			<div class="<?php echo $class; ?>" style='display: none;'>
				<img src='<?php echo UBD_URL; ?>/libs/timthumb.php?src=<?php echo $annotation->text; ?>&w=67&h=45&q=100' class='annoboximg' alt='ANNOBox Image' />
				<div class="annoboxbubble"><?php echo count($comments); ?></div>
				<span></span>
			</div>
			<?php endif; ?>
			<?php if($comments): ?>
			<div class="annoboxresponseindent" style='display: none;'>
				<?php foreach($comments as $comment): ?>
				<?php
				if($comment->userID) { // is this user already registered?
					$user = get_userdata($comment->userID);
					
					$comment->name = $user->display_name;
					$comment->url = $user->user_url;
					$comment->email = $user->user_email;
				}
				
				$comment->url = esc_url($comment->url);
														
				if($comment->url) {
					$comment->name = "<a style='color: #000;' href='{$comment->url}'>{$comment->name}</a>";
				}
				
				$comment->comment = make_clickable(stripslashes($comment->comment)); // annotation comment
			
				if($comment->email) { // if annoated by a registered user, get gravatar
					$avatar = get_avatar($comment->email, 24, UBD_URL.'/public/images/annotar.jpg');
				} elseif(strpos($comment->url, 'twitter') !== false) { // if its a twitter user, get twitter avatar
					$getUser = preg_match_all('#http://(.*)twitter.com/(.*)#', $comment->url, $matches);
					$twitterID = $matches[2][0];
					$avatar = "<img src='http://img.tweetimag.es/i/{$twitterID}_m' alt='{$twitterID}' />";
				} else { // else no avatar
					$avatar = '';
				}
				?>
				<div class="annoboxsmallrespond">
					<div class="annoboxsmallrespondtop" style='position: relative;'>
						<span><?php echo $avatar; ?></span>
						<p><?php echo $comment->name; ?> - <abbr class='timeago' title='<?php echo date('c', $comment->timestamp); ?>'><?php echo date('M, d Y', $comment->timestamp); ?></abbr></p>
						<?php
						if($is_admin) {
							echo "<div class='annoboxadmin' style='display: none; position: absolute; top: 8px; right: 18px;'>";
								echo "<a href='".admin_url('admin.php')."?page=Conversations&action=edit&id={$comment->ID}'><img src='".UBD_URL."/public/images/bubble2/edit.png' alt='Edit' /></a>";
								echo "<a style='margin-left: 5px;' href='".admin_url('admin.php')."?page=Conversations&changeStatus=trash&id={$comment->ID}'><img src='".UBD_URL."/public/images/bubble2/delete.png' alt='Delete' /></a>";
							echo "</div>";
						}
						?>
					</div>
					<div class="annoboxsmallrespondbottom">
						<p><?php echo $comment->comment; ?></p>
					</div>
				</div>
				<?php endforeach; ?>
				<?php if(get_option('ANNOtype_responses') == 'On'): ?>
				<div class="annoboxreply">
				
					<div class="annoboxform">
					
						<form action="" class='annotationID_<?php echo $annotation->ID; ?>'>
						<h3 class="postreply">Post a Reply</h3>
							<?php
							if(is_user_logged_in()) {
								global $current_user;
								$current_user = wp_get_current_user();
								echo "<input type='hidden' name='userID' value='{$current_user->ID}' />";
								echo "<div class='ANNOtype_twitter' style='margin-bottom: 0px;'>";
									echo "<p class='avatar' style='float: left; padding:0; margin: 0; margin-right: 5px;'>".get_avatar($current_user->ID, 32)."</p>";
									echo "<div style='float: left;'>";
										echo "<h3 style='margin: 0; font-size: 13px; font-weight: bold; color: #000 !important;'>{$current_user->display_name}</h3>";
										echo "<p style='margin: 0;'>(<a style='font-size: 10px; color: #000; text-decoration: none;' href='".wp_logout_url(get_permalink($postID[0]->postID))."'>Log Out</a>)</p>";
									echo "</div>";
									echo "<div style='clear: left'></div>";
									
									echo "<div class='ANNOtype_bubbleText'>";
									echo "<input type='hidden' name='name' value='{$twitterUser->name}' />";
									echo "<input type='hidden' name='website' value='http://twitter.com/{$twitterUser->screen_name}' />";
									echo "</div>";
								echo "</div>";
							}
	
							if($_SESSION['status'] == 'verified') {
								include 'twitteroauth/twitteroauth.php';
								$access_token = $_SESSION['access_token'];
								$twitterConnect = new TwitterOAuth(get_option('ANNOtype_twitterConsumerKey'), get_option('ANNOtype_twitterConsumerSecret'), $access_token['oauth_token'], $access_token['oauth_token_secret']);
								$twitterUser = $twitterConnect->get('account/verify_credentials');
								
								echo "<div class='ANNOtype_twitter' style='margin-bottom: 0px;'>";
									echo "<img style='float: left; margin-right: 5px;' src='http://img.tweetimag.es/i/{$twitterUser->screen_name}_n' alt='{$twitterUser->screen_name}' />";
									echo "<div style='float: left;'>";
										echo "<h3 style='margin: 0; font-size: 13px; font-weight: normal; color: #000;'>{$twitterUser->screen_name}</h3>";
										echo "<p style='margin: 0;'><a style='font-size: 10px; color: #000; text-decoration: none;' href='".UBD_URL."/twitteroauth/signout.php?url=".get_permalink($postID[0]->postID)."'>(Log Out)</a></p>";
									echo "</div>";
									echo "<div style='clear: left'></div>";
									
									echo "<div class='ANNOtype_bubbleText'>";
									echo "<input type='hidden' name='name' value='{$twitterUser->name}' />";
									echo "<input type='hidden' name='website' value='http://twitter.com/{$twitterUser->screen_name}' />";
									echo "</div>";
								echo "</div>";
							}
	
							if(isset($_COOKIE['fbs_'.get_option('ANNOtype_facebookAPIKey')])) {
							?>
							<div id="fb-root"></div>
							<script src="http://connect.facebook.net/en_US/all.js"></script>
							<script>
							  FB.init({appId: '<?php echo get_option('ANNOtype_facebookAPIKey'); ?>', status: true, cookie: true, xfbml: true});
							</script>
							<?php
								if(!function_exists('get_facebook_cookie')) {
									function get_facebook_cookie($app_id, $application_secret) {
									  $args = array();
									  parse_str(trim($_COOKIE['fbs_' . $app_id], '\\"'), $args);
									  ksort($args);
									  $payload = '';
									  foreach ($args as $key => $value) {
									    if ($key != 'sig') {
									      $payload .= $key . '=' . $value;
									    }
									  }
									  if (md5($payload . $application_secret) != $args['sig']) {
									    return null;
									  }
									  return $args;
									}
								}
								
								$cookie = get_facebook_cookie(get_option('ANNOtype_facebookAPIKey'), get_option('ANNOtype_facebookSecretKey'));
								$user = json_decode(file_get_contents('https://graph.facebook.com/me?access_token='.$cookie['access_token']));
			
								echo "<div class='ANNOtype_facebook'>";
									echo "<h3 style='margin: 0; font-size: 13px; font-weight: normal; color: #000;'>{$user->first_name}</h3>";
									echo "<p style='margin: 0;'>".'<a href="#" style="font-size: 10px; color: #000; text-decoration: none;" onclick="FB.logout(function() {window.location.reload();});return false;">'."(Log Out)</a></p>";
									
									echo "<div class='ANNOtype_bubbleText'>";
									echo "<input type='hidden' name='name' value='{$user->name}' />";
									echo "<input type='hidden' name='website' value='{$user->link}' />";
									echo "</div>";
								echo "</div>";
							}
							?>
							
				
							
							
				
							
							<textarea  id="largeform"  name='comment' onfocus='if (this.value == "What is on your mind?") {this.value = "";}' onblur='if (this.value == "") {this.value = "What is on your mind?";}'>What is on your mind?</textarea>
							
							
							<?php if(!is_user_logged_in() AND $_SESSION['status'] != 'verified' AND !isset($_COOKIE['fbs_'.get_option('ANNOtype_facebookAPIKey')])): ?>
							<input type="text" name='name' value="Name (required)" onfocus="if (this.value == &quot;Name (required)&quot;) {this.value = &quot;&quot;;}" onblur="if (this.value == &quot;&quot;) {this.value = &quot;Name (required)&quot;;}" />
							<input type="text" name='email' value="Email (optional, private)" onfocus="if (this.value == &quot;Email (optional, private)&quot;) {this.value = &quot;&quot;;}" onblur="if (this.value == &quot;&quot;) {this.value = &quot;Email (optional, private)&quot;;}" />
							<input type="text" name='website' value="Website (optional)" onfocus="if (this.value == &quot;Website (optional)&quot;) {this.value = &quot;&quot;;}" onblur="if (this.value == &quot;&quot;) {this.value = &quot;Website (optional)&quot;;}" />
							<div style='clear: both; padding-bottom: 5px;'></div>
							<?php endif; ?>
							
							<?php if(get_option('ANNOtype_aweber') == 'On' || get_option('ANNOtype_mailchimp') == 'On' || get_option('ANNOtype_getResponse') == 'On') {
								echo '<div class="subscribeupdates" style="clear: both; height: 24px; line-height: 24px; margin: 0; margin-left: 17px !important; padding-top: 10px !important; font-size: 11px; font-weight: normal; overflow: hidden;">
								<input style="margin: 0; float: left; margin-top: 5px;" type="checkbox" checked="checked" name="subscribecheck" id="subscribecheck_'.$annotation->ID.'" />
									<label for="subscribecheck_'.$annotation->ID.'" style="margin: 0 !important; margin-left: 5px !important; font-size: 11px !important; float: left;">Subscribe for updates</label>
								</div>';
							} ?>
							
							<?php if(get_option('ANNOtype_moderation') == 'On'): ?>
							<label id="smallformtxt">Moderation is ON</label>
							<?php endif; ?>
							<input id="replyrespondbutton" type="submit" name="annoboxtoggle" value="Respond">
						</form>
					</div>
					<?php if((get_option('ANNOtype_allowLoginFacebook') == 'On' && get_option('ANNOtype_facebookAPIKey') && get_option('ANNOtype_facebookSecretKey') || (get_option('ANNOtype_allowLoginTwitter') == 'On' && get_option('ANNOtype_twitterConsumerKey') && get_option('ANNOtype_twitterConsumerSecret')))): ?>
					<div class="annoboxreplyshare">
						<?php if(!isset($_COOKIE['fbs_'.get_option('ANNOtype_facebookAPIKey')]) && get_option('ANNOtype_allowLoginFacebook') == 'On' && get_option('ANNOtype_facebookAPIKey') && get_option('ANNOtype_facebookSecretKey')): ?>
						<div id="fb-root"></div>
						<script src="http://connect.facebook.net/en_US/all.js"></script>
						<script>
						  FB.init({appId: '<?php echo get_option('ANNOtype_facebookAPIKey'); ?>', status: true, cookie: true, xfbml: true});
						  FB.Event.subscribe('auth.sessionChange', function(response) {
						    if (response.session) {
						    	window.location.reload();
						    } else {
						    	window.location.reload();
						    }
						  });
						</script>
						<div class="annoboxfb"></div>
						<?php endif; ?>
						<?php if($_SESSION['status'] != 'verified' && get_option('ANNOtype_allowLoginTwitter') == 'On' && get_option('ANNOtype_twitterConsumerKey') && get_option('ANNOtype_twitterConsumerSecret')): ?>
						<a href="<?php echo UBD_URL; ?>/twitteroauth/redirect.php?url=<?php echo get_permalink($postID); ?>"><div class="annoboxtwitter"></div></a>
						<?php endif; ?>
					</div>
					<?php endif; ?>
				</div>
				<?php endif; ?>
			</div>
			<?php endif; ?>
		<?php endif; ?>
		<?php $cc++; ?>
	<?php endforeach; ?>
	
	<?php
	if($annoboxcount > 5) {
		$boxp = 5;
	} else {
		$boxp = $annoboxcount;
	}
	?>
	<div class="annoboxfooter">
		<p class="annoboxfootertextleft">Displaying <span class='current'><?php echo $boxp; ?></span> of <span class='total'><?php echo $annoboxcount; ?></span> Highlights</p>
		<?php if($annoboxcount > 5): ?>
		<p class="annoboxfootertextright annoboxMore">Show More Highlights &rarr</p>
		<?php endif; ?>
	</div>
</div>
<?php
	endif;
}


function ANNObox_html($postID) {
	$width = get_option('ANNOtype_annoboxwidth');
	
	if(get_option('ANNOtype_annobox') == 'On'):
	global $wpdb, $user_ID;
				if($user_ID) {
					if(current_user_can('level_10')) {
						$is_admin = true;
					} else {
						$is_admin = false;
					}
				}
	
	if(get_option('ANNOtype_allowLoginFacebook') != 'On' || $_SESSION['status'] == 'verified' || is_user_logged_in()) {
		unset($_COOKIE['fbs_'.get_option('ANNOtype_facebookAPIKey')]);
	}
				
	$annotations = $wpdb->get_results('SELECT * FROM '.$wpdb->prefix.'annotations WHERE postID = "'.$postID.'"');
	if($annotations):
?>
<?php $html .= '<div id="annobox" style="width: '.$width.'px !important;">'; ?>
	<?php $get = $wpdb->get_results('SELECT * FROM '.$wpdb->prefix.'annotationcomments LEFT JOIN '.$wpdb->prefix.'annotations ON ('.$wpdb->prefix.'annotations.ID = '.$wpdb->prefix.'annotationcomments.annotationID) WHERE status = "approved" AND '.$wpdb->prefix.'annotations.postID = "'.$postID.'" ORDER BY wp_annotationcomments.ID DESC'); ?>
	<?php $html .= '<div class="annoboxrssbar" style="width: '.$width.'px !important;">'; ?>
		<?php $html .= '<a href="#"><div class="annoboxbigbubble"><p>Highlights ('.count($annotations).')</p></div></a>'; ?>
	<?php $html .= '</div>'; ?>
	
	<?php $html .= '<div class="annoboxoptionbar" style="width: '.$width.'px !important;">'; ?>
		<?php $html .= '<div>' ?>
			<?php $html .= '' ?>
<?php $html .= '	</div>' ?>
	<?php $html .= '</div>' ?>
	
	<?php $cc = 1; ?>
	<?php foreach($annotations as $id => $annotation): ?>
		<?php if($cc == 3) { $cc = 1; } else { $blah = ''; } ?>
		<?php if($cc == 1) { $class = 'annoboxresponselightgray'; } else { $class = 'annoboxresponsedarkgray'; } ?>
		<?php $comments = $wpdb->get_results('SELECT * FROM '.$wpdb->prefix.'annotationcomments WHERE status = "approved" AND annotationID = "'.$annotation->ID.'" ORDER BY id ASC'); ?>
		<?php if($comments): ?>
			<?php $annoboxcount++; ?>
			<?php if($annotation->subtype == 'txt'): ?>
			<?php $html .= '<div class="'.$class.'" style="display: none !important; width: '.$width.'px !important;">' ?>
				<?php $pWidth = $width-91; $html .= '<p style="width: '.$pWidth.'px !important;">' ?><?php $html .= substr(strip_tags(stripslashes($annotation->text)), 0, 150); ?></p>
				<?php $html .= '<div class="annoboxbubble">' ?><?php $html .= count($comments); ?><?php $html .= '</div>' ?>
				<?php $html .= '<span></span>'; ?>
				<?php
				if($is_admin) {
					$html .= "<div class='annoboxadmin' style='display: none !important; position: absolute !important; top: 8px !important; left: 17px !important;'>";
						$html .= "<a href='".admin_url('admin.php')."?page=Conversations&action=edit&id={$comment->ID}'><img src='".UBD_URL."/public/images/bubble2/edit.png' alt='Edit' /></a>";
						$html .= "<a style='margin-left: 5px;' href='".admin_url('admin.php')."?page=Conversations&changeStatus=trash&id={$comment->ID}'><img src='".UBD_URL."/public/images/bubble2/delete.png' alt='Delete' /></a>";
					$html .= "</div>";
				}
				?>
			<?php $html .= '</div>' ?>
			<?php else: ?>
			<?php $html .= '<div class="' ?><?php $html .= $class; ?><?php $html .= '" display: none !important; style="width: '.$width.'px !important;">' ?>
				<?php $html .= '<img src="'.UBD_URL.'/libs/timthumb.php?src='.$annotation->text.'&w=67&h=45&q=100" class="annoboximg" alt="ANNOBox Image" />' ?>
				<?php $html .= '<div class="annoboxbubble">'.count($comments).'</div>' ?>
				<?php $html .= '<span></span>' ?>
			<?php $html .= '</div>' ?>
			<?php endif; ?>
			<?php if($comments): ?>
			<?php $riWidth = $width-55; $html .= '<div class="annoboxresponseindent" style="display: none !important; width: '.$riWidth.'px !important;">' ?>
				<?php foreach($comments as $comment): ?>
				<?php
				if($comment->userID) { // is this user already registered?
					$user = get_userdata($comment->userID);
					
					$comment->name = $user->display_name;
					$comment->url = $user->user_url;
					$comment->email = $user->user_email;
				}
				
				$comment->url = esc_url($comment->url);
														
				if($comment->url) {
					$comment->name = "<a style='color: #000 !important;' href='{$comment->url}'>{$comment->name}</a>";
				}
				
				$comment->comment = make_clickable(stripslashes($comment->comment)); // annotation comment
			
				if($comment->email) { // if annoated by a registered user, get gravatar
					$avatar = get_avatar($comment->email, 24, UBD_URL.'/public/images/annotar.jpg');
				} elseif(strpos($comment->url, 'twitter') !== false) { // if its a twitter user, get twitter avatar
					$getUser = preg_match_all('#http://(.*)twitter.com/(.*)#', $comment->url, $matches);
					$twitterID = $matches[2][0];
					$avatar = "<img src='http://img.tweetimag.es/i/{$twitterID}_m' alt='{$twitterID}' />";
				} else { // else no avatar
					$avatar = '';
				}
				?>
				<?php $html .= '<div class="annoboxsmallrespond" style="width: '.$riWidth.'px !important;">' ?>
					<?php $html .= '<div class="annoboxsmallrespondtop" style="position: relative !important; width: '.$riWidth.'px !important;">' ?>
						<?php $html .= '<span>'.$avatar.'</span>' ?>
						<?php $html .= '<p>' ?><?php $html .= $comment->name; ?><?php $html .= ' - <abbr class="timeago" title="'.date('c', $comment->timestamp).'">'.date('M, d Y', $comment->timestamp).'</abbr></p>'; ?>
						<?php
						if($is_admin) {
$html .= "<div class='annoboxadmin' style='display: none !important; position: absolute !important; top: 8px !important; right: 18px !important;'>";								$html .= "<a href='".admin_url('admin.php')."?page=Conversations&action=edit&id={$comment->ID}'><img src='".UBD_URL."/public/images/bubble2/edit.png' alt='Edit' /></a>";
								$html .= "<a style='margin-left: 5px !important;' href='".admin_url('admin.php')."?page=Conversations&changeStatus=trash&id={$comment->ID}'><img src='".UBD_URL."/public/images/bubble2/delete.png' alt='Delete' /></a>";
							$html .= "</div>";
						}
						?>
					<?php $html .= '</div>'; ?>
					<?php $ripWidth = $width-75; $html .= '<div class="annoboxsmallrespondbottom" style="width: '.$ripWidth.'px !important;">' ?>
						<?php $html .= '<p>'.$comment->comment.'</p>' ?>
					<?php $html .= '</div>' ?>
				<?php $html .= '</div>'; ?>
				<?php endforeach; ?>
				<?php if(get_option('ANNOtype_responses') == 'On'): ?>
				<?php $arWidth = $width-55; $html .= '<div class="annoboxreply" style="width: '.$arWidth.'px !important;">' ?>
				
					<?php $html .= '<div class="annoboxform" style="width: '.$arWidth.'px !important;">' ?>
					
						<?php $html .= '<form action="" class="annotationID_'.$annotation->ID.'">' ?>
						<?php $html .= '<h3 class="postreply" style="margin-top: 10px !important;">Post a Reply</h3>' ?>
							<?php
							if(is_user_logged_in()) {
								global $current_user;
								$current_user = wp_get_current_user();
								$html .= "<input type='hidden' name='userID' value='{$current_user->ID}' />";
								$html .= "<div class='ANNOtype_twitter' style='margin-bottom: 0px !important;'>";
									$html .= "<p class='avatar' style='float: left !important; padding:0; margin: 0; margin-right: 5px !important;'>".get_avatar($current_user->ID, 32)."</p>";
									$html .= "<div style='float: left !important;'>";
										$html .= "<h3 style='margin: 0; font-size: 13px !important; font-weight: bold !important; color: #".'000'." !important;'>{$current_user->display_name}</h3>";
										$html .= "<p style='margin: 0 !important;'>(<a style='font-size: 10px !important; color: #".'000'." !important; text-decoration: none !important;' href='".wp_logout_url(get_permalink($postID[0]->postID))."'>Log Out</a>)</p>";
									$html .= "</div>";
									$html .= "<div style='clear: left !important;'></div>";
									
									$html .= "<div class='ANNOtype_bubbleText'>";
									$html .= "<input type='hidden' name='name' value='{$twitterUser->name}' />";
									$html .= "<input type='hidden' name='website' value='http://twitter.com/{$twitterUser->screen_name}' />";
									$html .= "</div>";
								$html .= "</div>";
							}
	
							if($_SESSION['status'] == 'verified') {
								include 'twitteroauth/twitteroauth.php';
								$access_token = $_SESSION['access_token'];
								$twitterConnect = new TwitterOAuth(get_option('ANNOtype_twitterConsumerKey'), get_option('ANNOtype_twitterConsumerSecret'), $access_token['oauth_token'], $access_token['oauth_token_secret']);
								$twitterUser = $twitterConnect->get('account/verify_credentials');
								
								$html .= "<div class='ANNOtype_twitter' style='margin-bottom: 0px;'>";
									$html .= "<img style='float: left !important; margin-right: 5px !important;' src='http://img.tweetimag.es/i/{$twitterUser->screen_name}_n' alt='{$twitterUser->screen_name}' />";
									$html .= "<div style='float: left !important;'>";
										$html .= "<h3 style='margin: 0; font-size: 13px !important; font-weight: normal !important; color: #".'000'." !important;'>{$twitterUser->screen_name}</h3>";
										$html .= "<p style='margin: 0;'><a style='font-size: 10px !important; color: #".'000'." !important; text-decoration: none !important;' href='".UBD_URL."/twitteroauth/signout.php?url=".get_permalink($postID[0]->postID)."'>(Log Out)</a></p>";
									$html .= "</div>";
									$html .= "<div style='clear: left !important;'></div>";
									
									$html .= "<div class='ANNOtype_bubbleText'>";
									$html .= "<input type='hidden' name='name' value='{$twitterUser->name}' />";
									$html .= "<input type='hidden' name='website' value='http://twitter.com/{$twitterUser->screen_name}' />";
									$html .= "</div>";
								$html .= "</div>";
							}
	
							if(isset($_COOKIE['fbs_'.get_option('ANNOtype_facebookAPIKey')])) {
							?>
							<?php $html .= '<div id="fb-root"></div>' ?>
							<?php $html .= '<script src="http://connect.facebook.net/en_US/all.js"></script>' ?>
							<?php $html .= '<script>
							  FB.init({appId: "'.get_option('ANNOtype_facebookAPIKey').'", status: true, cookie: true, xfbml: true});
							</script>' ?>
							<?php
								if(!function_exists('get_facebook_cookie')) {
									function get_facebook_cookie($app_id, $application_secret) {
									  $args = array();
									  parse_str(trim($_COOKIE['fbs_' . $app_id], '\\"'), $args);
									  ksort($args);
									  $payload = '';
									  foreach ($args as $key => $value) {
									    if ($key != 'sig') {
									      $payload .= $key . '=' . $value;
									    }
									  }
									  if (md5($payload . $application_secret) != $args['sig']) {
									    return null;
									  }
									  return $args;
									}
								}
								
								$cookie = get_facebook_cookie(get_option('ANNOtype_facebookAPIKey'), get_option('ANNOtype_facebookSecretKey'));
								$user = json_decode(file_get_contents('https://graph.facebook.com/me?access_token='.$cookie['access_token']));
			
								$html .= "<div class='ANNOtype_facebook'>";
									$html .= "<h3 style='margin: 0; font-size: 13px !important; font-weight !important: normal; color: #".'000'." !important;'>{$user->first_name}</h3>";
									$html .= "<p style='margin: 0;'>".'<a href="#" style="font-size: 10px !important; color: #'.'000'.' !important; text-decoration: none !important;" onclick="FB.logout(function() {window.location.reload();});return false;">'."(Log Out)</a></p>";
									
									$html .= "<div class='ANNOtype_bubbleText'>";
									$html .= "<input type='hidden' name='name' value='{$user->name}' />";
									$html .= "<input type='hidden' name='website' value='{$user->link}' />";
									$html .= "</div>";
								$html .= "</div>";
							}
							?>
							
				
							
							
				
							
							<?php $arcWidth = $width-90; $html .= '<textarea style="width: '.$arcWidth.'px;" id="largeform"  name="comment" onfocus="if (this.value == \'What is on your mind?\') {this.value = \'\';}" onblur="if (this.value == \'\';) {this.value = \'What is on your mind?\';}">What is on your mind?</textarea>' ?>
							
							
							<?php if(!is_user_logged_in() AND $_SESSION['status'] != 'verified' AND !isset($_COOKIE['fbs_'.get_option('ANNOtype_facebookAPIKey')])): ?>
							<?php $html .= '<input type="text" name="name" value="Name (required)" onfocus="if (this.value == &quot;Name (required)&quot;) {this.value = &quot;&quot;;}" onblur="if (this.value == &quot;&quot;) {this.value = &quot;Name (required)&quot;;}" />'; ?>
							<?php $html .= '<input type="text" name="email" value="Email (optional, private)" onfocus="if (this.value == &quot;Email (optional, private)&quot;) {this.value = &quot;&quot;;}" onblur="if (this.value == &quot;&quot;) {this.value = &quot;Email (optional, private)&quot;;}" />' ?>
							<?php $html .= '<input type="text" name="website" value="Website (optional)" onfocus="if (this.value == &quot;Website (optional)&quot;) {this.value = &quot;&quot;;}" onblur="if (this.value == &quot;&quot;) {this.value = &quot;Website (optional)&quot;;}" />' ?>
							<?php $html .= '<div style="clear: both !important; padding-bottom !important: 5px;"></div>' ?>
							<?php endif; ?>
							
							<?php if(get_option('ANNOtype_aweber') == 'On' || get_option('ANNOtype_mailchimp') == 'On' || get_option('ANNOtype_getResponse') == 'On') {
								$html .= '<div class="subscribeupdates" style="clear: both !important; height: 24px !important; line-height: 24px !important; margin: 0 !important; margin-left: 17px !important; padding-top: 10px !important; font-size: 11px !important; font-weight: normal !important; overflow: hidden !important;">
								<input style="margin: 0; float: left !important; margin-top: 5px !important;" type="checkbox" checked="checked" name="subscribecheck" id="subscribecheck_'.$annotation->ID.'" />
									<label for="subscribecheck_'.$annotation->ID.'" style="margin: 0 !important; margin-left: 5px !important; font-size: 11px !important; float: left;">Subscribe for updates</label>
								</div>';
							} ?>
							
							<?php if(get_option('ANNOtype_moderation') == 'On'): ?>
							<?php $html .= '<a href="Your comment will be manually approved by the blog administrator." id="smallformtxt">Moderation is ON</a>' ?>
							<?php endif; ?>
							<?php $html .= '<input id="replyrespondbutton" type="submit" name="annoboxtoggle" value="Respond">' ?>
						<?php $html .= '</form>'; ?>
					<?php $html .= '</div>'; ?>
					<?php if((get_option('ANNOtype_allowLoginFacebook') == 'On' && get_option('ANNOtype_facebookAPIKey') && get_option('ANNOtype_facebookSecretKey') || (get_option('ANNOtype_allowLoginTwitter') == 'On' && get_option('ANNOtype_twitterConsumerKey') && get_option('ANNOtype_twitterConsumerSecret')))): ?>
					<?php $html .= '<div class="annoboxreplyshare" style="width: '.$arWidth.'px;">' ?>
						<?php if(!isset($_COOKIE['fbs_'.get_option('ANNOtype_facebookAPIKey')]) && get_option('ANNOtype_allowLoginFacebook') == 'On' && get_option('ANNOtype_facebookAPIKey') && get_option('ANNOtype_facebookSecretKey')): ?>
						<?php $html .= '<div id="fb-root"></div>' ?>
						<?php $html .= '<script src="http://connect.facebook.net/en_US/all.js"></script>' ?>
						<?php $html .= '<script>
						  FB.init({appId: "'.get_option('ANNOtype_facebookAPIKey').'", status: true, cookie: true, xfbml: true});
						  FB.Event.subscribe("auth.sessionChange", function(response) {
						    if (response.session) {
						    	window.location.reload();
						    } else {
						    	window.location.reload();
						    }
						  });
						</script>' ?>
						<?php $html .= '<div class="annoboxfb"></div>' ?>
						<?php endif; ?>
						<?php if($_SESSION['status'] != 'verified' && get_option('ANNOtype_allowLoginTwitter') == 'On' && get_option('ANNOtype_twitterConsumerKey') && get_option('ANNOtype_twitterConsumerSecret')): ?>
						<?php $html .= '<a href="<?php echo UBD_URL; ?>/twitteroauth/redirect.php?url=<?php echo get_permalink($postID); ?>"><div class="annoboxtwitter"></div></a>' ?>
						<?php endif; ?>
					<?php $html .= '</div>' ?>
					<?php endif; ?>
				<?php $html .= '</div>' ?>
				<?php endif; ?>
			<?php $html .= '</div>' ?>
			<?php endif; ?>
		<?php endif; ?>
		<?php $cc++; ?>
	<?php endforeach; ?>
	
	<?php
	if($annoboxcount > 5) {
		$boxp = 5;
	} else {
		$boxp = $annoboxcount;
	}
	?>
	<?php $html .= '<div class="annoboxfooter" style="width: '.$width.'px !important;">' ?>
		<?php $html .= '<p class="annoboxfootertextleft">Displaying <span class="current">'.$boxp.'</span> of <span class="total">'.$annoboxcount.'</span> Highlights</p>' ?>
		<?php if($annoboxcount > 5): ?>
		<?php $html .= '<p class="annoboxfootertextright annoboxMore">Show More Highlights &rarr</p>' ?>
		<?php endif; ?>
	<?php $html .= '</div>' ?>
<?php $html .= '</div>' ?>
<?php
	return $html;
	endif;
	endif;
}
if(!function_exists('ANNOcount')) {
	function ANNOcount($postID, $no = '0', $one = '%', $more = '%')
	{
		global $wpdb;
	
		$get = $wpdb->get_results('SELECT * FROM '.$wpdb->prefix.'annotationcomments LEFT JOIN '.$wpdb->prefix.'annotations ON ('.$wpdb->prefix.'annotations.ID = '.$wpdb->prefix.'annotationcomments.annotationID) WHERE status = "approved" AND '.$wpdb->prefix.'annotations.postID = "'.$postID.'" ORDER BY wp_annotationcomments.ID DESC');
		
		$count = count($get);
		
		if(get_option('ANNOtype_chiclet') == 'blue bar with bubble') { ?>
			<div class='blueBarBubble'>
				<span style='line-height: normal; margin: 0; padding: 0; font-size: 11px; color: #fff;'><?php echo $count; ?></span>
			</div>
		<?php } elseif(get_option('ANNOtype_chiclet') == 'blue bar') { ?>
			<div class='blueBar'>
				<span style='line-height: normal; margin: 0; padding: 0; font-size: 11px; color: #fff;'><?php echo $count; ?></span>
			</div>
		<?php } elseif(get_option('ANNOtype_chiclet') == 'blue bubble') { ?>
			<div class='blueBubble'>
				<span style='line-height: normal; margin: 0; padding: 0; font-size: 11px; color: #fff;'><?php echo $count; ?></span>
			</div>
		<?php } elseif(get_option('ANNOtype_chiclet') == 'white bar with bubble') { ?>
			<div class='whiteBarBubble'>
				<span style='line-height: normal; margin: 0; padding: 0; font-size: 11px; color: #20365e;'><?php echo $count; ?></span>
			</div>
		<?php } elseif(get_option('ANNOtype_chiclet') == 'white bar') { ?>
			<div class='whiteBar'>
				<span style='line-height: normal; margin: 0; padding: 0; font-size: 11px; color: #20365e;'><?php echo $count; ?></span>
			</div>
		<?php } elseif(get_option('ANNOtype_chiclet') == 'white bubble') { ?>
			<div class='whiteBubble'>
				<span style='line-height: normal; margin: 0; padding: 0; font-size: 11px; color: #20365e;'><?php echo $count; ?></span>
			</div>
		<?php }
	}
}

$ANNOtype = new ANNOtype;
