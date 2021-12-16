console.log("My Library")

// contructor
function Book(name,author,type){
    this.name=this.name;
    this.author=author;
    this.type=type;
}

// display constructor
function Display(){

}

// add methods to display prototype
Display.prototype.add =function(book){
    console.log("ye")
    let tableBody=document.getElementById('tableBody');
    let uiString=`<tr>
                <td>${book.name}</td>
                <td>${book.author}</td>
                <td>${book.type}</td>
                </tr>`;
    tableBody.innerHTML+=uiString;
}

// IMPLEMENTING THE CLEAR FINCTION
Display.prototype.clear =function(){
    let libraryForm=document.getElementById('libraryForm')
    libraryForm.reset();
}

// IMPLEMENTING THE VALIDATE FINCTION
Display.prototype.validate =function(book){
    if( book.name.length<2 || book.author.length<2 ){
        return false;
    }
    else{
        return true;
    }
}

Display.prototype.show =function(type,displayMessage){
    let message=document.getElementById('message');
    message.innerHTML=`<div class="alert alert-alert alert-dismissible fade show" role="alert">
                        <strong>Message!</strong> ${displayMessage}
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>`;
    setTimeout(() => {
        message.innerHTML='';
    }, 2000);
    
}

// add submit event listener to libraryForm
let libraryForm=document.getElementById('libraryForm')
libraryForm.addEventListener('submit',libraryFormSubmit)

function libraryFormSubmit(e){
    // forms on submit reload the page to avoid this we use preventDefault
    e.preventDefault();
    console.log(e)
    let name= document.getElementById('bookName').value;
    let author= document.getElementById('author').value;
    
    let fiction= document.getElementById('fiction');
    let programming= document.getElementById('programming');
    let cooking= document.getElementById('cooking');
    let type;

    if (fiction.checked){
        type=fiction.value;
    }
    else if (programming.checked){
        type=programming.value;
    }
    else if (cooking.checked){
        type=cooking.value;
    }
    
    let book=new Book(name,author,type);

    let display=new Display();
    if (display.validate(book)){
        display.add(book);
        display.show('success','Your book has been successfully added.');
        display.clear();
    }
    else{
        display.show('danger','sorry you cannot add this book.');
    }
    
}