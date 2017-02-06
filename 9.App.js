const Home = {template: '<div>home</div>'};
const Foo = {template: '<div>foo</div>'};
const Bar = {template: '<div>bar</div>'};

const Baz = {
    data() {
        console.log('init false...')
        return {saved: false};
    },

    template: `
        <div>
            <p>baz {{saved ? 'saved' : 'not saved'}}</p>
            <button @click="saved = true">save</button>
        </div>
    `,
    beforeRouteLeave(route, redirect, next) {
        if (this.saved || window.confirm('Not saved, are you sure you want to navigation away?')) {
            next();
        }
    }
};

const Qux = {
    data() {
        return {
            msg: null
        };
    },

    template: `<div>{{msg}}</div>`,

    beforeRouteEnter(route, redirect, next) {
        // Note that enter hooks do not have access to `this`
        setTimeout(() => {
            next(vm => {
                vm.msg = 'Qux';
            });
        }, 300);
    }
};

const router = new VueRouter({
    routes: [
        {path: '/', component: Home},

        // inline guard
        {path: '/foo', component: Foo, beforeEnter: guardRoute},

        {path: '/bar', component: Bar, meta: {needGuard: true}},

        {path: '/baz', component: Baz},

        {path: '/qux', component: Qux},

        {
            path: '/qux-async',
            component: resolve => {
                setTimeout(() => {
                    resolve(Qux);
                }, 0);
            }
        }
    ]
});

function guardRoute(route, redirect, next) {
    if (window.confirm(`Navigation to ${route.path}?`)) {
        next();
    } else if(window.confirm(`Redirect to /baz`)) {
        next('/baz');
    }
}

router.beforeEach((route, redirect, next) => {
    if (route.matched.some(m => m.meta.needGuard)) {
        guardRoute(route, redirect, next);
    } else {
        next();
    }
});

new Vue({
    router,
    template: `
        <div>
            <h1>Navigation Guards</h1>
            <ul>
                <li>
                    <router-link to="/">/</router-link>
                </li>
                <li>
                    <router-link to="/foo">/foo</router-link>
                </li>
                <li>
                    <router-link to="/bar">/bar</router-link>
                </li>
                <li>
                    <router-link to="/baz">/baz</router-link>
                </li>
                <li>
                    <router-link to="/qux">/qux</router-link>
                </li>
                <li>
                    <router-link to="/qux-async">/qux-async</router-link>
                </li>
            </ul>
            <router-view></router-view>
        </div>
    `,
    el: '#app'
});