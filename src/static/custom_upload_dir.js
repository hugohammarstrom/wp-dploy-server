export default `<?php
function custom_upload_dir_impl( $uploads ) {
  if ( defined( 'WP_UPLOAD_DIR' ) ) {
      $uploads['path'] = str_replace( WP_CONTENT_DIR . '/uploads', WP_UPLOAD_DIR, $uploads['path'] );
      $uploads['basedir'] = str_replace( WP_CONTENT_DIR . '/uploads', WP_UPLOAD_DIR, $uploads['basedir'] );
  }
  return $uploads;
}
add_filter( 'upload_dir',     'custom_upload_dir_impl', 1 );`