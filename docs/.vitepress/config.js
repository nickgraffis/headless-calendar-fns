export default {
  title: 'Headless Calendar Fns',
  description: 'reates a matrix for a headless calendar.',
  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'Headless Calendar',
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
        text: 'Examples',
        items: [
          { text: 'Demo', link: '/example-demo' },
          { text: 'Vue', link: '/example-vue' },
          { text: 'React', link: '/example-react' },
          { text: 'Angular', link: '/example-angular' },
          { text: 'Svelte', link: '/example-svelte' },
          { text: 'Vanilla', link: '/example-vanilla' },
          { text: 'RXJS', link: '/example-rxjs' },
        ]
      }
    ]
  }
}