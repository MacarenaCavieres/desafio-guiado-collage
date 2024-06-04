import express from "express";
import fileUpload from "express-fileupload";

const app = express();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
