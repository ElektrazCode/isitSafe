const updateAllergyBtns = document.querySelectorAll('.editAllergyBtn');
const removeAllergyBtns = document.querySelectorAll('.deleteAllergyBtn');

updateAllergyBtns.forEach(btn => btn.addEventListener('click', updateAllergy));
// removeAllergyBtns.forEach(btn => btn.addEventListener('click', removeAllergy(e)));

function updateAllergy(){
    const item = this.parentElement.parentElement.querySelector('span').textContent;
    const value = document.querySelector('.allergyValue').value;
    console.log(value);
    fetch('/allergies', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            allergy: item
        })
    })
}

// function removeAllergy(e){
//     console.log(e.target);
//     fetch('/allergies', {
//         method: 'delete',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({
//             allergy: e.target
//         })
//     })
// }