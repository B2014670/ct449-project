<template>
  <div class="container-fluid">
    <div class="row flex-nowrap">
      <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
        <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
          <p class="fs-5 d-none d-sm-inline">Menu</p>
          <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
            <li class="nav-item">
              <router-link class="nav-link" href="index.php" id="navbarDropdownMenuLink" role="button"
                aria-haspopup="true" aria-expanded="false" to="/product">
                <i class="fa-solid fa-carrot"></i><span class="ms-1 d-none d-sm-inline">Sản phẩm</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" href="index.php" id="navbarDropdownMenuLink" role="button"
                aria-haspopup="true" aria-expanded="false" to="/order">
                <i class="nav-icon fas fa-clipboard-list"></i> <span class="ms-1 d-none d-sm-inline">Đơn hàng</span>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="col py-3">
        <div class="mt-3 mx-2 mb-4">
          <h4 class="text-center my-3">Sản phẩm</h4>
          <span class="text-center d-flex justify-content-end m-0 p-0">
            <router-link to="/product/add"><button class="btn btn-secondary">Thêm</button></router-link>
          </span>
          <Table v-if="products.length != 0" :Data="getDataTable()" :fields="fields" :fieldsMap="fieldsMap"
            categoryname="product" @deleteProduct="deleteProduct" />
        </div>
      </div>
    </div>
  </div>

  <!-- <ProductList :products="products" @deleteProduct="deleteProduct" brandorproduct="product" /> -->
</template>

<script>
import images from "@/assets/imgs";
import ProductList from "@/views/product/ProductList.vue";
import ProductService from "@/services/product.service";
import Table from "@/components/table/table.vue";

export default {
  data() {
    return {
      products: [],
      images: images,
      fields: ["STT", "Hình ảnh", "Tên", "Giá(VND)", "Giảm(%)", "Kho", "Sửa"],
      fieldsMap: ["STT", "img", "name", "price", "discount", "number", "edit"],
    };
  },
  components: {
    ProductList,
    Table,
  },
  methods: {
    async getAllProduct() {
      try {
        this.products = await ProductService.getAllProduct();
      } catch (error) {
        console.log(error);
      }
    },
    async deleteProduct(id) {
      try {
        await ProductService.delete(id);
        this.getAllProduct();
      } catch (error) {
        console.log(error);
      }
    },
    getDataTable() {
      let datas = [];
      try {
        this.products.map(async (item, index) => {
          let data = {};
          data.STT = index;
          data.id = item._id;
          data.name = item.name;
          data.img = item.img;
          data.price = item.price;
          data.discount = item.discount;
          data.number = item.number;
          datas.push(data);
        });
        return datas;
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    document.title = "Product";
    this.getAllProduct();
  },
};
</script>

<style lang="scss" scoped></style>
