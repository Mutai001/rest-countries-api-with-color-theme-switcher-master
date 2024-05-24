const restapi_url = 'https://restcountries.com/v3.1/all';


async function getapi(url) {
    const response = await fetch(url);
    let data = await response.json();
    console.log(data);
    if (response) {
        hideloader();
    }
    show(data);
}

getapi(restapi_url);

function hideloader() {
    document.getElementById('loading').style.display = 'none';
}

function show(data) {
    let tab = '';

    for (const r of data) {
        tab += `
        <div class="country-category">
            <a href="country.html" class="country-link" data-code="${r.cca2}">
                <div class="country-image">
                    <img src=${r.flags.png} width="330" height="230"/>   
                </div>
                <div class="country-data">
                    <h3>${r.name.official}</h3>
                    <p><b>Population</b>: ${r.population}</p>
                    <p><b>Region</b>: ${r.region}</p>
                    <p><b>Capital</b>: ${r.capital}</p>
                </div>
            </a>
        </div>
        `;
    }

    document.getElementById("countries").innerHTML = tab;
}


// Search input
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', filterCountries);

// Region filter
const regionFilter = document.getElementById('search');
regionFilter.addEventListener('change', filterCountries);

function filterCountries() {
    const filterValue = searchInput.value.toLowerCase();
    const countryCategories = document.getElementsByClassName('country-category');

    for (const category of countryCategories) {
        const countryName = category.querySelector('h3').innerText.toLowerCase();
        const countryRegion = category.querySelector('p:nth-child(3)').innerText
            .replace('Region:', '').trim().toLowerCase();

        if (countryName.includes(filterValue) || regionFilter.value === 'all' || countryRegion.includes(regionFilter.value.toLowerCase())) {
            category.style.display = 'grid';
        } else {
            category.style.display = 'none';
        }
    }
}




// Change theme
function changeTheme() {
    document.body.classList.toggle('darkmode');
    document.querySelector('.container').classList.toggle('darkmode');
    document.querySelector('.header').classList.toggle('darkmode');
    document.querySelector('.search-countries').classList.toggle('darkmode');
    document.querySelector('.search-bar').classList.toggle('darkmode');
    document.querySelector('#countries').classList.toggle('darkmode');

    const inputs = document.querySelectorAll('input[type="text"], input[type="search"]');
    inputs.forEach(input => input.classList.toggle('darkmode'));

    const selects = document.querySelectorAll('select');
    selects.forEach(select => select.classList.toggle('darkmode'));

    const countryCategories = document.querySelectorAll('.country-category');
    countryCategories.forEach(category => category.classList.toggle('darkmode'));
}