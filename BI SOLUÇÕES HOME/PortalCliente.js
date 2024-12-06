import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

// Inicializa o Firebase
const auth = getAuth();

// Função para redirecionar o usuário para a página de login se não estiver autenticado
onAuthStateChanged(auth, (user) => {
    if (!user) {
        // Se não houver um usuário autenticado, redireciona para a página de login
        window.location.href = 'PortalAutenticador.html'; // Ou a URL da sua página de login
    }
});

// Caso o usuário esteja autenticado, você pode realizar outras operações, como exibir o conteúdo
