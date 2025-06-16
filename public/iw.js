"use strict";

const url = window.location.href;  // Get the full URL
const queryString = url.includes("?")? url.split('?')[1]: "";

const weddingFetchLimit=11;
var weddingFetchOffset=0;

const galleryFetchLimit=36;
var galleryFetchOffset=0;

const vendorGalleryFetchLimit=12;
var vendorGalleryFetchOffset=0;

const vendorFetchLimit=15
var vendorFetchOffset=0;

const newsFetchLimit=10
var newsFetchOffset=0;

const colorLookup = ['red','orange','yellow','green','blue','purple','pink','brown','champagne','ivory','white','grey','black','gold-metallic','silver-metallic'];

let touchStartX = 0;
let touchEndX = 0;

let regionOptions = [];
let cityOptions = [];

let stateRadioTemplate = null;
let stateListTemplate = null;

let cityRadioTemplate = null;
let cityListTemplate = null;

let zIndexVendors = 60;
let vendorTemplate = null;

// UTILS
function isIterableObject(object) {
    return object !== null &&
        object !== undefined &&
        typeof object === 'object' &&
        (
            typeof object[Symbol.iterator] === 'function' ||
            Object.keys(Object(object)).length > 0
        )
}
function camelCaseToSnakeCase(string) {
    return string.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
}
function createParamsString(params = {}, prependWithQuestionMark = true) {
    const computed = Object.keys(params).reduce((paramsString, currentParamName) => {

        const parsedCurrentParamName = camelCaseToSnakeCase(currentParamName)
        const currentParamValue = params[currentParamName]
        const attachParam = value => (paramsString += `${parsedCurrentParamName}=${value}&`)

        if (Array.isArray(currentParamValue)) {
            currentParamValue.every(value => value && attachParam(value))
        } else if (isIterableObject(currentParamValue)) {
            Object.keys(currentParamValue).every(key => currentParamValue[key] && attachParam(currentParamValue[key]))
        } else {
            attachParam(currentParamValue)
        }

        return paramsString
    }, prependWithQuestionMark ? '?' : '')

    return encodeURI(computed.substring(0, computed.length - 1))
}
// END UTILS

function getId(i){
    return document.getElementById(i);
}

function getClass(c) {
    return document.querySelectorAll('.'+c)
}

function toggleDisplayFlex(elementId) {
    let element = getId(elementId);

    if (element.style.display === 'none') {
      element.style.display = 'flex';
      let input = getId('mobile-search-input');
      input.focus();
    } else {
      element.style.display = 'none';
    }
}

function submitSearch(inputBox) {
    let input = getId(inputBox);
    window.location.href = '/global_search/?query=' + encodeURIComponent(input.value);

}

function toggleIdClass(elementId, className) {
    let e = getId(elementId);
    toggleClass(e,className);
}

function toggleClass(e, className) {
    if (e.classList.contains(className)) {
        e.classList.remove(className);
    } else {
        e.classList.add(className);
    }
}

function removeClass(findClassName, removeClassName) {
    const elements = getClass(findClassName);
    elements.forEach(e => e.classList.remove(removeClassName))
}

function addClass(findClassName, addClassName) {
    const elements = getClass(findClassName);
    elements.forEach(e => e.classList.add(addClassName))
}

function removeChecked(findClassName) {
    const elements = getClass(findClassName);
    elements.forEach(e => e.checked = false)
}

function changeWeddingNewsCategory(e){
    if(e.className.indexOf('selected')==-1) {
        const categoryId = e.getAttribute('data-id');
        removeClass('news-categories__btn', 'selected');
        e.classList.add('selected');
        addClass('category-articles', 'hidden');
        let categoryArticles = getId(`category-${categoryId}-articles`);
        categoryArticles.classList.remove('hidden');
    }
}

function closeDetails(e, nextInputId = null)  {
    const detailsElement = e.parentNode.parentNode.parentNode;
    detailsElement.open = false;
    detailsElement.classList.remove('with-error'); // stop showing error border
    detailsElement.setAttribute('data-value', e.getAttribute('for'));
    let errorSpan = detailsElement.parentNode.lastChild.firstChild;
    if (errorSpan.classList.contains("input-error-msg")) { // it is an error message span
        errorSpan.classList.add('hidden'); // hide error
    }
    if(nextInputId !== null) {
        let nextInput = getId(nextInputId);
        if(nextInput !== null) {
            nextInput.focus();
        }
    }
}

function updateDetailsDataValueToAfterDot(e){

    const detailsElement = e.parentNode.parentNode.parentNode;
    let value = detailsElement.getAttribute('data-value');
    if(value.includes('.')) {
        detailsElement.setAttribute('data-value', value.split(".")[1]);
    }
}

function mapOptionsFromApiItems(items) {
    return items.map(item => ({label: item.name, value: item.id}))
}



function getStates(countiesDetailsId, regionsDetailsId, citiesDetailsId) {
    let countryId = getId(countiesDetailsId).getAttribute('data-value');
    const requestParams = `?country=${countryId}&fields=name,id`;
    getItems('regions',requestParams,(options => {
        let regions = getId(regionsDetailsId);
        let radios = regions.querySelector('.radios');
        let list = regions.querySelector('.list');
        if(stateRadioTemplate === null){
            stateRadioTemplate = radios.lastChild;
            radios.removeChild(stateRadioTemplate);
        } else {
            while (radios.childNodes.length > 1) {
                radios.removeChild(radios.lastChild);
            }
        }
        if (stateListTemplate === null) {
            stateListTemplate = list.firstChild;
            list.removeChild(stateListTemplate);
        } else {
            while (list.firstChild) {
                list.removeChild(list.firstChild);
            }
        }
        options.forEach(item => {
            let radio = stateRadioTemplate.cloneNode(true);
            radio.id = `${radio.name}.${item.value}`;
            radio.setAttribute('title', item.label);
            radios.appendChild(radio);

            let li = stateListTemplate.cloneNode(true);
            li.firstChild.setAttribute('for',`${radio.name}.${item.value}`);
            li.firstChild.textContent = item.label;
            list.appendChild(li);
        });

        regions.parentElement.classList.remove('disabled');
        getId(citiesDetailsId).parentElement.classList.add('disabled');
    }));
}

function getCities(countiesDetailsId, regionsDetailsId, citiesDetailsId) {
    let countryId = getId(countiesDetailsId).getAttribute('data-value');
    let regionId = getId(regionsDetailsId).getAttribute('data-value');
    const requestParams = `?country=${countryId}&region=${regionId}&fields=name,id`;
    getItems('cities',requestParams, (options => {
        let cities = getId(citiesDetailsId);
        let radios = cities.querySelector('.radios');
        let list = cities.querySelector('.list');
        if(cityRadioTemplate === null){
            cityRadioTemplate = radios.lastChild;
            radios.removeChild(cityRadioTemplate);
        } else {
            while (radios.childNodes.length > 1) {
                radios.removeChild(radios.lastChild);
            }
        }
        if (cityListTemplate === null) {
            cityListTemplate = list.firstChild;
            list.removeChild(cityListTemplate);
        } else {
            while (list.firstChild) {
                list.removeChild(list.firstChild);
            }
        }
        options.forEach(item => {
            let radio = cityRadioTemplate.cloneNode(true);
            radio.id = `${radio.name}.${item.value}`;
            radio.setAttribute('title',item.label);
            radios.appendChild(radio);

            let li = cityListTemplate.cloneNode(true);
            li.firstChild.setAttribute('for',`${radio.name}.${item.value}`);
            li.firstChild.textContent = item.label;
            list.appendChild(li);
        })
        cities.parentElement.classList.remove('disabled');
    }));
}

function getItems(type, requestParams, onComplete){
    fetch(`_MINIFY_SCRIPT_INSERT_BASE_URL_${type}/${requestParams}`, {
        method: 'GET',
        headers: getCSRFTokenHeader(),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Bad Request');
        }
        return response.json();
    })
    .then(data => {
        let options = mapOptionsFromApiItems(data['items']);
        onComplete(options);
    })
    .catch(error => {
        // Handle any errors
        console.error(error);
    });
}

function setAdvanacedSearch(e,searchBox) {
    let s = getId('advanced-search-in');
    s.placeholder = `Search In ${e.value}`;
    s.focus();
}

function updateSlides(sliderDiv, curSlide) {
    sliderDiv.setAttribute('data-curSlide', curSlide);
    const parentSlideDivs = sliderDiv.querySelectorAll('.slide');
    parentSlideDivs.forEach((slide, indx) => {
        slide.style.cssText = `transform: translateX(${100 * (indx - curSlide)}%)`
    });
}

function getStatus(p){
    return [parseInt(p.getAttribute('data-curSlide')),parseInt(p.getAttribute('data-maxSlide'))];
}

function slideLeft(sliderDiv) {
    let [curSlide, maxSlide] = getStatus(sliderDiv);
    // check if current slide is the first and reset current slide to last
    curSlide = (curSlide === 0) ? maxSlide : --curSlide;
    updateSlides(sliderDiv, curSlide);
}

function slideRight(sliderDiv) {
    let [curSlide, maxSlide] = getStatus(sliderDiv);
    // check if current slide is the last and reset current slide
    curSlide = (curSlide === maxSlide) ? 0 : ++curSlide;
    updateSlides(sliderDiv, curSlide);
}

function handleSwipeGesture(evt, sliderDiv) {
    const swipeThreshold = 50; // Adjust as needed

    // Calculate the distance and direction of the swipe
    const swipeDistance = touchEndX - touchStartX;
    const isSwipeLeft = swipeDistance < -swipeThreshold;
    const isSwipeRight = swipeDistance > swipeThreshold;

    if (isSwipeLeft) {
        evt.stopPropagation();
        slideRight(sliderDiv);
    } else if (isSwipeRight) {
        evt.stopPropagation();
        slideLeft(sliderDiv);
    }
}

function setupSlider(sliderId) {
    const sliderDiv = getId(sliderId);
    if(sliderDiv) {
        const slideDivs = sliderDiv.querySelectorAll('.slide');
        const nextSlide = sliderDiv.querySelector(".slider-btn-next");
        const prevSlide = sliderDiv.querySelector(".slider-btn-prev");

        sliderDiv.setAttribute('data-curSlide', 0);
        sliderDiv.setAttribute('data-maxSlide', slideDivs.length - 1);

        nextSlide.addEventListener("click", function (evt) {
            slideRight(evt.currentTarget.parentElement);
        });

        prevSlide.addEventListener("click", function (evt) {
            slideLeft(evt.currentTarget.parentElement);
        });

        sliderDiv.addEventListener('touchstart', function(evt) {
            touchStartX = evt.touches[0].clientX;
        },{passive: true});

        sliderDiv.addEventListener('touchend', function(evt) {
            touchEndX = evt.changedTouches[0].clientX;
            handleSwipeGesture(evt, evt.currentTarget);
        });

        if(slideDivs.length === 1){
            nextSlide.classList.add('hidden');
            prevSlide.classList.add('hidden');
        }
    }
}

function setupSearchForm(formId, inputId){
    let form = getId(formId);
    if(form) {
        form.addEventListener("submit", function(event) {
            event.preventDefault(); // Prevents the default form submission behavior
            let input = getId(inputId);
            window.location.href = '/global_search/?query=' + encodeURIComponent(input.value);
        });
    }
}

function setupGalleryFiltersForm(formId) {
    let form = getId(formId);
    if(form) {
        let filterList = ['colors'];

        form.addEventListener("submit", function(event) {
            event.preventDefault(); // Prevents the default form submission behavior
            let filters = [];
            filters['colors'] = [];
            getClass('color').forEach(c => {
                if (c.classList.contains('--selected')) {
                    filters['colors'].push(c.getAttribute('data-id'));
                }
            });

            filters['category'] = getId('gallery-category-details').getAttribute('data-value');
            if(filters['category'] == "all" || filters['category']  == "") {
                filters['category'] = null;
            }

            filters['text'] = encodeURIComponent(getId('gallery-filter-search').value);
            if( filters['text'] == "") {
                filters['text'] = null;
            }

            let parameters = "";

            filterList.forEach(f => filters[f].forEach(v => parameters += `&${f}=${v}`));

            if(filters['category']) {
                parameters += `&category=${filters['category']}`
            }

            if(filters['text']) {
                parameters += `&text=${filters['text']}`
            }


            parameters = parameters.slice(1); // remove the first &

            var selectedFiltersCount = parameters.split('=').length - 1;

            if (selectedFiltersCount === 1 && (parameters.startsWith('colors') || parameters.startsWith('category'))){
                var value = parameters.split('=')[1]

                if (parameters.startsWith('colors')) {
                    window.location.href = `/inspiration/images/color/${colorLookup[value-1]}/`
                } else {
                    window.location.href = `/inspiration/images/category/${value}/`
                }
            } else {
                window.location.href = '/inspiration/images/search_results/?' + parameters;
            }
        });

        if(url.includes('/inspiration/images/color/')) {
            let parts = url.split("/");
            let colorPart = parts[parts.length - 2];
            let colorId = (1 + colorLookup.indexOf(colorPart)).toString();
            getClass('color').forEach(e => {
                if(e.getAttribute('data-id') === colorId) {
                    e.classList.add('--selected');
                    return;
                }
            })
        }

        if(url.includes('?')) {
            let filters = {};
            filters['text'] = [];
            filters['category'] = [];
            filterList.forEach(f => filters[f] = []);

            var pairs = queryString.split('&');
            pairs.forEach(p => {
                let pair = p.split('=');
                let paramName = decodeURIComponent(pair[0]);
                let paramValue = decodeURIComponent(pair[1]);
                filters[paramName].push(paramValue);
            })

            Object.keys(filters).forEach((filter) => {
                if(filters[filter].length > 0) {
                    switch(filter) {
                        case 'text':
                            getId('gallery-filter-search').value = filters[filter][0];
                            break;
                        case 'colors':
                            filters[filter].forEach(colorId => {
                                getClass('color').forEach(e => {
                                    if (e.getAttribute('data-id') === colorId) {
                                        e.classList.add('--selected');
                                        return;
                                    }
                                })
                            });
                            break;
                        case 'category':
                            let c = getId(filters[filter][0])
                            if(c) {
                                c.setAttribute('checked','checked');
                                getId('gallery-category-details').setAttribute('data-value', filters[filter][0]);
                            }
                            break;
                        default:
                            break;
                    }
                }
            });
        }
    }
}

function isVisible(e) {
    const styles = getComputedStyle(e);
    return styles.display !== 'none' && styles.visibility !== 'hidden';
}

function setupWeddingFiltersForm(formId){
    let form = getId(formId);
    if(form) {
        let filterList = ['colors','views','event_type','genre_type', 'location_type','season_type','style_type'];

        form.addEventListener("submit", function(event) {
            event.preventDefault(); // Prevents the default form submission behavior
            let filters = [];
            filterList.forEach(f => filters[f] = []);

            if(isVisible(getId('wedding-category-details').parentElement)){
                filters['style_type'] = [getId('wedding-category-details').getAttribute('data-value')];
                if(filters['style_type'] == "all" || filters['style_type']  == "") {
                    filters['style_type'] = [];
                }
            }

            let selected = document.querySelector('input[name="advanced-search-radio"]:checked').value;
            filters[selected] = encodeURIComponent(getId('advanced-search-in').value)
            filters['location'] = encodeURIComponent(getId('advanced-search-location').value);

            // when there is one it uses the format weddings/search/color/yellow/
            getClass('color').forEach(c => {
                if (c.classList.contains('--selected')) {
                    filters['colors'].push(c.getAttribute('data-id'));
                }
            });
            //safe format colours in colors=1,2,3 ( as this does an AND)

            getClass('advanced-filters-checkbox').forEach(c => {
                if(c.checked) {
                    let parts = c.name.split(".");
                    filters[parts[0]].push(parts[1])
                }
            });

            let parameters = "";

            filterList.forEach(f => filters[f].forEach(v => parameters += `&${f}=${v}`))
            if(filters[selected]) {
                parameters += `&${selected}=${filters[selected]}`
            }

            if(filters['location']) {
                parameters += `&location=${filters['location']}`
            }

            parameters = parameters.slice(1); // remove the first &

            // count parameters
            var selectedFiltersCount = parameters.split('=').length - 1;

            // if there is only one param, and it's on the filterList
            if (selectedFiltersCount === 1 && filterList.some(f => parameters.startsWith(`${f}=`))){
                var splitParam = parameters.split('=');
                var key = splitParam[0];
                var value = splitParam[1];
                if (key === 'colors') {
                    window.location.href = `/weddings/search/color/${colorLookup[value-1]}/`
                } else {
                    window.location.href = `/weddings/search/category/${key}/${value}/`
                }

            } else {
                window.location.href = '/weddings/search/?' + parameters;
            }

        });

        if(url.includes('/weddings/search/color/')) {
            let parts = url.split("/");
            let colorPart = parts[parts.length - 2];
            let colorId = (1 + colorLookup.indexOf(colorPart)).toString();
            getClass('color').forEach(e => {
                if(e.getAttribute('data-id') === colorId) {
                    e.classList.add('--selected');
                    return;
                }
            })
        }

        if(url.includes('?')) {
            let filters = {};
            filters['location'] = [];
            filters['venue'] = [];
            filters['couple'] = [];
            filters['business'] = [];
            filterList.forEach(f => filters[f] = []);

            var pairs = queryString.split('&');
            pairs.forEach(p => {
                let pair = p.split('=');
                let paramName = decodeURIComponent(pair[0]);
                let paramValue = decodeURIComponent(pair[1]);
                filters[paramName].push(paramValue);
            })

            Object.keys(filters).forEach((filter) => {
                if(filters[filter].length > 0) {
                    switch(filter) {
                        case 'location':
                            getId('advanced-search-location').value = filters[filter][0];
                            break;
                        case 'venue':
                        case 'couple':
                        case 'business':
                            //console.log(filters[filter]);
                            getId('advanced-search-in').value = filters[filter][0];
                            getClass('advanced-search-radio').forEach(c => {
                                if (c.value === filter) {
                                    c.checked = true;
                                }
                            });
                            break;
                        case 'colors':
                            filters[filter].forEach(colorId => {
                                getClass('color').forEach(e => {
                                    if (e.getAttribute('data-id') === colorId) {
                                        e.classList.add('--selected');
                                        return;
                                    }
                                })
                            });
                            break;
                        case 'views':
                        case 'event_type':
                        case 'genre_type':
                        case 'location_type':
                        case 'season_type':
                        case 'style_type':
                                let c = getId(filters[filter][0])
                                if(c) {
                                    c.setAttribute('checked','checked');
                                    getId('wedding-category-details').setAttribute('data-value', filters[filter][0]);
                                }

                                filters[filter].forEach(f => {
                                    getClass('advanced-filters-checkbox').forEach(e => {
                                        if (e.name === `${filter}.${f}`) {
                                            e.checked = true;
                                            return;
                                        }
                                    });
                                })
                            break;
                        default:
                            break;
                    }
                }
            });
        }
    }
}

function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

function setupVendorForm(formId, detailsId, locationId, travelId) {
    let form = getId(formId);
    if(form) {
        let filters = {};
        filters['willingToTravel'] = null;
        filters['location'] = null;
        filters['vendorCategorySlug'] = null;

        if(url.includes('?')) {
            var pairs = queryString.split('&');
            pairs.forEach(p => {
                let pair = p.split('=');
                let paramName = decodeURIComponent(pair[0]);
                let paramValue = decodeURIComponent(pair[1]);
                filters[paramName] = paramValue;
            })
        }

        if(url.includes('/vendor/search/category/')) {
            let parts = url.split("/");
            filters['vendorCategorySlug'] = parts[parts.length - 2];
        }

        let travel = getId(travelId);
        if(travel){
            if(filters['willingToTravel'] === 'false') {
                travel.checked = false;
            } else {
                travel.checked = true;
            }
        }

        let details = getId(detailsId);

        if(filters['vendorCategorySlug']) {
            let c = getId(filters['vendorCategorySlug'])
            if(c) {
                c.setAttribute('checked','checked');
                details.setAttribute('data-value', filters['vendorCategorySlug']);
            }
        }

        let location = getId(locationId);

        if(filters['location']) {
            location.value = filters['location'];
        }

        form.addEventListener("submit", function(event) {
            event.preventDefault(); // Prevents the default form submission behavior

            let detailsValue = details.getAttribute('data-value');
            if(detailsValue == "all" || detailsValue == "") {
                detailsValue = null;
            }

            let locationValue = encodeURIComponent(location.value);
            if( locationValue == "") {
                locationValue = null;
            }

            let travelValue = null;
            if(travel && !travel.checked){
                travelValue ='willingToTravel=false'
            }

            if(!locationValue && !detailsValue) {
                travelValue = travelValue ? '?' + travelValue : '';
                window.location.href = `/vendor/search/${travelValue}`;
            } else if(!locationValue) {
                travelValue = travelValue ? '?' + travelValue : '';
                detailsValue = detailsValue ? detailsValue + "/" : '';
                window.location.href = `/vendor/search/category/${detailsValue}${travelValue}`;
            } else if (!detailsValue) {
                travelValue = travelValue ? '&' + travelValue : '';
                window.location.href = `/vendor/search/?location=${locationValue}${travelValue}`;
            } else {
                travelValue = travelValue ? '&' + travelValue : '';
                window.location.href = `/vendor/search/?vendorCategorySlug=${detailsValue}&location=${locationValue}${travelValue}`;
            }
        });
    }
}

function getCSRFTokenHeader(headers = {}){
    let csrfToken = null;
    let cookies = document.cookie.split('; ');

    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
      if (cookie.startsWith('csrftoken=')) {
        csrfToken = cookie.split('=')[1];
        break;
      }
    }

    if(csrfToken) {
        headers = {
            'X-CSRFToken': csrfToken
        }
    }

    return headers;
}

function setupMembershipForm(formId,prefixId) {
    let form = getId(formId);
    if(form) {
        form.addEventListener("submit", function(event) {
            event.preventDefault(); // Prevents the default form submission behavior
            let firstName = getId(`${prefixId}-firstname`).value;
            let lastName = getId(`${prefixId}-lastname`).value;
            let email = getId(`${prefixId}-email`).value;
            let emailErrorDiv = getId(`${prefixId}-email-error`);
            if(validateEmail(email)){
                let submitBtn = getId(`${prefixId}-submit`);
                let loadingDiv = getId(`${prefixId}-loading`);
                let errorDiv =  getId(`${prefixId}-error`);
                let successDiv = getId(`${prefixId}-success`);

                submitBtn.classList.add('hidden');
                loadingDiv.classList.remove('hidden');
                errorDiv.classList.add('hidden');
                emailErrorDiv.classList.add('hidden');

                const formData = new FormData();
                addToFormData(formData, 'first_name', firstName);
                addToFormData(formData, 'last_name', lastName);
                addToFormData(formData, 'email', email);
                fetch('_MINIFY_SCRIPT_INSERT_BASE_URL_newsletter', {
                    method: 'POST',
                    headers: getCSRFTokenHeader(),
                    body: formData
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Bad Request');
                    }
                    // console.log("success");
                    loadingDiv.classList.add('hidden');
                    successDiv.classList.remove('hidden');

                    const signupCookieDate = new Date()
                    signupCookieDate.setDate(signupCookieDate.getDate() + 30)
                    const signupCookieDateString = signupCookieDate.toUTCString()
                    document.cookie = `NewsletterSubscribed=;path=/;expires=${signupCookieDateString};`;
                })
                .catch(error => {
                    errorDiv.classList.remove('hidden');
                    loadingDiv.classList.add('hidden');
                    submitBtn.classList.remove('hidden');
                    // Handle any errors
                    console.error(error);
                });

            } else {
                emailErrorDiv.classList.remove('hidden');
                // todo show error
                getId(`${prefixId}-email`).focus();
            }
        });
    }
}

function isString(value) {
    return typeof value === 'string';
}

function isEmptyString(str) {
  if(isString(str)){
    return str.trim().length === 0;
  }
  return str === null
}

function hideInputErrorMessages() {
    const errorElements = document.querySelectorAll('.input-error-msg');
    errorElements.forEach((element) => {
        element.classList.add('hidden');
    });
}

function handleNonInputErrors(form, submitBtn, loadingDiv) {
    // Form is invalid, trigger browser validation messages
    const invalidFields = form.querySelectorAll(':invalid');
    invalidFields.forEach((invalidField, index) => {
        invalidField.classList.add('with-error');
        if(index === 0) {
            invalidField.scrollIntoView({ behavior: 'smooth', block: 'center'});
            invalidField.focus();
        }
        let errorMsg = invalidField.parentNode.parentNode.lastChild.firstChild;
        errorMsg.textContent = invalidField.validationMessage;
        errorMsg.classList.remove('hidden');
        submitBtn.classList.remove('hidden');
        loadingDiv.classList.add('hidden');
        invalidField.addEventListener('blur', function() {
            invalidField.classList.remove('with-error');
            errorMsg.classList.add('hidden');
        }, { once: true });
    })
}

function showErrorInput(inputId, submitBtn, loadingDiv, errorDiv, errorText = null){
    let input = getId(inputId);
    input.scrollIntoView({behavior: 'smooth', block: 'center'});
    input.classList.add('with-error');
    errorDiv.classList.remove('hidden');
    if(errorText) {
        errorDiv.innerHTML = errorText;
    }
    submitBtn.classList.remove('hidden');
    loadingDiv.classList.add('hidden');
}

function handleEmailErrors(emailValidate, emailId, submitBtn, loadingDiv){
    let emailInput = getId(emailId);
    if (!emailValidate && emailInput.validity.valid) {
        let errorDiv = emailInput.parentNode.parentNode.lastChild.firstChild
        showErrorInput(emailId, submitBtn, loadingDiv, errorDiv,
        "Please check email and enter a valid email address");
        emailInput.addEventListener('blur', function() {
            emailInput.classList.remove('with-error');
            errorDiv.classList.add('hidden');
        }, { once: true });
    }
}

function addToFormData(formData, key, value){
    if(!isEmptyString(value)) {
        formData.append(key, value);
    }
}

function addToObject(array, key, value) {
    if(!isEmptyString(value)) {
        //console.log(key, value);
        array[key]= value;
    }
}

function setupBusinessForm(formId) {
    let form = getId(formId);
    if(form) {
        form.setAttribute('novalidate', '');
        form.addEventListener("submit", function(event) {
            event.preventDefault(); // Prevents the default form submission behavior
            hideInputErrorMessages();
            let membership = form.parentNode.getAttribute('data-level');
            let image = getId('image-input-img').src.split(',')[1];
            let businessName = getId('business-name-input').value;
            let title = getId('title-input').value;
            let category = getId('vendor-category-details').getAttribute('data-value');
            let email = getId('email-input').value;
            let phone = getId('phone-input').value;
            let businessWebsite = getId('website-input').value;
            let address1 = getId('address1-input').value;
            let address2 = getId('address2-input').value;
            let country = getId('vendor-country-details').getAttribute('data-value');
            let state = getId('vendor-state-details').getAttribute('data-value');
            let city = getId('vendor-city-details').getAttribute('data-value');
            let zip = getId('zip-input').value;
            let businessPhone = getId('business-phone-input').value;
            let businessFax = getId('business-fax-input').value;
            let businessEmail = getId('business-email-input').value;
            let willingToTravelNode = getId('willingToTravel')
            let willingToTravel = null;
            if(willingToTravelNode){
                willingToTravel = willingToTravelNode.checked;
            }
            let hidePhysicalAddress = getId('hidePhysicalAddress').checked;
            let social_medias = [ {
                    platform: 'FACEBOOK',
                    url:  getId('facebook-input').value.trim()
                },
                {
                    platform: 'TWITTER',
                    url:  getId('twitter-input').value.trim()
                },
                {
                    platform: 'INSTAGRAM',
                    url:  getId('instagram-input').value.trim()
                },
                {
                    platform: 'PINTEREST',
                    url:  getId('pinterest-input').value.trim()
                },
                {
                    platform: 'LINKEDIN',
                    url: getId('linkedin-input').value.trim()
                },
                {
                    platform: 'TUMBLR',
                    url: getId('tumblr-input').value.trim()
                }
            ];
            let summary = getId('summary-input').value;
            let description = getId('description-input').value;
            let featured = '';
            const input = form.querySelector('input[name="featured"]:checked');
            if (input !== null) {
                featured = input.value;
            }
            let consentNewsletter = getId('consentNewsletter').checked;
            let consentTermsOfUseAndPrivacyAndPolicy = getId('consentTermsOfUseAndPrivacyAndPolicy').checked;

            let errorDiv = getId('business-error');
            let submitBtn = getId('business-submit');
            let loadingDiv = getId('business-loading');
            let successDiv = getId('business-success');
            let imageErrorDiv = getId('image-input').parentNode.parentNode.parentNode.lastChild.firstChild;
            let categoryErrorDiv = getId('vendor-category-details').parentNode.lastChild.firstChild;
            let countryErrorDiv = getId('vendor-country-details').parentNode.lastChild.firstChild;
            let stateErrorDiv = getId('vendor-state-details').parentNode.lastChild.firstChild;
            let cityErrorDiv = getId('vendor-city-details').parentNode.lastChild.firstChild;

            submitBtn.classList.add('hidden');
            loadingDiv.classList.remove('hidden');
            errorDiv.classList.add('hidden');

            imageErrorDiv.classList.add('hidden');
            categoryErrorDiv.classList.add('hidden');
            countryErrorDiv.classList.add('hidden');
            stateErrorDiv.classList.add('hidden');
            cityErrorDiv.classList.add('hidden');

            let inputChecks = form.checkValidity();
            let nonInputChecks = true;
            let emailValidate = validateEmail(email);
            let bizEmailValidate = validateEmail(businessEmail);

            if(isEmptyString(country)) {
                showErrorInput('vendor-country-details', submitBtn, loadingDiv, countryErrorDiv);
                nonInputChecks = false;
            }

            if(isEmptyString(state)) {
                showErrorInput('vendor-state-details', submitBtn, loadingDiv, stateErrorDiv);
                nonInputChecks = false;
            }

            if(isEmptyString(city)) {
                showErrorInput('vendor-city-details', submitBtn, loadingDiv, cityErrorDiv);
                nonInputChecks = false;
            }

            if(isEmptyString(category)) {
                showErrorInput('vendor-category-details', submitBtn, loadingDiv, categoryErrorDiv);
                nonInputChecks = false;
            }

            if(image === 'R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=') {
                showErrorInput('image-input-button', submitBtn, loadingDiv, imageErrorDiv);
                nonInputChecks = false;
            }

            if(!inputChecks) {
                handleNonInputErrors(form, submitBtn, loadingDiv)
            }

            handleEmailErrors(emailValidate, 'email-input', submitBtn, loadingDiv);
            handleEmailErrors(bizEmailValidate, 'business-email-input', submitBtn, loadingDiv);

            if (inputChecks && nonInputChecks && emailValidate && bizEmailValidate) {
                let formObject = {};
                addToObject(formObject, 'name', businessName);
                addToObject(formObject, 'categories', [category]);
                addToObject(formObject, 'title', title);
                addToObject(formObject, 'email', email);
                addToObject(formObject, 'phone', phone);
                addToObject(formObject, 'business_website', businessWebsite);
                addToObject(formObject, 'address1', address1);
                addToObject(formObject, 'address2', address2);
                addToObject(formObject, 'zip', zip);
                addToObject(formObject, 'country', country);
                addToObject(formObject, 'region', state);
                addToObject(formObject, 'city', city);
                addToObject(formObject, 'fax', businessFax);
                addToObject(formObject, 'business_phone', businessPhone);
                addToObject(formObject, 'business_email', businessEmail);
                addToObject(formObject, 'featured', featured);
                if(willingToTravelNode){
                    addToObject(formObject, 'willing_to_travel', willingToTravel);
                }
                addToObject(formObject, 'hide_physical_address', hidePhysicalAddress);
                addToObject(formObject, 'brief_summary', summary);
                addToObject(formObject, 'description', description);
                addToObject(formObject, 'consent_newsletter', consentNewsletter);
                addToObject(formObject, 'consent_term_of_use_and_privacy_and_policy', consentTermsOfUseAndPrivacyAndPolicy);
                addToObject(formObject, 'social_medias', social_medias.filter(social => !!social.url.length))

                addToObject(formObject, 'main_photo', image);
                addToObject(formObject, 'membership', membership);

                fetch('_MINIFY_SCRIPT_INSERT_BASE_URL_vendors/', {
                   method: 'POST',
                   headers: getCSRFTokenHeader({'content-type': 'application/json'}),
                   body: JSON.stringify(formObject)
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Bad Request');
                    }
                    // console.log("success");
                    loadingDiv.classList.add('hidden');
                    successDiv.classList.remove('hidden');
                    window.location.href = "/work-with-us/sign-up/success/";
                })
                .catch(error => {
                    errorDiv.classList.remove('hidden');
                    loadingDiv.classList.add('hidden');
                    submitBtn.classList.remove('hidden');
                    // Handle any errors
                    console.error(error);
                });
            }
        });
    }
}

function setupWeddingForm(formId) {
    let form = getId(formId);
    if(form) {
        form.setAttribute('novalidate', '');
        form.addEventListener("submit", function(event) {
            event.preventDefault(); // Prevents the default form submission behavior
            hideInputErrorMessages();
            let sender_type = getId('sender-type-details').getAttribute('data-value');
            let sender_first_name = getId('sender_first_name').value;
            let sender_last_name = getId('sender_last_name').value;
            let sender_phone_number = getId('sender_phone_number').value;
            let sender_email = getId('sender_email').value;
            let sender_address = getId('sender_address').value;
            let sender_company_name = getId('sender_company_name').value;
            let sender_company_title = getId('sender_company_title').value;
            let bride_first_name = getId('bride_first_name').value;
            let bride_last_name = getId('bride_last_name').value;
            let groom_first_name = getId('groom_first_name').value;
            let groom_last_name = getId('groom_last_name').value;
            let couple_email = getId('couple_email').value;
            let couple_phone_number = getId('couple_phone_number').value;
            let couple_address = getId('couple_address').value;
            let date_event = getId('wedding-date-input').value;
            let wedding_website = getId('wedding_website').value;
            let venue_name = getId('venue_name').value;
            let wedding_country = getId('wedding-country-details').getAttribute('data-value');
            let wedding_region = getId('wedding-state-details').getAttribute('data-value');
            let wedding_city = getId('wedding-city-details').getAttribute('data-value');
            let wedding_details = getId('wedding_details').value;
            let media_link = getId('media_link').value;
            let consent_another_print = getId('consentAnotherPrint').checked;
            let consent_commercial_blog = getId('consentCommercialBlog').checked;
            let consent_cost_information = getId('consentCostInformation').checked;
            let consent_personalities_publication = getId('consentPersonalitiesPublication').checked;
            let consent_photo_layouts = getId('consentPhotoLayouts').checked;
            let consent_publication = getId('consentPublication').checked;
            let countryErrorDiv = getId('wedding-country-details').parentNode.lastChild.firstChild;
            let stateErrorDiv = getId('wedding-state-details').parentNode.lastChild.firstChild;
            let cityErrorDiv = getId('wedding-city-details').parentNode.lastChild.firstChild;

            let errorDiv = getId('wedding-error');
            let submitBtn = getId('wedding-submit');
            let loadingDiv = getId('wedding-loading');
            let successDiv = getId('wedding-success');

            let vendors_raw = [];
            let vendorValidate = true;
            let vendorForms = form.querySelectorAll('.array-field');
            if (vendorForms) {
                vendorForms.forEach(item => {
                    let vendor = {};
                    let vendorCategoryDetails = item.querySelector(".select-drop-down").firstChild;
                    let vendorErrorDiv = vendorCategoryDetails.parentNode.lastChild.firstChild;
                    let vendorEmailDiv = item.querySelector('input[name="email"]');
                    vendor.category = vendorCategoryDetails.getAttribute('data-value');
                    vendor.business_name = item.querySelector('input[name="businessName"]').value;
                    vendor.contact_name = item.querySelector('input[name="contactName"]').value;
                    vendor.description = item.querySelector('input[name="description"]').value;
                    vendor.email = vendorEmailDiv.value;
                    vendor.phone_number = item.querySelector('input[name="phoneNumber"]').value;
                    vendors_raw.push(vendor);

                    if(isEmptyString(vendor.category)) {
                        showErrorInput(vendorCategoryDetails.id, submitBtn, loadingDiv, vendorErrorDiv);
                        vendorValidate = false;
                    }
                    let emailValidate = validateEmail(vendor.email);
                    handleEmailErrors(emailValidate, vendorEmailDiv.id, submitBtn, loadingDiv);
                    if(!emailValidate) {
                        vendorValidate = false;
                    }
                })
            }

            submitBtn.classList.add('hidden');
            loadingDiv.classList.remove('hidden');
            errorDiv.classList.add('hidden');
            countryErrorDiv.classList.add('hidden');
            stateErrorDiv.classList.add('hidden');
            cityErrorDiv.classList.add('hidden');

            let inputChecks = form.checkValidity();
            let nonInputChecks = true;
            let emailValidate = validateEmail(sender_email);
            let coupleEmailValidate = validateEmail(couple_email);

            if(isEmptyString(wedding_country)) {
                showErrorInput('wedding-country-details', submitBtn, loadingDiv, countryErrorDiv);
                nonInputChecks = false;
            }

            if(isEmptyString(wedding_region)) {
                showErrorInput('wedding-state-details', submitBtn, loadingDiv, stateErrorDiv);
                nonInputChecks = false;
            }

            if(isEmptyString(wedding_city)) {
                showErrorInput('wedding-city-details', submitBtn, loadingDiv, cityErrorDiv);
                nonInputChecks = false;
            }

            if(!inputChecks) {
                handleNonInputErrors(form, submitBtn, loadingDiv)
            }


            handleEmailErrors(emailValidate, 'sender_email', submitBtn, loadingDiv);
            handleEmailErrors(coupleEmailValidate, 'couple_email', submitBtn, loadingDiv);

            if (inputChecks && nonInputChecks && emailValidate && coupleEmailValidate && vendorValidate) {
                const formData = new FormData();
                addToFormData(formData, 'bride_first_name', bride_first_name);
                addToFormData(formData, 'bride_last_name', bride_last_name);
                addToFormData(formData, 'consent_another_print', consent_another_print);
                addToFormData(formData, 'consent_commercial_blog', consent_commercial_blog);
                addToFormData(formData, 'consent_cost_information', consent_cost_information);
                addToFormData(formData, 'consent_personalities_publication', consent_personalities_publication);
                addToFormData(formData, 'consent_photo_layouts', consent_photo_layouts);
                addToFormData(formData, 'consent_publication', consent_publication);
                addToFormData(formData, 'couple_address', couple_address);
                addToFormData(formData, 'couple_email', couple_email);
                addToFormData(formData, 'couple_phone_number', couple_phone_number);
                addToFormData(formData, 'date_event', date_event);
                addToFormData(formData, 'groom_first_name', groom_first_name);
                addToFormData(formData, 'groom_last_name', groom_last_name);
                addToFormData(formData, 'media_link', media_link);
                addToFormData(formData, 'sender_address', sender_address);
                addToFormData(formData, 'sender_company_name', sender_company_name);
                addToFormData(formData, 'sender_company_title', sender_company_title);
                addToFormData(formData, 'sender_email', sender_email);
                addToFormData(formData, 'sender_first_name', sender_first_name);
                addToFormData(formData, 'sender_last_name', sender_last_name);
                addToFormData(formData, 'sender_phone_number', sender_phone_number);
                addToFormData(formData, 'sender_type', sender_type);
                addToFormData(formData, 'venue_name', venue_name);
                addToFormData(formData, 'wedding_city', wedding_city);
                addToFormData(formData, 'wedding_country', wedding_country);
                addToFormData(formData, 'wedding_details', wedding_details);
                addToFormData(formData, 'wedding_region', wedding_region);
                addToFormData(formData, 'wedding_website', wedding_website);
                if(vendors_raw){
                    vendors_raw.forEach((obj, index) => {
                        for (let key in obj) {
                          formData.append(`vendors_raw[${index}][${key}]`, obj[key]);
                        }
                      });
                }

                fetch('_MINIFY_SCRIPT_INSERT_BASE_URL_weddings/', {
                    method: 'POST',
                    headers: getCSRFTokenHeader(),
                    body: formData
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Bad Request');
                    }
                    // console.log("success");
                    loadingDiv.classList.add('hidden');
                    successDiv.classList.remove('hidden');
                })
                .catch(error => {
                    errorDiv.classList.remove('hidden');
                    loadingDiv.classList.add('hidden');
                    submitBtn.classList.remove('hidden');
                    // Handle any errors
                    console.error(error);
                });
            }
        });
    }
}

function setupRepForm(formId) {
    let form = getId(formId);
    if(form) {
        form.setAttribute('novalidate', '');
        form.addEventListener("submit", function(event) {
            event.preventDefault(); // Prevents the default form submission behavior
            hideInputErrorMessages();
            let name = getId('name-input').value;
            let title = getId('title-input').value;
            let companyName = getId('company-name-input').value;
            let clientName = getId('client-name-input').value;
            let category = getId('vendor-category-details').getAttribute('data-value');
            let email = getId('email-input').value;
            let phone = getId('phone-input').value;
            let website = getId('website-input').value;
            let address = getId('address-input').value;
            let city = getId('city-input').value;
            let region = getId('state-input').value;
            let zip = getId('zip-input').value;
            let country = getId('country-input').value;

            let printAdvertising = getId('printAdvertising').checked;
            let digitalAdvertising = getId('digitalAdvertising').checked;
            let editorsCircleMembership = getId('editorsCircleMembership').checked;
            let businessMembership = getId('businessMembership').checked;
            let emailBlasts = getId('emailBlasts').checked;
            let newsletters = getId('newsletters').checked;
            let sponsoredContent = getId('sponsoredContent').checked;
            let categoryErrorDiv = getId('vendor-category-details').parentNode.lastChild.firstChild;

            let errorDiv = getId('rep-error');
            let submitBtn = getId('rep-submit');
            let loadingDiv = getId('rep-loading');
            let successDiv = getId('rep-success');

            submitBtn.classList.add('hidden');
            loadingDiv.classList.remove('hidden');
            errorDiv.classList.add('hidden');
            categoryErrorDiv.classList.add('hidden');

            let inputChecks = form.checkValidity();
            let nonInputChecks = true;
            let emailValidate = validateEmail(email);

            if(isEmptyString(category)) {
                showErrorInput('vendor-category-details', submitBtn, loadingDiv, categoryErrorDiv);
                nonInputChecks = false;
            }

            if(!inputChecks) {
                handleNonInputErrors(form, submitBtn, loadingDiv)
            }

            handleEmailErrors(emailValidate, 'email-input', submitBtn, loadingDiv);

            if (inputChecks && nonInputChecks && emailValidate) {

                const formData = new FormData();
                addToFormData(formData, 'name', name);
                addToFormData(formData, 'title', title);
                addToFormData(formData, 'company_name', companyName);
                addToFormData(formData, 'clientName', clientName);
                addToFormData(formData, 'category', category);
                addToFormData(formData, 'email', email);
                addToFormData(formData, 'phone_number', phone);
                addToFormData(formData, 'website', website);
                addToFormData(formData, 'address', address);
                addToFormData(formData, 'city', city);
                addToFormData(formData, 'region', region);
                addToFormData(formData, 'zip_code', zip);
                addToFormData(formData, 'country', country);
                addToFormData(formData, 'print_advertising', printAdvertising);
                addToFormData(formData, 'digital_advertising', digitalAdvertising);
                addToFormData(formData, 'editors_circle_membership', editorsCircleMembership);
                addToFormData(formData, 'business_membership', businessMembership);
                addToFormData(formData, 'email_blasts', emailBlasts);
                addToFormData(formData, 'newsletters', newsletters);
                addToFormData(formData, 'sponsored_content', sponsoredContent);

                fetch('_MINIFY_SCRIPT_INSERT_BASE_URL_local_rep_contact/', {
                    method: 'POST',
                    headers: getCSRFTokenHeader(),
                    body: formData
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Bad Request');
                    }
                    // console.log("success");
                    loadingDiv.classList.add('hidden');
                    successDiv.classList.remove('hidden');
                })
                .catch(error => {
                    errorDiv.classList.remove('hidden');
                    loadingDiv.classList.add('hidden');
                    submitBtn.classList.remove('hidden');
                    // Handle any errors
                    console.error(error);
                });
            }
        });
    }
}

function setupContactUsForm(formId) {
    let form = getId(formId);
    if(form) {
        form.setAttribute('novalidate', '');
        form.addEventListener("submit", function(event) {
            event.preventDefault(); // Prevents the default form submission behavior
            hideInputErrorMessages();
            let category = getId('feedback-category-details').getAttribute('data-value');
            let firstName = getId('first-name-input').value;
            let lastName = getId('last-name-input').value;
            let email = getId('email-input').value;
            let phone = getId('phone-input').value;
            let companyName = getId('company-name-input').value;
            let title = getId('title-input').value;
            let address = getId('address-input').value;
            let city = getId('city-input').value;
            let region = getId('state-input').value;
            let zip = getId('zip-input').value;
            let country = getId('country-input').value;
            let message = getId('message-input').value;

            let errorDiv = getId('contact-error');
            let submitBtn = getId('contact-submit');
            let loadingDiv = getId('contact-loading');
            let successDiv = getId('contact-success');
            let categoryErrorDiv = getId('feedback-category-details').parentNode.lastChild.firstChild;

            submitBtn.classList.add('hidden');
            loadingDiv.classList.remove('hidden');
            errorDiv.classList.add('hidden');
            categoryErrorDiv.classList.add('hidden');

            let inputChecks = form.checkValidity();
            let nonInputChecks = true;
            let emailValidate = validateEmail(email);

            if (isEmptyString(category)) {
                showErrorInput('feedback-category-details', submitBtn, loadingDiv, categoryErrorDiv);
                nonInputChecks = false;
            }

            if(!inputChecks) {
                handleNonInputErrors(form, submitBtn, loadingDiv)
            }

            handleEmailErrors(emailValidate, 'email-input', submitBtn, loadingDiv);

            if (inputChecks && nonInputChecks && emailValidate) {
                const formData = new FormData();
                addToFormData(formData, 'category', category);
                addToFormData(formData, 'first_name', firstName);
                addToFormData(formData, 'last_name', lastName);
                addToFormData(formData, 'email', email);
                addToFormData(formData, 'phone_number', phone);
                addToFormData(formData, 'company_name', companyName);
                addToFormData(formData, 'title', title);
                addToFormData(formData, 'address', address);
                addToFormData(formData, 'city', city);
                addToFormData(formData, 'region', region);
                addToFormData(formData, 'zip_code', zip);
                addToFormData(formData, 'country', country);
                addToFormData(formData, 'message', message);

                fetch('_MINIFY_SCRIPT_INSERT_BASE_URL_contact/', {
                    method: 'POST',
                    headers: getCSRFTokenHeader(),
                    body: formData
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Bad Request');
                    }
                    // console.log("success");
                    loadingDiv.classList.add('hidden');
                    successDiv.classList.remove('hidden');
                })
                .catch(error => {
                    errorDiv.classList.remove('hidden');
                    loadingDiv.classList.add('hidden');
                    submitBtn.classList.remove('hidden');
                    // Handle any errors
                    console.error(error);
                });
            }
        });
    }
}

function setupAdvertiseForm(formId) {
    let form = getId(formId);
    if(form) {
        form.setAttribute('novalidate', '');
        form.addEventListener("submit", function(event) {
            event.preventDefault(); // Prevents the default form submission behavior
            hideInputErrorMessages();
            let name = getId('advertise-name').value;
            let title = getId('advertise-title').value;
            let companyName = getId('advertise-company-name').value;
            let clientName = getId('advertise-client-name').value;
            let category = getId('ads-category-details').getAttribute('data-value');
            let phoneNumber = getId('advertise-phone-number').value;
            let email = getId('advertise-email').value;
            let website = getId('advertise-website').value;
            let address = getId('advertise-address').value;
            let city = getId('advertise-city').value;
            let region = getId('advertise-state').value;
            let zip = getId('advertise-zip').value;
            let country = getId('advertise-country').value;
            let printAdvertisingAdvertorialInserts = getId('printAdvertisingAdvertorialInserts').checked;
            let digitalAdvertisingSponsoredPosts = getId('digitalAdvertisingSponsoredPosts').checked;
            let vendorAndVenueDirectoryListings = getId('vendorAndVenueDirectoryListings').checked;
            let requestEditorsCircleMembership = getId('requestEditorsCircleMembership').checked;
            let other = getId('other').checked;

            let categoryErrorDiv = getId('ads-category-details').parentNode.lastChild.firstChild;
            let errorDiv = getId('advertise-error');
            let submitBtn = getId('advertise-submit');
            let loadingDiv = getId('advertise-loading');
            let successDiv = getId('advertise-success');

            submitBtn.classList.add('hidden');
            loadingDiv.classList.remove('hidden');
            errorDiv.classList.add('hidden');
            categoryErrorDiv.classList.add('hidden');

            let inputChecks = form.checkValidity();
            let nonInputChecks = true;
            let emailValidate = validateEmail(email);

            if(isEmptyString(category)) {
                showErrorInput('ads-category-details', submitBtn, loadingDiv, categoryErrorDiv);
                nonInputChecks = false;
            }

            if(!inputChecks) {
                handleNonInputErrors(form, submitBtn, loadingDiv)
            }

            handleEmailErrors(emailValidate, 'email-input', submitBtn, loadingDiv);

            if (inputChecks && nonInputChecks && emailValidate) {

                const formData = new FormData();
                addToFormData(formData, 'name', name);
                addToFormData(formData, 'title', title);
                addToFormData(formData, 'company_name', companyName);
                addToFormData(formData, 'client_name', clientName);
                addToFormData(formData, 'category', category);
                addToFormData(formData, 'phone_number', phoneNumber);
                addToFormData(formData, 'email', email);
                addToFormData(formData, 'website', website);
                addToFormData(formData, 'address', address);
                addToFormData(formData, 'city', city);
                addToFormData(formData, 'region', region);
                addToFormData(formData, 'zip_code', zip);
                addToFormData(formData, 'country', country);
                addToFormData(formData, 'print_advertising_advertorial_inserts', printAdvertisingAdvertorialInserts);
                addToFormData(formData, 'digital_advertising_sponsored_posts', digitalAdvertisingSponsoredPosts);
                addToFormData(formData, 'vendor_and_venue_directory_listings', vendorAndVenueDirectoryListings);
                addToFormData(formData, 'request_editors_circle_membership', requestEditorsCircleMembership);
                addToFormData(formData, 'other', other);

                fetch('_MINIFY_SCRIPT_INSERT_BASE_URL_advertise_contact/', {
                    method: 'POST',
                    headers: getCSRFTokenHeader(),
                    body: formData
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Bad Request');
                    }
                    // console.log("success");
                    loadingDiv.classList.add('hidden');
                    successDiv.classList.remove('hidden');
                })
                .catch(error => {
                    errorDiv.classList.remove('hidden');
                    loadingDiv.classList.add('hidden');
                    submitBtn.classList.remove('hidden');
                    // Handle any errors
                    console.error(error);
                });
            }
        });
    }
}

function setupRequesInfoForm(formId) {
    let form = getId(formId);
    if(form) {
        form.setAttribute('novalidate', '');
        form.addEventListener("submit", function(event) {
            event.preventDefault(); // Prevents the default form submission behavior
            hideInputErrorMessages();
            let firstName = getId('first-name-input').value;
            let lastName = getId('last-name-input').value;
            let email = getId('email-input').value;
            let phone = getId('phone-input').value;
            let weddingDate = getId('wedding-date-input').value;
            let location = getId('location-input').value;
            let message = getId('message-input').value;
            let errorDiv = getId('request-info-error');
            let submitBtn = getId('request-info-submit');
            let loadingDiv = getId('request-info-loading');
            let successDiv = getId('request-info-success');

            submitBtn.classList.add('hidden');
            loadingDiv.classList.remove('hidden');
            errorDiv.classList.add('hidden');

            let inputChecks = form.checkValidity();
            let emailValidate = validateEmail(email);


            if(!inputChecks) {
                handleNonInputErrors(form, submitBtn, loadingDiv)
            }

            handleEmailErrors(emailValidate, 'email-input', submitBtn, loadingDiv);

            if (inputChecks && emailValidate) {

                    let parts = url.split("/");
                    let vendorId = parts[parts.length - 3];

                    const formObject = {};
                    addToObject(formObject, 'first_name', firstName);
                    addToObject(formObject, 'last_name', lastName);
                    addToObject(formObject, 'email', email);
                    addToObject(formObject, 'phone', phone);
                    addToObject(formObject, 'wedding_date', weddingDate);
                    addToObject(formObject, 'location', location);
                    addToObject(formObject, 'message', message);

                    fetch(`_MINIFY_SCRIPT_INSERT_BASE_URL_vendors/${vendorId}/request_info/`, {
                        method: 'POST',
                        headers: getCSRFTokenHeader({'content-type': 'application/json'}),
                        body: JSON.stringify(formObject)
                    })
                    .then(response => {
                        if (!response.ok) {
                             throw new Error('Bad Request');
                        }
                           // console.log("success");
                            loadingDiv.classList.add('hidden');
                            successDiv.classList.remove('hidden');
                    })
                    .catch(error => {
                        errorDiv.classList.remove('hidden');
                        loadingDiv.classList.add('hidden');
                        submitBtn.classList.remove('hidden');
                        // Handle any errors
                        console.error(error);
                    });

            }
        });
    }
}

function handleFocus() {
    this.type = 'date';
    this.showPicker();
}

function setupDatePicker(inputId){
    let inputElement = getId(inputId);
    if(inputElement) {
        inputElement.addEventListener('click', handleFocus);
        inputElement.addEventListener('touchstart', handleFocus);
    }
}

function setupImagePicker(inputId){
    let inputElement = getId(inputId);
    if(inputElement) {
        inputElement.addEventListener('change', function() {
        let previewImg = getId(inputId+'-img');
        let previewPlaceholder = getId(inputId+'-placeholder');
        var file = inputElement.files[0];
        if (file.size > 2 * 1024 * 1024) {
            alert('Please select an image file smaller than 2MB.');
            return;
        }

        var reader = new FileReader();
        reader.onload = function(e) {
            previewImg.src = e.target.result;
            previewImg.classList.remove("hidden");
            previewPlaceholder.classList.add("hidden");
            getId('image-input-button').classList.remove('with-error'); //hide error border
            getId('image-input').parentNode.parentNode.parentNode.lastChild.firstChild.classList.add('hidden'); //hide error
        };
        reader.readAsDataURL(file);
        });
    }
}

function getMoreWeddings(e) {
    let loading = getId('real-weddings-loading');
    loading.classList.remove('hidden');
    e.classList.add('hidden');

    weddingFetchOffset += weddingFetchLimit;
    let fetchUrl = `_MINIFY_SCRIPT_INSERT_BASE_URL_weddings_search/?fields=id,images_preview,title,slug,wedding_city(display_name,id)&limit=${weddingFetchLimit}&offset=${weddingFetchOffset}&order=-first_published_at`

    if(url.includes('/weddings/search/category/')) {
        let parts = url.split("/");

        if (parts[parts.length - 3] === 'views') {
            let viewsPart = parts[parts.length - 2];
            fetchUrl += `&views=${viewsPart}`;
        }
        if (parts[parts.length - 3] === 'event_type') {
            let viewsPart = parts[parts.length - 2];
            fetchUrl += `&event_type=${viewsPart}`;
        }
        if (parts[parts.length - 3] === 'genre_type') {
            let viewsPart = parts[parts.length - 2];
            fetchUrl += `&genre_type=${viewsPart}`;
        }
        if (parts[parts.length - 3] === 'location_type') {
            let viewsPart = parts[parts.length - 2];
            fetchUrl += `&location_type=${viewsPart}`;
        }
        if (parts[parts.length - 3] === 'season_type') {
            let viewsPart = parts[parts.length - 2];
            fetchUrl += `&season_type=${viewsPart}`;
        }
        if (parts[parts.length - 3] === 'style_type') {
            let viewsPart = parts[parts.length - 2];
            fetchUrl += `&style_type=${viewsPart}`;
        }
    }

    //if the page is a colors page - do a lookup for the color id
    if(url.includes('/weddings/search/color/')) {
        let parts = url.split("/");
        let colorPart = parts[parts.length - 2];
        let colorId = (1 + colorLookup.indexOf(colorPart)).toString();
        fetchUrl += `&colors=${colorId}`;
    }

    if(queryString) {
        fetchUrl += `&${queryString}`;
    }
    fetch(fetchUrl, { method: 'GET' })
    .then(response => {
        if (!response.ok) {
          throw new Error('Bad Request');
        }
        return response.json();
    })
    .then(data => {
        let grid = getId('real-wedding-grid'); // add photo-grid to here
        const parser = new DOMParser();
        data['items'].forEach(item => {
            let clonedElement = getClass('photo-grid')[0].cloneNode(true); // get copy of first element
            let aList = clonedElement.getElementsByTagName('a');
            [...aList].forEach(a => {
                    a.href = `/weddings/${item.slug}/${item.id}/`
                    if(a.parentNode.tagName === 'H2'){
                        a.textContent = item.title;
                    }
                });
            clonedElement.querySelector(".label").textContent = item.wedding_city.display_name;
            //TOOD how to handle spaces for adverts
            let imgList = clonedElement.getElementsByTagName('img');
            let i = 0;
            [...imgList].forEach(img => {
                img.alt = item.images_preview[i].image.alt;
                img.title = item.images_preview[i].image.title;
                const dataSrcset = img.getAttribute('data-srcset');
                const originalImageUrl = dataSrcset.split(',').map(source => source.trim().split(' ')[0])[0];
                const originalFileName = originalImageUrl.substring(originalImageUrl.lastIndexOf('/') + 1)
                const htmlString = img.outerHTML;
                const newImageUrl = item.images_preview[i].image.original.url;
                const modifiedHtmlString = htmlString.replace(new RegExp(originalFileName, 'g'), newImageUrl.substring(newImageUrl.lastIndexOf('/') + 1));
                const modifiedElement = parser.parseFromString(modifiedHtmlString, 'text/html').body.firstChild;
                const parentElement = img.parentElement;
                parentElement.replaceChild(modifiedElement, img);
                i++;
            });
            grid.appendChild(clonedElement);
        });

        loading.classList.add('hidden');
        if((weddingFetchOffset + weddingFetchLimit) <= data.meta.total_count){
            e.classList.remove('hidden');
        }
    })
    .catch(error => {
        console.error(error);
    })
}

function getMoreVendorImages(e) {
    vendorGalleryFetchOffset += vendorGalleryFetchLimit;

    let fetchUrl = `_MINIFY_SCRIPT_INSERT_BASE_URL_vendor_portfolio/?fields=image,category(id,slug)&limit=${vendorGalleryFetchLimit}&offset=${vendorGalleryFetchOffset}&order=-created`;
    //if the page is a colors page - do a lookup for the color id
    let parts = url.split("/");
    let vendorId = parts[parts.length - 2];
    fetchUrl += `&vendor_id=${vendorId}`;

    getMoreImages(e, fetchUrl, vendorGalleryFetchOffset, vendorGalleryFetchLimit);
}

function getMoreGalleryImages(e) {
    galleryFetchOffset += galleryFetchLimit;

    let fetchUrl = `_MINIFY_SCRIPT_INSERT_BASE_URL_galleries_search/?fields=image,category(*)&limit=${galleryFetchLimit}&offset=${galleryFetchOffset}&order=-created&show_on_gallery=true`;
    //if the page is a colors page - do a lookup for the color id
    if(url.includes('/inspiration/images/category/')) {
        let parts = url.split("/");
        let categoryPart = parts[parts.length - 2];
        fetchUrl += `&category=${categoryPart}`;
    }

    if(url.includes('/inspiration/images/color/')) {
        let parts = url.split("/");
        let colorPart = parts[parts.length - 2];
        let colorId = (1 + colorLookup.indexOf(colorPart)).toString();
        fetchUrl += `&colors=${colorId}`;
    }

    if(queryString) {
        fetchUrl += `&${queryString}`;
    }

    getMoreImages(e, fetchUrl, galleryFetchOffset, galleryFetchLimit);
}


function getMoreImages(e, fetchUrl, fetchOffset, fetchLimit) {
    let loading = getId('gallery-loading');
    loading.classList.remove('hidden');
    e.classList.add('hidden');

    fetch(fetchUrl, { method: 'GET' })
    .then(response => {
        if (!response.ok) {
          throw new Error('Bad Request');
        }
        return response.json();
    })
    .then(data => {
        let grid = getId('photo-library'); // add photo-library-block to here
        let block = grid.firstElementChild; //
        let element = block.firstElementChild // template to use for adding them to the new photoblock.
        let photoBlock = block.cloneNode(false);
        const parser = new DOMParser();

        data['items'].forEach(item => {
            let clonedElement = element.cloneNode(true); // get copy of first element
            let aList = clonedElement.getElementsByTagName('a');
            [...aList].forEach(a => {
                    let categorySlug ='no-categorized';
                    if(item.category && item.category.slug) {
                        categorySlug = item.category.slug;
                    }
                    a.href = `/inspiration/photo/${item.id}/${categorySlug}/${item.image.slug}/`
                });
            clonedElement.querySelector(".image-overlay-author").textContent = `Photo: ${item.image.photographed_by}`;
            //TODO how to handle spaces for adverts
            let imgHeight = Math.ceil((400 /item.image.original.width) * item.image.original.height);
            clonedElement.querySelector(".photo-library-image").style.height = imgHeight + 'px';
            let img = clonedElement.querySelector(".image");
            img.alt = item.image.alt;
            img.title = item.image.title;
            const dataSrcset = img.getAttribute('data-srcset');
            const originalImageUrl = dataSrcset.split(',').map(source => source.trim().split(' ')[0])[0];
            const originalFileName = originalImageUrl.substring(originalImageUrl.lastIndexOf('/') + 1)
            const htmlString = img.outerHTML;
            const newImageUrl = item.image.original.url;
            const modifiedHtmlString = htmlString.replace(new RegExp(originalFileName, 'g'), newImageUrl.substring(newImageUrl.lastIndexOf('/') + 1));
            const modifiedElement = parser.parseFromString(modifiedHtmlString, 'text/html').body.firstChild;
            const parentElement = img.parentElement;
            parentElement.replaceChild(modifiedElement, img);
            photoBlock.appendChild(clonedElement);
        });

        grid.appendChild(photoBlock);
        loading.classList.add('hidden');
        if((fetchOffset + fetchLimit) <= data.meta.total_count){
            e.classList.remove('hidden');
        }

    })
    .catch(error => {
        console.error(error);
    })
}


function getMoreTopVendors(e) {
    vendorFetchOffset+= vendorFetchLimit;
    let vendorCards = document.querySelectorAll(".vendor-card");

    let vendorsAlreadyLoaded = [];
    vendorCards.forEach(function(card) {
        vendorsAlreadyLoaded.push(card.getAttribute("data-vendor-id"));
    });
    let vendorsCsv = vendorsAlreadyLoaded.join(",")
    let fetchUrl = `_MINIFY_SCRIPT_INSERT_BASE_URL_vendors/?fields=id,slug,name,city(display_name,id),categories(*),main_image,membership(*),description,brief_summary&is_paid=true&limit=${vendorFetchLimit}&exclude=${vendorsCsv}&order=random`;
    getMoreVendors(e,fetchUrl);
}

function getMoreSearchVendors(e) {
    vendorFetchOffset+= vendorFetchLimit;
    let fetchUrl = `_MINIFY_SCRIPT_INSERT_BASE_URL_vendors_search/?fields=id,slug,name,city(display_name,id),categories(*),main_image,membership(*),description,brief_summary&limit=${vendorFetchLimit}&offset=${vendorFetchOffset}`;
    if(url.includes('/vendor/search/category/')) {
        let parts = url.split("/");
        let categoryPart = parts[parts.length - 2];
        fetchUrl += `&categories=${categoryPart}`;
    }

    if(queryString) {
        let pairs = queryString.split('&');
        pairs.forEach(p => {
            let pair = p.split('=');
            let paramName = decodeURIComponent(pair[0]);
            let paramValue = decodeURIComponent(pair[1]);
            switch(paramName) {
                case 'vendorCategorySlug':
                    fetchUrl += `&categories=${paramValue}`;
                    break;
                case 'location':
                    fetchUrl += `&location=${paramValue}`;
                    break;
                case 'willingToTravel':
                    fetchUrl += `&willingToTravel=${paramValue}`;
                    break;
                default:
                    break;
            }
        })
    }
    getMoreVendors(e,fetchUrl);
}


function getMoreVendors(e,fetchUrl){
    let loading = getId('vendors-loading');
    loading.classList.remove('hidden');
    e.classList.add('hidden');

    fetch(fetchUrl, { method: 'GET' })
    .then(response => {
        if (!response.ok) {
          throw new Error('Bad Request');
        }
        return response.json();
    })
    .then(data => {
        let cards = getId('vendor-cards'); // add vendor-card to here
        let vendorCard = cards.firstElementChild; //
        const parser = new DOMParser();

        data['items'].forEach(item => {
            if(!item.categories.length) {
                return;
            }

            let clonedVendorCard = vendorCard.cloneNode(true); // get copy of first element
            let aList = clonedVendorCard.getElementsByTagName('a');
            [...aList].forEach(a => {
                let requestInfo = ""
                if(a.href.includes("/request-info/")){
                    requestInfo = "request-info/";
                }
                a.href = `/biz/${item.slug}/${item.id}/${requestInfo}`

            });
            let badge = clonedVendorCard.querySelector(".top-level-badge");
            if(item.membership.account_type === 'TOP_LEVEL') {
                badge.classList.remove('hidden');
                badge.alt = `${item.name} - top level badge`;
            } else {
                badge.classList.add('hidden');
                badge.alt = '';
            }
            clonedVendorCard.setAttribute('data-vendor-id', item.id);
            clonedVendorCard.querySelector(".title__link").textContent = item.name;
            clonedVendorCard.querySelector(".categories").textContent = item.categories[0].name;
            clonedVendorCard.querySelector(".location").textContent = item.city.display_name;
            clonedVendorCard.querySelector(".description").textContent = item.brief_summary;
            clonedVendorCard.querySelector(".figure__caption").firstElementChild.textContent = `Photo: ${item.main_image.image.photographed_by}`;
            let img = clonedVendorCard.querySelector(".figure__image-container").firstElementChild;
            img.alt = item.main_image.image.alt;
            img.title = item.main_image.image.title;
            const dataSrcset = img.getAttribute('data-srcset');
            const originalImageUrl = dataSrcset.split(',').map(source => source.trim().split(' ')[0])[0];
            const originalFileName = originalImageUrl.substring(originalImageUrl.lastIndexOf('/') + 1)
            const htmlString = img.outerHTML;
            const newImageUrl = item.main_image.image.original.url;
            const modifiedHtmlString = htmlString.replace(new RegExp(originalFileName, 'g'), newImageUrl.substring(newImageUrl.lastIndexOf('/') + 1));
            const modifiedElement = parser.parseFromString(modifiedHtmlString, 'text/html').body.firstChild;
            const parentElement = img.parentElement;
            parentElement.replaceChild(modifiedElement, img);
            cards.appendChild(clonedVendorCard);
        });

        loading.classList.add('hidden');
        if((vendorFetchOffset + vendorFetchLimit) <= data.meta.total_count){
            e.classList.remove('hidden');
        }
    })
    .catch(error => {
        console.error(error);
    });
}

function removeTrailingSlash(string) {
    if (string.endsWith("/")) {
      string = string.slice(0, -1);
    }
    return string;
}

function getMoreNews(e){
    newsFetchOffset+= newsFetchLimit;

    let loading = getId('news-loading');
    loading.classList.remove('hidden');
    e.classList.add('hidden');

    let fetchUrl = `_MINIFY_SCRIPT_INSERT_BASE_URL_news/?fields=title,subtitle,description,slug,main_image,subcategory(*,category(*))&limit=${newsFetchLimit}&offset=${newsFetchOffset}&order=-first_published_at`;

    let urlSections = url.split("/news/");
    if(urlSections[1].length > 0) {
        let categoryTest = removeTrailingSlash(urlSections[1]);

        let parts = categoryTest.split("/");

        if(parts.length >= 2) {
            //extract top and sub category
            fetchUrl += `&subcategory__category__slug=${parts[0]}&subcategory__slug=${parts[1]}`;
        } else {
            // is a top level category only
            fetchUrl += `&subcategory__category__slug=${parts[0]}`;
        }
    }

    fetch(fetchUrl, { method: 'GET' })
    .then(response => {
        if (!response.ok) {
          throw new Error('Bad Request');
        }
        return response.json();
    })
    .then(data => {
        let cards = getId('news-list'); // add vendor-card to here
        let newsCard = cards.firstElementChild.nextElementSibling; // first one isnt lazy loaded
        const parser = new DOMParser();

        data['items'].forEach(item => {
            let clonedNewsCard = newsCard.cloneNode(true); // get copy of first element
            let aList = clonedNewsCard.getElementsByTagName('a');
            [...aList].forEach(a => {
                if(a.classList.contains('subcategory-link')){
                    a.href = `/news/${item.subcategory.category.slug}/${item.subcategory.slug}/`
                } else {
                    a.href = `/news/${item.subcategory.category.slug}/${item.slug}/${item.id}/`
                }
            });
            clonedNewsCard.querySelector(".subcategory").textContent = item.subcategory.name;
            clonedNewsCard.querySelector(".title").firstElementChild.textContent = item.title;
            clonedNewsCard.querySelector(".js-news-card-subtitle").textContent = item.subtitle;
            clonedNewsCard.querySelector(".js-news-card-description").textContent = item.description;
            clonedNewsCard.querySelector(".figure__caption").firstElementChild.textContent = `Photo: ${item.main_image.image.photographed_by}`;
            let img = clonedNewsCard.querySelector(".figure__image-container").firstElementChild;
            img.alt = item.main_image.image.alt;
            img.title = item.main_image.image.title;
            const dataSrcset = img.getAttribute('data-srcset');
            const originalImageUrl = dataSrcset.split(',').map(source => source.trim().split(' ')[0])[0];
            const originalFileName = originalImageUrl.substring(originalImageUrl.lastIndexOf('/') + 1)
            const htmlString = img.outerHTML;
            const newImageUrl = item.main_image.image.original.url;
            const modifiedHtmlString = htmlString.replace(new RegExp(originalFileName, 'g'), newImageUrl.substring(newImageUrl.lastIndexOf('/') + 1));
            const modifiedElement = parser.parseFromString(modifiedHtmlString, 'text/html').body.firstChild;
            const parentElement = img.parentElement;
            parentElement.replaceChild(modifiedElement, img);
            cards.appendChild(clonedNewsCard);

        });

        loading.classList.add('hidden');
        if((newsFetchOffset + newsFetchLimit) <= data.meta.total_count){
            e.classList.remove('hidden');
        }

    })
    .catch(error => {
        console.error(error);
    });

}

function getMoreSearchResults(e){
    const parentElement = e.parentNode;
    const loadingElement = parentElement.querySelector('.js-search-more-loading')
    const searchType = e.dataset.searchType;
    const totalResults = e.dataset.total;
    const currentOffset = e.dataset.offset;
    const query = e.dataset.query;
    const renderToSelector = e.dataset.renderTo;

    function startLoading() {
        loadingElement.classList.remove('hidden');
        e.classList.add('hidden');
    }
    function stopLoading(hasMoreResults = true) {
        if (!hasMoreResults) {
            parentElement.classList.add('hidden');
        }
        loadingElement.classList.add('hidden');
        e.classList.remove('hidden');
    }

    function generateSearchUrl(type, searchValue, offset, limit = 12) {
        let params = null

        switch (type) {
            case 'news':
                params = {
                    fields: 'id,title,slug,main_image,subcategory(*,category(*)),subtitle,description',
                    limit: limit,
                    offset: offset,
                    search: searchValue
                }
                break;
            case 'galleries':
                params = {
                    fields: 'category(*),image(*)',
                    limit: limit,
                    offset: offset,
                    search: searchValue
                }
                break;
            case 'weddings':
                params = {
                    fields: 'title,event_type_display,slug,main_image',
                    limit: limit,
                    offset: offset,
                    search: searchValue
                }
                break;
            case 'vendors':
                params = {
                    fields: 'name,main_image,city,slug,categories(*)',
                    limit: limit,
                    offset: offset,
                    search: searchValue
                }
                break;
        }

        return `${type}/${createParamsString(params)}`
    }

    function fetchSearchResults(type, searchValue, offset, limit = 12) {
        const fetchUrl = `_MINIFY_SCRIPT_INSERT_BASE_URL_${generateSearchUrl(type, searchValue, offset, limit)}`

        return fetch(fetchUrl, { method: 'GET' })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Bad Request');
                }
                return response.json();
            })
            .then(data => {
                return data
            })
    }

    function handleLoadMore(searchType, searchValue, offset, limit = 12) {
        startLoading()
        fetchSearchResults(searchType, searchValue, offset, limit).then(data => {
            const itemsCount = data.items.length;
            e.dataset.offset = parseInt(offset) + itemsCount;

            renderElements(searchType, data.items);

            stopLoading(parseInt(e.dataset.offset) < parseInt(totalResults))
        })
    }

    function renderElements(type, items) {
        const renderContainer = document.querySelector(renderToSelector);
        const element = renderContainer.firstElementChild;

        items.forEach(itemData => {
            renderContainer.append(renderElement(type, element, itemData))
        })
    }

    function renderElement(type, element, data) {
        const clonedElement = element.cloneNode(true);
        let renderedElement = null;

        switch (type) {
            case 'news':
                renderedElement = renderNewsElement(clonedElement, data)
                break;
            case 'galleries':
                renderedElement = renderGalleryElement(clonedElement, data)
                break;
            case 'weddings':
                renderedElement = renderWeddingsElement(clonedElement, data)
                break;
            case 'vendors':
                renderedElement = renderVendorElement(clonedElement, data)
                break;
        }

        return clonedElement
    }

    handleLoadMore(searchType, query, currentOffset)
}

function parseImage(element, url, alt, title, caption ) {
    const parser = new DOMParser();

    // image replace
    element.querySelector(".js-figure-image-caption").textContent = caption;
    let img = element.querySelector(".js-figure-image-container").firstElementChild;
    img.alt = alt;
    img.title = title;
    const dataSrcset = img.getAttribute('data-srcset');
    const originalImageUrl = dataSrcset.split(',').map(source => source.trim().split(' ')[0])[0];
    const originalFileName = originalImageUrl.substring(originalImageUrl.lastIndexOf('/') + 1)
    const htmlString = img.outerHTML;
    const newImageUrl = url;
    const modifiedHtmlString = htmlString.replace(new RegExp(originalFileName, 'g'), newImageUrl.substring(newImageUrl.lastIndexOf('/') + 1));
    const modifiedElement = parser.parseFromString(modifiedHtmlString, 'text/html').body.firstChild;
    const parentElement = img.parentElement;
    parentElement.replaceChild(modifiedElement, img);
    // end image replace

    return element
}

function renderNewsElement(element, data) {
    let currentElement = element;

    currentElement = parseImage(
        currentElement,
        data.main_image.image.original.url,
        data.main_image.image.alt,
        data.main_image.image.title,
        `Photo: ${data.main_image.image.photographed_by}`
    );

    // Links change
    const link = `/news/${data.subcategory.category.slug}/${data.subcategory.slug}/${data.slug}/${data.id}`;
    currentElement.querySelector('.js-card-link').href = link
    currentElement.querySelector('.js-cart-title-link').href = link

    // text change
    currentElement.querySelector('.js-cart-title-link').textContent = data.title
    currentElement.querySelector('.js-card-subtitle').textContent = data.subtitle

    return currentElement
}

function renderGalleryElement(element, data) {
    let currentElement = element;

    currentElement = parseImage(
        currentElement,
        data.image.original.url,
        data.image.alt,
        data.image.title,
        `Photo: ${data.image.photographed_by}`
    );

    // Links change
    let categorySlug = 'no-categorized';
    if(data.category && data.category.slug) {
        categorySlug = data.category.slug;
    }
    const link = `/inspiration/photo/${data.id}/${categorySlug}/${data.image.slug}/`
    currentElement.querySelector('.js-photo-library-element-link').href = link

    return currentElement
}

function renderWeddingsElement(element, data) {
    let currentElement = element;

    currentElement = parseImage(
        currentElement,
        data.main_image.image.original.url,
        data.main_image.image.alt,
        data.main_image.image.title,
        `Photo: ${data.main_image.image.photographed_by}`
    );

    // Links change
    const link = `/weddings/${data.slug}/${data.id}/`
    currentElement.querySelector('.js-card-style-1-link').href = link
    currentElement.querySelector('.js-card-style-1-link-title').href = link
    currentElement.querySelector('.js-card-style-1-link-button').href = link

    // text change
    currentElement.querySelector('.js-card-style-1-link-title').textContent = data.title

    return currentElement
}

function renderVendorElement(element, data) {
    let currentElement = element;

    let url = '';
    let alt = '';
    let title = '';
    let caption = '';

    if (data.main_image && data.main_image.image) {
        url = data.main_image.image.original.url;
        alt = data.main_image.image.alt;
        title = data.main_image.image.title;
        caption = `Photo: ${data.main_image.image.photographed_by}`;
    }

    currentElement = parseImage(
        currentElement,
        url,
        alt,
        title,
        caption
    );

    // Links change
    const link = `/biz/${data.slug}/${data.id}/`
    currentElement.querySelector('.js-card-style-4-link-title').href = link
    currentElement.querySelector('.js-vendor-profile-link').href = link
    currentElement.querySelector('.js-vendor-profile-request-quote-link').href = `${link}request-info/`

    // text change
    currentElement.querySelector('.js-card-style-4-link-title').textContent = data.name
    currentElement.querySelector('.js-card-style-4-category').textContent = data.categories[0] ? data.categories[0].name ?? 'uncategorized' : 'uncategorized';

    return currentElement
}

function additionalVendor(vendorSection) {
    let vendorElement = getId(vendorSection);
    if(vendorElement && vendorTemplate) {
        zIndexVendors--;
        let vendor = vendorTemplate.cloneNode(true);
        let vendorCategory =  vendor.querySelector(".select-drop-down");
        vendorCategory.style.zIndex = zIndexVendors;
        vendorCategory.firstChild.id += "-" + (60 - zIndexVendors);
        let radioInputs = vendorCategory.querySelectorAll('input[type="radio"]');
        let emailInput = vendor.querySelector("#vendor-email");
        emailInput.id += "-" + (60 - zIndexVendors);
        let inputName = ""
        radioInputs.forEach(input => {
            input.name += "-" + (60 - zIndexVendors);
            inputName = input.name;
            if(input.id !== "default"){
                input.id = input.name + "." + input.id.split(".")[1];
            }
        })
        let listItems = vendorCategory.querySelectorAll('.select-vendor-category');
        listItems.forEach(li => {
            li.setAttribute('for', inputName + "." +  li.getAttribute('for').split(".")[1]);
        })
        vendorElement.appendChild(vendor);
    }
}

function setupAdditionalVendor(vendorSection) {
    let vendorElement = getId(vendorSection);
    if(vendorElement) {
        vendorTemplate = vendorElement.firstChild.cloneNode(true);
    }
}

function removeVendor(e){
    let parentDiv = e.parentNode;
    parentDiv.parentNode.removeChild(parentDiv);
}

function clickedSupport() {
    closeMenu('menu-sidebar-drawer');
    if (window && window.UserVoice && window.UserVoice.push) {
        window.UserVoice.push([
            "showLightbox",
            "classic_widget",
            {
                mode: "support",
                primary_color: "#000000",
                link_color: "#303030",
                topic_id: "81543"
            }
        ]);
    }
}

function closeMenu(menuId) {
    let e = getId(menuId);
    let drawer = e.querySelector('.sidebar__drawer');
    drawer.classList.remove('open');
    let dimmer = e.querySelector('.dimmer');
    dimmer.classList.remove('visible');
}

function toggleMenu(menuId) {
    let e = getId(menuId);
    let drawer = e.querySelector('.sidebar__drawer');
    toggleClass(drawer,'open');
    let dimmer = e.querySelector('.dimmer');
    toggleClass(dimmer,'visible');
}

function closeDimmerMenu(dimmer) {
    dimmer.classList.remove('visible');
    let e = dimmer.parentNode.parentNode;
    let drawer = e.querySelector('.sidebar__drawer');
    drawer.classList.remove('open');
}

function categoriesShowToggle(e) {
    let c = e.parentNode.parentNode.querySelector('.category-container');
    if (c.classList.contains('fixed-height')) {
        e.innerHTML='Show less categories'
        c.classList.remove('fixed-height');
    } else {
        e.innerHTML='Show more categories'
        c.classList.add('fixed-height');
        c.parentNode.parentNode.parentNode.scrollIntoView({behavior: 'smooth', block: 'center'})
    }
}

function featuredShowToggle(e) {
    let c = e.parentNode.parentNode.querySelector('.featured-container');
    if (c.classList.contains('fixed-height')) {
        e.innerHTML='Show less'
        c.classList.remove('fixed-height');
    } else {
        e.innerHTML='Show more'
        c.classList.add('fixed-height');
        c.parentNode.parentNode.parentNode.scrollIntoView({behavior: 'smooth', block: 'center'})
    }
}

function toggleReadMoreAccordion(e) {
    let a = e.parentNode;
    if (a.classList.contains('expanded')) {
        a.classList.remove('expanded');
        e.textContent = 'Read More';
    } else {
        a.classList.add('expanded');
        e.textContent = 'Read Less';
    }
}

function setupDocumentClick(){
    document.addEventListener('click', function(event) {
        let e = event.target;

        switch (e.id) {
            case 'advanced-filters-button':
                toggleClass(e,'--toggled');
                toggleIdClass('advanced-filters-panel','hidden');
                break;
            case 'advanced-filters-clear-all':
                removeChecked('advanced-filters-checkbox');
                break;
            case 'advanced-search-button':
                toggleClass(e,'--toggled');
                toggleIdClass('advanced-search-panel','hidden');
                break;
            case 'real-weddings-load-more':
                getMoreWeddings(e);
                break;
            case 'gallery-load-more':
                getMoreGalleryImages(e);
                break;
            case 'vendor-gallery-load-more':
                getMoreVendorImages(e);
                break;
            case 'top-vendors-load-more':
                getMoreTopVendors(e);
                break;
            case 'vendors-load-more':
                getMoreSearchVendors(e);
                break;
            case 'news-load-more':
                getMoreNews(e);
                break;
            case 'wedding-resources-btn':
                toggleMenu('wedding-resources-drawer');
                break;
            case 'wedding-highlights-btn':
                toggleMenu('wedding-highlights-drawer');
                break;
            case 'wedding-gallery-view':
                const gallery = document.getElementById('photo-gallery')
                gallery.scrollIntoView({behavior: 'smooth'})
                break;
            case 'search-load-more':
                getMoreSearchResults(e);
                break;
            default:
                break;
        }

        let classList = e.classList;
        classList.forEach(className => {
            switch (className) {
                case 'support':
                    clickedSupport();
                    break;
                case 'scroll-down':
                case 'subscribe':
                    closeMenu('menu-sidebar-drawer');
                    window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: 'smooth' });
                    break;
                case 'search-toggle__icon':
                    toggleDisplayFlex('mobile-search');
                    break;
                case 'dimmer':
                    closeDimmerMenu(e);
                    break;
                case 'toggle__icon': // mobile menu
                    toggleMenu('menu-sidebar-drawer');
                    break;
                case 'news-categories__btn':
                    changeWeddingNewsCategory(e);
                    break;
                case 'select-vendor-category':
                    closeDetails(e,'vendor-location');
                    updateDetailsDataValueToAfterDot(e);
                    break;
                case 'select-gallery-category':
                    closeDetails(e,'gallery-filter-search');
                    break;
                case 'select-wedding-category':
                    closeDetails(e);
                    break;
                case 'select-feedback-category':
                    closeDetails(e,'first-name-input');
                    break;
                case 'select-ads-category':
                    closeDetails(e,'advertise-phone-number');
                    break;
                case 'select-sender-type':
                    closeDetails(e);
                    break;
                case 'select-wedding-country':
                    closeDetails(e);
                    getStates('wedding-country-details','wedding-state-details','wedding-city-details')
                    break;
                case 'select-wedding-state':
                    closeDetails(e);
                    updateDetailsDataValueToAfterDot(e);
                    getCities('wedding-country-details','wedding-state-details','wedding-city-details');
                    break;
                case 'select-wedding-city':
                    closeDetails(e);
                    updateDetailsDataValueToAfterDot(e);
                    break;
                case 'select-vendor-country':
                    closeDetails(e);
                    getStates('vendor-country-details','vendor-state-details','vendor-city-details')
                    break;
                case 'select-vendor-state':
                    closeDetails(e);
                    updateDetailsDataValueToAfterDot(e);
                    getCities('vendor-country-details','vendor-state-details','vendor-city-details');
                    break;
                case 'select-vendor-city':
                    closeDetails(e);
                    updateDetailsDataValueToAfterDot(e);
                    break;
                case 'add-file-button':
                    document.getElementById('image-input').click();
                    break;
                case 'add-field-input-button':
                    additionalVendor('vendor-resources');
                    break;
                case 'trash-can':
                    removeVendor(e.parentNode);
                    break;
                case 'color':
                    toggleClass(e,'--selected');
                    break;
                case 'advanced-search-radio':
                    setAdvanacedSearch(e,'advanced-search-in');
                    break;
                case 'back-button':
                    window.history.back();
                    break;
                case 'category-show-more':
                    categoriesShowToggle(e);
                    break;
                case 'featured-show-more':
                    featuredShowToggle(e);
                    break;
                case 'accordion-text__btn':
                    toggleReadMoreAccordion(e);
                    break;
                default:
                    break;
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    //console.log('Document has finished loading');
    setupDocumentClick();
    setupSlider('news-slider');
    setupSlider('weddings-slider');
    setupSlider('wedding-gallery-slider');
    setupSlider('vendor-gallery-slider');
    setupSearchForm('mobile-search','mobile-search-input');
    setupSearchForm('global-search-form','global-search-input');
    setupVendorForm('vendor-search-form','vendor-category-details','vendor-location','willing-to-travel');
    setupRequesInfoForm('request-info-form');
    setupMembershipForm('newsletter-signup-form', 'newsletter-signup');
    setupAdvertiseForm('advertise-form');
    setupContactUsForm('contact-form');
    setupRepForm('rep-form');
    setupWeddingForm('wedding-form');
    setupBusinessForm('business-form');
    setupWeddingFiltersForm('wedding-filters-form');
    setupGalleryFiltersForm('gallery-filters-form');
    setupDatePicker('wedding-date-input');
    setupImagePicker('image-input');
    setupAdditionalVendor('vendor-resources');
    document.body.classList.remove('preload');
    console.log("DOMContentLoaded");
});
