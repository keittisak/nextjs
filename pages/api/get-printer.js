import escpos from 'escpos';
import newEscposUsb from 'utils/new-escpos-usb';

import { EscPos } from '@tillpos/xml-escpos-helper';
import fs from 'fs';

export default async function handler(req, res) {

  let devices = newEscposUsb.findPrinter();
  var bitmap = fs.readFileSync('public/receipt.png');
  const dataImage = new Buffer(bitmap).toString('base64');

  const template =  `<?xml version="1.0" encoding="UTF-8"?>
        <document>
          <align mode="center">
            <bold>
              <text-line size="1:0">{{title}}</text-line>
            </bold>
              
            <image density="d24">
              {{base64PngImage}}
            </image>
          </align>    
          <line-feed />
          <paper-cut />
        </document>`;
      
        const input = {
          title: 'PNG - base64',
          base64PngImage: 'data:image/png;base64,'+dataImage
        };
      
        const buffer = EscPos.getBufferFromTemplate(template, input);
  res.status(200).json(buffer)
}


