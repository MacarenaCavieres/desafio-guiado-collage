import express from "express";
import fileConfig from "./utils/fileConfig.js";
import path from "path";

import imgRoutes from "./routes/img.route.js";

const app = express();

const __dirname = import.meta.dirname;

app.use(express.static(path.join(__dirname, "/imgs")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileConfig);
app.use("/", imgRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
