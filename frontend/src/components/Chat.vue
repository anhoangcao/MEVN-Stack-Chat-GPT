<template>
    <div class="chat" ref="currentMessage">
        <div class="profile">
            <img v-if="chat.isAi" src="@/assets/bot.svg" alt="" />
            <img v-else src="@/assets/user.svg" alt="" />
        </div>
        <div class="message">
            {{ chat.value }}
        </div>
    </div>
</template>
    
<script setup>
import { nextTick, onMounted, ref, watch } from "vue";
defineProps(["chat"]);
const currentMessage = ref(null);
onMounted(async () => {
  await nextTick();
  const div = ref("currentMessage");
//   div.value.scrollIntoView({ behavior: "smooth" });
});

</script>
    
<style lang="scss" scoped></style>