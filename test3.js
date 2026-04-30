fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDwXiUXS9UvYXfd6v3u40e8T8N3yznaoW8', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    contents: [
      {
        parts: [{ text: "Hello" }]
      }
    ]
  })
}).then(r => r.json()).then(console.log);
