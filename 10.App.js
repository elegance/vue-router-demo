const Home = {
    template: `
        <div>
            <h2>Home</h2>
            <p>hello</p>
        </div>
    `
};

const Parent = {
    data() {
        return {
            transitionName: 'slide-left'
        };
    },

    watch: {
        '$route'(to, from) {
            const toDepth = to.path.split('/').length;
            const fromDepth = from.path.split('/').length;
            this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
        }
    },

    template: `
        <div>
            <h2>Parent</h2>
            <transition :name="transitionName">
                <router-view></router-view>
            </transition>
        </div>
    `
};

const Default = {template: '<div>default</div>'};
const Foo = {template: '<div>foo</div>'};
const Bar = {template: '<div>bar</div>'};

const router = new VueRouter({
    routes: [
        {path: '/', component: Home},
        {
            path: '/parent', component: Parent,
            children: [
                {path: '', component: Default},
                {path: 'foo', component: Foo},
                {path: 'bar', component: Bar}
            ]
        }
    ]
});

new Vue({
    router,
    template: `
        <div>
            <h1>Transitions</h1>
            <ul>
                <li>
                    <router-link to="/">/</router-link>
                </li>
                <li>
                    <router-link to="/parent">/parent</router-link>
                </li>
                <li>
                    <router-link to="/parent/foo">/parent/foo</router-link>
                </li
                <li>
                    <router-link to="/parent/bar">/parent/bar</router-link>
                </li>
            </ul>
            <transition name="fade" mode="out-in">
                <router-view></router-view>
            </transition>
        </div>
    `,
    el: '#app'
});