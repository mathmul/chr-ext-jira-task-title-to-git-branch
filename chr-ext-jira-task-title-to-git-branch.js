let popupContainer
let titleH1
let branchTypeSelect
let includeTaskKeyCheckbox
let branchNameInput

const getJiraTaskKey = () =>
    window.location.href.match(/\/browse\/([A-Z]+-\d+)/)?.[1] + '-' || ''

const slugifyText = text => text
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '-')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')

const generateBranchName = () => {

    if (undefined == titleH1)
        titleH1 = document.querySelector('h1')

    if (undefined == branchTypeSelect)
        branchTypeSelect = document.querySelector('#branchType')

    if (undefined == includeTaskKeyCheckbox)
        includeTaskKeyCheckbox = document.querySelector('#includeTaskKey')

    branchNameInput.value = `${branchTypeSelect.value}/${includeTaskKeyCheckbox.checked ? getJiraTaskKey() : ''}${slugifyText(titleH1.innerText)}`
}

const copyInputToClipboard = () => {

    branchNameInput.focus()
    branchNameInput.select()
    branchNameInput.setSelectionRange(0, 99999)

    navigator.clipboard.writeText(branchNameInput.value)

    closePopup()
}

const closePopup = () => {
    popupContainer.style.display = 'none'
}

const createPopup = () => {

    titleH1 = document.querySelector('h1')
    if (!titleH1) return
    if (!titleH1.innerText) return

    popupContainer = document.createElement('div')
    popupContainer.style.position = 'absolute'
    popupContainer.style.width = '100%'
    popupContainer.style.top = '100%'
    popupContainer.style.fontSize = '.875rem'
    popupContainer.style.zIndex = '9999'
    popupContainer.style.backgroundColor = 'var(--ds-surface, white)'
    popupContainer.style.display = 'none'
    popupContainer.style.gap = '.2em'
    popupContainer.style.alignItems = 'center'
    popupContainer.style.flexWrap = 'wrap'

    branchTypeSelect = document.createElement('select')
    branchTypeSelect.id = 'branchType'
    branchTypeSelect.style.padding = '.2em'
    branchTypeSelect.style.backgroundColor = 'var(--ds-background-input, white)'
    branchTypeSelect.style.border = '1px solid var(--ds-border-input, #DFE1E6)'
    branchTypeSelect.style.borderRadius = '3px'
    branchTypeSelect.style.height = '32px'
    branchTypeSelect.style.paddingLeft = 'var(--ds-space-250, 20px)'
    branchTypeSelect.style.paddingRight = 'var(--ds-space-250, 20px)'
    branchTypeSelect.style.letterSpacing = '-0.005em'
    branchTypeSelect.style.color = 'var(--ds-text-subtlest, #5E6C84)'
    branchTypeSelect.innerHTML = `
        <option value="feature">Feature</option>
        <option value="bugfix">Bugfix</option>
        <option value="hotfix">Hotfix</option>
    `
    branchTypeSelect.addEventListener('change', generateBranchName)

    includeTaskKeyCheckbox = document.createElement('input')
    includeTaskKeyCheckbox.type = 'checkbox'
    includeTaskKeyCheckbox.id = 'includeTaskKey'
    includeTaskKeyCheckbox.checked = true
    includeTaskKeyCheckbox.style.marginLeft = 'auto'
    includeTaskKeyCheckbox.style.cursor = 'pointer'
    const includeTaskKeyLabel = document.createElement('label')
    includeTaskKeyLabel.htmlFor = 'includeTaskKey'
    includeTaskKeyLabel.style.cursor = 'pointer'
    includeTaskKeyLabel.textContent = 'Include task key'
    includeTaskKeyCheckbox.addEventListener('change', generateBranchName)

    const copyButton = document.createElement('button')
    copyButton.style.marginLeft = 'auto'
    copyButton.style.alignItems = 'baseline'
    copyButton.style.border = '0px'
    copyButton.style.borderRadius = 'var(--ds-border-radius, 3px)'
    copyButton.style.boxSizing = 'border-box'
    copyButton.style.display = 'inline-flex'
    copyButton.style.fontSize = 'inherit'
    copyButton.style.fontStyle = 'normal'
    copyButton.style.fontFamily = 'inherit'
    copyButton.style.maxWidth = '100%'
    copyButton.style.position ='relative'
    copyButton.style.textAlign = 'center'
    copyButton.style.textDecoration = 'none'
    copyButton.style.whiteSpace = 'nowrap'
    copyButton.style.background = 'var(--ds-background-neutral, rgba(9, 30, 66, 0.04))'
    copyButton.style.cursor = 'pointer'
    copyButton.style.height = '2.28571em'
    copyButton.style.lineHeight = '2.28571em'
    copyButton.style.padding = '0px 10px'
    copyButton.style.verticalAlign ='middle'
    copyButton.style.width = 'auto'
    copyButton.style.justifyContent = 'center'
    copyButton.style.color = 'var(--ds-text, #42526E) !important'
    copyButton.innerHTML = 'Copy &#128464;'
    copyButton.addEventListener('click', copyInputToClipboard)

    const cancelButton = document.createElement('button')
    cancelButton.style.alignItems = 'baseline'
    cancelButton.style.border = '0px'
    cancelButton.style.borderRadius = 'var(--ds-border-radius, 3px)'
    cancelButton.style.boxSizing = 'border-box'
    cancelButton.style.display = 'inline-flex'
    cancelButton.style.fontSize = 'inherit'
    cancelButton.style.fontStyle = 'normal'
    cancelButton.style.fontFamily = 'inherit'
    cancelButton.style.maxWidth = '100%'
    cancelButton.style.position ='relative'
    cancelButton.style.textAlign = 'center'
    cancelButton.style.textDecoration = 'none'
    cancelButton.style.whiteSpace = 'nowrap'
    cancelButton.style.background = 'var(--ds-background-neutral, rgba(9, 30, 66, 0.04))'
    cancelButton.style.cursor = 'pointer'
    cancelButton.style.height = '2.28571em'
    cancelButton.style.lineHeight = '2.28571em'
    cancelButton.style.padding = '0px 10px'
    cancelButton.style.verticalAlign ='middle'
    cancelButton.style.width = 'auto'
    cancelButton.style.justifyContent = 'center'
    cancelButton.style.color = 'var(--ds-text, #42526E) !important'
    cancelButton.innerHTML = 'Cancel &#x2715;'
    cancelButton.addEventListener('click', closePopup)

    branchNameInput = document.createElement('input')
    branchNameInput.type = 'text'
    branchNameInput.style.flex = '1 1 100%'
    branchNameInput.style.padding = '.2em'
    branchNameInput.style.backgroundColor = 'var(--ds-background-input, white)'
    branchNameInput.style.border = '1px solid var(--ds-border-input, #DFE1E6)'
    branchNameInput.style.borderRadius = '3px'
    branchNameInput.style.height = '32px'
    branchNameInput.style.paddingLeft = 'var(--ds-space-250, 20px)'
    branchNameInput.style.letterSpacing = '-0.005em'
    branchNameInput.style.color = 'var(--ds-text-subtlest, #5E6C84)'
    generateBranchName()

    popupContainer.appendChild(branchTypeSelect)
    popupContainer.appendChild(includeTaskKeyCheckbox)
    popupContainer.appendChild(includeTaskKeyLabel)
    popupContainer.appendChild(copyButton)
    popupContainer.appendChild(cancelButton)
    popupContainer.appendChild(branchNameInput)

    titleH1.parentElement.parentElement.parentElement.appendChild(popupContainer)
    titleH1.style.position = 'relative'
    titleH1.addEventListener('mouseover', () => {
        popupContainer.style.display = 'flex'
    })
}

const observeDOMChanges = () => {
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (document.body.contains(titleH1)) return
            createPopup()
        })
    })

    observer.observe(document.body, { childList: true, subtree: true })
}

createPopup()
observeDOMChanges()
