<template>
  <main>
    <div id="chat_container">
      <div v-for="(chat, i) in wrapper" :key="i" :class="{ ai: chat.isAi }" class="wrapper">
        <Chat :chat="chat" :key="i" />
      </div>
    </div>
    <form @submit.prevent="fetchAnswer">
      <textarea rows="1" cols="1" placeholder="Ask VueChat..." v-model="question"></textarea>
      <button type="submit" :disabled="loading">
        <img src="@/assets/send.svg" alt="send" />
      </button>
    </form>
  </main>
</template>

<script setup>
import { ref } from "vue";
import Chat from "@/components/Chat.vue";
import axios from 'axios';

const question = ref("");
const wrapper = ref([]);
const loading = ref(false);

const fetchAnswer = async () => {
  try {
    loading.value = true;
    wrapper.value.push({ isAi: false, value: question.value });
    wrapper.value.push({ isAi: true, value: "Loading...." });

    const response = await axios.post(
      "http://localhost:8000/getOpenAIResponse",
      { question: question.value },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.OPENAI_KEY}`,
        },
      }
    );

    const parsedData = (response.data && typeof response.data === 'string') ? response.data.trim() : response.data;

    wrapper.value.pop();
    wrapper.value.push({ isAi: true, value: parsedData });
  } catch (error) {
    console.error('Error fetching OpenAI response:', error);
  } finally {
    loading.value = false;
    question.value = "";
  }
};
</script>
