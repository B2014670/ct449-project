<template>
  <section class="container">
    <div class="row">
      <div class="col-md-8 p-0 m-0">
        <carousel
          :items-to-show="1"
          :autoplay="3000"
          :wrapAround="true"
          :transition="1500"
        >
          <!-- <slide v-for="slide in 3" :key="slide"> -->
          <slide key="slide1"
            ><img class="w-100" :src="img.home1" alt=""
          /></slide>
          <slide key="slide2"
            ><img class="w-100" :src="img.home2" alt=""
          /></slide>
          <slide key="slide3"
            ><img class="w-100" :src="img.home3" alt=""
          /></slide>
          <!-- </slide> -->
          <template #addons>
            <navigation />
            <pagination />
          </template>
        </carousel>
      </div>
      <div class="col-md-4 p-0">
        <div class="row mb-3 mr-2">
          <img
            :style="{ height: responseImg }"
            :src="img.advertise1"
            class="card-img-top"
            alt="#"
          />
        </div>
        <div class="row mb-3 mr-2">
          <img
            :style="{ height: responseImg }"
            :src="img.advertise2"
            class="card-img-top"
            alt="#"
          />
        </div>
        <div class="row mbs mr-2">
          <img
            :style="{ height: responseImg }"
            :src="img.advertise3"
            class="card-img-top"
            alt="#"
          />
        </div>
      </div>
    </div>
  </section>
  <hr />

  <section>
    <div>
      <h3 class="text-center">Nông sản tươi</h3>
      <ProductList :products="sortNewProduct" />
    </div>
    <hr />
  </section>
</template>

<script>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";

import ProductList from "@/views/product/ProductList.vue";
import shopService from "@/services/shop.service";
import img from "@/assets/imgs";
export default {
  components: {
    ProductList,
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  data() {
    return {
      products: [],
      img,
    };
  },
  methods: {
    async getProductHomePage() {
      try {
        this.products = await shopService.getAllProduct();
      } catch (error) {}
    },
    resetCarousel() {
      // Reset the carousel back to the first slide when it reaches the end
      this.$refs.carousel.goTo(0);
    },
  },
  computed: {
    sortNewProduct() {
      return this.products.sort((a, b) => {
        const dateA = new Date(a.createDate);
        const dateB = new Date(b.createDate);

        if (dateA < dateB) return 1;
        if (dateA > dateB) return -1;
        return 0;
      });
    },
  },
  mounted() {
    this.getProductHomePage();
    document.title = "Home";
  },
};
</script>

<style lang="scss" scoped></style>
