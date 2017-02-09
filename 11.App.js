import Vue from 'vue';
import VueRouter from 'vue-router';
import Post from './11.Post.vue';

Vue.use(VueRouter);

const Home = {template: '<div>home</div>'};

const router = new VueRouter({
    routes: [
        {path: '/', component: Home},
        {path: '/post/:id', component: Post}
    ]
});

new Vue({
    router,
    template: `
        <div id="app">
            <h1>Data fetching</h1>
            <ul>
                <li>
                    <router-link to="/">/</router-link>
                </li>
                <li>
                    <router-link to="/post/1">/post/1</router-link>
                </li>
                <li>
                    <router-link to="/post/2">/post/2</router-link>
                </li>
                <li>
                    <router-link to="/post/3">/post/3</router-link>
                </li>
            </ul>
            <router-view></router-view>
        </div>
    `
}).$mount('#app');