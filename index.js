window.onload = () => {
    const loginFormBTN = document.getElementById('loginFormBTN');
    const loginForm = document.getElementById('loginForm');

    const apilink = "https://purple-cherry-974e.princeojeda52.workers.dev/";

    loginFormBTN.addEventListener('click', async (e) => {
        e.preventDefault();
        
        const username = loginForm.username.value;
        const password = loginForm.password.value;

        console.log(username, password);

        await fetch(apilink + 'api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        }).then((res) => {
            console.log(res);
            if (res.status === 200) {
                window.location.href = '/home';
            } else {
                alert('Invalid credentials');
            }
        })

        console.log('done');


    });


}