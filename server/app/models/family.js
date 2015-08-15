"use strict"

import mongoose from "mongoose"

const FamilySchema = new mongoose.Schema({
	name: String,
	inserted: Date,
	active: Boolean,
	relatives: [{type: mongoose.Schema.Types.ObjectId, ref: "Relative"}],
	pets: [{type: mongoose.Schema.Types.ObjectId, ref: "Pet"}]
}, {
	toObject: {
		virtuals: true
	},
	toJSON: {
		virtuals: true
	}
})

FamilySchema.plugin(require("mongoose-paginate"))
FamilySchema.plugin(require("mongoose-timestamp"))

FamilySchema.statics.list = function (search, page, limit, sortBy, cb) {
  search = search || ""
  const isearch = {
    $regex: `.*${search}.*`,
    $options: "i"
  }
  const options = {
    page: page || 1,
    limit: limit || 10,
    sortBy: sortBy
  }
  this.paginate({$or: [{name: isearch}]}, options, cb)
}

module.exports = mongoose.model("Family", FamilySchema)