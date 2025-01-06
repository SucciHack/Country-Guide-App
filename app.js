const inputField = document.querySelector("input")
const searchButton = document.querySelector("button")

const results = document.querySelector(".results")


 function renderCountryData(){
    searchButton.addEventListener("click", async function(){
        const selectedCountry = inputField.value.toLocaleLowerCase()

        const finalURL = `https://restcountries.com/v3.1/name/${selectedCountry}?fullText=true`
        const response = await fetch(finalURL)
        const data = await response.json()
        // const countryData = data.filter(country => country.name.common.toLowerCase() === selectedCountry)
        if(data.length > 0){
            results.innerHTML = ""
            resultsTemplate = `
            <div class="country">
                <h2>${data[0].name.common}</h2>
                <div class="flag-img">
                    <img src="${data[0].flags.png}" alt="flag">
                </div>
                <p><b>Capital</b>: ${data[0].capital}</p>
                <p><b>Region</b>: ${data[0].region}</p>
                <p><b>Population</b>: ${data[0].population}</p>
                <p><b>Languages</b>: ${Object.values(data[0].languages).join(", ")}</p>
            </div>
            `
            results.insertAdjacentHTML("beforeend", resultsTemplate)
        }else{
            results.innerHTML = "<h2>Country not found</h2>"
        }
        inputField.value = ""
    })
}
renderCountryData()