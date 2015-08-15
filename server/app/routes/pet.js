"use strict"

import {list} from "../controllers/pet"

export default function(app){	
	app.get("/api/pet", list)
}