(() => {

    const formset_prefix = document.querySelector("#model-prefix").value;
    const formset_list = document.querySelector("#formset-list");
    const formset_template = document.querySelector("#formset-template").innerHTML;
    const add_button = document.querySelector("#add-form");

    // Control variables
    //Formset management inputs
    let [TOTAL_FORMS_INPUT, INITIAL_FORMS_INPUT, MIN_NUM_FORMS_INPUT, MAX_NUM_FORMS_INPUT] = $("#formset-management").find('input');
    //Values of each formset management input
    let [TOTAL_FORMS, INITIAL_FORMS, MIN_NUM_FORMS, MAX_NUM_FORMS] = [TOTAL_FORMS_INPUT.value, INITIAL_FORMS_INPUT.value, MIN_NUM_FORMS_INPUT.value, MAX_NUM_FORMS_INPUT.value];
    
    // ------------------------ FUNCTIONS ------------------------

    //It's necessary because when the page is refreshed the total number of forms still same as the last
    const refresh_forms_number = () => {
        const forms_number = formset_list.childElementCount; //Returns the number of forms that formset_list contains
        console.log(forms_number);
        update_management_information('reset', forms_number);
    };

    const update_management_information = (operation, current_number = 0) => {
        if (operation == 'add') {
            TOTAL_FORMS_INPUT.value = TOTAL_FORMS + 1;
            TOTAL_FORMS += 1;
        }
        else if (operation == 'delete') {
            // TODO
        }
        else if (operation == 'reset') {
            console.log("Entreee");
            TOTAL_FORMS_INPUT.value = current_number;
            TOTAL_FORMS = current_number;
        }
    };

    const verify_max_num_forms = () => {
        console.log(MAX_NUM_FORMS);
        console.log(TOTAL_FORMS);
    };

    const create_new_form = (next_form_number) => {
        const new_form = document.createElement('div');
        new_form.setAttribute("id", `${formset_prefix}-${next_form_number}`);
        new_form.innerHTML = formset_template.replace(/__prefix__/gi, next_form_number);
        return new_form;
    };

    const add_new_form = (next_form_number) => {
        verify_max_num_forms();
        const new_form = create_new_form(next_form_number);
        formset_list.append(new_form);
    };

    // ------------------------ EVENTS ------------------------
    const events = () => {
        add_button.addEventListener('click', () => {
            add_new_form(TOTAL_FORMS);
            update_management_information('add');
        });

        /*document.getElementsByName("deleteBtn").addEventListener("click", () => {
            alert("Brinquemos!")
        });*/
    };

    // ------------------------ JS initialization ------------------------

    const init = () => {
        refresh_forms_number();
        events();
    };

    init();
})();