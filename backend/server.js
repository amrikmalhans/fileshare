const express = require('express');
const fileUpload = require('express-fileupload'); 
const azure = require('azure-storage');
const Promise = require("bluebird");
const cors = require('cors')
const app = express();
// middle ware
app.use(express.static('public')); //to access the files in public folder
app.use(cors()); // it enables all cors requests
app.use(fileUpload());
// file upload api


const blobService = azure.createBlobService("DefaultEndpointsProtocol=https;AccountName=amrik;AccountKey=XLOI9NsUI7rv9Ecxa+FVbO8vxTGiBRjsjJO/urNA0hS8D9jathfRTHbq4ZkktsfN8KFkBC2FzTATlyweAPgAmQ==;EndpointSuffix=core.windows.net");
 
  
app.post('/upload', (req, res) => {
  const dd = req.files.file;
  const clientData = []
  for (let  item of dd) {
    let data = item.data;
    let fileName = item.name;
    blobService.createBlockBlobFromText('mycontainer', fileName, data, function (err) {
     
      if (!err) {
        console.log('uploaded!');
         const URL =  blobService.getUrl('mycontainer', fileName);
         let respData = {path: URL, name: fileName}
         console.log(respData);
         clientData.push(respData);
      }
    })
  }

  res.send(clientData)
  // dd.map(item => {
  //   let data = item.data;
  //   let fileName = item.name;
  //   blobService.createBlockBlobFromText('mycontainer', fileName, data, function(err) {
  //   if(!err) {
  //      console.log('uploaded!');
  //   } 
  //   // const URL =  blobService.getUrl('mycontainer', fileName);
  //   //  let respData = {path: URL, name: fileName}
  //   //  res.write(respData)
  // })
  // })
//   for (let x = 0; x < req.files.file.length; x++) {
//   let data = req.files.file[x].data;
//   let fileName = req.files.file[x].name;
    
//   blobService.createBlockBlobFromText('mycontainer', fileName, data, function(err) {
//     if(!err) {
//       // console.log('uploaded!');
//     } 
//     const URL =  blobService.getUrl('mycontainer', fileName);
//      let respData = {path: URL, name: fileName}
//      res.write(respData)
//   })

// }
})
app.listen(5000, () => {
    console.log('server is running at port 5000');
})