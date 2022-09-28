// Accordion animation
const nftAccordionTabs = document.querySelectorAll('.nft__tab');
const nftAccordionContents = document.querySelectorAll('.nft__tab-inner');
const nftAccordionBtns = document.querySelectorAll('.nft__tab .btn-plus');

nftAccordionBtns.forEach((btn, i) => {
    btn.addEventListener('click', function () {
        btn.classList.toggle('active');
        nftAccordionTabs[i].classList.toggle('active');

        if (nftAccordionContents[i].style.maxHeight) {
            nftAccordionContents[i].style.maxHeight = null;
        } else {
            nftAccordionContents[i].style.maxHeight = nftAccordionContents[i].scrollHeight + 'px';
        }
    })
})

window.addEventListener('resize', function () {
    nftAccordionTabs.forEach((tab, i) => {
        if (tab.classList.contains('active'))  nftAccordionContents[i].style.maxHeight = nftAccordionContents[i].scrollHeight + 'px';
    })
})

// Purchase validation
const popup = document.querySelector('.popup');
const popupCloseBtn = popup.querySelector('.popup__btn-close');
const popupBg = popup.querySelector('.popup__bg');
const popupForm = popup.querySelector('.popup__form');
const popupInner = popup.querySelector('.popup__inner');
const popupThanksBtn = popup.querySelector('.popup__thanks-btn');

let cardIndex = 0;
let soldCardIndex = 0;

const firstNameInput = document.querySelector('.popup__input_fname');
const lastNameInput = document.querySelector('.popup__input_lname');
const emailInput = document.querySelector('.popup__input_email');
const numberInput = document.querySelector('.popup__input_number');

const submitBtn = document.querySelector('.popup__submit-btn');

firstNameInput.addEventListener('input', firstNameValidation);
lastNameInput.addEventListener('input', lastNameValidation);
emailInput.addEventListener('input', emailValidation);
numberInput.addEventListener('input', numberValidation);

submitBtn.addEventListener('click', function (e) {
    e.preventDefault();

    if (firstNameValidation() == true && lastNameValidation() == true && emailValidation() == true && numberValidation() == true) {
        let cardValue = cardIndex == 0 ? 'Silver' : 'Gold';
        popupInner.querySelector('.popup__descr span').innerHTML = `${cardValue} NFT Alexey Botvinov`;
        popupForm.classList.add('hide');
        popupInner.classList.remove('hide');

        soldCardIndex.classList.add('sold');

        let currentCardsLength = nftAccordionTabs[cardIndex].querySelectorAll('.nft__card:not(.sold)').length;
        let avaliable = nftAccordionTabs[cardIndex].querySelector('.nft__available');

        avaliable.innerHTML = currentCardsLength;

        return true;
    } else {
        return  false
    }
})

popupCloseBtn.addEventListener('click', closePopup);
popupBg.addEventListener('click', closePopup);
popupThanksBtn.addEventListener('click', closePopup);

// Buying cards
nftAccordionTabs.forEach((tab, i) => {
    const availableCards = tab.querySelector('.nft__available');

    const nftCards = Array.from(tab.querySelectorAll('.nft__card'));
    const nftCardBuy = tab.querySelectorAll('.nft__card-btn');

    const cardSwitcher = tab.querySelector('.switcher input');
    const cardSwitcherText = tab.querySelector('.nft__show-hide');

    cardSwitcher.addEventListener('click', function () {
        let soldCards = nftCards.filter(card => card.classList.contains('sold'));

        if (cardSwitcher.checked) {
            cardSwitcherText.innerHTML = 'Show sold posters';
            soldCards.forEach(card => card.classList.add('hide'));
        } else {
            cardSwitcherText.innerHTML = 'Hide sold posters';
            soldCards.forEach(card => card.classList.remove('hide'));

            if (tab.classList.contains('active')) nftAccordionContents[i].style.maxHeight = nftAccordionContents[i].scrollHeight + 'px';
        }
    })

    availableCards.innerHTML = nftCards.filter(card => !card.classList.contains('sold')).length;

    nftCardBuy.forEach((btn, j) => {
        btn.addEventListener('click', function () {
            popup.classList.add('active');
            cardIndex = i;
            soldCardIndex = nftCards[j];
        })
    })
})

// Functions to popup and validation

function closePopup() {
    popup.classList.remove('active');
    popupInner.classList.add('hide');
    popupForm.classList.remove('hide');
    firstNameInput.value = '';
    lastNameInput.value = '';
    emailInput.value = '';
    numberInput.value = '';
}

function firstNameValidation() {
    let errorField = document.querySelector('.popup__error_fname');

    let firstNameValue = firstNameInput.value.trim();
    let nameValid = /^[A-Za-z]+$/;

    if (firstNameValue === '') {
        errorField.innerHTML = 'First Name is required';
    } else if (!nameValid.test(firstNameValue)) {
        errorField.innerHTML = 'First Name must be only string without white spaces and numbers';
    } else {
        errorField.innerHTML = '';
        return true;
    }
}

function lastNameValidation() {
    let errorField = document.querySelector('.popup__error_lname');

    let lastNameValue = lastNameInput.value.trim();
    let nameValid = /^[A-Za-z]+$/;

    if (lastNameValue === '') {
        errorField.innerHTML = 'Last Name is required';
    } else if (!nameValid.test(lastNameValue)) {
        errorField.innerHTML = 'Last Name must be only string without white spaces and numbers';
    } else {
        errorField.innerHTML = '';
        return true;
    }
}

function emailValidation() {
    let errorField = document.querySelector('.popup__error_email');

    let emailValue = emailInput.value.trim();
    let emailValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (emailValue === '') {
        errorField.innerHTML = 'Email Address is required';
    } else if (!emailValid.test(emailValue)) {
        errorField.innerHTML = 'Email Address be valid formate with @ symbol';
    } else {
        errorField.innerHTML = '';
        return true;
    }
}

function numberValidation() {
    let errorField = document.querySelector('.popup__error_number');

    let numberValue = numberInput.value.trim();
    let numberValid = /^[0-9]*$/;

    this.value = this.value?.replace(/[^0-9]/g, ``);

    if (numberValue === '') {
        errorField.innerHTML = 'Mobile Number is required';
    } else if (!numberValid.test(numberValue)) {
        errorField.innerHTML = 'Mobile Number must be a number';
    } else if (numberValue.length >= 15) {
        errorField.innerHTML = 'Mobile number length is incorrect';
    } else {
        errorField.innerHTML = '';
        return true;
    }
}