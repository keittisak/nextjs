import nodeHtmlToImage from 'node-html-to-image';
import imageToBase64 from 'image-to-base64'
export default async function handler(req, res) {
    await createReceiptImg(req.query);
    // const dataImage = await imageToBase64('public/receipt.png');
    // res.status(200).json(`data:image/png;base64,${dataImage}`);
    res.status(200).json('public/receipt.png');
}

const createReceiptImg = async ({ details, total,payment }) => {
    return new Promise(async (resolve,reject) => {
        const d = new Date();
        let detailElement = ``;
        for ( const [index, item] of JSON.parse(details).entries() ){
            detailElement += `
                <div class="transactionDetails">
                    <div class="detail">${item.quantity}</div>
                    <div class="detail">${item.name}</div>
                    <div class="detail">${parseFloat(item.price*item.quantity).toFixed(2)}</div>
                </div>
            `
        };
        let paymentElement = 'เงินสด';
        if( payment == 'truemoney'){
            paymentElement = 'ทรูมันนี่วอลเล็ท'
        }else if( payment == 'prompay'){
            paymentElement = 'พร้อมเพย์'
        }
        nodeHtmlToImage({
            quality: 80,
            output: 'public/receipt.png',
            html: `
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <style>.address,.barcode,.center,.logo,.survey{text-align:center}.creditDetails,.transactionDetails .detail{text-transform:uppercase}*{margin:0;box-sizing:border-box;font-family:VT323,monospace;color:#1f1f1f}body{width:335px;font-size:1.2rem}.container{background:#f1f1f1;padding:20px 10px}.bold{font-weight:700}.receipt{width:100%;background:#fff;margin:0 auto;padding:10px}.logo{margin:0 auto;padding:20px}.barcode{font-family:"Libre Barcode 128",cursive;font-size:42px}.address{margin-bottom:10px}.transactionDetails{display:flex;justify-content:space-between;margin:0 10px 10px}.centerItem{display:flex;justify-content:center;margin-bottom:8px}.survey{margin-bottom:12px}.survey .surveyID{font-size:20px}.paymentDetails{display:flex;justify-content:space-between}.creditDetails{margin:10px auto;width:300px;font-size:14px}</style>
            </head>
            <body>
            <div class="receipt">
                <h1 class="logo" style="padding:0 0 1rem 0;">FoodTakeHome</h1>
                <div class="address">
                    FoodTakeHome  สาขา 1 โทร:0123456789
                </div>
                <div class="transactionDetails" style="justify-content: center;">
                    <div class="detail" style="margin-right:10px">POS#001</div>
                    <div class="detail">TAX#${d.getTime()}</div>
                </div>
                <div class="centerItem bold">
                    <div class="item">ใบเสร็จรับเงิน</div>
                </div>
                ${detailElement}
                <div class="paymentDetails bold">
                    <div class="detail">ยอดสุทธิ</div>
                    <div class="detail">${parseFloat(total).toFixed(2)}</div>
                </div>
                <div class="paymentDetails">
                    <div class="detail">${paymentElement}</div>
                    <div class="detail">${parseFloat(total).toFixed(2)}</div>
                </div>
            </div>
        </body>
        </html>
            `
        })
        .then(() => {
            resolve('');
            console.log('The image was created successfully!')
        })
    });
}


