const currentURL = window.location.href;
const path = window.location.pathname;
let paths = path.split('/');
// const apilink = "https://purple-cherry-974e.princeojeda52.workers.dev/";
// const apilink = "https://wild-mouse-612a.princeojeda52.workers.dev/";
const apilink = "http://127.0.0.1:8787/";

let recommendedToursList = []

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
            if (responseData.success) {
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
                        span2.innerText = tour.price;
                        tourCard.appendChild(img);
                        tourCard.appendChild(span);
                        tourCard.appendChild(p);
                        tourCard.appendChild(span2);
                        tourlistdiv.appendChild(tourCard);
                    }

                    recommendedTourDiv.appendChild(tourlistdiv);

                }
                const img = document.createElement('img');
                img.src = tours[i].thumbnail;
                img.alt = tours[i].name;
                const span = document.createElement('span');
                span.innerText = tours[i].name;
                card.appendChild(img);
                card.appendChild(span);
            }

            container.appendChild(h2);
            container.appendChild(countryList);
            section.appendChild(container);

            if (recommendedToursList.length > 0) {
                document.getElementsByTagName('main')[0].appendChild(section);
            }
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
            for (let i = 0; i < countries.length; i++) {
                const country = countries[i];
                const countryCard = document.createElement('div');
                countryCard.className = 'country-card';
                countryCard.innerHTML = `<img src="/images/${country}.jpg" alt="${country}"><span>${country}</span>`;
                countryContainer.appendChild(countryCard);
            }
        });
    }


}

window.onload = () => {

    const hideloginandregister = () => {
        const headerButtons = document.getElementsByClassName('header-buttons')[0];

        headerButtons.style.display = 'none';

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
                        profileContainer.querySelector('.profile-description-text').innerText = profile_description;
                        profileContainer.querySelector('.user-visits-description').innerText = user_visits_description;
                        profileContainer.querySelector('.profile-name').innerText = fullname;


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