import 'babel-core/register';
import express from 'express';
import { json } from 'body-parser';

const app = express();
const port = process.env.PORT || 3000;

app.use(json());

app.use(require('./routes/index'));

app.listen(port, () => { console.log('Server started on port 3000'); });

export default app;
