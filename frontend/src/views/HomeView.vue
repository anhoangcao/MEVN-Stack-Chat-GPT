<template>
  <main>
    <div id="chat_container">
      <div v-for="(chat, i) in wrapper" :key="i" class="wrapper" :class="{ ai: chat.isAi }">
        <Chat :chat="chat" :key="i" />
      </div>
    </div>
    <form @submit.prevent="fetchAnswer">
      <textarea rows="1" cols="1" placeholder="Type your question here..." v-model="question"></textarea>
      <button type="submit"><img src="@/assets/send.svg" alt="send" /></button>
    </form>
  </main>
</template>


<script setup>
  import { ref } from 'vue';
  const question = ref('');

  const fetchAnswer = async () => {
  try {
    const res = await fetch('http://localhost:8000', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: question.value,
      }),
    });

    if (!res.ok) {
      throw new Error(`Server error: ${res.status} - ${res.statusText}`);
    }

    const data = await res.json();
    console.log(data.bot); // assuming the server response has a 'bot' property

  } catch (error) {
    console.error('Error fetching answer:', error);
  }

  console.log(question.value);
};

</script>
