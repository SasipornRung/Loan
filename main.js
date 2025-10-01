// Main JavaScript file for the Financial Planning Platform

// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Modal functionality
    const loginBtn = document.querySelector('.login-btn');
    const registerBtn = document.querySelector('.register-btn');
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    const modals = document.querySelectorAll('.modal');

    // Open modals
    loginBtn.addEventListener('click', () => {
        loginModal.style.display = 'block';
    });

    registerBtn.addEventListener('click', () => {
        registerModal.style.display = 'block';
    });

    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        modals.forEach(modal => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    });

    // Form submissions
    const loginForm = document.querySelector('.login-form');
    const registerForm = document.querySelector('.register-form');
    const loanForm = document.querySelector('.loan-form');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Add login logic here
            console.log('Login attempted');
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Add registration logic here
            console.log('Registration attempted');
        });
    }

    if (loanForm) {
        loanForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Add loan application logic here
            console.log('Loan application submitted');
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Example function for loan calculator
    function calculateLoan(amount, rate, term) {
        const interest = (amount * rate * term) / 100;
        const totalAmount = amount + interest;
        const monthlyPayment = totalAmount / (term * 12);
        return {
            totalAmount,
            monthlyPayment,
            interest
        };
    }

    // Example function for updating dashboard
    function updateDashboard(userData) {
        // Update financial summary
        const totalDebt = document.querySelector('.total-debt .amount');
        const monthlyPayment = document.querySelector('.monthly-payment .amount');
        const creditScore = document.querySelector('.credit-score .score');

        if (totalDebt && monthlyPayment && creditScore) {
            totalDebt.textContent = `฿${userData.totalDebt.toLocaleString()}`;
            monthlyPayment.textContent = `฿${userData.monthlyPayment.toLocaleString()}`;
            creditScore.textContent = userData.creditScore;
        }
    }

    // Example usage of dashboard update
    const mockUserData = {
        totalDebt: 500000,
        monthlyPayment: 15000,
        creditScore: 650
    };

    updateDashboard(mockUserData);
});

// Consultation booking system
class ConsultationBooking {
    constructor() {
        this.availableSlots = [];
        this.bookedSlots = [];
    }

    addAvailableSlot(date, time, consultant) {
        this.availableSlots.push({ date, time, consultant });
    }

    bookConsultation(slot, user) {
        const slotIndex = this.availableSlots.findIndex(s => 
            s.date === slot.date && s.time === slot.time
        );

        if (slotIndex !== -1) {
            const bookedSlot = this.availableSlots.splice(slotIndex, 1)[0];
            this.bookedSlots.push({
                ...bookedSlot,
                user: user
            });
            return true;
        }
        return false;
    }
}

// Financial planning calculator
class FinancialCalculator {
    calculateDebtPayoff(debt, interestRate, monthlyPayment) {
        const monthlyRate = interestRate / 12 / 100;
        let balance = debt;
        let months = 0;
        
        while (balance > 0 && months < 360) { // 30 years max
            balance = balance * (1 + monthlyRate) - monthlyPayment;
            months++;
        }
        
        return {
            months: months,
            totalPaid: monthlyPayment * months,
            totalInterest: (monthlyPayment * months) - debt
        };
    }

    calculateBudget(income, expenses) {
        const necessities = expenses.reduce((sum, exp) => 
            exp.type === 'necessary' ? sum + exp.amount : sum, 0);
        
        const discretionary = expenses.reduce((sum, exp) => 
            exp.type === 'discretionary' ? sum + exp.amount : sum, 0);
        
        return {
            totalExpenses: necessities + discretionary,
            savingsRate: (income - (necessities + discretionary)) / income,
            debtPaymentCapacity: income * 0.36 - necessities // 36% rule
        };
    }
}

// Initialize calculators
const calculator = new FinancialCalculator();
const bookingSystem = new ConsultationBooking();
