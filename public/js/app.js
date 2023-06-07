
function onSubmit(e){
    e.preventDefault();
    
    const message = document.querySelector('#message').value;
    const experience = document.querySelector('#experience').value;
    const industry = document.querySelector('#industry').value;
    const negotiationSKill = document.querySelector('#negotiationSKill').value;
    if(message == '' || experience == '' || industry == '' || negotiationSKill == ''){
        showErrorMessage('Please all fields are required');
        return;
    }
    else{
        showErrorMessage('');
        
        generateAdviceRequest(message, experience, industry, negotiationSKill);

    }
}

async function generateAdviceRequest(message, experience, industry, negotiationSKill){
    
    try {
        showSpinner();
        
        const response = await fetch('http://localhost:5000/test/career', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                message, experience, industry, negotiationSKill
            })
        });

        if(!response.ok){
            removeSpinner();
            throw new Error('That request failed!')
        }

        const data = await response.json();
        
        removeSpinner();
        
        // var responseObject;
        // var responseContainer;
        let dataMessage = data.message;
        console.log(data);
        dataMessage.forEach(element => {
            
        //    let responseObject = document.createElement("<div class='mt-2'>${element}</div>");
          var rr = document.getElementById('response');
          var pp = document.createElement("div");
          rr.classList.add('p-5');
          pp.textContent = element+'\n';
          pp.classList.add('pt-2');
          rr.appendChild(pp);
        
        });
        


    } catch (error) {
        showErrorMessage(error);
    }
}

function showSpinner(){
    document.querySelector(".spinner-border").classList.remove('d-none');
}
function removeSpinner(){
    document.querySelector(".spinner-border").classList.add('d-none');
}

function showErrorMessage(error){
    document.querySelector(".error-message").textContent = error;
}

document.querySelector('#form').addEventListener('submit', onSubmit);