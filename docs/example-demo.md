# A UI Example

A really basic demo, _this uses Vue, because the docs are powered by Vitepress_.

<Calendar />

## The Script

Super easy to create a matrix and then make it avliable to your component.

```vue
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
      date.value.setMonth(11);
      date.value.setFullYear(date.value.getFullYear() - 1);
    } else {
      date.value.setMonth(date.value.getMonth() - 1);
    }
  };

  const next = () => {
    if (date.value.getMonth() + 1 > 11) {
      date.value.setMonth(0);
      date.value.setFullYear(date.value.getFullYear() + 1);
    } else {
      date.value.setMonth(date.value.getMonth() + 1);
    }

    console.log(date.value, date.value.getMonth(), date.value.getFullYear());
  };
</script>

```

### The Template

```vue
<template>
  <div class="calendar">
    <div @click="prev" class="arrow">
      <! -- left arrow -->
    </div>
    <div class="__calendar">
      <div class="week" v-for="(week, i) in matrix?.current.weeks">
        <div :class="`day ${day.isToday ? 'active' : ''}`" v-for="(day, j) in week.days" :key="`${i}-${j}`">
          <div class="date">{{ parseInt(day.date.split('-')[2]) }}</div>
        </div>
      </div>
    </div>
    <div class="arrow">
      <! -- right arrow -->
    </div>
  </div>
</template>
```