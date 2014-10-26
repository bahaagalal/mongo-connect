var expect = require('chai').expect;
var mongo = require(__dirname + '/../lib/mongo');

describe('mongo', function(){

	describe('connect', function(){
		it('should throw an error if no callback', function(){
			var fn = function() { mongo.connect(); };
			expect(fn).to.throw(/callback is required./);
		});

		it('should throw an error if callback isn\'t a function', function(){
			var fn = function() { mongo.connect('config', 'callback'); };
			expect(fn).to.throw(/callback should be a function./);
		});

		it('should return an error if mongodb configuration isn\'t provided', function(done){
			mongo.connect(function(err, client){
				expect(err).to.not.be.null;
				expect(err).to.be.equal('mongodb server config is required.');
				expect(client).to.be.undefined;
				done();
			});
		});

		it('should return an error if mongodb configuration isn\'t an object', function(done){
			mongo.connect('configuration', function(err, client){
				expect(err).to.not.be.null;
				expect(err).to.be.equal('mongodb server config should be an object.');
				expect(client).to.be.undefined;
				done();
			});
		});

		it('should return an error if mongodb host address doesn\'t exist', function(done){
			mongo.connect({
				host: null
			}, function(err, client){
				expect(err).to.not.be.null;
				expect(err).to.be.equal('mongodb host address is required.');
				expect(client).to.be.undefined;
				done();
			});
		});

		it('should return an error if mongodb host address isn\'t a string', function(done){
			mongo.connect({
				host: {}
			}, function(err, client){
				expect(err).to.not.be.null;
				expect(err).to.be.equal('mongodb host address should be a string.');
				expect(client).to.be.undefined;
				done();
			});
		});

		it('should return an error if mongodb port number doesn\'t exist', function(done){
			mongo.connect({
				host: '127.0.0.1',
				port: null
			}, function(err, client){
				expect(err).to.not.be.null;
				expect(err).to.be.equal('mongodb port number is required.');
				expect(client).to.be.undefined;
				done();
			});
		});

		it('should return an error if mongodb port number isn\'t a string', function(done){
			mongo.connect({
				host: '127.0.0.1',
				port: '23456'
			}, function(err, client){
				expect(err).to.not.be.null;
				expect(err).to.be.equal('mongodb port number should be a number.');
				expect(client).to.be.undefined;
				done();
			});
		});

		it('should return an error if mongodb port number is less than or equal to zero', function(done){
			mongo.connect({
				host: '127.0.0.1',
				port: 0
			}, function(err, client){
				expect(err).to.not.be.null;
				expect(err).to.be.equal('mongodb port number should be greater than zero.');
				expect(client).to.be.undefined;
				done();
			});
		});

		it('should return an error if mongodb db name doesn\'t exist', function(done){
			mongo.connect({
				host: '127.0.0.1',
				port: 27017,
				db: null
			}, function(err, client){
				expect(err).to.not.be.null;
				expect(err).to.be.equal('mongodb db name is required.');
				expect(client).to.be.undefined;
				done();
			});
		});

		it('should return an error if mongodb db name isn\'t a string', function(done){
			mongo.connect({
				host: '127.0.0.1',
				port: 27017,
				db: []
			}, function(err, client){
				expect(err).to.not.be.null;
				expect(err).to.be.equal('mongodb db name should be a string.');
				expect(client).to.be.undefined;
				done();
			});
		});

		it('should return a mongo client object if database config is correct', function(done){
			mongo.connect({
				host: '127.0.0.1',
				port: 27017,
				db: 'test'
			}, function(err, client){
				expect(err).to.be.null;
				expect(client).to.exist;
				done();
			});
		});
	});
});
