const getStartedBtn = document.getElementByClass('btn');

const notesPage = (e) => {
    e.preventDefault();
    window.location.href = '/api/notes';
};

getStartedBtn.addEventListener('click', notesPage);
