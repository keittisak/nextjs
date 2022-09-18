import escpos from 'escpos';
import escposUsb from 'escpos-usb';
escpos.USB = escposUsb;

export default function handler(req, res) {
    try {
        const device  = new escpos.USB();
        device.open(function(error){
            console.log(error)
        });
    } catch (error) {
       return res.status(500).json({ message: error.toString() })
    }
    res.status(200).json({ name: 'xxx' })
    
}
  