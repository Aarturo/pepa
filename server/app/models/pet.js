"use strict"

import mongoose from "mongoose"

const PetSchema = new mongoose.Schema({
	name: String,
	birthday: Date,
	image: String,
	race: String
}, {
	toObject: {
		virtuals: true
	},
	toJSON: {
		virtuals: true
	}
})

module.exports = mongoose.model("Pet", PetSchema)