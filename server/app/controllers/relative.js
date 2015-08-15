"use strict"

import Relative from "../models/relative"

export function list(req, res, next){
	Relative.find({}).sort({name: 1}).exec((err, relatives) => {
	    if (err) {
	      res.json(err)
	    }
	    res.json(relatives)
  	})	
}

export function create(req, res, next){	
	res.json({data: req.body})
}