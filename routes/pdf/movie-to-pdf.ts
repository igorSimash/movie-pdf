import { Router } from "express";
import { getMovieById, getMoviesPdf } from "../../services/movie";
const router = Router();
router.get("/movies", async (req, res) => {
  try {
    const routeUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    const pdf = await getMoviesPdf(routeUrl);
    if (!pdf) 
      return res.status(409).json({message: "Error creating file"});

    const stream = res.writeHead(200, {
      'Content-Disposition': `attachment;filename=movies-${Date.now()}.pdf`,
      'Content-Type': 'application/pdf',
    });
    stream.write(pdf);
    stream.end();
  }
  catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

router.get("/movies/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const pdf = await getMovieById(id);
    if (!pdf) 
      return res.status(409).json({message: `Error creating file with ID ${id}`});

    const stream = res.writeHead(200, {
      'Content-Disposition': `attachment;filename=movies-${Date.now()}.pdf`,
      'Content-Type': 'application/pdf',
    });
    stream.write(pdf);
    stream.end();
  }
  catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }

});

export default router;