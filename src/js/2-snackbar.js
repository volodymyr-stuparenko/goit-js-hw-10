import iziToast from "izitoast";

const form = document.querySelector('.form');
const inputDelay = document.querySelector('.input-delay');
const btnSubmit = document.querySelector('.btn-form');
const radioBtnFul = document.querySelector('[value=fulfilled]');
const radioBtnRej = document.querySelector('[value=rejected]');
const radioButtons = document.querySelectorAll('input[name="state"]');

setTimeout(() => {
    iziToast.info({
        title: 'Hi',
        message: 'Welcome',
    });
}, 500);

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const delay = Number(form.elements.delay.value);

    const state = form.elements.state.value;

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === 'fulfilled') {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay);
    });

    promise
        .then((delay) => {
            iziToast.success({
                title: 'Success',
                message: `✅ Fulfilled promise in ${delay}ms`,
            });
        })
        .catch((delay) => {
            iziToast.error({
                title: 'Error',
                message: `❌ Rejected promise in ${delay}ms`,
            });
        });
    });