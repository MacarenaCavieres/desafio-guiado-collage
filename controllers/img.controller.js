import path from "path";
import { unlink } from "fs/promises";

const __dirname = import.meta.dirname;
const pathFile = path.join(__dirname, "../imgs");

const getForm = (req, res) => {
    res.sendFile(path.join(__dirname, "../public/formulario.html"));
};

const postImg = (req, res) => {
    const { target_file } = req.files;
    const { posicion } = req.body;
    target_file.mv(path.join(pathFile, `imagen-${posicion}.jpg`), (err) => {
        if (err) {
            return res.status(500).send(err);
        } else {
            res.sendFile(path.join(__dirname, "../public/collage.html"));
        }
    });
};

const deleteOne = async (req, res) => {
    const { nombre } = req.params;
    try {
        await unlink(path.join(__dirname, `../imgs/${nombre}`));
        res.sendFile(path.join(__dirname, "../public/collage.html"));
    } catch (error) {
        console.log(error);
        return res.status(500).send("Error de servidor");
    }
};

export const imgMethod = {
    getForm,
    postImg,
    deleteOne,
};
