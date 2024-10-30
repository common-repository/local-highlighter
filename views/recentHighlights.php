<?php
/*
	Copyright 2010-2012 Highlighter (highlighter.com)

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
$limit = ' LIMIT 0, 5';
$getAnnotations = $wpdb->get_results('SELECT * FROM '.$wpdb->prefix.'annotationcomments a1'.$where.' ORDER BY a1.ID DESC'.$limit);
?>
<div id='the-comment-list' class='list:comment'>
	<?php foreach($getAnnotations as $annotation): ?>
	<?php
	if(!$parentAnnotations[$annotation->ID]) {
		$parentAnnotationsResults = $wpdb->get_results('SELECT * FROM '.$wpdb->prefix.'annotations WHERE ID = "'.$annotation->annotationID.'"');
		foreach($parentAnnotationsResults as $pAnno) {
			$parentAnnotations[$pAnno->ID] = $pAnno;
		}
	}
	?>
	<div class='comment comment-item'>
		<?php
		if($annotation->userID) { // is this user already registered?
			$user = get_userdata($annotation->userID);
			
			$annotation->url = $user->user_url;
			$annotation->email = $user->user_email;
		}
		
		if($annotation->email) { // if annoated by a registered user, get gravatar
			$avatar = get_avatar($annotation->email, 48, UBD_URL.'/public/images/annotar.jpg');
		} elseif(strpos($annotation->url, 'twitter') !== false) { // if its a twitter user, get twitter avatar
			$getUser = preg_match_all('#http://(.*)twitter.com/(.*)#', $annotation->url, $matches);
			$twitterID = $matches[2][0];
			$avatar = "<img src='http://img.tweetimag.es/i/{$twitterID}_n' alt='{$twitterID}' />";
		} else { // else no avatar
			$avatar = '';
		}
		?>
		<?php echo $avatar; ?>
		<div class='dashboard-comment-wrap'>
			<h4 class='comment-meta'>
				From
				<cite class='comment-author'>
					<?php
					if($annotation->userID):
						if(!$users[$annotation->userID]) {
							$users[$annotation->userID] = get_userdata($annotation->userID);
						}
					?>
						<?php echo $users[$annotation->userID]->display_name; ?>
					<?php else: ?>
						<?php echo $annotation->name; ?>
					<?php endif; ?>
				</cite> on 
				<a href='<?php echo admin_url('post.php'); ?>?action=edit&amp;post=<?php echo $parentAnnotations[$annotation->annotationID]->postID; ?>'><?php echo strip_tags($parentAnnotations[$annotation->annotationID]->text); ?></a>
			</h4>
			<blockquote>
				<p><?php echo make_clickable(stripslashes($annotation->comment)); ?></p>
			</blockquote>
			<p class='row-actions'>
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
			</p>
		</div>
	</div>
	<?php endforeach; ?>
</div>
