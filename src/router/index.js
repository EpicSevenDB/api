import express from 'express';
import timeout from 'connect-timeout';
import Limiter from '../utils/Limiter';

import artifactList from './artifact/list';
import artifactDetail from './artifact/single';
import heroList from './hero/list';
import heroDetail from './hero/single';
import itemList from './item/list';
import itemDetail from './item/single';
import arenaRanking from './ranking';

const connectionTimeout = timeout('15s');
const router = express.Router();

router.get('/artifact/:_id', connectionTimeout, artifactDetail);
router.get('/artifact', connectionTimeout, artifactList);
router.get('/hero/:_id', connectionTimeout, heroDetail);
router.get('/hero', connectionTimeout, heroList);
router.get('/item/:_id', connectionTimeout, itemDetail);
router.get('/item', connectionTimeout, itemList);

router.get('/ranking', connectionTimeout, arenaRanking);

export default (app) => {
	app.use('/', Limiter);
	app.use('/', router);
};
