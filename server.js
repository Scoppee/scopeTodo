const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`)
})