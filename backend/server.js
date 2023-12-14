import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import axios from 'axios';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/getOpenAIResponse', async (req, res) => {
  try {
    console.log('Received request:', req.body); // Log the incoming request

    const openaiResponse = await axios.post(
      'https://api.openai.com/v1/completions',
      {
        model: 'text-davinci-003',
        prompt: req.body.question, // Use the question from the client
        temperature: 0,
        max_tokens: 3000,
        top_p: 1,
        frequency_penalty: 0.5,
        presence_penalty: 0,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_KEY}`, // Replace with your actual OpenAI API key
        },
      }
    );

    console.log('OpenAI Response:', openaiResponse.data); // Log the OpenAI response

    res.json(openaiResponse.data);
  } catch (error) {
    console.error('Error fetching OpenAI response:', error);

    if (error.response) {
      // The request was made and the server responded with a non-2xx status code
      console.error('OpenAI API Error:', error.response.data);
      res.status(error.response.status).json({ error: error.response.data });
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response from OpenAI API');
      res.status(500).json({ error: 'No response from OpenAI API' });
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error setting up OpenAI request:', error.message);
      res.status(500).json({ error: 'Error setting up OpenAI request' });
    }
  }
});


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
