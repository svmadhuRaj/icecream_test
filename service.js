const request = require('request');
module.exports ={
   getServiceData:function(options){
        return new Promise(function(resolve, reject) {
            request(options, (error, resp, body)=>{                   
              const scode = resp && resp.statusCode;
              if(parseInt(scode)===200){
                const serviceData = JSON.parse(body);
                resolve(serviceData);
              }else{
                reject(Error(''+error));
              } 
          });
        })
    }
}