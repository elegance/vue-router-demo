const Home = {template: '<router-view></router-view>'};
const Default = {template: '<div>default</div>'};
const Foo = {template: '<div>foo</div>'};
const Bar = {template: '<div>bar</div>'};
const Baz = {template: '<div>baz</div>'};
const WithParams = {template: '<div>{{$route.params.id}}</div>'};

const router = new VueRouter({
    routes: [
        {
            path: '/',
            component: Home,
            children: [
                {path: '', component: Default},
                {path: 'foo', component: Foo},
                {path: 'bar', component: Bar},
                {path: 'baz', name: 'baz', component: Baz},
                {path: 'with-params/:id', component: WithParams},
                //  relative redirect to a sibling route
                {path: 'relative-redirect', redirect: 'foo'}
            ]
        },
        // absolute redirect
        {path: '/absolute-redirect', redirect: '/bar'},

        // dynamic redirect, note that the target route `to` is avaliable for the redirect function 
        {
            path: '/dynamic-redirect/:id?', redirect: to => {   // 注意id后面的疑问号，表示id可有可无.
                const {hash, params, query} = to;
                if (query.to === 'foo') {
                    return {path: '/foo', query: null};
                }
                if (hash === '#baz') {
                    return {name: 'baz', hash: ''};
                }
                if (params.id) {
                    return '/with-params/:id';
                }
                return '/bar';
            }
        },

        // named redirect
        {path: '/named-redirect', redirect: {name: 'baz'}},

        // redirect with params
        {path: '/redirect-with-params/:id', redirect: '/with-params/:id'},

        // catch all redirect
        {path: '*', redirect: '/'}
    ]
});

new Vue({
    router,
    template: `
        <div>
            <h1>Redirect</h1>
            <ul>
                <li>
                    <router-link to="/relative-redirect">/relative-redirect (redirects to /foo)</router-link>
                </li>
                <li>
                    <router-link to="/relative-redirect?foo=bar">/relative-redirect?foo=bar (redirects to /foo?foo=bar)</router-link>
                </li>
                <li>
                    <router-link to="/absolute-redirect">/absolute-redirect (redirects to /bar)</router-link>
                </li>
                <li>
                    <router-link to="/dynamic-redirect">/dynamic-redirect (redirects to /bar)</router-link>
                </li>
                <li>
                    <router-link to="/dynamic-redirect/123">/dynamic-redirect/123 (redirects to /with-params/123)</router-link>
                </li>
                <li>
                    <router-link to="/dynamic-redirect?to=foo">/dynamic-redirect?to=foo (redirects to /foo)</router-link>
                </li>
                <li>
                    <router-link to="/dynamic-redirect#baz">/dynamic-redirect#baz (redirects to /baz)</router-link>
                </li>
                <li>
                    <router-link to="/named-redirect">/named-redirect (redirects to /baz)</router-link>
                </li>
                <li>
                    <router-link to="/redirect-with-params/123">/redirect-with-params/123 (redirects to /with-params/123</router-link>
                </li>
                <li>
                    <router-link to="/not-found">/not-found (redirects to /)</router-link>
                </li>
            </ul>
            <router-view></router-view>
        </div>
    `,
    el: '#app'
});