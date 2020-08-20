(() => {

    const formset_prefix = document.querySelector("#model-prefix").value;
    const formset_list = document.querySelector("#formset-list");
    const formset_template = document.querySelector("#formset-template").innerHTML;
    const add_button = document.querySelector("#add-form");

    // Control variables
    let [TOTAL_FORMS, INITIAL_FORMS, MIN_NUM_FORMS, MAX_NUM_FORMS] = $("#formset-management").find('input');
   
    // ------------------------ FUNCTIONS ------------------------

    //It's necessary because when the page is refreshed the total number of forms still same as the last
    const refresh_forms_number = () => {
        const forms_number = formset_list.childElementCount; //Returns the number of forms that formset_list contains
        update_management_information('reset', forms_number);
    };

    const create_new_form = (next_form_number) => {
        const new_form = document.createElement('div');
        const delete_button = create_delete_button();
        new_form.setAttribute("id", `${formset_prefix}-${next_form_number}`);
        new_form.innerHTML = formset_template.replace(/__prefix__/gi, next_form_number);
        new_form.appendChild(delete_button);
        new_form.innerHTML += "<hr>";
        return new_form;
    };

    const create_delete_button = () => {
        const deleteBtn = document.createElement('button');
        deleteBtn.id = `btn-delete-${TOTAL_FORMS.value}`;
        deleteBtn.setAttribute("class", "btn btn-danger");
        deleteBtn.setAttribute("name", "deleteBtn");
        deleteBtn.textContent = 'Delete form';
        return deleteBtn;
    };

    const add_new_form = (next_form_number) => {
        const new_form = create_new_form(next_form_number);
        formset_list.append(new_form);
    };

    const update_management_information = (operation, current_number = 0) => {
        if (operation == 'add') {
            TOTAL_FORMS.value = parseInt(TOTAL_FORMS.value) + 1;
        }
        else if (operation == 'delete') {
            // TODO
        }
        else if (operation == 'reset') {
            TOTAL_FORMS.value = current_number;
        }
    };

    // ------------------------ EVENTS ------------------------
    const events = () => {
        add_button.addEventListener('click', () => {
            add_new_form(TOTAL_FORMS.value);
            update_management_information('add');
        });

        /*document.getElementsByName("deleteBtn").addEventListener("click", () => {
            alert("Brinquemos!")
        });*/
    }



    // ------------------------ JS initialization ------------------------

    const init = () => {
        refresh_forms_number();
        events();
    };

    init();
})();