let JSONizer = class {
    constructor(inputs_element){
        this.inputs_element = inputs_element;
    }

    generate_json(){
        let inputs = this.inputs_element.querySelectorAll('[jsonizer-type]');
        var json_data = {};
        [...inputs].forEach(element => {
            let element_name = element.getAttribute("jsonizer-name")
            switch (element.getAttribute("jsonizer-type")){
                case "boolean":
                    json_data[element_name] = element.checked;
                    break;

                case "url":
                    json_data[element_name] = element.value;
                    break;
                    
                case "table-selector":
                    let array_name = element.getAttribute("jsonizer-array");
                    let target_column = element.getAttribute("jsonizer-target-col");
                    if (!(array_name in json_data)){
                        json_data[array_name] = [];
                    }
                    
                    let table_rows = element.querySelectorAll("tbody > tr");
                    let selected_rows = Array.from(table_rows).filter(
                        (value) => value.querySelector("input[type=checkbox]").checked
                    ).map(
                        (item) =>{
                            let target = item.querySelector(`td[jsonizer-name=${target_column}]`);
                            return target.innerText;
                        }
                    );

                    if (selected_rows.length > 0){ 
                        json_data[array_name].push(selected_rows); 
                    }
                    break;
            }
        });
        return json_data;
    }

    toString(){
        return JSON.stringify(this.generate_json(), null, 8)
    }
    
}