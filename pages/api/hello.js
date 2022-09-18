import escpos from 'escpos';
import escposUsb from 'escpos-usb';

escpos.USB = escposUsb;

export default function handler(req, res) {
  let devices = escposUsb.findPrinter();
  // let device = new escpos.USB()
  let device = {device:devices[0]};
  const printer = new escpos.Printer(device);
  device.open(function(){
      printer
      .font('a')
      .align('ct')
      .style('bu')
      .size(1, 1)
      .text('The quick brown fox jumps over the lazy dog')
      .cut()
      .close()
  });
  res.status(200).json(printer)
}

