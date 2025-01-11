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

    const ms = Number(form.elements.delay.value);

    const radioBtnVal = form.elements.state.value;

    const promise = ms => {
        return new Promise((resolve, reject) => {
            if (radioBtnVal === 'fulfilled') {
                setTimeout(() => { return resolve() }, ms);
            }
            if (radioBtnVal === 'rejected') {
                setTimeout(() => { return reject() }, ms);
            }
        });
    }

    promise(ms)
        .then((value) => iziToast.success({

            message: `Fulfilled promise in ${ms}ms`,
        }))
        .catch((err) => iziToast.error({
            message: `Rejected promise in ${ms}ms`,
        }));
});