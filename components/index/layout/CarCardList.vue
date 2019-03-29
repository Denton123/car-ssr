<template>
  <div>
    <div class="car_card_list"
      v-for="(item, index) in data"
      :key="item.length + index ">
      <ul>
        <li v-for="(child, index) in item"
          :key="index">
          <car-card width="380px"
            height="334px"
            :cardType="moduleType"
            :cardData="child"></car-card>
        </li>
      </ul>
    </div>

  </div>
</template>
<script>
import CarCard from '@/components/CarCard'
export default {
  name: 'CarCardList',
  props: {
    count: {
      type: String,
      default: '1'
    },
    list: {
      type: Array
    },
    type: {
      type: String
    }
  },
  components: {
    'car-card': CarCard
  },
  computed: {
    num: function() {
      let all = []
      let temp = []
      for (let i = 1; i <= this.count; i++) {
        temp.push(i)
        if (i % 3 === 0) {
          all.push(temp)
          temp = []
        }
      }
      if (temp.length !== 0) all.push(temp)
      return all
    },
    data: function() {
      let all = []
      let temp = []
      let list = this.list == null ? [] : this.list
      for (let i = 1; i <= this.list.length; i++) {
        temp.push(this.list[i - 1])
        if (i % 3 === 0) {
          all.push(temp)
          temp = []
        }
      }
      if (temp.length !== 0) all.push(temp)
      return all
    },
    moduleType: function() {
      return this.type
    }
  }
}
</script>
<style>
.car_card_list {
  display: flex;
  justify-content: center;
}

.car_card_list ul {
  width: 1200px;
  font-size: 0px;
  height: 420px;
}

.car_card_list ul li {
  display: inline-block;
  padding: 15px;
}

.car_card_list ul li:first-child {
  padding-left: 0px;
}

.car_card_list ul li:last-child {
  padding-right: 0px;
}
</style>
