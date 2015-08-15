"use strict"

import Pet from "../models/pet"

export function list(req, res, next){
	Pet.find({}).sort({name: 1}).exec((err, pets) => {
	    if (err) {
	      res.json(err)
	    }
	    res.json(pets)
  	})	
}