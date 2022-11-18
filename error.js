setTimeout(() => {
    if(document.getElementById("root").innerHTML !== '') return;
    document.getElementById("error").innerHTML = "Oops..."
}, 2000);
