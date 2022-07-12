<template >
<v-main class="brosurView">
    <h3 class="text h-3 text-center" font-weight-medium mb-5>Brosur</h3>
    
    <v-container class="my-5">
         <v-layout row wrap>
        <v-flex xs12 sm6 lg3 v-for="mobil in aset " :key="mobil.id">
            <v-card flat class="text-center ma-3 shadow" elevation="12">
                <v-card-text>
                    <p><b>Nama Mobil</b></p>
                    <p>{{mobil.nama_mobil}}</p>
                    <p><b>Kapasitas</b></p>
                    <p>{{mobil.kapasitas}}</p>
                    <p><b>Tipe</b></p>
                    <p>{{mobil.tipe}}</p>
                    <p><b>Harga</b></p>
                    <p>{{mobil.harga}}</p>
                    <p><b>Warna</b></p>
                    <p>{{mobil.warna}}</p>
                    <p><b>Bahan Bakar</b></p>
                    <p>{{mobil.bahanBakar}}</p>
                </v-card-text>
            </v-card>
        </v-flex>

    </v-layout>
    </v-container>
    
</v-main>
    

</template>

<script>
export default {
    name: "brosurView",
    data(){
        return{
            aset:[],
            teams:
            [
                {title : "aa"}
            ]
        }
       

    },
    methods: {
        readData(){
            var url = this.$api +'/brosur/customer/'+'2';
            this.$http.get(url,{
                headers:{
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response=>{
                this.aset = response.data.data;
            })
        },
    },
         mounted(){
        this.readData();
    }
    
}
</script>

<style>
.shadow{
    box-shadow: 3px;

}
.brosurView{
    background-color: #D3D3D3;
}
</style>