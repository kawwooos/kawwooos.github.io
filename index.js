const currentURL = window.location.href;
const path = window.location.pathname;
let paths = path.split('/');


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


        if (currentURL.includes("profile")) {
            hideprofile();
            fetch('/profile/profile2.html', {
                method: 'GET',
            }).then((res) => {
                res.text().then((data) => {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(data, 'text/html');
                    const profileContainer = doc.getElementsByClassName('signed')[0];

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

    }

    // const apilink = "https://purple-cherry-974e.princeojeda52.workers.dev/";
    // const apilink = "https://wild-mouse-612a.princeojeda52.workers.dev/";
    const apilink = "http://127.0.0.1:8787/";

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

                document.getElementsByTagName('main')[0].appendChild(div);
                document.getElementsByTagName('main')[0].appendChild(closerdiv);

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

                    // await fetch(apilink + '', {
                    //     mode: 'no-cors', // Change to 'cors' if your server supports CORS
                    //     method: 'POST',
                    //     headers: {
                    //         'Content-Type': 'application/json',
                    //     },
                    //     body: JSON.stringify({ username, password }),
                    // }).then((res) => {
                    //     console.log(res);
                    //     if (res.status === 200) {
                    //         window.location.href = '/home';
                    //     } else {
                    //         alert('Invalid credentials');
                    //     }
                    // })

                    // const xhr = new XMLHttpRequest();
                    // xhr.open('POST', apilink + 'api/login', true);
                    // xhr.setRequestHeader('Content-Type', 'application/json');
                    // xhr.onreadystatechange = () => {
                    //     if (xhr.readyState === 4) {
                    //         if (xhr.status === 200) {
                    //             window.location.href = '/home';
                    //         } else {
                    //             alert('Invalid credentials');
                    //         }
                    //     }
                    // }
                    // xhr.send(JSON.stringify({ username, password }))

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

                document.getElementsByTagName('main')[0].appendChild(div);
                document.getElementsByTagName('main')[0].appendChild(closerdiv);

                const signupForm = document.getElementById('signupForm');
                const signupFormBTN = document.getElementById('signupFormBTN');

                signupFormBTN.addEventListener('click', async (e) => {
                    e.preventDefault();

                    const cred1 = signupForm.cred1.value;
                    const username = signupForm.username.value;
                    const name = signupForm.name.value;
                    const password = signupForm.password.value;

                    await fetch(apilink + 'api/register', {
                        mode: 'no-cors',
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ cred1, username, name, password }),
                    }).then((res) => {
                        console.log(res);
                        if (res.status === 200) {
                            window.location.href = '/';
                        } else {
                            alert('Invalid credentials');
                        }
                    })
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