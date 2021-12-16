console.log("with ES6 class")


class Book{
    constructor(name,author,type){
        this.name=name;
        this.author=author;
        this.type=type;
    }
}


class Display{
    add(book){
        let tableBody=document.getElementById('tableBody');
        let uiString=`<tr>
                    <td>${book.name}</td>
                    <td>${book.author}</td>
                    <td>${book.type}</td>
                    <td><button type="button" id="delete" class="btn btn-primary" onclick='deleteBook(this)'>Delete</button></td>
                    </tr>`;
        tableBody.innerHTML+=uiString;
        let obj = JSON.parse( localStorage.getItem('obj') ) || {};
        obj[book.name] = [book.name,book.author,book.type];
        localStorage.setItem('obj', JSON.stringify(obj));
    }
    clear(){
        let libraryForm=document.getElementById('libraryForm')
        libraryForm.reset();
    }
    validate(book){
        if( book.name.length<2 || book.author.length<2 ){
            return false;
        }
        else{
            return true;
        }
    }
    show(type,displayMessage){
        let message=document.getElementById('message');
        let boldText;
        if (type==='success'){
            boldText='Success'
        }
        else if(type==='secondary'){
            boldText='Delete'
        }
        else{
            boldText='Error'
        }
        message.innerHTML=`<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                            <strong>${boldText}!</strong> ${displayMessage}
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>`;
        setTimeout(() => {
            message.innerHTML='';
        }, 5000);
        
    }
    mydelete(deleteBtn){
        let html=deleteBtn.parentNode.parentNode;
        let x=html.innerText;
        let bookName=x.split("\t")[0];

        //deleting from local storage
        let obj = JSON.parse( localStorage.getItem('obj') );
        delete obj[bookName]
        localStorage.setItem('obj', JSON.stringify(obj));
        // console.log(html)
        // console.log(bookName)

        //deleting from page
        html.remove()
    }
    
}

showBooks();
function showBooks(){
    let books=localStorage.getItem('obj');
    let tableBody=document.getElementById('tableBody');
    if(books==null){
        tableBody.innerHTML='';
    }else{
        let obj = JSON.parse( localStorage.getItem('obj') )
        for (let i in obj) {
            let uiString=`<tr>
                    <td>${obj[i][0]}</td>
                    <td>${obj[i][1]}</td>
                    <td>${obj[i][2]}</td>
                    <td><button type="button" id="delete" class="btn btn-primary" onclick='deleteBook(this)'>Delete</button></td>
                    </tr>`;
            tableBody.innerHTML+=uiString;  
            }
        }
    }


// add submit event listener to libraryForm
let libraryForm=document.getElementById('libraryForm')
libraryForm.addEventListener('submit',libraryFormSubmit)

function libraryFormSubmit(e){
    // console.log(e)
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
    
    // forms on submit reload the page to avoid this we use preventDefault
    e.preventDefault();
}

//Add eventlistener to the Delete button
function deleteBook(element){
    let display=new Display();
    display.mydelete(element);
    display.show('secondary','book has been deleted successfully!');
}


