<script setup>
import { ref, watch, toRefs, onBeforeMount } from 'vue';

const offset = ref('0px')
const props = defineProps({
  date: Date
});

const { date } = toRefs(props);

const calculateOffset = (date) => {
  let offset = '0px';
  const signs = {
    'capricorn': {
      offset: '0px',
      'start': new Date(date.getFullYear() - 1, 11, 22),
      'end': new Date(date.getFullYear(), 0, 19)
    },
    'aquarius': {
      offset: '-24px',
      'start': new Date(date.getFullYear(), 0, 20),
      'end': new Date(date.getFullYear(), 1, 18)
    },
    'pisces': {
      offset: '-48px',
      'start': new Date(date.getFullYear(), 1, 19),
      'end': new Date(date.getFullYear(), 2, 20)
    },
    'aries': {
      offset: '-72px',
      'start': new Date(date.getFullYear(), 2, 21),
      'end': new Date(date.getFullYear(), 3, 20)
    },
    'taurus': {
      offset: '-96px',
      'start': new Date(date.getFullYear(), 3, 21),
      'end': new Date(date.getFullYear(), 4, 20)
    },
    'gemini': {
      offset: '-120px',
      'start': new Date(date.getFullYear(), 4, 21),
      'end': new Date(date.getFullYear(), 5, 20)
    },
    'cancer': {
      offset: '-144px',
      'start': new Date(date.getFullYear(), 5, 21),
      'end': new Date(date.getFullYear(), 6, 22)
    },
    'leo': {
      offset: '-168px',
      'start': new Date(date.getFullYear(), 6, 23),
      'end': new Date(date.getFullYear(), 7, 22)
    },
    'virgo': {
      offset: '-192px',
      'start': new Date(date.getFullYear(), 7, 23),
      'end': new Date(date.getFullYear(), 8, 22)
    },
    'libra': {
      offset: '-216px',
      'start': new Date(date.getFullYear(), 8, 23),
      'end': new Date(date.getFullYear(), 9, 22)
    },
    'scorpio': {
      offset: '-240px',
      'start': new Date(date.getFullYear(), 9, 23),
      'end': new Date(date.getFullYear(), 10, 22)
    },
    'sagittarius': {
      offset: '-264px',
      'start': new Date(date.getFullYear(), 10, 23),
      'end': new Date(date.getFullYear(), 11, 21)
    }
  }
  Object.keys(signs).forEach(sign => {
    if (date >= signs[sign].start && date <= signs[sign].end) {
      offset = signs[sign].offset
      console.log(offset)
    }
  })

  return offset
}

watch(date, () => {
  offset.value = calculateOffset(date.value)
})

onBeforeMount(() => {
  offset.value = calculateOffset(date.value)
})

</script>

<template>
  <div class="__zodiac-sprite"></div> 
</template>

<style scoped>
  .__zodiac-sprite {
    width: 24px;
    height: 24px;
    background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/165585/zodiac-signs-sprite%402x.png');
    background-size: auto 24px;
    background-position: v-bind(offset) 0;
    opacity: 1;
    transform: scale(1);
    transition: transform .2s, opacity .2s;
  }
</style>