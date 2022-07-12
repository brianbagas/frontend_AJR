<template>

    <div class="MenuCustomer">
    <v-card class="mx-auto overflow-hidden" >
    <v-app-bar
          absolute
          color="cyan"
          dark
          app
        

    >
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>Atma Jogja Rental </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>

        <v-navigation-drawer v-model="drawer" class="fullheight" width="256" absolute temporary app clipped>
        <v-list-item>
            <v-list-item-content>
                <v-list-item-title  class="title white--text">Atma Jogja Rental</v-list-item-title>
                <v-list-item-subtitle class="white--text">Sewa Mobil</v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>
        <v-list dense nav>
            <v-list-item 
            v-for="item in items"
            :key="item.title"
            link
            tag="router-link"
            :to="item.to"
            >
            <v-list-item-content>
                <v-list-item-title class="white--text">{{item.title}}</v-list-item-title>
            </v-list-item-content>
            </v-list-item>
        </v-list>
        </v-navigation-drawer>
        <div class="grey lighten-4 fullheight pa-5">
            <router-view></router-view>

        </div>
        
    </v-card>
    
    </div>

</template>

<script>
export default {
    name: "MenuCustomer",
    data(){
        return {
            items: [
                {title:"Profile Customer",to:"/Customer/Profile"},
                {title:"Promo ", to:"/customer/PromoViewPage"},
                {title:"Card ", to:"/customer/card"},
                {title:"Transaksi ", to:"/customer/transaksi"},
                {title:"Riwayat ", to:"/customer/riwayat"},
                {title:"Brosur ", to:"/customer/brosur"},
            ],
      drawer: false,
      socials: [
        {
          icon: 'mdi-facebook',
          color: 'indigo',
        },
        {
          icon: 'mdi-linkedin',
          color: 'cyan darken-1',
        },
        {
          icon: 'mdi-instagram',
          color: 'red lighten-3',
        },
      ],
        };
    },
        methods: {
      getImage () {
        const min = 550
        const max = 560

        return Math.floor(Math.random() * (max - min + 1)) + min
      },
    },
};
</script>

<style scoped>
.fullheight {
    min-height: 100vh !important;
    background-color:#3E3D3C
}

#id{
    color: white;
}

</style>