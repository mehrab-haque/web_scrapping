var axios=require('axios');
var scrapper=require('cheerio');
var list=[];

axios.get('https://cse.buet.ac.bd/faculty/active_fac_short.php').then(res=>{
  var data=scrapper.load(res.data);
  data('.faculty-block').each(function(ind,val){
    var entry=scrapper(val);
    var name=getName(entry.find('.faculty-name').text());
    var designation=getDesignation(entry.find('.faculty-designation').text());
    var image=getImage(entry.find('img').attr('src'));
    list.push({
      name:name,
      designation:designation,
      image:image
    });
  });
  console.log(list);
}).catch(err=>{
  console.log(err);
});

function getName(string){
  var tmp1=string.split('(')[0];
  var tmp2=tmp1.replace('.','!');
  var tmp3=tmp2.split('!')[1]
  var name=tmp3.substr(3,tmp3.length-5);
  return name;
}

function getDesignation(string){
  var designation=string.substr(0,string.length-1);
  return designation;
}

function getImage(string){
  return 'https://cse.buet.ac.bd/faculty/'+string;
}
