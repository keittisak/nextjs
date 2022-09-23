import escpos from 'escpos';
// import escposUsb from 'escpos-usb';
import newEscposUsb from 'utils/new-escpos-usb';

export default function handler(req, res) {
  let devices = newEscposUsb.findPrinter();
//   let device = devices[0];
  res.status(200).json(devices)
}

