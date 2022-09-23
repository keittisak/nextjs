import escpos from 'escpos';
import escposUsb from 'escpos-usb';

escpos.USB = escposUsb;

export default function handler(req, res) {
  let devices = escposUsb.findPrinter();
//   let device = devices[0];
  res.status(200).json(devices)
}

