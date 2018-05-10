import 'babel-core/register';
import express from 'express';
import { json } from 'body-parser';

const app = express();

const port = process.env.PORT || 5000;

app.use(json());

app.use(require('./routes/index').default);

app.get('/api/', (req, res) => {
  res.json({
    message: 'api',
  });
});

app.listen(port, () => { console.log('server started'); });

export default app;
