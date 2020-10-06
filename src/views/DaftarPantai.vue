<template>
    <body id="page-top">
            <!-- Masthead-->
        <header class="masthead">
            <div class="container">
                <div class="masthead-heading text-uppercase">Daftar Wisata</div>
                <div class="text-center">
                    <a href="/">Home</a> / Pantai
                </div>
            </div>
        </header>
     
        <section class="page-section" id="daftarpantai">
            <div class="container">
                    <h2 class="section-heading text-uppercase text-center daftar">Daftar pantai</h2>
                    
            <div class="search">
                <input class="kotak-search" type="text" name="search" placeholder="Search..">
            </div>
                    
            </div>
        </section>

        <!-- Gallery Grid-->
        <section class="page-section bg-light gallery-daftar" id="portfolio">
            <div class="container daftar">
                <div class="row">
                    <div class="col-sm-6" v-for="g in wisata" :key="g.id">
                        <div class="portfolio-item">
                            <a class="portfolio-link" v-on:click="GoToDesc(g.id)">
                                <div class="portfolio-hover">
                                    <div class="portfolio-hover-content">
                                      <i>cek sekarang > </i>
                                    </div>
                                </div>
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
    GoToDesc: function(id){
      this.$router.push({ name: "Deskripsi", params: { id_wisata: id}});
    },
    getData : function(){
      let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
      let offset = (this.currentPage - 1) * this.perPage;
      this.$bvToast.show("loadingToast");
      this.axios.get("/daftar_Wisata/" + "Pantai", conf)
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
