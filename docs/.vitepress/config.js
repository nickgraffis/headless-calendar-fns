export default {
  title: 'Headless Calendar Fns',
  description: 'reates a matrix for a headless calendar.',
  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'Headless Calendar',
    nav: [
      { text: 'Author', link: '/author' },
      { text: 'Changelog', link: 'https://github.com/...' },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/nickgraffis/headless-calendar-fns' },
    ],
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Introduction', link: '/' },
          { text: 'Diving Deeper', link: '/deeper' },
        ]
      },
      {
        text: 'Advanced',
        items: [
          { text: 'Plugins', link: '/plugins' },
          { text: 'Typescript', link: '/typescript' },
        ]
      },
      {
        text: 'Basic Examples',
        items: [
          { text: 'Demo', link: '/example-demo' },
          { text: 'Vue', link: '/example-vue' },
          { text: 'React', link: '/example-react' },
          { text: 'Angular', link: '/example-angular' },
          { text: 'Svelte', link: '/example-svelte' },
          { text: 'Vanilla', link: '/example-vanilla' },
          { text: 'RXJS', link: '/example-rxjs' },
        ]
      },
      {
        text: 'Advanced Examples',
        items: [
          { text: 'Mobile', link: '/example-mobile' },
          { text: 'Week View', link: '/example-week-view' },
          { text: 'Day View', link: '/example-week-view' },
        ]
      }
    ]
  }
}