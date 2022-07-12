<template>
    <v-main class="Riwayatpage">
          <h3 class="text h-3 text-center" font-weight-medium mb-5>Riwayat Transaksi</h3>
        <v-card>
 <v-card-title>
            <v-card>
                
            </v-card>
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
        :items="transaksi"
        :search="search">
        <template v-slot:[`item.verifikasi_pembayaran`]="{item}">
            <span v-if="item.verifikasi_pembayaran == 'false'">
                Belum Terverifikasi
            </span>
            <span v-else>Terverifikasi</span>

        </template>
        <template v-slot:[`item.pengembalian`]="{item}">
        <v-btn small color="primary" class="mr-2" @click="editHandler2(item)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </template>

          <template v-slot:[`item.actions`]="{item}">
        <v-btn small color="primary" class="mr-2" @click="editHandler(item)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn color="red accent-4" small  @click="deleteHandler(item.custom_id)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
          <v-btn color="blue darken-1" text @click="NotaHandler(item)">Nota</v-btn>
      
      </template>

        </v-data-table>
        </v-card>

        <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >

      <v-card>
        <v-card-title>
          <span class="text-h5" >Edit Transaksi</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
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
                label="Tanggal Lahir">
                <v-text-field
                type="Date"
                hint="Tanggal Selesai"
                v-model="form.tgl_selesai"
                persistent-hint
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
            @click="update"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

     <v-dialog
      v-model="dialogPengembalian"
      persistent
      max-width="600px"
    >

      <v-card>
        <v-card-title>
          <span class="text-h5" >Pengembalian Mobil</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
              >
               <v-text-field
                type="Date"
                hint="Tanggal Pengembalian"
                v-model="form.tgl_pengembalian"
                persistent-hint
                required
                ></v-text-field>
              </v-col>
                           <!-- <v-col 
                cols="12"
                label="Tanggal Lahir">
                <v-text-field
                type="text"
                hint="Denda"
                v-model="form.denda"
                persistent-hint
                required
                ></v-text-field>
             </v-col> -->

             <v-col cols="12">
                 <v-rating
                 
      v-model="rating"
      background-color="green lighten-3"
      color="green"
      large
    ></v-rating>

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
            @click="update"
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
 <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{error_message}}</v-snackbar>
       <v-dialog
           v-model="dialogNota"
           scrollable fullscreen 
           persistent :overlay="false"
           max-width="500px"
           transition="dialog-transition"
       > <v-card id="cardView">
        <v-card-title class="text-center">
          <span class="text-h5 " >Nota Atma Jogja Rental</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
                 <v-col
                cols="12"
              >
               <v-text-field
                type="text"
                hint="ID TRANSAKSI"
                v-model="editId"
                persistent-hint
                required
                ></v-text-field>
              </v-col>
                <v-col
                cols="6"
              >
               <v-text-field
                type="text"
                hint="Customer"
                v-model="form.id_customer"
                persistent-hint
                required
                ></v-text-field>
              </v-col>
              <v-col
                cols="6"
              >
               <v-text-field
                type="text"
                hint="CS"
                v-model="form.id_pegawai"
                persistent-hint
                required
                ></v-text-field>
              </v-col>
              <v-col
                cols="6"
              >
               <v-text-field
                type="text"
                hint="Driver"
                v-model="form.id_driver"
                persistent-hint
                required
                ></v-text-field>
              </v-col>
              <v-col
                cols="6"
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
                cols="6"
                label="Tanggal Lahir">
                <v-text-field
                type="Date"
                hint="Tanggal Selesai"
                v-model="form.tgl_selesai"
                persistent-hint
                required
                ></v-text-field>
             </v-col>
                            <v-col
                cols="6"
              >
               <v-text-field
                type="Date"
                hint="Tanggal Pengembalian"
                v-model="form.tgl_pengembalian"
                persistent-hint
                required
                ></v-text-field>
              </v-col>
<hr>

              <v-col 
                cols="6"
                label="Tanggal Lahir">
                <v-text-field
                type="text"
                hint="Biaya"
                v-model="form.biaya"
                persistent-hint
                required
                ></v-text-field>
             </v-col>
             <v-col 
                cols="6"
                label="Tanggal Lahir">
                <v-text-field
                type="text"
                hint="Denda"
                v-model="form.denda"
                persistent-hint
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
            @click="dialogNota = false"
          >
            Close
          </v-btn>
          <v-btn
          color="primary"
            @click="download"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
           
       </v-dialog>

       
    </v-main>
</template>

<script>
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas';
export default {
    data(){
        return{
          rating:0,
            transaksi:[],
            aset:[],
            dialogUpdate: false,
            dialogNota: false,
            dialogPengembalian: false,
            search: null,
            inputType: 'Tambah',
            load: false,
            dialog:null,
            dialogConfirm:false,
            select: null,
            snackbar:false,
            color:'',
            daysdiff:'',
            error_message: '',
            deleteId: '',
            editId: '',
form:{
                tgl_mulai:null,
                tgl_selesai:null,
                tgl_pengembalian:'',
                biaya:null,
                rating:null,
                metode_pembayaran:null,
                denda:null,
                bukti_pembayaran:null,
                verifikasi_pembayaran:null,
                id_customer:null,
                id_aset:null,
                id_pegawai:null,
                
            },
            
            headers:[
                {text:"ID Transaksi", align:"start", sortable:true,value:"custom_id"},
                {text:"Tanggal Mulai", value:"tgl_mulai"},
                {text:"Tanggal Selesai", value:"tgl_selesai"},
                {text:"Tanggal Pengembalian", value:"tgl_pengembalian"},
                {text:"Biaya", value:"biaya"},
                {text:"Denda", value:"denda"},
                {text:"Verifikasi Pembayaran", value:"verifikasi_pembayaran"},
                {text:"Rating", value:"rating"},
                {text:"Pengembalian", value:"pengembalian"},
                {text: "Actions", value: 'actions'},
            ],

        }
    },
    methods:{
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
         readData(){
            var url = this.$api +'/transaksi/customer/'+localStorage.getItem('custom_id');
            this.$http.get(url,{
                headers:{
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response=>{
                this.transaksi = response.data.data;
            })
        },

        update(){
             let newData = {
                tgl_mulai: this.form.tgl_mulai,
                tgl_selesai : this.form.tgl_selesai,
                tgl_pengembalian: this.form.tgl_pengembalian,
                biaya : this.form.biaya,
                denda : this.form.denda,
                rating : this.rating,
                metode_pembayaran : this.form.metode_pembayaran,
                bukti_pembayaran : this.form.bukti_pembayaran,
                verifikasi_pembayaran : this.form.verifikasi_pembayaran,
                id_aset : this.form.id_aset,
                id_customer : this.form.id_customer,
                id_pegawai : this.form.id_pegawai,
            };
              var url = this.$api + '/edit/transaksi/' + this.editId;
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
            this.editId = item.custom_id;
            this.form.tgl_mulai = item.tgl_mulai;
            this.form.tgl_selesai = item.tgl_selesai;
            this.form.biaya = item.biaya;
            this.form.denda = item.denda;
            this.rating  = item.rating;
            this.form.metode_pembayaran = item.metode_pembayaran;
            this.form.bukti_pembayaran = item.bukti_pembayaran;
            this.form.verifikasi_pembayaran = item.verifikasi_pembayaran;
            this.form.id_aset = item.id_aset;
            this.form.id_customer = item.id_customer;
            this.form.id_pegawai = item.id_pegawai;
            this.dialog = true
        },

        editHandler2(item){
            this.editId = item.custom_id;
            this.form.tgl_mulai = item.tgl_mulai;
            this.form.tgl_selesai = item.tgl_selesai;
            this.form.tgl_pengembalian = item.tgl_pengembalian;
            this.form.biaya = item.biaya;
            this.form.denda = item.denda;
            this.form.rating  = item.rating;
            this.form.metode_pembayaran = item.metode_pembayaran;
            this.form.bukti_pembayaran = item.bukti_pembayaran;
            this.form.verifikasi_pembayaran = item.verifikasi_pembayaran;
            this.form.id_aset = item.id_aset;
            this.form.id_customer = item.id_customer;
            this.form.id_pegawai = item.id_pegawai;
            if(this.getDays(item.tgl_selesai,this.form.tgl_pengembalian,)>0){
            this.form.denda = 10000 * this.daysdiff ;
            }else{
            this.form.denda =0;
            }
            this.dialogPengembalian = true
        },
        NotaHandler(item){
            this.editId = item.custom_id;
            this.form.tgl_mulai = item.tgl_mulai;
            this.form.tgl_selesai = item.tgl_selesai;
            this.form.tgl_pengembalian = item.tgl_pengembalian;
            this.form.biaya = item.biaya;
            this.form.denda = item.denda;
            this.form.rating  = item.rating;
            this.form.metode_pembayaran = item.metode_pembayaran;
            this.form.bukti_pembayaran = item.bukti_pembayaran;
            this.form.verifikasi_pembayaran = item.verifikasi_pembayaran;
            this.form.id_aset = item.id_aset;
            this.form.id_customer = item.id_customer;
            this.form.id_pegawai = item.id_pegawai;

            this.dialogNota = true
        },
        close(){
            this.dialog = false;
            this.dialogConfirm = false;
            this.dialogPengembalian = false;
            this.inputType = 'Tambah';
            this.dialogVerif = false;
            this.dialogUpdate = false;
            this.readData();

        },
        deleteData(){
             var url = this.$api + '/transaksi/customer/'+ this.deleteId;
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
         deleteHandler(custom_id){
          this.deleteId = custom_id;
          this.dialogConfirm = true;
        },



        cancel(){
            this.readData();
            this.dialog = false;
            this.dialogConfirm= false;
            this.dialogPengembalian= false;

        },
         download(){
            window.html2canvas = html2canvas;
            var doc = new jsPDF('p','mm',"a4")
            //var download = document.querySelector('#card')
       // var w = doc.internal.pageSize.getWidth();
           // var h = doc.internal.pageSize.getHeight();
//var scaleBy = 5;
            html2canvas(document.getElementById('cardView'),{
                allowTaint: true,
                useCORS: true,
                scale:2,
            }).then(canvas => {
    //document.body.appendChild(canvas)
    doc.addImage(canvas.toDataURL('image/png'), 'PNG', 0,0,250,100)
    doc.save("nota.pdf")
})
            //doc.text("Hello World ",15,15);

            //doc.save("card.pdf")
              
        },

        getDays(date1,date2){
            var d1 = new Date(date1);
            var d2 = new Date(date2);
            this.daysdiff = (d2.getTime()-d1.getTime())/(86400 * 1000);
            return (d2.getTime()-d1.getTime())/(86400 * 1000);

        },

    },
    
    mounted(){
        this.readData();
        this.readDataAset();
    }
};
</script>