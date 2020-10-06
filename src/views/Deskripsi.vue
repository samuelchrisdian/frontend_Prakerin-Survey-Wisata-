<template>
    <body id="page-top">

        <!-- Masthead-->
        <header class="masthead">
                <div class="container">
                    <div class="masthead-subheading text-uppercase">{{ wisata.nama_wisata}}</div>
                </div>
            </header>
             
        <section class="gambar">
            <div class="container">
                <img :src="'http://localhost:8001/Backend_WEB/' + wisata.foto">
                <div class="text-center text-uppercase text">{{ wisata.nama_wisata}}</div>
                <a class="btn btn-primary btn-xl text-uppercase  view portfolio-link"  data-toggle="modal" href="#portfolioModal1">Views Photo</a>
            </div><br />
        </section>
       
        <section class="deskripsi">
                <div class="deskripsi-judul">
                    <h2 class="section-heading text-uppercase teks-judul">Deskripsi</h2>
                </div>
                <div class="vector-deskripsi">
                        <hr style="border:3px solid orange; border-radius: 5%; width: 174px; margin-right: 1020px">
                    </div>
                    <div class="deskripsi-teks">
                            <p class="section-subheading teks-deskripsi" >
                                {{ wisata.deskripsi }}
                            </p>
                        </div>
        </section>

        <section class="transportasi">
                <div class="deskripsi-judul">
                    <h2 class="section-heading text-uppercase teks-judul">Akses menuju {{wisata.nama_wisata}}</h2>
                </div>
                <div class="vector-deskripsi">
                        <hr style="border:3px solid orange; border-radius: 5%; width: 499px; margin-right: 1020px">
                    </div>
                    <div class="deskripsi-teks">
                            <p class="section-subheading teks-deskripsi" >
                              {{wisata.akses}}</p> <br />
                        </div>
        </section>

        <section class="detail">
            <div class="container">
                <div class="kotak" style="border: 6px solid orange">
                    <!-- <img src="assets/img/persegi.png"> -->
                    <div class="text-uppercase judul-detail"><b>Detail</b></div>
                </div>
                <div class="vector-detail">
                        <!-- <img src="assets/img/vector5.png"> -->
                        <hr>
                </div>
                <div class="gambar-kecil">
                    <div class="peta">
                            <i class='far fa-map'></i>
                            <p class="alamat">
                              <!-- Dusun Krajan, Sarongan, Pesanggaran, Kabupaten Banyuwangi, Jawa Timur 68488 -->
                              {{ wisata.informasi.nama_jalan }}
                            </p>
                    </div>
                    <div class="jam" >
                            <i class='far fa-calendar-alt'></i>
                            <p class="jam-teks">{{ wisata.informasi.hari }} <br />
                            {{ wisata.informasi.jam }}</p>
                    </div>
                    <div class="tiket" >
                        <i class='fas fa-ticket-alt'></i>
                        <p class="tiket-masuk">{{ wisata.informasi.harga_tiket }}</p>
                    </div>
                    <div class="smile" >
                        <i class='far fa-smile'></i>
                        <h5 class="cocok">Cocok untuk :</h5>
                        <p class="cocok-teks"> {{ wisata.informasi.cocok_untuk }}</p>
                    </div>
                </div>
        </div>
        </section>


        <!-- Portfolio Modals-->
        <!-- Modal 1-->
        <div class="portfolio-modal modal fade" id="portfolioModal1" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="close-modal" data-dismiss="modal"><img src="assets/img/close-icon.svg" alt="Close modal" /></div>
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-8">
                                <div class="modal-body carousel slide" data-ride="carousel">
                                    <!-- Indicators -->
                                    <ul class="carousel-indicators">
                                        <li data-target=".modal-body" data-slide-to="0" class="active"></li>
                                        <li data-target=".modal-body" data-slide-to="1"></li>
                                        <li data-target=".modal-body" data-slide-to="2"></li>
                                    </ul>
                                      <!-- The slideshow -->
                                    <div class="carousel-inner">
                                        <div class="carousel-item active">
                                        <img :src="'http://localhost:8001/Backend_WEB/' + wisata.foto">
                                        </div>
                                    </div>

                                    <!-- Left and right controls -->
                                    <a class="carousel-control-prev" href=".modal-body" data-slide="prev">
                                        <span class="carousel-control-prev-icon"></span>
                                    </a>
                                    <a class="carousel-control-next" href=".modal-body" data-slide="next">
                                        <span class="carousel-control-next-icon"></span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</template>

<script>
module.exports = {
  data : function(){
    return {
      search: "",
      id: "",
      foto: "",
      informasi: "",
      message: "",
      currentPage: 1,
      rows: 0,
      perPage: 10,
      key: "",
      conf: "",
      wisata: {}
    }
  },

  methods: {
    getWisata : function(){
      let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
      let offset = (this.currentPage - 1) * this.perPage;
      this.$bvToast.show("loadingToast");
      let id = this.$route.params.id_wisata;
      this.axios.get("/wisata/" + id, conf)
      .then(response => {
        if(response.data.status == 1){
          this.$bvToast.hide("loadingToast");
          this.wisata = response.data.wisata;
          
        } else {
          this.$bvToast.hide("loadingToast");
          this.message = "Gagal menampilkan data siswa."
          this.$bvToast.show("message");
          this.$router.push({name: "login"})
        }
        
      })
      .catch(error => {
        console.log(error);
      });
    },

    pagination : function(){
      if(this.search == ""){
        this.getData();
      } else {
        this.searching();
      }
    },

    Add : function(){
      this.action       = "insert";
      this.nama_wisata  = "";
      this.nama_daerah  = "";
      this.jenis        = ""; 
      this.foto         = ""; 
      this.deskripsi    = "";
      document.getElementById("foto").value = null;
    },

    Edit : function(item){
      this.action     = "update";
      this.id         = item.id;
      this.nama_wisata  = item.nama_wisata;
      this.nama_daerah  = item.nama_daerah;
      this.jenis        = item.jenis;
      this.foto         = item.foto;
      this.deskripsi    = item.deskripsi;
      document.getElementById("foto").value = null;
    },

    Save : function(){
      let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
      this.$bvToast.show("loadingToast");
      if(this.action === "insert"){
        let form = new FormData();
        form.append("id", this.id);
        form.append("nama_wisata", this.nama_wisata);
        form.append("nama_daerah", this.nama_daerah);
        form.append("jenis", this.jenis);
        form.append("foto", document.getElementById("foto").files[0]);
        form.append("deskripsi", this.deskripsi);
        
        this.axios.post("/tambah_Wisata/", form, conf)
        .then(response => {
          this.$bvToast.hide("loadingToast");
          if(this.search == ""){
            this.getData();
          } else {
            this.searching();
          }
          this.message = response.data.message;
          this.$bvToast.show("message");
        })
        .catch(error => {
          console.log(error);
        });
      } else {
        // let form = {
        //   nama_wisata       : this.nama_wisata,
        //   nama_daerah: this.nama_daerah,
        //   jenis     : this.jenis,
        //   // foto     : this.foto,
        //   deskripsi   : this.deskripsi,
        // }
        let form = new FormData();
        form.append("id", this.id);
        form.append("nama_wisata", this.nama_wisata);
        form.append("nama_daerah", this.nama_daerah);
        form.append("jenis", this.jenis);
        form.append("foto", document.getElementById("foto").files[0]);
        form.append("deskripsi", this.deskripsi);
        this.axios.post("/edit_Wisata/" + this.id, form, conf)
        .then(response => {
          this.$bvToast.hide("loadingToast");
          if(this.search == ""){
            this.getData();
          } else {
            this.searching();
          }
          this.message = response.data.message;
          this.$bvToast.show("message");
        })
        .catch(error => {
          console.log(error);
        });
      }
    },

    Drop : function(id){
      let conf = { headers: { "Authorization" : "Bearer " + this.key} };
      if(confirm('Apakah anda yakin ingin menghapus data ini?')){
        this.$bvToast.show("loadingToast");
        this.axios.delete("/hapus_Wisata/" + id, conf)
        .then(response => {
            this.getData();
            this.$bvToast.hide("loadingToast");
            this.message = response.data.message;
            this.$bvToast.show("message");
        })
        .catch(error => {
          console.log(error);
        });
      }
    },
  },

  mounted(){
    this.key = localStorage.getItem("Authorization");
    this.getWisata();
        }
    }


</script>


