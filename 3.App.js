const User = {
    template: `
        <div>
            <h2>User {{ $route.params.id }}</h2>
            <p>
                <router-link :to="{path: $route.params.id + '/profile'}">{{ $route.params.id }} profile</router-link>
                <router-link :to="{path: $route.params.id + '/posts'}">{{ $route.params.id }} posts</router-link>
            </p>
            <router-view></router-view>
        </div>`
};

const UserHome = {template: '<div>Home</div>'};
const UserProfile = {template: '<div>Profile</div>'};
const UserPosts = {template: '<div>Posts</div>'};

const router = new VueRouter({
    routes: [
        {
            path: '/user/:id', 
            component: User,
            children: [
                {
                    path: '',
                    component: UserHome
                },
                {
                    path: 'profile',
                    component: UserProfile
                },
                {
                    path: 'posts',
                    component: UserPosts
                }
            ]
        }
    ]
});

const app = new Vue({
    router
}).$mount('#app');