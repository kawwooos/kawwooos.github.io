const currentURL = window.location.href;
const path = window.location.pathname;
let paths = path.split('/');
let apilink = "https://purple-cherry-974e.princeojeda52.workers.dev/";
// let apilink = "http://127.0.0.1:8787/";

let recommendedToursList = []
let allCountriesList = []

const showDescrEditor = () => {
    const hiddeneditor = document.createElement('div');
    hiddeneditor.className = 'hidden-editor';
    hiddeneditor.innerHTML = `<textarea id="profileDescEditor" placeholder="Enter your profile description here..."></textarea><button onclick="saveprofiledesc()">Save</button>`;
    document.getElementsByTagName('main')[0].appendChild(hiddeneditor);

    const closerdiv = document.createElement('div');
    closerdiv.className = 'closerdiv3';
    closerdiv.onclick = () => {
        hiddeneditor.remove();
        closerdiv.remove();
    };
    closerdiv.style = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); z-index: 0;';
    closerdiv.style.display = 'block';
    document.getElementsByTagName('main')[0].appendChild(closerdiv);
}

const saveprofiledesc = async () => {
    const profileDescEditor = document.getElementById('profileDescEditor');
    const profileDesc = profileDescEditor.value;

    // save to cookie profile description
    document.cookie = `profile_description=${profileDesc}; path=/`;

    window.location.href = '/profile';
}

const seeallcountries = (e) => {
    e.preventDefault();

    const seeallcountrybtn = document.getElementById('seeallcountrybtn');
    seeallcountrybtn.style.display = 'none';

    const countryContainer = document.getElementsByClassName('country-list')[0];
    countryContainer.innerHTML = '';

    for (let i = 0; i < allCountriesList.length; i++) {
        try {
            const country = allCountriesList[i];
            const countryCard = document.createElement('div');
            countryCard.className = 'country-card';
            countryCard.innerHTML = `<img src="${country.thumbnail}" alt="${country.name}"><span>${country.name}</span>`;
            countryCard.onclick = () => {
                window.location.href = `/tours/${country.name}`;
            }
            countryContainer.appendChild(countryCard);
        } catch (error) {

        }
    }

    countryContainer.classList.add('all-countries');

}

const filterBudget = () => {
    const budget = document.getElementById('budget').value;
    const countryContainer = document.getElementsByClassName('country-list')[0];
    countryContainer.innerHTML = '';

    for (let i = 0; i < allCountriesList.length; i++) {
        try {
            const country = allCountriesList[i];
            const countryCard = document.createElement('div');
            const countryBudget = Intl.NumberFormat('en-PH', { maximumSignificantDigits: 3 }).format(country.budget);
            if (countryBudget == budget) {
                countryCard.className = 'country-card';
                countryCard.innerHTML = `<img src="${country.thumbnail}" alt="${country.name}"><span>${country.name}</span>`;
                countryCard.onclick = () => {
                    window.location.href = `/tours/${country.name}`;
                }
                countryContainer.appendChild(countryCard);
            }
        } catch (error) {

        }
    }
}

const filterCountries = () => {
    const searchInput = document.getElementById('search-country');
    const searchValue = searchInput.value.toLowerCase();
    const countryContainer = document.getElementsByClassName('country-list')[0];
    const countryCards = countryContainer.getElementsByClassName('country-card');

    const filter = document.getElementById('filter');
    const filterValue = filter.value.toLowerCase();

    if (filterValue === 'most-visited') {
        const budgetFilter = document.getElementById('budget-filter');
        budgetFilter.classList.add('hidden');

        console.log(allCountriesList);
        const sortedCountries = allCountriesList.sort((a, b) => b.visits - a.visits);

        countryContainer.innerHTML = '';

        for (let i = 0; i < sortedCountries.length; i++) {
            try {
                const country = sortedCountries[i];
                const countryCard = document.createElement('div');
                countryCard.className = 'country-card';
                countryCard.innerHTML = `<img src="${country.thumbnail}" alt="${country.name}"><span>${country.name}</span>`;
                countryCard.onclick = () => {
                    window.location.href = `/tours/${country.name}`;
                }
                countryContainer.appendChild(countryCard);
            } catch (error) {

            }
        }

    } else if (filterValue === 'alphabetical') {
        const budgetFilter = document.getElementById('budget-filter');
        budgetFilter.classList.add('hidden');

        const sortedCountries = allCountriesList.sort((a, b) => a.name.localeCompare(b.name));

        countryContainer.innerHTML = '';

        for (let i = 0; i < sortedCountries.length; i++) {
            try {
                const country = sortedCountries[i];
                const countryCard = document.createElement('div');
                countryCard.className = 'country-card';
                countryCard.innerHTML = `<img src="${country.thumbnail}" alt="${country.name}"><span>${country.name}</span>`;
                countryCard.onclick = () => {
                    window.location.href = `/tours/${country.name}`;
                }
                countryContainer.appendChild(countryCard);
            } catch (error) {

            }
        }
    } else if (filterValue === 'budget') {

        const budgetFilter = document.getElementById('budget-filter');
        budgetFilter.classList.remove('hidden');

        const sortedCountries = allCountriesList.sort((a, b) => a.budget - b.budget);

        countryContainer.innerHTML = '';

        let budgets = []

        for (let i = 0; i < sortedCountries.length; i++) {
            try {
                const country = sortedCountries[i];
                const countryCard = document.createElement('div');
                const budget = Intl.NumberFormat('en-PH', { maximumSignificantDigits: 3 }).format(country.budget);
                if (!budgets.includes(budget)) {
                    budgets.push(budget);
                    const budgetOption = document.createElement('option');
                    budgetOption.value = budget;
                    budgetOption.innerText = budget;
                    document.getElementById("budget").appendChild(budgetOption);
                }
            } catch (error) {

            }
        }

        for (let i = 0; i < sortedCountries.length; i++) {
            try {
                const budget = Intl.NumberFormat('en-PH', { maximumSignificantDigits: 3 }).format(sortedCountries[i].budget);

                if (budget == document.getElementById('budget').value) {
                    const country = sortedCountries[i];
                    const countryCard = document.createElement('div');
                    countryCard.className = 'country-card';
                    countryCard.innerHTML = `<img src="${country.thumbnail}" alt="${country.name}"><span>${country.name}</span>`;
                    countryCard.onclick = () => {
                        window.location.href = `/tours/${country.name}`;
                    }
                    countryContainer.appendChild(countryCard);
                }
            } catch (error) {

            }
        }
    }

}

const searchCountry = async (e) => {
    e.preventDefault();

    const searchInput = document.getElementById('search-country');
    const searchValue = searchInput.value.toLowerCase();

    if (searchValue.length > 0) {
        const filteredCountries = allCountriesList.filter(country => country.name.toLowerCase().includes(searchValue));
        const countryContainer = document.getElementsByClassName('country-list')[0];
        countryContainer.innerHTML = '';

        for (let i = 0; i < filteredCountries.length; i++) {
            try {
                const country = filteredCountries[i];
                const countryCard = document.createElement('div');
                countryCard.className = 'country-card';
                countryCard.innerHTML = `<img src="${country.thumbnail}" alt="${country.name}"><span>${country.name}</span>`;
                countryCard.onclick = () => {
                    window.location.href = `/tours/${country.name}`;
                }
                countryContainer.appendChild(countryCard);
            } catch (error) {

            }
        }
    }

}

const addToTravelList = async () => {
    // current url is /tours/{country}/{tour}
    const country = decodeURIComponent(paths[2]);
    const tour = decodeURIComponent(paths[3]);
    const token = document.cookie.split(';').find(cookie => cookie.includes('token')).split('=')[1];

    try {
        const response = await fetch(apilink + 'api/add-to-travel-list', {
            mode: 'cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token, country, tour }),
        });

        if (response.ok) {
            const responseData = await response.json();
            if (responseData.status === 200) {
                alert('Added to travel list');
            } else {
                alert('Failed to add to travel list');
            }
        } else {
            alert('Failed to add to travel list');
        }
    } catch (error) {
        console.error('Error with POST request:', error);
        alert('Failed to add to travel list');
    }
}


const getAllCountries = async () => {
    try {
        const response = await fetch(apilink + 'api/countries', {
            mode: 'cors',
            method: 'GET',
        });

        if (response.ok) {
            const responseData = await response.json();
            allCountriesList = responseData;
            return responseData;
        } else {
            console.error('Failed to get countries');
        }
    } catch (error) {
        console.error('Error with GET request:', error);
    }
}

const getTopTenCountries = async () => {
    try {
        const response = await fetch(apilink + 'api/top-ten-countries', {
            mode: 'cors',
            method: 'GET',
        });

        if (response.ok) {
            const responseData = await response.json();
            return responseData;
        } else {
            console.error('Failed to get top ten countries');
        }
    } catch (error) {
        console.error('Error with GET request:', error);
    }
}

const getRecommendedTours = async () => {
    try {
        const response = await fetch(apilink + `api/recommended-tours`, {
            mode: 'cors',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            const responseData = await response.json();
            return responseData;
        } else {
            console.error('Failed to get recommended tours');
        }
    } catch (error) {
        console.error('Error with GET request:', error);
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

const loggedIn = () => {
    let cookies = document.cookie.split(';');
    let cookieObj = {};
    cookies.forEach(cookie => {
        let [key, value] = cookie.split('=');
        try {
            cookieObj[key.trim()] = value.trim();
        } catch (error) {
        }
    });

    if (cookieObj.token) {
        return true;
    } else {
        return false;
    }
}

function truncateText(text, wordLimit) {
    const words = text.split(' ');
    if (words.length > wordLimit) {
        return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
}

if (paths[1] === "" || paths[1] === "index.html") {

    getTopTenCountries().then(countries => {
        document.getElementsByClassName('country-list')[0].innerHTML = '';
        for (let i = 0; i < countries.length; i++) {
            const country = countries[i];
            const countryCard = document.createElement('div');
            countryCard.className = 'country-card';
            countryCard.innerHTML = `<img src="${country.thumbnail}" alt="${country.name}"><span>${capitalizeFirstLetter(country.name)}</span>`;
            document.getElementsByClassName('country-list')[0].appendChild(countryCard);

            try {
                countryCard.addEventListener('click', () => {
                    const country = countryCard.getElementsByTagName('span')[0].innerText;
                    window.location.href = `/tours/${country}`;
                });
            } catch (error) {

            }
        }

        if (!loggedIn()) {
            const loading = document.getElementsByClassName('loading')[0];
            loading.style.display = 'none';
        }
    });

    if (loggedIn()) {
        // recommended tours
        getRecommendedTours().then(tours => {
            // const recommendedToursContainer = document.getElementsByClassName('recommended-tours')[0];
            const section = document.createElement('section');
            const container = document.createElement('div');
            container.className = 'container';
            const h2 = document.createElement('h2');
            h2.innerText = 'Recommended Tours';
            const countryList = document.createElement('div');
            countryList.className = 'country-list';

            recommendedToursList = tours;

            for (let i = 0; i < tours.length; i++) {
                const card = document.createElement('div');
                card.className = 'country-card';
                card.onclick = () => {

                    const recommendedTourDiv = document.createElement('div');
                    recommendedTourDiv.className = 'recommended-tours';
                    const h3 = document.createElement('h3');
                    h3.innerText = "Recommended Tours in " + tours[i].name;
                    recommendedTourDiv.appendChild(h3);

                    const tourlistdiv = document.createElement('div');
                    tourlistdiv.className = 'tour-list';
                    for (let j = 0; j < tours[i].tours.length; j++) {
                        const tour = tours[i].tours[j];
                        const tourCard = document.createElement('div');
                        tourCard.className = 'tour-card';
                        tourCard.onclick = () => {
                            window.location.href = `/tours/${tours[i].name}/${tour.name}`;
                        }
                        const img = document.createElement('img');
                        img.src = tour.thumbnail;
                        img.alt = tour.name;
                        const span = document.createElement('span');
                        span.innerText = tour.name;
                        const p = document.createElement('p');
                        p.innerText = truncateText(tour.description, 50);
                        const span2 = document.createElement('span');
                        console.log(tours);
                        span2.innerText = tour.ratings;
                        tourCard.appendChild(img);
                        tourCard.appendChild(span);
                        tourCard.appendChild(p);
                        tourCard.appendChild(span2);
                        tourlistdiv.appendChild(tourCard);
                    }

                    recommendedTourDiv.appendChild(tourlistdiv);
                    document.getElementsByTagName('main')[0].appendChild(recommendedTourDiv);

                    const closerdiv = document.createElement('div');
                    closerdiv.className = 'closerdiv2';
                    closerdiv.onclick = () => {
                        recommendedTourDiv.remove();
                        closerdiv.remove();
                    };
                    closerdiv.style = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); z-index: 0;';
                    closerdiv.style.display = 'block';
                    document.getElementsByTagName('main')[0].appendChild(closerdiv);

                }
                const img = document.createElement('img');
                img.src = tours[i].thumbnail;
                img.alt = tours[i].name;
                const span = document.createElement('span');
                span.innerText = tours[i].name;
                card.appendChild(img);
                card.appendChild(span);
                countryList.appendChild(card);
            }

            container.appendChild(h2);
            container.appendChild(countryList);
            section.appendChild(container);

            if (recommendedToursList.length > 0) {
                document.getElementsByTagName('main')[0].appendChild(section);
            }
            const loading = document.getElementsByClassName('loading')[0];
            loading.style.display = 'none';
        });
    }


}

if (paths[1] === "tours") {

    let country = '';
    try {
        country = paths[2];
    } catch (error) {
        country = '';
    }

    if (!country) {

        getAllCountries().then(countries => {
            const countryContainer = document.getElementsByClassName('country-list')[0];

            let maxlength = 10;
            if (countries.length < 10) {
                maxlength = countries.length;
            }

            for (let i = 0; i < maxlength; i++) {
                try {
                    const country = countries[i];
                    const countryCard = document.createElement('div');
                    countryCard.className = 'country-card';
                    countryCard.innerHTML = `<img src="${country.thumbnail}" alt="${country.name}"><span>${country.name}</span>`;
                    countryCard.onclick = () => {
                        window.location.href = `/tours/${country.name}`;
                    }
                    countryContainer.appendChild(countryCard);
                } catch (error) {

                }
            }

            const loading = document.getElementsByClassName('loading')[0];
            loading.style.display = 'none';
        });
    }


}

window.onload = () => {

    const hideloginandregister = () => {
        const headerButtons = document.getElementsByClassName('header-buttons')[0];

        try {
            headerButtons.style.display = 'none';
        } catch (error) {
            
        }

    }

    const hideprofile = () => {
        const profile = document.getElementsByClassName('unsigned')[0];
        profile.remove();
    }

    // see cookies
    let cookies = document.cookie.split(';');
    let cookieObj = {};
    cookies.forEach(cookie => {
        let [key, value] = cookie.split('=');
        try {
            cookieObj[key.trim()] = value.trim();
        } catch (error) {
        }
    });

    if (cookieObj.token) {
        hideloginandregister();

    }


    const setProfile = async (token) => {
        try {
            const response = await fetch(apilink + 'api/profile', {
                mode: 'cors',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token }),
            });

            if (response.ok) {

                let responseData = await response.json();
                responseData = responseData[0];
                const fullname = responseData.fullname;
                const profile_description = responseData.profile_description;
                const user_visits_description = responseData.user_visits_description;

                hideprofile();
                fetch('/profile/profile2.html', {
                    method: 'GET',
                }).then((res) => {
                    res.text().then((data) => {
                        const parser = new DOMParser();
                        const doc = parser.parseFromString(data, 'text/html');
                        const profileContainer = doc.getElementsByClassName('signed')[0];
                        console.log(profileContainer.querySelector('.profile-description-text'));
                        let profdesc;
                        if (profile_description) {
                            profdesc = profile_description;
                        } else if (document.cookie.split(';').find(cookie => cookie.includes('profile_description'))) {
                            profdesc = document.cookie.split(';').find(cookie => cookie.includes('profile_description')).split('=')[1];
                        } else {
                            profdesc = 'No description';
                        }
                        profileContainer.querySelector('.profile-description-text').innerText = profdesc;
                        profileContainer.querySelector('.user-visits-description').innerText = user_visits_description || 'No description';
                        profileContainer.querySelector('.profile-name').innerText = fullname;
                        const travelList = responseData.tours;

                        if (!travelList.length === 0) {

                            profileContainer.querySelector('.tour-list').innerHTML = '';

                        }

                        for (let i = 0; i < travelList.length; i++) {
                            const tour = travelList[i];
                            const tourCard = document.createElement('div');
                            tourCard.className = 'tour-card';
                            tourCard.onclick = () => {
                                window.location.href = `/tours/${tour.country}/${tour.name}`;
                            }
                            const img = document.createElement('img');
                            img.src = tour.tour_thumbnail;
                            img.alt = tour.tour_name;
                            const span = document.createElement('span');
                            span.innerText = tour.tour_name;
                            tourCard.appendChild(img);
                            tourCard.appendChild(span);
                            profileContainer.querySelector('.tour-list').appendChild(tourCard);

                        }


                        profileContainer.querySelector('.profile-description').addEventListener('click', () => {
                            console.log('edit profile description');
                            const hiddeneditor = document.createElement('div');
                            hiddeneditor.className = 'hidden-editor';
                            hiddeneditor.innerHTML = `<textarea id="profileDescEditor" placeholder="Enter your profile description here..."></textarea><button onclick="saveprofiledesc()">Save</button>`;
                            document.getElementsByTagName('main')[0].appendChild(hiddeneditor);

                            const closerdiv = document.createElement('div');
                            closerdiv.className = 'closerdiv3';
                            closerdiv.onclick = () => {
                                hiddeneditor.remove();
                                closerdiv.remove();
                            };
                            closerdiv.style = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); z-index: 0;';
                            closerdiv.style.display = 'block';
                            document.getElementsByTagName('main')[0].appendChild(closerdiv);

                        });



                        if (profileContainer) {
                            const section = document.createElement('section');
                            section.innerHTML = profileContainer.innerHTML;
                            section.className = 'signed';

                            document.getElementsByTagName('main')[0].appendChild(section);
                        } else {
                            console.error('Profile container not found in the fetched HTML.');
                        }
                    })
                })
            }
        } catch (error) {
            console.error('Error with POST request:', error);
        }

        const loading = document.getElementsByClassName('loading')[0];
        loading.style.display = 'none';


    }

    if (paths[1] === "profile") {

        if (cookieObj.token) {
            setProfile(cookieObj.token);
        } else {
            cookieObj.token = '';
            window.location.reload();
        }

    }

    fetch('/login/', {
        method: 'GET',
    }).then((res) => {
        res.text().then((data) => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');
            const loginFormContainer = doc.getElementsByClassName('login-form-container')[0];

            if (loginFormContainer) {
                let div = document.createElement('div');
                div.innerHTML = loginFormContainer.innerHTML;
                div.className = 'login-form-container';
                div.style.display = 'none';

                let closerdiv = document.createElement('div');
                closerdiv.className = 'closerdiv';
                closerdiv.onclick = () => {
                    div.style.display = 'none';
                    closerdiv.style.display = 'none';
                };
                closerdiv.style = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); z-index: 0;';
                closerdiv.style.display = 'none';

                try {
                    document.getElementsByTagName('main')[0].appendChild(div);
                    document.getElementsByTagName('main')[0].appendChild(closerdiv);

                } catch (error) {
                    return;
                }
                const loginFormBTN = document.getElementById('loginFormBTN');
                const loginForm = document.getElementById('loginForm');

                loginFormBTN.addEventListener('click', async (e) => {
                    e.preventDefault();

                    const username = loginForm.username.value;
                    const password = loginForm.password.value;

                    try {
                        const response = await fetch(apilink + 'api/login', {
                            mode: 'cors', // Ensure CORS mode is set
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ username, password }),
                        });

                        if (response.ok) {
                            // window.location.href = '/home';
                            const responseData = await response.json();
                            if (responseData.token) {
                                const token = responseData.token;
                                const expirationDate = responseData.expiration;
                                document.cookie = `token=${token}; expires=${expirationDate}; path=/`;

                                window.location.href = '/';
                            } else {
                                alert('Invalid credentials');
                            }
                        } else {
                            alert('Invalid credentials');
                        }
                    } catch (error) {
                        console.error('Error with POST request:', error);
                    }

                });

            } else {
                console.error('Login form container not found in the fetched HTML.');
            }
        })
    })

    fetch('/signup/', {
        method: 'GET',
    }).then((res) => {
        res.text().then((data) => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');
            const signupFormContainer = doc.getElementsByClassName('signup-form')[0];

            if (signupFormContainer) {
                let div = document.createElement('div');
                div.innerHTML = signupFormContainer.innerHTML;
                div.className = 'signup-form';
                div.style.display = 'none';

                let closerdiv = document.createElement('div');
                closerdiv.className = 'closerdiv1';
                closerdiv.onclick = () => {
                    div.style.display = 'none';
                    closerdiv.style.display = 'none';
                };
                closerdiv.style = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); z-index: 0;';
                closerdiv.style.display = 'none';

                try {
                    document.getElementsByTagName('main')[0].appendChild(div);
                    document.getElementsByTagName('main')[0].appendChild(closerdiv);

                } catch (error) {
                    return;
                }
                const signupForm = document.getElementById('signupForm');
                const signupFormBTN = document.getElementById('signupFormBTN');

                signupFormBTN.addEventListener('click', async (e) => {
                    e.preventDefault();

                    const cred1 = signupForm.cred1.value;
                    const username = signupForm.username.value;
                    const name = signupForm.name.value;
                    const password = signupForm.password.value;

                    try {
                        const response = await fetch(apilink + 'api/register', {
                            mode: 'cors',
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ cred1, username, name, password }),
                        })

                        if (response.ok) {
                            const responseData = await response.json();
                            if (responseData.token) {
                                const token = responseData.token;
                                const expirationDate = responseData.expiration;
                                document.cookie = `token=${token}; expires=${expirationDate}; path=/`;

                                window.location.href = '/';
                            } else {
                                alert('Failed to register');
                            }
                        } else {
                            alert('Failed to register');
                        }
                    } catch (error) {
                        console.error('Error with POST request:', error);
                        alert('Failed to register');
                    }


                });
            } else {
                console.error('Signup form container not found in the fetched HTML.');
            }
        })

    })

    const loginBTN = document.getElementsByClassName('loginBTN');
    const signupBTN = document.getElementsByClassName('signupBTN');

    // loginBTN.forEach(btn => {
    //     btn.addEventListener('click', async () => {
    //         console.log('login');
    //         await fetch('/login/', {
    //             method: 'GET',
    //         }).then((res) => {
    //             res.text().then((data) => {
    //                 document.getElementsByTagName('main')[0].innerHTML = data.getElementsByClassName('login-form-container')[0].innerHTML;
    //             })
    //         })
    //     });
    // });

    for (let i = 0; i < loginBTN.length; i++) {
        loginBTN[i].addEventListener('click', async () => {
            document.getElementsByClassName('login-form-container')[0].style.display = 'block';
            document.getElementsByClassName('closerdiv')[0].style.display = 'block';
        });
    }

    for (let i = 0; i < signupBTN.length; i++) {
        signupBTN[i].addEventListener('click', async () => {
            document.getElementsByClassName('signup-form')[0].style.display = 'block';
            document.getElementsByClassName('closerdiv1')[0].style.display = 'block';
        });
    }


    const countryCards = document.getElementsByClassName('country-card');
    for (let i = 0; i < countryCards.length; i++) {
        try {
            countryCards[i].addEventListener('click', () => {
                const country = countryCards[i].getElementsByTagName('span')[0].innerText;
                window.location.href = `/tours/${country}`;
            });
        } catch (error) {

        }
    }

}