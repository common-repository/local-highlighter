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
global $wpdb; ?>

<?php
if($_GET['changeStatus']) {
	$this->changeStatus($_GET['id'], $_GET['changeStatus']);
	
	if($_GET['changeStatus'] == 'delete') {
		$this->deleteComment($_GET['id']);
	}
}

if($_GET['action_annotations'] && $_GET['action'] != '-1' && $_GET['doaction']) {
	$accepted = array('approved', 'pending', 'spam', 'trash');
	
	if(in_array($_GET['action'], $accepted)) {
		foreach($_GET['action_annotations'] as $key => $id) {
			$this->changeStatus($id, $_GET['action']);
		}
	}
	
	if($_GET['action'] == 'delete') {
		foreach($_GET['action_annotations'] as $key => $id) {
			$this->deleteComment($id);
		}
	}
}

if($_GET['action_annotations'] && $_GET['action_2'] != '-1' && $_GET['doaction_2']) {
	$accepted = array('approved', 'pending', 'spam', 'trash');
	
	if(in_array($_GET['action_2'], $accepted)) {
		foreach($_GET['action_annotations'] as $key => $id) {
			$this->changeStatus($id, $_GET['action_2']);
		}
	}
	
	if($_GET['action_2'] == 'delete') {
		foreach($_GET['action_annotations'] as $key => $id) {
			$this->deleteComment($id);
		}
	}
}

if(!$_GET['currentPage']) {
	$_GET['currentPage'] = 1;
}
?>
<div class='wrap'>
	<div id='icon-edit-comments' class='icon32'><br></div>
	<h2>
		Edit Highlights
		<?php if($_GET['s']): ?>
		<span class="subtitle">Search results for "<?php echo $_GET['s']; ?>"</span>
		<?php endif; ?>
	</h2>
	
	<?php if($_GET['action'] == 'edit'): ?>
	<?php $comment = $this->getComment($_GET['id']); ?>
	<?php
	if($_GET['save']) {
		if($comment[0]->userID) {
			$wpdb->update($wpdb->prefix.'annotationcomments', array('comment' => $_GET['content'], 'status' => $_GET['annotation_status']), array('ID' => $_GET['id']), array('%s', '%s'), array('%d'));
		} else {
			$wpdb->update($wpdb->prefix.'annotationcomments', array('name' => $_GET['newcomment_author'], 'email' => $_GET['newcomment_author_email'], 'url' => $_GET['newcomment_author_url'], 'comment' => $_GET['content'], 'status' => $_GET['annotation_status']), array('ID' => $_GET['id']), array('%s', '%s'), array('%d'));
		}
		
		echo '<div class="updated"><p><strong>Comment updated!</strong> <a href="admin.php?page=Highlights">Go back!</a></p></div>';
	}
	?>
	<?php $comment = $this->getComment($_GET['id']); ?>
	<form id='annotations-form' action='admin.php' method='get'>
		<input type='hidden' name='page' value='Highlights' />
		<input type='hidden' name='action' value='edit' />
		<input type='hidden' name='id' value='<?php echo $_GET['id']; ?>' />
		
		<div id='poststuff' class='metabox-holder has-right-sidebar'>
			<div id='side-info-column' class='inner-sidebar'>
				<div id='submitdiv' class='stuffbox'>
					<h3><span class='hndle'>Status</span></h3>
					<div class='inside'>
						<div class='submitbox' id='submitcomment'>
							<div id='minor-publishing'>
								<div id='misc-publishing-actions'>
									<div class='misc-pub-section' id='comment-status-radio'>
										<label class='approved'><input <?php echo ($comment[0]->status == 'approved') ? 'checked="checked"' : ''; ?> type='radio' name='annotation_status' value='approved'>Approved</label><br>
										<label class='waiting'><input <?php echo ($comment[0]->status == 'pending') ? 'checked="checked"' : ''; ?> type='radio' name='annotation_status' value='pending'>Pending</label><br>
										<label class='spam'><input <?php echo ($comment[0]->status == 'spam') ? 'checked="checked"' : ''; ?> type='radio' name='annotation_status' value='spam'>Spam</label>
									</div>
									
									<div class='misc-pub-section curtime misc-pub-section-last'>
										<span id='timestamp'>Submitted on: <b><?php echo date('F d, Y @ H:i', $comment[0]->timestamp); ?></b></span>
									</div>
								</div> <!-- misc actions -->
								<div class='clear'></div>
							</div>
							<div id='major-publishing-actions'>
								<div id='delete-action'>
									<a class='submitdelete deletion' href='admin.php?page=Highlights&changeStatus=trash&id=<?php echo $_GET['id']; ?>'>Move to Trash</a>
								</div>
								<div id='publishing-action'>
									<input type='submit' name='save' value='Update Highlight' tabindex='4' class='button-primary'>
								</div>
								<div class='clear'></div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div id='post-body'>
				<div id='post-body-content'>
					<div id='namediv' class='stuffbox'>
						<h3><label for='name'>Author</label></h3>
						<div class='inside'>
							<table class='form-table editcomment'>
								<tbody>
									<?php
									if($comment[0]->userID) {
										$user = get_userdata($comment[0]->userID);
										
										$comment[0]->name = $user->display_name;
										$comment[0]->email = $user->user_email;
										$comment[0]->url = $user->user_url;
									}
									?>
									<tr valign='top'>
										<td class='first'>Name:</td>
										<td><input type='text' <?php echo ($comment[0]->userID) ? 'disabled="disabled"' : ''; ?> name='newcomment_author' size='30' value='<?php echo $comment[0]->name; ?>' tabindex='1' id='name'></td>
									</tr>
									<tr valign='top'>
										<td class='first'>
										E-mail:</td>
										<td><input type='text' <?php echo ($comment[0]->userID) ? 'disabled="disabled"' : ''; ?> name='newcomment_author_email' size='30' value='<?php echo $comment[0]->email; ?>' tabindex='2' id='email'></td>
									</tr>
									<tr valign='top'>
										<td class='first'>
										URL 
										<?php if($comment[0]->url): ?>
										(<a href='<?php echo $comment[0]->url; ?>' rel='external nofollow' target='_blank'>visit site</a>):</td>
										<?php endif; ?>
										<td><input type='text' <?php echo ($comment[0]->userID) ? 'disabled="disabled"' : ''; ?> id='newcomment_author_url' name='newcomment_author_url' size='30' class='code' value='<?php echo $comment[0]->url; ?>' tabindex='3'></td>
									</tr>
								</tbody>
							</table>
							<br>
						</div>
					</div>
					<div id='postdiv' class='postarea'>
						<div id='editorcontainer'>
							<textarea rows='10' cols='40' name='content' tabindex='4' id='content'><?php echo stripslashes($comment[0]->comment); ?></textarea>
						</div>
					</div>
				</div>
			</div>
		</div>
	</form>
	<?php else: ?>
	<form id='annotations-form' action='admin.php?page=Highlights' method='get'>
		<input type='hidden' name='page' value='Highlights' />
		<ul class='subsubsub'>
			<?php if(!isset($_GET['annotation_status']) || $_GET['annotation_status'] == 'all'): ?>
			<li class='all'><a href='admin.php?page=Highlights&annotation_status=all' class='current'>All</a> |</li>
			<?php else: ?>
			<li class='all'><a href='admin.php?page=Highlights&annotation_status=all'>All</a> |</li>
			<?php endif; ?>
			
			<?php $count = $wpdb->get_results('SELECT COUNT(*) AS c FROM '.$wpdb->prefix.'annotationcomments a1 WHERE status = "pending"'); ?>
			<?php
			if($count) {
				$countHTML = '<span class="count">(<span class="pending-count">'.$count[0]->c.'</span>)</span>';
			} else {
				$countHTML = '';
			}
			?>
			<?php if($_GET['annotation_status'] == 'pending'): ?>
			<li class='moderated'><a href='admin.php?page=Highlights&annotation_status=pending' class='current'>Pending <?php echo $countHTML; ?></a> |</li>
			<?php else: ?>
			<li class='moderated'><a href='admin.php?page=Highlights&annotation_status=pending'>Pending <?php echo $countHTML; ?></a> |</li>
			<?php endif; ?>
			
			<?php $count = $wpdb->get_results('SELECT COUNT(*) AS c FROM '.$wpdb->prefix.'annotationcomments a1 WHERE status = "approved"'); ?>
			<?php
			if($count) {
				$countHTML = '<span class="count">(<span class="pending-count">'.$count[0]->c.'</span>)</span>';
			} else {
				$countHTML = '';
			}
			?>
			<?php if($_GET['annotation_status'] == 'approved'): ?>
			<li class='approved'><a href='admin.php?page=Highlights&annotation_status=approved' class='current'>Approved <?php echo $countHTML; ?></a> |</li>
			<?php else: ?>
			<li class='approved'><a href='admin.php?page=Highlights&annotation_status=approved'>Approved <?php echo $countHTML; ?></a> |</li>
			<?php endif; ?>

			<?php $count = $wpdb->get_results('SELECT COUNT(*) AS c FROM '.$wpdb->prefix.'annotationcomments WHERE status = "spam"'); ?>
			<?php
			if($count) {
				$countHTML = '<span class="count">(<span class="pending-count">'.$count[0]->c.'</span>)</span>';
			} else {
				$countHTML = '';
			}
			?>
			<?php if($_GET['annotation_status'] == 'spam'): ?>
			<li class='spam'><a href='admin.php?page=Highlights&annotation_status=spam' class='current'>Spam <?php echo $countHTML; ?></a> |</li>
			<?php else: ?>
			<li class='spam'><a href='admin.php?page=Highlights&annotation_status=spam'>Spam <?php echo $countHTML; ?></a> |</li>
			<?php endif; ?>
			
			<?php $count = $wpdb->get_results('SELECT COUNT(*) AS c FROM '.$wpdb->prefix.'annotationcomments a1 WHERE status = "trash"'); ?>
			<?php
			if($count) {
				$countHTML = '<span class="count">(<span class="pending-count">'.$count[0]->c.'</span>)</span>';
			} else {
				$countHTML = '';
			}
			?>
			<?php if($_GET['annotation_status'] == 'trash'): ?>
			<li class='trash'><a href='admin.php?page=Highlights&annotation_status=trash' class='current'>Trash <?php echo $countHTML; ?></a></li>
			<?php else: ?>
			<li class='trash'><a href='admin.php?page=Highlights&annotation_status=trash'>Trash <?php echo $countHTML; ?></a></li>
			<?php endif; ?>
		</ul>
		<?php
		$accepted = array('approved', 'pending', 'spam', 'trash');
		if($_GET['annotation_status'] == 'all') {
			$where = ' ';
		} elseif(in_array($_GET['annotation_status'], $accepted)) {
			$where = ' WHERE status = "'.$_GET['annotation_status'].'"';
		} elseif($_GET['s']) {
			$where = ' WHERE comment LIKE "%'.$_GET['s'].'%"';
		} elseif($_GET['postID']) {
			$where = ' LEFT JOIN '.$wpdb->prefix.'annotations ON('.$wpdb->prefix.'annotations.ID = '.$wpdb->prefix.'annotationcomments.annotationID) WHERE postID = '.$_GET['postID'].'';
		} elseif($_GET['annotationID']) {
			$where = ' WHERE annotationID = '.$_GET['annotationID'].'';
		}
		
		$entries = $wpdb->get_results('SELECT COUNT(*) AS c FROM '.$wpdb->prefix.'annotationcomments a1'.$where);
		$perPage = 10;
		$pages = ceil($entries[0]->c / 10);
		
		if($_GET['currentPage'] ) {
			$left = $_GET['currentPage'];
			$limit = ' LIMIT '.(($_GET['currentPage']-1) * $perPage).', '.$perPage;
		}
		?>
		<?php
		$getAnnotations = $wpdb->get_results('SELECT * FROM '.$wpdb->prefix.'annotationcomments a1'.$where.' ORDER BY a1.ID DESC'.$limit);
		?>
		<?php if($getAnnotations): ?>
		<p class='search-box'>
			<label class='screen-reader-text' for='annotation-search-input'>Search Highlights:</label>
			<input type='text' id='annotation-search-input' name='s' value=''>
			<input type='submit' value='Search Highlights' class='button'>
		</p>
		<div class='tablenav'>
			<div class='alignleft actions'>
				<select name='action'>
					<option value='-1' selected='selected'>Bulk Actions</option>
					<?php if($_GET['annotation_status'] != 'trash'): ?>
					<?php if($_GET['annotation_status'] != 'pending' || $_GET['annotation_status'] != 'spam'): ?>
					<option value='pending'>Unapprove</option>
					<?php endif; ?>
					<?php if($_GET['annotation_status'] != 'approved'): ?>
					<option value='approved'>Approve</option>
					<?php endif; ?>
					<?php if($_GET['annotation_status'] != 'spam'): ?>
					<option value='spam'>Mark as Spam</option>
					<?php endif; ?>
					<?php if($_GET['annotation_status'] != 'spam'): ?>
					<option value='trash'>Move to Trash</option>
					<?php endif; ?>
					<?php endif; ?>
					
					<?php if($_GET['annotation_status'] == 'trash'): ?>
					<option value='approved'>Restore</option>
					<?php endif; ?>
					<?php if($_GET['annotation_status'] == 'spam' || $_GET['annotation_status'] == 'trash'): ?>
					<option value='delete'>Delete Permanently</option>
					<?php endif; ?>
				</select>
				<input type='submit' name='doaction' id='doaction' value='Apply' class='button-secondary apply'>
			</div>
			<br class='clear'>
		</div>
		<div class='clear'></div>
		<table class='widefat comments fixed' cellspacing='0'>
			<thead>
				<tr>
					<th scope='col' id='cb' class='manage-column column-cb check-column' style=''><input type='checkbox'></th>
					<th scope='col' id='author' class='manage-column column-author' style=''>Author</th>
					<th scope='col' id='comment' class='manage-column column-comment' style=''>Comment</th>
					<th scope='col' id='response' class='manage-column column-response' style=''>In Response To</th>
				</tr>
			</thead>
			<tbody id='the-comment-list' class='list:comment'>
				<?php foreach($getAnnotations as $annotation): ?>
				<?php
				if($annotation->status == 'pending') {
					$classes = 'unapproved';	
				} elseif($annotation->status == 'spam') {
					$classes = 'unapproved';
				} elseif($annotation->status == 'trash') {
					$classes = 'trash';
				} else {
					$classes = '';
				}
				?>
				<?php
				if(!$parentAnnotations[$annotations->ID]) {
					$parentAnnotationsResults = $wpdb->get_results('SELECT * FROM '.$wpdb->prefix.'annotations WHERE ID = "'.$annotation->annotationID.'"');
					foreach($parentAnnotationsResults as $pAnno) {
						$parentAnnotations[$pAnno->ID] = $pAnno;
					}
				}
				?>
				<tr class='<?php echo $classes; ?>'>
					<th scope='row' class='check-column'><input type='checkbox' name='action_annotations[]' value='<?php echo $annotation->ID; ?>'></th>
					<?php
					if($annotation->userID):
						if(!$users[$annotation->userID]) {
							$users[$annotation->userID] = get_userdata($annotation->userID);
						}
					?>
					<td class='author column-author'>
						<?php
						if($annotation->userID) { // is this user already registered?
							$user = get_userdata($annotation->userID);
							
							$annotation->url = $user->user_url;
							$annotation->email = $user->user_email;
						}
						
						if($annotation->email) { // if annoated by a registered user, get gravatar
							$avatar = get_avatar($annotation->email, 32, UBD_URL.'/public/images/annotar.jpg');
						} elseif(strpos($annotation->url, 'twitter') !== false) { // if its a twitter user, get twitter avatar
							$getUser = preg_match_all('#http://(.*)twitter.com/(.*)#', $annotation->url, $matches);
							$twitterID = $matches[2][0];
							$avatar = "<img src='http://img.tweetimag.es/i/{$twitterID}_m' alt='{$twitterID}' />";
						} else { // else no avatar
							$avatar = "<img src='".UBD_URL."/public/images/annotar.jpg' alt='' />";
							//$avatar = get_avatar($annotation->email, 32, UBD_URL.'/public/images/annotar.jpg');
						}
						?>
						<strong>
						<?php echo $avatar; ?>
						<?php echo $users[$annotation->userID]->display_name; ?>
						</strong>
						<br />
						<?php if($annotation->url): ?>
						<a href='<?php echo make_clickable($annotation->url); ?>'><?php echo str_replace('http://', '', str_replace('www.', '', $annotation->url)); ?></a>
						<?php endif; ?>
						<?php if($annotation->email): ?>
						<a href='<?php echo $annotation->email; ?>'><?php echo $annotation->email; ?></a>
						<?php endif; ?>
					</td>
					<?php else: ?>
					<td class='author column-author'>
						<?php
						if($annotation->userID) { // is this user already registered?
							$user = get_userdata($annotation->userID);
							
							$annotation->url = $user->user_url;
							$annotation->email = $user->user_email;
						}
						
						if($annotation->email) { // if annoated by a registered user, get gravatar
							$avatar = get_avatar($annotation->email, 32, UBD_URL.'/public/images/annotar.jpg');
						} elseif(strpos($annotation->url, 'twitter') !== false) { // if its a twitter user, get twitter avatar
							$getUser = preg_match_all('#http://(.*)twitter.com/(.*)#', $annotation->url, $matches);
							$twitterID = $matches[2][0];
							$avatar = "<img src='http://img.tweetimag.es/i/{$twitterID}_m' alt='{$twitterID}' />";
						} else { // else no avatar
							$avatar = "<img src='".UBD_URL."/public/images/annotar.jpg' alt='' />";
							//$avatar = get_avatar($annotation->email, 32, UBD_URL.'/public/images/annotar.jpg');
						}
						?>
						<strong><?php echo $avatar; ?><?php echo $annotation->name; ?></strong>
						<br />
						<?php if($annotation->url): ?>
						<a href='<?php echo $annotation->url; ?>'><?php echo str_replace('http://', '', str_replace('www.', '', $annotation->url)); ?></a>
						<?php endif; ?>
						<?php if($annotation->email): ?>
						<a href='<?php echo $annotation->email; ?>'><?php echo $annotation->email; ?></a>
						<?php endif; ?>
					</td>
					<?php endif; ?>
					<td class='comment column-comment'>
						<div id='submitted-on'>Submitted on <?php echo date('Y/m/d', $annotation->timestamp); ?> at <?php echo date('H:i:s', $annotation->timestamp); ?></div>
						<p><?php echo make_clickable(stripslashes($annotation->comment)); ?></p>
						<div class='row-actions'>
							<?php if($annotation->status != 'trash'): ?>
							<span class='edit'><a href='admin.php?page=Highlights&action=edit&amp;id=<?php echo $annotation->ID; ?>' title='Edit annotation'>Edit</a></span>
							
							<?php if($annotation->status == 'approved'): ?>
							<span class='unapprove'> | <a href='admin.php?page=Highlights&changeStatus=pending&id=<?php echo $annotation->ID; ?>'>Unapprove</a></span>
							<?php elseif($annotation->status == 'pending'): ?>
							<span class='approve'> | <a href='admin.php?page=Highlights&changeStatus=approved&id=<?php echo $annotation->ID; ?>'>Approve</a></span>
							<?php endif; ?>
							
							<?php if($annotation->status != 'spam'): ?>
							<span class='spam'> | <a href='admin.php?page=Highlights&changeStatus=spam&id=<?php echo $annotation->ID; ?>'>Spam</a></span>
							<?php endif; ?>
							
							<?php if($annotation->status == 'spam'): ?>
							<span class='unspam approve'> | <a href='admin.php?page=Highlights&changeStatus=pending&id=<?php echo $annotation->ID; ?>'>Not Spam</a></span>
							<?php endif; ?>
							<?php endif; ?>
							
							<?php if($annotation->status != 'trash'): ?>
							<span class='trash'> | <a href='admin.php?page=Highlights&changeStatus=trash&id=<?php echo $annotation->ID; ?>'>Trash</a></span>
							<?php else: ?>
							<span class='untrash approve'><a href='admin.php?page=Highlights&changeStatus=approved&id=<?php echo $annotation->ID; ?>'>Restore</a></span>
							<span class='delete'> | <a href='admin.php?page=Highlights&changeStatus=delete&id=<?php echo $annotation->ID; ?>'>Delete Permanently</a></span>
							<?php endif; ?>
						</div>
					</td>
					<td class='response column-response'>
						<div class='response-links'>
							<span class='post-com-count-wrapper'>
								<?php if($parentAnnotations[$annotation->annotationID]->subtype == 'img'): ?>
								<a href='<?php echo admin_url('post.php'); ?>?action=edit&amp;post=<?php echo $parentAnnotations[$annotation->annotationID]->postID; ?>'><img src='<?php echo UBD_URL; ?>/libs/timthumb.php?src=<?php echo $parentAnnotations[$annotation->annotationID]->text; ?>&w=80&h=80' alt='<?php echo $parentAnnotations[$annotation->annotationID]->text; ?>' /></a>
								<?php else: ?>
								<a href='<?php echo admin_url('post.php'); ?>?action=edit&amp;post=<?php echo $parentAnnotations[$annotation->annotationID]->postID; ?>'><?php echo stripslashes($parentAnnotations[$annotation->annotationID]->text); ?></a>
								<?php endif; ?>
								<br>
								<a href='admin.php?page=Highlights&annotationID=<?php echo $parentAnnotations[$annotation->annotationID]->ID; ?>' title='' class='post-com-count'>
									
									<?php
									if(!$countArray[$annotation->ID]) {
										$count = $wpdb->get_results('SELECT COUNT(*) AS c FROM '.$wpdb->prefix.'annotationcomments WHERE status = "pending" AND annotationID = "'.$annotation->annotationID.'"');
										foreach($count as $c) {
											$countArray[$annotation->ID] = $c->c;
										}
									}
									?>
									<span class='comment-count'><?php echo $countArray[$annotation->ID][0]; ?></span>
								</a>
							</span>
							<a href='<?php bloginfo('wpurl'); ?>?p=<?php echo $parentAnnotations[$annotation->annotationID]->postID; ?>'>#</a>
						</div>
					</td>
				</tr>
				<?php endforeach; ?>
			</tbody>
			<tfoot>
				<tr>
					<th scope='col' id='cb' class='manage-column column-cb check-column' style=''><input type='checkbox'></th>
					<th scope='col' id='author' class='manage-column column-author' style=''>Author</th>
					<th scope='col' id='comment' class='manage-column column-comment' style=''>Comment</th>
					<th scope='col' id='response' class='manage-column column-response' style=''>In Response To</th>
				</tr>
			</tfoot>
		</table>
		<div class='tablenav'>
			<div class='alignleft actions'>
				<select name='action_2'>
					<option value='-1' selected='selected'>Bulk Actions</option>
					<?php if($_GET['annotation_status'] != 'trash'): ?>
					<?php if($_GET['annotation_status'] != 'pending' || $_GET['annotation_status'] != 'spam'): ?>
					<option value='pending'>Unapprove</option>
					<?php endif; ?>
					<?php if($_GET['annotation_status'] != 'approved'): ?>
					<option value='approved'>Approve</option>
					<?php endif; ?>
					<?php if($_GET['annotation_status'] != 'spam'): ?>
					<option value='spam'>Mark as Spam</option>
					<?php endif; ?>
					<?php if($_GET['annotation_status'] != 'spam'): ?>
					<option value='trash'>Move to Trash</option>
					<?php endif; ?>
					<?php endif; ?>
					
					<?php if($_GET['annotation_status'] == 'trash'): ?>
					<option value='approved'>Restore</option>
					<?php endif; ?>
					<?php if($_GET['annotation_status'] == 'spam' || $_GET['annotation_status'] == 'trash'): ?>
					<option value='delete'>Delete Permanently</option>
					<?php endif; ?>
				</select>
				<input type='submit' name='doaction_2' id='doaction' value='Apply' class='button-secondary apply'>
			</div>
			
			<?php if($pages > 1): ?>
			<div class='tablenav-pages'>
				<span class='displaying-num'>Displaying <?php echo $_GET['currentPage']; ?>-<?php echo $_GET['currentPage']; ?> of <?php echo $pages; ?></span>
				
				<?php
				if($_GET['annotation_status']) {
					$vars = '&annotation_status=' . $_GET['annotation_status'];
				}
				?>
				
				<?php for($i = 1; $i <= $pages; $i++): ?>
				
				<?php if($_GET['currentPage'] == $i): ?>
				<span class='page-numbers current'><?php echo $i; ?></span>
				<?php else: ?>
				<a class='page-numbers' href='<?php echo admin_url('admin.php'); ?>?page=Highlights<?php echo $vars; ?>&currentPage=<?php echo $i; ?>'><?php echo $i; ?></a>
				<?php endif; ?>
				
				<?php endfor; ?>
				
				<a class='next page-numbers' href='<?php echo admin_url('admin.php'); ?>?page=Highlights<?php echo $vars; ?>&currentPage=<?php echo $pages; ?>'>&raquo;</a>
			</div>
			<?php endif; ?>
			<br class='clear'>
		</div>
		<?php else: ?>
		<div class='clear'></div>
		<p>No entries found.</p>
		<?php endif; ?>
	</form>
	<?php endif; ?>	
</div>
