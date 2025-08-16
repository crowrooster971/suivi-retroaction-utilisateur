document.getElementById('feedback-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const response = await fetch('/retours', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (response.ok) {
        alert('Votre retour a été envoyé avec succès !');
        event.target.reset();
    } else {
        alert('Une erreur est survenue lors de l'envoi de votre retour.');
    }
});