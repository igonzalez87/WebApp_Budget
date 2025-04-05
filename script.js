// Ensure the DOM is loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

    // --- Firebase Configuration ---
    const firebaseConfig = {
        apiKey: "AIzaSyBiZrtdbABHh089DPuspuVdoYtxaF0t8tk",
        authDomain: "webapp-budget-d6121.firebaseapp.com",
        projectId: "webapp-budget-d6121",
        torageBucket: "webapp-budget-d6121.firebasestorage.app",
        messagingSenderId: "1073551976245",
        appId: "1:1073551976245:web:1588157ebab255b93c0e7c",
        measurementId: "G-X42WWZBWBK"
    };

    // --- Initialize Firebase ---
    let firebaseApp;
    if (!firebase.apps.length) {
        firebaseApp = firebase.initializeApp(firebaseConfig);
    } else {
        firebaseApp = firebase.app();
    }
    const db = firebase.firestore();

    // --- Firestore Collection References ---
    const transactionsCol = db.collection('transactions');
    const projectionsCol = db.collection('projections');
    const settingsDocRef = db.collection('appSettings').doc('global');

    // --- Elementos del DOM ---
    const incomeValueEl = document.getElementById('incomeValue');
    const expenseValueEl = document.getElementById('expenseValue');
    const balanceValueEl = document.getElementById('balanceValue');
    const incomeCard = document.getElementById('incomeCard');
    const expenseCard = document.getElementById('expenseCard');
    const balanceCard = document.getElementById('balanceCard');
    const allRealCards = [incomeCard, expenseCard, balanceCard];
    const projectionRangeEndDateInput = document.getElementById('projectionRangeEndDate');
    const projectedIncomeValueEl = document.getElementById('projectedIncomeValue');
    const projectedExpenseValueEl = document.getElementById('projectedExpenseValue');
    const projectedBalanceValueEl = document.getElementById('projectedBalanceValue');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = navMenu.querySelectorAll('a[data-target]');
    const mainSections = document.querySelectorAll('main.container > div[id$="Section"]');
    const addTransactionBtn = document.getElementById('addTransactionBtn');
    const transactionModal = document.getElementById('transactionModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const transactionForm = document.getElementById('transactionForm');
    const modalTitle = document.getElementById('modalTitle');
    const saveBtn = document.getElementById('saveBtn');
    const transactionIdInput = document.getElementById('transactionId');
    const descriptionInput = document.getElementById('description');
    const amountInput = document.getElementById('amount');
    const amountLabel = document.getElementById('amountLabel');
    const typeSwitchContainer = document.getElementById('typeSwitchContainer');
    const typeValueInput = document.getElementById('typeValue');
    const transactionCategorySelect = document.getElementById('category');
    const transactionSubcategorySelect = document.getElementById('subcategory');
    const dateInput = document.getElementById('date');
    const transactionList = document.getElementById('transactionList');
    const transactionPaginationControls = document.getElementById('transactionPaginationControls'); // Nuevo
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const typeFilter = document.getElementById('typeFilter');
    const startDateFilter = document.getElementById('startDateFilter');
    const endDateFilter = document.getElementById('endDateFilter');
    const addProjectionBtn = document.getElementById('addProjectionBtn');
    const projectionModal = document.getElementById('projectionModal');
    const projectionModalTitle = document.getElementById('projectionModalTitle');
    const closeProjectionModalBtn = document.getElementById('closeProjectionModalBtn');
    const cancelProjectionBtn = document.getElementById('cancelProjectionBtn');
    const projectionForm = document.getElementById('projectionForm');
    const projectionIdInput = document.getElementById('projectionId');
    const projectionDescriptionInput = document.getElementById('projectionDescription');
    const projectionAmountInput = document.getElementById('projectionAmount');
    const projectionAmountLabel = document.getElementById('projectionAmountLabel');
    const projectionTypeSwitchContainer = document.getElementById('projectionTypeSwitchContainer');
    const projectionTypeValueInput = document.getElementById('projectionTypeValue');
    const projectionCategorySelect = document.getElementById('projectionCategory');
    const projectionSubcategorySelect = document.getElementById('projectionSubcategory');
    const nextDueDateInput = document.getElementById('nextDueDate');
    const isRecurringCheckbox = document.getElementById('isRecurring');
    const recurrenceFieldsContainer = document.getElementById('recurrenceFieldsContainer');
    const recurrenceFrequencySelect = document.getElementById('recurrenceFrequency');
    const endDateInput = document.getElementById('endDate');
    const projectionList = document.getElementById('projectionList');
    const projectionPaginationControls = document.getElementById('projectionPaginationControls'); // Nuevo
    const projectionSearchInput = document.getElementById('projectionSearchInput');
    const projectionCategoryFilter = document.getElementById('projectionCategoryFilter');
    const projectionTypeFilter = document.getElementById('projectionTypeFilter');
    const projectionStartDateFilter = document.getElementById('projectionStartDateFilter');
    const projectionEndDateFilter = document.getElementById('projectionEndDateFilter');
    const addCategoryForm = document.getElementById('addCategoryForm');
    const newCategoryInput = document.getElementById('newCategoryInput');
    const categoryList = document.getElementById('categoryList');
    const categoryEditModal = document.getElementById('categoryEditModal');
    const categoryModalTitle = document.getElementById('categoryModalTitle');
    const closeCategoryModalBtn = document.getElementById('closeCategoryModalBtn');
    const categoryEditForm = document.getElementById('categoryEditForm');
    const categoryIdInput = document.getElementById('categoryId');
    const categoryNameInput = document.getElementById('categoryNameInput');
    const cancelCategoryBtn = document.getElementById('cancelCategoryBtn');
    const subcategoryAddModal = document.getElementById('subcategoryAddModal');
    const subcategoryModalTitle = document.getElementById('subcategoryModalTitle');
    const closeSubcategoryModalBtn = document.getElementById('closeSubcategoryModalBtn');
    const subcategoryAddForm = document.getElementById('subcategoryAddForm');
    const parentCategoryNameInput = document.getElementById('parentCategoryName');
    const subcategoryNameInput = document.getElementById('subcategoryNameInput');
    const cancelSubcategoryBtn = document.getElementById('cancelSubcategoryBtn');
    const subcategoryEditModal = document.getElementById('subcategoryEditModal');
    const subcategoryEditModalTitle = document.getElementById('subcategoryEditModalTitle');
    const closeSubcategoryEditModalBtn = document.getElementById('closeSubcategoryEditModalBtn');
    const subcategoryEditForm = document.getElementById('subcategoryEditForm');
    const editParentCategoryNameInput = document.getElementById('editParentCategoryName');
    const oldSubcategoryNameInput = document.getElementById('oldSubcategoryName');
    const editSubcategoryNameInput = document.getElementById('editSubcategoryNameInput');
    const cancelSubcategoryEditBtn = document.getElementById('cancelSubcategoryEditBtn');
    const confirmDeleteModal = document.getElementById('confirmDeleteModal');
    const closeConfirmModalBtn = document.getElementById('closeConfirmModalBtn');
    const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    const confirmDeleteMessage = document.getElementById('confirmDeleteMessage');
    const notification = document.getElementById('notification');
    const currencySelector = document.getElementById('currencySelector');
    const projectedBalanceChartCanvas = document.getElementById('projectedBalanceChartCanvas');

    // --- Estado de la Aplicación ---
    let transactions = [];
    let projections = [];
    let categories = [];
    let subcategoriesData = {};
    let editingTransactionId = null;
    let editingProjectionId = null;
    let activeCardTypeFilter = null;
    let currentRealBalance = 0;
    let selectedCurrency = 'COP';
    const UNCATEGORIZED = "Sin categoría";
    let projectedBalanceChart = null;
    const ITEMS_PER_PAGE = 10; // Nuevo: Límite de elementos por página
    let showAllTransactions = false; // Nuevo: Estado para paginación de transacciones
    let showAllProjections = false; // Nuevo: Estado para paginación de proyecciones

    // --- Iconos SVG ---
    const svgPlus = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" /></svg>';
    const svgEdit = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path></svg>';
    const svgDelete = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>';
    const svgIncome = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M11.47 2.47a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1-1.06 1.06l-2.47-2.47V21a.75.75 0 0 1-1.5 0V4.81L8.78 7.28a.75.75 0 0 1-1.06-1.06l3.75-3.75Z" /></svg>';
    const svgExpense = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v16.19l2.47-2.47a.75.75 0 1 1 1.06 1.06l-3.75 3.75a.75.75 0 0 1-1.06 0l-3.75-3.75a.75.75 0 1 1 1.06-1.06l2.47 2.47V3a.75.75 0 0 1 .75-.75Z" /></svg>';
    const svgConvert = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" /></svg>';
    const svgRecurring = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M15.312 11.424a5.5 5.5 0 01-9.201-2.43l.208-.068a.75.75 0 00-.346-1.456l-.208.068A6.979 6.979 0 003 10a7 7 0 1011.688-4.576l.143-.428a.75.75 0 00-1.4-.468l-.143.428a5.505 5.505 0 01-3.463 4.193 5.5 5.5 0 01-5.265-1.48l-.17.146a.75.75 0 10.98 1.132l.17-.146a5.5 5.5 0 017.906 2.36l-.188.063a.75.75 0 10.376 1.44l.188-.063z" clip-rule="evenodd" /></svg>';
    const svgWarning = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" /></svg>';

    // --- Inicialización ---
    async function initializeApp() {
        showNotification("Cargando datos desde Firebase...", "info", 5000);
        try {
            await loadSettings();
            const [loadedTransactions, loadedProjections] = await Promise.all([
                loadTransactions(),
                loadProjections()
            ]);
            transactions = loadedTransactions;
            projections = loadedProjections;

            currencySelector.value = selectedCurrency;
            updateAmountLabel();
            updateProjectionAmountLabel();
            populateCategoryDropdowns();
            projectionSubcategorySelect.disabled = true;
            projectionSubcategorySelect.innerHTML = '<option value="">-- Opcional --</option>';

            const todayStr = getLocalDateString();
            projectionRangeEndDateInput.min = todayStr;
            setDefaultProjectionRange();

            updateDashboard();
            updateProjectedDashboardCards();
            setupEventListeners();
            navigateToSection('dashboardSection');
            showNotification("Datos cargados correctamente.", "success");

        } catch (error) {
            console.error("Error initializing app:", error);
            showNotification("Error al cargar datos iniciales desde Firebase. Revise la consola.", "error", 10000);
            transactionList.innerHTML = '<p style="text-align:center; padding:1rem; color:var(--danger-color);">Error al cargar transacciones.</p>';
            projectionList.innerHTML = '<p style="text-align:center; padding:1rem; color:var(--danger-color);">Error al cargar proyecciones.</p>';
            categoryList.innerHTML = '<p style="text-align:center; padding:1rem; color:var(--danger-color);">Error al cargar categorías.</p>';
        }
    }

    // --- Event Listeners Setup ---
    function setupEventListeners() {
        mobileMenuBtn.addEventListener('click', () => { const isExpanded = navMenu.classList.toggle('show'); mobileMenuBtn.setAttribute('aria-expanded', String(isExpanded)); });
        navMenu.addEventListener('click', handleNavClick);
        addTransactionBtn.addEventListener('click', () => openModal());
        addProjectionBtn.addEventListener('click', () => openProjectionModal());
        closeModalBtn.addEventListener('click', closeModal);
        cancelBtn.addEventListener('click', closeModal);
        transactionModal.addEventListener('click', (e) => { if (e.target === transactionModal) closeModal(); });
        closeProjectionModalBtn.addEventListener('click', closeProjectionModal);
        cancelProjectionBtn.addEventListener('click', closeProjectionModal);
        projectionModal.addEventListener('click', (e) => { if (e.target === projectionModal) closeProjectionModal(); });
        closeCategoryModalBtn.addEventListener('click', closeCategoryEditModal);
        cancelCategoryBtn.addEventListener('click', closeCategoryEditModal);
        categoryEditModal.addEventListener('click', (e) => { if (e.target === categoryEditModal) closeCategoryEditModal(); });
        closeSubcategoryModalBtn.addEventListener('click', closeSubcategoryAddModal);
        cancelSubcategoryBtn.addEventListener('click', closeSubcategoryAddModal);
        subcategoryAddModal.addEventListener('click', (e) => { if (e.target === subcategoryAddModal) closeSubcategoryAddModal(); });
        closeSubcategoryEditModalBtn.addEventListener('click', closeSubcategoryEditModal);
        cancelSubcategoryEditBtn.addEventListener('click', closeSubcategoryEditModal);
        subcategoryEditModal.addEventListener('click', (e) => { if (e.target === subcategoryEditModal) closeSubcategoryEditModal(); });
        closeConfirmModalBtn.addEventListener('click', closeConfirmDeleteModal);
        cancelDeleteBtn.addEventListener('click', closeConfirmDeleteModal);
        confirmDeleteBtn.addEventListener('click', executeDelete);
        confirmDeleteModal.addEventListener('click', (e) => { if (e.target === confirmDeleteModal) closeConfirmDeleteModal(); });
        transactionForm.addEventListener('submit', handleFormSubmit);
        projectionForm.addEventListener('submit', handleProjectionFormSubmit);
        categoryEditForm.addEventListener('submit', handleCategoryFormSubmit);
        subcategoryAddForm.addEventListener('submit', handleSubcategoryFormSubmit);
        subcategoryEditForm.addEventListener('submit', handleSubcategoryEditFormSubmit);
        addCategoryForm.addEventListener('submit', (e) => { e.preventDefault(); addCategory(); });
        incomeCard.addEventListener('click', () => handleCardFilterClick('income'));
        expenseCard.addEventListener('click', () => handleCardFilterClick('expense'));
        balanceCard.addEventListener('click', () => handleCardFilterClick(null));

        // --- Filtros Dashboard ---
        const dashboardFilterInputs = [searchInput, categoryFilter, startDateFilter, endDateFilter];
        dashboardFilterInputs.forEach(input => input.addEventListener('input', () => {
            showAllTransactions = false; // Reset pagination on filter change
            if (isSectionVisible('dashboardSection')) renderUI();
        }));
        typeFilter.addEventListener('change', () => {
            activeCardTypeFilter = null;
            clearCardFilterVisuals();
            showAllTransactions = false; // Reset pagination on filter change
            if (isSectionVisible('dashboardSection')) renderUI();
        });

        // --- Filtros Proyecciones ---
        const projectionFilterInputs = [projectionSearchInput, projectionCategoryFilter, projectionTypeFilter, projectionStartDateFilter, projectionEndDateFilter];
        projectionFilterInputs.forEach(input => input.addEventListener('input', () => {
             showAllProjections = false; // Reset pagination on filter change
             if (isSectionVisible('projectionsSection')) renderProjectionsPage();
        }));

        // Listener para fecha de proyección (actualiza tarjetas y gráfico)
        projectionRangeEndDateInput.addEventListener('input', () => {
            updateProjectedDashboardCards();
            renderProjectedBalanceChart(); // Llama a la función del gráfico
        });

        isRecurringCheckbox.addEventListener('change', toggleRecurrenceFields);
        transactionCategorySelect.addEventListener('change', handleMainCategoryChange);
        typeSwitchContainer.addEventListener('click', (e) => { const button = e.target.closest('.type-switch-option'); if (button) handleTypeSwitch(button, typeValueInput); });
        amountInput.addEventListener('input', handleAmountInput);
        amountInput.addEventListener('paste', handleAmountPaste);
        amountInput.addEventListener('focus', handleAmountInput);
        projectionCategorySelect.addEventListener('change', handleProjectionMainCategoryChange);
        projectionTypeSwitchContainer.addEventListener('click', (e) => { const button = e.target.closest('.type-switch-option'); if (button) handleTypeSwitch(button, projectionTypeValueInput); });
        projectionAmountInput.addEventListener('input', handleAmountInput);
        projectionAmountInput.addEventListener('paste', handleAmountPaste);
        projectionAmountInput.addEventListener('focus', handleAmountInput);
        transactionList.addEventListener('click', handleListTransactionActions);
        projectionList.addEventListener('click', handleListProjectionActions);
        categoryList.addEventListener('click', handleCategoryListActions);
        currencySelector.addEventListener('change', handleCurrencyChange);

        // --- Listeners para Paginación (usando delegación) ---
        transactionPaginationControls.addEventListener('click', (e) => {
            if (e.target.id === 'toggleTransactionsBtn') {
                showAllTransactions = !showAllTransactions;
                renderUI(); // Re-render transactions section
            }
        });
        projectionPaginationControls.addEventListener('click', (e) => {
            if (e.target.id === 'toggleProjectionsBtn') {
                showAllProjections = !showAllProjections;
                renderProjectionsPage(); // Re-render projections section
            }
        });
    }

    // --- Navegación ---
    function handleNavClick(e) {
        const link = e.target.closest('a[data-target]');
        if (link) {
            e.preventDefault();
            navigateToSection(link.getAttribute('data-target'), link);
            if (navMenu.classList.contains('show')) {
                navMenu.classList.remove('show');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
        }
    }
    function navigateToSection(sectionId, clickedLink = null) {
        mainSections.forEach(section => { if (section) section.style.display = 'none'; });
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.style.display = 'block';
            navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = clickedLink || navMenu.querySelector(`a[data-target="${sectionId}"]`);
            if (activeLink) activeLink.classList.add('active');

            // Reset pagination states when navigating
            showAllTransactions = false;
            showAllProjections = false;

            if (sectionId === 'dashboardSection') {
                renderUI();
            } else if (sectionId === 'categorySection') {
                renderCategoriesPage();
            } else if (sectionId === 'projectionsSection') {
                updateDashboard(); // Asegura que currentRealBalance esté actualizado
                renderProjectionsPage(); // Llama a esta, que renderizará el gráfico
            }
        } else {
            console.warn(`Section with ID "${sectionId}" not found. Defaulting to dashboard.`);
            const dashboardSection = document.getElementById('dashboardSection');
            if (dashboardSection) dashboardSection.style.display = 'block';
            const fallbackLink = navMenu.querySelector('a[data-target="dashboardSection"]');
            if (fallbackLink) fallbackLink.classList.add('active');
            showAllTransactions = false; // Reset pagination state
            renderUI();
        }
    }
    function isSectionVisible(sectionId) {
        const section = document.getElementById(sectionId);
        return section && section.style.display === 'block';
    }

    // --- Carga/Guardado de Datos (Firestore) ---
    async function loadTransactions() {
        try {
            const snapshot = await transactionsCol.orderBy("date", "desc").get();
            return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            console.error("Error loading transactions:", error);
            showNotification("Error al cargar transacciones desde Firebase.", "error");
            return [];
        }
    }

    async function loadProjections() {
        try {
            const snapshot = await projectionsCol.orderBy("nextDueDate", "asc").get();
            return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            console.error("Error loading projections:", error);
            showNotification("Error al cargar proyecciones desde Firebase.", "error");
            return [];
        }
    }

    async function loadSettings() {
        const defaultCategories = [UNCATEGORIZED, "Salario", "Alimentación", "Transporte", "Vivienda", "Ocio", "Salud", "Ropa", "Otros"];
        const defaultSubcategories = { "Vivienda": ["Alquiler"], "Alimentación": ["Supermercado"], "Otros": ["Comunicaciones", "Financiero"], "Salud": ["Gimnasio"], "Ocio": ["Entretenimiento", "Viajes"] };
        const defaultCurrency = 'COP';

        try {
            const docSnap = await settingsDocRef.get();
            if (docSnap.exists) {
                const data = docSnap.data();
                categories = (Array.isArray(data.categories) && data.categories.length > 0) ? data.categories : [...defaultCategories];
                subcategoriesData = (typeof data.subcategories === 'object' && data.subcategories !== null) ? data.subcategories : JSON.parse(JSON.stringify(defaultSubcategories));
                selectedCurrency = (typeof data.selectedCurrency === 'string' && ['COP', 'USD', 'EUR'].includes(data.selectedCurrency)) ? data.selectedCurrency : defaultCurrency;

                if (!categories.includes(UNCATEGORIZED)) categories.unshift(UNCATEGORIZED);
                else if (categories[0] !== UNCATEGORIZED) { categories = categories.filter(c => c !== UNCATEGORIZED); categories.unshift(UNCATEGORIZED); }
                const otherCategories = categories.slice(1).sort((a, b) => a.localeCompare(b, 'es', { sensitivity: 'base' }));
                categories = [UNCATEGORIZED, ...otherCategories];

                const cleanedSubcategories = {};
                categories.forEach(cat => {
                    if(cat !== UNCATEGORIZED) {
                        if (subcategoriesData.hasOwnProperty(cat) && Array.isArray(subcategoriesData[cat])) {
                             cleanedSubcategories[cat] = [...new Set(subcategoriesData[cat].map(s => String(s).trim()).filter(Boolean))].sort((a, b) => a.localeCompare(b, 'es', { sensitivity: 'base' }));
                        } else { cleanedSubcategories[cat] = []; }
                    }
                });
                 subcategoriesData = cleanedSubcategories;

            } else {
                console.log("Settings document not found, creating with defaults.");
                categories = [...defaultCategories];
                subcategoriesData = JSON.parse(JSON.stringify(defaultSubcategories));
                selectedCurrency = defaultCurrency;
                await saveSettings();
            }
        } catch (error) {
            console.error("Error loading settings:", error);
            showNotification("Error al cargar configuración desde Firebase. Usando valores por defecto.", "error");
            categories = [...defaultCategories];
            subcategoriesData = JSON.parse(JSON.stringify(defaultSubcategories));
            selectedCurrency = defaultCurrency;
        }
    }

    async function saveSettings() {
        try {
            const catsToSave = Array.isArray(categories) ? categories : [];
            const subsToSave = (typeof subcategoriesData === 'object' && subcategoriesData !== null) ? subcategoriesData : {};
            const currencyToSave = typeof selectedCurrency === 'string' ? selectedCurrency : 'COP';
            await settingsDocRef.set({ categories: catsToSave, subcategories: subsToSave, selectedCurrency: currencyToSave });
            console.log("Settings saved to Firestore.");
        } catch (error) {
            console.error("Error saving settings:", error);
            showNotification("Error al guardar configuración en Firebase.", "error");
        }
    }

    // --- Transaction Form Funcs ---
    function handleTypeSwitch(buttonElement, valueInputElement) { const container = buttonElement.closest('.type-switch'); if (!container) return; container.querySelectorAll('.type-switch-option').forEach(btn => btn.classList.remove('active')); buttonElement.classList.add('active'); valueInputElement.value = buttonElement.dataset.value; }
    function handleAmountInput(event) { const inputElement = event.target; let rawValue = inputElement.value; let selectionStart = inputElement.selectionStart ?? 0; const isNegative = rawValue.startsWith('-'); if (isNegative) rawValue = rawValue.substring(1); const currencySymbol = getCurrencySymbol(selectedCurrency); const locale = selectedCurrency === 'EUR' ? 'es-ES' : selectedCurrency === 'USD' ? 'en-US' : 'es-CO'; const formatter = new Intl.NumberFormat(locale); const parts = formatter.formatToParts(1000); const thousandsSeparator = parts.find(part => part.type === 'group')?.value || ','; let numericString = rawValue.replace(new RegExp(`\\${currencySymbol}`, 'g'), ''); numericString = numericString.replace(new RegExp(`\\${thousandsSeparator.replace('.', '\\.')}`, 'g'), ''); numericString = numericString.replace(/[^0-9]/g, ''); if (numericString.length > 1 && numericString.startsWith('0')) { numericString = numericString.substring(1); } let formattedValue = ''; if (numericString) { const number = parseInt(numericString, 10); if (!isNaN(number)) { formattedValue = number.toLocaleString(locale, { minimumFractionDigits: 0, maximumFractionDigits: 0 }); } } let finalValue = formattedValue ? `${currencySymbol}${formattedValue}` : ''; if (isNegative && finalValue) { finalValue = `-${finalValue}`; } else if (inputElement.value === '-') { finalValue = '-'; } const originalLength = inputElement.value.length; inputElement.value = finalValue; const newLength = finalValue.length; try { const diff = newLength - originalLength; const charsAddedOrRemovedBeforeCursor = (rawValue.substring(0, selectionStart).match(/[^0-9-]/g) || []).length - (finalValue.substring(0, Math.min(selectionStart + diff, newLength)).match(/[^0-9-]/g) || []).length; let newPosition = selectionStart + diff - charsAddedOrRemovedBeforeCursor; newPosition = Math.max(0, Math.min(newPosition, newLength)); inputElement.setSelectionRange(newPosition, newPosition); } catch (err) { try { inputElement.setSelectionRange(newLength, newLength); } catch (selErr) { /* Ignore */ } } }
    function handleAmountPaste(event) { event.preventDefault(); const pasteText = event.clipboardData?.getData('text') || ''; const inputElement = event.target; const { value, selectionStart, selectionEnd } = inputElement; const newValue = (value.substring(0, selectionStart ?? 0) + pasteText + value.substring(selectionEnd ?? value.length)); inputElement.value = newValue; handleAmountInput({ target: inputElement }); }
    function parseFormattedAmount(formattedValue) { if (!formattedValue || typeof formattedValue !== 'string') return { numberValue: NaN }; let value = formattedValue.trim(); const isNegative = value.startsWith('-'); if (isNegative) value = value.substring(1); const currencySymbol = getCurrencySymbol(selectedCurrency); const locale = selectedCurrency === 'EUR' ? 'es-ES' : selectedCurrency === 'USD' ? 'en-US' : 'es-CO'; const formatter = new Intl.NumberFormat(locale); const parts = formatter.formatToParts(1000); const thousandsSeparator = parts.find(part => part.type === 'group')?.value || ','; let numericString = value.replace(new RegExp(`\\${currencySymbol}`, 'g'), ''); numericString = numericString.replace(new RegExp(`\\${thousandsSeparator.replace('.', '\\.')}`, 'g'), ''); numericString = numericString.replace(/[^0-9]/g, ''); if (numericString === '') return { numberValue: 0 }; let number = parseInt(numericString, 10); if (isNaN(number)) return { numberValue: NaN }; if (isNegative) number = -number; return { numberValue: Math.trunc(number) }; }
    async function handleCurrencyChange(event) {
        selectedCurrency = event.target.value;
        await saveSettings(); // Guardar preferencia
        updateAmountLabel();
        updateProjectionAmountLabel();
        showAllTransactions = false; // Reset pagination
        showAllProjections = false; // Reset pagination

        if (isSectionVisible('dashboardSection')) {
            renderUI();
        }
        if (isSectionVisible('projectionsSection')) {
            updateDashboard();
            renderProjectionsPage();
        } else {
             updateDashboard(); // Still need to update this for projection calculations
             updateProjectedDashboardCards();
             renderProjectedBalanceChart(); // Update chart
        }
     }
    function updateAmountLabel() { amountLabel.textContent = `Importe (${getCurrencySymbol(selectedCurrency)})`; }
    function updateProjectionAmountLabel() { projectionAmountLabel.textContent = `Importe Proyectado (${getCurrencySymbol(selectedCurrency)})`; }
    function getCurrencySymbol(currencyCode) { const symbols = { 'COP': '$', 'USD': '$', 'EUR': '€' }; return symbols[currencyCode] || currencyCode; }

    function openModal(transaction = null) {
        transactionForm.reset();
        updateAmountLabel();
        handleTypeSwitch(typeSwitchContainer.querySelector('.expense'), typeValueInput);
        transactionSubcategorySelect.innerHTML = '<option value="">-- Opcional --</option>';
        transactionSubcategorySelect.disabled = true;

        const todayStr = getLocalDateString();
        dateInput.max = todayStr;

        if (transaction && transaction.id) {
            editingTransactionId = transaction.id;
            modalTitle.textContent = 'Editar Transacción';
            saveBtn.textContent = 'Guardar Cambios';
            transactionIdInput.value = transaction.id;
            descriptionInput.value = transaction.description;
            amountInput.value = formatCurrency(transaction.amount, selectedCurrency);
            const typeButton = typeSwitchContainer.querySelector(`[data-value="${transaction.type}"]`);
            if (typeButton) handleTypeSwitch(typeButton, typeValueInput);
            const mainCategory = categories.includes(transaction.category) ? transaction.category : UNCATEGORIZED;
            transactionCategorySelect.value = mainCategory;
            populateSubcategoryDropdown(mainCategory, transaction.subcategory, transactionSubcategorySelect);
            dateInput.value = transaction.date;
        } else {
            editingTransactionId = null;
            modalTitle.textContent = 'Añadir Transacción';
            saveBtn.textContent = 'Guardar';
            transactionIdInput.value = '';
            descriptionInput.value = '';
            amountInput.value = '';
            transactionCategorySelect.value = UNCATEGORIZED;
            populateSubcategoryDropdown(UNCATEGORIZED, null, transactionSubcategorySelect);
            dateInput.value = todayStr;
        }
        transactionModal.style.display = 'flex';
        descriptionInput.focus();
    }
    function closeModal() { transactionModal.style.display = 'none'; transactionForm.reset(); editingTransactionId = null; dateInput.removeAttribute('max'); }

    async function handleFormSubmit(event) {
         event.preventDefault();
         const { numberValue: amount } = parseFormattedAmount(amountInput.value);
         const description = descriptionInput.value.trim();
         const dateValue = dateInput.value;
         const categoryValue = transactionCategorySelect.value || UNCATEGORIZED;
         const subCategoryValue = transactionSubcategorySelect.disabled ? null : (transactionSubcategorySelect.value || null);
         const typeValue = typeValueInput.value;

         if (!description || isNaN(amount) || !dateValue) { showNotification('Por favor complete los campos requeridos: Descripción, Importe y Fecha.', 'error'); return; }
         const todayStr = getLocalDateString();
         if (dateValue > todayStr) { showNotification('La fecha de la transacción no puede ser futura.', 'error'); dateInput.focus(); return; }

         const transactionData = { description, amount, type: typeValue, category: categoryValue, subcategory: subCategoryValue, date: dateValue };
         saveBtn.disabled = true;
         saveBtn.textContent = editingTransactionId ? 'Guardando...' : 'Añadiendo...';

         try {
             if (editingTransactionId) {
                 await transactionsCol.doc(editingTransactionId).set(transactionData, { merge: true });
                 const index = transactions.findIndex(t => t.id === editingTransactionId);
                 if (index !== -1) transactions[index] = { id: editingTransactionId, ...transactionData };
                 showNotification('Transacción actualizada exitosamente.');
             } else {
                 const docRef = await transactionsCol.add(transactionData);
                 transactions.unshift({ id: docRef.id, ...transactionData });
                 showNotification('Transacción añadida exitosamente.');
             }
             transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
             closeModal();

             showAllTransactions = false; // Reset pagination after add/edit
             // Actualizar UI correspondiente (incluyendo gráfico si es necesario)
             if (isSectionVisible('dashboardSection')) { renderUI(); }
             if (isSectionVisible('projectionsSection')) {
                 updateDashboard();
                 renderProjectionsPage(); // Actualiza lista y gráfico
             } else {
                 updateDashboard();
                 updateProjectedDashboardCards();
                 renderProjectedBalanceChart(); // Actualiza gráfico aunque no esté visible
             }
         } catch (error) {
             console.error("Error saving transaction:", error);
             showNotification("Error al guardar la transacción en Firebase.", "error");
         } finally {
              saveBtn.disabled = false;
              saveBtn.textContent = editingTransactionId ? 'Guardar Cambios' : 'Guardar';
         }
     }
    async function handleListTransactionActions(event) {
        const editButton = event.target.closest('.edit-btn');
        const deleteButton = event.target.closest('.delete-btn');
        const listItem = event.target.closest('.list-item');

        if (!listItem || !listItem.closest('#transactionList')) return;
        const transactionId = listItem.dataset.id;
        if (!transactionId) return;

        if (editButton) {
            const transaction = transactions.find(t => t.id === transactionId);
            if (transaction) openModal(transaction);
            else { console.warn("Transaction not found locally:", transactionId); showNotification("Error: Transacción no encontrada.", "warning"); }
        } else if (deleteButton) {
            openConfirmDeleteModal(transactionId, 'transaction');
        }
     }
    function handleMainCategoryChange(event) { populateSubcategoryDropdown(event.target.value, null, transactionSubcategorySelect); }

    // --- Projection Form Funcs ---
    function toggleRecurrenceFields() { if (isRecurringCheckbox.checked) { recurrenceFieldsContainer.classList.add('visible'); recurrenceFrequencySelect.required = true; } else { recurrenceFieldsContainer.classList.remove('visible'); recurrenceFrequencySelect.required = false; recurrenceFrequencySelect.value = ''; endDateInput.value = ''; } }

    function openProjectionModal(projection = null) {
        projectionForm.reset();
        updateProjectionAmountLabel();
        handleTypeSwitch(projectionTypeSwitchContainer.querySelector('.expense'), projectionTypeValueInput);
        projectionSubcategorySelect.innerHTML = '<option value="">-- Opcional --</option>';
        projectionSubcategorySelect.disabled = true;
        editingProjectionId = null;

        if (projection && projection.id) {
            editingProjectionId = projection.id;
            projectionModalTitle.textContent = 'Editar Proyección';
            document.getElementById('saveProjectionBtn').textContent = 'Guardar Cambios';
            projectionIdInput.value = projection.id;
            projectionDescriptionInput.value = projection.description;
            projectionAmountInput.value = formatCurrency(projection.amount, selectedCurrency);
            const typeButton = projectionTypeSwitchContainer.querySelector(`[data-value="${projection.type}"]`);
            if (typeButton) handleTypeSwitch(typeButton, projectionTypeValueInput);
            const mainCategory = categories.includes(projection.category) ? projection.category : UNCATEGORIZED;
            projectionCategorySelect.value = mainCategory;
            populateSubcategoryDropdown(mainCategory, projection.subcategory, projectionSubcategorySelect);
            nextDueDateInput.value = projection.nextDueDate;
            isRecurringCheckbox.checked = projection.isRecurring || false;
            recurrenceFrequencySelect.value = projection.recurrenceFrequency || '';
            endDateInput.value = projection.endDate || '';
        } else {
            projectionModalTitle.textContent = 'Añadir Proyección';
            document.getElementById('saveProjectionBtn').textContent = 'Guardar';
            projectionIdInput.value = '';
            projectionCategorySelect.value = UNCATEGORIZED;
            populateSubcategoryDropdown(UNCATEGORIZED, null, projectionSubcategorySelect);
            nextDueDateInput.value = getLocalDateString();
            isRecurringCheckbox.checked = false;
            recurrenceFrequencySelect.value = '';
            endDateInput.value = '';
        }
        toggleRecurrenceFields();
        projectionModal.style.display = 'flex';
        projectionDescriptionInput.focus();
    }
    function closeProjectionModal() { projectionModal.style.display = 'none'; projectionForm.reset(); editingProjectionId = null; recurrenceFieldsContainer.classList.remove('visible'); }

    async function handleProjectionFormSubmit(event) {
        event.preventDefault();
        const { numberValue: amount } = parseFormattedAmount(projectionAmountInput.value);
        const description = projectionDescriptionInput.value.trim();
        const nextDueDateValue = nextDueDateInput.value;
        const isRecurring = isRecurringCheckbox.checked;
        const frequency = recurrenceFrequencySelect.value;
        const endDateValue = endDateInput.value || null;
        const typeValue = projectionTypeValueInput.value;
        const categoryValue = projectionCategorySelect.value || UNCATEGORIZED;
        const subCategoryValue = projectionSubcategorySelect.disabled ? null : (projectionSubcategorySelect.value || null);

        if (!description || isNaN(amount) || !nextDueDateValue) { showNotification('Descripción, Importe y Próxima Fecha son requeridos.', 'error'); return; }
        if (isRecurring && !frequency) { showNotification('Debe seleccionar una Frecuencia para proyecciones recurrentes.', 'error'); return; }
        if (isRecurring && endDateValue && nextDueDateValue > endDateValue) { showNotification('La Próxima Fecha no puede ser posterior a la Fecha Fin.', 'error'); return; }

        const projectionData = { description, amount, type: typeValue, category: categoryValue, subcategory: subCategoryValue, nextDueDate: nextDueDateValue, isRecurring, recurrenceFrequency: isRecurring ? frequency : null, endDate: isRecurring ? endDateValue : null };
        const saveProjectionBtn = document.getElementById('saveProjectionBtn');
        saveProjectionBtn.disabled = true;
        saveProjectionBtn.textContent = editingProjectionId ? 'Guardando...' : 'Añadiendo...';

        try {
            if (editingProjectionId) {
                await projectionsCol.doc(editingProjectionId).set(projectionData, { merge: true });
                const index = projections.findIndex(p => p.id === editingProjectionId);
                if (index !== -1) projections[index] = { id: editingProjectionId, ...projectionData };
                showNotification('Proyección actualizada exitosamente.');
            } else {
                const docRef = await projectionsCol.add(projectionData);
                projections.push({ id: docRef.id, ...projectionData });
                showNotification('Proyección añadida exitosamente.');
            }
            projections.sort((a, b) => (a.nextDueDate || '').localeCompare(b.nextDueDate || ''));
            closeProjectionModal();

            showAllProjections = false; // Reset pagination after add/edit
             // Actualizar UI correspondiente (incluyendo gráfico)
             if (isSectionVisible('projectionsSection')) {
                 renderProjectionsPage(); // Actualiza lista y gráfico
             } else {
                 updateProjectedDashboardCards();
                 renderProjectedBalanceChart(); // Actualiza gráfico aunque no esté visible
             }
        } catch (error) {
            console.error("Error saving projection:", error);
            showNotification("Error al guardar la proyección en Firebase.", "error");
        } finally {
             saveProjectionBtn.disabled = false;
             saveProjectionBtn.textContent = editingProjectionId ? 'Guardar Cambios' : 'Guardar';
        }
    }
    function handleProjectionMainCategoryChange(event) { populateSubcategoryDropdown(event.target.value, null, projectionSubcategorySelect); }

    async function handleListProjectionActions(event) {
        const convertButton = event.target.closest('.convert-btn');
        const editButton = event.target.closest('.edit-btn');
        const deleteButton = event.target.closest('.delete-btn');
        const listItem = event.target.closest('.list-item');

        if (!listItem || !listItem.closest('#projectionList')) return;
        const projectionId = listItem.dataset.id;
        if (!projectionId) return;

        if (convertButton) {
            convertButton.disabled = true;
            await convertProjectionToTransaction(projectionId);
        } else if (editButton) {
            const projection = projections.find(p => p.id === projectionId);
            if (projection) openProjectionModal(projection);
            else { console.warn("Projection not found locally:", projectionId); showNotification("Error: Proyección no encontrada.", "warning"); }
        } else if (deleteButton) {
            openConfirmDeleteModal(projectionId, 'projection');
        }
    }
    function calculateNextDueDate(currentDueDateStr, frequency) { if (!currentDueDateStr || !frequency) return null; const currentDate = new Date(currentDueDateStr + 'T00:00:00Z'); if (isNaN(currentDate.getTime())) { console.error("Invalid date provided to calculateNextDueDate:", currentDueDateStr); return null; } switch (frequency) { case 'daily': currentDate.setUTCDate(currentDate.getUTCDate() + 1); break; case 'weekly': currentDate.setUTCDate(currentDate.getUTCDate() + 7); break; case 'bi-weekly': currentDate.setUTCDate(currentDate.getUTCDate() + 14); break; case 'monthly': currentDate.setUTCMonth(currentDate.getUTCMonth() + 1); break; case 'yearly': currentDate.setUTCFullYear(currentDate.getUTCFullYear() + 1); break; default: console.warn("Unknown frequency in calculateNextDueDate:", frequency); return null; } return currentDate.toISOString().split('T')[0]; }

    async function convertProjectionToTransaction(projectionId) {
        const projIndex = projections.findIndex(p => p.id === projectionId);
        if (projIndex === -1) { showNotification('Error: Proyección no encontrada para convertir.', 'error'); return; }
        const projection = projections[projIndex];
        const todayDate = getLocalDateString();

        const newTransactionData = { description: projection.description, amount: projection.amount, type: projection.type, category: projection.category, subcategory: projection.subcategory, date: todayDate };
        const batch = db.batch();

        try {
            const newTransactionRef = transactionsCol.doc();
            batch.set(newTransactionRef, newTransactionData);
            const projectionRef = projectionsCol.doc(projectionId);

            if (projection.isRecurring) {
                const nextPossibleDueDate = calculateNextDueDate(projection.nextDueDate, projection.recurrenceFrequency);
                if (nextPossibleDueDate && (!projection.endDate || nextPossibleDueDate <= projection.endDate)) {
                    batch.update(projectionRef, { nextDueDate: nextPossibleDueDate });
                } else { batch.delete(projectionRef); }
            } else { batch.delete(projectionRef); }

            await batch.commit();

            transactions.unshift({ id: newTransactionRef.id, ...newTransactionData });
            transactions.sort((a, b) => new Date(b.date) - new Date(a.date));

            if (projection.isRecurring) {
                const nextPossibleDueDate = calculateNextDueDate(projection.nextDueDate, projection.recurrenceFrequency);
                 if (nextPossibleDueDate && (!projection.endDate || nextPossibleDueDate <= projection.endDate)) {
                    projections[projIndex].nextDueDate = nextPossibleDueDate;
                    projections.sort((a, b) => (a.nextDueDate || '').localeCompare(b.nextDueDate || ''));
                    showNotification(`Proyección "${projection.description}" convertida (fecha ${formatDate(todayDate)}). Próxima ocurrencia: ${formatDate(nextPossibleDueDate)}.`, 'success', 4000);
                 } else {
                    projections.splice(projIndex, 1);
                    showNotification(`Proyección recurrente "${projection.description}" convertida (fecha ${formatDate(todayDate)}) y finalizada.`, 'success', 4000);
                 }
            } else {
                projections.splice(projIndex, 1);
                showNotification(`Proyección "${projection.description}" convertida a transacción (fecha ${formatDate(todayDate)}).`);
            }

            showAllTransactions = false; // Reset pagination
            showAllProjections = false; // Reset pagination
            // Actualizar UI correspondiente (incluyendo gráfico)
            if (isSectionVisible('dashboardSection')) { renderUI(); }
            if (isSectionVisible('projectionsSection')) {
                updateDashboard();
                renderProjectionsPage(); // Actualiza lista y gráfico
            } else {
                updateDashboard();
                updateProjectedDashboardCards();
                renderProjectedBalanceChart(); // Actualiza gráfico aunque no esté visible
            }
        } catch (error) {
            console.error("Error converting projection to transaction:", error);
            showNotification("Error al convertir proyección a transacción en Firebase.", "error");
        }
    }

    // --- Category/Subcategory Management ---
    function renderCategoriesPage() {
        categoryList.innerHTML = '';
        if (!categories || categories.length === 0) { categoryList.innerHTML = '<p style="text-align:center; padding:1rem; color:var(--text-muted);">No hay categorías definidas.</p>'; return; }
        const fragment = document.createDocumentFragment();
        categories.forEach(categoryName => {
            const item = document.createElement('li'); item.className = 'category-item'; item.dataset.categoryName = categoryName;
            const isUncategorized = categoryName === UNCATEGORIZED; const subList = subcategoriesData[categoryName] || []; const hasSubcategories = subList.length > 0;
            const headerDiv = document.createElement('div'); headerDiv.className = 'category-item-header';
            const mainDiv = document.createElement('div'); mainDiv.className = 'category-item-main';
            const indicatorSpan = document.createElement('span'); indicatorSpan.className = 'category-toggle-indicator'; if (hasSubcategories) item.classList.add('has-subcategories'); mainDiv.appendChild(indicatorSpan);
            const nameSpan = document.createElement('span'); nameSpan.className = 'category-toggle-trigger'; nameSpan.textContent = categoryName; mainDiv.appendChild(nameSpan);
            const addSubBtn = document.createElement('button'); addSubBtn.type = 'button'; addSubBtn.className = 'action-btn add-subcategory-btn'; addSubBtn.title = 'Añadir Subcategoría'; addSubBtn.innerHTML = svgPlus; addSubBtn.disabled = isUncategorized; mainDiv.appendChild(addSubBtn);
            headerDiv.appendChild(mainDiv);
            const actionsDiv = document.createElement('div'); actionsDiv.className = 'transaction-actions';
            const editBtn = document.createElement('button'); editBtn.className = 'action-btn edit-category-btn'; editBtn.title = 'Editar Categoría Principal'; editBtn.innerHTML = svgEdit; editBtn.disabled = isUncategorized; actionsDiv.appendChild(editBtn);
            const delBtn = document.createElement('button'); delBtn.className = 'action-btn delete-category-btn'; delBtn.title = 'Eliminar Categoría Principal'; delBtn.innerHTML = svgDelete; delBtn.disabled = isUncategorized; actionsDiv.appendChild(delBtn);
            headerDiv.appendChild(actionsDiv); item.appendChild(headerDiv);
            if (hasSubcategories) {
                const subUl = document.createElement('ul'); subUl.className = 'subcategory-list collapsed';
                subList.forEach(subName => {
                    const subLi = document.createElement('li'); subLi.className = 'subcategory-item'; subLi.dataset.subcategoryName = subName; subLi.dataset.parentCategory = categoryName;
                    const subSpan = document.createElement('span'); subSpan.textContent = subName; subLi.appendChild(subSpan);
                    const subActionsDiv = document.createElement('div'); subActionsDiv.className = 'transaction-actions';
                    const subEditBtn = document.createElement('button'); subEditBtn.className = 'action-btn edit-subcategory-btn'; subEditBtn.title = 'Editar Subcategoría'; subEditBtn.innerHTML = svgEdit; subActionsDiv.appendChild(subEditBtn);
                    const subDelBtn = document.createElement('button'); subDelBtn.className = 'action-btn delete-subcategory-btn'; subDelBtn.title = 'Eliminar Subcategoría'; subDelBtn.innerHTML = svgDelete; subActionsDiv.appendChild(subDelBtn);
                    subLi.appendChild(subActionsDiv); subUl.appendChild(subLi); }); item.appendChild(subUl); } fragment.appendChild(item); });
        categoryList.appendChild(fragment);
    }
    async function addCategory() {
        const newName = newCategoryInput.value.trim(); if (!newName) { showNotification('El nombre de la categoría no puede estar vacío.', 'error'); return; } if (newName === UNCATEGORIZED) { showNotification(`"${UNCATEGORIZED}" es una categoría reservada.`, 'error'); return; } if (categories.some(c => c.toLowerCase() === newName.toLowerCase())) { showNotification(`La categoría "${newName}" ya existe.`, 'error'); return; }
        categories.push(newName); const otherCategories = categories.filter(c => c !== UNCATEGORIZED).sort((a, b) => a.localeCompare(b, 'es', { sensitivity: 'base' })); categories = [UNCATEGORIZED, ...otherCategories]; if (!subcategoriesData[newName]) subcategoriesData[newName] = [];
        try { await saveSettings(); populateCategoryDropdowns(); renderCategoriesPage(); newCategoryInput.value = ''; showNotification(`Categoría "${newName}" añadida.`); } catch (error) { categories = categories.filter(c => c !== newName); delete subcategoriesData[newName]; showNotification(`Error al guardar la nueva categoría "${newName}".`, 'error'); console.error("Error adding category:", error); } }
    function openCategoryEditModal(oldCategoryName) { if (oldCategoryName === UNCATEGORIZED) { showNotification(`La categoría "${UNCATEGORIZED}" no se puede editar.`, 'warning'); return; } categoryModalTitle.textContent = `Editar Categoría "${oldCategoryName}"`; categoryIdInput.value = oldCategoryName; categoryNameInput.value = oldCategoryName; categoryEditModal.style.display = 'flex'; categoryNameInput.focus(); categoryNameInput.select(); }
    function closeCategoryEditModal() { categoryEditModal.style.display = 'none'; categoryEditForm.reset(); }
    async function handleCategoryFormSubmit(event) {
        event.preventDefault(); const oldName = categoryIdInput.value; const newName = categoryNameInput.value.trim(); if (!newName) { showNotification('El nombre de la categoría no puede estar vacío.', 'error'); return; } if (newName === oldName) { closeCategoryEditModal(); return; } if (newName === UNCATEGORIZED) { showNotification(`No se puede renombrar una categoría a "${UNCATEGORIZED}".`, 'error'); return; } if (categories.some(c => c.toLowerCase() === newName.toLowerCase() && c.toLowerCase() !== oldName.toLowerCase())) { showNotification(`El nombre de categoría "${newName}" ya está en uso.`, 'error'); return; } const index = categories.indexOf(oldName); if (index === -1) { showNotification('Error: Categoría original no encontrada.', 'error'); closeCategoryEditModal(); return; }
        const originalCategories = [...categories]; const originalSubcategoriesData = JSON.parse(JSON.stringify(subcategoriesData)); const batch = db.batch(); const updatedCategories = [...originalCategories]; updatedCategories[index] = newName; const otherUpdatedCategories = updatedCategories.filter(c => c !== UNCATEGORIZED).sort((a, b) => a.localeCompare(b, 'es', { sensitivity: 'base' })); const finalCategories = [UNCATEGORIZED, ...otherUpdatedCategories]; const updatedSubcategoriesData = { ...originalSubcategoriesData }; if (updatedSubcategoriesData.hasOwnProperty(oldName)) { updatedSubcategoriesData[newName] = updatedSubcategoriesData[oldName]; delete updatedSubcategoriesData[oldName]; } else { updatedSubcategoriesData[newName] = []; } batch.set(settingsDocRef, { categories: finalCategories, subcategories: updatedSubcategoriesData }, { merge: true });
        let itemsToUpdateQuery = []; itemsToUpdateQuery.push(transactionsCol.where("category", "==", oldName).get()); itemsToUpdateQuery.push(projectionsCol.where("category", "==", oldName).get());
        try { const [txSnapshot, projSnapshot] = await Promise.all(itemsToUpdateQuery); txSnapshot.forEach(doc => batch.update(transactionsCol.doc(doc.id), { category: newName })); projSnapshot.forEach(doc => batch.update(projectionsCol.doc(doc.id), { category: newName })); await batch.commit(); categories = finalCategories; subcategoriesData = updatedSubcategoriesData; transactions = transactions.map(tx => tx.category === oldName ? { ...tx, category: newName } : tx); projections = projections.map(p => p.category === oldName ? { ...p, category: newName } : p);
            populateCategoryDropdowns(); renderCategoriesPage(); if (isSectionVisible('dashboardSection')) renderUI(); if (isSectionVisible('projectionsSection')) renderProjectionsPage(); closeCategoryEditModal(); showNotification(`Categoría renombrada de "${oldName}" a "${newName}". ${txSnapshot.size + projSnapshot.size} elementos actualizados.`); } catch (error) { console.error("Error renaming category:", error); showNotification("Error al renombrar categoría.", "error"); closeCategoryEditModal(); } }
    function openSubcategoryAddModal(mainCategoryName) { if (mainCategoryName === UNCATEGORIZED) { showNotification(`No se pueden añadir subcategorías a "${UNCATEGORIZED}".`, 'warning'); return; } subcategoryModalTitle.textContent = `Añadir Subcategoría a "${mainCategoryName}"`; parentCategoryNameInput.value = mainCategoryName; subcategoryNameInput.value = ''; subcategoryAddModal.style.display = 'flex'; subcategoryNameInput.focus(); }
    function closeSubcategoryAddModal() { subcategoryAddModal.style.display = 'none'; subcategoryAddForm.reset(); }
    async function handleSubcategoryFormSubmit(event) {
        event.preventDefault(); const mainCategory = parentCategoryNameInput.value; const subName = subcategoryNameInput.value.trim(); if (!subName) { showNotification('El nombre de la subcategoría no puede estar vacío.', 'error'); return; } if (!subcategoriesData[mainCategory]) subcategoriesData[mainCategory] = []; if (subcategoriesData[mainCategory].some(s => s.toLowerCase() === subName.toLowerCase())) { showNotification(`La subcategoría "${subName}" ya existe en "${mainCategory}".`, 'error'); return; }
        const updatedSubcategories = JSON.parse(JSON.stringify(subcategoriesData)); if (!updatedSubcategories[mainCategory]) updatedSubcategories[mainCategory] = []; updatedSubcategories[mainCategory].push(subName); updatedSubcategories[mainCategory].sort((a, b) => a.localeCompare(b, 'es', { sensitivity: 'base' }));
        try { await settingsDocRef.set({ subcategories: updatedSubcategories }, { merge: true }); subcategoriesData = updatedSubcategories; showNotification(`Subcategoría "${subName}" añadida a "${mainCategory}".`); closeSubcategoryAddModal(); const isTxModalOpen = transactionModal.style.display === 'flex'; const isProjModalOpen = projectionModal.style.display === 'flex'; if (isTxModalOpen && transactionCategorySelect.value === mainCategory) populateSubcategoryDropdown(mainCategory, null, transactionSubcategorySelect); if (isProjModalOpen && projectionCategorySelect.value === mainCategory) populateSubcategoryDropdown(mainCategory, null, projectionSubcategorySelect); renderCategoriesPage(); } catch (error) { console.error("Error saving new subcategory:", error); showNotification(`Error al guardar la subcategoría "${subName}".`, 'error'); } }
    function openSubcategoryEditModal(parentCategory, oldSubcategoryName) { subcategoryEditModalTitle.textContent = `Editar Subcategoría "${oldSubcategoryName}" (de ${parentCategory})`; editParentCategoryNameInput.value = parentCategory; oldSubcategoryNameInput.value = oldSubcategoryName; editSubcategoryNameInput.value = oldSubcategoryName; subcategoryEditModal.style.display = 'flex'; editSubcategoryNameInput.focus(); editSubcategoryNameInput.select(); }
    function closeSubcategoryEditModal() { subcategoryEditModal.style.display = 'none'; subcategoryEditForm.reset(); }
    async function handleSubcategoryEditFormSubmit(event) {
        event.preventDefault(); const parentCategory = editParentCategoryNameInput.value; const oldSubName = oldSubcategoryNameInput.value; const newSubName = editSubcategoryNameInput.value.trim(); if (!newSubName) { showNotification('El nombre de la subcategoría no puede estar vacío.', 'error'); return; } if (newSubName === oldSubName) { closeSubcategoryEditModal(); return; } const parentSubcategories = subcategoriesData[parentCategory]; if (!parentSubcategories) { showNotification('Error: Categoría padre no encontrada.', 'error'); closeSubcategoryEditModal(); return; } if (parentSubcategories.some(s => s.toLowerCase() === newSubName.toLowerCase() && s.toLowerCase() !== oldSubName.toLowerCase())) { showNotification(`La subcategoría "${newSubName}" ya existe en "${parentCategory}".`, 'error'); return; } const subIndex = parentSubcategories.indexOf(oldSubName); if (subIndex === -1) { showNotification('Error: Subcategoría original no encontrada.', 'error'); closeSubcategoryEditModal(); return; }
        const originalSubcategoriesData = JSON.parse(JSON.stringify(subcategoriesData)); const batch = db.batch(); const updatedSubcategoriesData = { ...originalSubcategoriesData }; updatedSubcategoriesData[parentCategory][subIndex] = newSubName; updatedSubcategoriesData[parentCategory].sort((a, b) => a.localeCompare(b, 'es', { sensitivity: 'base' })); batch.set(settingsDocRef, { subcategories: updatedSubcategoriesData }, { merge: true });
        let itemsToUpdateQuery = []; itemsToUpdateQuery.push(transactionsCol.where("category", "==", parentCategory).where("subcategory", "==", oldSubName).get()); itemsToUpdateQuery.push(projectionsCol.where("category", "==", parentCategory).where("subcategory", "==", oldSubName).get());
        try { const [txSnapshot, projSnapshot] = await Promise.all(itemsToUpdateQuery); txSnapshot.forEach(doc => batch.update(transactionsCol.doc(doc.id), { subcategory: newSubName })); projSnapshot.forEach(doc => batch.update(projectionsCol.doc(doc.id), { subcategory: newSubName })); await batch.commit(); subcategoriesData = updatedSubcategoriesData; transactions = transactions.map(tx => (tx.category === parentCategory && tx.subcategory === oldSubName) ? { ...tx, subcategory: newSubName } : tx); projections = projections.map(p => (p.category === parentCategory && p.subcategory === oldSubName) ? { ...p, subcategory: newSubName } : p);
            renderCategoriesPage(); const isTxModalOpen = transactionModal.style.display === 'flex'; const isProjModalOpen = projectionModal.style.display === 'flex'; if (isTxModalOpen && transactionCategorySelect.value === parentCategory) populateSubcategoryDropdown(parentCategory, null, transactionSubcategorySelect); if (isProjModalOpen && projectionCategorySelect.value === parentCategory) populateSubcategoryDropdown(parentCategory, null, projectionSubcategorySelect); if (isSectionVisible('dashboardSection')) renderUI(); if (isSectionVisible('projectionsSection')) renderProjectionsPage(); closeSubcategoryEditModal(); showNotification(`Subcategoría renombrada a "${newSubName}". ${txSnapshot.size + projSnapshot.size} elementos actualizados.`); } catch (error) { console.error("Error renaming subcategory:", error); showNotification("Error al renombrar subcategoría.", "error"); closeSubcategoryEditModal(); } }
    async function deleteCategoryAndUpdateItems(categoryName) {
        if (categoryName === UNCATEGORIZED) { showNotification(`La categoría "${UNCATEGORIZED}" no se puede eliminar.`, 'error'); return false; } if (!categories.includes(categoryName)) { showNotification(`La categoría "${categoryName}" no existe.`, 'error'); return false; }
        const originalCategories = [...categories]; const originalSubcategoriesData = JSON.parse(JSON.stringify(subcategoriesData)); const updatedCategories = originalCategories.filter(c => c !== categoryName); const updatedSubcategoriesData = { ...originalSubcategoriesData }; delete updatedSubcategoriesData[categoryName]; const batch = db.batch(); batch.set(settingsDocRef, { categories: updatedCategories, subcategories: updatedSubcategoriesData }, { merge: true });
        let itemsToUpdateQuery = []; itemsToUpdateQuery.push(transactionsCol.where("category", "==", categoryName).get()); itemsToUpdateQuery.push(projectionsCol.where("category", "==", categoryName).get());
        try { const [txSnapshot, projSnapshot] = await Promise.all(itemsToUpdateQuery); txSnapshot.forEach(doc => batch.update(transactionsCol.doc(doc.id), { category: UNCATEGORIZED, subcategory: null })); projSnapshot.forEach(doc => batch.update(projectionsCol.doc(doc.id), { category: UNCATEGORIZED, subcategory: null })); await batch.commit(); categories = updatedCategories; subcategoriesData = updatedSubcategoriesData; transactions = transactions.map(tx => tx.category === categoryName ? { ...tx, category: UNCATEGORIZED, subcategory: null } : tx); projections = projections.map(p => p.category === categoryName ? { ...p, category: UNCATEGORIZED, subcategory: null } : p);
            populateCategoryDropdowns(); renderCategoriesPage(); if (isSectionVisible('dashboardSection')) renderUI(); if (isSectionVisible('projectionsSection')) renderProjectionsPage(); showNotification(`Categoría "${categoryName}" eliminada. ${txSnapshot.size + projSnapshot.size} elementos asociados movidos a "${UNCATEGORIZED}".`); return true; } catch (error) { console.error("Error deleting category:", error); showNotification("Error al eliminar categoría.", "error"); return false; } }
    async function deleteSubcategoryAndUpdateItems(parentCategoryName, subcategoryName) {
        if (!subcategoriesData[parentCategoryName] || !subcategoriesData[parentCategoryName].includes(subcategoryName)) { showNotification(`Error: No se encontró la subcategoría "${subcategoryName}" en "${parentCategoryName}".`, 'error'); return false; }
        const originalSubcategoriesData = JSON.parse(JSON.stringify(subcategoriesData)); const updatedSubcategoriesData = { ...originalSubcategoriesData }; updatedSubcategoriesData[parentCategoryName] = updatedSubcategoriesData[parentCategoryName].filter(s => s !== subcategoryName); const batch = db.batch(); batch.set(settingsDocRef, { subcategories: updatedSubcategoriesData }, { merge: true });
        let itemsToUpdateQuery = []; itemsToUpdateQuery.push(transactionsCol.where("category", "==", parentCategoryName).where("subcategory", "==", subcategoryName).get()); itemsToUpdateQuery.push(projectionsCol.where("category", "==", parentCategoryName).where("subcategory", "==", subcategoryName).get());
        try { const [txSnapshot, projSnapshot] = await Promise.all(itemsToUpdateQuery); txSnapshot.forEach(doc => batch.update(transactionsCol.doc(doc.id), { subcategory: null })); projSnapshot.forEach(doc => batch.update(projectionsCol.doc(doc.id), { subcategory: null })); await batch.commit(); subcategoriesData = updatedSubcategoriesData; transactions = transactions.map(tx => (tx.category === parentCategoryName && tx.subcategory === subcategoryName) ? { ...tx, subcategory: null } : tx); projections = projections.map(p => (p.category === parentCategoryName && p.subcategory === subcategoryName) ? { ...p, subcategory: null } : p);
            renderCategoriesPage(); const isTxModalOpen = transactionModal.style.display === 'flex'; const isProjModalOpen = projectionModal.style.display === 'flex'; if (isTxModalOpen && transactionCategorySelect.value === parentCategoryName) populateSubcategoryDropdown(parentCategoryName, null, transactionSubcategorySelect); if (isProjModalOpen && projectionCategorySelect.value === parentCategoryName) populateSubcategoryDropdown(parentCategoryName, null, projectionSubcategorySelect); if (isSectionVisible('dashboardSection')) renderUI(); if (isSectionVisible('projectionsSection')) renderProjectionsPage(); showNotification(`Subcategoría "${subcategoryName}" eliminada de "${parentCategoryName}". ${txSnapshot.size + projSnapshot.size} elementos actualizados.`); return true; } catch (error) { console.error("Error deleting subcategory:", error); showNotification("Error al eliminar subcategoría.", "error"); return false; } }
    function handleCategoryListActions(event) {
        const target = event.target; const listItem = target.closest('.category-item'); if (!listItem) return; const categoryName = listItem.dataset.categoryName;
        if (target.closest('.category-toggle-trigger') || target.closest('.category-toggle-indicator')) { const subList = listItem.querySelector('.subcategory-list'); if (subList && listItem.classList.contains('has-subcategories')) { const isCollapsed = subList.classList.toggle('collapsed'); subList.classList.toggle('expanded', !isCollapsed); listItem.classList.toggle('expanded', !isCollapsed); } return; }
        if (target.closest('.edit-category-btn')) { if (categoryName) openCategoryEditModal(categoryName); return; } if (target.closest('.delete-category-btn')) { if (categoryName) openConfirmDeleteModal(categoryName, 'category'); return; } if (target.closest('.add-subcategory-btn')) { if (categoryName) openSubcategoryAddModal(categoryName); return; }
        const subcategoryItem = target.closest('.subcategory-item'); if (subcategoryItem) { const subName = subcategoryItem.dataset.subcategoryName; const parentName = subcategoryItem.dataset.parentCategory; if (target.closest('.edit-subcategory-btn')) { if (parentName && subName) openSubcategoryEditModal(parentName, subName); return; } if (target.closest('.delete-subcategory-btn')) { if (parentName && subName) openConfirmDeleteModal({ parent: parentName, sub: subName }, 'subcategory'); return; } } }
    function populateCategoryDropdowns() {
        const selectsToPopulate = [ transactionCategorySelect, categoryFilter, projectionCategorySelect, projectionCategoryFilter ]; selectsToPopulate.forEach(selectElement => { if (!selectElement) return; let currentSelectedValue = selectElement.value; let firstOptionHTML = ''; if (selectElement === categoryFilter || selectElement === projectionCategoryFilter) { firstOptionHTML = '<option value="">Todas</option>'; if (categories.includes(UNCATEGORIZED)) firstOptionHTML += `<option value="${UNCATEGORIZED}">${UNCATEGORIZED}</option>`; } else if (selectElement === transactionCategorySelect || selectElement === projectionCategorySelect) { if (categories.includes(UNCATEGORIZED)) firstOptionHTML = `<option value="${UNCATEGORIZED}">${UNCATEGORIZED}</option>`; else firstOptionHTML = '<option value="">Seleccione...</option>'; } selectElement.innerHTML = firstOptionHTML; categories.forEach(catName => { if (catName !== UNCATEGORIZED) { const option = document.createElement('option'); option.value = catName; option.textContent = catName; selectElement.appendChild(option); } }); if (Array.from(selectElement.options).some(opt => opt.value === currentSelectedValue)) selectElement.value = currentSelectedValue; else if (selectElement === transactionCategorySelect || selectElement === projectionCategorySelect) { if (categories.includes(UNCATEGORIZED)) selectElement.value = UNCATEGORIZED; else selectElement.value = selectElement.options[0] ? selectElement.options[0].value : ""; } else selectElement.value = ""; }); }
    function populateSubcategoryDropdown(mainCategoryName, selectedSubcategory = null, targetSelectElement) {
        if (!targetSelectElement) return; const subcategories = subcategoriesData[mainCategoryName] || []; targetSelectElement.innerHTML = '<option value="">-- Opcional --</option>'; if (subcategories.length > 0 && mainCategoryName !== UNCATEGORIZED) { targetSelectElement.disabled = false; targetSelectElement.style.backgroundColor = ''; subcategories.forEach(subName => { const option = document.createElement('option'); option.value = subName; option.textContent = subName; targetSelectElement.appendChild(option); }); if (selectedSubcategory && subcategories.includes(selectedSubcategory)) targetSelectElement.value = selectedSubcategory; else targetSelectElement.value = ""; } else { targetSelectElement.disabled = true; targetSelectElement.style.backgroundColor = '#f9fafb'; targetSelectElement.value = ""; } }

    // --- Deletion Modal ---
    function openConfirmDeleteModal(identifier, type) {
         let message = '¿Estás seguro de que deseas eliminar este elemento?'; let itemDescription = ''; let deleteId = null; let deleteParent = null; let deleteSub = null; confirmDeleteBtn.dataset.deleteType = type;
         switch (type) { case 'transaction': const tx = transactions.find(t => t.id === identifier); itemDescription = tx ? `la transacción "${tx.description || 'sin descripción'}" (${formatCurrency(tx.amount, selectedCurrency)})` : 'esta transacción'; deleteId = identifier; message = `¿Estás seguro de que deseas eliminar ${itemDescription}? Esta acción no se puede deshacer.`; break; case 'projection': const proj = projections.find(p => p.id === identifier); itemDescription = proj ? `la proyección ${proj.isRecurring ? 'recurrente ' : ''}"${proj.description || 'sin descripción'}" (${formatCurrency(proj.amount, selectedCurrency)})` : 'esta proyección'; deleteId = identifier; message = `¿Estás seguro de que deseas eliminar ${itemDescription}? ${proj?.isRecurring ? 'Esto eliminará todas las ocurrencias futuras.' : 'Esta acción no se puede deshacer.'}`; break; case 'category': if (identifier === UNCATEGORIZED) { showNotification('No se puede eliminar la categoría por defecto.', 'error'); return; } itemDescription = `la categoría "${identifier}"`; deleteId = identifier; message = `¿Estás seguro de que deseas eliminar ${itemDescription} y todas sus subcategorías? Todas las transacciones y proyecciones asociadas se moverán a "${UNCATEGORIZED}". Esta acción no se puede deshacer.`; break; case 'subcategory': if (identifier && typeof identifier === 'object' && identifier.parent && identifier.sub) { itemDescription = `la subcategoría "${identifier.sub}" de "${identifier.parent}"`; deleteParent = identifier.parent; deleteSub = identifier.sub; message = `¿Estás seguro de que deseas eliminar ${itemDescription}? Las transacciones y proyecciones asociadas usarán solo la categoría principal "${identifier.parent}". Esta acción no se puede deshacer.`; } else { console.error("Invalid identifier for subcategory deletion:", identifier); showNotification('Error: Información de subcategoría inválida para eliminación.', 'error'); return; } break; default: showNotification('Error: Tipo de elemento desconocido para eliminar.', 'error'); return; }
         confirmDeleteMessage.textContent = message; if (deleteId !== null) confirmDeleteBtn.dataset.deleteId = String(deleteId); if (deleteParent !== null) confirmDeleteBtn.dataset.deleteParent = deleteParent; if (deleteSub !== null) confirmDeleteBtn.dataset.deleteSub = deleteSub; confirmDeleteModal.style.display = 'flex'; }
    function closeConfirmDeleteModal() { confirmDeleteModal.style.display = 'none'; confirmDeleteBtn.removeAttribute('data-delete-type'); confirmDeleteBtn.removeAttribute('data-delete-id'); confirmDeleteBtn.removeAttribute('data-delete-parent'); confirmDeleteBtn.removeAttribute('data-delete-sub'); }
    async function executeDelete() {
         const type = confirmDeleteBtn.dataset.deleteType; const id = confirmDeleteBtn.dataset.deleteId; const parentCat = confirmDeleteBtn.dataset.deleteParent; const subName = confirmDeleteBtn.dataset.deleteSub; let needsUiUpdate = false; if (!type) { console.error("Deletion type missing."); closeConfirmDeleteModal(); return; } confirmDeleteBtn.disabled = true; confirmDeleteBtn.textContent = 'Eliminando...';
         try { switch (type) { case 'transaction': if (!id) throw new Error("Transaction ID missing"); await transactionsCol.doc(id).delete(); transactions = transactions.filter(tx => tx.id !== id); showNotification('Transacción eliminada.'); needsUiUpdate = true; break; case 'projection': if (!id) throw new Error("Projection ID missing"); await projectionsCol.doc(id).delete(); projections = projections.filter(p => p.id !== id); showNotification('Proyección eliminada.'); needsUiUpdate = true; break; case 'category': if (!id) throw new Error("Category name missing"); needsUiUpdate = await deleteCategoryAndUpdateItems(id); break; case 'subcategory': if (!parentCat || !subName) throw new Error("Subcategory parent or name missing"); needsUiUpdate = await deleteSubcategoryAndUpdateItems(parentCat, subName); break; default: throw new Error(`Unknown deletion type: ${type}`); } } catch (error) { console.error("Error during deletion execution:", error); showNotification(`Error al eliminar: ${error.message}`, "error"); needsUiUpdate = false; } finally { confirmDeleteBtn.disabled = false; confirmDeleteBtn.textContent = 'Sí, Eliminar'; closeConfirmDeleteModal();
            if (needsUiUpdate) {
                showAllTransactions = false; // Reset pagination after delete
                showAllProjections = false; // Reset pagination after delete

                if (isSectionVisible('dashboardSection')) { renderUI(); }
                else if (isSectionVisible('projectionsSection')) { updateDashboard(); renderProjectionsPage(); } // Actualiza gráfico
                else if (isSectionVisible('categorySection')) { renderCategoriesPage(); }

                if (type === 'category' || type === 'subcategory') { populateCategoryDropdowns(); }

                // Update projected dashboard/chart if a transaction or projection was deleted and we are not in projection section
                if ((type === 'transaction' || type === 'projection') && !isSectionVisible('projectionsSection')) {
                    updateDashboard(); // Necessary for currentRealBalance
                    updateProjectedDashboardCards();
                    renderProjectedBalanceChart();
                 }
            }
         }
     }

    // --- UI Rendering & Filtering ---
    function handleCardFilterClick(type) { activeCardTypeFilter = (activeCardTypeFilter === type && type !== null) ? null : type; typeFilter.value = activeCardTypeFilter || ''; updateCardFilterVisuals(); showAllTransactions = false; if (isSectionVisible('dashboardSection')) { renderUI(); } }
    function updateCardFilterVisuals() { allRealCards.forEach(card => card.classList.remove('filtered')); if (activeCardTypeFilter === 'income') incomeCard.classList.add('filtered'); else if (activeCardTypeFilter === 'expense') expenseCard.classList.add('filtered'); }
    function clearCardFilterVisuals() { allRealCards.forEach(card => card.classList.remove('filtered')); activeCardTypeFilter = null; }
    function formatCurrency(amount, currencyCode) { const number = Number(amount); if (isNaN(number)) amount = 0; try { const locale = currencyCode === 'EUR' ? 'es-ES' : currencyCode === 'USD' ? 'en-US' : 'es-CO'; return new Intl.NumberFormat(locale, { style: 'currency', currency: currencyCode, minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(number); } catch (error) { console.error("Currency formatting error:", error); return `${getCurrencySymbol(currencyCode)}${Math.trunc(number)}`; } }
    function formatDate(dateString) { if (!dateString) return 'Fecha inválida'; try { const date = new Date(dateString + 'T00:00:00Z'); if (isNaN(date.getTime())) throw new Error("Invalid date value"); return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }); } catch (error) { console.error("Date formatting error:", error, "Input:", dateString); return 'Fecha inválida'; } }

    // --- Render Functions (con Paginación) ---
    function renderTransactions(allFilteredTransactions) {
        transactionList.innerHTML = '';
        transactionPaginationControls.innerHTML = ''; // Limpiar controles previos

        if (allFilteredTransactions.length === 0) {
            transactionList.innerHTML = '<p style="text-align:center; padding:1rem; color:var(--text-muted);">No hay transacciones que mostrar con los filtros actuales.</p>';
            return;
        }

        const itemsToShow = showAllTransactions ? allFilteredTransactions : allFilteredTransactions.slice(0, ITEMS_PER_PAGE);
        const fragment = document.createDocumentFragment();

        itemsToShow.forEach(tx => {
            if (!tx || !tx.id) { console.warn("Skipping invalid transaction:", tx); return; }
            const item = document.createElement('div'); item.className = 'list-item'; item.dataset.id = tx.id;
            const isIncome = tx.type === 'income'; const amountSign = isIncome ? '+' : '-';
            const itemClass = isIncome ? 'income' : 'expense'; const iconSVG = isIncome ? svgIncome : svgExpense;
            const categoryDisplay = tx.subcategory ? `${tx.category || UNCATEGORIZED} / ${tx.subcategory}` : tx.category || UNCATEGORIZED;
            const infoDiv = document.createElement('div'); infoDiv.className = 'item-info';
            infoDiv.innerHTML = `<div class="item-icon ${itemClass}">${iconSVG}</div><div class="item-details"><h3>${tx.description || 'N/A'}</h3><p>${formatDate(tx.date)} &bull; ${categoryDisplay}</p></div>`;
            const amountDiv = document.createElement('div'); amountDiv.className = `item-amount ${itemClass}`;
            const amountValue = Number(tx.amount) || 0; amountDiv.textContent = `${amountSign}${formatCurrency(Math.abs(amountValue), selectedCurrency)}`;
            const actionsDiv = document.createElement('div'); actionsDiv.className = 'item-actions';
            actionsDiv.innerHTML = `<button class="action-btn edit-btn" title="Editar">${svgEdit}</button><button class="action-btn delete-btn" title="Eliminar">${svgDelete}</button>`;
            item.appendChild(infoDiv); item.appendChild(amountDiv); item.appendChild(actionsDiv);
            fragment.appendChild(item);
        });
        transactionList.appendChild(fragment);

        // Añadir botón de paginación si hay más elementos que los mostrados
        if (allFilteredTransactions.length > ITEMS_PER_PAGE) {
            const buttonText = showAllTransactions ? 'Mostrar Menos' : `Mostrar Todos (${allFilteredTransactions.length})`;
            const paginationButton = document.createElement('button');
            paginationButton.id = 'toggleTransactionsBtn';
            paginationButton.className = 'btn btn-secondary btn-pagination';
            paginationButton.textContent = buttonText;
            transactionPaginationControls.appendChild(paginationButton);
        }
    }

    function renderProjectionsList(allFilteredProjections) {
        projectionList.innerHTML = '';
        projectionPaginationControls.innerHTML = ''; // Limpiar controles previos

        const today = new Date();
        today.setUTCHours(0, 0, 0, 0);

        if (allFilteredProjections.length === 0) {
            projectionList.innerHTML = '<p style="text-align:center; padding:1rem; color:var(--text-muted);">No hay proyecciones que mostrar con los filtros actuales.</p>';
            return;
        }

        const itemsToShow = showAllProjections ? allFilteredProjections : allFilteredProjections.slice(0, ITEMS_PER_PAGE);
        const fragment = document.createDocumentFragment();

        itemsToShow.forEach(proj => {
             if (!proj || !proj.id) { console.warn("Skipping invalid projection:", proj); return; }
             const item = document.createElement('div'); item.className = 'list-item'; item.dataset.id = proj.id;
             const isIncome = proj.type === 'income'; const amountSign = isIncome ? '+' : '-';
             const itemClass = isIncome ? 'income' : 'expense'; const iconSVG = isIncome ? svgIncome : svgExpense;
             const categoryDisplay = proj.subcategory ? `${proj.category || UNCATEGORIZED} / ${proj.subcategory}` : proj.category || UNCATEGORIZED;
             let isOverdue = false; let overdueIndicatorHTML = '';
             if (proj.nextDueDate) {
                 try {
                     const dueDateStr = proj.nextDueDate; const todayStr = getLocalDateString(today);
                     if (dueDateStr < todayStr) { isOverdue = true; overdueIndicatorHTML = `<span class="overdue-indicator" title="Proyección Vencida">${svgWarning}</span>`; item.classList.add('overdue-item'); }
                 } catch (e) { console.warn("Error parsing proj due date:", proj.nextDueDate, e); }
             }
             const recurringIndicator = proj.isRecurring ? `<span class="recurring-indicator" title="Recurrente (${getFrequencyText(proj.recurrenceFrequency)})">${svgRecurring}</span>` : '';
             const endDateText = proj.isRecurring && proj.endDate ? ` (Hasta: ${formatDate(proj.endDate)})` : '';
             const infoDiv = document.createElement('div'); infoDiv.className = 'item-info';
             infoDiv.innerHTML = `<div class="item-icon ${itemClass}">${iconSVG}</div><div class="item-details"><h3>${proj.description || 'N/A'} ${recurringIndicator}</h3><p>${overdueIndicatorHTML}Próximo: ${formatDate(proj.nextDueDate)} &bull; ${categoryDisplay}${endDateText}</p></div>`;
             const amountDiv = document.createElement('div'); amountDiv.className = `item-amount ${itemClass}`;
             const amountValue = Number(proj.amount) || 0; amountDiv.textContent = `${amountSign}${formatCurrency(Math.abs(amountValue), selectedCurrency)}`;
             const actionsDiv = document.createElement('div'); actionsDiv.className = 'item-actions';
             actionsDiv.innerHTML = `<button class="action-btn convert-btn" title="Convertir a Transacción Real">${svgConvert}</button><button class="action-btn edit-btn" title="Editar Proyección">${svgEdit}</button><button class="action-btn delete-btn" title="Eliminar Proyección">${svgDelete}</button>`;
             item.appendChild(infoDiv); item.appendChild(amountDiv); item.appendChild(actionsDiv);
             fragment.appendChild(item);
        });
        projectionList.appendChild(fragment);

        // Añadir botón de paginación si hay más elementos que los mostrados
        if (allFilteredProjections.length > ITEMS_PER_PAGE) {
            const buttonText = showAllProjections ? 'Mostrar Menos' : `Mostrar Todas (${allFilteredProjections.length})`;
            const paginationButton = document.createElement('button');
            paginationButton.id = 'toggleProjectionsBtn';
            paginationButton.className = 'btn btn-secondary btn-pagination';
            paginationButton.textContent = buttonText;
            projectionPaginationControls.appendChild(paginationButton);
        }
    }

    function getFrequencyText(frequencyValue) { const map = { 'daily': 'Diario', 'weekly': 'Semanal', 'bi-weekly': 'Quincenal', 'monthly': 'Mensual', 'yearly': 'Anual' }; return map[frequencyValue] || frequencyValue || 'Desconocida'; }

    // --- Dashboard Update Functions ---
    function updateDashboard() { const filteredTx = getFilteredTransactions(true); // Get all filtered for calculation
        const filteredIncome = filteredTx.filter(t => t.type === 'income').reduce((sum, t) => sum + (Number(t.amount) || 0), 0);
        const filteredExpense = filteredTx.filter(t => t.type === 'expense').reduce((sum, t) => sum + (Number(t.amount) || 0), 0);
        const totalIncomeGlobal = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + (Number(t.amount) || 0), 0);
        const totalExpenseGlobal = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + (Number(t.amount) || 0), 0);
        const balanceGlobal = totalIncomeGlobal - totalExpenseGlobal; currentRealBalance = balanceGlobal;
        incomeValueEl.textContent = formatCurrency(filteredIncome, selectedCurrency); expenseValueEl.textContent = formatCurrency(filteredExpense, selectedCurrency);
        balanceValueEl.textContent = formatCurrency(balanceGlobal, selectedCurrency);
        const isFiltered = activeCardTypeFilter || searchInput.value || categoryFilter.value || typeFilter.value || startDateFilter.value || endDateFilter.value;
        incomeCard.querySelector('.card-subtitle').textContent = isFiltered ? 'Total Real (Filtrado)' : 'Total Real (Global)'; expenseCard.querySelector('.card-subtitle').textContent = isFiltered ? 'Total Real (Filtrado)' : 'Total Real (Global)'; balanceCard.querySelector('.card-subtitle').textContent = 'Actual Real (Global)'; balanceValueEl.style.color = balanceGlobal < 0 ? 'var(--danger-color)' : 'var(--primary-color)'; return balanceGlobal;
    }
    function calculateProjectedTotals(endDateStr) { let totalIncomeUpToEndDate = 0; let totalExpenseUpToEndDate = 0; let endRangeDateStr = null; if (endDateStr) { try { if (!/^\d{4}-\d{2}-\d{2}$/.test(endDateStr)) throw new Error("Invalid date format"); const tempDate = new Date(endDateStr + 'T00:00:00Z'); if (isNaN(tempDate.getTime())) throw new Error("Invalid date value"); endRangeDateStr = endDateStr; } catch(e) { console.error("Error parsing projection end date:", e); showNotification("Fecha de proyección inválida.", "warning"); return { projectedIncomeSum: NaN, projectedExpenseSum: NaN, projectedBalance: NaN }; } } else { console.warn("No end date provided for projection calculation. Returning real totals."); const realIncome = transactions.filter(t => t.type === 'income').reduce((s, t) => s + (Number(t.amount) || 0), 0); const realExpense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + (Number(t.amount) || 0), 0); return { projectedIncomeSum: realIncome, projectedExpenseSum: realExpense, projectedBalance: currentRealBalance }; }
        transactions.forEach(tx => { if (tx.date && tx.date <= endRangeDateStr) { if (tx.type === 'income') totalIncomeUpToEndDate += (Number(tx.amount) || 0); else if (tx.type === 'expense') totalExpenseUpToEndDate += (Number(tx.amount) || 0); } });
        projections.forEach(p => { if (!p.isRecurring) { if (p.nextDueDate && p.nextDueDate <= endRangeDateStr) { if (p.type === 'income') totalIncomeUpToEndDate += (Number(p.amount) || 0); else if (p.type === 'expense') totalExpenseUpToEndDate += (Number(p.amount) || 0); } } else { let currentDueDate = p.nextDueDate; while (currentDueDate && currentDueDate <= endRangeDateStr) { if (p.type === 'income') totalIncomeUpToEndDate += (Number(p.amount) || 0); else if (p.type === 'expense') totalExpenseUpToEndDate += (Number(p.amount) || 0); const next = calculateNextDueDate(currentDueDate, p.recurrenceFrequency); if (!next || (p.endDate && next > p.endDate)) break; currentDueDate = next; } } });
        const finalProjectedBalance = totalIncomeUpToEndDate - totalExpenseUpToEndDate; return { projectedIncomeSum: totalIncomeUpToEndDate, projectedExpenseSum: totalExpenseUpToEndDate, projectedBalance: finalProjectedBalance }; }
    function updateProjectedDashboardCards() { let endDate = projectionRangeEndDateInput.value; const { projectedIncomeSum, projectedExpenseSum, projectedBalance } = calculateProjectedTotals(endDate); if (isNaN(projectedIncomeSum) || isNaN(projectedExpenseSum) || isNaN(projectedBalance)) { projectedIncomeValueEl.textContent = '--'; projectedExpenseValueEl.textContent = '--'; projectedBalanceValueEl.textContent = '--'; projectedBalanceValueEl.style.color = 'var(--text-muted)'; return; } projectedIncomeValueEl.textContent = formatCurrency(projectedIncomeSum, selectedCurrency); projectedExpenseValueEl.textContent = formatCurrency(projectedExpenseSum, selectedCurrency); projectedBalanceValueEl.textContent = formatCurrency(projectedBalance, selectedCurrency); projectedBalanceValueEl.style.color = projectedBalance < 0 ? 'var(--danger-color)' : 'var(--primary-color)'; }
    function setDefaultProjectionRange() { const futureDate = new Date(); futureDate.setDate(futureDate.getDate() + 30); const defaultEndDate = getLocalDateString(futureDate); const todayStr = getLocalDateString(); projectionRangeEndDateInput.value = defaultEndDate; projectionRangeEndDateInput.min = todayStr; }

    // --- Funciones del Gráfico ---
    function calculateChartData(endDateStr) { if (!endDateStr) return null; const todayStr = getLocalDateString(); const startDateStr = todayStr; let endRangeDate; try { endRangeDate = new Date(endDateStr + 'T00:00:00Z'); if (isNaN(endRangeDate.getTime())) throw new Error("Invalid date value"); } catch(e) { console.error("Invalid end date for chart:", endDateStr); return null; } const endRangeDateStr = endDateStr; const labels = []; const data = [];
        let currentBalance = 0; transactions.forEach(tx => { if (tx.date < startDateStr) { if (tx.type === 'income') currentBalance += (Number(tx.amount) || 0); else if (tx.type === 'expense') currentBalance -= (Number(tx.amount) || 0); } });
        let currentDate = new Date(startDateStr + 'T00:00:00Z'); const projectionOccurrences = {};
        projections.forEach(p => { if (!p.isRecurring) { if (p.nextDueDate >= startDateStr && p.nextDueDate <= endRangeDateStr) { if (!projectionOccurrences[p.nextDueDate]) projectionOccurrences[p.nextDueDate] = []; projectionOccurrences[p.nextDueDate].push({ type: p.type, amount: (Number(p.amount) || 0) }); } } else { let occurrenceDate = p.nextDueDate; while (occurrenceDate && occurrenceDate <= endRangeDateStr) { if (occurrenceDate >= startDateStr) { if (!projectionOccurrences[occurrenceDate]) projectionOccurrences[occurrenceDate] = []; projectionOccurrences[occurrenceDate].push({ type: p.type, amount: (Number(p.amount) || 0) }); } const next = calculateNextDueDate(occurrenceDate, p.recurrenceFrequency); if (!next || (p.endDate && next > p.endDate)) break; occurrenceDate = next; } } });
        while (currentDate <= endRangeDate) { const loopDateStr = currentDate.toISOString().split('T')[0];
            transactions.forEach(tx => { if (tx.date === loopDateStr) { if (tx.type === 'income') currentBalance += (Number(tx.amount) || 0); else if (tx.type === 'expense') currentBalance -= (Number(tx.amount) || 0); } });
            if (projectionOccurrences[loopDateStr]) { projectionOccurrences[loopDateStr].forEach(occ => { if (occ.type === 'income') currentBalance += occ.amount; else if (occ.type === 'expense') currentBalance -= occ.amount; }); }
            labels.push(loopDateStr); data.push(currentBalance); currentDate.setUTCDate(currentDate.getUTCDate() + 1); }
        return { labels, data }; }
    function renderProjectedBalanceChart() {
        if (!projectedBalanceChartCanvas) return; const endDate = projectionRangeEndDateInput.value; const chartDataResult = calculateChartData(endDate);
        if (!chartDataResult) { if (projectedBalanceChart) { projectedBalanceChart.destroy(); projectedBalanceChart = null; } return; } const { labels, data } = chartDataResult;
        const chartConfig = { type: 'line', data: { labels: labels, datasets: [{ label: 'Saldo Proyectado', data: data, borderColor: 'rgba(99, 102, 241, 1)', backgroundColor: 'rgba(99, 102, 241, 0.1)', fill: true, tension: 0.1, pointRadius: 2, pointHoverRadius: 5 }] }, options: { responsive: true, maintainAspectRatio: false, scales: { x: { type: 'time', time: { unit: 'day', tooltipFormat: 'dd MMM yyyy', displayFormats: { day: 'dd MMM' } }, title: { display: true, text: 'Fecha' } }, y: { beginAtZero: false, title: { display: true, text: `Saldo (${selectedCurrency})` }, ticks: { callback: function(value) { try { const locale = selectedCurrency === 'EUR' ? 'es-ES' : selectedCurrency === 'USD' ? 'en-US' : 'es-CO'; return value.toLocaleString(locale); } catch (e) { return value; } } } } }, plugins: { tooltip: { callbacks: { label: function(context) { let label = context.dataset.label || ''; if (label) label += ': '; if (context.parsed.y !== null) label += formatCurrency(context.parsed.y, selectedCurrency); return label; } } }, legend: { display: false } } } };
        if (projectedBalanceChart) { projectedBalanceChart.data.labels = labels; projectedBalanceChart.data.datasets[0].data = data; projectedBalanceChart.options.scales.y.title.text = `Saldo (${selectedCurrency})`; projectedBalanceChart.update(); } else { projectedBalanceChart = new Chart(projectedBalanceChartCanvas, chartConfig); } }

    // --- General Helper Functions ---
    function getLocalDateString(date = new Date()) { const year = date.getFullYear(); const month = String(date.getMonth() + 1).padStart(2, '0'); const day = String(date.getDate()).padStart(2, '0'); return `${year}-${month}-${day}`; }
    function showNotification(message, type = 'success', duration = 3000) { notification.textContent = message; notification.className = 'notification'; notification.classList.add(type, 'show'); setTimeout(() => { notification.classList.remove('show'); }, duration); }

    // --- Get Filtered Data Functions ---
    // Added ignoreDateFilter param to allow getting all filtered items for balance calc
    function getFilteredTransactions(ignoreDateFilter = false) {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const selectedCategory = categoryFilter.value;
        const selectedType = typeFilter.value || activeCardTypeFilter;
        const startDate = startDateFilter.value;
        const endDate = endDateFilter.value;

        return transactions.filter(tx => {
            const descriptionMatch = !searchTerm || (tx.description && tx.description.toLowerCase().includes(searchTerm));
            const categoryMatch = !selectedCategory || tx.category === selectedCategory;
            const typeMatch = !selectedType || tx.type === selectedType;
            const txDate = tx.date;

            let dateMatch = true;
            if (!ignoreDateFilter) { // Only apply date filter if not ignored
                if (startDate && (!txDate || txDate < startDate)) dateMatch = false;
                if (endDate && (!txDate || txDate > endDate)) dateMatch = false;
            }

            return descriptionMatch && categoryMatch && typeMatch && dateMatch;
        });
    }

    function getFilteredProjections() {
        const searchTerm = projectionSearchInput.value.toLowerCase().trim();
        const selectedCategory = projectionCategoryFilter.value;
        const selectedType = projectionTypeFilter.value;
        const startDate = projectionStartDateFilter.value;
        const endDate = projectionEndDateFilter.value;

        return projections.filter(p => {
            const descriptionMatch = !searchTerm || (p.description && p.description.toLowerCase().includes(searchTerm));
            const categoryMatch = !selectedCategory || p.category === selectedCategory;
            const typeMatch = !selectedType || p.type === selectedType;
            const projDueDate = p.nextDueDate;

            let dateMatch = true;
            if (startDate && (!projDueDate || projDueDate < startDate)) dateMatch = false;
            if (endDate && (!projDueDate || projDueDate > endDate)) dateMatch = false;

            return descriptionMatch && categoryMatch && typeMatch && dateMatch;
        });
    }


    // --- Main Render Functions ---
    function renderUI() {
        const filteredTx = getFilteredTransactions(); // Get filtered transactions respecting dates for list display
        renderTransactions(filteredTx);
        updateDashboard(); // Recalculates balance based on filters (uses getFilteredTransactions internally)
        updateCardFilterVisuals();
        updateProjectedDashboardCards();
        // El gráfico se actualiza al renderizar la sección de proyecciones o cambiar moneda/fecha de proyección
    }
    function renderProjectionsPage() {
        updateProjectedDashboardCards(); // Needs to be called before getting filtered projections if filter depends on it? No.
        const filteredProjections = getFilteredProjections();
        renderProjectionsList(filteredProjections);
        renderProjectedBalanceChart(); // Llama a render gráfico
    }

    // --- Start App ---
    initializeApp();

}); // End of DOMContentLoaded