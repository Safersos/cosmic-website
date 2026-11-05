document.querySelectorAll('[data-admin-message]').forEach(button => {
  button.addEventListener('click', () => {
    document.getElementById(button.dataset.adminMessage).textContent = 'Admin privileges inactive';
  });
});
