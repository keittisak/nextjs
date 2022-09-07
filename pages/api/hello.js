// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { spawn } from 'child_process';

export default function handler(req, res) {
  const ls = spawn('gphoto2', ['-v']);
  ls.stdout.on('data', (data) => {
    // console.log(`stdout: ${data}`);
    res.status(200).json({ name: data.toString() })
  });
  
}
