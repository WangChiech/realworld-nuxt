export default {
  components: true,
  head: {
    link: [
      {
        rel: 'stylesheet',
        href: 'https://cdn.jsdelivr.net/npm/ionicons@2.0.1/css/ionicons.min.css'
      },
      {
        rel: 'stylesheet',
        href: '//fonts.googleapis.com/css?family=Titillium+Web:700|Source+Serif+Pro:400,700|Merriweather+Sans:400,700|Source+Sans+Pro:400,300,600,700,300italic,400italic,600italic,700italic'
      },
      {
        rel: 'stylesheet',
        href: '/index.css'
      }
    ]
  },
  plugins: [
    '~/plugins/request.js',
    '~/plugins/day.js',
    '~/plugins/utils.js'
  ],
  router: {
    // mode: 'hash',
    linkActiveClass: 'active'
  },
  server: {
    host: '0.0.0.0',
    port: 3000
  }
}