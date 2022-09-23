import escpos from 'escpos';
// import escposUsb from 'escpos-usb';
import newEscposUsb from 'utils/new-escpos-usb';

escpos.USB = newEscposUsb;

export default function handler(req, res) {
  let devices = escposUsb.findPrinter();
//   let device = devices[0];
  res.status(200).json(devices)
}

