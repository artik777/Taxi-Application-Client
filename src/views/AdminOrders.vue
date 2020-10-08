<template>
  <div>
    <OrdersTable :items="items" />
    <ProfitTable :items="items" />
  </div>
</template>

<script>
import OrdersTable from "../components/admin/OrdersTable.vue";
import ProfitTable from "../components/admin/ProfitTable.vue";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters({
      items: "getOrders",
    }),
  },
  components: { OrdersTable, ProfitTable },
};
</script>

<style></style>
