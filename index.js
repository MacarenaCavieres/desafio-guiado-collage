import express from "express";
import fileUpload from "express-fileupload";
import path from "path";
import { unlink } from "fs/promises";

const app = express();

const __dirname = import.meta.dirname;
const pathFile = path.join(__dirname, "./imgs");

app.use(express.static(path.join(__dirname, "/imgs")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/formulario.html"));
});

app.use(
    fileUpload({
        limits: { fieldSize: 5000000 },
        abortOnLimit: true,
        responseOnLimit: "El peso del archivo es superior al limite permitido",
    })
);

app.post("/imagen", (req, res) => {
    const { target_file } = req.files;
    const { posicion } = req.body;
    target_file.mv(path.join(pathFile, `imagen-${posicion}.jpg`), (err) => {
        if (err) {
            return res.status(500).send(err);
        } else {
            res.sendFile(path.join(__dirname, "./public/collage.html"));
        }
    });
});

app.get("/imagen/:nombre", async (req, res) => {
    const { nombre } = req.params;
    await unlink(path.join(__dirname, `imgs/${nombre}`));
    res.sendFile(path.join(__dirname, "./public/collage.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
