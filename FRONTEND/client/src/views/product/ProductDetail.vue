<template>
  <section v-if="isShowProductDetail" class="mx-5">
    <div class="col-md-6">
      <ol class="breadcrumb float-md-right">
        <li class="breadcrumb-item">
          <router-link to="/product" class="mr-2"
            ><h5 class="text-primary">Sản phẩm</h5>
          </router-link>
        </li>
        <li class="breadcrumb-item active">Chi tiết</li>
      </ol>
    </div>
    <section>
      <h5
        v-if="isShowAddToCartSuccess"
        class="text-left my-2"
        style="color: #27ae60"
      >
        Đã được thêm vào giỏ hàng
      </h5>
      <div class="row my-2">
        <div class="col-md-5 col-12">
          <div class="text-center border-0">
            <div class="mt-2" style="text-align: right">
              <img
                class="img-fluid"
                :src="product.img"
                alt="book1"
                style="height: 300px; right: 0px"
              />
            </div>
          </div>
        </div>
        <div class="col-md-7 col-12 pl-0">
          <div class="row">
            <h2 class="text-uppercase">{{ product.name }}</h2>
          </div>
          <div class="row">
            <h4 v-if="isDiscout" class="text-uppercase">
              <del style="opacity: 0.5; margin-right: 6px; font-size: medium"
                >{{ getProductPrice }} </del
              ><b class="text-danger">{{ getProductAfterDisCount() }}</b>
            </h4>
            <h4 v-else>
              {{ getProductPrice }}
            </h4>
          </div>
          <Form
            :validation-schema="AddCartNumberValidate"
            @submit="handleAddToCart"
          >
            <div class="mt-4">
              <div class="d-flex">
                <label class="d-inline" for="">Số lượng:</label>
                <div class="Cart-UpdateOrder-Number">
                  <button @click="minusAddCartNumber">-</button>
                  <Field
                    type="number"
                    name="order_number"
                    v-model="AddCartNumber"
                  />
                  <button @click="plusAddCartNumber">+</button>
                  <ErrorMessage name="order_number" class="text-danger ms-2" />
                </div>
              </div>
              <div class="mt-3">
                <label for="" class="mb-0"
                  >Kho: <span v-html="getProductNumber"></span>
                </label>
              </div>
              <div class="d-flex mt-3">
                <button
                  :disabled="isEnoughProductNumber"
                  class="btn btn-lg btnlogin text-white ml-0"
                  type="submit"
                  name="themvaogio"
                >
                  Thêm vào giỏ
                </button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import images from "@/assets/imgs";
import ProductList from "@/views/product/ProductList.vue";
import shopService from "@/services/shop.service";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { cartStore } from "@/stores/main";
import { useAuthStore } from "@/stores/auth.store";

export default {
  data() {
    return {
      product: {},
      products: [],
      comments: [],
      images: images,
      isShowProductDetail: false,
      isShowCollapse1: false,
      isShowCollapse2: false,
      AddCartNumber: 1,
      AddCartNumberValidate: false,
      isShowAddToCartSuccess: false,
    };
  },
  props: { id: { type: String } },
  components: { ProductList, Form, Field, ErrorMessage },
  methods: {
    async findById(id) {
      try {
        this.product = await shopService.findProductById(id);
        if (this.product) {
          // validate because i want use product.number as max
          this.AddCartNumberValidate = await yup.object().shape({
            order_number: yup
              .number()
              .typeError("Phải là số")
              .min(1, "Tối thiểu là 1")
              .max(this.product.number, "Không đủ hàng"),
          });
          this.findByName();
          this.isShowProductDetail = true;
        }
      } catch (error) {
        console.log(error);
        this.$router.push({
          name: "notfound",
          params: {
            pathMatch: this.$route.path.split("/").slice(1),
          },
          query: this.$route.query,
          hash: this.$route.hash,
        });
      }
    },
    async findByName() {
      try {
        this.products = await shopService.findByNameExceptId(
          this.product.name,
          this.product._id
        );
        console.log(this.products);
      } catch (er) {}
    },
    handleCollapse1() {
      this.isShowCollapse1 = !this.isShowCollapse1;
      if (this.isShowCollapse1) {
        this.isShowCollapse2 = false; // Close the other collapse
      }
    },
    handleCollapse2() {
      this.isShowCollapse2 = !this.isShowCollapse2;
      if (this.isShowCollapse2) {
        this.isShowCollapse1 = false; // Close the other collapse
      }
    },
    plusAddCartNumber(e) {
      e.preventDefault();
      this.AddCartNumber++;
    },
    minusAddCartNumber(e) {
      e.preventDefault();
      if (this.AddCartNumber >= 2) this.AddCartNumber--;
    },
    async getUser() {
      const auth = useAuthStore();
      await auth.loadAuthState();
      if (auth.user) {
        return auth.user.user;
      } else {
        alert("Bạn phải đăng nhập trước");
        this.$router.push({ name: "login" });
      }
    },
    async handleAddToCart() {
      // e.preventDefault();
      const user = await this.getUser();

      const data = {
        UserId: user._id,
        ProductId: this.id,
        ProductAmount: this.product.number,
        Amount: this.AddCartNumber,
      };
      try {
        const result = await shopService.addToCart(this.id, data);
        if (result) {
          this.isShowAddToCartSuccess = true;
          if (result.updatedExisting == false) {
            let CartStore = cartStore();
            CartStore.plusAmount();
          }
        }
      } catch (error) {
        console.log(error);
      }
    },

    formatNumberWithDot(number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " ₫"; //1000 to 1.000
    },
    getProductAfterDisCount() {
      const PriceInt = this.product.price.replace(/\./g, "");
      const AfterDiscount = PriceInt - (PriceInt * this.product.discount) / 100;
      return this.formatNumberWithDot(AfterDiscount);
    },
    async getComments(product_id) {
      try {
        this.comments = await CommentService.getAll(product_id);
      } catch (error) {}
    },
    async handleAddComment(data) {
      const user = await this.getUser();
      data.user_id = user._id;
      data.product_id = this.product._id;
      const result = await CommentService.create(data);
      if (result) {
        // this.getComments(this.product._id);
      }
    },
  },
  computed: {
    getProductPrice() {
      const price = this.product.price + " ₫";
      return price;
    },
    getProductNumber() {
      return this.product.number > 0
        ? this.product.number
        : '<span class="text-danger font-weight-bold"> Sản phẩm hiện đang hết hàng </span>';
    },
    isDiscout() {
      return this.product.discount > 0;
    },
    isEnoughProductNumber() {
      return this.product.number < 1;
    },
  },
  watch: {
    id: "findById",
  },
  created() {
    this.findById(this.id);
    this.getComments(this.id);
  },
};
</script>

<style lang="scss" scoped>
.btnlogin {
  background-color: #192a56;
}
</style>
