const updateAllergyBtns = document.querySelectorAll('.editAllergyBtn');
const removeAllergyBtns = document.querySelectorAll('.deleteAllergyBtn');

const updateSafeBtns = document.querySelectorAll('.editSafeBtn');
const removeSafeBtns = document.querySelectorAll('.deleteSafeBtn');

updateAllergyBtns.forEach(btn => btn.addEventListener('click', updateAllergy));
removeAllergyBtns.forEach(btn => btn.addEventListener('click', removeAllergy));

updateSafeBtns.forEach(btn => btn.addEventListener('click', updateSafe));
removeSafeBtns.forEach(btn => btn.addEventListener('click', removeSafe));

function updateAllergy(){
    const item = this.parentElement.parentElement.querySelector('span').textContent;
    const value = document.querySelector('.allergyValue').value;
    fetch('/allergies', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            allergy: item,
            value: value
        })
    })
    .then(res => {
        if(res.ok)
            return res.json();
    })
    .then(date=>{
        window.location.reload();
    })
}

function removeAllergy(){
    const item = this.parentElement.parentElement.querySelector('span').textContent;
    fetch('/allergies', {
        method: 'delete',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            allergy: item
        })
    })
    .then(res => {
        if(res.ok)
            return res.json();
    })
    .then(data=>{
        window.location.reload();
    })
}

function updateSafe(){
    const item = this.parentElement.parentElement.querySelector('span').textContent;
    const value = document.querySelector('.safeValue').value;
    fetch('/safeFood', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            safe: item,
            value: value
        })
    })
    .then(res => {
        if(res.ok)
            return res.json();
    })
    .then(date=>{
        window.location.reload();
    })
}

function removeSafe(){
    const item = this.parentElement.parentElement.querySelector('span').textContent;
    fetch('/safeFood', {
        method: 'delete',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            safe: item
        })
    })
    .then(res => {
        if(res.ok)
            return res.json();
    })
    .then(data=>{
        window.location.reload();
    })
}