import 'babel-core/register';
import express from 'express';
import { json } from 'body-parser';

const app = express();
const port = process.env.PORT || 5000;

app.use(json());

app.use(require('./routes/index'));

app.listen(port);

export default app;
