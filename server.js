import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = 4000;

app.use(cors());
// Lista simple de canciones (puedes cargarla desde un JSON)
app.get("/songs", (req, res) => {
  res.json([
    "Foo Fighters - Everlong.mp3",
    "I MONSTER - Daydream In Blue.mp3",
    "Kanye West - Can't Tell Me Nothing.mp3"
  ]);
});


// Endpoint para reproducir canción
const R2_BASE_URL = "https://pub-b1b12f22f285447c94ae66592bbfba09.r2.dev";

app.get("/songs/:filename", async (req, res) => {
  const fileUrl = `${R2_BASE_URL}/${req.params.filename}`;
  const response = await fetch(fileUrl);
  res.setHeader("Content-Type", "audio/mpeg");
  res.setHeader("Accept-Ranges", "bytes");
  response.body.pipe(res);
});


app.listen(PORT, () =>
  console.log(`Microservicio corriendo en http://localhost:${PORT}`)
);
