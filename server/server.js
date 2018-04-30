<<<<<<< HEAD
import 'babel-core/register';
import express from 'express';
import { json } from 'body-parser';

const app = express();
const port = process.env.PORT || 3000;

app.use(json());

app.use(require('./routes/index'));

app.listen(port, () => { console.log('Server started on port 3000'); });

export default app;
=======
import 'babel-core/register';
import express from 'express';
import { json } from 'body-parser';

const app = express();
const port = process.env.PORT || 3000;

app.use(json());

app.use(require('./routes/index'));

app.listen(port, () => { console.log('Server started on port 3000'); });

export default app;
>>>>>>> 16a8d644d22994603c9c691b0c46f7f711c84eba
