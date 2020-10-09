<template>
  <v-container fluid>
    <v-data-table :headers="headers" :items="filteredItems" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>My Profit</v-toolbar-title>
        </v-toolbar>
      </template>
      <template v-slot:[`item.profit`]="{ item }">
        <v-chip dark>
          {{
            (
              (item.price *
                item.orderQuantity *
                Math.abs(
                  Number(item.time.split(":")[0]) * 60 +
                    Number(item.time.slice(3)) -
                    (Number(item.timearrived.split(":")[0]) * 60 +
                      Number(item.timearrived.slice(3)))
                )) /
              60
            ).toFixed(2) + " €"
          }}
        </v-chip>
      </template>
      <template v-slot:[`item.timespent`]="{ item }">
        <v-chip dark>
          {{
            Math.abs(
              Number(item.time.split(":")[0]) * 60 +
                Number(item.time.slice(3)) -
                (Number(item.timearrived.split(":")[0]) * 60 +
                  Number(item.timearrived.slice(3)))
            )
          }}
        </v-chip>
      </template>
    </v-data-table>
    <v-chip dark>
      {{ "TOTAL REVENUE: " + Number(totalProfit).toFixed(2) + " €" }}
    </v-chip>
  </v-container>
</template>
<script>
export default {
  name: "Orders",
  props: ["items"],
  data() {
    return {
      headers: [
        { text: "Car model", sortable: false, value: "carModel" },
        { text: "Category", sortable: false, value: "category" },
        { text: "Quantity", sortable: false, value: "orderQuantity" },
        { text: "Price per hour in €", sortable: false, value: "price" },
        { text: "Time spent in min", sortable: false, value: "timespent" },
        { text: "Pickup Address", sortable: false, value: "pickupAddress" },
        {
          text: "Destination Address",
          sortable: false,
          value: "destinationAddress",
        },
        { text: "Pickup date", sortable: false, value: "date" },
        { text: "Pickup time", sortable: false, value: "time" },
        { text: "Arrived time", sortable: false, value: "timearrived" },
        { text: "Time ordered", sortable: false, value: "timestamp" },
        { text: "Status", sortable: false, value: "status" },
        { text: "Profit", sortable: false, value: "profit" },
      ],
    };
  },
  computed: {
    filteredItems() {
      return this.items
        .map((item) => item)
        .filter((e) => e.status === "Completed");
    },
    totalProfit() {
      return this.filteredItems
        .map((order) => {
          const time = Math.abs(
            Number(order.time.split(":")[0]) * 60 +
              Number(order.time.slice(3)) -
              (Number(order.timearrived.split(":")[0]) * 60 +
                Number(order.timearrived.slice(3)))
          );
          return (order.price * order.orderQuantity * time) / 60;
        })
        .reduce((a, v) => [+a + +v], 0);
    },
  },
};
</script>
