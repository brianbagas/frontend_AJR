<template>
    <v-main class="MobilPage">
        <h3 class="text h-3" font-weight-medium mb-5>Brosur Mobil</h3>
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
            <v-btn color="success" dark @click="dialog = true"> Create </v-btn>

        </v-card-title>
 <v-data-table
      :headers="headers"
      :items="brosur"
      :search="search"
    >
         <template v-slot:[`item.actions`]="{item}">
        <v-btn small color="primary" class="mr-2" @click="editHandler(item)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn color="red accent-4" small  @click="deleteHandler(item)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
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
          <span class="text-h5" >Pilih Aset</span>
        </v-card-title>
        <v-card-text>
          <v-container>
           <v-data-table
      :headers="headers"
      :items="aset"
      :search="search"
    >
         <template v-slot:[`item.actions`]="{item}">
        <v-btn small color="primary" class="mr-2" @click="SaveHandler(item)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </template>
    </v-data-table>
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
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="deleteData">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
     <v-dialog v-model="dialogSave" persistent max-width="400px">
      <v-card>
        <v-card-title>
          <span class="headline">WARNING!!!</span>
        </v-card-title>
        <v-card-text>Apakah Anda Yakin Ingin Menambahkan Aset ini Kedalam Brosur  ??</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

      <v-dialog
      v-model="dialogUpdate"
      persistent
      max-width="600px"
    >

      <v-card>
        <v-card-title>
          <span class="text-h5" >Form Mobil</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
               <v-col cols="12">

                <v-text-field
                label="Harga*"
                v-model="form.hargaU"
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
  </v-row>

   <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{error_message}}</v-snackbar>
  
    </v-main>

    
</template>

<script>
export default {
    name: "MobilPage",
    data(){
        return{
            ex4: ['red', 'indigo', 'orange', 'primary', 'secondary', 'success', 'info', 'warning', 'error', 'red darken-3', 'indigo darken-3', 'orange darken-3'],
            search: null,
                      inputType: 'Tambah',
            dialog:null,
            dialogUpdate : false,
            dialogSave : false,
             dialogConfirm:false,                      
            select: null,
            snackbar:null,
            color:'',
            error_message: '',
            load: false,
            headers:[
                {text: "ID Mobil", align: "start", sortable:true,value:"id"},
                {text: "Plat Nomor", value: "plat_nomor"},
                {text: "Nomor STNK", value: "stnk"},
                {text: "kategory", value : "kategory"},
                {text: "Kapasitas", value: "tipe"},
                {text: "Transmisi", value: "transmisi"},
                {text: "Volume", value: "volume"},
                {text: "Harga/Hari", value: 'harga'},
                {text: "Actions", value:"actions"},
                
            
            ],
            aset: [],
            brosur:[],
            idBrosur:'',
            aset2: new FormData,
                        deleteId: '',
            editId: '',


            form: {
                nama:null,
                tipe:null,
                transmisi:null,
                bahanBakar:null,
                volume:null,
                warna:null,
                kapasitas:null,
                fasilitas:null,
                platNomor:null,
                nomorSTNK:null,
                kategory:null,
                harga:null,

                namaU:null,
                tipeU:null,
                transmisiU:null,
                bahanBakarU:null,
                volumeU:null,
                warnaU:null,
                kapasitasU:null,
                fasilitasU:null,
                platNomorU:null,
                nomorSTNKU:null,
                kategoryU:null,
                hargaU:null,


            }

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
            var url = this.$api +'/manager/brosur/'+'2';
            this.$http.get(url,{
                headers:{
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response=>{
                this.brosur = response.data.data;
            })
        },
        readDataAset(){
            var url = this.$api +'/manager/brosur';
            this.$http.get(url,{
                headers:{
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response=>{
                this.aset = response.data.data;
            })
        },

        save(){
             let newData = {
          nama_mobil : this.form.nama,
          tipe: this.form.tipe,
          transmisi : this.form.transmisi,
          bahanBakar : this.form.bahanBakar,
          volume :this.form.volume,
          warna : this.form.warna,
          fasilitas : this.form.fasilitas,
          kapasitas : this.form.kapasitas,
          plat_nomor : this.form.platNomor,
          stnk : this.form.nomorSTNK,
          kategory : this.form.kategory,
          harga : this.form.harga,
          id_brosur : this.idBrosur,
          };

          var url = this.$api + '/brosur/' + this.editId;
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

           close(){
            this.dialog = false;
            this.inputType = 'Tambah';
            this.dialogConfirm = false;
            this.dialogUpdate = false;
            this.dialogSave = false;
                        this.resetForm();
            this.readData();

        },

        cancel(){
            this.readData();
            this.resetForm();
            this.dialog = false;
            this.dialogUpdate = false;
            this.dialogSave = false;

        },
        resetForm(){
          this.form= {
                nama:null,
                tipe:null,
                transmisi:null,
                bahanBakar:null,
                volume:null,
                warna:null,
                kapasitas:null,
                fasilitas:null,
                platNomor:null,
                nomorSTNK:null,
                kategory:null,
                harga:null,

                namaU:null,
                tipeU:null,
                transmisiU:null,
                bahanBakarU:null,
                volumeU:null,
                warnaU:null,
                kapasitasU:null,
                fasilitasU:null,
                platNomorU:null,
                nomorSTNKU:null,
                kategoryU:null,
                hargaU:null,
            };
        },

        update(){
          let newData = {
          nama_mobil : this.form.namaU,
          tipe: this.form.tipeU,
          transmisi : this.form.transmisiU,
          bahanBakar : this.form.bahanBakarU,
          volume :this.form.volumeU,
          warna : this.form.warnaU,
          fasilitas : this.form.fasilitasU,
          kapasitas : this.form.kapasitasU,
          plat_nomor : this.form.platNomorU,
          stnk : this.form.nomorSTNKU,
          kategory : this.form.kategoryU,
          harga : this.form.hargaU,
          id_brosur : this.idBrosur,
          };

          var url = this.$api + '/brosur/' + this.editId;
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
          let newData = {
          nama_mobil : this.form.namaU,
          tipe: this.form.tipeU,
          transmisi : this.form.transmisiU,
          bahanBakar : this.form.bahanBakarU,
          volume :this.form.volumeU,
          warna : this.form.warnaU,
          fasilitas : this.form.fasilitasU,
          kapasitas : this.form.kapasitasU,
          plat_nomor : this.form.platNomorU,
          stnk : this.form.nomorSTNKU,
          kategory : this.form.kategoryU,
          harga : this.form.hargaU,
          id_brosur : 1,
          };

          var url = this.$api + '/brosur/' + this.editId;
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

        editHandler(item){
          this.inputType = 'Ubah';
          this.editId = item.id;
            this.form.namaU =item.nama_mobil  ;
          this.form.tipeU=item.tipe  ;
           this.form.transmisiU=item.transmisi ;
          this.form.bahanBakarU =item.bahanBakar  ;
          this.form.volumeU =item.volume  ;
           this.form.warnaU =item.warna ;
          this.form.fasilitasU = item.fasilitas  ;
          this.form.kapasitasU =item.kapasitas  ;
          this.form.platNomorU = item.plat_nomor  ;
          this.form.nomorSTNKU = item.stnk  ;
           this.form.kategoryU=item.kategory ;
          this.form.hargaU =item.harga  ;
          this.idBrosur =item.id_brosur  ;
          this.dialogUpdate =true;
        },
        deleteHandler(item){
          this.inputType = 'Ubah';
          this.editId = item.id;
            this.form.namaU =item.nama_mobil  ;
          this.form.tipeU=item.tipe  ;
           this.form.transmisiU=item.transmisi ;
          this.form.bahanBakarU =item.bahanBakar  ;
          this.form.volumeU =item.volume  ;
           this.form.warnaU =item.warna ;
          this.form.fasilitasU = item.fasilitas  ;
          this.form.kapasitasU =item.kapasitas  ;
          this.form.platNomorU = item.plat_nomor  ;
          this.form.nomorSTNKU = item.stnk  ;
           this.form.kategoryU=item.kategory ;
          this.form.hargaU =item.harga  ;
          this.dialogConfirm =true;
        },
        SaveHandler(item){
          this.inputType = 'Tambah';
          this.editId = item.id;
            this.form.nama =item.nama_mobil  ;
          this.form.tipe=item.tipe  ;
           this.form.transmisi=item.transmisi ;
          this.form.bahanBakar =item.bahanBakar  ;
          this.form.volume =item.volume  ;
           this.form.warna =item.warna ;
          this.form.fasilitas = item.fasilitas  ;
          this.form.kapasitas =item.kapasitas  ;
          this.form.platNomor = item.plat_nomor  ;
          this.form.nomorSTNK= item.stnk  ;
           this.form.kategory=item.kategory ;
          this.form.harga =item.harga  ;
          this.idBrosur= 2  ;
          this.dialogSave =true;
        },
       

    },
    mounted(){
        this.readData();
        this.readDataAset();
    }
};
</script>