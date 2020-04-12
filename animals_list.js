var axios=require('axios');
var scrapper=require('cheerio');
var list=[];

axios.get('https://lib2.colostate.edu/wildlife/atoz.php?sortby=Common_Name&letter=ALL').then(res=>{
  var data=scrapper.load(res.data);
  data('.names').each(function(ind,val){
    scrapper(val).find('tr').each(function(ind,val){
      var animal={};
      scrapper(val).find('td').each(function(ind,val){
        var entry=scrapper(val).text();
        switch(ind){
          case 0 : animal['name']=entry;
          case 1 : animal['scientific_name']=entry;
        }
      });
      list.push(animal);
    });
    console.log(list);
  });
}).catch(err=>{
  console.log(err);
});
