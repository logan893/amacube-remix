<?php
/**
* This file is part of the Amacube-Remix_WBList Roundcube plugin
* Copyright (C) 2015, Tony VanGerpen <Tony.VanGerpen@hotmail.com>
* 
* A Roundcube plugin to let users manage whitelist/blacklist (which must be stored in a database)
* Based heavily on the amacube plugin by Alexander Köb (https://github.com/akoeb/amacube)
* 
* Licensed under the GNU General Public License version 3. 
* See the COPYING file in parent directory for a full license statement.
*/

# The database connection settings where amavis stores settings and emails
$rcmail_config['amacube_remix_db_dsn'] = 'mysql://amacube:amacube@localhost/amavisd';
?>