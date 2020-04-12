var axios=require('axios');
var scrapper=require('cheerio');
var list=[];

axios.get('https://countrycode.org/').then(res=>{
  var data=scrapper.load(res.data);
  data('.main-table').each(function(ind,val){
    if(ind===0){
      scrapper(val).find('tr').each(function(ind,val){
        if(ind>0){
          var country={};
          scrapper(val).find('td').each(function(ind,val){
            var entry=scrapper(val).text();
            switch(ind){
              case 0 : country['name']=entry; break;
              case 1 : country['code']=entry; break;
              case 2 : country['iso']=entry; break;
              case 3 : country['population']=getNum(entry); break;
              case 4 : country['area(KM2)']=getNum(entry); break;
              case 5 : country['GDP(billion USD)']=parseFloat(entry); break;
            }
          });
          list.push(country);
        }
      });
      console.log(list);
    }
  });
}).catch(err=>{
  console.log(err);
});

function getNum(string){
  return parseInt(string.replace(/,/g,''));
}
