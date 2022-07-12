<template>
    <v-main class="promoPageCus">
        <h3 class="text h-3" font-weight-medium mb-5>Promo</h3>
    <v-card>
        <v-card-title>
            <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="search"
            single-line
            hide-details
            >
            </v-text-field>

            <v-spacer></v-spacer>
           

        </v-card-title>
 <v-data-table
      :headers="headers"
      :items="promo"
      :search="search"
    >
      
      </v-data-table>
    </v-card>

    <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >

      <v-card>
        <v-card-title>
          <span class="text-h5" >PROMO</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
              >
                <v-text-field
                  label="Kode Promo*"
                  v-model="form.kode_promo"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
              >
                <v-text-field
                  label="Jenis Promo*"
                  v-model="form.jenis_promo"
                  hint="example of helper text only on focus"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
              >
                <v-text-field
                  label="Keterangan*"
                  v-model="form.keterangan"
                  hint="example of persistent helper text"
                  persistent-hint
                  required
                ></v-text-field>
              </v-col>
                        
              <v-col cols="12">
                <v-text-field
                v-model="form.diskon"
                  label="Diskon*"
                  required
                ></v-text-field>
              </v-col>

            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
          color="primary"
            @click="setForm"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogConfirm" persistent max-width="400px">
      <v-card>
        <v-card-title>
          <span class="headline">WARNING!!!</span>
        </v-card-title>
        <v-card-text>Anda Yakin Ingin Menghapus Data ??</v-card-text>
        <v-card-action>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="deleteData">Delete</v-btn>
        </v-card-action>
      </v-card>
    </v-dialog>
  </v-row>

   <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{error_message}}</v-snackbar>

    </v-main>

    
</template>

<script>
export default {
    name: "promoPageCus",
    data(){
        return{
          inputType: 'Tambah',
          load: false,
            dialog:null,
            dialogConfirm:false,
            search: null,
            snackbar:false,
            color:'',
            error_message: '',
            headers:[
                {text: "ID Promo", align: "start", sortable:true,value:"id"},
                {text: "Kode Promo", value: "kode_promo"},
                {text: "Jenis Promo", value: "jenis_promo"},
                {text: "Keterangan", value: "keterangan"},
                {text: "Diskon", value : "diskon"},

            ],
            promo: [],
            promo2: new FormData,

            form: {
              kode_promo:null,
              jenis_promo:null,
              keterangan:null,
              diskon:null,
            },

            deleteId: '',
            editId: '',

        };
    },

    methods: {

        setForm(){
          if(this.inputType !=='Tambah'){
            this.update();
          }else{
            this.save();
          }
        },
       readData(){
            var url = this.$api +'/customer/promo';
            this.$http.get(url,{
                headers:{
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response=>{
                this.promo = response.data.data;
            })
        },

         save(){
            this.promo2.append('kode_promo', this.form.kode_promo);
            this.promo2.append('jenis_promo', this.form.jenis_promo);
            this.promo2.append('keterangan',this.form.keterangan);
            this.promo2.append('diskon', this.form.diskon);

            var url = this.$api +'/promo';
            this.load = true;
            this.$http.post(url, this.promo2,{
                headers:{
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(response=> {
                    this.error_message =  response.data.message;
                    this.color = "green";
                    this.snackbar = true;
                    this.load = true;
                    this.close();
                    this.readData();
                    this.resetForm();

                }).catch(error =>{
                    this.error_message = error.response.data.message;
                    this.color = "red";
                    this.snackbar = true;
                    this.load = false;

                });
        },

        close(){
            this.dialog = false;
            this.inputType = 'Tambah';
            this.dialogConfirm = false;
            this.readData();

        },

        cancel(){
            this.readData();
            this.dialog = false;

        },
        resetForm(){
          this.form= {
              kode_promo:null,
              jenis_promo:null,
              keterangan:null,
              diskon:null,
            };
        },

        update(){
          let newData = {
            kode_promo : this.form.kode_promo,
            jenis_promo: this.form.jenis_promo,
            keterangan : this.form.keterangan,
            diskon: this.form.diskon,
          };

          var url = this.$api + '/promo/' + this.editId;
          this.load = true;
          this.$http.put(url, newData, {
            headers: {
              'Authorization' : 'Bearer ' + localStorage.getItem('token')
            }
          }).then(response=>{
            this.error_message =  response.data.message;
            this.color = "green";
            this.snackbar = true;
            this.load = true;
            this.close();
            this.readData();
            this.resetForm();
            this.inputType = 'Tambah';
            
          }).catch(error =>{
            this.error_message = error.response.data.message;
            this.color = "red";
            this.snackbar =true;
            this.load = false;

                });
        },

        deleteData(){
          var url = this.$api + '/promo/'+ this.deleteId;
          this.load = true;
          this.$http.delete(url, {
            headers:{
              'Authorization' : 'Bearer ' + localStorage.getItem('token')
            }
           
          }).then(response=> {
                    this.error_message =  response.data.message;
                    this.color = "green";
                    this.snackbar = true;
                    this.load = true;
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
          this.inputType = 'Ubah';
          this.editId = item.id;
          this.form.kode_promo = this.kode_promo,
          this.form.jenis_promo= this.jenis_promo,
          this.form.keterangan = this.keterangan,
          this.form.diskon= this.diskon,
          this.dialog = true;
        },
        deleteHandler(id){
          this.deleteId = id;
          this.dialogConfirm = true;
        },
    },
    mounted(){
        this.readData();
    }
};
</script>