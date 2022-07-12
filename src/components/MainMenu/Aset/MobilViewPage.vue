<template>
    <v-main class="MobilPage">
        <h3 class="text h-3" font-weight-medium mb-5>Mobil</h3>
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
      :items="aset"
      :search="search"
    >
         <template v-slot:[`item.actions`]="{item}">
        <v-btn small color="primary" class="mr-2" @click="editHandler(item)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn color="red accent-4" small  @click="deleteHandler(item.id)">
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
          <span class="text-h5" >Form Mobil</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
              >
                <v-text-field
                  label="Nama Mobil*"
                  v-model="form.nama"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
              >
                <v-text-field
                  label="Tipe Mobil*"
                  v-model="form.tipe"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
              >
                <v-text-field
                  label="Jenis Transmisi*"
                  v-model="form.transmisi"
                  hint="example of persistent helper text"
                  persistent-hint
                  required
                ></v-text-field>
              </v-col>
             <v-col
                cols="12"
              >
                <v-text-field
                  label="Jenis Bahan Bakar*"
                  v-model="form.bahanBakar"
                  persistent-hint
                  required
                ></v-text-field>
              </v-col>

                <v-col cols="12">
                <v-text-field
                  label="Warna*"
                  v-model="form.warna"
                  required
                ></v-text-field>
              </v-col>

              <v-col
                cols=""
                sm="4"
                md="4"
            >
                <v-text-field
                label="Fasilitas*"
                v-model="form.fasilitas"
                persistent-hint
                hint="AC, Multimedia, Savety-Bag"
                required
            ></v-text-field>
          </v-col>
        
              <v-col cols="12">
                <v-text-field
                  label="Plat Nomor*"
                  v-model="form.platNomor"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Nomor STNK*"
                  v-model="form.nomorSTNK"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">

                <v-text-field
                label="Kategori Aset*"
                v-model="form.kategory"
                required
                ></v-text-field>
              </v-col>
                <v-col cols="12">

                <v-text-field
                label="Kapasitas*"
                v-model="form.kapasitas"
                required
                ></v-text-field>
              </v-col>
               <v-col cols="12">

                <v-text-field
                label="Harga*"
                v-model="form.harga"
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
              <v-col
                cols="12"
              >
                <v-text-field
                  label="Nama Mobil*"
                  v-model="form.namaU"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
              >
                <v-text-field
                  label="Tipe Mobil*"
                  v-model="form.tipeU"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
              >
                <v-text-field
                  label="Jenis Transmisi*"
                  v-model="form.transmisiU"
                  hint="example of persistent helper text"
                  persistent-hint
                  required
                ></v-text-field>
              </v-col>
             <v-col
                cols="12"
              >
                <v-text-field
                  label="Jenis Bahan Bakar*"
                  v-model="form.bahanBakarU"
                  persistent-hint
                  required
                ></v-text-field>
              </v-col>

                <v-col cols="12">
                <v-text-field
                  label="Warna*"
                  v-model="form.warnaU"
                  required
                ></v-text-field>
              </v-col>

              <v-col
                cols=""
                sm="4"
                md="4"
            >
                <v-text-field
                label="Fasilitas*"
                v-model="form.fasilitasU"
                persistent-hint
                hint="AC, Multimedia, Savety-Bag"
                required
            ></v-text-field>
          </v-col>
        
              <v-col cols="12">
                <v-text-field
                  label="Plat Nomor*"
                  v-model="form.platNomorU"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Nomor STNK*"
                  v-model="form.nomorSTNKU"
                  required
                ></v-text-field>
              </v-col>
               <v-col cols="12">

                <v-text-field
                label="Kategori Aset*"
                v-model="form.kategoryU"
                required
                ></v-text-field>
              </v-col> 
                <v-col cols="12">

                <v-text-field
                label="Kapasitas*"
                v-model="form.kapasitasU"
                required
                ></v-text-field>
              </v-col>
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
            @click="close"
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
                {text: "Fasilitas", value: "fasilitas"},
                {text: "Harga/Hari", value: 'harga'},
                {text: "Pemilik", value: 'id_pemilik'},
                {text: "Actions", value:"actions"},
                
            
            ],
            aset: [],
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
                id_brosur:null,


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
            var url = this.$api +'/aset';
            this.$http.get(url,{
                headers:{
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response=>{
                this.aset = response.data.data;
            })
        },

        save(){
            this.aset2.append('nama_mobil', this.form.nama);
            this.aset2.append('tipe', this.form.tipe);
            this.aset2.append('transmisi',this.form.transmisi);
            this.aset2.append('bahanBakar', this.form.bahanBakar);
            this.aset2.append('volume', this.form.volume);
            this.aset2.append('warna', this.form.warna);
            this.aset2.append('kapasitas', this.form.kapasitas);
            this.aset2.append('fasilitas', this.form.fasilitas);
            this.aset2.append('plat_nomor', this.form.platNomor);
            this.aset2.append('stnk', this.form.nomorSTNK);
            this.aset2.append('kategory', this.form.kategory);
            this.aset2.append('harga', this.form.harga);

            var url = this.$api +'/aset';
            this.load = true;
            this.$http.post(url, this.aset2,{
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

           close(){
            this.dialog = false;
            this.inputType = 'Tambah';
            this.dialogConfirm = false;
            this.dialogUpdate = false;
            this.readData();

        },

        cancel(){
            this.readData();
            this.dialog = false;
            this.dialogUpdate = false;

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
          id_brosur: this.form.id_brosur,
          };

          var url = this.$api + '/aset/' + this.editId;
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
          var url = this.$api + '/aset/'+ this.deleteId;
          this.load = true;
          this.$http.delete(url, {
             headers: {
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
          this.form.id_brosur = item.id_brosur;
          this.dialogUpdate =true;
        },
        deleteHandler(id){
          this.deleteId = id;
          this.dialogConfirm = true;
        }

    },
    mounted(){
        this.readData();
    }
};
</script>