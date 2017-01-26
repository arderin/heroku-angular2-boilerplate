var _ = require('lodash');
var deferred = require('deferred');
var Schema = require('mongoose').Schema;
var timestamps = require('mongoose-timestamp');
var util = require("util");
var MAX_LIMIT = 100;

function BaseSchema() {
	Schema.apply(this, arguments);
	var that = this;
	var golbalImmutable = { "_id": 1};
	this.statics.alias = undefined;
	this.statics.golbalImmutable = golbalImmutable;

	this.statics.whiteList = {};

	function getSelectable(select, isPrivlaged){
		//returns a list of selectable fields
		select = (select || "").replace(/[, ]+/g, " ").trim();

		if(!isPrivlaged){
			//only allows default properties for non privlaged requests
			select = select.replace(/[-]+/g, "").split(" ");
			select = _.filter(select, function(o) {
				return o.replace(/\W+/g, "") in that.statics.whiteList
			}).join(" ");

			//if no select fields provided, default to whitelist
			select = select || Object.keys(that.statics.whiteList).join(" ");
		}

		return select;
	}

	this.statics.getById = function(id, isPrivlaged, select) {
		return this.findOne({
			'_id': id
		}, getSelectable(select , isPrivlaged));
	}

	this.statics.search = function(params, isPrivlaged) {
		var dfd = deferred();
		
		params.limit = Math.min(params.limit || MAX_LIMIT, MAX_LIMIT);
		
		var query = this.find(params.filter)
			.limit(params.limit+1) //grab one extra to see if their are more pages
			.select(getSelectable(params.select, isPrivlaged))
			.sort(params.sort || "itemId");

		query.then(function(resp) {
			var result = {
				"count": resp && resp.length,
				"cursor": null,
				"result": resp
			};
			
			//include cursor if more results
			if (result.count > params.limit) {
				//pop extra
				resp.pop();
				result.cursor = resp[resp.length - 1].itemId;
				result.count = resp.length;
			}

			
			dfd.resolve(result)
		}, function(err, resp) {
			dfd.reject(err, resp);
		});

		return dfd.promise;
	}

	this.statics.create = function(data, callback){
		delete data._id;
		var doc = new this(data);
		doc.save(callback);
	}

	this.statics.updateDoc = function(id, updated_data, callback) {
		var props = this.schema.tree;
		this.findById(id, function(err, doc) {
			if (err || !doc) {
				callback && callback(err || "The document you are trying to update does not exist", null);
				return;
			}
			for (var attr in updated_data) {
				if(props[attr] && !props[attr].immutable && !(attr in golbalImmutable)){
				 doc[attr] = updated_data[attr];
				}
			}
			doc.save(callback);
		});
	};

	this.statics.upsertDoc = function(id, data, callback) {
		var props = this.schema.tree;
		var that = this;
		that.findById(id, function(err, doc) {
			if (err) {
				callback(err, null);
				return;
			}

			//remove immutable attribtue from data
			for(var i in golbalImmutable){
				if(data.hasOwnProperty(i)){
					delete data[i];
				}
			}

			if(!doc){
				doc = new that(data);
			}else{
				for (var attr in data) {
					if(props[attr] && !props[attr].immutable){
					 doc[attr] = data[attr];
					}
				}
			}
			
			doc.save(callback);
		});
	};

	this.statics.delete = function(id, callback) {
		this.findById(id, function(err, doc) {
			if (err || !doc) {
				callback(err || "The document you are trying to delete does not exist", null);
				return;
			}
			doc.remove(callback);
		});
	};
}

module.exports = BaseSchema;

util.inherits(BaseSchema, Schema);