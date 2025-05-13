const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const User = require('./models/User');

// if(process.env.NODE_ENV !== 'production'){
//     dotenv.config();
// }
console.log(process.env.DB_DATABASE)
console.log(process.env.DB_USERNAME)
console.log(process.env.DB_PASSWORD)
console.log(process.env.DB_HOST)
console.log(process.env.JWT_SECRET)
console.log(process.env.JWT_EXPIRES_IN)
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.get('/live', (req, res) => res.status(200).send('I am alive'));
app.get('/ready', async (req, res) =>
{
  try
  {
    const user = await User.create({
      name: "test user",
      email: "impossibleemailreallydaungerous@test.com",
      password: "password"
    });
    await User.deleteOne({ _id: user._id });
    res.status(200).send('Ready');
  } catch (err)
  {
    res.status(500).send(err.message)
  }
});


app.get('/api/crash-server', (req, res) =>
{
  console.log('Crash endpoint hit, crashing server...');
  res.json({
    message: 'Server is crashing now...'
  })
  // Give time for response to go out before crashing
  setTimeout(() =>
  {
    process.exit(1); // exits with failure status to simulate crash
  }, 100);
});

app.get("/stress", (req, res) =>
{
  const start = Date.now();
  const duration = 2000; // 10 seconds
  let count = 0;

  const interval = setInterval(() =>
  {
    count++;
    if (Date.now() - start >= duration)
    {
      clearInterval(interval);
      res.json({ message: `Stress test completed. ${count} requests sent.` });
    }
  }, 1); // Send a request every millisecond
})


// Error handling middleware
app.use((err, req, res, next) =>
{
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Errore interno del server'
  });
});

// Database connection and server start
const PORT = process.env.PORT || 3000;

const startServer = async () =>
{
  try
  {

    app.listen(PORT, () =>
    {
      console.log(`Server in ascolto sulla porta ${PORT}`);
    });
  } catch (error)
  {
    console.error('Impossibile connettersi al database:', error);
    process.exit(1);
  }
};

startServer(); 