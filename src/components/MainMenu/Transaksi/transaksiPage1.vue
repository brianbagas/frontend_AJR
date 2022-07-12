<template>
    <v-main>
        <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step
        :complete="e1 > 1"
        step="1"
      >
        Data Customer
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step
        :complete="e1 > 2"
        step="2"
      >
        
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="3">
        Name of step 3
      </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card
          class="mb-12"
          color="white"
          height="650px"
        >
        <v-container>
            <v-row>
              <v-col
                cols="12"
              >
                <v-text-field
                  label="Full Name*"
                  v-model="customer.nama_customer"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
              >
                <v-text-field
                  label="No KTP*"
                  v-model="customer.no_ktp"
                  hint="example of helper text only on focus"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
              >
                <v-text-field
                  label="alamat*"
                  persistent-hint
                  v-model="customer.alamat_customer"
                  required
                ></v-text-field>
              </v-col>
                            <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  label="Gender"
                  persistent-hint
                  v-model="customer.gender_customer"
                  required
                ></v-text-field>
              </v-col>
                <v-col 
                cols="12"
                sm="6"
                label="Tanggal Lahir">
              <!-- <h1 v-if="customer.SIM==null"  >ANDA BELUM MEMILIKI SIM</h1> -->
          
                <v-text-field
               
                type="Date"
                hint="Tanggal Lahir"
                v-model="customer.tgl_lahir_customer"
                persistent-hint
                required
                ></v-text-field>
                    </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Email*"
                  v-model="customer.email"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Nomor Telepon*"
                  type="text"
                  v-model="customer.no_telp_customer"
                  required
                ></v-text-field>
              </v-col>

            </v-row>
          </v-container>

        
        </v-card>

        <v-btn
          color="primary"
          @click="e1 = 2"
        >
          Continue
        </v-btn>

        
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card
          class="mb-12"
          color="white"
          height="800px"
        >
        <v-container>
            <v-row>
             <v-col 
                cols="12"
                sm="6"
                >
                <v-text-field
                type="Date"
                hint="Tanggal Mulai"
                v-model="form.tgl_mulai"
                persistent-hint
                required
                ></v-text-field>
             </v-col>
             <v-col 
                cols="12"
                sm="6"
                label="Tanggal Lahir">
                <v-text-field
          
                type="Date"
                hint="Tanggal Selesai"
                v-model="form.tgl_selesai"
                persistent-hint
                required
                ></v-text-field>
             </v-col>
             <v-col cols="12">
                  <v-checkbox
          v-model="enabled"
          label="Anda Tidak Memiliki SIM"
          hide-details
          class="shrink mr-2 mt-0"
        ></v-checkbox>
        <v-select

        :disabled="!enabled"
          v-model="form.driver"
          :items="driver"
          item-text="nama"
          item-value="custom_id"
          label="Pilih Driver"
          data-vv-name="select"
        ></v-select>
             </v-col>
             <v-col class="8">
                      <v-select
          v-model="form.promo"
          :items="promo"
          item-text="kode_promo"
          item-value="id"
          label="Pilih Promo"
          data-vv-name="select"
        ></v-select>

             </v-col>
             <v-col cols="8">
                  <v-data-table
            :headers="headers"
            :items="aset"
            :search="search"
            :footer-props="{'items-per-page-options':[5, -1]}">
            <template v-slot:[`item.status`]="{item}">
                <span v-if="item.status == 'tersedia'">{{item.nama_mobil}}</span>
                <span v-else>Tidak Tersedia</span>
            </template>
               <template v-slot:[`item.actions`]="{item}">
        <v-btn small color="primary" class="mr-2" @click="editHandler(item)">
          <v-icon>mdi-cart</v-icon>
        </v-btn>
      </template>
            </v-data-table>
            <!-- <v-select
          v-model="mobil"
          :items="aset"
          item-text="nama_mobil"
          item-value="id"
          label="Pilih Mobil"
          data-vv-name="select"
          required
        ></v-select> -->
             </v-col>
             


             
            </v-row>
           
        </v-container>
        </v-card>

        <v-btn
          color="primary"
          @click="e1 = 3, getDays(form.tgl_mulai,form.tgl_selesai)"
        >
          Continue
        </v-btn>

        <v-btn text  @click="e1 = 1">
          Cancel
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card
          class="mb-12"
          color="white"
          height="600px"
        >
         <v-col cols="12">
                <v-text-field
                  label="Biaya"

                  v-model="form.biaya"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Hari"
                  required
                  v-model="daysdiff"
                ></v-text-field>
              </v-col>
        

              <form enctype="multipart/form-data">

              <v-file-input
                accept="image/png, image/jpeg, image/bmp"
                placeholder="Pick an Image"
                prepend-icon="mdi-camera"
                name="fotoU"
                v-model="form.foto"
                label="Image"              
            ></v-file-input>

</form>
        </v-card>

        <v-btn
          color="primary"
          @click="save"
        >
        <router-link to="/menu"></router-link>
        
        
          Continue
        </v-btn>

        <v-btn text @click="e1 = 2">
          Cancel
        </v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
   <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{error_message}}</v-snackbar>
  

    </v-main>
</template>

<script>
export default {
    data() {
        return{
        transaksi:[],
        transaksi2: new FormData,
        customer:[],
        driver:[],
        aset:[],
        promo:[],
        search:null,
        editId:null,
        biaya:null,
                   error_message: '',
                    snackbar:false,
        color:'',
        headers:[
            {text:"Mobil", value:"status"},
            {text:"Actions", value:"actions"} 
        ],
        checkbox: true,
        checkbox1: true,
        checkbox2: false,
        enabled: false,
        drivers:null,
        mobil:null,
        days:null,
        days2:null,
        daysdiff:null,
        daysdiff2:null,
        id_cus:null,
        e1:1,
        form:{
            tgl_mulai:null,
            tgl_selesai:null,
            driver:'',
            promo:'',
            biaya:null,
            foto:null,
        }

        
        }

        
    },
    methods:{
         readDataCustomer(){
            var url = this.$api +'/customer/'+ localStorage.getItem('custom_id');
            this.$http.get(url,{
                headers:{
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response=>{
                this.customer = response.data.data;
                this.nama = response.data.data.nama_customer;
            })
        },
         readDataAset(){
            var url = this.$api +'/lalala';
            this.$http.get(url,{
                headers:{
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response=>{
                this.aset = response.data.data;
            })
        },
         readDataDriver(){
            var url = this.$api +'/transaksi/driver';
            this.$http.get(url,{
                headers:{
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response=>{
                this.driver = response.data.data;
            })
        },
        
        readDataPromo(){
            var url = this.$api +'/customer/promo';
            this.$http.get(url, {
                headers:{
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(response=>{
                this.promo = response.data.data;
            })
        },
            save(){
                this.transaksi2.append('tgl_mulai',this.form.tgl_mulai);
                this.transaksi2.append('tgl_selesai',this.form.tgl_selesai);
                this.transaksi2.append('biaya',this.form.biaya)
                this.transaksi2.append('id_customer',localStorage.getItem('custom_id'))
                this.transaksi2.append('id_driver',this.form.driver)
                this.transaksi2.append('id_aset',this.editId)
                this.transaksi2.append('bukti_pembayaran',this.form.foto)
            var url = this.$api +'/transaksi/customer/store';
            this.load = true;
            this.$http.post(url, this.transaksi2,{
                headers:{
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(response=> {
                    this.error_message =  response.data.message;
                    this.color = "green";
                    this.snackbar = true;
                    this.load = true;
                    this.pushPage();
                    this.close();
                    this.readData();
                    this.resetForm();


                }).catch(error =>{
                    this.error_message = error.response.data.message;
                    this.color = "red";
                    this.snackbar =true;
                    this.load = false;

                });
        },
        
        editHandler(item){
            this.editId = item.id;
            this.form.biaya = item.harga;
            this.id_cus = localStorage.getItem('id_custom');

        },
        getDays(date1,date2){
            var d1 = new Date(date1);
            var d2 = new Date(date2);
            this.daysdiff = (d2.getTime()-d1.getTime())/(86400 * 1000);


        },
        pushPage(){
          this.$router.push({
            name:'RiwayatView',
          });
        },
        ceknull(){
          if(this.customer.SIM==null){
          return 1;
          }
return 0;

        },


        resetForm(){
          this.form={
            tgl_mulai:null,
            tgl_selesai:null,
            driver:'',
            biaya:null,
            foto:null,
          }
        }
    },
     mounted(){
        this.readDataCustomer();
        this.readDataAset();
        this.readDataDriver();
        this.readDataPromo();
    }
}
</script>