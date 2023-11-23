<template>
  <footer>
    <div class="wrapper pt-3">
      <div class="container">
        <div class="footer">
          <div class="footer-intro">
            <p class="footer-intro-content text-white">
              <b class="footer-intro-content">Fazzo strore </b>là nơi chuyên
              cung cấp các loại rau củ quả sạch, không chất bảo quản, an toàn
              cho sức khỏe, đáp ứng nhu cầu của tất cả khách hàng. Fazzo store
              hứa hẹn sẽ đem đến cho bạn bữa ăn an toàn và dinh dưỡng.
            </p>
            <p class="footer-intro-content">
              © 2023 Fazzo store. All rights reserved.
            </p>
          </div>
          <div class="footer-nav">
            <div class="footer-nav-content text-white" style="width: 40%">
              <h3 class="footer-nav-title">LIÊN HỆ</h3>
              <p class="footer-nav-link">
                <i class="fas fa-phone me-1"></i>0123 456 789
              </p>
              <p class="footer-nav-link">
                <i class="fas fa-envelope me-1"></i>FazzoStore@gmail.com
              </p>
              <p class="footer-nav-link">
                <i class="fab fa-facebook-square me-1"></i>
                <a href="#">Fazzo store</a>
              </p>
              <p class="footer-nav-link">
                <i class="fas fa-map-marker-alt me-1"></i>P.Xuân Khánh, Q.Ninh
                Kiều, Tp.Cần Thơ
              </p>
            </div>

            <div class="footer-nav-content">
              <h3 class="footer-nav-title">DANH MỤC</h3>
              <p class="footer-nav-link">
                <router-link to="/" class="mr-2"> Trang chủ </router-link>
              </p>
              <p class="footer-nav-link">
                <router-link to="/product" class="mr-2"> Sản phẩm </router-link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import imgs from "@/assets/imgs";
export default {
  data() {
    return {
      isShowModelFooter: false,
      img: imgs,
    };
  },
  methods: {
    showModelFooter() {
      this.isShowModelFooter = !this.isShowModelFooter;
    },
  },
};
</script>

<style lang="scss" scoped>
footer a i {
  margin: 0 6px;
}
footer a {
  color: #fff;
  font-size: 20px;
}
footer {
  padding: 10px 0;
}

////////
.footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  // background-color: #ffffff;
}

.footer-intro {
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.footer-intro-img {
  width: 240px;
}

.footer-intro-content {
  width: 100%;
  font-size: 16px;
  color: #192a56;
  text-align: justify;
}

.footer-nav {
  width: 60%;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  margin-top: 10px;
}

.footer-nav-content {
  width: 30%;
  display: flex;
  flex-direction: column;
}

.footer-nav-title {
  font-weight: bold;
  font-size: 22px;
  color: #192a56;
}

.footer-nav-link {
  font-size: 16px;
  color: #fff;
}
p.footer-nav-link {
  margin-bottom: 10px;
}

p.footer-nav-link a {
  font-size: 16px;
  color: #fff;
  text-decoration: none;
}

p.footer-nav-link a:hover {
  color: var(--green);
}

/* Mobile */
@media only screen and (max-width: 739px) {
  .footer {
    flex-direction: column;
  }

  .footer-intro {
    width: 100%;
    align-items: center;
  }

  .footer-intro-content {
    margin-bottom: 5px;
    text-align: center;
  }

  .footer-nav {
    flex-direction: column-reverse;
    width: 100%;
    align-items: center;
    margin-top: 0px;
  }

  .footer-nav-content {
    width: 100% !important;
    text-align: center;
    margin-top: 20px;
  }
}

@media only screen and (min-width: 739px) and (max-width: 1024px) {
  .footer {
    flex-direction: column-reverse;
  }

  .footer-intro {
    width: 100%;
    text-align: center;
    align-items: center;
  }

  .footer-intro-content {
    margin-bottom: 5px;
    text-align: center;
  }

  .footer-nav {
    width: 100%;
    margin-top: 10px;
  }

  .footer-nav-content {
    width: 20%;
    margin-top: 20px;
  }
}
</style>
