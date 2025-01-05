const API = 'https://restcountries.com/v3.1/all'

async function fetchData(){
    try {
        const response = await fetch(API)
        const data = await response.json()
        console.log(data)
        renderCountryData(data)
    }catch(error){
        console.log(error)
    }
}
fetchData()

const inputField = document.querySelector("input")
const searchButton = document.querySelector("button")

const results = document.querySelector(".results")
function renderCountryData(data){
    searchButton.addEventListener("click", function(){
        const selectedCountry = inputField.value.toLocaleLowerCase()
        const countryData = data.filter(country => country.name.common.toLowerCase() === selectedCountry)
        if(countryData.length > 0){
            results.innerHTML = ""
            resultsTemplate = `
            <div class="country">
                <h2>${countryData[0].name.common}</h2>
                <div class="flag-img">
                    <img src="${countryData[0].flags.png}" alt="flag">
                </div>
                <p><b>Capital</b>: ${countryData[0].capital}</p>
                <p><b>Region</b>: ${countryData[0].region}</p>
                <p><b>Population</b>: ${countryData[0].population}</p>
                <p><b>Languages</b>: ${Object.values(countryData[0].languages).join(", ")}</p>
            </div>
            `
            results.insertAdjacentHTML("beforeend", resultsTemplate)
        }else{
            results.innerHTML = "<h2>Country not found</h2>"
        }
        inputField.value = ""
    })
}