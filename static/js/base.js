function reset(){
    document.getElementById('inp1').value = ''
    document.getElementById('inp2').value = ''
    document.getElementById('dropdownLabel').textContent = 'Select an option'
}

function getCSRFToken() {
    let cookieValue = null;
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith('csrftoken=')) {
            cookieValue = cookie.substring('csrftoken='.length, cookie.length);
            break;
        }
    }
    return cookieValue;
}

async function postData(url, data) {
    const csrftoken = getCSRFToken();

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken  // Attach CSRF token
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();  // Parse JSON response
}




function calculate(){
    const x = document.getElementById('inp1').value;
    const y = document.getElementById('inp2').value;


    const label = document.getElementById('dropdownLabel');
    const state = document.getElementById('round4').checked;
    var newx = 0;
    var newy = 0;
    var newoption = '';
    option = label.textContent;
    if(option == 'P(𝑥<y)'){
        newy = parseFloat(y-1);
        newoption = 'lessthan';
    }
    else if(option == 'P(𝑥>y)') {
        newy = parseFloat(y-1);
        newoption = 'greaterthan';
    }
    else if(option == 'P(𝑥<=y)') {
        newy = parseFloat(y);
        newoption = 'lessthan';
    }
    else if(option == 'P(𝑥>=y)') {
        newy = parseFloat(y);
        newoption = 'greaterthan';
    }
    else if(option == 'P(x<𝑥<y)') {
        newy = parseFloat(y-1);
        newx = parseFloat(x-1);
        newoption = 'between'
    }
    else if(option == 'P(x<=𝑥<=y)') {
        newy = parseFloat(y);
        newx = parseFloat(x);
        newoption = 'between'
    }
    var minval = document.getElementById('minval').value;
    var maxval = document.getElementById('maxval').value;
    if(newoption=='lessthan' || newoption == 'greaterthan'){
        if(!(y > minval && y < maxval)){
            alert(`Please Choose y value in between ${minval} - ${maxval}`);
            return;
        }
    }
    else{
        if(!(y > minval && y < maxval) && !(x > minval && x < maxval)){
            console.log(x,y)
            alert(`Please Choose x or y values in between ${minval} - ${maxval}`);
            return;
        }
    }
    
    senddata = {
        'x': newx,
        'y': newy,
        'option': newoption,
        'state': state,
    }
    postData("/calculate/", senddata)
    .then(data => {
        console.log(option)
        if(newoption == 'greaterthan' || newoption == 'lessthan'){
            displayChart1(data.data, y, 0, option)
            displayChart2(data.data, y, 0, option)
            document.getElementById('probability').innerHTML = data.p
            document.getElementById('per').innerHTML = data.per
            document.getElementById('mean').innerHTML = data.mean
            if(option =='P(𝑥<y)'){
                document.getElementById('optionof1').innerHTML = 'P(𝑥&lt;y)'
                document.getElementById('optionof2').innerHTML = 'P(𝑥&lt;y)' + ' x 100'
            }
            else{
                document.getElementById('optionof1').innerHTML = option
                document.getElementById('optionof2').innerHTML = option + ' x 100'
            }
        }
        else{
            displayChart1(data.data, x, y, option)
            displayChart2(data.data, x, y, option)
            document.getElementById('probability').innerHTML = data.p
            document.getElementById('per').innerHTML = data.per
            document.getElementById('mean').innerHTML = data.mean
            if(option = 'P(x<𝑥<y)'){
                document.getElementById('optionof1').innerHTML = 'P(x&lt;𝑥&lt;y)'
                document.getElementById('optionof2').innerHTML = 'P(x&lt;𝑥&lt;y)' + ' x 100'
            }
            else{
                document.getElementById('optionof1').innerHTML = option
                document.getElementById('optionof2').innerHTML = option + ' x 100'
            }
        }
    }
    )
    .catch(error => console.error("Error:", error));
}

function updatedStatement(){
    const x = document.getElementById('inp1').value;
    const y = document.getElementById('inp2').value;
    const statement = document.getElementById('statment');
    const label = document.getElementById('dropdownLabel');
    option = label.textContent;
    if(option == 'P(𝑥<y)'){
        statement.textContent = `P(𝑥<${y})`;
    }
    else if(option == 'P(𝑥>y)') {
        statement.textContent = `P(𝑥>${y})`;
    }
    else if(option == 'P(𝑥<=y)') {
        statement.textContent = `P(𝑥<=${y})`;
    }
    else if(option == 'P(𝑥>=y)') {
        statement.textContent = `P(𝑥>=${y})`;
    }
    else if(option == 'P(x<𝑥<y)') {
        statement.textContent = `P(${x}<𝑥<${y})`;
    }
    else if(option == 'P(x<=𝑥<=y)') {
        statement.textContent = `P(${x}<=𝑥<=${y})`;
    }
}
function toggleDropdown() {
    const menu = document.getElementById('dropdownMenu');
    const icon = document.getElementById('basic-dropdown-icon');
    icon.style.transform = menu.classList.contains('hidden') ? 'rotate(180deg)' : 'rotate(0deg)';
    menu.classList.toggle('hidden');

}

function selectOption(option) {
    const label = document.getElementById('dropdownLabel');
    label.textContent = option;
    console.log(option);
    if(option == 'P(𝑥<y)' || option == 'P(𝑥>y)' || option == 'P(𝑥<=y)' || option == 'P(𝑥>=y)') {
        document.getElementById('inp1').classList.add('hidden');
    }
    else{
        document.getElementById('inp1').classList.remove('hidden');
    }
    toggleDropdown();
    updatedStatement();
}

document.addEventListener('click', (e) => {
    const dropdown = document.getElementById('dropdownMenu');
    const trigger = e.target.closest('button');

    if (!trigger && !dropdown.contains(e.target)) {
        dropdown.classList.add('hidden');
    }
});