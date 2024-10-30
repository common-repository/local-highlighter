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
class ANNOtypeHelper
{
	function radioBoxes($name, $options)
	{
		$default = get_option('ANNOtype_'.$name);
		
		foreach($options as $value) {
			$checked = ($default == $value) ? 'checked="checked"' : '';
			echo '<span><input type="radio" name="'.$name.'" value="'.$value.'" '.$checked.' /> '.$value.'</span>';
		}
	}
	
	function checkbox($name)
	{
		$default = get_option('ANNOtype_'.$name);
		
		$checked = ($default == 'On') ? 'checked="checked"' : '';
		echo '<span><input type="hidden" name="'.$name.'" value="Off" /><input type="checkbox" id="'.$name.'" name="'.$name.'" value="'.$default.'" '.$checked.' /></span>';
	}
	
	function text($name)
	{
		$default = get_option('ANNOtype_'.$name);
		
		//$checked = ($default == 'On') ? 'checked="checked"' : '';
		echo '<input type="text" id="'.$name.'" name="'.$name.'" value="'.$default.'" />';
	}

	function dropdown($name, $options)
	{
		$default = get_option('ANNOtype_'.$name);
		
		echo '<select id="'.$name.'" name="'.$name.'">';
		foreach($options as $id => $value) {
			$checked = ($default == $value) ? 'selected="selected"' : '';
			echo '<option value="'.$value.'" '.$checked.'>'.$value.'</option>';
		}
		echo '</select>';
	}
}
