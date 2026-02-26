import {exec} from 'child_process';

export function generateHtml(theme: string = 'elegant'): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(
      `resume export resume.html --theme ${theme}`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(stderr);
          reject(error);
        } else {
          resolve('resume.html');
        }
      }
    );
  });
}