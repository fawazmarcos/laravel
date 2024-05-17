<script setup>
import Stat from '@components/Stat.vue'
import Operation from '@components/Operation.vue'
</script>

<template>
    <div class="w-full grid grid-cols-4 gap-4">
        <!-- grid -->
        <Stat v-for="stat in stats" :key="stat.label" :label="stat.label" :value="stat.value" :percent="stat.percent" :isPositive="stat.isPositive" />
    </div>
    <div class="flex flex-col gap-4 mt-9">
        <div class="flex justify-between items-center">
            <h2 class="text-2xl font-semibold">Opération</h2>
            <a href="#" class="text-green-700 hover:underline hover:font-bold duration-300">Voir plus</a>
        </div>
        <!-- operations -->
        <div class="flex flex-col gap-3">
            <Operation v-for="operation in operations" :key="operation.label" :label="operation.label" :value="operation.value" :isPositive="operation.isPositive" />
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'

export default {
  // return data
  data() {
    return {
     page: 'dashboard',
     stats : [
        {label: 'Profit', value: '350,300 XOF', percent: '67.81%', isPositive: true},
        {label: 'En rupture de stock', value: '32', percent: '67.81%', isPositive: false},
        {label: 'Stock utilisé', value: '50%', percent: '50%', isPositive: false},
        {label: 'Produits en stock', value: '32', percent: '67.81%', isPositive: true},
     ],
    operations: [
        {label: 'Règlement de la facture 890543', value: '25,000 XOF', isPositive: true},
        {label: 'Règlement de la facture 890543', value: '25,000 XOF', isPositive: false},
        {label: 'Règlement de la facture 890543', value: '25,000 XOF', isPositive: true},
        {label: 'Règlement de la facture 890543', value: '25,000 XOF', isPositive: true},
        {label: 'Règlement de la facture 890543', value: '25,000 XOF', isPositive: false},
    ]
    
    };
  }, 

  // methods
  methods: {
    changePage(page) {
      this.page = page
    }
  }

}
</script>
