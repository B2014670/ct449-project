<template>
  <div class="my-2">
    <h3 class="text-center">Từ khoá : {{ keySearch }}</h3>
    <ProductList :products="products" />
  </div>
</template>

<script>
import shopService from "@/services/shop.service";
import ProductList from "./product/ProductList.vue";
export default {
  props: { keySearch: { type: String } },
  components: {
    ProductList,
  },
  data() {
    return { products: [] };
  },
  methods: {
    async getProductSearchResult() {
      this.products = await shopService.findByName(this.keySearch);
    },
  },
  watch: {
    keySearch: "getProductSearchResult",
  },
  mounted() {
    this.getProductSearchResult();
    document.title = "Search";
  },
};
</script>

<style lang="scss" scoped></style>
