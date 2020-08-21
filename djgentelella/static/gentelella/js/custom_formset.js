(() => {

    const formset_prefix = document.querySelector("#model-prefix").value;
    const formset_template = document.querySelector("#formset-template").innerHTML;
    const formset_list_div = document.querySelector("#formset-list");
    const formset_list = formset_list_div.querySelectorAll('section');
    const add_button = document.querySelector("#add-form");
    const error_msj = document.querySelector("#error-msj");
    const forms_order = [];
    var delete_buttons_dict = {};
    let forms_added = 0;
    let index = 0;


    // Control variables
    //Formset management inputs
    let [TOTAL_FORMS_INPUT, INITIAL_FORMS_INPUT, MIN_NUM_FORMS_INPUT, MAX_NUM_FORMS_INPUT] = $("#formset-management").find('input');
    //Values of each formset management input
    let [TOTAL_FORMS, INITIAL_FORMS, MIN_NUM_FORMS, MAX_NUM_FORMS] = [TOTAL_FORMS_INPUT.value, INITIAL_FORMS_INPUT.value, MIN_NUM_FORMS_INPUT.value, MAX_NUM_FORMS_INPUT.value];

    // ------------------------ FUNCTIONS ------------------------

    //It's necessary because when the page is refreshed the total number of forms still same as the last
    const init_start_data = () => {
        const forms_number = formset_list.length;
        update_management_information('reset', forms_number);
        for (const form of formset_list) {
            register_form(form);
        }
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
            forms_added = current_number;
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
        const new_form = document.createElement('section');
        new_form.setAttribute("id", `${formset_prefix}-${next_form_number}`);
        new_form.innerHTML = formset_template.replace(/__prefix__/gi, next_form_number);
        //Ask Jason what does this line do
        delete_buttons_dict[new_form.childNodes[1].lastChild.previousElementSibling.id] = new_form.getAttribute("id");

        return new_form;
    };

    const add_new_form = (next_form_number) => {
        const new_form = create_new_form(next_form_number);
        formset_list_div.append(new_form);
        register_form(new_form);
        forms_added += 1;
    };

    const register_form = (form) => {

        forms_order.push({
            'form': form,
            'prefix': form.id,
            'index': index,
            'order': index,
            'create_buttons_event': () => {
                document.querySelector(`#btn-down-${form.id}`).addEventListener('click', () => {
                    switch_form(form.id);

                });
                document.querySelector(`#btn-up-${form.id}`).addEventListener('click', () => { console.log(`up ${form.id}`); });
                document.querySelector(#btn-delete-${form.id}).addEventListener('click', () => { delete_form(${form.id}) });
            },
            'set_order': () => {
                document.querySelector(`#id_${form.id}-ORDER`).value = index;
            },

        });

        forms_order[index].create_buttons_event();
        forms_order[index].set_order();
        index++;
    };

    const switch_form = (prefix) => {
        const form = forms_order.filter(form => form.prefix == prefix)[0];
        const brother = (form.order < forms_order.length) ? forms_order[form.order + 1] : null;
        if (brother) {
            insert_form_before(form.form, brother.form);
            brother.order -= 1;
            form.order += 1;
            forms_order.sort(sort_forms);

        }
    };

    const insert_form_before = (current_form, next_form) => {
        const current_form_order_input = document.querySelector(`#id_${current_form.id}-ORDER`);
        const next_form_order_input = document.querySelector(`#id_${next_form.id}-ORDER`);
        const next_value = parseInt(current_form_order_input.value) + 1;
        const current_value = parseInt(next_form_order_input.value) - 1;

        current_form_order_input.value = next_value;
        next_form_order_input.value = current_value;

        current_form.parentNode.insertBefore(next_form, current_form);

    };

    const sort_forms = (form_a, form_b) => {
        if (form_a.order < form_b.order) {
            return -1;
        }
        if (form_a.order > form_b.order) {
            return 1;
        }
        return 0;
    };

    // ------------------------ EVENTS ------------------------
    const events = () => {

        add_button.addEventListener('click', () => {
            if (can_add_forms()) {
                add_new_form(forms_added); //BEFORE HERE WAS TOTAL_FORMS AS A PARAMETER
                update_management_information('add');
            }
            else {
                error_msj.innerHTML = `You can only add ${MAX_NUM_FORMS} forms a a maximum`;
            }

        });

        delete_form = (id) => {
            //form = forms_order.filter(form => form.prefix == prefix)[0];
            //alert(form)
            alert(id)
            /*if (can_delete_forms()) {
                element = document.querySelector(`#${delete_buttons_dict[id]}`);
                element.parentNode.removeChild(element);
                console.log(formset_list_div.childNodes)
                delete delete_buttons_dict[id];
                update_management_information("delete");
            }
            else {
                error_msj.innerHTML = `You can only have at minimum ${MIN_NUM_FORMS} forms`;
            }*/
        };
    };

    // ------------------------ JS initialization ------------------------

    const init = () => {
        init_start_data();
        events();
        //for i=0 < TOTAL_FORMS i++
        //delete_buttons_dict[formset_list_div.childNodes] = new_form.getAttribute("id");
        // console.log(formset_list_div_jquery.find('input[id="'+formset_prefix+'-0"]').val())
    };

    // --------------------- TEST ---------------------





    init();
})();