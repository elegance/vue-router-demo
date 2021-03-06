const Home = {
    template: `
        <div>
            <h1>Home</h1>
            <router-view></router-view>
        </div>
    `};

const Foo = {template: '<div>foo</div>'};
const Bar = {template: '<div>bar</div>'};
const Baz = {template: '<div>baz</div>'};

const router = new VueRouter({
    routes: [
        {
            path: '/home', component: Home,
            children: [
                // absolute alias
                {path: 'foo', component: Foo, alias: '/foo'},

                // relative alias (alias to /home/bar-alias)
                {path: 'bar', component: Bar, alias: 'bar-alias'},

                // multiple aliases
                {path: 'baz', component: Baz, alias: ['/baz', 'baz-alias']}
            ]
        }
    ]
});

new Vue({
    router,
    template: `
        <div>
            <h1>Route Alias</h1>
            <ul>
                <li>
                    <router-link to="/foo">/foo (renders /home/foo)</router-link>
                </li>
                <li>
                    <router-link to="/home/bar-alias">/home/bar-alias (renders /home/bar)</router-link>
                </li>
                <li>
                    <router-link to="/baz">/baz (renders /home/baz)</router-link>
                </li>
                <li>
                    <router-link to="/home/baz-alias">/home/baz-alias (renders /home/baz)</router-link>
                </li>
            </ul>
            <router-view></router-view>
        </div>
    `,
    el: '#app'
});