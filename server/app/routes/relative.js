"use strict"

import * as relative from "../controllers/relative"

export default function(app){	
	app.get("/api/relative", relative.list)
	app.post("/api/relative", relative.create)
}