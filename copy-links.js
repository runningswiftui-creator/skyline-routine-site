(function () {
  const buttons = document.querySelectorAll('[data-copy]');

  function fallbackCopy(value) {
    const input = document.createElement('textarea');
    input.value = value;
    input.setAttribute('readonly', '');
    input.style.position = 'fixed';
    input.style.left = '-10000px';
    document.body.append(input);
    input.select();
    document.execCommand('copy');
    input.remove();
  }

  async function copy(value) {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      fallbackCopy(value);
    }
  }

  for (const button of buttons) {
    button.addEventListener('click', async () => {
      await copy(button.dataset.copy || '');
      const old = button.textContent;
      button.textContent = button.dataset.copied || 'Copied';
      button.classList.add('copied');
      setTimeout(() => {
        button.textContent = old;
        button.classList.remove('copied');
      }, 1600);
    });
  }
})();
