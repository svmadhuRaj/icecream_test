'use strict';
const service = require('./service')
const options = {
    url: 'https://api.yelp.com:443/v3/businesses/search?term=icecream&location=Alpharetta,30005&sort_by=rating&limit=5',
    headers:{
        'Authorization':'Bearer Y8s6dW3uAs-TZ34YRekghk7llJxJuj3JjNAcLtADi-OZ02Dl66_soagZHv-eTyQFHC8fGWfxblXrZxyW3msB1GARItcv2KG0qhzgowweVi4qxdw3fijzXeIyKKd2XXYx '
    }
  };

  service.getServiceData(options).then(function(apidata) {    
    const businessdata = apidata.businesses;
    businessdata.map(s=>{
      let reviewOptions ={
        url:'https://api.yelp.com:443/v3/businesses/'+s.id+'/reviews',
        headers:{
          'Authorization':'Bearer Y8s6dW3uAs-TZ34YRekghk7llJxJuj3JjNAcLtADi-OZ02Dl66_soagZHv-eTyQFHC8fGWfxblXrZxyW3msB1GARItcv2KG0qhzgowweVi4qxdw3fijzXeIyKKd2XXYx '
        }
      };

      service.getServiceData(reviewOptions).then(function(apidata){
        s.review=apidata.reviews;
        console.log('NAME : '+s.name+ '\n ADDRESS: '+s.location.address1 +'\n CITY: '+s.location.city +'\n REVIEWER NAME: '+s.review[0].user.name +'\n REVIEW: '
        +s.review[0].text +'\n\n' );
      },function(error){
        console.log('error in getting reviews'+error);
      })
    });

  },function(error){
    console.log('Error in getting businesses'+error);
  })

