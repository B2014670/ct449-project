<template>
  <div class="cart mx-md-3 mx-sm-1 my-2">
    <div class="row">
      <div class="col-lg-8 col-12">
        <div class="my-2">
          <h2 class="text-center border-bottom">Giỏ Hàng</h2>
          <div class="text-center">
            <intersecting-circles-spinner
              v-if="isShowLoading"
              class="mx-auto"
              :animation-duration="1200"
              :size="50"
              color="#ff1d5e"
            />
          </div>
        </div>
        <h6
          v-if="isShowUpdateCartSuccess"
          class="text-left mb-2"
          style="color: #37e32a"
        >
           Giỏ hàng đã được cập nhật
        </h6>
        <h6
          v-if="isShowUpdateCartFailure"
          class="text-left mb-2"
          style="color: #eecc37"
        >
           Số lượng không hợp lệ
        </h6>
        <h6
          v-if="isShowDeleteProductOutOfCartSuccess"
          class="text-left mb-2"
          style="color: #37e32a"
        >
           {{ recentDeleteProduct.name }} đã
          xóa khỏi giỏ hàng
        </h6>

        <div v-if="isShowCart" class="m-2">
          <div
            v-for="(product, index) in cart"
            class="row border-bottom align-items-center"
          >
            <div class="col-2">
              <img
                class="m-2"
                width="100"
                height="100"
                :src="product.ProductData.img"
                alt=""
              />
            </div>
            <div class="col">
              <div class="row text-muted">{{ product.ProductData.name }}</div>
              <div class="row">(kho {{ product.ProductData.number }})</div>
            </div>
            <div class="col">
              <span>{{ product.ProductData.price }} ₫</span>
            </div>
            <div class="col">
              <Form>
                <div class="Cart-UpdateOrder-Number">
                  <button
                    @click.prevent="handleMinusOrderProduct(index)"
                    id="minus-sp"
                  >
                    -
                  </button>
                  <Field
                    class="inputOrderNumber"
                    type="number"
                    name="amount"
                    size="2"
                    value="1"
                    style="outline: none"
                    v-model="product.Amount"
                    @input="inputChanged = true"
                  />
                  <button
                    @click.prevent="handlePlusOrderProduct(index)"
                    id="plus-sp"
                  >
                    +
                  </button>
                  <ErrorMessage name="order_number" class="text-danger ms-2" />
                </div>
              </Form>
            </div>
            <div class="col">
              {{
                getTemporaryPriceOfOneProduct(
                  product.ProductData.price,
                  product.Amount
                )
              }}
            </div>
            <div class="col-1">
              <a
                @click="
                  handleDeleteProductOutOfCart(
                    product.UserId,
                    product.ProductId,
                    index
                  )
                "
                class="text-dark text-decoration-none"
                ><i class=""></i>Xóa</a
              >
            </div>
          </div>
          <Form @submit="updateCart" class="form-update-amount">
            <button
              :disabled="!isAmountInputChanged"
              id="submit-btn"
              type="submit"
              :class="{ btn: true, 'btn-primary': true, 'my-1': true }"
            >
              <HalfCircleSpinner
                v-if="isShowLoadingUpdateCart"
                class="mx-auto"
                :animation-duration="1200"
                :size="20"
                color="#4f0b14"
                style="position: absolute"
              />
              Cập nhật
            </button>
          </Form>
        </div>
      </div>

      <div class="col-lg-4 col-12 summary border border-dark">
        <div class="my-2">
          <h5><b>CỘNG GIỎ HÀNG</b></h5>
        </div>
        <hr />
        <div v-if="isShowCart" class="col">
          <table class="table table-hover">
            <tbody>
              <tr>
                <td>Tạm tính</td>
                <td class="text-end">
                  <span>{{ getTemporaryPrice }}</span>
                </td>
              </tr>
              <tr>
                <td>Tổng</td>
                <td class="text-end">
                  <span name="tongtien">{{ getTemporaryPrice }}</span>
                </td>
              </tr>
            </tbody>
          </table>
          <div></div>

          <router-link to="/checkout"
            ><button
              :disabled="isShowLoadingUpdateCart"
              class="btn btn-danger w-100 mt-2"
            >
              Thanh toán
            </button></router-link
          >
        </div>
        <div v-if="isShowEmptyCart">
          <h6 class="text-center mt-3">Thêm hàng vào giỏ ngay!!</h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { IntersectingCirclesSpinner, HalfCircleSpinner } from "epic-spinners";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

import CartService from "@/services/cart.service";
import { cartStore } from "@/stores/main";
import { useAuthStore } from "@/stores/auth.store";
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
    IntersectingCirclesSpinner,
    HalfCircleSpinner,
  },
  data() {
    const OrderNumberValidate = yup.object().shape({
      amount: yup.number(),
    });
    return {
      OrderNumberValidate,
      cart: [],
      recentDeleteProduct: {},
      isShowCart: false,
      isShowUpdateCartSuccess: false,
      isShowUpdateCartFailure: false,
      isShowDeleteProductOutOfCartSuccess: false,
      isShowEmptyCart: false,
      isShowLoading: true,
      isShowLoadingUpdateCart: false,
      inputChanged: false,
    };
  },
  methods: {
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
    async getCart() {
      try {
        const user = await this.getUser();

        this.cart = await CartService.getCarts(user._id);
        if (this.cart.length != 0) {
          this.isShowCart = true;
          this.isShowLoading = false;
        } else {
          this.isShowEmptyCart = true;
          this.isShowCart = false;
        }
      } catch (error) {
        this.$router.push({ name: "login" });
      }
    },
    handleMinusOrderProduct(index) {
      if (this.cart[index].Amount >= 2) {
        this.cart[index].Amount--;
        this.enableBtnUpdateCarts;
      }
    },
    handlePlusOrderProduct(index) {
      if (
        this.cart[index].Amount < parseInt(this.cart[index].ProductData.number)
      ) {
        this.cart[index].Amount++;
        this.enableBtnUpdateCarts;
      }
    },

    async updateCart() {
      let flag = true;
      this.cart.map((item, index) => {
        if (
          parseInt(item.ProductData.number) < parseInt(item.Amount) ||
          parseInt(item.Amount) <= 0
        ) {
          flag = false;
          this.isShowUpdateCartFailure = true;
          this.isShowUpdateCartSuccess = false;
          this.isShowDeleteProductOutOfCartSuccess = false;
        }
      });
      if (flag == true) {
        this.isShowLoadingUpdateCart = true;
        const user = await this.getUser();
        const result = await CartService.updateCart(user._id, this.cart);
        console.log(result);
        if (result == true) {
          console.log(result);
          this.isShowUpdateCartSuccess = true;
          this.isShowDeleteProductOutOfCartSuccess = false;
          this.isShowLoadingUpdateCart = false;
          this.isShowUpdateCartFailure = false;
        }
      }
    },
    formatNumberWithDot(number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " ₫"; //1000 to 1.000
    },
    getTemporaryPriceOfOneProduct(price, amount) {
      const priceInt = price.replace(/\./g, ""); //1.000.000 to 1000000

      const priceFinal = this.formatNumberWithDot(priceInt * amount);
      return priceFinal;
    },
    async handleDeleteProductOutOfCart(UserId, ProductId, index) {
      this.recentDeleteProduct = this.cart[index].ProductData;
      const result = await CartService.delete(UserId, ProductId);
      if (result) {
        this.isShowDeleteProductOutOfCartSuccess = true;
        this.isShowUpdateCartSuccess = false;
        this.isShowUpdateCartFailure = false;
        this.isShowUpdateCartFailure = false;
        this.getCart();
        let CartStore = cartStore();
        CartStore.minusAmount();
      }
    },
  },
  computed: {
    getTemporaryPrice() {
      if (this.cart.length != 0) {
        const temporary_price = this.cart.reduce(
          (total, item) =>
            total + item.Amount * item.ProductData.price.replace(/\./g, ""),
          0
        );
        // if (temporary_price) {
        return this.formatNumberWithDot(temporary_price);
        // }
      }
    },
    enableBtnUpdateCarts() {
      this.inputChanged = true;
    },
    isAmountInputChanged() {
      return this.inputChanged;
    },

    // enableBtnCheckOut(){
    //     return
    // },
  },

  created() {
    this.getCart();
    document.title = "Cart";
  },
};
</script>

<style lang="scss" scoped>
// .giohang-hienthi {
//     position: relative;
// }
.form-update-amount {
  text-align: center;
  button {
    position: relative;

    div {
      position: absolute;
      left: 0;
      right: 0;
      top: 8px;
    }
  }
}
.cart-product-table {
  width: 100%;
  border: 2px dashed #a48c8ca8;
  border-collapse: collapse;
  margin-bottom: 6px;
  th,
  td {
    border: 2px dashed #a48c8ca8;
    padding: 10px;
  }
  th {
    text-transform: uppercase;
  }

  span {
    padding: 0 4px;
    white-space: nowrap;
  }
  .delete-purchase-icon {
    border-radius: 50%;
    border: 1px solid #000;
    padding: 4px;
    background-color: #fff;
    &:hover {
      background-color: pink;
    }
  }
}
.cart {
  margin: auto;
  box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 1rem;
  border: transparent;
}
@media (max-width: 767px) {
  .cart {
    margin: 3vh auto;
  }
}
.cart {
  background-color: #fff;
  border-bottom-left-radius: 1rem;
  border-top-left-radius: 1rem;
}
@media (max-width: 767px) {
  .cart {
    padding: 4vh;
    border-bottom-left-radius: unset;
    border-top-right-radius: 1rem;
  }
}
.summary {
  background-color: #ddd;
  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;
  color: rgb(65, 65, 65);
}
@media (max-width: 767px) {
  .summary {
    border-top-right-radius: unset;
    border-bottom-left-radius: 1rem;
  }
}
</style>
