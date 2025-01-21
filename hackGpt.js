function render(){
    createChatPanel();
    toggleSys();
    setTimeout(getQuestionsList, 3000);
    updateQuestionsList();
}

function createChatPanel(){
    const chatPanelContainer = document.createElement('div');
    chatPanelContainer.setAttribute('id', 'chatPanelContainer');

    chatPanelContainer.innerHTML =
        `
        <button id="togglePanelBtn">ya kadir GPT</button>

        <nav id="sidePanel" class="side-panel">
            <div id="sidePanelSticky">
               <div class="side-panel-header">
                    <h2>Mes questions</h2>
                    <div class="side-panel-actions">
                        <button id="updateBtn">Update</button>
                        <button id="closeBtn">Fermer</button>
                    </div>
                </div>
            </div>
        </nav>
    `;

    const body = document.querySelector('body');
    body.appendChild(chatPanelContainer);
}

function toggleSys() {
    const togglePanelBtn = document.getElementById('togglePanelBtn');
    const closeBtn = document.getElementById('closeBtn');
    const sidePanel = document.getElementById('sidePanel');

    //Toggle du sidebar au click
    togglePanelBtn.addEventListener('click', () => {
        sidePanel.classList.toggle('open');

        if (sidePanel.classList.contains('open')) {
            togglePanelBtn.textContent = 'ya kadir GPT';
        } else {
            togglePanelBtn.textContent = 'ya kadir GPT';
        }
    });

    //Fermeture du sidebar au click sur le bouton "fermer"
    closeBtn.addEventListener('click', () => {
        sidePanel.classList.remove('open');
        togglePanelBtn.textContent = 'ya kadir GPT';
    });

    //Fermeture au click en dehors du sidebar
    document.addEventListener('click', (e) => {
        console.log("EVENEMTN DETECTER");
        if (sidePanel.classList.contains('open')) {
            console.log("IS OPEN");
            if (!sidePanel.contains(e.target) && e.target !== togglePanelBtn) {
                sidePanel.classList.remove('open');
            }
        }
    });
}

function updateQuestionsList(){
    const updateBtn = document.getElementById('updateBtn');
    updateBtn.addEventListener('click', () => {
        getQuestionsList();
    })
}

function getQuestionsList(){
    //Suppression des questions lors de la mise à jour s'ils existent
    const hasQuestionsListBox = document.querySelector('#questionsListBox');
    if(hasQuestionsListBox){
        hasQuestionsListBox.remove();
    }

    //Récupération des questions posées dans le chat
    const articles = document.querySelectorAll('article:has(div[data-message-author-role="user"])');
    const userQuestions = [];

    //Création de la liste des questions
    Array.from(articles).forEach(a => {
        const datatestiId = a.getAttribute('data-testid');
        const question = a.querySelector('.whitespace-pre-wrap').textContent;

        const li = document.createElement('div');
        li.setAttribute('class', 'kad-user-answer');
        li.innerText = question;
        li.addEventListener('click', () => {
            const conversion = document.querySelector(`article[data-testid=${datatestiId}]`);
            conversion.scrollIntoView({ behavior: 'smooth' });
        });

        userQuestions.push(li);
    });

    //Injection de la liste des questions dans le sidebar
    const questionsListBox = document.createElement('div');
    questionsListBox.setAttribute('id', 'questionsListBox');

    userQuestions.forEach(uq => {
        questionsListBox.appendChild(uq);
    })

    const sidePanel = document.querySelector('#sidePanel');
    sidePanel.appendChild(questionsListBox);
}

render();