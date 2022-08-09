<script setup>
  import createMatrix from '../../dist/headless-calendar-matrix.mjs';
  import { ref, watch, onBeforeMount } from 'vue';
  const setMatrix = (date) => {
    return createMatrix({
        view: 'week',
        year: date.getFullYear(),
        month: date.getMonth(),
      })
  } 
  const date = ref(new Date());
  const matrix = ref(null);

  onBeforeMount(() => {
    watch(date, (currentDate) => {
      matrix.value = setMatrix(currentDate);
    });
    matrix.value = setMatrix(date.value);
  });

  const prev = () => {
    if (date.value.getMonth() - 1 < 0) {
      date.value = new Date(date.value.getFullYear() - 1, 11, date.value.getDate());
    } else {
      date.value = new Date(date.value.getFullYear(), date.value.getMonth() - 1, date.value.getDate());
    }
  };

  const next = () => {
    if (date.value.getMonth() + 1 > 11) {
      date.value = new Date(date.value.getFullYear() + 1, 0, date.value.getDate());
    } else {
      date.value = new Date(date.value.getFullYear(), date.value.getMonth() + 1, date.value.getDate());
    }

    console.log('next', date.value, date.value.getMonth());
  }
</script>

<template>
  <div class="calendar">
    <div @click="prev" class="arrow">
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
      </svg>
    </div>
    <div class="__calendar">
      <div class="week" v-for="(week, i) in matrix?.current.weeks">
        <div :class="`day ${day.isToday ? 'active' : ''}`" v-for="(day, j) in week.days" :key="`${i}-${j}`">
          <div class="date">{{ parseInt(day.date.split('-')[2]) }}</div>
        </div>
      </div>
    </div>
    <div class="arrow">
      <svg @click="next" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
      </svg>
    </div>
  </div>
</template>
  
<style scoped>
  .arrow {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 12px;
    border-radius: 12px;
    cursor: pointer;
    color: #fff;
  }

  .arrow:hover {
    background: #f5f5f5;
    color: #000;
  }

  .calendar {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .__calendar {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .week {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .day {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 5px;
  }

  .day.active {
    background-color: #ccc;
  }

  .date {
    font-size: 1.5em;
    font-weight: bold;
  }
</style>