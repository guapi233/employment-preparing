<template>
  <div>
    列表页: {{ name }}
    <!-- {{ a }} -->
    <!-- {{ num }} -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      a: "abbb",
      // num: a,
    };
  },
  async beforeCreate() {
    let a = await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(3);
      }, 3000);
    });
    console.log(this.a, "??");
  },
  created() {
    console.log(this.a, "!!");
  },
  async asyncData(context) {
    return {
      name: "崔永杰",
      // num: a,
    };
  },
};
</script>

<style>
</style>