var axios=require('axios');
var cheerio=require('cheerio');

axios.get('https://en.wikipedia.org/wiki/List_of_districts_of_Bangladesh').then(res=>{
  var data=cheerio.load(res.data);
  data('.wikitable.sortable tr').each(function(index, value){
    if(index>0){
      var name=cheerio(this).find('a').text().split(' ')[0];
      console.log(name);
    }
  });
}).catch(err=>{
  console.log(err);
});
