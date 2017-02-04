const User = {
    template: '<div>User {{$route.params.id}}</div>'
};

const router = new VueRouter({
    routes: [
        // 动态路径参数 以冒号开头
        { path: '/user/:id', component: User}
    ]
});

const app = new Vue({ router }).$mount('#app');