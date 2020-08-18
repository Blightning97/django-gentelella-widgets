(() => {
    const prefix = document.querySelector("#model-prefix").value;
    console.log(prefix);
    let INITIAL_FORMS = parseInt(document.querySelector(`#id_${prefix}-INITIAL_FORMS`).value);
    const total_forms_input = document.querySelector(`#id_${prefix}-TOTAL_FORMS`);
    const addBtn = document.querySelector("#add-form");
    const formContainer = $("#form-container");
    let formInputs = formContainer.find("input");
    const form_test = document.querySelector("#form-test");



    // for (const iterator of formInputs) {

    //     iterator.id = iterator.id.replace('__prefix__', MAX_FORMS);
    //     iterator.name = iterator.name.replace('__prefix__', MAX_FORMS);
    //     console.log(iterator);
    // }

    //     <div id="{{form.prefix}}">
    //     {{ form.as_horizontal }}
    //     <a class="btn btn-danger" id="btn-delete-{{form.prefix}}">Delete form</a>
    //     <input type="text" value="{{form.prefix}}">
    // </div>


    addBtn.addEventListener('click', () => {
        console.log(INITIAL_FORMS);
        const div = document.createElement('div');
        div.id = `div-${INITIAL_FORMS}`;


        for (const input of formInputs) {
            const new_input = input.cloneNode(true);

            new_input.id = new_input.id.replace('__prefix__', INITIAL_FORMS);
            new_input.name = new_input.name.replace('__prefix__', INITIAL_FORMS);
            const hr = document.createElement('hr');
            div.appendChild(new_input);
            div.appendChild(hr);
        }

        console.log(div);
        form_test.appendChild(div);
        INITIAL_FORMS += 1;
        total_forms_input.value = INITIAL_FORMS;
    });

})();