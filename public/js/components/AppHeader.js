export default {
    props: ['title'],
    template: `
    <header class="header">
        <div class="logo">
            <div class="logo-icon"></div>
            <h2>{{ title }}</h2>
        </div>
    </header>
    `,
    
    data: function() {
        return {
        }
    },
    
    methods: {
    }
}
