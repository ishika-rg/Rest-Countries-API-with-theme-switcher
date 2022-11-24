const card_container = document.querySelector('.card_container');
console.log(card_container)
const navbar = document.querySelector('.container');
const regionName = document.getElementsByClassName('regionName')
const card = document.querySelectorAll('.card')
const loader = document.querySelector('.loading');

// =================modal js ================
const modal = document.querySelector('.modal_container');
const back = document.querySelector('.back_btn')



function displayLoading(){
    // loader.classList.add('display');

    loader.style.display = "block";

//     setTimeout(() => {
//         loader.style.display = "block";
//     }, 5000
//     )
}

function hideLoading(){
   
    loader.style.display = "none";

}




const request = function (url){
    displayLoading()
   
    fetch('https://restcountries.com/v3.1/all')
    .then(function(response){
       // console.log(response);
        return response.json();
    })
    .then(function(data){
        console.log(data);
       
        hideLoading();

        data.forEach(element => {
           renderCountry(element);
           //console.log(element.name.common)
          

        });

    })
    .catch(error => 
        console.log(error)
        
        )
}
request()


function renderCountry(data){
const card = document.createElement('div');
card.classList.add('card');
card.innerHTML = `
<div class="card_img">
<img src = "${data.flags.png}">
</div>
<div class="card_title">${data.name.common}</div>
<div class="card_info">
<p>Population: <span>${data.population}</span></p>
<p>Region: <span class = regionName>${data.region}</span></p>
<p>Capital: <span>${data.capital}</span></p>
</div>
`
card_container.appendChild(card)

//console.log(card)

card.addEventListener('click', () => {
    modal.style.display = 'block';
    navbar.style.display = 'none';
    card_container.style.display = 'none'


 

    showCountryDetails(data)

})
}


// ==========================countryDetail function========

function showCountryDetails(data){
    // modal.style.display ="block";


    

    
    
   

    let final = "";
    Object.keys(data.currencies).forEach((el) => {
        //console.log(el)
        const value = data.currencies[el]
        //console.log(value)
    
       if(typeof(value) === 'object'){
            if(value.name){
               final += value.name;
              // console.log(final)
            }
        }
    })

    let lang = [];
    Object.values(data.languages).forEach((ele) => {
        lang.push(ele);
       
    })
     //console.log(lang);






    modal.innerHTML =  `<div class="modal">
    <button class="back_btn"><i class="fa fa-long-arrow-left" aria-hidden="true"></i>Back</button>
    <div class="modal_card">
        <div class="modal_img">
            <img src = "${data.flags.png}" >
        </div>
        <div class="modal_card_info">
            <div class="name">
                <h2>${data.name.common}</h2>
            </div>
            <div class="details">
                <div class="left">
                    <p>Native Name: <span>${data.name.official}</span></p>
                    <p>Population: <span>${data.population}</span> </p>
                    <p> Region:   <span>${data.region}</span></p>
                    <p> Sub region:   <span>${data.subregion}</span></p>
                    <p>Capital:    <span>${data.capital}</span></p>

                </div>
                <div class="right">
                    <p>Top Level Domain:   <span>${data.tld}</span></p>
                    <p>Curriencies:    <span> ${final} </span></p>
                    <p>Languages:      <span>${lang}</span></p>
                </div>
            </div>

            <div class="borders">
                <p>Border Countries: </p><span class="border_country">
                
                
                   
                </span>
            </div>
            
        </div>

    </div>
    </div>`

    const b_btn = document.createElement('div');
      b_btn.classList.add('border')


    if(data.borders){
        data.borders.forEach((border) => {
            fetch(`https://restcountries.com/v3.1/alpha/${border} `)
            .then((res) => res.json())
            .then((output) => {
                //console.log(output)

                output.forEach((e) => {
                    //console.log(e.name.common);

                    const border_btn = document.createElement('button');
                    border_btn.innerText = `${e.name.common}`;
                    border_btn.addEventListener('click', function(){
                        showCountryDetails(e);       
                    })

                    b_btn.appendChild(border_btn);

                })
                
            })
        })
    } else{
        const border_btn = document.createElement('div');
        border_btn.classList.add('null')
        border_btn.innerText = "NULL";
        b_btn.appendChild(border_btn);
    
    }
    
    const main_div  =  document.querySelector('.border_country');
    main_div.appendChild(b_btn)

   

    const back = document.querySelector('.back_btn')

    back.addEventListener('click', () => {
    modal.style.display = "none";
    navbar.style.display = "flex";
    card_container.style.display = "flex";

    

})




}

 


// =================dark mode js ================== //

const darkMode = document.querySelector('.theme_btn')
//console.log(darkMode)

darkMode.addEventListener('click', function(){
    //console.log("this is theme btn")
    document.body.classList.toggle('dark_theme')
})

// =======================region wise cards js ==============//



function callRegions(){

        const continent = document.querySelectorAll('.region');
        //console.log(continent)
        Array.from(continent).forEach(function(ele){
            ele.addEventListener('click', () => {
            console.log(ele.innerHTML)
            })
        })

    }



// ================search functionality =======================

const search = document.querySelector('.search');

//let search_term = "";

let namesArr = [];



search.addEventListener('keyup', (e) => {
    //console.log(search.value)

   const search_term = e.target.value.toLowerCase();
   const country_name = document.querySelectorAll('.card_title');
   //console.log(country_name);


  
   function getCountry(){

    country_name.forEach((ele) => {
        // console.log(ele.innerText);
  
        namesArr.push(ele.innerText);
        
  
        if(ele.innerText.toLowerCase().includes(search_term)){
            ele.parentElement.style.display = "block";
  
  
        }
         else{
          ele.parentElement.style.display = "none";
  
         
         // NotFound();
  
          //const e = new Error('Result Not Found');
          //console.log(e)
  
        }    

   })
}

if(search_term.length > 0){
    getCountry();

}
else if(search_term.length === 0){
    throw new Error("Please enter a valid country name");
}
else{
    alert("This country does not exist!!!");
}

});






// ==================filter js=============
 

const dropbtn = document.querySelector('.dropbtn');
//console.log(dropbtn.innerText)
const drop_content =  document.getElementById('myDropdown');

const region = document.querySelectorAll('.region');
console.log(region)

dropbtn.addEventListener('click', () => {
    //console.log('hellooooo')
    drop_content.classList.toggle('show');
})

region.forEach( el => {
    el.addEventListener('click', () => {
        //console.log(el.innerText);

        dropbtn.innerHTML = `${el.innerText}
              <i class="fa fa-caret-down" aria-hidden="true"></i>`

        Array.from(regionName).forEach(ele => {
            //console.log(ele)
            if(ele.innerText.includes(el.innerText) || el.innerText == 'All'){

                ele.parentElement.parentElement.parentElement.style.display = 'block';
            }
            else{
                ele.parentElement.parentElement.parentElement.style.display = 'none';
            }
        })

    })


})

