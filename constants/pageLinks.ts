export default [
    {
        name: 'Weddings',
        to: { name: 'weddings' },
        onlyDesktop: false
    },
    {
        name: 'Galleries',
        to: { name: 'inspiration-images' },
        onlyDesktop: false
    },
    {
        name: 'Wedding Vendors',
        to: { name: 'vendor' },
        onlyDesktop: false
    },
    {
        name: 'News & Advice',
        to: { name: 'news' },
        onlyDesktop: false
    },
    {
        name: 'Wedding Planning',
        to: { name: 'news-category', params: { category: 'planning-design' } },
        onlyDesktop: true
    },
    {
        name: 'Honeymoons',
        to: { name: 'news-category', params: { category: 'travel-honeymoon' } },
        onlyDesktop: true
    },
    {
        name: 'Registry',
        to: { name: 'news-category', params: { category: 'wedding-registry' } },
        onlyDesktop: true
    }
]
