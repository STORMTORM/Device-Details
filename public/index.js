function queryCheck(event) {
    const searchValue = event.target.value;
    if (searchValue.length < 3 || searchValue.length > 20) {
        autocompleteList.innerHTML = '';
        return;
    }
    console.log(searchValue);
    // fetch('/searchAutoComplete', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({ search: searchValue })
    // })
    // .then(response => response.json())
    // .then(data => { 
    //     autocompleteList.innerHTML = '',
    //     suggestions = data.slice(0, 5).map(item => {
    //         const acList = document.createElement('li');
    //         const button = document.createElement('button');
    //         button.innerHTML = item.name;
    //         acList.appendChild(button);
    //         button.addEventListener('click', () => {
    //             document.querySelector('input[name="search"]').value = button.innerHTML;
    //         })
    //         autocompleteList.appendChild(acList);
    // })}
}