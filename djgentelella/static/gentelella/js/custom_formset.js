(() => {

    const formset_prefix = document.querySelector("#model-prefix").value;
    const formset_list = document.querySelector("#formset-list");
    //console.log(formset_list.childNodes)
    const formset_list_jquery = $("#formset_list")
    const formset_template = document.querySelector("#formset-template").innerHTML;
    const add_button = document.querySelector("#add-form");
    var delete_buttons_dict = {};
    const error_msj = document.querySelector("#error-msj");


    // Control variables
    //Formset management inputs
    let [TOTAL_FORMS_INPUT, INITIAL_FORMS_INPUT, MIN_NUM_FORMS_INPUT, MAX_NUM_FORMS_INPUT] = $("#formset-management").find('input');
    //Values of each formset management input
    let [TOTAL_FORMS, INITIAL_FORMS, MIN_NUM_FORMS, MAX_NUM_FORMS] = [TOTAL_FORMS_INPUT.value, INITIAL_FORMS_INPUT.value, MIN_NUM_FORMS_INPUT.value, MAX_NUM_FORMS_INPUT.value];

    // ------------------------ FUNCTIONS ------------------------

    //It's necessary because when the page is refreshed the total number of forms still same as the last
    const refresh_forms_number = () => {
        const forms_number = formset_list.childElementCount; //Returns the number of forms that formset_list contains
        update_management_information('reset', forms_number);
    };

    const update_management_information = (operation, current_number = 0) => {
        if (operation == 'add') {
            TOTAL_FORMS_INPUT.value = TOTAL_FORMS + 1;
            TOTAL_FORMS += 1;
        }
        else if (operation == 'delete') {
            TOTAL_FORMS_INPUT.value = TOTAL_FORMS - 1;
            TOTAL_FORMS -= 1;
        }
        else if (operation == 'reset') {
            TOTAL_FORMS_INPUT.value = current_number;
            TOTAL_FORMS = current_number;
        }
    };

    const can_add_forms = () => {
        let can_add = ((TOTAL_FORMS + 1) > MAX_NUM_FORMS) ? false : true;

        return can_add;
    };

    const can_delete_forms = () => {
        let can_delete = ((TOTAL_FORMS - 1) < MIN_NUM_FORMS) ? false : true;

        return can_delete;
    };

    const create_new_form = (next_form_number) => {
        const new_form = document.createElement('div');
        new_form.setAttribute("id", `${formset_prefix}-${next_form_number}`);
        new_form.innerHTML = formset_template.replace(/__prefix__/gi, next_form_number);
        delete_buttons_dict[new_form.childNodes[1].lastChild.previousElementSibling.id] = new_form.getAttribute("id");

        return new_form;
    };

    const add_new_form = (next_form_number) => {
        const new_form = create_new_form(next_form_number);
        formset_list.append(new_form);
    };


    // ------------------------ EVENTS ------------------------
    const events = () => {

        add_button.addEventListener('click', () => {
            if (can_add_forms()) {
                add_new_form(TOTAL_FORMS);
                update_management_information('add');
            }
            else {
                error_msj.innerHTML = `You can add only ${MAX_NUM_FORMS} forms`;
            }

        });

        delete_form = (id) => {
            if (can_delete_forms()) {
                element = document.querySelector(`#${delete_buttons_dict[id]}`);
                element.parentNode.removeChild(element);
                console.log(formset_list.childNodes)
                delete delete_buttons_dict[id];
                update_management_information("delete");
            }
            else {
                error_msj.innerHTML = `You can only have at minimum ${MIN_NUM_FORMS} forms`;
            }
        };
    };

    // ------------------------ JS initialization ------------------------

    const init = () => {
        refresh_forms_number();
        events();
        //for i=0 < TOTAL_FORMS i++
        //delete_buttons_dict[formset_list.childNodes] = new_form.getAttribute("id");
        console.log(formset_list_jquery.find('input[id="'+formset_prefix+'-0"]').val())
    };

    init();
})();