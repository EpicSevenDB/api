import { MongoClient } from 'mongodb';
import { DB } from '../utils/Constants';

class Database {
	constructor() {
		this.mongoClient = {};
		this.mongoClientDb = {};
		Object.seal(this);
	}

	get client() {
		return this.mongoClient;
	}
	get db() {
		return this.mongoClientDb;
	}

	set client(client) {
		return (this.mongoClient = client);
	}

	set db(db) {
		return (this.mongoClientDb = db);
	}

	getCollection(collectionName, lang) {
		return this?.db?.collection(lang ? `${collectionName}-${lang}` : collectionName);
	}

	connect() {
		return MongoClient.connect(DB.url, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			// autoReconnect: true,
			// reconnectTries: 100,
			// reconnectInterval: 5000, //ms
		})
			.then((client) => {
				this.client = client;
				this.db = this.client.db(DB.name);
			})
			.catch((err = '') => {
				throw new Error(err);
			});
	}
}

export default new Database();
