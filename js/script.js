function progress() {
    var prg= document.getElementById('progress');
    var percent= document.getElementById('percentCount');
    var counter= 5;
    var progress= 25;
    var id= setInterval(frame,5);

    function frame() {
        if(progress == 500 && counter == 100){
            clearInterval(id);
            document.getElementById('progress').style.display="none";
            document.getElementById('progress-bar').style.display="none";
            document.getElementById('percentCount').style.display="none";
            document.getElementById('flex').style.display="flex";
        } else {
            progress +=5;
            counter +=1;
            prg.style.width = progress + 'px';
            percent.innerHTML=counter + '%';
        }
    }
}

progress();


$(document).ready(function(){
    var address = ['0x358006fFFF0bC35aad27aF23e78c8602A07BEe9F','0x4563af7E83c73851C6a190CE8430593643dA91F3','0x6ce4B231c7aB84e6AE3570Fa4ccE81A24f54564f','0x210bdbEF68Dd774dde24c17616D01AD3B0ce8649','0x7232b6D7e5A2f09611D3842bc75D80fE08738774'];
    var i=0;
    var offset=5;
    var arr=[];
    var macroarray=[]
    var k=0;

  getTransactions();

  function getTransactions() {

    var url='https://api-ropsten.etherscan.io/api?module=account&action=txlist&address='+address[i]+'&startblock=0&endblock=99999999&page=1&offset='+offset+'&sort=desc&apikey=YourApiKeyToken';
    var url2='https://api-ropsten.etherscan.io/api?module=account&action=tokentx&contractaddress='+address[i]+'&page=1&'+offset+'&sort=desc&apikey=YourApiKeyToken';

    if(i % 5 != 4){
    //   console.log(address[i]);
      $.ajax({
        'url': url,
        'method':'GET',
        'success':function(data,state){
          for(var j = 0;j < offset; j++){
            var txHash = data.result[j].hash;
            var blockNumber = data.result[j].blockNumber;
            var timeStamp = data.result[j].timeStamp;
            var date = new Date(timeStamp * 1000);
            var year=date.getFullYear();
            var month=date.getMonth()+1;
            var day=date.getDate();
            var hours = date.getHours();
            var minutes = "0" + date.getMinutes();
            var seconds = "0" + date.getSeconds();
            var formattedTime = day+'/'+month+'/'+year+' '+hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
            var from = data.result[j].from;
            var to =data.result[j].to;
            var value = data.result[j].value;
            var valueEther= value/1000000000000000000;
            if(valueEther<0.000001){valueEther=0;}
            var txFee = data.result[j].gasPrice * data.result[j].gasUsed; //Da convertire in Ether
            var txFeeEther=txFee/1000000000000000000;
            if(txFeeEther < 0.000001){txFeeEther = 0;}
            arr.push("<a href=https://ropsten.etherscan.io/tx/"+txHash+">"+txHash+"</a>", blockNumber, formattedTime, from, to, valueEther, txFeeEther);
          }
            // console.log(arr);
            macroarray[i]=arr;
            // console.log("i"+i);
            printTable(macroarray,i);
            arr= [];
            i = (i+1) % 5;
            k = k + 1;
          },
          'error':function(request, state, error){
            alert("Attenzione: il server non ha risposto. Ricarica la pagina" + error);
          }
        })
    }
    else{

      //moment().startOf('day').fromNow();
    //   console.log(address[i]);
      $.ajax({
        'url':url2,
        'method':'GET',
        'success':function(data,state){
          for(var j = 0;j < offset; j++) {
            var txHash = data.result[j].hash;
            var blockNumber = data.result[j].blockNumber;
            var timeStamp = data.result[j].timeStamp;
            var date = new Date(timeStamp * 1000);
            var year=date.getFullYear();
            var month=date.getMonth()+1;
            var day=date.getDate();
            var hours = date.getHours();
            var minutes = "0" + date.getMinutes();
            var seconds = "0" + date.getSeconds();
            var formattedTime = day+'/'+month+'/'+year+' '+hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
            var from = data.result[j].from;
            var to = data.result[j].to;
            var value = data.result[j].value;
            var gasUsed = data.result[j].gasUsed;
            var gasUsedEther = gasUsed / 1000000000000000000;
            if (gasUsedEther < 0.00001) {
              gasUsedEther = 0;
            }
            arr.push("<a href=https://ropsten.etherscan.io/tx/"+txHash+">"+txHash+"</a>", blockNumber, formattedTime, from, to, value, gasUsedEther);
          }
            // console.log(arr);
            macroarray[i]=arr;
            // console.log("i"+i);
            printTable(macroarray,i);
            arr= [];
            i= (i+1)%5;
            k= k + 1;
          },
          'error':function(request, state, error){
            alert("Attenzione: il server non ha risposto. Ricarica la pagina" + error);
          }

        })
    }
    setTimeout(getTransactions,10000);
    }

  });

  function printTable(macroarray,index){
     switch(index){
       case 0: tab="tabella1"; break;
       case 1: tab="tabella2"; break;
       case 2: tab="tabella3"; break;
       case 3: tab="tabella4"; break;
       case 4: tab="tabella5";
     }

    for(i=0;i<7;i++){
      document.getElementById(tab).rows[1].cells[i].innerHTML=macroarray[index][i];
      document.getElementById(tab).rows[2].cells[i].innerHTML=macroarray[index][i+7];
      document.getElementById(tab).rows[3].cells[i].innerHTML=macroarray[index][i+14];
      document.getElementById(tab).rows[4].cells[i].innerHTML=macroarray[index][i+21];
      document.getElementById(tab).rows[5].cells[i].innerHTML=macroarray[index][i+28];
      // document.getElementById(tab).rows[6].cells[i].innerHTML=macroarray[index][i+35];
      // document.getElementById(tab).rows[7].cells[i].innerHTML=macroarray[index][i+42];
      // document.getElementById(tab).rows[8].cells[i].innerHTML=macroarray[index][i+49];
      // document.getElementById(tab).rows[9].cells[i].innerHTML=macroarray[index][i+56];
      // document.getElementById(tab).rows[10].cells[i].innerHTML=macroarray[index][i+63];
    }
  }
