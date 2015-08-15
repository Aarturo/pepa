"use strict"

import {list} from "../controllers/family"

export default function(app){
	// app.get("/", function(req, res){
	// 	res.json({result: "asdasdasd"})
	// })
	app.get("/api/family", list)
}