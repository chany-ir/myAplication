// import renderApi from '@api/render-api';
const renderapi=require('@api/render-api');
const express = require('express');
const axios = require('axios');
require('dotenv').config();
const app = express();
const port = 3000; // בחר את הפורט שאתה רוצה
app.get('/', (req, res) => {
  res.send('🖥️🛜💻🛜💻🛜💻🛜💻🛜');
})

// Endpoint שמחזיר את רשימת השירותים ב-Render
app.get('/services', async (req, res) => {
  try {
    // קבלת ה-API Key שהוזן
    const apiKey = process.env.RENDER_API_KEY;

    const response = await axios.get('https://api.render.com/v1/services?limit=20', {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/json'
      }
    });

    // החזרת התוצאה ב-JSON
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching services');
  }
});


renderapi.auth('rnd_VUPlxnL5xQDAiZARW2ZkKjFAC4fm');
renderapi.listServices({includePreviews: 'true', limit: '20'})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
// הפעלת השרת
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});