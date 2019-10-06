"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = "<?php\nfunction custom_upload_dir_impl( $uploads ) {\n  if ( defined( 'WP_UPLOAD_DIR' ) ) {\n      $uploads['path'] = str_replace( WP_CONTENT_DIR . '/uploads', WP_UPLOAD_DIR, $uploads['path'] );\n      $uploads['basedir'] = str_replace( WP_CONTENT_DIR . '/uploads', WP_UPLOAD_DIR, $uploads['basedir'] );\n  }\n  return $uploads;\n}\nadd_filter( 'upload_dir',     'custom_upload_dir_impl', 1 );";
exports["default"] = _default;