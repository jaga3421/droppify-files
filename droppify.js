(function () {
    /*
    *   Summary: Convert an Empty Div into a Drag and Drop file upload element
    *   Author: jagadeesh.jkp@gmail.com
    *   Usage: Call DNDfy.init with options (they are optional)
        *   Selector (class/id of the element tat should be DNDfied)
        *   promptText (Text to show as Main prompt)
        *   activeClass (css class to apply when )
        *   acceptedFiles (accept only those files, else throw a tantrum... No, throw an error)
    * 
    */

    // Just in case if the library is added twice :P
    window.DNDfy = window.DNDfy || {};
    DNDfy.init = function (options = {}) {

        //helpers
        // To assign multiple Attributes to dynamically created element
        // Also, I realised there is no out-of-the-box element.setAttributes().. 
        const setAttributes = (elem, props) => {
            Object.entries(props).forEach(prop =>
                elem.setAttribute(...prop)
            )
        }
        // Props - setting default values if not passed during init
        let {
            selector = '.dnd',
            promptText = 'Click or Drop your Files here',
            activeClass = 'dragActive',
            acceptedFiles = []
        } = options;
        // variables - to be used within
        let fileMap = new Map(),
            form,
            details,
            submitBtn,
            summary,
            dndBox = document.querySelector(selector),
            unsupportedErrText = 'The following file(s) were not added because they are not in supported format';

        let acceptedFilesText = acceptedFiles.length ? ` (Accepted files are : ${acceptedFiles.toString()})` : '';

        /*
        *   Create the input element, the label element and placeholder to show file count, file names
        */
        let createElements = function () {
            form = document.createElement('form');
            form.setAttribute('id', 'dragDrop');

            let input = document.createElement('input');
            setAttributes(input, {
                id: 'fileUploadInp',
                type: 'file',
                multiple: true,
                hidden: true
            })

            let label = document.createElement('label');
            label.innerText = promptText;
            setAttributes(label, {
                for: 'fileUploadInp',
                class: 'uploadLabel'
            })

            summary = document.createElement('div');
            setAttributes(summary, {
                class: 'summary'
            })

            details = document.createElement('div');
            setAttributes(details, {
                class: 'details'
            })

            submitBtn = document.createElement('button');
            submitBtn.innerHTML = 'Submit';
            setAttributes(submitBtn, {
                type: 'submit',
                class: 'submit-uploadForm'
            })

            // add the bad boys to DOM
            form.appendChild(input);
            form.appendChild(label);
            form.appendChild(summary);
            form.appendChild(details);
            form.appendChild(submitBtn);
            dndBox.appendChild(form);
        }

        /*
        *   Binding the Dragevents, Remove-entry-event
        */
        let bindEvents = function () {
            dndBox.addEventListener('dragenter', dragEnter);
            dndBox.addEventListener('dragleave', dragLeave);
            dndBox.addEventListener('dragover', dragOver);
            dndBox.addEventListener('drop', dropped);
            details.addEventListener('click', removeEntry);
            form.addEventListener('submit', submitForm);

            function preventDefaults(e) {
                e.preventDefault()
                e.stopPropagation()
            }
            function dragEnter(e) {
                preventDefaults(e)
                dndBox.classList.add(`${activeClass}`)
            }

            function dragLeave(e) {
                preventDefaults(e)
                dndBox.classList.remove(`${activeClass}`)
            }
            function dragOver(e) {
                preventDefaults(e)
                dndBox.classList.add(`${activeClass}`)
            }
            function dropped(e) {
                preventDefaults(e)
                dndBox.classList.remove(`${activeClass}`);
                let files = e.dataTransfer.files;
                let exceptions = [];
                [...files].forEach(file => {
                    // On drop, check if the files are already in Map
                    // If yes then there are No duplicates, If no add them
                    // EE6 Map rocks !!
                    if (acceptedFiles.includes(file.name.split('.')[1])) {
                        fileMap.set(file.name, file);
                    }
                    else {
                        exceptions.push(file.name)
                    }
                });

                if (exceptions.length) {
                    alert(`${unsupportedErrText} : ${exceptions.toString()}`);
                }
                refreshSummary();
                refreshDetails();
            }
            function removeEntry(e) {
                try {
                    let key = e.target.dataset.key;
                    if (!key) return;

                    fileMap.delete(key);
                    refreshSummary();
                    refreshDetails();
                }
                catch (e) {
                    console.log('Dang! Sorry Bruh')
                }
            }
            function submitForm(e) {
                e.preventDefault();
                console.log(fileMap);
                alert('Well.. Only the front end is done.')
            }

        }

        let refreshSummary = function () {
            // todo : optimise : dont refresh just add/delete the node using key
            let summaryText;
            if (fileMap.size) {
                let plural = fileMap.size === 1 ? '' : 's';
                summaryText = `${fileMap.size} file${plural} added`;
                submitBtn.style.visibility = 'visible';
            }
            else {
                summaryText = 'No files added';
                submitBtn.style.visibility = 'hidden';
            }

            summary.innerText = summaryText + acceptedFilesText;
        }

        let refreshDetails = function () {
            details.innerHTML = null;
            [...fileMap.values()].forEach(file => {
                let entry = document.createElement('div');
                entry.innerHTML = file.name;
                setAttributes(entry, {
                    'class': 'file-entry',
                    'data-key': file.name
                })
                details.appendChild(entry);

            })
        }

        // Its Go time
        createElements();
        bindEvents();
        refreshSummary();
        refreshDetails();


        //styles
        // todo: optimise as per block. Dont inject css if classes are given
        let cssInJS = document.createElement('style')
        cssInJS.innerText = `
        ${selector},
        ${selector} * {
            box-sizing: content-box;
            font-family: system;
        }
        ${selector} {
            margin: 20px;
            background: #f2f2f2;
            min-height: 100px;
            border: 1px solid #f2f2f2;
            padding: 10px;

        }
        .${activeClass} {
            border: 1px dotted #999;
        }
        @font-face {
            font-family: system;
            font-style: normal;
            font-weight: 300;
            src: local(".SFNSText-Light"), local(".HelveticaNeueDeskInterface-Light"), local(".LucidaGrandeUI"), local("Ubuntu Light"), local("Segoe UI Light"), local("Roboto-Light"), local("DroidSans"), local("Tahoma");
        }
        .uploadLabel {
            width: 100%;
            display: block;
            padding: 20px 0;
            text-align: center;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            cursor: pointer;
        }
        .summary {
            font-size: .8rem;
            padding: 10px 0;
        }
        .file-entry {
            padding: 10px;
            margin-bottom: 5px;
            background: #dedede;
            cursor: pointer;
            position: relative;
            border-radius: 5px;
        }
        .file-entry:after {
            content: 'x';
            position: absolute;
            right: 10px;
        }
    `;
        document.getElementsByTagName('head')[0].appendChild(cssInJS);
    }

})()
