import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

function importComponent(path){
    return ()=>import(`./components/${path}.vue`);
}

const router = new VueRouter({
    mode: "history",
    routes: [
        {
            path: "/menu",
            name: "admin",
            component: importComponent("DashboardLayout"),
            children: [
                {
                path: "/menu",
                name: "Root",
                meta: {title: 'DashBoard'},
                component:importComponent("DashboardPage"),
    
                },
                {
                    path:"/CustomerPage",
                    name:"customer",
                    meta: {title: 'Customer'},
                    component: importComponent("MainMenu/CustomerPage")
                },
                {
                    path:"/CustomerViewPage",
                    name:"CustomerView",
                    meta: {title: 'CustomerView'},
                    component: importComponent("MainMenu/Customers/CustomerViewPage")
                },
                {
                    path:"/PegawaiViewPage",
                    name:"PegawaiView",
                    meta: {title: 'PegawaiView'},
                    component: importComponent("MainMenu/Pegawai/PegawaiViewPage")
                },
                {
                    path:"/DriverViewPage",
                    name:"driverView",
                    meta: {title: 'DriverView'},
                    component: importComponent("MainMenu/Driver/DriverViewPage")
                },
                {
                    path:"/PromoViewPage",
                    name:"promoView",
                    meta: {title: 'PromoView'},
                    component: importComponent("MainMenu/Promo/PromoViewPage")
                },
                {
                    path:"/MobilViewPage",
                    name:"MobilView",
                    meta: {title: 'MobilView'},
                    component: importComponent("MainMenu/Aset/MobilViewPage")
                },

              
                {
                    path:"/detailJadwal",
                    name:"detailJadwal",
                    meta: {title: 'detailJadwal'},
                    component: importComponent("MainMenu/Jadwal/JadwalPage")
                },
                {
                    path:"/pemilik",
                    name:"Mitra",
                    meta: {title: 'mitra'},
                    component: importComponent("MainMenu/Pemilik/PemilikViewPage")
                },
                {
                    path:"/brosur",
                    name:"Brosur",
                    meta: {title: 'Brosur'},
                    component: importComponent("MainMenu/Brosur/BrosurManagerPage")
                },
                {
                    path:"/transaksiCS",
                    name:"TransaksiCS",
                    meta: {title: 'TransaksiCS'},
                    component: importComponent("MainMenu/Transaksi/TransaksiCSPage")
                },

            ],

            
           
            
        },
        {
            path:"/",
            name:"Welcome",
            meta: {title: 'Welcome'},
            component: importComponent("WelcomePage")
        },
        {
            path:"/LoginPegawai",
            name:"LoginPegawai",
            meta: {title: 'LoginPeg'},
            component: importComponent("LoginPegawai")
        },
        {
            path:"/Login",
            name:"Login",
            meta: {title: 'Login'},
            component: importComponent("LoginPage")
        },
        {
            path:"/Register/Customer",
            name:"RegisterCustomer",
            meta: {title: 'Register Customer'},
            component: importComponent("MainMenu/Customers/RegisterPage")
        },
        {
            path:"/Customer/Profile",
            name:"MenuCustomer",
            meta: {title: 'MenuCustomer'},
            component: importComponent("MainMenu/Customers/DashboardLayoutCus"),
            children:[
                {
                    path:"/Customer/Profile",
                    name:"ProfileCustomer",
                    meta: {title: 'Profile Customer'},
                    component: importComponent("MainMenu/Customers/ProfileCustomerPage"),
                },
                {
                    path:"/customer/PromoViewPage",
                    name:"promoViewCus",
                    meta: {title: 'PromoViewCus'},
                    component: importComponent("MainMenu/Customers/PromoViewCusPage")
                },
                {
                    path:"/customer/card",
                    name:"CardView",
                    meta: {title: 'Card View'},
                    component: importComponent("MainMenu/Customers/cardPage")
                },
                {
                    path:"/customer/transaksi",
                    name:"TransaksiView",
                    meta: {title: 'Transaksi View'},
                    component: importComponent("MainMenu/Transaksi/transaksiPage1")
                },
                {
                    path:"/customer/brosur",
                    name:"BrosurView",
                    meta: {title: 'Brosur View'},
                    component: importComponent("MainMenu/Brosur/BrosurViewPage")
                },
                {
                    path:"/customer/riwayat",
                    name:"RiwayatView",
                    meta: {title: 'Riwayat View'},
                    component: importComponent("MainMenu/Transaksi/RiwayatViewPage")
                },
                

            ]
        },
       
    ],

    
});

router.beforeEach((to,from,next)=>{
    document.title = to.meta.title;
    next();
});

export default router;