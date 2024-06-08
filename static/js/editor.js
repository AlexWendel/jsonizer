document.addEventListener('DOMContentLoaded',()=>{
    let preview = document.getElementById("json-preview");
    let inputs = document.getElementById("inputs");
    let jsonizer = new JSONizer(inputs);
    preview.value = "";
    preview.value = jsonizer.toString();
    inputs.addEventListener("change", ()=>{
        preview.value = jsonizer.toString();
    })
}); 
