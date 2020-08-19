(() => {

    const prefix = document.querySelector("#model-prefix").value;
    const formset_list = document.querySelector("#formset-list");
    const formset_template = document.querySelector("#formset-template").innerHTML;
    const add_button = document.querySelector("#add-form");

    // Control variables
    let [TOTAL_FORMS, INITIAL_FORMS, MIN_NUM_FORMS, MAX_NUM_FORMS] = $("#formset-management").find('input');
    console.log(TOTAL_FORMS);
    console.log(TOTAL_FORMS.value);

    // ------------------------ FUNCTIONS ------------------------
    //TODO : take into account the forms that already exist on the page (now it is only for situations where there are no forms)
    // const get_next_form_number = (current_number) => {
    //     next_number = 0;
    //     if (current_number > 0) {
    //         next_number = parseInt(current_number) + 1;
    //     }
    //     return next_number;
    // };

    const create_new_form = (next_form_number) => {
        const new_form = document.createElement('div');
        const delete_button = create_delete_button();
        new_form.setAttribute("id", `${prefix}-${next_form_number}`);
        new_form.innerHTML = formset_template.replace(/__prefix__/gi, next_form_number);
        new_form.appendChild(delete_button);
        new_form.innerHTML += "<hr>";
        formset_list.append(new_form);
    };

    const create_delete_button = () => {
        const deleteBtn = document.createElement('button');
        deleteBtn.id = `btn-delete-${TOTAL_FORMS.value}`;
        deleteBtn.setAttribute("class", "btn btn-danger");
        deleteBtn.setAttribute("name", "deleteBtn");
        deleteBtn.textContent = 'Delete form';
        return deleteBtn;
    };

    const update_management_information = (operation) => {
        if (operation == 'add') {
            TOTAL_FORMS.value = parseInt(TOTAL_FORMS.value) + 1;
        }
        else if (operation == 'delete') {
            // TODO
        }
    };

    // ------------------------ EVENTS ------------------------

    add_button.addEventListener('click', () => {
        create_new_form(TOTAL_FORMS.value);
        update_management_information('add');
    });

    /*document.getElementsByName("deleteBtn").addEventListener("click", () => {
        alert("Brinquemos!")
    });*/
})();