const Foo = {template: '<div>foo</div>'};
const Bar = {template: '<div>bar</div>'};
const Baz = {template: '<div>baz</div>'};

const router = new VueRouter({
    routes: [
        {
            path: '/',
            components: {
                default: Foo,
                a: Bar,
                b: Baz
            }
        },
        {
            path: '/other',
            components: {
                default: Baz,
                a: Bar,
                b: Foo
            }
        }
    ]
});

const app = new Vue({
    router
}).$mount('#app');