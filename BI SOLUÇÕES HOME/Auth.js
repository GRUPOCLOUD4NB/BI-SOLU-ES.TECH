import { 
    initializeApp 
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";

import { 
    getAuth, 
    signInWithEmailAndPassword, 
    setPersistence, 
    browserSessionPersistence, 
    signOut, 
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

// Configurações do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBTaKdJDxa_z8i0isR0Eijp0PSRRfG6CAU",
    authDomain: "bi-solucoes.firebaseapp.com",
    projectId: "bi-solucoes",
    storageBucket: "bi-solucoes.firebasestorage.app",
    messagingSenderId: "761304787557",
    appId: "1:761304787557:web:f4ff7f285ffb5792bab48c",
    measurementId: "G-6DNLBKCWXB"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Configura a persistência para sessão (expira ao fechar o navegador)
setPersistence(auth, browserSessionPersistence)
    .then(() => {
        console.log("Persistência de sessão configurada com sucesso.");
    })
    .catch((error) => {
        console.error("Erro ao definir persistência:", error);
    });

// Função para exibir mensagens ao usuário
function showMessage(message, divId) {
    const messageDiv = document.getElementById(divId);
    if (!messageDiv) {
        console.error(`Elemento com ID '${divId}' não encontrado no DOM.`);
        return;
    }
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;

    // Limpa mensagens antigas e define um tempo para ocultar
    if (messageDiv.timeoutId) {
        clearTimeout(messageDiv.timeoutId);
    }
    messageDiv.timeoutId = setTimeout(() => {
        messageDiv.style.opacity = 0;
        messageDiv.style.display = "none";
    }, 7000); // Exibe a mensagem por 7 segundos
}

// Função de login
function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!email || !password) {
        showMessage('Por favor, preencha todos os campos.', 'signInMessage');
        return;
    }

    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            // Exibe mensagem de sucesso e redireciona
            showMessage('Login realizado com sucesso!', 'signInMessage');
            window.location.href = 'single.html';
        })
        .catch((error) => {
            const errorMessages = {
                'auth/wrong-password': 'Senha incorreta. Por favor, tente novamente.',
                'auth/user-not-found': 'Usuário não encontrado. Verifique o email informado.',
                'auth/invalid-email': 'Email inválido. Por favor, corrija e tente novamente.',
                'auth/too-many-requests': 'Muitas tentativas de login. Aguarde alguns minutos e tente novamente.',
            };

            const message = errorMessages[error.code] || `Erro inesperado: ${error.message}`;
            showMessage(message, 'signInMessage');
            console.error('Erro ao fazer login:', error);
        });
}

// Função de logout
function handleLogout() {
    signOut(auth)
        .then(() => {
            alert('Você foi desconectado!');
            window.location.href = 'PortalAutenticador.html';
        })
        .catch((error) => {
            console.error('Erro ao fazer logout:', error);
        });
}

// Adiciona listeners aos botões
window.addEventListener('load', () => {
    const signInButton = document.getElementById('submitSignIn');
    if (signInButton) {
        signInButton.addEventListener('click', handleLogin);
    }

    const logoutButton = document.getElementById('logoutBtn');
    if (logoutButton) {
        logoutButton.addEventListener('click', handleLogout);
    }
});
