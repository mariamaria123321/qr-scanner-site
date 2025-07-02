// netlify/functions/proxy-qr.js
const AS_URL = 'https://script.google.com/macros/s/AKfycbyg3iqSF6HjSTmZI1SYf4syWeMaDYAsJkE7aKYBb83w8wyl7b5ucL_MCya7xNQJvfuaDg/exec';

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { Allow:'POST','Access-Control-Allow-Origin':'*' },
      body: 'Method Not Allowed'
    };
  }
  try {
    // forward your JSON straight to Apps Script
    const resp = await fetch(AS_URL, {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: event.body
    });
    const text = await resp.text();
    return {
      statusCode: resp.status,
      headers: {
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin':'*'
      },
      body: text
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin':'*' },
      body: JSON.stringify({ status:'error', message: err.message })
    };
  }
};
