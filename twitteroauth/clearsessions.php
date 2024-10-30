<?php
/**
 * @file
 * Clears PHP sessions and redirects to the connect page.
 */

include_once '../../../../wp-load.php';

/* Load and clear sessions */
session_start();
session_destroy();
 
/* Redirect to page with the connect to Twitter option. */
header('Location: '.get_bloginfo('wpurl'));