import app from './app';

const PORT = 3000;

app.listen(PORT, () => {
  console.log(` === SERVER IS RUNNING ON PORT [${PORT}] === `);
});