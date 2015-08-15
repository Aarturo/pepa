"use strict"

import mongoose from "mongoose"

const RelativeSchema = new mongoose.Schema({
	name: String,
	lastname: String,
	image: String,
}, {
	toObject: {
		virtuals: true
	},
	toJSON: {
		virtuals: true
	}
})

module.exports = mongoose.model("Relative", RelativeSchema)