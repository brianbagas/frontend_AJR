<template>
    <v-main>
        <div>
            <v-card id="cardView">
                <v-card-title>KARTU CUSTOMER</v-card-title>
                <div id="cardView" width="500px" >
            <h3>ID CUSTOMER</h3>
            <p>{{customer.custom_id}}</p>
            <span></span>
            <h3>Nama Customer</h3>
            <p>{{customer.nama_customer}}</p>
        </div>
            </v-card>

        <button @click="download">download</button>
        </div>


    </v-main>
</template>

<script>
//import jspdf from 'jspdf'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas';
export default {
    name: "cardPage",
    data(){
        return{
            customer: [],
        }
        

    },
    methods:{

          readData(){
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
          pushPage(){
          this.$router.push({
            name:'Root',
          });
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
    doc.save("card.pdf")
})
            //doc.text("Hello World ",15,15);

            //doc.save("card.pdf")
              
        }
        

    },
      mounted(){
        this.readData();
    }
    
}
</script>
<style>
#cardView{
    margin-left: 10px;
}
</style>