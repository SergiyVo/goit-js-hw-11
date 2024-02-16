import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');

form.addEventListener('submit', e => {
    e.preventDefault();

    const delay = form.elements.delay.value.trim();
    const state = e.target.elements.state.value;
    
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === 'fulfilled') {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay);
    });
    
    promise.then((delay) => {
        iziToast.show({
            message: `✅ Fulfilled promise in ${delay}ms`,
            messageColor: 'white',
            backgroundColor: '#59A10D',
            position: 'topRight',
        });
    }).catch((delay) => {
        iziToast.show({
            message: `❌ Rejected promise in ${delay}ms`,
            messageColor: 'white',
            backgroundColor: '#EF4040',
            position: 'topRight',
        });

    });
  
    e.target.reset();
  
});




