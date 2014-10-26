var MongoClient = require('mongodb').MongoClient;

var db = {};

db.connect = function(args, callback){
	if(typeof args == 'function' && !callback)
	{
		callback = args;
		args = null;
	}

	if(!callback)
		throw new Error('callback is required.');

	if(typeof callback != 'function')
		throw new Error('callback should be a function.');

	if(!args)
		return callback('mongodb server config is required.');

	if(typeof args != 'object')
		return callback('mongodb server config should be an object.');

	if(!('host' in args) || !args.host)
		return callback('mongodb host address is required.');

	if(typeof args.host != 'string')
		return callback('mongodb host address should be a string.');

	if(!('port' in args) || args.port == undefined || args.port == null)
		return callback('mongodb port number is required.');

	if(typeof args.port != 'number')
		return callback('mongodb port number should be a number.');

	if(args.port <= 0)
		return callback('mongodb port number should be greater than zero.');

	if(!('db' in args) || !args.db)
		return callback('mongodb db name is required.');

	if(typeof args.db != 'string')
		return callback('mongodb db name should be a string.');

	MongoClient.connect('mongodb://' + args.host + ':' + args.port + '/' + args.db, function(err, mongodb) {
		if(err)
			return callback(err);
		return callback(null, mongodb);
	});
};

module.exports = db;
