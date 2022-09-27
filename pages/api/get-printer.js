import { EscPos } from '@tillpos/xml-escpos-helper';
import imageToBase64 from 'image-to-base64'


export default async function handler(req, res) {
  const dataImage = await imageToBase64('public/receipt.png');
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


