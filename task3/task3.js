window.onload = init;

function init() {
    const accordion = document.getElementById("accordion");
    const accordionContentSet = document.getElementsByClassName("accordion__content");
    const accordionTitleSet = document.getElementsByClassName("accordion__title");

    //Add FontAwesome Icon to each title
    function addIconTitile(accordionTitleSet) {
        let i = 0;
        for (i; i < accordionTitleSet.length; i++) {
            const li = document.createElement('span');
            li.innerHTML = '<i class="fa fa-angle-right" aria-hidden="true"></i> ';
            accordionTitleSet[i].insertBefore(li, accordionTitleSet[i].firstChild);
        }
    }

    addIconTitile(accordionTitleSet);

    // Accorion handler    
    function accordionHandler(event) {
        const target = event.target;

        if (!target.classList.contains("accordion__title")) {
            return;
        }

        const accordionContent = target.parentNode.getElementsByClassName('accordion__content')[0];
        const icon = target.getElementsByClassName('fa')[0];

        if (!accordionContent) return;

        //Close all tabs that was opened
        function closeAnotherTabs() {
            let i = 0;
            for (i; i < accordionContentSet.length; i += 1) {
                if (accordionContentSet[i].classList.contains("accordion__content_opened")) {
                    const iconOpened = accordionContentSet[i].parentNode.getElementsByClassName('fa')[0];
                    iconOpened.classList.remove("fa-angle-down");
                    iconOpened.classList.add("fa-angle-right");
                    accordionContentSet[i].classList.remove("accordion__content_opened");
                    accordionTitleSet[i].classList.remove("accordion__title_selected");

                }
            }
        }

        // Open selected tab
        function openTab() {
            closeAnotherTabs();
            icon.classList.remove("fa-angle-right");
            icon.classList.add("fa-angle-down");
            accordionContent.classList.add("accordion__content_opened");
            target.classList.add("accordion__title_selected");
        }

        //Close selected tab
        function closeTab() {
            icon.classList.remove("fa-angle-down");
            icon.classList.add("fa-angle-right");
            accordionContent.classList.remove("accordion__content_opened");
            target.classList.remove("accordion__title_selected");
        }

        if (!accordionContent.classList.contains("accordion__content_opened")) {
            openTab();
        } else {
            closeTab();
        }
    }

    accordion.addEventListener('click', accordionHandler);
}