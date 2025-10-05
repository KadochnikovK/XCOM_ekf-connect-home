document.addEventListener("DOMContentLoaded", function () {
    initForm('main-form');

    function initForm(formId) {
        const form = document.getElementById(formId);
        const formItems = form.querySelectorAll(".form__item");

        function clearErrors() {
            formItems.forEach((item) => {
                item.classList.remove("form__item--not-valid");
                const errorElement = item.querySelector(".error-message");
                if (errorElement) {
                    errorElement.style.display = "none";
                }
            });
        }

        function addError(element, message) {
            const formItem = element.closest(".form__item");
            formItem.classList.add("form__item--not-valid");

            let errorElement = formItem.querySelector(".error-message");
            if (!errorElement) {
                errorElement = document.createElement("div");
                errorElement.className = "error-message";
                formItem.appendChild(errorElement);
            }

            errorElement.textContent = message;
            errorElement.style.display = "block";
        }


        const inputs = form.querySelectorAll("input, textarea");
        inputs.forEach(input => {
            input.addEventListener('focus', handleInputFocus);
            input.addEventListener('blur', handleInputBlur);
        });

        function handleInputFocus(e) {
            const formItem = e.target.closest(".form__item");
            if (formItem) {
                formItem.classList.add("form__item--focused");

                const label = formItem.querySelector(".form__label");
                if (label) {
                    label.classList.add("label--focused");
                }
            }
        }

        function handleInputBlur(e) {
            const formItem = e.target.closest(".form__item");
            if (formItem) {
                formItem.classList.remove("form__item--focused");

                const label = formItem.querySelector(".form__label");
                if (label) {
                    label.classList.remove("label--focused");
                }
            }
        }

        function validateField(field) {
            const value = field.value.trim();
            const name = field.name;

            if (!value) {
                addError(field, "Это поле обязательно для заполнения");
                return false;
            }


            if (name === "email") {
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    addError(field, "Введите корректный email");
                    return false;
                }
            }

            return true;
        }

        form.addEventListener("submit", function (event) {
            event.preventDefault();
            clearErrors();

            let isValid = true;
            const fields = form.querySelectorAll("input:not([type=submit]), textarea");

            fields.forEach((field) => {
                if (!validateField(field)) {
                    isValid = false;
                }
            });

            if (isValid) {
                const formData = collectFormData(form);

                console.log("Данные формы:", formData);

                showModal(
                    "Регистрация прошла успешно",
                    "Ваша заявка принята. Мы свяжемся с вами в ближайшее время",
                    "Хорошо"
                );


                form.reset();
            }
        });

        function collectFormData(form) {
            return {
                name: form.elements.name.value.trim(),
                company: form.elements.company.value.trim(),
                email: form.elements.email.value.trim()
            };
        }


        form.addEventListener("input", function (e) {
            if (e.target.tagName === "INPUT") {
                const formItem = e.target.closest(".form__item");
                formItem.classList.remove("form__item--not-valid");
                const errorElement = formItem.querySelector(".error-message");
                if (errorElement) {
                    errorElement.style.display = "none";
                }
            }
        });
    }

    function showModal(title, text, buttonText) {
        const modal = document.querySelector(".modal");
        const modalWindow = modal.querySelector(".modal__window");
        const modalHeadline = modal.querySelector(".modal__headline");
        const modalText = modal.querySelector(".modal__text");
        const modalButton = modal.querySelector(".modal__button");
        const modalClose = modal.querySelector(".modal__close");


        modalHeadline.textContent = title;
        modalText.textContent = text;
        modalButton.textContent = buttonText;


        modal.style.visibility = "visible";

        setTimeout(() => {

            modal.classList.remove("animate__fadeIn", "animate__fadeOut");
            modalWindow.classList.remove("animate__fadeInUp", "animate__fadeOutDown");


            modal.classList.add("animate__fadeIn");
            modalWindow.classList.add("animate__fadeInUp");
        }, 10);

        function closeModal() {

            modal.classList.remove("animate__fadeIn");
            modalWindow.classList.remove("animate__fadeInUp");

            modal.classList.add("animate__fadeOut");
            modalWindow.classList.add("animate__fadeOutDown");

            setTimeout(() => {
                modal.style.display = "none";

                modal.classList.remove("animate__fadeOut");
                modalWindow.classList.remove("animate__fadeOutDown");
            }, 500);
        }


        modalButton.onclick = closeModal;
        modalClose.onclick = closeModal;

        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
});