"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = "<?php\n/**\n * The base configuration for WordPress\n *\n * The wp-config.php creation script uses this file during the\n * installation. You don't have to use the web site, you can\n * copy this file to \"wp-config.php\" and fill in the values.\n *\n * This file contains the following configurations:\n *\n * * MySQL settings\n * * Secret keys\n * * Database table prefix\n * * ABSPATH\n *\n * @link https://codex.wordpress.org/Editing_wp-config.php\n *\n * @package WordPress\n */\n// ** MySQL settings - You can get this info from your web host ** //\n/** The name of the database for WordPress */\ndefine( 'DB_NAME', 'database_name_here' );\n/** MySQL database username */\ndefine( 'DB_USER', 'username_here' );\n/** MySQL database password */\ndefine( 'DB_PASSWORD', 'password_here' );\n/** MySQL hostname */\ndefine( 'DB_HOST', 'localhost' );\n/** Database Charset to use in creating database tables. */\ndefine( 'DB_CHARSET', 'utf8' );\n/** The Database Collate type. Don't change this if in doubt. */\ndefine( 'DB_COLLATE', '' );\n/**#@+\n * Authentication Unique Keys and Salts.\n *\n * Change these to different unique phrases!\n * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}\n * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.\n *\n * @since 2.6.0\n */\ndefine( 'AUTH_KEY',         'put your unique phrase here' );\ndefine( 'SECURE_AUTH_KEY',  'put your unique phrase here' );\ndefine( 'LOGGED_IN_KEY',    'put your unique phrase here' );\ndefine( 'NONCE_KEY',        'put your unique phrase here' );\ndefine( 'AUTH_SALT',        'put your unique phrase here' );\ndefine( 'SECURE_AUTH_SALT', 'put your unique phrase here' );\ndefine( 'LOGGED_IN_SALT',   'put your unique phrase here' );\ndefine( 'NONCE_SALT',       'put your unique phrase here' );\n/**#@-*/\n/**\n * WordPress Database Table prefix.\n *\n * You can have multiple installations in one database if you give each\n * a unique prefix. Only numbers, letters, and underscores please!\n */\n$table_prefix = 'wp_';\n/**\n * For developers: WordPress debugging mode.\n *\n * Change this to true to enable the display of notices during development.\n * It is strongly recommended that plugin and theme developers use WP_DEBUG\n * in their development environments.\n *\n * For information on other constants that can be used for debugging,\n * visit the Codex.\n *\n * @link https://codex.wordpress.org/Debugging_in_WordPress\n */\ndefine( 'WP_DEBUG', false );\n/* That's all, stop editing! Happy publishing. */\n/** Absolute path to the WordPress directory. */\nif ( ! defined( 'ABSPATH' ) ) {\n\tdefine( 'ABSPATH', dirname( __FILE__ ) . '/' );\n}\n/** Sets up WordPress vars and included files. */\nrequire_once( ABSPATH . 'wp-settings.php' );";
exports["default"] = _default;