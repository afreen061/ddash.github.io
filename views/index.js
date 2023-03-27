$(document).ready(function(){
    var url="http://localhost:3000/userr"
    $.getJSON(url,function(data){ //1) take data from api  main start
        console.log(data);
        let intt=[];
        let Rty=[];
        let Lpy=[];
        let yerr=[];
        let ty=[]; // 2) array of each topic 
        for(let k=0;k<data.length;k++)
        {
            intt.push(data[k].intensity)
            Rty.push(data[k].relevance)
            Lpy.push(data[k].likelihood)
            yerr.push(data[k].end_year)
            ty.push(data[k].country)

       }
       console.log(intt)
       console.log(Rty)
       console.log(Lpy)
       console.log(yerr)
        var end_year, intensity,sector, topic,  region,start_year,country, relevance,pestle,likelihood,source
         var dregion=[]
         var dintensity=[]
         var dsector=[]
         var dtopic=[]
         var dstart_year=[]
         var drelevance=[]
         var dcountry=[]
         var dlikelihood=[]
         var dpestle=[]
         var dend_year=[] //3) use this

$.each(data,function(id,obj){
    dregion.push(obj.region)
    dintensity.push(obj.intensity)
    dsector.push(obj.sector)
    dtopic.push(obj.topic)
    dstart_year.push(obj.start_year)
    drelevance.push(obj.relevance)
    dcountry.push(obj.country)
    dlikelihood.push(obj.likelihood)
    dpestle.push(obj.pestle)
    dend_year.push(obj.end_year)
})
//console.log(dpestle);

        end_year=data.end_year
        intensity =data.intensity
        sector =data.sector
        topic =data.topic
        region =data.region
        start_year=data.start_year
        country =data.country
        pestle =data.pestle
        likelihood =data.likelihood 
        source =data.source
        
        

        
        data.sort((a, b) => a.end_year - b.end_year);
        const filtereyear = data.filter(p => p.end_year !== ''); //4 assign year in order 

        var myChart=document.getElementById("myChart").getContext('2d') // graph start***
        var chart= new Chart(myChart,{
            type:"line",
            data:{
                labels:    filtereyear.map(row => row.end_year),
                datasets:[
                    {
                        label:"Intensity",
                        data: filtereyear.map(d => d.intensity),
                        backgroundColor:"rgb(255, 95, 158)",
                        borderColor: "rgb(255, 95, 158)",
                        minBarLength:100
                    },
                    {
                        label:"likelihood",
                        data: filtereyear.map(d => d.likelihood),
                        backgroundColor:"rgb(6, 0, 71)",
                        borderColor: "rgb(6, 0, 71)",
                        minBarLength:100
                    },
                    {
                        label:"Relevance",
                        data: filtereyear.map(d => d.relevance),
                        backgroundColor:"rgb(231, 177, 10)",
                        borderColor: "rgb(231, 177, 10)",
                        minBarLength:100
                    }
                   
                    


                ]
            },
            options: {
                scales: {
                  xAxes: [{
                    type: 'time',
                    time: {
                      unit: 'year'
                    },
                    ticks: {
                      source: 'data',
                      maxRotation: 0,
                      autoSkip: true,
                      skipNull: true // <-- set skipNull to true to remove gaps in the chart
                    }
                  }],
                  yAxes: [{
                    ticks: {
                      beginAtZero: true
                    }
                  }
                ]
                }
                
              }
              
        })
       //end chart

      
       //5) button 
        const cselect = document.getElementById('submitt');
      
       //6) filter start....
       cselect.addEventListener('click', function() {
                
               const data1=[...dcountry]
               const data2=[...dpestle]
              // console.log(data1)  
               const cchoose=document.getElementById("country-select") ;
               const pchoose=document.getElementById("pestle-select") ;
          
           //console.log(indexcount) 
           //console.log(indexpest) 
          // console.log(value) 
           //console.log(cchoose.value) 
           var indexs = [];
           var pindex=[];
           //1)index  of match element choose
data1.filter(function(elem, index, array){
    if(elem == cchoose.value) {
        indexs.push(index);
    }
});
data2.filter(function(elem, index, array){
    if(elem == pchoose.value) {
        pindex.push(index);
    }
});
console.log(indexs);
console.log(pindex);
//2 value of match element  to index
const filteredIValues = dintensity.filter((value, index) => {
    return indexs.includes(index);
  });
  const filteredRValues = drelevance.filter((value, index) => {
    return indexs.includes(index);
  });
  const filteredLValues = dlikelihood.filter((value, index) => {
    return indexs.includes(index);
  });
  const filteredIPValues = dintensity.filter((value, index) => {
    return pindex.includes(index);
  });
  const filteredRPValues = drelevance.filter((value, index) => {
    return pindex.includes(index);
  });
  const filteredLPValues = dlikelihood.filter((value, index) => {
    return pindex.includes(index);
  });
  const filteredYPValues = dend_year.filter((value, index) => {
    return pindex.includes(index);
  });
  const filteredYValues = dend_year.filter((value, index) => {
    return indexs.includes(index);
  });
 //console.log(filteredIValues)
  //console.log(filteredIPValues)
  //console.log(filteredRValues)
//console.log(datasets.length)
//console.log(cchoose.value)

//console.log(pchoose.value)
//4)new index intersection

//..Start both filter.....
if(cchoose.value!=='Choose Country'&&pchoose.value!=='Choose Pestle'){
const intersectionindx = indexs.filter((value) => {
    return pindex.includes(value);
  });
  const intersectionR = indexs.filter((value) => {
    return pindex.includes(value);
  });
  const intersectionL = indexs.filter((value) => {
    return pindex.includes(value);
  });
  const intersectionY = indexs.filter((value) => {
    return pindex.includes(value);
  });
  console.log(intersectionindx )
  //5 value 
  const filteredIinten = dintensity.filter((value, index) => {
    return intersectionindx.includes(index);
  });
  const filteredIR = drelevance.filter((value, index) => {
    return intersectionR.includes(index);
  });
const filteredIL = dlikelihood.filter((value, index) => {
    return intersectionL.includes(index);
  });
  const filteredIY = dend_year.filter((value, index) => {
    return intersectionY.includes(index);
  });
  console.log(filteredIinten )
  
//3) flter them

  //console.log(intersectionFI)
 // console.log(intersectionFR)
  //console.log(intersectionFL)
     
//  filteredIY.sort((p, q) => p - q);
 // const filtereyearrB =  filteredIY.filter(p => p !== '');
  
  for(let y=0;y<3;y++)
  {
    
    
        chart.data.datasets[0].data=filteredIinten;
chart.data.datasets[1].data=filteredIL;
chart.data.datasets[2].data=filteredIR;
chart.data.labels=filteredIY;
chartt.data.datasets[0].data=filteredIinten;
chartt.data.datasets[1].data=filteredIL;
chartt.data.datasets[2].data=filteredIR;
chartt.data.labels=filteredIY;

    
}
chart.update();
chartt.update();}//end both filter..
//start single filterr


else if(cchoose.value==='Choose Country'||pchoose.value==='Choose Pestle'){
  
    if(pchoose.value==='Choose Pestle'){
    chart.data.datasets[0].data=filteredIValues;
chart.data.datasets[1].data=filteredRValues;
chart.data.datasets[2].data=filteredLValues;
chart.data.labels= filteredYValues;
chartt.data.datasets[0].data=filteredIValues;
chartt.data.datasets[1].data=filteredRValues;
chartt.data.datasets[2].data=filteredLValues;
chartt.data.labels=filteredYValues;

//console.log(filteredYValues)
}
else{
    chart.data.datasets[0].data=filteredIPValues;
    chart.data.datasets[1].data=filteredRPValues;
    chart.data.datasets[2].data=filteredLPValues;
   chart.data.labels=filteredYPValues;
    chartt.data.datasets[0].data=filteredIPValues;
    chartt.data.datasets[1].data=filteredRPValues;
    chartt.data.datasets[2].data=filteredLPValues;
  chartt.data.labels=filteredYPValues;
}
chart.update();
chartt.update();
}//end single filter
        })
//end filter

        //2nd chart start
        var myChartt=document.getElementById("myChartt").getContext('2d') // graph start***
        var chartt= new Chart(myChartt,{
            type:"bar",
            data:{
                labels:    filtereyear.map(d => d.end_year),
                datasets:[
                    {
                        label:"Intensity",
                        data: filtereyear.map(d => d.intensity),
                        backgroundColor:"rgb(21, 152, 149)",
                        minBarLength:100
                    },
                    {
                        label:"likelihood",
                        data: filtereyear.map(d => d.likelihood),
                        backgroundColor:"rgb(231, 177, 10)",
                        minBarLength:100
                    },
                    {
                        label:"Relevance",
                        data: filtereyear.map(d => d.relevance),
                        backgroundColor:"rgb(247, 200, 224)",
                        minBarLength:100
                    }
                   
                    


                ]
            },
            options: {
                
                responsive: true
               
              }
              
        })

       //2nd chart end 
        
       
    
    
        

     

        /*

// Add an event listener to the select element
*/

        
       
       

    })
}
)// main end








