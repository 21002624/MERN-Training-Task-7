const API="http://universities.hipolabs.com/search?country=";
const container =document.getElementById('container');
const text=document.getElementById('text');
const btn=document.getElementById('btn');
const card=document.getElementById('card');
const superContainer= document.createElement('div');
document.body.appendChild(superContainer);
const listContainer=document.createElement('div');
listContainer.setAttribute('id','listContainer');
const searchContainer=document.createElement('div');
searchContainer.setAttribute('id','searchContainer');
const buttonContainer=document.createElement('div');
buttonContainer.setAttribute('id','buttonContainer');

function showLoadingIndicator() {
    const loading = document.createElement('div');
    loading.setAttribute('id', 'loading');
    loading.textContent = 'Loading...';
    superContainer.appendChild(loading);
}

function hideLoadingIndicator() {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.remove();
    }
}


function displayFunction(data){
    hideLoadingIndicator()
    superContainer.appendChild(searchContainer);
    data.forEach((university) => {
        const universityDiv = document.createElement('div');
        universityDiv.setAttribute('id','universityDiv');
                    universityDiv.innerHTML = `
                    <strong>University:</strong> ${university.name}<br>
                    <strong>Website:</strong> <a href="${university.web_pages[0]}" target="_blank">${university.web_pages[0]}</a><br>
                    <strong>State/Province:</strong> ${university['state-province'] || 'N/A'}
                    `;
                    listContainer.appendChild(universityDiv);
        
    });
    superContainer.appendChild(listContainer);
}
function homeFunction(){
    const home=document.createElement('button');
    home.textContent="Back Home";
    buttonContainer.appendChild(home);
    home.addEventListener('click',()=>{
        superContainer.innerHTML = '';
        document.body.appendChild(container); 
    })
    if (!buttonContainer.contains(home)) {
        buttonContainer.appendChild(home);
    }
}

function searchFunction(){
    searchContainer.innerHTML = ''; // Clear previous search elements
    buttonContainer.innerHTML = ''; // Clear previous buttons
    const find=document.createElement('input');
    find.setAttribute('id','find');
    find.placeholder="Search Filter";
    searchContainer.appendChild(find);

    const findBtn=document.createElement('button');
    findBtn.setAttribute('id','findBtn');
    findBtn.textContent="search";
    buttonContainer.appendChild(findBtn);
    searchContainer.appendChild(buttonContainer);
    // searchContainer.appendChild(findBtn);

    

    findBtn.addEventListener('click', () => {
        const searchTerm = find.value.trim().toLowerCase();
        const universityDivs = listContainer.querySelectorAll('div');
    
        universityDivs.forEach((universityDiv) => {
            const universityName = universityDiv.querySelector('strong').nextSibling.nodeValue.trim().toLowerCase();
            if (universityName.includes(searchTerm)) {
                universityDiv.style.display = 'block'; 
            } else {
                universityDiv.style.display = 'none'; 
            }
        });
    
    });
    homeFunction();
}





btn.addEventListener('click',()=>{
    
    const country=text.value;

    const existingWarning = card.querySelector('p.warning');
    if (existingWarning) {
        existingWarning.remove();
    }

    if (!country) {
        const warning = document.createElement('p');
        warning.textContent = "Please enter a country name.";
        warning.className = "warning"; // Add a class for easy removal
        card.appendChild(warning);
        return; 
    } else {
        superContainer.innerHTML = ''; // Clear previous results
    }
    container.remove();
    showLoadingIndicator();
    console.log(country);
    fetch(`${API}${encodeURIComponent(country)}`) 
    .then((res) => res.json())  
    .then((data) => {
        if (Array.isArray(data)) {  
            displayFunction(data);
        }
        else {
            document.body.innerHTML = 'No universities found.';
        }
    })
    .catch((error) => {
        hideLoadingIndicator(); // Ensures loading is hidden on error
        console.error('Error fetching data:', error);
        document.body.innerHTML = 'An error occurred while fetching data.';
    });
    
    
    searchFunction();
    // homeFunction();
})






