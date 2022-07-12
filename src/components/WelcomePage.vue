<template>
<v-main class="welcomePage">
    <div>
    <v-app-bar
      color="deep-purple accent-4"
      dense
      dark
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Atma Jogja Rental</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-menu
        left
        bottom
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="n in 5"
            :key="n"
            @click="() => {}"
          >
            <v-list-item-title>Option {{ n }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>

  <div>
    <h1>Selamat Datang</h1>
    <p>Atma Jogja Rental (AJR) merupakan sebuah website yang digunakan untuk melakukan transaksi sewa mobil</p>
  </div>
  <v-row class="mt-10">
      <v-col>
  <v-card
    class="mx-auto"
    max-width="600"
  >
    <v-img
      class="white--text align-end"
      height="300px"
      src="mobil.jpg"
    >
      <v-card-title>Customer</v-card-title>
    </v-img>



    <v-card-actions>
      <v-btn
        color="orange"
        text
        @click="loginCus"
      >
        Login
      </v-btn>

      <v-btn
        color="orange"
        text
        @click="RegisterCus"
      >
        Register
      </v-btn>
    </v-card-actions>
  </v-card>
      </v-col>
            <v-col>
           <v-card
    class="mx-auto"
    max-width="600"
  >
    <v-img
      class="white--text align-end"
      height="300px"
      src="pegawai.jpg"
    >
      <v-card-title>Pegawai</v-card-title>
    </v-img>


    <v-card-actions>
      <v-btn
        color="orange"
        text
        @click="loginPeg"
      >
        Login
      </v-btn>

      <v-btn
        color="orange"
        text
      >
        Register
      </v-btn>
    </v-card-actions>
  </v-card>
      </v-col>
  </v-row>
   
   
    <v-footer padless app bottom fixed color="deep-purple accent-4">
    <v-col
      class="text-center white--text"
      cols="12"
    >
      {{ new Date().getFullYear() }} — <strong class="white--text" >Atma Jogja Rental</strong>
    </v-col>
  </v-footer>
</v-main>


  
    
</template>

<script>
  export default {
      methods:{
         loginCus(){
       this.$router.push({
         name:"Login",
        });
         },
        loginPeg(){
       this.$router.push({
         name:"LoginPegawai",
        });
         },
       RegisterCus(){
       this.$router.push({
         name:"RegisterCustomer",
        });
         },
         
     }
     
  }
</script>

<style>
.welcomePage{
    background-color:whitesmoke;
}

h1{
  font-size: 50px;
  text-align: center;
}

p{
  font-size: 20px;
  text-align: center;
}

</style>

