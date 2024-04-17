import puppeteer from "puppeteer";
import {compileHbs} from '../utils/hbs/compile-hbs';
export const getMoviesPdf = async (routeUrl: string) => {
  try {
    const data = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`)
      .then(res => res.json());
    if ('success' in data && !data.success)
      return null;
    const html = compileHbs('movie-list', {...data, routeUrl});
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(html);
    await page.emulateMediaType("screen");
    const pdf = await page.pdf({  
      format: "A4",
      printBackground: true
    });
    await browser.close();
    return pdf;
  }
  catch (err) {
    console.log(err);
  }
  
}

export const getMovieById = async (id: string) => {
  try {
    const data = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}`)
      .then(res => res.json());  
    if ('success' in data && !data.success)
      return null;
    const html = compileHbs('movie-single', data);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(html);
    await page.emulateMediaType("screen");
    const pdf = await page.pdf({ 
      format: "A4",
      printBackground: true
    });
    await browser.close();
    return pdf;
  }
  catch (err) {
    console.log(err);
  }
}