const fs = require("fs");
const { WebSocketServer } = require("ws");
const express = require("express");
const app = express();
const port = 3000;

const server = app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
const wss = new WebSocketServer({ server });
// wsconnections = { wsid: ws, wsid: ws, wsid: ws }
let connections = {};

wss.on("connection", function connection(ws) {
	const wsid = Math.random().toString(36).substring(7);
	connections[wsid] = ws;
	ws.on("close", () => {
		delete connections[wsid];
	});
});

app.use(express.static("../client"));

app.get("/api/plan/:date", (req, res) => {
	const date = req.params.date;
	const plan = getPlan(date);
	if (plan) {
		res.send(plan);
	} else {
		res.status(404).send("Plan not found");
	}
});

// /api/plan/2021-01-01?platz=16&pTeam=1&pName=Max&pVon=10:00&pBis=12:00&sTeam=2&sName=Moritz&sVon=12:00&sBis=14:00&geblockt=true
app.post("/api/plan/:date", (req, res) => {
	const date = req.params.date;
	const platzNummer = req.query.platz;
	const pTeam = req.query.pTeam ?? "";
	const pName = req.query.pName ?? "";
	const pVon = req.query.pVon ?? "";
	const pBis = req.query.pBis ?? "";
	const sTeam = req.query.sTeam ?? "";
	const sName = req.query.sName ?? "";
	const sVon = req.query.sVon ?? "";
	const sBis = req.query.sBis ?? "";
	const geblockt = req.query.geblockt ?? false;

	let plan = getPlan(date);
	const platz = getPlatz(plan, platzNummer);

	platz.geblockt = geblockt;
	platz.PTeam = pTeam;
	platz.PName = pName;
	platz.PVon = pVon;
	platz.PBis = pBis;
	platz.STeam = sTeam;
	platz.SName = sName;
	platz.SVon = sVon;
	platz.SBis = sBis;

	plan = { ...plan, [platzNummer]: platz };
	savePlan(date, plan);
  Object.values(connections).forEach((ws) => {
    ws.send(JSON.stringify({date, platz}));
});

	res.json(plan);
});

// suche die Datein in data/plan und gebe sie zurück
function getPlan(date) {
	const path = `./data/plan/${date}.json`;
	if (fs.existsSync(path)) {
		const file = fs.readFileSync(path, "utf8");
		return JSON.parse(file);
	}
}

// erstelle eine Datei in data/plan
function savePlan(date, plan) {
	console.log(plan);
	const path = `./data/plan/${date}.json`;
	fs.mkdirSync("./data/plan", { recursive: true });
	fs.writeFileSync(path, JSON.stringify(plan, null, 2));
}

// suche den Platz in dem Plan oder erzeuge einen neuen Platz mit den Standardwerten
function getPlatz(plan, platz) {
	if (!plan || !plan[platz]) {
		return {
			PlatzNr: platz,
			geblockt: false,
			PTeam: "",
			PName: "",
			PVon: "",
			PBis: "",
			STeam: "",
			SName: "",
			SVon: "",
			SBis: "",
		};
	}
	return plan[platz];
}