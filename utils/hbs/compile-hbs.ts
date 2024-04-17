import path from 'path';
import fs from 'fs';
import hbs from 'handlebars';

export const compileHbs = (template: string, data: any) => {
  const file = path.join(process.cwd(), 'utils/templates', `${template}.hbs`);
  const html = fs.readFileSync(file, 'utf-8');
  return hbs.compile(html)(data);
}