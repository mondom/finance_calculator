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
let ID = 0
let selectValue
let selectIcon
let amountArr = [0]

const openPanel = () => {
	addTransactionPanel.style.display = 'flex'
	nameInput.value = ''
	amountInput.value = ''
	categorySelect.selectedIndex = 0
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
	transaction.setAttribute('id', ID)

	chooseIcon(selectValue)

	transaction.innerHTML = `<p class="transaction-name">${selectIcon}${nameInput.value}</p>
	<p class="transaction-amount">${amountInput.value}zł <button class="delete" onclick="deleteTransaction(${ID})"><i
				class="fas fa-times"></i></button></p>`

	if (selectValue === 'income') {
		incomeArea.appendChild(transaction)
		transaction.classList.add('income')
	} else {
		expensesArea.appendChild(transaction)
		transaction.classList.add('expenses')
	}

	amountArr.push(parseFloat(amountInput.value))

	countTotal()

	ID++
}

const countTotal = () => {
	const sum = amountArr.reduce((prevValue, currentValue) => prevValue + currentValue)

	availableMoney.textContent = `${sum}zł`
}

const checkCategory = () => {
	selectValue = categorySelect.options[categorySelect.selectedIndex].value
}

const chooseIcon = option => {
	switch (option) {
		case 'income':
			selectIcon = '<i class="fas fa-money-bill-wave"></i>'
			break
		case 'shopping':
			selectIcon = '<i class="fas fa-cart-arrow-down"></i>'
			break
		case 'food':
			selectIcon = '<i class="fas fa-hamburger"></i>'
			break
		case 'cinema':
			selectIcon = '<i class="fas fa-film"></i>'
			break
	}
}

const deleteTransaction = id => {
	const transactionToDelete = document.getElementById(id)

	const amountToSub = parseFloat(transactionToDelete.childNodes[2].innerText)

	const transactionIndex = amountArr.indexOf(amountToSub)

	amountArr.splice(transactionIndex, 1)

	console.log(transactionToDelete);

	transactionToDelete.classList.contains('income') ?
	incomeArea.removeChild(transactionToDelete) :
	expensesArea.removeChild(transactionToDelete)

}

const deleteAllTransactions = () => {
incomeArea.innerHTML = `<h3>Przychód:</h3>`
expensesArea.innerHTML = `<h3>Wydatki:</h3>`
amountArr = [0]
availableMoney.textContent = `0zł`
}



deleteAllBtn.addEventListener('click', deleteAllTransactions)
saveBtn.addEventListener('click', checkPanel)
cancelBtn.addEventListener('click', closePanel)
addTransactionBtn.addEventListener('click', openPanel)
