/**
 * ============================================================================
 * AURALEDGER — EXPENSE TRACKER ENGINE
 * Aesthetic: Creamy & Dry (Editorial Ledger)
 * CodSoft Frontend Development Internship — Task 3
 * ============================================================================
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. Constants & Default Demo Data
  // --------------------------------------------------------------------------
  const STORAGE_KEY = 'auraledger_transactions_v2';
  const CURRENCY_KEY = 'auraledger_currency_v2';

  const CATEGORY_ICONS = {
    Food: '🍽️',
    Travel: '🚗',
    Shopping: '🛍️',
    Bills: '⚡',
    Salary: '💼',
    Other: '📦'
  };

  const DEFAULT_TRANSACTIONS = [
    {
      id: 'tx_1',
      description: 'Monthly Salary',
      amount: 45000,
      type: 'income',
      category: 'Salary',
      date: getFormattedDateOffset(-4)
    },
    {
      id: 'tx_2',
      description: 'Supermarket Groceries & Pantry',
      amount: 4250,
      type: 'expense',
      category: 'Food',
      date: getFormattedDateOffset(-3)
    },
    {
      id: 'tx_3',
      description: 'Metro Card Monthly Recharge',
      amount: 1200,
      type: 'expense',
      category: 'Travel',
      date: getFormattedDateOffset(-2)
    },
    {
      id: 'tx_4',
      description: 'High-speed Fiber Internet & Electricity',
      amount: 2850,
      type: 'expense',
      category: 'Bills',
      date: getFormattedDateOffset(-1)
    },
    {
      id: 'tx_5',
      description: 'Artisan Coffee & Bakery',
      amount: 650,
      type: 'expense',
      category: 'Food',
      date: getFormattedDateOffset(0)
    }
  ];

  // --------------------------------------------------------------------------
  // 2. Application State
  // --------------------------------------------------------------------------
  let state = {
    transactions: [],
    currency: 'INR',
    currencySymbol: '₹',
    filters: {
      category: 'ALL',
      type: 'ALL',
      search: '',
      sort: 'date-desc'
    },
    editingTxId: null,
    deletingTxId: null
  };

  // --------------------------------------------------------------------------
  // 3. DOM Elements Cache
  // --------------------------------------------------------------------------
  const elements = {
    // Summary display
    totalIncomeDisplay: document.getElementById('totalIncomeDisplay'),
    totalExpenseDisplay: document.getElementById('totalExpenseDisplay'),
    totalBalanceDisplay: document.getElementById('totalBalanceDisplay'),
    incomeCountBadge: document.getElementById('incomeCountBadge'),
    expenseCountBadge: document.getElementById('expenseCountBadge'),
    balanceHealthBadge: document.getElementById('balanceHealthBadge'),
    summarySymbols: document.querySelectorAll('.summary-symbol'),
    
    // Cashflow bar
    expenseRatioText: document.getElementById('expenseRatioText'),
    savingsRatioText: document.getElementById('savingsRatioText'),
    cashflowFill: document.getElementById('cashflowFill'),

    // Add Form
    transactionForm: document.getElementById('transactionForm'),
    txDescription: document.getElementById('txDescription'),
    txAmount: document.getElementById('txAmount'),
    txCategory: document.getElementById('txCategory'),
    txDate: document.getElementById('txDate'),
    typePillExpense: document.getElementById('typePillExpense'),
    typePillIncome: document.getElementById('typePillIncome'),
    txTypeExpense: document.getElementById('txTypeExpense'),
    txTypeIncome: document.getElementById('txTypeIncome'),
    inputCurrencyPrefix: document.getElementById('inputCurrencyPrefix'),
    quickChips: document.querySelectorAll('.chip-btn'),

    // History & Filters
    transactionList: document.getElementById('transactionList'),
    emptyState: document.getElementById('emptyState'),
    emptyStateDesc: document.getElementById('emptyStateDesc'),
    emptyResetFilterBtn: document.getElementById('emptyResetFilterBtn'),
    historyCounterPill: document.getElementById('historyCounterPill'),
    showingCountText: document.getElementById('showingCountText'),
    categoryFilterChips: document.querySelectorAll('.cat-filter-chip'),
    searchTxInput: document.getElementById('searchTxInput'),
    clearSearchBtn: document.getElementById('clearSearchBtn'),
    typeFilterSelect: document.getElementById('typeFilterSelect'),
    sortSelect: document.getElementById('sortSelect'),
    exportCsvBtn: document.getElementById('exportCsvBtn'),

    // Header Controls
    currencySelect: document.getElementById('currencySelect'),
    currencySymbolDisplay: document.getElementById('currencySymbolDisplay'),
    resetDemoBtn: document.getElementById('resetDemoBtn'),

    // Edit Modal
    editModal: document.getElementById('editModal'),
    editForm: document.getElementById('editForm'),
    editTxId: document.getElementById('editTxId'),
    editTxDescription: document.getElementById('editTxDescription'),
    editTxAmount: document.getElementById('editTxAmount'),
    editTxCategory: document.getElementById('editTxCategory'),
    editTxDate: document.getElementById('editTxDate'),
    editCurrencyPrefix: document.getElementById('editCurrencyPrefix'),
    editTypePillExpense: document.getElementById('editTypePillExpense'),
    editTypePillIncome: document.getElementById('editTypePillIncome'),
    editTxTypeExpense: document.getElementById('editTxTypeExpense'),
    editTxTypeIncome: document.getElementById('editTxTypeIncome'),
    closeEditModalBtn: document.getElementById('closeEditModalBtn'),
    cancelEditBtn: document.getElementById('cancelEditBtn'),

    // Delete Modal
    deleteModal: document.getElementById('deleteModal'),
    deleteTxId: document.getElementById('deleteTxId'),
    deleteConfirmText: document.getElementById('deleteConfirmText'),
    confirmDeleteBtn: document.getElementById('confirmDeleteBtn'),
    cancelDeleteBtn: document.getElementById('cancelDeleteBtn'),

    // Toasts
    toastContainer: document.getElementById('toastContainer')
  };

  // --------------------------------------------------------------------------
  // 4. Initialization
  // --------------------------------------------------------------------------
  function init() {
    loadCurrency();
    loadTransactions();
    setupDefaultDates();
    bindEvents();
    renderApp();
  }

  // --------------------------------------------------------------------------
  // 5. Storage & Persistence
  // --------------------------------------------------------------------------
  function loadTransactions() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        state.transactions = JSON.parse(stored);
      } else {
        // Populate default demo data on first visit
        state.transactions = [...DEFAULT_TRANSACTIONS];
        saveTransactions();
      }
    } catch (err) {
      console.warn('Could not read from localStorage, using default data:', err);
      state.transactions = [...DEFAULT_TRANSACTIONS];
    }
  }

  function saveTransactions() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.transactions));
    } catch (err) {
      console.error('Failed to save to localStorage:', err);
    }
  }

  function loadCurrency() {
    try {
      const savedCurrency = localStorage.getItem(CURRENCY_KEY);
      if (savedCurrency && ['INR', 'USD', 'EUR', 'GBP'].includes(savedCurrency)) {
        state.currency = savedCurrency;
        elements.currencySelect.value = savedCurrency;
      }
    } catch (err) {
      console.warn('Failed to load currency from storage:', err);
    }
    updateCurrencySymbols();
  }

  function saveCurrency() {
    try {
      localStorage.setItem(CURRENCY_KEY, state.currency);
    } catch (err) {
      console.error('Failed to save currency:', err);
    }
  }

  function updateCurrencySymbols() {
    const selectedOption = elements.currencySelect.options[elements.currencySelect.selectedIndex];
    state.currencySymbol = selectedOption.getAttribute('data-symbol') || '₹';
    
    // Update symbols in DOM
    if (elements.currencySymbolDisplay) {
      elements.currencySymbolDisplay.textContent = state.currencySymbol;
    }
    if (elements.inputCurrencyPrefix) {
      elements.inputCurrencyPrefix.textContent = state.currencySymbol;
    }
    if (elements.editCurrencyPrefix) {
      elements.editCurrencyPrefix.textContent = state.currencySymbol;
    }
    elements.summarySymbols.forEach(sym => {
      sym.textContent = state.currencySymbol;
    });
  }

  function setupDefaultDates() {
    const today = new Date().toISOString().split('T')[0];
    if (elements.txDate) {
      elements.txDate.value = today;
    }
    if (elements.editTxDate) {
      elements.editTxDate.value = today;
    }
  }

  // --------------------------------------------------------------------------
  // 6. Calculations & Balance Metrics
  // --------------------------------------------------------------------------
  function calculateMetrics() {
    let totalIncome = 0;
    let totalExpense = 0;
    let incomeCount = 0;
    let expenseCount = 0;

    state.transactions.forEach(tx => {
      const val = parseFloat(tx.amount) || 0;
      if (tx.type === 'income') {
        totalIncome += val;
        incomeCount++;
      } else {
        totalExpense += val;
        expenseCount++;
      }
    });

    const netBalance = totalIncome - totalExpense;
    const expenseRatio = totalIncome > 0 ? (totalExpense / totalIncome) * 100 : (totalExpense > 0 ? 100 : 0);
    const savingsRatio = totalIncome > 0 ? Math.max(0, ((totalIncome - totalExpense) / totalIncome) * 100) : 0;

    return {
      totalIncome,
      totalExpense,
      netBalance,
      incomeCount,
      expenseCount,
      expenseRatio,
      savingsRatio
    };
  }

  // --------------------------------------------------------------------------
  // 7. Filtering & Sorting Logic
  // --------------------------------------------------------------------------
  function getFilteredTransactions() {
    return state.transactions.filter(tx => {
      // Category filter
      if (state.filters.category !== 'ALL' && tx.category !== state.filters.category) {
        return false;
      }

      // Type filter
      if (state.filters.type !== 'ALL' && tx.type !== state.filters.type) {
        return false;
      }

      // Search filter (description & category)
      if (state.filters.search.trim()) {
        const query = state.filters.search.toLowerCase().trim();
        const matchesDesc = tx.description.toLowerCase().includes(query);
        const matchesCat = tx.category.toLowerCase().includes(query);
        if (!matchesDesc && !matchesCat) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (state.filters.sort === 'date-desc') {
        return new Date(b.date) - new Date(a.date);
      }
      if (state.filters.sort === 'date-asc') {
        return new Date(a.date) - new Date(b.date);
      }
      if (state.filters.sort === 'amount-desc') {
        return (parseFloat(b.amount) || 0) - (parseFloat(a.amount) || 0);
      }
      if (state.filters.sort === 'amount-asc') {
        return (parseFloat(a.amount) || 0) - (parseFloat(b.amount) || 0);
      }
      return 0;
    });
  }

  // --------------------------------------------------------------------------
  // 8. Render Engine
  // --------------------------------------------------------------------------
  function renderApp() {
    renderSummary();
    renderCashflow();
    renderHistory();
  }

  function renderSummary() {
    const metrics = calculateMetrics();

    // Format numbers
    elements.totalIncomeDisplay.textContent = formatNumber(metrics.totalIncome);
    elements.totalExpenseDisplay.textContent = formatNumber(metrics.totalExpense);
    elements.totalBalanceDisplay.textContent = formatNumber(metrics.netBalance);

    elements.incomeCountBadge.textContent = `${metrics.incomeCount} ${metrics.incomeCount === 1 ? 'deposit' : 'deposits'}`;
    elements.expenseCountBadge.textContent = `${metrics.expenseCount} ${metrics.expenseCount === 1 ? 'payout' : 'payouts'}`;

    // Balance Health Badge
    if (metrics.netBalance > 0) {
      elements.balanceHealthBadge.textContent = 'Surplus';
      elements.balanceHealthBadge.classList.remove('deficit');
    } else if (metrics.netBalance < 0) {
      elements.balanceHealthBadge.textContent = 'Deficit';
      elements.balanceHealthBadge.classList.add('deficit');
    } else {
      elements.balanceHealthBadge.textContent = 'Balanced';
      elements.balanceHealthBadge.classList.remove('deficit');
    }
  }

  function renderCashflow() {
    const metrics = calculateMetrics();
    const clampedRatio = Math.min(100, Math.round(metrics.expenseRatio));
    const savingsRounded = Math.round(metrics.savingsRatio);

    elements.expenseRatioText.textContent = `Expense Ratio: ${clampedRatio}% of income used`;
    elements.savingsRatioText.textContent = `Savings rate: ${savingsRounded}%`;
    elements.cashflowFill.style.width = `${clampedRatio}%`;
    elements.cashflowFill.parentElement.setAttribute('aria-valuenow', clampedRatio);
  }

  function renderHistory() {
    const filtered = getFilteredTransactions();
    const totalCount = state.transactions.length;

    // Header counter and footer info
    elements.historyCounterPill.textContent = `${filtered.length} of ${totalCount}`;
    elements.showingCountText.textContent = `Showing ${filtered.length} of ${totalCount} records`;

    // Empty state management
    if (filtered.length === 0) {
      elements.transactionList.innerHTML = '';
      elements.emptyState.hidden = false;

      if (totalCount === 0) {
        elements.emptyStateDesc.textContent = 'No transactions recorded yet. Use the form on the left to add your first transaction!';
        elements.emptyResetFilterBtn.style.display = 'none';
      } else {
        elements.emptyStateDesc.textContent = 'No transactions match your current search and filter selections.';
        elements.emptyResetFilterBtn.style.display = 'inline-block';
      }
      return;
    }

    elements.emptyState.hidden = true;

    // Populate transaction items
    elements.transactionList.innerHTML = filtered.map(tx => {
      const isIncome = tx.type === 'income';
      const sign = isIncome ? '+' : '−';
      const catIcon = CATEGORY_ICONS[tx.category] || '📦';
      const formattedDate = formatHumanDate(tx.date);
      const amountStr = formatNumber(tx.amount);

      return `
        <li class="tx-item ${isIncome ? 'is-income' : 'is-expense'}" data-id="${escapeHtml(tx.id)}">
          <div class="tx-left">
            <div class="tx-cat-icon" aria-hidden="true">${catIcon}</div>
            <div class="tx-info">
              <span class="tx-desc" title="${escapeHtml(tx.description)}">${escapeHtml(tx.description)}</span>
              <div class="tx-meta">
                <span class="tx-cat-pill">${escapeHtml(tx.category)}</span>
                <span class="tx-date-dot">•</span>
                <time datetime="${escapeHtml(tx.date)}">${formattedDate}</time>
              </div>
            </div>
          </div>

          <div class="tx-right">
            <div class="tx-amount-wrap">
              <span class="tx-type-sign">${sign}</span><span class="tx-curr">${state.currencySymbol}</span><span class="tx-amount">${amountStr}</span>
            </div>
            
            <div class="tx-actions">
              <button 
                type="button" 
                class="btn-icon-action edit-action" 
                data-action="edit" 
                data-id="${escapeHtml(tx.id)}" 
                title="Edit transaction"
                aria-label="Edit ${escapeHtml(tx.description)}"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 20h9"></path>
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                </svg>
              </button>

              <button 
                type="button" 
                class="btn-icon-action delete-action" 
                data-action="delete" 
                data-id="${escapeHtml(tx.id)}" 
                title="Delete transaction"
                aria-label="Delete ${escapeHtml(tx.description)}"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  <line x1="10" y1="11" x2="10" y2="17"></line>
                  <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
              </button>
            </div>
          </div>
        </li>
      `;
    }).join('');
  }

  // --------------------------------------------------------------------------
  // 9. Event Listeners & Binding
  // --------------------------------------------------------------------------
  function bindEvents() {
    // Add Transaction Form - Type Radio Pills
    elements.typePillExpense.addEventListener('click', () => setAddFormType('expense'));
    elements.typePillIncome.addEventListener('click', () => setAddFormType('income'));

    // Quick Suggestion Chips
    elements.quickChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const desc = chip.getAttribute('data-desc');
        const type = chip.getAttribute('data-type');
        const cat = chip.getAttribute('data-cat');

        if (desc) elements.txDescription.value = desc;
        if (type) setAddFormType(type);
        if (cat) elements.txCategory.value = cat;

        elements.txAmount.focus();
      });
    });

    // Add Transaction Submit
    elements.transactionForm.addEventListener('submit', handleAddTransaction);

    // Currency Switcher
    elements.currencySelect.addEventListener('change', () => {
      state.currency = elements.currencySelect.value;
      saveCurrency();
      updateCurrencySymbols();
      renderApp();
      showToast(`Currency changed to ${state.currency} (${state.currencySymbol})`);
    });

    // Reset Demo Data
    elements.resetDemoBtn.addEventListener('click', () => {
      state.transactions = [...DEFAULT_TRANSACTIONS];
      saveTransactions();
      resetAllFilters();
      renderApp();
      showToast('Ledger reset to demonstration sample transactions', 'info');
    });

    // Category Filter Chips
    elements.categoryFilterChips.forEach(chip => {
      chip.addEventListener('click', () => {
        elements.categoryFilterChips.forEach(c => {
          c.classList.remove('active');
          c.setAttribute('aria-selected', 'false');
        });
        chip.classList.add('active');
        chip.setAttribute('aria-selected', 'true');

        state.filters.category = chip.getAttribute('data-category') || 'ALL';
        renderHistory();
      });
    });

    // Type Filter Select
    elements.typeFilterSelect.addEventListener('change', () => {
      state.filters.type = elements.typeFilterSelect.value;
      renderHistory();
    });

    // Sort Select
    elements.sortSelect.addEventListener('change', () => {
      state.filters.sort = elements.sortSelect.value;
      renderHistory();
    });

    // Search Input
    elements.searchTxInput.addEventListener('input', () => {
      state.filters.search = elements.searchTxInput.value;
      elements.clearSearchBtn.hidden = !state.filters.search;
      renderHistory();
    });

    elements.clearSearchBtn.addEventListener('click', () => {
      elements.searchTxInput.value = '';
      state.filters.search = '';
      elements.clearSearchBtn.hidden = true;
      elements.searchTxInput.focus();
      renderHistory();
    });

    // Clear filters from empty state
    elements.emptyResetFilterBtn.addEventListener('click', resetAllFilters);

    // Transaction List Delegated Actions (Edit & Delete)
    elements.transactionList.addEventListener('click', e => {
      const btn = e.target.closest('[data-action]');
      if (!btn) return;

      const action = btn.getAttribute('data-action');
      const id = btn.getAttribute('data-id');

      if (action === 'edit') {
        openEditModal(id);
      } else if (action === 'delete') {
        openDeleteModal(id);
      }
    });

    // Edit Modal Form and Controls
    elements.editTypePillExpense.addEventListener('click', () => setEditFormType('expense'));
    elements.editTypePillIncome.addEventListener('click', () => setEditFormType('income'));
    elements.editForm.addEventListener('submit', handleSaveEdit);
    elements.closeEditModalBtn.addEventListener('click', closeEditModal);
    elements.cancelEditBtn.addEventListener('click', closeEditModal);

    // Close on backdrop click for Edit Modal
    elements.editModal.addEventListener('click', e => {
      if (e.target === elements.editModal) {
        closeEditModal();
      }
    });

    // Delete Modal Actions
    elements.confirmDeleteBtn.addEventListener('click', handleConfirmDelete);
    elements.cancelDeleteBtn.addEventListener('click', closeDeleteModal);
    elements.deleteModal.addEventListener('click', e => {
      if (e.target === elements.deleteModal) {
        closeDeleteModal();
      }
    });

    // Export to CSV
    elements.exportCsvBtn.addEventListener('click', handleExportCsv);
  }

  // --------------------------------------------------------------------------
  // 10. Form & Action Handlers
  // --------------------------------------------------------------------------
  function setAddFormType(type) {
    if (type === 'income') {
      elements.txTypeIncome.checked = true;
      elements.typePillIncome.className = 'type-switch-pill active-income';
      elements.typePillExpense.className = 'type-switch-pill';
    } else {
      elements.txTypeExpense.checked = true;
      elements.typePillExpense.className = 'type-switch-pill active-expense';
      elements.typePillIncome.className = 'type-switch-pill';
    }
  }

  function setEditFormType(type) {
    if (type === 'income') {
      elements.editTxTypeIncome.checked = true;
      elements.editTypePillIncome.className = 'type-switch-pill active-income';
      elements.editTypePillExpense.className = 'type-switch-pill';
    } else {
      elements.editTxTypeExpense.checked = true;
      elements.editTypePillExpense.className = 'type-switch-pill active-expense';
      elements.editTypePillIncome.className = 'type-switch-pill';
    }
  }

  function handleAddTransaction(e) {
    e.preventDefault();

    const description = elements.txDescription.value.trim();
    const amountVal = parseFloat(elements.txAmount.value);
    const type = elements.txTypeIncome.checked ? 'income' : 'expense';
    const category = elements.txCategory.value;
    const date = elements.txDate.value;

    // Validation
    if (!description) {
      showToast('Please provide a transaction description', 'warning');
      elements.txDescription.focus();
      return;
    }

    if (isNaN(amountVal) || amountVal <= 0) {
      showToast('Please enter a valid positive amount', 'warning');
      elements.txAmount.focus();
      return;
    }

    if (!category) {
      showToast('Please select a category', 'warning');
      elements.txCategory.focus();
      return;
    }

    if (!date) {
      showToast('Please pick a transaction date', 'warning');
      elements.txDate.focus();
      return;
    }

    // Create New Record
    const newTx = {
      id: 'tx_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      description,
      amount: amountVal,
      type,
      category,
      date
    };

    // Prepend to transaction array
    state.transactions.unshift(newTx);
    saveTransactions();
    renderApp();

    // Reset Form
    elements.transactionForm.reset();
    setAddFormType('expense'); // reset default to expense
    setupDefaultDates();

    showToast(`Added ${type === 'income' ? 'income' : 'expense'}: "${description}" (${state.currencySymbol}${formatNumber(amountVal)})`);
  }

  function openEditModal(id) {
    const tx = state.transactions.find(item => item.id === id);
    if (!tx) return;

    state.editingTxId = id;
    elements.editTxId.value = tx.id;
    elements.editTxDescription.value = tx.description;
    elements.editTxAmount.value = tx.amount;
    elements.editTxCategory.value = tx.category;
    elements.editTxDate.value = tx.date;

    setEditFormType(tx.type);

    if (typeof elements.editModal.showModal === 'function') {
      elements.editModal.showModal();
    } else {
      elements.editModal.setAttribute('open', '');
    }
  }

  function closeEditModal() {
    state.editingTxId = null;
    if (typeof elements.editModal.close === 'function') {
      elements.editModal.close();
    } else {
      elements.editModal.removeAttribute('open');
    }
  }

  function handleSaveEdit(e) {
    e.preventDefault();

    const id = elements.editTxId.value;
    const description = elements.editTxDescription.value.trim();
    const amountVal = parseFloat(elements.editTxAmount.value);
    const type = elements.editTxTypeIncome.checked ? 'income' : 'expense';
    const category = elements.editTxCategory.value;
    const date = elements.editTxDate.value;

    if (!description || isNaN(amountVal) || amountVal <= 0 || !category || !date) {
      showToast('Please fill out all required fields properly', 'warning');
      return;
    }

    const txIndex = state.transactions.findIndex(t => t.id === id);
    if (txIndex !== -1) {
      state.transactions[txIndex] = {
        ...state.transactions[txIndex],
        description,
        amount: amountVal,
        type,
        category,
        date
      };

      saveTransactions();
      renderApp();
      closeEditModal();
      showToast('Transaction updated successfully');
    }
  }

  function openDeleteModal(id) {
    const tx = state.transactions.find(item => item.id === id);
    if (!tx) return;

    state.deletingTxId = id;
    elements.deleteTxId.value = id;
    elements.deleteConfirmText.textContent = `Are you sure you want to delete "${tx.description}" (${state.currencySymbol}${formatNumber(tx.amount)})? This cannot be undone.`;

    if (typeof elements.deleteModal.showModal === 'function') {
      elements.deleteModal.showModal();
    } else {
      elements.deleteModal.setAttribute('open', '');
    }
  }

  function closeDeleteModal() {
    state.deletingTxId = null;
    if (typeof elements.deleteModal.close === 'function') {
      elements.deleteModal.close();
    } else {
      elements.deleteModal.removeAttribute('open');
    }
  }

  function handleConfirmDelete() {
    const id = state.deletingTxId || elements.deleteTxId.value;
    if (!id) return;

    const removedItem = state.transactions.find(t => t.id === id);
    state.transactions = state.transactions.filter(t => t.id !== id);
    saveTransactions();
    renderApp();
    closeDeleteModal();

    showToast(`Removed "${removedItem ? removedItem.description : 'Transaction'}" from records`);
  }

  function resetAllFilters() {
    state.filters.category = 'ALL';
    state.filters.type = 'ALL';
    state.filters.search = '';
    state.filters.sort = 'date-desc';

    elements.categoryFilterChips.forEach(c => {
      const isAll = c.getAttribute('data-category') === 'ALL';
      c.classList.toggle('active', isAll);
      c.setAttribute('aria-selected', isAll ? 'true' : 'false');
    });

    elements.typeFilterSelect.value = 'ALL';
    elements.sortSelect.value = 'date-desc';
    elements.searchTxInput.value = '';
    elements.clearSearchBtn.hidden = true;

    renderHistory();
  }

  function handleExportCsv() {
    if (state.transactions.length === 0) {
      showToast('No transactions to export', 'warning');
      return;
    }

    const headers = ['ID', 'Date', 'Type', 'Category', 'Description', 'Amount', 'Currency'];
    const rows = state.transactions.map(t => [
      `"${t.id}"`,
      `"${t.date}"`,
      `"${t.type}"`,
      `"${t.category}"`,
      `"${t.description.replace(/"/g, '""')}"`,
      t.amount,
      `"${state.currency}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `auraledger_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Ledger successfully exported as CSV');
  }

  // --------------------------------------------------------------------------
  // 11. Helper Utilities
  // --------------------------------------------------------------------------
  function formatNumber(num) {
    const val = Number(num) || 0;
    return val.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  function formatHumanDate(dateStr) {
    if (!dateStr) return '';
    try {
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        const d = new Date(parts[0], parts[1] - 1, parts[2]);
        return d.toLocaleDateString(undefined, {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        });
      }
      return dateStr;
    } catch {
      return dateStr;
    }
  }

  function getFormattedDateOffset(offsetDays) {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    return d.toISOString().split('T')[0];
  }

  function escapeHtml(str) {
    if (typeof str !== 'string') return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.setAttribute('role', 'status');

    let icon = '✦';
    if (type === 'warning') icon = '⚠️';
    if (type === 'info') icon = 'ℹ️';

    toast.innerHTML = `<span class="toast-icon">${icon}</span><span>${escapeHtml(message)}</span>`;
    elements.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('toast-leave');
      setTimeout(() => {
        if (toast.parentElement) {
          toast.parentElement.removeChild(toast);
        }
      }, 250);
    }, 3200);
  }

  // Kickstart on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
