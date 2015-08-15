"use strict"

import Family from "../models/family"

export function list(req, res, next){
	Family.find({}).sort({name: 1}).exec((err, family) => {
	    if (err) {
	      res.json(err)
	    }
	    res.json(family)
  	})	
}