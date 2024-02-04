const incomeArea = document.querySelector('.income-area')
const expensesArea = document.querySelector('.expenses-area')
const availableMoney = document.querySelector('.available-money')
const addTransactionBtn = document.querySelector('.add-transaction')
const deleteAllBtn = document.querySelector('.delete-all')
const lightBtn = document.querySelector('.light')
const darkBtn = document.querySelector('.dark')
const addTransactionPanel = document.querySelector('.add-transaction-panel')
const nameInput = document.querySelector('#name')
const amountInput = document.querySelector('#amount')
const categorySelect = document.querySelector('#category')
const saveBtn = document.querySelector('.save')
const cancelBtn = document.querySelector('.cancel')

let root = document.documentElement
let ID
let selectValue
let selectIcon

const openPanel = () => {
	addTransactionPanel.style.display = 'flex'
}

const closePanel = () => {
	addTransactionPanel.style.display = 'none'
}

const checkPanel = () => {
	if (nameInput.value !== '' && amountInput.value !== '' && categorySelect.selectedIndex !== 0) {
		createTransaction()
		closePanel()
	} else {
		console.log('nie ok')
	}
}



const createTransaction = () => {
	
	const transaction = document.createElement('div')
	transaction.classList.add('transaction')
	transaction.setAttribute('id', 'ID')

	chooseIcon(selectValue)

	transaction.innerHTML = `<p class="transaction-name">${selectIcon}${nameInput.value}</p>
	<p class="transaction-amount">${amountInput.value}zł <button class="delete"><i
				class="fas fa-times"></i></button></p>`

	if (selectValue === 'income') {
		incomeArea.appendChild(transaction)
	} else {
		expensesArea.appendChild(transaction)
	}

	ID++
}
const checkCategory = () => {
	selectValue = categorySelect.options[categorySelect.selectedIndex].value
}

const chooseIcon = (option) => {
	switch (option) {
		case 'income':
			selectIcon = '<i class="fas fa-money-bill-wave"></i>'
			break;
		case 'shopping':
			selectIcon = '<i class="fas fa-cart-arrow-down"></i>'
			break;
		case 'food':
			selectIcon = '<i class="fas fa-hamburger"></i>'
			break;
		case 'cinema':
			selectIcon = '<i class="fas fa-film"></i>'
			break;
	}
}

const checkSelectValue = () => {}

saveBtn.addEventListener('click', checkPanel)
cancelBtn.addEventListener('click', closePanel)
addTransactionBtn.addEventListener('click', openPanel)
