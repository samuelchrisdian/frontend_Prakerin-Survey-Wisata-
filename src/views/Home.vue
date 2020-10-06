<template>
  <body id="page-top">
        <!-- Navigation-->
        <!-- Masthead-->
        <header class="masthead">
            <div class="container">
                <div class="masthead-subheading">Welcome To</div>
                <div class="masthead-heading text-uppercase">Wisata Survey</div>
                <!-- <a class="btn btn-primary btn-xl text-uppercase js-scroll-trigger" href="#services">Tell Me More</a> -->
            </div>
        </header>
        <!-- Services-->
        <section class="page-section" id="services">
            <div class="container">
                <div class="petik">
                        <img src="assets/img/petikatas.png" alt=""/>
                </div>
                <div class="text-center">
                    <!-- <h2 class="section-heading text-uppercase">Services</h2> -->
                    <h3 class="section-subheading wisata-survey"><center>Wisata Survey Merupakan salah satu web aplikasi 
                        yang bergerak dibidang tour dan event organizer yang berpengalaman dalam memenuhi kebutuhan 
                        perjalanan wisata domestik anda. Serta event organizer yang sanggup bersaing untuk memberikan 
                        pelayanan, harga, dan fasilitas terbaik. Kami berdiri sejak 2020 yang diawali dengan praktik 
                        kerja industri yang akan terus berkembang dengan baik dibawah naungan Kominfo Banyuwangi. 
                        Terdapat deskripsi dan detail lainnya diharapkan dapat  memudahkan anda dalam mencari destinasi.
                    </center></h3>
                </div>
                <div class="container">
                        <div class="petikbawah">
                                <img src="assets/img/petikbawah.png" alt=""/>
                        </div>
                </div>
            </div>
        </section>

        <!-- rekomendas-->
        <section class="page-section" id="contact" style="margin-top: 150px">
            <div class="container">
                <div class="pantaimerah">
                    <img src="assets/img/pantaimerah.jpg">
                </div>
            </div>
        </section>

        <!-- Gallery Grid-->
        <section class="page-section bg-light gallery" id="portfolio">
            <div class="container">
                <div class="text-center">
                    <h2 class="section-heading text-uppercase gallery" style="top: -20px">Gallery</h2>
                    <h3 class="section-subheading text-muted">Berikut kumpulan wisata di Banyuwangi</h3>
                </div>
                <div class="row">
                    <div class="col-md-4 col-sm-6" v-for="g in wisata" :key="g.id">
                        <div class="portfolio-item">
                            <a class="portfolio-link" data-toggle="modal" href="#portfolioModal1">
                                <div class="portfolio-hover" onclick="window.location='/daftarpantai'">
                                    <div class="portfolio-hover-content"><i>cek sekarang > </i></div>
                                </div>
                                <!-- <img :src = g.foto class="img-fluid" alt="gallery-image" /> -->
                                <img :src="'http://localhost:8001/Backend_WEB/' + g.foto" class="img-fluid" alt="gallery-image"/>
                            </a>
                            <div class="portfolio-caption">
                                <div class="portfolio-caption-heading">{{g.nama_wisata}}</div>
                                <div class="portfolio-caption-subheading text-mutedn">{{g.nama_daerah}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                 
        </section>

        <!-- About-->
        <section class="page-section" id="about">
            <div class="container">
                <div class="text-center">
                    <h2 class="section-heading text-uppercase">Kenapa Wisata Survey?</h2>
                    <h3 class="section-subheading text-mutedn"></h3>
                </div>
                <ul class="timeline">
                    <li class="timeline-inverted">
                        <div class="timeline-image"><img class="rounded-circle img-fluid about" src="assets/img/about/2.png" alt="" /></div>
                        <div class="timeline-panel">
                            <div class="timeline-heading">
                                <h4 class="subheading">Mudah Digunakan</h4>
                            </div>
                            <div class="timeline-body"><p class="text-mutedn">Tampilan yang kami sediakan akan mempermudah anda mencari tempat wisata yang ada di Banyuwangi</p></div>
                        </div>
                    </li>
                    <li>
                        <div class="timeline-image"><img class="rounded-circle img-fluid about" src="assets/img/about/3.png" alt="" /></div>
                        <div class="timeline-panel">
                            <div class="timeline-heading">
                                <h4 class="subheading">Informatif</h4>
                            </div>
                            <div class="timeline-body"><p class="text-mutedn">Banyak informasi yang berkaitan tentang wisata, dari jam kunjungan, harga tiket, lokasi wisata, dan deskripsi tempat wisata.</p></div>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
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
      wisata: []
    }
  },

  methods: {
    getData : function(){
      let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
      let offset = (this.currentPage - 1) * this.perPage;
      this.$bvToast.show("loadingToast");
      this.axios.get("/daftar_Wisata/" + this.perPage + "/" + offset, conf)
      .then(response => {
        if(response.data.status == 1){
          this.$bvToast.hide("loadingToast");
          this.wisata = response.data.wisata;
          this.rows = response.data.count;
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

    searching: function() {
      let conf = { headers: { Authorization: "Bearer " + this.key } };
      let offset = (this.currentPage - 1) * this.perPage;
      this.$bvToast.show("loadingToast");
      let form = new FormData();
      form.append("find", this.search);
      this.axios.post("/cari_Wisata/",form, conf)
        .then(response => {
          if (response.data.status == 1) {
            this.$bvToast.hide("loadingToast");
            this.data_poin = response.data.poin;
            this.rows = response.data.count;
          } else {
            window.location = "/";
          }
        })
        .catch(error => {
          console.log(error);
        });
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
    this.getData();
        }
    }


</script>
