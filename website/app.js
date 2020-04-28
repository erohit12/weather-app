/* Global Variables */


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

const apiKey = "c784465342856b329aec22d7961186d4";
const apiAdd = "http://api.openweathermap.org/data/2.5/weather?zip=";


const postData = async(url = '', data = {}) =>
{
    console.log(data);
    const response = await fetch (url, {
        Method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

   try 
   {
       const newData = await response.json();
       console.log(newData);
       return newData;
   } 
   catch(error) 
   {
       console.log(error);
   }
}

const getFromKey = async(zip, key) =>
{
    const response = await fetch(apiAdd+zip+',IN&appid='+key);
    try 
    {
        const data = await response.json();
        console.log("data successfully returned from the external API");
        return data;
    } 
    catch(error) 
    {
        console.log('error',error);
    }
}

document.getElementById('generate').addEventListener('click', function(event)
{
    let newZip = document.getElementById('zip').value;
    let feel = document.getElementById('feelings').value;
    //alert(apiAdd+newZip+',IN&appid='+apiKey);
    getFromKey(newZip, apiKey)
    
    .then(function(data)
    {
        postData('http:/localhost:8000/add',{date: newDate, content: feel, temp: data.main.temp});
    })
    .then(
        updateUI()
    )

});

const updateUI = async () => 
{
    const request = await fetch('http:/localhost:8000/newData')
    try
    {
        const allData = await request.json();
        document.getElementById('date').innerHTML=allData.date;
        document.getElementById('temp').innerHTML=allData.temp;
        document.getElementById('content').innerHTML=allData.content;
    }
    catch(error)
    {
        console.log("error",error);
    }
}


//api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={your api key}

