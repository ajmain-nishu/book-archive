////////////////search button//////////////////
const searchBook = async () => {
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    searchField.value = "";

    //////empty value error////////
    if (searchText === '') {
        document.getElementById("search-total").innerText = "Please Write a Book Name";
        return;
    }

    /////spinner and book call//////////
    toggle('spinner', 'block');
    toggle('toggle-book', 'none');
    toggle('search-total', 'none');

    //////call api///////
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displaySearchBook(data);
};


///////toggle spinner, result, book function/////////////
const toggle = (input, toggleSearch) => {
    document.getElementById(input).style.display = toggleSearch;
}


///////////display book/////////////////
const displaySearchBook = data => {

    ///////totol found and error////////
    const dataNumber = data.numFound;
    const searchTotal = document.getElementById("search-total");
    if (dataNumber === 0) {
        searchTotal.innerText = "No Result Found";
    } else {
        searchTotal.innerText = `Total Search Result: ${String(dataNumber)}`;
    }
    
    ////////books column////////////
    const books = data.docs;
    const bookDetails = document.getElementById("book-details");
    bookDetails.textContent = "";
    books.forEach((book) => {
        const div = document.createElement("div");
        div.classList.add("col");
        div.innerHTML = `
            <div class="card h-100">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="image not found">
                <div class="card-body">
                <h6><span class="fw-bold">Book Name: </span>${book.title}</h6>
                <h6><span class="fw-bold">Author: </span>${book.author_name ? book.author_name[0] : "Not available"}</h6>
                <h6><span class="fw-bold">Publish: </span>${book.first_publish_year ? book.first_publish_year : "Not available"}</h6>
                <h6><span class="fw-bold">Publisher: </span>${book.publisher ? book.publisher[0] : "Not available"}</h6>
                </div>
            </div>
            `;
        bookDetails.appendChild(div);
    });

    /////spinner, book, result call/////////
    toggle('spinner', 'none');
    toggle('toggle-book', 'block');
    toggle('search-total', 'block');
};