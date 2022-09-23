import newEscposUsb from 'utils/new-escpos-usb';

export default function handler(req, res) {
  let devices = newEscposUsb.findPrinter();
  res.status(200).json(devices)
}

